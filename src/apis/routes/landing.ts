import { Router } from 'express'

import * as landingController from '../../services/Landing/Infrastructure/controller'
export default (app: Router) => {

  app.get('/', landingController.getHome);
  app.get('/servicios', landingController.getMatrixDetail);
  
}