import { prisma } from '../../../../lib/prisma'
import { toClient } from '../../../../lib/serialize'

const MAX_FEEDBACK_LEN = 1000
const BASE_WEIGHT = 5

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { id } = req.query
  const { swipeDirection, feedbackText, userStars } = req.body || {}

  // Validate before touching the database: a bad payload should cost nothing.
  const parsedStars = Number(userStars)
  const stars = Number.isFinite(parsedStars) ? Math.min(Math.max(parsedStars, 1), 5) : 3
  const text = typeof feedbackText === 'string' ? feedbackText.slice(0, MAX_FEEDBACK_LEN) : null
  const direction = swipeDirection === 'left' || swipeDirection === 'right' ? swipeDirection : null

  try {
    // Append inside a transaction with a row lock. The previous version read the
    // JSON array, mutated it in JS and wrote it back, so two concurrent swipes
    // on the same profile would each start from the same array and the second
    // write would silently discard the first. FOR UPDATE serialises writers to
    // this row so every vote is preserved.
    const updated = await prisma.$transaction(async (tx) => {
      const [locked] = await tx.$queryRaw`
        SELECT "baseStars", "feedbacks" FROM "tinder_profiles" WHERE "id" = ${id} FOR UPDATE
      `
      if (!locked) return null

      const feedbacks = Array.isArray(locked.feedbacks) ? locked.feedbacks : []
      feedbacks.push({ swipeDirection: direction, feedbackText: text, stars })

      const sumUserStars = feedbacks.reduce((sum, f) => sum + (f.stars || 0), 0)
      const averageStars =
        (locked.baseStars * BASE_WEIGHT + sumUserStars) / (BASE_WEIGHT + feedbacks.length)

      return tx.tinderProfile.update({
        where: { id },
        data: { feedbacks, averageStars },
      })
    })

    if (!updated) return res.status(404).json({ message: 'Profile not found' })

    res.setHeader('Cache-Control', 'no-store')
    res.json({ stars, averageStars: updated.averageStars, profile: toClient(updated) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}
