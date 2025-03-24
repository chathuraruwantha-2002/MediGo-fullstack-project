export class User {
    userId: number;
    name: string;
    email: string;
    password: string;
    role: string;

    constructor(userId: number, name: string, email: string, password: string, role: string) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
