import { Router } from 'express';
import  landing from './routes/landing';
import  access from './routes/access';
import  admin from './routes/admin';
import  secretary from './routes/secretary';
import analyst from './routes/analyst';

export default () => {
	const app = Router();
	landing(app);
	access(app);
	admin(app);
	secretary(app);
	analyst(app);

	return app
}
