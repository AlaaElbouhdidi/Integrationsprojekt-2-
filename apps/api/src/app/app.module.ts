import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PreAuthMiddleware } from './auth/pre-auth.middleware';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
    imports: [FirebaseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(PreAuthMiddleware).forRoutes({
            path: '/secure/*',
            method: RequestMethod.ALL,
        });
    }
}
