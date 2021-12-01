import {postParameterResult, getAllSamples, getParameterDetail, getParametersUnits, getSampleDetail, getHardnessValues, postSampleResults, getParameterValues} from '../UseCase/sample';

export async function getSamples(req: any, res: any, next:any){
    try{
      let id = req.user._id
      //let samplesArray = req.user.samples
      const samples = await getAllSamples(id)
      return res.render('analyst/sample/allSamples', {samples})
    }catch(error){
      return next(error)
    }
}

export async function getSample(req: any, res: any, next:any){
  try{
    let user_id = req.user._id
    const {id} = req.params
    const sampleDetail = await getSampleDetail(user_id, id)
    const parametersUnits = await getParametersUnits(sampleDetail.matrix)

    return res.render('analyst/sample/sampleDetail', {sampleDetail, user_id, parametersUnits})
  }catch(error){
    return next(error)
  }
}

export async function getParameter(req: any, res: any, next:any){
  try{
    //let user_id = req.user._id
    const {id, index} = req.params
    const {matrix} = req.query;
    
    const parameterDetail = await getParameterDetail(matrix, parseInt(index, 10))

    const parameter = {
      id: id,
      index: parameterDetail.index,
      matrix: matrix,
      units: parameterDetail.units,
      variables: parameterDetail.variables ? parameterDetail.variables : [],
      result: parameterDetail.result ? parameterDetail.result : '',
      formula: parameterDetail.formula ? parameterDetail.formula : '',
      parameter: parameterDetail.parameter
    }
    
    return res.render('analyst/parameter/parameter', {parameter})
  }catch(error){
    return next(error)
  }
}

export async function getEditParameter(req: any, res: any, next:any){
  try{
    let user_id = req.user._id
    const {id, index} = req.params
    const {matrix} = req.query;
    
    const parameterDetail = await getParameterDetail(matrix, parseInt(index, 10))

    const valuesParameter = await getParameterValues(user_id, id, index)

    const parameter = {
      id: id,
      index: parameterDetail.index,
      matrix: matrix,
      units: parameterDetail.units,
      variables: parameterDetail.variables ? parameterDetail.variables : [],
      result: parameterDetail.result ? parameterDetail.result : '',
      formula: parameterDetail.formula ? parameterDetail.formula : '',
      parameter: parameterDetail.parameter
    }
    
    return res.render('analyst/parameter/editParameter', {parameter, valuesParameter})
  }catch(error){
    return next(error)
  }
}

export async function postParameter(req: any, res: any, next:any){
  try{
    let user_id = req.user._id
    const {id, index} = req.params
    const obj = req.body

    const date = new Date()
    date.setHours(date.getHours() - 5);

    const sampleDetail = await getSampleDetail(user_id, id)
    const parametersUnits = await getParametersUnits(sampleDetail.matrix)
    const parameterDetail = await getParameterDetail(sampleDetail.matrix, parseInt(index, 10))

    const result = {
      index: parameterDetail.index,
      name: parameterDetail.parameter,
      variables: obj.variables ? obj.variables : null,
      finalResult: obj.result,
      deliveryDate: date,
      units: parameterDetail.units,
      result: parameterDetail.result ? parameterDetail.result : null,
      status: 1
    }

    const parameterResult = await postParameterResult(result, user_id, id)
    
    return res.render('analyst/sample/sampleDetail', {sampleDetail, user_id, parametersUnits})
  }catch(error){
    return next(error)
  }
}

export async function getTotalHardness(req: any, res: any, next:any){
  try{
    //let user_id = req.user._id
    const {id, index} = req.params
    //let variable = [65.46, 54.665]

    const totalHardness = await getHardnessValues(id, index)

    res.send(totalHardness)
  }catch(error){
    return next(error)
  }
}

export async function postSampleResult(req: any, res: any, next:any){
  try{
    let user_id = req.user._id
    const {id} = req.params
    const {matrix} = req.query;
    const obj = req.body

    const results = await postSampleResults(id, obj, user_id, matrix)

    res.send(results)
  }catch(error){
    return next(error)
  }
}

