import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import httpResponse from '../../common/httpResponse';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        const instanceError = err.constructor.name;
        // console.log(instanceError, err);

        switch (instanceError) {
          // Database errors
          case 'QueryFailedError':
            if (
              /^duplicate key value violates unique constraint/.test(
                err.message,
              )
            ) {
              return throwError(
                new HttpException(err.message, httpResponse.CONFLICT.status),
              );
            }

            return throwError(
              new HttpException(err.message, httpResponse.BAD_REQUEST.status),
            );
            break;

          // Error instance only
          case 'Error':
            return throwError(
              new HttpException(err.message, httpResponse.BAD_REQUEST.status),
            );
            break;
          default:
        }

        return throwError(err);
      }),
    );
  }
}
