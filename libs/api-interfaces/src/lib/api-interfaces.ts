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

/**
 * Environment
 */
export interface Environment {
    /**
     * Firebase
     */
    firebase: {
        projectId: string;
        appId: string;
        storageBucket: string;
        apiKey: string;
        authDomain: string;
        messagingSenderId: string;
    };
    /**
     * Production
     */
    production: boolean;
    /**
     * Port
     */
    port: number;
    /**
     * API Url
     */
    apiUrl: string;
    /**
     * Client URL
     */
    clientUrl: string;
}

/**
 * Member of a group
 */
export interface Member {
    /**
     * The unique identifier of the member
     */
    uid?: string;
    /**
     * Indicates if user is admin of group
     */
    isAdmin?: boolean;
    /**
     * Email of the member
     */
    email?: string;
    /**
     * User data of the member
     */
    user?: User;
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
    /**
     * Winning team of an event
     */
    winnerTeam?: string;
}

/**
 * Create event form data
 */
export interface CreateEventFormData {
    /**
     * Event name
     */
    name: string;
    /**
     * Event description
     */
    description: string;
    /**
     * Event date
     */
    date: string;
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

/**
 * Group
 */
export interface Group {
    /**
     * The id of the group
     */
    id?: string;
    /**
     * The name of the group
     */
    name?: string;
    /**
     * The description of the groupo
     */
    description?: string;
    /**
     * The id of the group admin
     */
    admin: string;
    /**
     * The members of the group
     */
    member?: Member[];
}

/**
 * Game
 */
export interface Game {
    /**
     * The id of a game
     */
    id?: string;
    /**
     * The group id of a game
     */
    groupId: string;
    /**
     * The activity of a game
     */
    activity: Activity;
    /**
     * First team id
     */
    firstTeamId: string;
    /**
     * Second team id
     */
    secondTeamId: string;
    /**
     * Date of the game
     */
    date: Date;
    /**
     * First team score
     */
    firstTeamScore?: number;
    /**
     * Second team score
     */
    secondTeamScore?: number;
}

/**
 * Team
 */
export interface Team {
    /**
     * Team id
     */
    id?: string;
    /**
     * Team name
     */
    name: string;
    /**
     * Participants of the team
     */
    participants: Participant[];
}

/**
 * Update team participants data
 */
export interface UpdateTeamParticipantsData {
    /**
     * Team
     */
    team: Team;
    /**
     * Participant
     */
    participant: Participant;
}

/**
 * User
 */
export interface User {
    /**
     * The unique identifier of the user
     */
    uid: string;
    /**
     * The email of the user
     */
    email?: string;
    /**
     * Indicates if user has email verified
     */
    emailVerified?: boolean;
    /**
     * The photo url of the user
     */
    photoURL?: string;
    /**
     * List of group ids in which the user is a member or admin
     */
    groups?: string[];
    /**
     * Display name of the user
     */
    displayName?: string;
    /**
     * List of group ids from group to which the user is invited
     */
    invitations?: string[];
}

/**
 * Activity
 */
export enum Activity {
    /**
     * Soccer
     */
    soccer = 'SOCCER_ACTIVITY'
}
