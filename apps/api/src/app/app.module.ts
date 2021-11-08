import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppService } from './services/app/app.service';
import { FirebaseModule } from './modules/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user.module';

@Module({
    imports: [
        FirebaseModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './.env',
        }),
        UserModule,
       
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
