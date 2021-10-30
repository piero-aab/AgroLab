import { repository } from '../Domain/repository';

export  async function getAllAnalists(): Promise<any> {
  try{
    let analists = []
    analists=await repository.findUser({type:1});
    

    return analists;
  }catch(error){
    throw error;
  }
}

export  async function updateAnalist(analists: any,id: string): Promise<any> {
  try{
    const analist =await repository.updateAnalist(analists, id);
    

    return analist;
  }catch(error){
    throw error;
  }
}

export  async function updateAnalistStatus(id: string, status: number): Promise<any> {
  try{
    const analist =await repository.updateAnalisttatus(id, status);
    return analist;
  }catch(error){
    throw error;
  }
}

