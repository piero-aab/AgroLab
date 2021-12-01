export function isUserCode ( req: any, res: any, next: any): any{
    try{
      const { usercode, pswd } = req.body;
      let pattern = /^[0-9]{7,10}$/g
      if( usercode === '' || pswd === '') throw 'Faltan campos requeridos'
      if(! pattern.test(usercode)) throw "El código de usuario no es válido";
      next();
    }catch(error){
      req.flash('errors', { msg: error});
      return res.redirect('back');
    }
  }  