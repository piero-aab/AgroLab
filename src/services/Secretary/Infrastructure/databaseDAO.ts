export interface databaseDAO {
    existEmail(email: string): Promise<any>;
    existToken(token: string): Promise<any>;
    findById(id: string): Promise<any>;
    findUser(filter: any): Promise<any>;
    findLastAnalyst(): Promise<any>;
    findAllEmails(): Promise<any>;
    findAllDocuments(): Promise<any>
    createUser(obj: any, password:string): Promise<any>;
    updateToken(email: string, token: string, date: string): Promise<any>;
    updatePasswordReset(password: string, token: string): Promise<any>;
    findSamples(filter: any): Promise<any>;
    findLastSample(todayIni: any, today: any): Promise<any>
    createSample(body: any): Promise<any>
}
