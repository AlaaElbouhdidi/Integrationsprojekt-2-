import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppService } from './services/app/app.service';
import { PreAuthMiddleware } from './middleware/auth/pre-auth.middleware';
import { FirebaseModule } from './modules/firebase.module';

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
