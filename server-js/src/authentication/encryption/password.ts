import bcrypt from "bcrypt";

function generateSalt() {
    return bcrypt.genSaltSync(16);
}

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, generateSalt());
};

export async function comparePassword(plainPassword: string, databaseHashedPassword: string) {
    return await bcrypt.compare(plainPassword, databaseHashedPassword);
}