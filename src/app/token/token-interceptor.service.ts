import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req, next) {
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
    return next.handle(tokenReq);
  }
}
