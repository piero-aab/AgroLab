import { Router } from 'express';
import  access from './routes/access';
import  admin from './routes/admin';

export default () => {
	const app = Router();
	access(app);
	admin(app);

	return app
}
