export function isEmail ( req: any, res: any, next: any): any{
  try{
    const { email } = req.body;
    if(! /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) throw "El correo ingresado no es válido";
    next();
  }catch(error){
    req.flash('errors', { msg: error});
    return res.redirect('back');
  }
}  
