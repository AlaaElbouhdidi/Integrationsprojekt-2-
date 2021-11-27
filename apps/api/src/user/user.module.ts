import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseService } from '../firebase/service/firebase.service';
/**
 * The UserModule
 * */
@Module({
    imports: [FirebaseModule],
    controllers: [UserController],
    providers: [UserService, FirebaseService],
    exports: [UserService],
})
export class UserModule {}
