export function toClient(row) {
  if (Array.isArray(row)) return row.map(toClient)
  if (!row || typeof row !== 'object') return row
  const { id, ...rest } = row
  return { id, _id: id, ...rest }
}
