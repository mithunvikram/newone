    import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, GuardsCheckStart
} from '@angular/router';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BroadcastService } from './broadcast.service';

import 'rxjs/add/operator/filter';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  @Output() getPermission = new EventEmitter();
  public jwtToken: any;
  public accessRoutes: any;
  public userRole: any;
  public viewPermission: any;
  public routeName: any;
  public checkAdmin: any;
  public landingPageObject: any;
  public projectScreen: any;
  public userId: any;

  constructor(
    private route: Router,
    public broadcastService: BroadcastService
  ) {
    this.broadcastService.currentUserName.subscribe(authGuardValue => {
      // @ts-ignore
      this.accessRoutes = authGuardValue.Access;
    });

    this.routeEvent(this.route);
  }

  public routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof GuardsCheckStart) {
        this.routeName = e.url.replace(/\?[a-z].*/g, '').replace(/\/:[a-z].*/g, '').replace(/\//g, '');
      }
    });
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.routeName = state.url.replace(/\?[a-z].*/g, '').replace(/\/:[a-z].*/g, '').replace(/\//g, '');
    this.userId = sessionStorage.getItem('Id');
    if (this.userId !== null) {
      this.jwtToken = sessionStorage.getItem('JwtToken');
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(this.jwtToken);
      this.userRole = decodedToken.role;
      const url = window.location.href;
      this.accessRoutes = JSON.parse(sessionStorage.getItem('Access'));

      if (this.accessRoutes) {
         if (this.routeName.includes('profile?id=')) {
          this.routeName = this.routeName.split('?');
          this.routeName = this.routeName[0];
        }
        this.accessRoutes.forEach(element => {
          const Developer = element['Developer'];
          const Admin = element['Admin'];
          const User = element['Standard User'];
          if (this.userRole === 'Admin') {
            const adminAccess = JSON.parse(Admin.value);
            const adminPage = adminAccess['Admin'];
            this.viewPermission = adminPage[0].Access.value;
            const Project = adminAccess['Project'];
            const Landing = adminAccess['Landing'];
            Project.forEach(projectAccess => {
              const projectPermission = projectAccess.Access.value;
              this.viewPermission = projectPermission;
              const projectField = projectAccess.Fields;
              const config = projectField[0].Configuration;
              const configValue = config.value;
              this.projectScreen = {
                'Access': projectPermission,
                'Fields': {
                  'config': configValue
                }
              };
            });
            Landing.forEach(landingAccess => {
              const landingPage = landingAccess.Access.value;
              if (landingPage === 'true') {
                const landingFields = landingAccess.Fields;
                this.landingPageObject = {
                  'Access': landingPage,
                  'Fields': landingFields
                };
              }
            });
            this.broadcastService.sendMessage({ 'Landing': this.landingPageObject, 'Project': this.projectScreen });
          }
          if (this.userRole === 'Developer') {
            const developerAccess = JSON.parse(Developer.value);
            this.checkAdmin = developerAccess.Admin.Access.value;
            if (this.checkAdmin === 'false') {
              const Project = developerAccess['Project'];
              const Landing = developerAccess['Landing'];
              Project.forEach(projectAccess => {
                const projectPermission = projectAccess.Access.value;
                this.viewPermission = projectPermission;
                const projectField = projectAccess.Fields;
                const config = projectField[0].Configuration;
                const configValue = config.value;
                this.projectScreen = {
                  'Access': projectPermission,
                  'Fields': {
                    'config': configValue
                  }
                };
              });
              Landing.forEach(landingAccess => {
                const landingPage = landingAccess.Access.value;
                if (landingPage === 'true') {
                  const landingFields = landingAccess.Fields;
                  this.landingPageObject = {
                    'Access': landingPage,
                    'Fields': landingFields
                  };
                }
              });
              this.broadcastService.sendMessage({ 'Landing': this.landingPageObject, 'Project': this.projectScreen });
            } else {
              this.getPermission.emit(developerAccess.Admin.Access.value);
              this.viewPermission = developerAccess.Admin.Access.value;
            }
          }
          if (this.userRole === 'Standarduser') {
            const userAccess = JSON.parse(User.value);
            this.projectScreen = {
              'Access': userAccess.Admin.Access.value
            };
            this.broadcastService.sendMessage({ 'Project': this.projectScreen });
            this.viewPermission = userAccess.Admin.Access.value;
          }
        });
	 if(this.routeName === 'home') {
         return true;
     }
      
if(this.routeName === 'logout') {
         return true;
     }
      
if(this.routeName === 'login') {
         return true;
     }
      
      
      if (this.routeName === 'admin') {
          if (this.viewPermission !== 'true') {
            return false;
          } else {
            return true;
          }
        }

        if (this.routeName === 'profile') {
          if (this.viewPermission !== 'true') {
            return false;
          } else {
            return true;
          }
        }
        if (this.routeName === 'admin') {
          if (this.viewPermission !== 'true') {
            return false;
          } else {
            return true;
          }
        }
        if (this.routeName === 'usermanagement') {
          if (this.viewPermission !== 'true') {
            return false;
          } else {
            return true;
          }
        }
      }
    } else {
      this.route.navigate(['']);
      return false;
    }
  }
}

