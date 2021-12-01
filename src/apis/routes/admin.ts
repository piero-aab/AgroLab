import { Router } from 'express'

import * as adminController from '../../services/Admin/Infrastructure/controller'
import { isEmail } from '../middlewares/isEmail';
import { isAdmin } from '../middlewares/auth';

export default (app: Router) => {

  app.get('/admin/panel', [ isAdmin ],  adminController.getDashboard);
  app.get('/admin/analistas', [ isAdmin ],  adminController.getAnalysts);
  app.post('/admin/analistas/crear', [ isAdmin,isEmail ], adminController.postCreateAnalyst);
  app.post('/admin/analistas/editar', [ isAdmin ], adminController.updateAnalyst);
  app.post('/admin/analistas/:id/habilitar', [ isAdmin ],adminController.setStatusAnalyst);
  app.get('/admin/muestras',[ isAdmin ],  adminController.getSamples);
  app.get('/admin/muestras/:id/asignar',[ isAdmin ],  adminController.getAssignAnalyst);
  app.post('/admin/muestras/:id/asignar',[ isAdmin ],  adminController.postAssignAnalyst);
  app.get('/admin/muestras/:id', [ isAdmin ],  adminController.getSampleDetail);
}
