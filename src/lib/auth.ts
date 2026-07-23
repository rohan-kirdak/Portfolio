import crypto from 'crypto'
import { cookies } from 'next/headers'

const SECRET_KEY = process.env.JWT_SECRET || 'rohan-portfolio-secret-2026'
const COOKIE_NAME = 'admin_session'

export function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, SECRET_KEY, 1000, 64, 'sha512').toString('hex')
}

export function createSessionToken(username: string): string {
  const payload = JSON.stringify({
    username,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  })
  const encodedPayload = Buffer.from(payload).toString('base64url')
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(encodedPayload)
    .digest('base64url')
  return `${encodedPayload}.${signature}`
}

export function verifySessionToken(token: string): { username: string } | null {
  try {
    const [encodedPayload, signature] = token.split('.')
    if (!encodedPayload || !signature) return null

    const expectedSignature = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(encodedPayload)
      .digest('base64url')

    if (signature !== expectedSignature) return null

    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf-8'))
    if (payload.exp < Date.now()) return null

    return { username: payload.username }
  } catch {
    return null
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifySessionToken(token) !== null
}

export { COOKIE_NAME }
