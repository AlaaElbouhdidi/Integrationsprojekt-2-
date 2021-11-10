export interface Alert {
    type: 'error' | 'success' | 'neutral' | 'warn';
    message: string;
}
