import { CamundaService } from '../services/Camundaservice';
import { Request, Response } from 'express';
import { CustomLogger } from '../config/Logger'

let camunda = new CamundaService;

export class CamundaController {

    public camundacontroller (req: Request, res: Response){
        new CustomLogger().showLogger('info', 'Enter into Camundacontroller.ts: camundacontroller');
        camunda.camundarequest(req,(response) => {
            res.status(200);
            res.json(response)  
        new CustomLogger().showLogger('info', 'Exit from Camundacontroller.ts: camundacontroller');
        })
    }
}