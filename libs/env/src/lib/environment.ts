/**
 * Production environment variables
 */
import { Environment } from '@integrationsprojekt2/api-interfaces'

export const environment: Environment = {
    firebase: {
        projectId: 'integrationsprojekt2',
        appId: '1:229229352898:web:a91515cba0a9a9c03a285b',
        storageBucket: 'integrationsprojekt2.appspot.com',
        apiKey: 'AIzaSyCD5MCtKyB5iUyzB2H_wYLShwTp9f1H-Ks',
        authDomain: 'mate-team.de',
        messagingSenderId: '229229352898',
    },
    production: false,
    apiUrl: 'http://localhost:5001/integrationsprojekt2/europe-west1/api',
};
