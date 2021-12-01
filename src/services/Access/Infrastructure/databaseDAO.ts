export interface databaseDAO {
    existEmail(filter: any): Promise<any>;
    existUserCode(usercode: string): Promise<any>;
    existToken(token: string): Promise<any>;
    findById(id: string): Promise<any>;
    findUser(filter: any): Promise<any>;
    createUser(usercode: string, password: string): Promise<any>;
    updateToken(email: string, token: string, date: string): Promise<any>;
    updatePasswordReset(password: string, token: string): Promise<any>
}