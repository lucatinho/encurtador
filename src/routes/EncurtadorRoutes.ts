import {Router} from 'express';
import ScamController from "../app/controllers/EncurtadorController";

const encurtadorRoutes = Router();
const route_fix = '/encurtador';


encurtadorRoutes.post(`${route_fix}`, ScamController.encurtar);
encurtadorRoutes.get(`${route_fix}/:shortUrl`, ScamController.pegarUrl);

export default encurtadorRoutes;
