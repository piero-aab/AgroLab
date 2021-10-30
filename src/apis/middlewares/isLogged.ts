export function isLogged ( req: any, res:any, next:any){
  
  if(req.user){

    let route: string = '';
    switch(req.user.type){
      case 0: 
        route = '/mis-cursos';
        break;
      case 1:
        route = '/cursos';
        break;
      default:
        route = '/salir';
        break
    }

    return res.redirect(route);
  }
  return next();
}
