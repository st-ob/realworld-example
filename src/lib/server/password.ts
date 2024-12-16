import crypto from 'crypto'

const hashSettings = {cost: 131072, blockSize: 8, parallelization: 1, maxmem: 140000000}; //based on OWASP recommendations
const hashLength = 64;

export function hashPassword(password: string) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPwd = crypto.scryptSync(password, salt, hashLength, hashSettings);
    
    return hashedPwd.toString('hex') + '.' + salt;
}

export function verifyPasswordHash(hash: string, password: string) {
    const [storedPwd, salt] = hash.split('.');
    const hashedPwd = crypto.scryptSync(password, salt, hashLength, hashSettings);
    const storedPwdBuffer = Buffer.from(storedPwd, 'hex');

    return crypto.timingSafeEqual(hashedPwd, storedPwdBuffer);
}