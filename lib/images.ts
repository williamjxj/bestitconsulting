export function buildR2Url(key: string): string {
  const base =
    process.env.NEXT_PUBLIC_R2_BASE_URL || process.env.R2_PUBLIC_BASE_URL
  if (!base) return ''
  return `${base.replace(/\/$/, '')}/${key.replace(/^\//, '')}`
}
