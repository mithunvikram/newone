import * as express from 'express';
import { Request, Response } from 'express';
import * as Constant from '../config/Constant';
import { ApiAdaptar }  from '../config/apiAdapter';
import Controller from '../interface/controller.interface';
import * as jwt from 'jsonwebtoken';
import { CustomLogger } from '../config/Logger'

export class securityController implements Controller {
      public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/signup', this.signup);
this.router.post('/login', this.login);
this.router.put('/consent', this.consent);
this.router.put('/logout', this.logout);
this.router.post('/googlesignin', this.googleLogin);
this.router.get('/getallusers', this.getAllUser);
this.router.get('/getuser/:id', this.getUserById);
this.router.get('/getallroles', this.getAllRole);
this.router.put('/updateuser', this.updateUser);
    }

public signup(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: signup');
        new ApiAdaptar().post(Constant.SECURITYURL + `${req.url}` , req.body).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: signup');
        }).catch(err => {
            res.send(err);
        });
    }
public logout(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: logout');
        new ApiAdaptar().put(Constant.SECURITYURL + `${req.url}` , req.body).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: logout');
        }).catch(err => {
            res.send(err);
        });
    }
public googleLogin(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: googleLogin');
        new ApiAdaptar().post(Constant.SECURITYURL + `${req.url}` , req.body).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: googleLogin');
        }).catch(err => {
            res.send(err);
        });
    }
public getAllUser(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: getAllUser');
        new ApiAdaptar().get(Constant.SECURITYURL + `${req.url}` ).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: getAllUser');
        }).catch(err => {
            res.send(err);
        });
    }
public getUserById(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: getUserById');
        new ApiAdaptar().get(Constant.SECURITYURL + `${req.url}` ).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: getUserById');
        }).catch(err => {
            res.send(err);
        });
    }
public getAllRole(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: getAllRole');
        new ApiAdaptar().get(Constant.SECURITYURL + `${req.url}` ).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: getAllRole');
        }).catch(err => {
            res.send(err);
        });
    }
public updateUser(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: updateUser');
        new ApiAdaptar().put(Constant.SECURITYURL + `${req.url}` , req.body).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: updateUser');
        }).catch(err => {
            res.send(err);
        });
    }


  public login(req: Request, res: Response) {
                  new CustomLogger().showLogger('info', 'Enter into securityController.ts: login');
        new ApiAdaptar().post(Constant.SECURITYURL + `${req.url}` , req.body).then(async (result) => {
            // @ts-ignore
            const token = result.body.Idtoken;
            // @ts-ignore
            if (result.body.Idtoken === null || result.body.Idtoken === '' || result.body.Idtoken === undefined) {
                req.baseUrl === '/mobile' ? res.send({"Userdetails": result}) :
                    req.baseUrl === '/desktop' ? res.send({"Userdetails": result}) : res.send(null)
            } else {
                          
            jwt.verify(token, 'geppettosecret', (err, decoded) => {
                if (err) {
                    return ({ 'status': 'Unauthorized', 'error': err, 'Userdetails': result });
                } else {
                    new ApiAdaptar().post(Constant.AUTHPROXYURL + `/proxy`, decoded).then((response) => {
                        const temp = {
                            "Access": JSON.parse(JSON.stringify(response)).body,
                            "Userdetails": result
                        }
                req.baseUrl === '/mobile' ? res.send(temp) :
                req.baseUrl === '/desktop' ? res.send(temp) : res.send(null)
                  new CustomLogger().showLogger('info', 'Exit from securityController.ts: login');
                    })
                }
            })

            }
        }).catch(err => {
            res.send(err);
        });
    }



   public consent(req: Request, res: Response) {
                         new CustomLogger().showLogger('info', 'Enter into securityController.ts: consent');
        new ApiAdaptar().put(Constant.SECURITYURL + `${req.url}` , req.body).then(async (result) => {
            // @ts-ignore
            const token = result.body.Idtoken;
            
            jwt.verify(token, 'geppettosecret', (err, decoded) => {
                if (err) {
                    return ({ 'status': 'Unauthorized', 'error': err, 'Userdetails': result });
                } else {
                    new ApiAdaptar().post(Constant.AUTHPROXYURL + `/proxy`, decoded).then((response) => {
                        const temp = {
                            "Access": JSON.parse(JSON.stringify(response)).body,
                            "Userdetails": result
                        }
                req.baseUrl === '/mobile' ? res.send(temp) :
                req.baseUrl === '/desktop' ? res.send(temp) : res.send(null)
                         new CustomLogger().showLogger('info', 'Exit from securityController.ts: consent');
                    })
                }
            })

        }).catch(err => {
            res.send(err);
        });
    }

}
