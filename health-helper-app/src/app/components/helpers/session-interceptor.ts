import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "src/app/services/local-storage.service";


@Injectable()
export class SessionInterceptor implements HttpInterceptor {
    constructor(private localStorageService: LocalStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const sessionKey = this.localStorageService.getSessionKey();

        if (sessionKey) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', sessionKey),
            });
            return next.handle(authReq);
        }

        return next.handle(req);
    }
}