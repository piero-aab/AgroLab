import { plainMailService } from '../../../loaders/nodeMailer';
import {getAllDocuments} from '../UseCase/register';
import {getAllSamples, getCodeSample, createSample, getSample, updateSample,setImagesSample} from '../UseCase/sample';

export async function getSamples(req: any, res: any, next:any){
  try{
    const samples = await getAllSamples()
    return res.render('secretary/sample/allSamples',{samples});
  }catch(error){
    return next(error)
  }
}

export async function getCreateSample(req: any, res: any, next:any){
  try{
      const code = await getCodeSample()
    return res.render('secretary/sample/createSample', {code});
  }catch(error){
    return next(error)
  }
}

export async function postCreateSample(req: any, res: any, next:any){
  try{
    const {body} = req
    const code = await getCodeSample()
    body.code = code
    const newSample = await createSample(body)
    req.flash("success",{msg: "Muestra creada correctamente."})
    return res.redirect('/secretaria/muestras');
  }catch(error){
    return next(error)
  }
}

export async function getEditSample(req: any, res: any, next:any){
  try{
    const {id}= req.params
    const sample = await getSample(id)
    if(sample.status>=2){
      req.flash("errors",{msg: "La muestra ya ha finalizado."})
      return res.redirect('back');
    }
    return res.render('secretary/sample/editSample', {sample});
  } catch(error){
    return next(error)
  }
}

export async function postEditSample(req: any, res: any, next:any){
  try{
    const {id}= req.params
    const {body} = req
    await updateSample(id, body).then(()=>{
      req.flash("success",{msg: "Muestra editada correctamente."})
      return res.redirect('/secretaria/muestras');
    })
  } catch(error){
    return next(error)
  }
}

export async function getCreateReport(req: any, res: any, next:any){
  try{
    const {id}= req.params
    await getSample(id).then((sample)=>{
      sample._id = id
      if(sample.status<3){
        req.flash("errors",{msg: "La muestra aún no esta finalizada."})
        return res.redirect('back');
      }
      return res.render('secretary/report/createReport', {sample});
    })
  } catch(error){
    return next(error)
  }
}

export async function postCreateReport(req: any, res: any, next:any){
  try{
    const {id}= req.params
    const {files} = req
    await setImagesSample(id,files).then(()=>{
      return res.sendStatus(200);
    })
  } catch(error){
    return res.sendStatus(500);
  }
}

export async function getReportDetail(req: any, res: any, next:any){
  try{
    const {id}= req.params
    await getSample(id).then((sample)=>{
      sample._id = id
      if(!sample.images){
        req.flash("errors",{msg: "Error al generar Informe, inténtelo nuevamente."})
        return res.redirect('back');
      }else{
        if(sample.images.length==4){
        return res.render('secretary/report/reportDetail', {sample});
        }else{
          req.flash("errors",{msg: "Informe no generado."})
          return res.redirect('back');
        }
      }
    })
  } catch(error){
    return next(error)
  }
}
