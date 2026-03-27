import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

// ==================== JWT CONFIGURATION ====================

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
}
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);
const TOKEN_EXPIRY = '7d'; // 7 days

// ==================== TYPES ====================

export interface TokenPayload extends JWTPayload {
    userId: string | null;
    email: string;
    name: string;
    role: 'super_admin' | 'admin' | 'editor';
    tenantId: string | null;
    tenantName: string;
}

// ==================== SIGN JWT ====================

export async function signToken(payload: Omit<TokenPayload, keyof JWTPayload>): Promise<string> {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(TOKEN_EXPIRY)
        .sign(SECRET_KEY);
}

// ==================== VERIFY JWT ====================

export async function verifyToken(token: string): Promise<TokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload as TokenPayload;
    } catch {
        // Token expired, invalid signature, or malformed
        return null;
    }
}
