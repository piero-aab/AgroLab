export interface databaseDAO {
    createUser(obj: any, password:string): Promise<any>;
    existEmail(filter: any): Promise<any>;
    findUser(filter: any): Promise<any>;
    findAllEmails(): Promise<any>;
}
