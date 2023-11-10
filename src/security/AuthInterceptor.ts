import { Injectable } from "@angular/core"
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http"
import { Observable } from "rxjs"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("TOKEN")
        let authReq = req
        //console.log("------>> ", token != null);
        console.log("------>> T ", token);
        if(token != null) {
            console.log("---------->>> TRUE TOKEN ")
            authReq = req.clone({setHeaders: {Authorization:`Bearer ${token}`}})
        }

    //console.log("---------->>> HEADERS AUTH ", authReq.headers.get("Authorization"))
    //console.log("---------->>> REQUEST ", authReq.headers.get("Access-Control-Request-Headers"))
    //console.log("---------->>> HEADERS ", authReq.headers)
    //console.log("---------->>> REQ ", authReq)


        return next.handle(authReq)
    }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}];