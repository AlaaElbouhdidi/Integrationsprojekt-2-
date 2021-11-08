import { Module } from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { UserController } from '../controllers/user/user.controller';
import { FirebaseModule } from '../modules/firebase.module';

@Module({
    imports: [FirebaseModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
