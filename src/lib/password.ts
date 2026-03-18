import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10; // Same as Payload CMS

/**
 * Hash a password using bcrypt
 * Cost factor 10 = ~100ms per hash (good balance of security vs speed)
 */
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a bcrypt hash
 * Returns true if password matches
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    // Handle legacy plaintext passwords (not bcrypt format)
    if (!hash.startsWith('$2a$') && !hash.startsWith('$2b$') && !hash.startsWith('$2y$')) {
        // Legacy: direct comparison (will be migrated)
        return password === hash;
    }
    return bcrypt.compare(password, hash);
}

/**
 * Check if a hash is already bcrypt format
 */
export function isBcryptHash(hash: string): boolean {
    return hash.startsWith('$2a$') || hash.startsWith('$2b$') || hash.startsWith('$2y$');
}
