import { repository } from '../Domain/repository';

export  async function getAllAnalysts(): Promise<any> {
  try{
    let analysts = []
    analysts=await repository.findUser({type:1});
    

    return analysts;
  }catch(error){
    throw error;
  }
}

export  async function editAnalyst(id: string, obj: any, newEmail:string, password:string): Promise<any> {
  try{

    if(newEmail=='true'){
      let encryptPassword: string = repository.encryptPassword(password);
      obj.password=encryptPassword
    }
    const analyst =await repository.updateAnalyst(obj, id);
    

    return analyst;
  }catch(error){
    throw error;
  }
}

export  async function updateAnalystStatus(id: string, status: number): Promise<any> {
  try{
    const analyst =await repository.updateAnalystStatus(id, status);
    return analyst;
  }catch(error){
    throw error;
  }
}

export  async function analystPullSample(analysts: any, sample: string): Promise<any> {
  try{
    const analyst =await repository.updateAnalystSamples(analysts, sample);
    return analyst;
  }catch(error){
    throw error;
  }
}

