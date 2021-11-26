import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../firebase/service/firebase.service';
import * as firebase from 'firebase-admin';

@Injectable()
export class UserService {
    constructor(private readonly firebaseService: FirebaseService) {}

    async getUsers(): Promise<firebase.auth.ListUsersResult> {
        return this.firebaseService.getUsers();
    }
}
