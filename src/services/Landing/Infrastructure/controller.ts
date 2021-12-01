import { plainMailService } from '../../../loaders/nodeMailer';

export async function getHome(req: any, res: any, next:any){
 try{
    return res.render('landing/home',{title:'Home'});
  }catch(error){
    return next(error)
  }
}

export async function getMatrixDetail(req: any, res: any, next:any){
  try{
    const {index} = req.query
    const matrix=["ANALISIS DE SUELOS","ANALISIS DE TEJIDO VEGETAL","ANALISIS DE AGUA","ANALISIS DE ABONOS ORGÁNICOS, ACONDICIONADORES Y FERTILIZANTES"]
    return res.render('landing/matrixDetail',{title:'Services', matrix:{title:matrix[index],index:index}});
  }catch(error){
    return next(error)
  }
 }
