import { prisma } from '../../lib/prisma'
import { listHandler } from '../../lib/listHandler'

export default listHandler(prisma.community, 'communities')
