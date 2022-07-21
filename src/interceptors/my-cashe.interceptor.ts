import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
    constructor(
        private reflector: Reflector,
    ) {
    }


    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const method = context.getHandler();

        const cachedData = this.reflector.get<any>('cacheData', method);
        const cachedTime = this.reflector.get<Date>('cacheTime', method)
        const cacheTimeInSec = this.reflector.get<number>('cacheTimeInSec', method)


        if (cachedData && (+cachedTime + cacheTimeInSec *1000 > +new Date())) {
            console.log('Using cashed data');
            return of(cachedData);
        } else {
            console.log('Generating live data.');
            return next.handle().pipe(
                tap(data => {
                    Reflect.defineMetadata('cacheData', data, method);
                    Reflect.defineMetadata('cacheTime', new Date(), method);


                }),
            );
        }
    }



}