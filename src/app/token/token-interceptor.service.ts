import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from "../serviceAuth/auth-service.service";
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector, private authService : AuthServiceService, private toastr : ToastrService) {}

  intercept(req: HttpRequest<any>, next:HttpHandler) : Observable<HttpEvent<any>> {
    let token =
      localStorage.getItem("token") ||
      localStorage.getItem("stateToken") ||
      localStorage.getItem("franchiseToken") ||
      localStorage.getItem("bdToken");
    let tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    // return next.handle(tokenReq);
    return next.handle(tokenReq).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Token expired or unauthorized, log out
          return this.handleUnauthorizedError(error);
        } else {
          return throwError(error);
        }
      })
    );
  }
  private handleUnauthorizedError(error: HttpErrorResponse): Observable<any> {
    // this.toastr.warning('Session expired!!')
    this.authService.logout();
    return throwError(error);
  }
}
