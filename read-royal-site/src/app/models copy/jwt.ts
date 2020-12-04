import { Role } from './role';

export class JWT {
    token: string;
    expiresAt: Date;
    role: Role;
    username : String;  
}