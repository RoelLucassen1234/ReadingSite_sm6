import {Role} from './role'

export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: String;
    role: Role;
    token?: string;
}