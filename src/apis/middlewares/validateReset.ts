export function validateReset ( req: any, res: any, next: any): any{
  try{
    const { pswd, pswd2 } = req.body;
    if( pswd === '' || pswd2 === '' ) throw 'Faltan campos requeridos'
    if( pswd.length < 8) throw 'La contraseña debe contener al menos 8 caracteres';
    if( checkType(pswd) !== '2') throw 'La contraseña debe contener al menos una mayúscula y una minúscula.'
    if( pswd !== pswd2) throw 'Las contraseñas no coinciden';
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
