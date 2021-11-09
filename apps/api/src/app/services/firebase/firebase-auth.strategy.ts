import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { DecodedIdToken } from 'firebase-admin/auth';
import { FirebaseService } from './firebase.service';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
    Strategy,
    'firebase-auth'
) {
    constructor(private firebaseService: FirebaseService) {
        super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() });
    }
    async validate(token: string): Promise<DecodedIdToken> {
        const firebaseUser: DecodedIdToken = await this.firebaseService
            .getAuth()
            .verifyIdToken(token, true)
            .catch((err) => {
                console.log(err);
                throw new UnauthorizedException(err.message);
            });
        if (!firebaseUser) {
            throw new UnauthorizedException();
        }
        Logger.log(firebaseUser);
        return firebaseUser;
    }
}
