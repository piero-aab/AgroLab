export interface databaseDAO {
    createUser( email: string, password: string, name: string, url: string, linkedin: string
): Promise<any>;
    existEmail(filter: any): Promise<any>;
    findUser(filter: any): Promise<any>;
}
