import { Request } from 'request';
import * as asyncLoop from 'node-async-loop';
import * as mongoose from 'mongoose';
import * as FormData from 'form-data';
import * as request from 'request';
import * as fs from 'fs';
import * as path from 'path'
import { camundaService } from '../config/camundaService';


export class DmnFile {

    public async dmnFileDeploye() {
        // const DmnPath = '/home/decoders/Videos/generated-geppetto/DanTest701/application/services/camunda/Gepauthorize.dmn';
        const DmnPath = path.resolve(__dirname, '../../Gep_authorize.dmn');
        const postUrl = `${camundaService.camundaUrl}/engine-rest/deployment/create`;
        const options = {
            url: postUrl,
            headers: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                "data": fs.createReadStream(DmnPath),
                "deployment-name": "Gepauthorize",
                "enable-duplicate-filtering": "true",
                "deploy-changed-only": "true",
            }
        }
        request.post(options, ((err, response, body) => {
            console.log('error --->>>', err);
            // console.log('bodyy -------->>>>', body);
            // console.log('i am response -->>', response);
        }))

    }

}
