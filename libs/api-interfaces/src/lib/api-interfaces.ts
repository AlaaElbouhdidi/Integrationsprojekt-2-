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
        projectId: string,
        appId: string,
        storageBucket: string,
        apiKey: string,
        authDomain: string,
        messagingSenderId: string,
    }
    production: boolean;
    apiUrl: string;
}
export interface User {
    id?: string;
    email?: string;
    emailVerified?: boolean;
    photoURL?: string;
    displayName?: string;
}
export interface Member {
    uid?: string;
    isAdmin?: boolean;
    groupid?: string;
}
export interface Group {
    id?: string;
    name?: string;
    activity?: Activity;
    description?: string;
    members?: Member[];
}
export interface Activity {
    id?: string;
    name?: string;
    logo?: string;
}
