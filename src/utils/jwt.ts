import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env['JWT_SECRET'] || 'empty'

/**
 * Firmar token del usuario
 * 
 * @param user Usuario
 */
export const tokenSign = async (user: any) => {
    const payload = {
        _id:  user._id,
        role: user.role
    }

    const sign = await jwt.sign(payload, JWT_SECRET, {
        expiresIn: '2h'
    })

    return sign
}

/**
 * Verificar si token es valido
 * 
 * @param token token
 * @returns 
 */
export const verifyToken = async (token: string) => {
    try {
       return jwt.verify(token, JWT_SECRET) 
    } catch (error) {
       return Promise.reject(null)
    }
}