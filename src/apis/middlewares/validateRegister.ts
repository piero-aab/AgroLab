export function validateRegister ( req: any, res: any, next: any): any{
  try{
    const { email, pswd, pswd2 } = req.body;
    if( email === '' || pswd === '' || pswd2 === '' ) throw 'Faltan campos requeridos'
    if( ! /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email) ) throw 'El correo esta mal ingresado';
    if( pswd.length < 8) throw 'La contraseña debe contener al menos 8 caracteres';
    if( checkType(pswd) !== '2') throw 'La contraseña debe contener al menos una mayúscula y una minúscula.'
    if( pswd !== pswd2) throw 'Las contraseñas no coinciden';
    next();
  }catch(error){
    req.flash('errors', { msg: error});
    return res.redirect('back');
  }
}  

export function validateCreateUser ( req: any, res: any, next: any): any{
  try{
    const { email, password} = req.body;
    if( email === '' || password === '') throw 'Faltan campos requeridos'
    if( ! /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email) ) throw 'El correo esta mal ingresado';
    if( password.length < 8) throw 'La contraseña debe contener al menos 8 caracteres';
    if( checkType(password) !== '2') throw 'La contraseña debe contener al menos una mayúscula y una minúscula.'
    next();
  }catch(error){
    req.flash('errors', { msg: error});
    return res.redirect('back');
  }
}  

function checkType(mensaje: string) {
  
  mensaje = mensaje.trim();

  const regxs = {
    "lower": /^[a-z0-9 ]+$/,
    "upper": /^[A-Z0-9 ]+$/,
    "upperLower": /^[A-Za-z0-9 ]+$/
  }

  if (regxs.lower.test(mensaje)) { return '0'; }

  if (regxs.upper.test(mensaje)){ return '1'; }

  if (regxs.upperLower.test(mensaje)){ return '2'; }

  return -1;
}
