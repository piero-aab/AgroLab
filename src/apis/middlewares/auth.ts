export function isLogged ( req: any, res:any, next:any){
  
  if(req.user){

    let route: string = '';
    switch(req.user.type){
      case 0: 
        route = '/admin/panel';
        break;
      case 1:
        route = '/analista/muestras';
        break;
      case 2:
        route = '/secretaria/muestras';
          break;
      default:
        route = '/salir';
        break
    }

    return res.redirect(route);
  }
  return next();
}

export function isAdmin (req:any, res:any, next:any){
  if(!req.user){
    req.flash('errors', { msg: 'Debe iniciar sesión para poder ver esta información' });
    return res.redirect('/ingresar');

  }
  if(req.user.type == 0){
    return next();
  }
  req.flash('errors', {msg: 'Debe ser administrador para ver esta información'})
  return res.redirect('back');
}

export function isSecretary (req:any, res:any, next:any){
  if(!req.user){
    req.flash('errors', { msg: 'Debe iniciar sesión para poder ver esta información' });
    return res.redirect('/ingresar');

  }
  if(req.user.type == 2){
    return next();
  }
  req.flash('errors', {msg: 'Debe ser secretaria para ver esta información'})
  return res.redirect('back');
}

export function isAnalyst (req:any, res:any, next:any){
  if(!req.user){
    req.flash('errors', { msg: 'Debe iniciar sesión para poder ver esta información' });
    return res.redirect('/ingresar');

  }
  if(req.user.type == 1){
    return next();
  }
  req.flash('errors', {msg: 'Debe ser analista para ver esta información'})
  return res.redirect('back');
}