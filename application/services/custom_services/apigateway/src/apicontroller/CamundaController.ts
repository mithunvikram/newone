import * as express from 'express';
import { Request, Response } from 'express';
import * as Constant from '../config/Constant';
import { ApiAdaptar }  from '../config/apiAdapter';
import Controller from '../interface/controller.interface';
import { CustomLogger } from '../config/Logger'

export class CamundaController implements Controller {
      public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/accesslevel', this.camunda);
    }

public camunda(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into CamundaController.ts: camunda');
        new ApiAdaptar().post(Constant.CAMUNDAURL + `${req.url}` , req.body).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from CamundaController.ts: camunda');
        }).catch(err => {
            res.send(err);
        });
    }




}
