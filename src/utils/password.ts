import bcrypt from 'bcryptjs';

/**
 * Cifrar password
 * 
 * @param {string} string Contraseña en texto 
 * @returns {string} Contraseña cifrada
 */
export const hashPassword = (string: string): string => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(string, salt);

    return hash;
}

/**
 * Comparar contraseña plana con la cifrada
 * 
 * @param {string} string Contraseña en texto
 * @param {string} hashed Contraseña cifrada
 * @returns {boolean}
 */
export const comparePassword = (string: string, hashed: string): boolean => {
    return bcrypt.compareSync(string, hashed);
}