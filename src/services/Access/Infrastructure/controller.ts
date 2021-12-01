import loginUser from '../UseCase/login'; import registerUser from '../UseCase/register';
import forgotUser from '../UseCase/forgot';
import resetPasswordUser from '../UseCase/updatePassword';

import { plainMailService } from '../../../loaders/nodeMailer';

export function dashboard(req: any, res:any){
  return res.render('admin/dashboard');
}

export async function getLogin(req: any, res: any, next:any){
 try{
    return res.render('access/login');
  }catch(error){
    return next(error)
  }
}

export async function postLogin(req: any, res: any){
  try{
    const { usercode, pswd } = req.body;

    const user = await loginUser(usercode, pswd);

    let route: string = '';
    switch(user.type){
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
        throw 'Error al solicitar la información.';
    }

    return req.logIn(user, function(err:any) {
      if (err) {
        throw "Ha ocurrido un error interno al iniciar su sesión, intenlo más tarde.";
      }
      req.flash("success", { msg: `Bienvenido.` })
      return res.redirect(route);
    });


  }catch(error){
    req.flash('errors', { msg: error});
    return res.redirect('back');
  }
}

export async function getSignUp(req: any, res: any, next:any){
 try{
    return res.render('access/register');
  }catch(error){
    return next(error)
  }
}

export async function postSignUp(req: any, res: any){ 
  try{
    const { usercode, pswd  } = req.body;

    const newUser = await registerUser(
      usercode,
      pswd
    );

    return req.logIn(newUser, function(err:any) {
      if (err) {
        throw "Ha ocurrido un error interno al registrar la cuenta, intenlo más tarde.";
      }
      req.flash("success", { msg: `Bienvenido.` })
      return res.redirect('/mis-cursos');
    });


  }catch(error){
    req.flash('errors', { msg: error});
    return res.redirect('back');
  }
}

export async function logout(req: any, res: any) {
  req.logout();
  req.session.destroy((err: any) => {
    if (err) console.log('Error : Error al destruir la sesión, intente de nuevo en unos minutos.', err);
    req.user = null;
    res.redirect('/ingresar');
  });
};

export async function getForgot(req: any, res: any, next:any){
 try{
    return res.render('access/forgot');
  }catch(error){
    return next(error)
  }
};

export async function postForgot(req: any, res: any){
  try{
    const { email } = req.body;

    const token: string = await forgotUser(email);
    const subject: string ="Agroambiental: Recupera tu contraseña"

    const text: string = `
      Hola,\n\n
      Hemos recibido su solicitud de cambio de contraseña. Este correo electrónico contiene la información que necesita para cambiar su contraseña.\n\n
      Haga clic en este enlace para ingresar su nueva contraseña: http://${req.headers.host}/reiniciar/${token}\n\n
      Atentamente,
      Agroambiental`

    const message: string = await plainMailService("no-reply@starter.pe",email,subject,text);

    req.flash('info', { msg: 'Se envio un correo con los pasos a seguir.'});
    return res.redirect('back');

  }catch(error){
    req.flash('errors', { msg: error});
    return res.redirect('back');
  }
}

export async function getReset(req: any, res: any, next:any){
 try{
    return res.render('access/reset');
  }catch(error){
    return next(error)
  }
};

export async function postReset(req: any, res: any){
  try{
    const { token } = req.params;
    const { pswd } = req.body;

    const response: string = await resetPasswordUser(token, pswd);

    req.flash('success', { msg: 'Se restablecio la contraseña.'});
    return res.redirect('/ingresar');

  }catch(error){
    req.flash('errors', { msg: error});
    return res.redirect('back');
  }
}
