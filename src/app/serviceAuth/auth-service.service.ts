import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

function _window():any{
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router : Router) { }

  get nativeWindow():any{
    return _window();
  }

  getToken(){
    return localStorage.getItem('teken');
  }

  isLoggedIn(){
    return !!localStorage.getItem('token') || !!localStorage.getItem('stateToken') || !!localStorage.getItem('franchiseToken') || !!localStorage.getItem('bdToken')
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/'])
  }
}
