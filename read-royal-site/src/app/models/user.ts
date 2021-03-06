﻿import {Role} from './role'

export class User {
    username : string;
    email : string;
    id : number;
    token?: string;
    role : Role;
    password_hash?: string;
    password_salt? : string;
}