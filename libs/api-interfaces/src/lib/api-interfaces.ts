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
}

export interface Event {
    name: string;
    description: string;
    date: Date;
    participants?: string[] // Array of uid's
}

export interface Group {
    id?: string;
    name?: string;
    activity?: Activity;
    description?: string;
    member?: Member[]; // Array of uid's
}

export enum Activity {
    soccer = 'SOCCER_ACTIVITY',
}
