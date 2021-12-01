import { repository } from '../Domain/repository';

export  async function getAllSamples(id: any): Promise<any> {
  try{
    let samples = []
    samples = await repository.findSamples(id);
  
    return samples;
  }catch(error){
    throw error;
  }
}

export  async function getSampleDetail(user_id: any, id: any): Promise<any> {
  try{
    let samples = await repository.findSample(user_id, id);
  
    return samples;
  }catch(error){
    throw error;
  }
}

export  async function getParametersUnits(matrix: String): Promise<any> {
  try{
    let parametersUnits = await repository.findParametersUnits(matrix);
  
    return parametersUnits;
  }catch(error){
    throw error;
  }
}

export  async function getParameterDetail(matrix: String, index: number): Promise<any> {
  try{
    let parameterDetail = await repository.findParameterDetail(matrix, index);
    return parameterDetail;
  }catch(error){
    throw error;
  }
}

export  async function getParameterValues(user_id: any, id: any, index: number): Promise<any> {
  try{
    let sample = await repository.getAssigments(id);
    let parameterValues

    sample.assigments.filter((assigment:any)=>{
      if(String(assigment.analyst) == String(user_id)){
        if(assigment.results){
          assigment.results.filter((result:any) =>{
            if(result.index==index){
              parameterValues = result
            }
          })
        }
      }
    })

    return parameterValues;
  }catch(error){
    throw error;
  }
}

export  async function postParameterResult(result: any, user_id: any, id: any): Promise<any> {
  try{
    const sample = await repository.getAssigments(id)
    let inserted = false

    sample.assigments.map((assigment: any) => {
      if(String(assigment.analyst) == String(user_id)){
        if(assigment.results){

          assigment.results.map((r: any, i: number) =>{

            if(r.index == result.index){
              assigment.results.splice(i, 1)
            } 
          })

            assigment.results.push(result)
            assigment.results.sort(function(a: any, b:any) {
              if (a.index > b.index) {
                return 1;
              } else return -1;
            });

        } else {
          
          assigment.results = []
          assigment.results.push(result)
          
        }
      }
    })

    let parameterResult = await repository.createParameterResult(sample.assigments, id);
    return parameterResult;
  }catch(error){
    throw error;
  }
}

export  async function getHardnessValues(id: any, index: number): Promise<any> {
  try{
    let hardnessValues = await repository.getAssigments(id)
    let hardnessCalcium =-1, hardnessMagnesium =-1
    
    hardnessValues.assigments.filter((assigment: any)=>{
      if(assigment.results){
        assigment.results.filter((result: any) =>{
          if(result.index == 6){
            hardnessCalcium = result.finalResult
          }
          if(result.index == 7){
            hardnessMagnesium = result.finalResult
          }
        })
      }
    })

    return [hardnessCalcium, hardnessMagnesium];
  }catch(error){
    throw error;
  }
}


export  async function postSampleResults(id: any, results: any, user_id: any, matrix: any): Promise<any> {
  try{
    
    const sample = await repository.getResults(id)
    const resultsTemp = results
    let status = 2
    let contAssigments = 0

    let sampleAssigments = await repository.getAssigments(id)
    
    //Para contar cuantas asignaciones tiene la muestra en total
    for (let i=0; i<sampleAssigments.assigments.length; i++){
      contAssigments = contAssigments + sampleAssigments.assigments[i].permits.length
    }

    
    //Para actualizar el status de los parametros
    resultsTemp.filter((r: any)=>{
      r.status = 2
    })
    
    for(let i=0; i<resultsTemp.length; i++){
      await postParameterResult(resultsTemp[i], user_id, id)
    }


    if(Object.entries(sample).length !== 0){

      for(let i=0; i<results.length; i++){
        let isNew = true
        for(let j=0; j<sample.results.length; j++){
          if(results[i].index == sample.results[j].index){
            results[i].analyst = user_id,
            sample.results[j] = results[i]
            isNew = false
          }
        }
        if(isNew){
          results[i].analyst = user_id,
          sample.results.push(results[i])
        }
      }
  
      sample.results.sort(function(a: any, b:any) {
        if (a.index > b.index) {
          return 1;
        } else return -1;
      });

      if(sample.results.length == contAssigments){
        status = 3
      }
  
    } else {

      if(results.length == contAssigments){
        status = 3
      }

      sample.results = []
      results.filter((r: any) => {
        r.analyst = user_id,
        sample.results.push(r)
      })

    }

    let finalResult = await repository.createSampleResult(sample.results, id, status);

    return finalResult;
  }catch(error){
    throw error;
  }
}
