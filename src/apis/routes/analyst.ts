import { Router } from 'express'
import { isAnalyst } from '../middlewares/auth';
import * as analystController from '../../services/Analyst/Infrastructure/controller'

export default (app: Router) => {

  app.get('/analista/muestras',  [ isAnalyst], analystController.getSamples);
  app.get('/analista/muestra/:id', [ isAnalyst], analystController.getSample);
  app.post('/analista/muestra/:id', [ isAnalyst], analystController.postSampleResult);
  app.get('/analista/muestra/:id/:index', [ isAnalyst], analystController.getParameter);
  app.get('/analista/muestra/editar/:id/:index', [ isAnalyst], analystController.getEditParameter);
  app.post('/analista/muestra/:id/:index', [ isAnalyst], analystController.postParameter);
  app.get('/analista/muestra/:id/:index/dureza-total', [ isAnalyst], analystController.getTotalHardness)

};
