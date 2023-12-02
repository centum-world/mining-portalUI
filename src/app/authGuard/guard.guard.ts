import { Injectable } from '@angular/core';
import { CanActivate,CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../serviceAuth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate, CanDeactivate<any> {

  constructor(private authService:AuthServiceService, private router:Router){}

  canActivate()
    {
      if(this.authService.isLoggedIn()){
        return true;
      }
      this.router.navigate(['']);
      return false;
    
  }

  canDeactivate()
  {
    if (this.authService.isLoggedIn()) {
          this.router.navigate(['/miningdashboard/home']);
          return false;
    }
    return true;
  }
  
}
