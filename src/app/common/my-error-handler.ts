import {ErrorHandler, Injectable, Injector} from "@angular/core";
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";
import {ViewWrappedError} from "@angular/core/src/linker/errors";

/**
 * Created by paulliu on 2017/1/17.
 */

@Injectable()
export class MyErrorHandler implements ErrorHandler {

    private router;

    constructor(private notificationsService: NotificationsService, private injector: Injector) {
        if (this.router == null) {
            this.router = this.injector.get(Router);
        }
    }

    handleError(error: any) {
        let unwrappedError = error.rejection || error;
        let message = "";

        console.log(unwrappedError);

        if (unwrappedError.name == "Error" && unwrappedError.message.indexOf("Cannot match any routes") >= 0) {
            this.router.navigate(["/404"]);
        }

        if (unwrappedError.status == 0) {
            message = "Network error";
        }
        else {
            if (unwrappedError instanceof ViewWrappedError) {
                message = unwrappedError.originalError.message;
            }
            else {
                message = unwrappedError.json().message;
            }
        }

        this.router.navigate(["/500"]);

        // setTimeout(() => {
        //     this.notificationsService.error('Error', message);
        // }, 1);
    }
}
