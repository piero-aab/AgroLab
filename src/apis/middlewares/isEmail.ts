export function isEmail ( req: any, res: any, next: any): any{
  try{
    const { email } = req.body;
    const reg =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!reg.test(email)) throw "El correo ingresado no es válido";
    next();
  }catch(error){
    req.flash('errors', { msg: error});
    return res.redirect('back');
  }
}  
