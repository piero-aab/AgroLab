import { repository } from '../Domain/repository';

export  async function getAllSamples(): Promise<any> {
  try{
    let samples = []
    samples=await repository.findSamples({});
    

    return samples;
  }catch(error){
    throw error;
  }
}

export  async function getSampleById(id:string): Promise<any> {
  try{
    let sample=await repository.findSampleById(id);
    

    return sample;
  }catch(error){
    throw error;
  }
}

export  async function setAssigments(id:string, assigments:any, analysts:any): Promise<any> {
  try{
    let sample=await repository.setAssigmentsSample(id,assigments, analysts);
    

    return sample;
  }catch(error){
    throw error;
  }
}

export  async function getSample(id: any): Promise<any> {
  try{
    let sample
    sample = await repository.findSample(id);
    
    return sample;
  }catch(error){
    throw error;
  }
}