
import { plainMailService } from '../../../loaders/nodeMailer';

export async function getDashboard(req: any, res: any, next:any){
try{
    return res.render('admin/dashboard');
  }catch(error){
    return next(error)
  }
}
