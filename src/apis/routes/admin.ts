import { Router } from 'express'

import * as adminController from '../../services/Admin/Infrastructure/controller'
export default (app: Router) => {

  app.get('/admin/panel',  adminController.getDashboard);

}
