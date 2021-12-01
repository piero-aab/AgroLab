import { plainMailService } from '../../../loaders/nodeMailer';
import {getAllAnalysts,editAnalyst,updateAnalystStatus,analystPullSample} from '../UseCase/analyst';
import {createAnalyst, getAllEmails, getAllDocuments} from '../UseCase/register';
import {getAllSamples, getSample, getSampleById, setAssigments} from '../UseCase/sample';

export async function getDashboard(req: any, res: any, next:any){
  try{
      return res.render('admin/dashboard');
  }catch(error){
    return next(error)
  }
}

export async function getAnalysts(req: any, res: any, next:any){
  try{
      const analysts = await getAllAnalysts()
      const emails = await getAllEmails()
      const documents = await getAllDocuments()
      return res.render('admin/analyst/allAnalysts',{analysts,emails,documents});
  }catch(error){
    return next(error)
  }
}
  
export async function postCreateAnalyst(req: any, res: any, next:any){
  try{
    const obj = req.body
    const {email}=req.body
    const pswd = 'AnalistaAgroambiental'
    const newUser = await createAnalyst(
      obj,
      email,
      pswd
      );
    const text = `Hola,\n\n
    se ha generado un usuario del tipo analista en Agroambiental.\n\n
    Cédula de identificación : ${newUser.document}\n\n
    Contraseña : ${pswd}\n\n
    Haga clic en este enlace para ingresar con su nuevo usuario: http://${req.headers.host}/ingresar\n\n
    No olvide cambiar de contraseña por una más segura.\n\n
    Atentamente,
    Agroambiental`
    const subject ="Te has registrado en Agroambiental"
    await plainMailService("no-reply@starter.pe",newUser.email,subject,text)
    return res.send(newUser);
  }catch(error){
    req.flash('errors', { msg: error});
    return res.redirect('back');
  }
}

export async function updateAnalyst(req: any, res: any, next:any){
  try{
    const obj = req.body
    const {analyst,newEmail}=req.query
    const pswd = 'AnalistaAgroambiental'
    const user = await editAnalyst(analyst,obj,newEmail,pswd)
    if(newEmail=='true'){
      const text = `Hola,\n\n
      se ha generado un usuario del tipo analista en AgroAmbiental.\n\n
      Cédula de identificación : ${user.document}\n\n
      Contraseña : ${pswd}\n\n
      Haga clic en este enlace para ingresar con su nuevo usuario: http://${req.headers.host}/ingresar\n\n
      No olvide cambiar de contraseña por una más segura.\n\n
      Atentamente,
      AgroAmbiental`
      const subject ="Te has registrado en AgroAmbiental"
      await plainMailService("no-reply@starter.pe",user.email,subject,text)
    }
    return res.send('user');
  }catch(error){
    req.flash('errors', { msg: error});
    return res.redirect('back');
  }
}

export async function setStatusAnalyst(req: any, res: any, next:any){ 
  try{
    const {id}= req.params
    const {status} = req.body
    const analyst = await updateAnalystStatus(id,status)
    return res.send(analyst);
  }catch(error){
    req.flash('errors', { msg: error});
    return res.redirect('back');
  }
}

export async function getSamples(req: any, res: any, next:any){
  try{
    const samples = await getAllSamples()
    const documents = await getAllDocuments()
    return res.render('admin/sample/allSamples',{samples,documents});
  }catch(error){
    return next(error)
  }
}

export async function getAssignAnalyst(req: any, res: any, next:any){
  try{
    const {id}= req.params
    const sample = await getSampleById(id)
    const analysts = await getAllAnalysts()
    return res.render('admin/sample/assignment',{sample,analysts});
  }catch(error){
    return next(error)
  }
}

export async function postAssignAnalyst(req: any, res: any, next:any){
  try{
    const {id}= req.params
    const {assigments,analysts,oldAnalysts} =req.body
    await analystPullSample(oldAnalysts,id)
    const sample = await setAssigments(id,assigments,analysts)
    return res.send(sample);
  }catch(error){
    return next(error)
  }
}

export async function getSampleDetail(req: any, res: any, next:any){
  try{
    const {id}= req.params
    const sample = await getSample(id)

    return res.render('admin/sample/sampleDetail', {sample});
  } catch(error){
    return next(error)
  }
}
