import { Router } from 'express'

import * as secretaryController from '../../services/Secretary/Infrastructure/controller'
import { validateSampleForm } from '../middlewares/validateSampleForm';
import { isSecretary } from '../middlewares/auth';

export default (app: Router) => {

  app.get('/secretaria/muestras',  [ isSecretary],secretaryController.getSamples);
  app.get('/secretaria/muestras/crear',  [ isSecretary],secretaryController.getCreateSample)
  app.post('/secretaria/muestras/crear', [ isSecretary,validateSampleForm],  secretaryController.postCreateSample)
  app.get('/secretaria/muestras/editar/:id', [ isSecretary], secretaryController.getEditSample)
  app.post('/secretaria/muestras/editar/:id', [ isSecretary,validateSampleForm], secretaryController.postEditSample)
  app.get('/secretaria/muestras/:id/reporte/crear', [ isSecretary], secretaryController.getCreateReport)
  app.post('/secretaria/muestras/:id/reporte/crear', [ isSecretary], secretaryController.postCreateReport)
  app.get('/secretaria/muestras/:id/reporte/editar', [ isSecretary], secretaryController.getCreateReport)
  app.get('/secretaria/muestras/:id/reporte/detalle', [ isSecretary], secretaryController.getReportDetail)
};
