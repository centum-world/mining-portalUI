import { Injectable } from '@angular/core';

function _window():any{
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  get nativeWindow():any{
    return _window();
  }

  getToken(){
    return localStorage.getItem('teken');
  }

  isLoggedIn(){
    return !!localStorage.getItem('token') || !!localStorage.getItem('stateToken') || !!localStorage.getItem('franchiseToken') || !!localStorage.getItem('bdToken')
  }
}
