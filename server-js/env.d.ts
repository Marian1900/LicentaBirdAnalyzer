
declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: number;
        DATABASE_NAME: string;
        CONNECTION_STRING: string;
    }
}
