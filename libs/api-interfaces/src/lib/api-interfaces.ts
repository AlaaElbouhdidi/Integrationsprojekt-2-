export interface Message {
    message: string;
}

export interface Alert {
    type: 'error' | 'success' | 'neutral' | 'warn';
    message: string;
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
    apiUrl: string;
}

export interface Member {
    uid: string;
    isAdmin: boolean;
    groupid?: string;
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
    activity?: Activity;
    member?: Member[]; // Array of uid's
}

export interface Game {
    activity: ActivityEnum;
    firstTeam: Team;
    secondTeam: Team;
    date: Date;
    firstTeamScore?: number;
    secondTeamScore?: number;
}

export interface Team {
    member: Member[];
    groupId: string;
}

export interface Activity {
    id?: string;
    name: string;
    logo?: string;
}

export interface User {
    id: string;
    email?: string;
    emailVerified?: boolean;
    photoURL?: string;
    displayName?: string;
}

export enum ActivityEnum {
    soccer = 'SOCCER_ACTIVITY',
}
