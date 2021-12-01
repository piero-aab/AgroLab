export interface databaseDAO {
    existEmail(filter: any): Promise<any>;
    existToken(token: string): Promise<any>;
    findById(id:string): Promise<any>;
    findUser(filter: any): Promise<any>;
    findLastAnalyst(): Promise<any>;
    findAllEmails(): Promise<any>;
    findAllDocuments(): Promise<any>;
    createUser(obj: any, password:string): Promise<any>;
    updateToken(email: string, token: string, date: string): Promise<any>;
    updatePasswordReset(password: string, token: string): Promise<any>;
    updateAnalystStatus(id: string, status: number): Promise<any>;
    updateAnalyst(analysts: any,id: string): Promise<any>;
    findSamples(filter: any): Promise<any>;
}   
