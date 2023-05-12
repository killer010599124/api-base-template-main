import express from 'express';
import { myTest } from '../Controllers/TestController';

const myRouterFile = express.Router();

// ===================================================================================

// ruta de pruebas
myRouterFile.route('/').delete(myTest).get(myTest).post(myTest).put(myTest);

// ===================================================================================

export default myRouterFile;
