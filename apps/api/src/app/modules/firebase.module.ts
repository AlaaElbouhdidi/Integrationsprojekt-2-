import { Module } from '@nestjs/common';
import { FirebaseService } from '../services/firebase/firebase.service';
import { FirebaseAuthStrategy } from '../services/firebase/firebase-auth.strategy';

@Module({
    providers: [FirebaseService, FirebaseAuthStrategy],
    exports: [FirebaseService, FirebaseAuthStrategy],
})
export class FirebaseModule {}
