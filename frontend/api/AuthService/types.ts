export type UserRole =
    "normal" |
    "admin"

export type LoginData = {
    email: string;
    password: string;
}

export type RegisterData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}

export type BirdlyUserData = {
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: UserRole,
}
