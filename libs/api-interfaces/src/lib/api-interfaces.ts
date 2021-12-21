/**
 * Message
 */
export interface Message {
    /**
     * Message
     */
    message: string;
}

/**
 * Alert
 */
export interface Alert {
    /**
     * Type of the alert
     */
    type: 'error' | 'success' | 'neutral' | 'warn';
    /**
     * Message of the alert
     */
    message: string;
}

/**
 * Data to change password
 */
export interface ChangePasswordData {
    /**
     * Old password
     */
    oldPassword: string;
    /**
     * New password
     */
    newPassword: string;
}

/**
 * Data to change email
 */
export interface ChangeEmailData {
    /**
     * Current password
     */
    password: string;
    /**
     * New email
     */
    newEmail: string;
}

/**
 * Data to change profile
 */
export interface ChangeProfileData {
    /**
     * Display name
     */
    displayName?: string;
    /**
     * Photo url
     */
    photoURL?: string;
}

/**
 * Choice of a poll
 */
export interface Choice {
    /**
     * Date
     */
    date: string;
    /**
     * Number of votes
     */
    votes: number;
}

/**
 * Poll
 */
export interface Poll {
    /**
     * ID of a poll
     */
    id?: string;
    /**
     * Title
     */
    title: string;
    /**
     * Choices
     */
    choices: Choice[];
    /**
     * Users that voted
     */
    usersVoted: string[];
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
    uid?: string;
    isAdmin?: boolean;
    email?: string
}

export interface Event {
    id?: string;
    name: string;
    description: string;
    date: Date;
    participants?: string[]; // Array of uid's
    owner?: string;
}

export interface Group {
    id?: string;
    name?: string;
    description?: string;
    admin: string;
    member?: Member[]; // Array of uid's
}

export interface Game {
    id?: string;
    groupId: string;
    activity: Activity;
    firstTeamId: string;
    secondTeamId: string;
    date: Date;
    firstTeamScore?: number;
    secondTeamScore?: number;
}

export interface Team {
    id?: string;
    member: Member[];
    groupId: string;
}

export interface User {
    uid: string;
    email?: string;
    emailVerified?: boolean;
    photoURL?: string;
    displayName?: string;
}

export enum Activity {
    soccer = 'SOCCER_ACTIVITY'
}
