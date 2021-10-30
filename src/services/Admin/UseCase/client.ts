import { repository } from '../Domain/repository';

export  async function getAllclients(): Promise<any> {
  try{
    let clients =await repository.findClientsTable();
    return clients;
  }catch(error){
    throw error;
  }
}
export  async function getAllclientsAnalists(): Promise<any> {
  try{
    let clients =await repository.findclients();
    return clients;
  }catch(error){
    throw error;
  }
}

export  async function updateClient(id: string, analists: any): Promise<any> {
  try{
    const analist =await repository.updateClient(id, analists);
    

    return analist;
  }catch(error){
    throw error;
  }
}

export  async function updateClientStatus(id: string, status: number): Promise<any> {
  try{
    const client =await repository.updateClientStatus(id, status);
    

    return client;
  }catch(error){
    throw error;
  }
}
