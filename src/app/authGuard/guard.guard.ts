import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../serviceAuth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private authService:AuthServiceService, private router:Router){}

  canActivate()
    {
      if(this.authService.isLoggedIn()){
        return true;
      }
      this.router.navigate(['']);
      return false;
    
  }
  
}
