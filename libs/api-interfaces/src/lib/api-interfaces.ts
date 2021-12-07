export interface Message {
    message: string;
}

export interface Alert {
    type: 'error' | 'success' | 'neutral' | 'warn';
    message: string;
}
export interface ChangePasswordData {
    oldPassword: string,
    newPassword: string
}
export interface ChangeEmailData {
    password: string;
    newEmail: string;
}
export interface ChangeProfileData {
    displayName?: string;
    photoURL?: string;
}
export interface Environment {
    firebase: {
        projectId: string;
        appId: string;
        storageBucket: string;
        apiKey: string;
        authDomain: string;
        messagingSenderId: string;
    };
    production: boolean;
    port: number;
    apiUrl: string;
    clientUrl: string;
}

export interface Member {
    uid: string;
    isAdmin: boolean;
}

export interface Event {
    name: string;
    description: string;
    date: Date;
    participants?: string[]; // Array of uid's
}

export interface Group {
    name: string;
    description: string;
    activity: Activity;
    member: Member[]; // Array of uid's
}

export interface Game {
    activity: Activity;
    firstTeamId: string;
    secondTeamId: string;
    date: Date;
    firstTeamScore?: number;
    secondTeamScore?: number;
}

export interface Team {
    member: Member[];
    groupId: string;
}

export interface User {
    uid: string,
    email?: string;
    emailVerified?: boolean;
    photoURL?: string;
    displayName?: string;
}

export enum Activity {
    soccer = 'SOCCER_ACTIVITY',
}
