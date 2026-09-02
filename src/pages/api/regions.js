import { prisma } from '../../lib/prisma'
import { listHandler } from '../../lib/listHandler'

export default listHandler(prisma.region, 'regions')
