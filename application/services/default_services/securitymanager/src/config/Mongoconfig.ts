var vault = require("node-vault")({ apiVersion: 'v1', endpoint: 'http://gep-dev-telemetry.gep-dev-201902.svc.cluster.local:8200', token: 'vault-geppetto-2019'}); 
import * as mongoose from "mongoose";

export class MongoConfig {
    public mongoConfig(): void {
        vault.read('kv/kubernetes/database/mongo/connection').then((result) => {
            mongoose.connect(result.data.mongo_connection_string);
        })
    }
}