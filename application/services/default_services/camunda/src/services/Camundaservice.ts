import { Request, Response, NextFunction } from "express";
// import * as request from 'request';
import * as asyncLoop from 'node-async-loop';
import * as mongoose from 'mongoose';
import { Resourceschema } from '../model/resource';
const request = require('request');
const resourcemodel = mongoose.model('resource', Resourceschema);
import { CustomLogger } from '../config/Logger'
import { camundaService } from '../config/camundaService';


let listofresources = [];

export class CamundaService {

    private resourcevalue: any;

    constructor() { }

    public camundarequest(req: Request, callback): void {
        new CustomLogger().showLogger('info', 'Enter into Camundaservice.ts: camundarequest');
        resourcemodel.find().then((result) => {
            asyncLoop(result, (resource, next) => {
                if (resource.resources === 'home') {
                    this.resourcevalue = resource.resources;
                }
                listofresources.push(resource.resources);
                next();
            }, async (err) => {
                if (err) {
                    return err;
                }
                else {
                    let camundaresponse = await this.camundaauthorization();
                    new CustomLogger().showLogger('info', 'Exit from Camundaservice.ts: camundarequest');
                    callback(camundaresponse);
                }
            })
        }).catch((error) => {
            return error;
        })

    }

    public camundaauthorization() {
        new CustomLogger().showLogger('info', 'Enter into Camundaservice.ts: camundaauthorization');
        var body = {
            "variables": {
                "resources": { "value": `${this.resourcevalue}`, "type": "String" },
                "resourcetype": { "value": "Screen", "type": "String" }
            }
        }
        // var geturl = 'http://3.92.72.204:32676/engine-rest/engine/default/decision-definition/count';
        const postUrl = `${camundaService.camundaUrl}/engine-rest/engine/default/decision-definition/key/Accesslevel/evaluate`;
        new CustomLogger().showLogger('info', 'Exit from Camundaservice.ts: camundaauthorization');

        return new Promise(resolve => {
            request.post({ url: postUrl, json: body }, function (error, response, body) {
                var responsebody = JSON.stringify(body);
                var finaldata = JSON.parse(responsebody);
                var responsevalue = finaldata[0];
                const test = responsevalue;
                const test2 = JSON.stringify(test);
                // const test3 = JSON.parse(test2);
                // // var data = test3.replace(/(\r\n|\n|\r|\s|n)/gm, '');
                // // console.log('-------->>>>', data);
                resolve(JSON.parse(test2));
            });
        })


    }
}