import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {
    constructor(private firebaseService: FirebaseService) {}

    use(req: Request, res: Response, next: () => void) {
        const token = req.headers.authorization;
        if (token != null && token != '') {
            this.firebaseService
                .getAuth()
                .verifyIdToken(token.replace('Bearer ', ''))
                .then(async (decodedToken) => {
                    req['user'] = {
                        email: decodedToken.email,
                        roles: decodedToken.roles || [],
                        type: decodedToken.type,
                    };
                    next();
                })
                .catch(() => {
                    PreAuthMiddleware.accessDenied(req.url, res);
                });
        } else {
            PreAuthMiddleware.accessDenied(req.url, res);
        }
    }

    private static accessDenied(url: string, res: Response) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'access denied',
        });
    }
}
