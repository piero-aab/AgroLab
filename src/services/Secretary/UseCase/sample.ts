import { repository } from '../Domain/repository';
import cloudinary from '../../../loaders/cloudinary';
import fs from 'fs-extra';

export  async function getAllSamples(): Promise<any> {
  try{
    let samples = []
    samples=await repository.findSamples({});
    

    return samples;
  }catch(error){
    throw error;
  }
}

export async function getCodeSample(): Promise<any> {
  try{
    
    const date = new Date()
    date.setHours(date.getHours() - 5);
    //const dateIni = new Date(date.getFullYear(), date.getMonth(), date.getDate(),0,0,0);
    const dateIni = new Date(date.getFullYear(), 0, 1, 0, 0, 0);
    dateIni.setHours(dateIni.getHours() - 5);
    let codes = await repository.findLastSample(dateIni, date);
    
    //let lastCode = codes.length > 0 ? Math.max.apply(Math, codes.map(function(o:any) { return parseInt(o.code.toString().split('-')[3]); }))+1 : 1
    let lastCode = codes.length > 0 ? Math.max.apply(Math, codes.map(function(o:any) { return parseInt(o.code.toString().slice(4))}))+1 : 1
    const year = date.getFullYear()
    const day = date.getDate()
    const month = date.getMonth() + 1
    
    //const code = day.toString().padStart(2, "0") + '-' + month.toString().padStart(2, "0") + '-' + year + '-' + lastCode.toString().padStart(4, "0");
    const code = year + lastCode.toString().padStart(4, "0");
    return code

  } catch(error){
    throw error;
  }
}

export async function createSample(body: any): Promise<any> {
  try{
    const sample = await repository.createSample(body);
    return sample;
  } catch(error){
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

export async function updateSample(id: any, body:any): Promise<any> {
  try{
    let sample
    sample = await repository.updateSample(id, body);
    
    return sample;
  }catch(error){
    throw error;
  }
}

export async function setImagesSample(id: any, files:any): Promise<any> {
  try{
    let images:Array<string> = []
    for (let index = 0; index < files.length; index++) {
      let image = await cloudinary.uploader.upload(files[index].path)
      images.push(image.url)
      fs.unlinkSync(files[index].path);
    }
    let sample = await repository.setImages(id, images);
    
    return sample;
  }catch(error){
    throw error;
  }
}
