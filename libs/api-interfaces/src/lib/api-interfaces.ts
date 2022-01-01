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

/**
 * Event
 */
export interface Event {
    /**
     * ID of an event
     */
    id?: string;
    /**
     * Name
     */
    name: string;
    /**
     * Description
     */
    description: string;
    /**
     * Event date
     */
    date: string;
    /**
     * ID of the group to which the event belongs
     */
    groupID: string;
    /**
     * Indicates if event is active
     */
    done: boolean;
    /**
     * Participants of an event
     */
    participants: Participant[];
}

/**
 * Participant
 */
export interface Participant {
    /**
     * User id
     */
    uid: string;
    /**
     * Display name
     */
    displayName: string;
    /**
     * Icon code
     */
    icon: string;
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
    name: string;
    participants: Participant[];
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
