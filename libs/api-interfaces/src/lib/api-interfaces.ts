export interface Message {
    message: string;
}
export interface Alert {
    type: 'error' | 'success' | 'neutral' | 'warn';
    message: string;
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
