export function validatePassword ( req: any, res: any, next: any): any{
  try{
    const { registerPassword, registerPasswordRepeat } = req.body;
    if( registerPassword !== registerPasswordRepeat) throw 'Las contraseñas no coinciden';
    if( registerPassword.length < 8) throw 'La contraseña debe contener al menos 8 caracteres';
    return next();
  }catch(error){
    req.flash('errors', { msg: error});
    return res.redirect('back');
  }
}  
