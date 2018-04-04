import jwt, { TokenExpiredError } from 'jsonwebtoken'
import config from '../config'

const { JWT_SECRET } = config

const RECOVERY_TOKEN_EXPIRE = {
  ONE_DAY: '1d'
}

const SESSION_TOKEN_EXPIRE = {
  ONE_DAY: '1d',
  ONE_MONTH: '30d'
}

/**
 * @param {!string} email
 * @returns {string}
 */
export const createRecoveryToken = (email) => {
  if (typeof email !== 'string') {
    throw new Error('Parameter "email" is invalid!')
  }

  return jwt.sign({ email }, JWT_SECRET, { expiresIn: RECOVERY_TOKEN_EXPIRE.ONE_DAY })
}

/**
 * @param {!string} userId
 * @param {!boolean} remember
 * @returns {string}
 */
export const createSessionToken = (userId, remember) => {
  if (typeof userId !== 'string') {
    throw new Error('Parameter "userId" is invalid!')
  }

  if (typeof remember !== 'boolean') {
    throw new Error('Parameter "remember" is invalid!')
  }

  const expiresIn = remember ? SESSION_TOKEN_EXPIRE.ONE_MONTH : SESSION_TOKEN_EXPIRE.ONE_DAY

  return jwt.sign({ userId }, JWT_SECRET, { expiresIn })
}

/**
 * @param {!string} token
 * @returns {Object} decoded token
 */
export const verifyToken = token => {
  if (typeof token !== 'string') {
    throw new Error('Parameter "token" is invalid!')
  }

  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new Error('Token expired!')
    }

    throw new Error('Invalid token!')
  }
}
