import { Module } from '@nestjs/common';
import { FirebaseService } from './service/firebase.service';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';

@Module({
    providers: [FirebaseService, FirebaseAuthStrategy],
    exports: [FirebaseService, FirebaseAuthStrategy],
})
export class FirebaseModule {}
