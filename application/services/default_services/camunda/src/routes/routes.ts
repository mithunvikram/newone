import { CamundaController } from '../controllers/Camundacontroller';

export class Routes {

    public camunda: CamundaController = new CamundaController();


    public routes(app): void {

        app.route('/accesslevel').post(this.camunda.camundacontroller);
    }
}