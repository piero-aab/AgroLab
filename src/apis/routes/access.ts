import { Router } from 'express'

import * as accessController from '../../services/Access/Infrastructure/controller'

import { isLogged } from '../middlewares/auth';
import { isEmail } from '../middlewares/isEmail';
import { isUserCode } from '../middlewares/isUserCode';
import { validateRegister } from '../middlewares/validateRegister';
import { validateReset } from '../middlewares/validateReset';

export default (app: Router) => {
  app.get('/ingresar', [ isLogged ], accessController.getLogin);
  app.post('/ingresar', [ isUserCode ], accessController.postLogin);
/*   app.get('/registrarme', [ isLogged ],  accessController.getSignUp);
  app.post('/registrarme', [ validateRegister ],  accessController.postSignUp); */
  app.get('/salir', accessController.logout);
  app.get('/recuperar-contrasena', [ isLogged ], accessController.getForgot);
  app.post('/recuperar-contrasena', [ isEmail ], accessController.postForgot);
  app.get('/reiniciar/:token', [ isLogged ], accessController.getReset);
  app.post('/reiniciar/:token', [ validateReset ], accessController.postReset);

}
