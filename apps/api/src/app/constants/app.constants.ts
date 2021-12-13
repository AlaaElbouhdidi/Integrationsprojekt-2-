/**
 * The app constants to feed the swagger documentation
 * */
export const AppConstants = {
    OK: {
        properties: {
            message: {
                type: 'string',
                example: 'Welcome to api!'
            }
        }
    },
    UNAUTHORIZED: {
        properties: {
            statusCode: {
                type: 'number',
                example: 401
            },
            error: {
                type: 'string',
                example: 'Unauthorized'
            }
        }
    },
    EXPIRED_TOKEN: {
        properties: {
            statusCode: {
                type: 'number',
                example: '401'
            },
            message: {
                type: 'string',
                example:
                    'Firebase ID token has expired. Get a fresh ID token from your client app and try again (auth/id-token-expired). See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.'
            },
            error: {
                type: 'string',
                example: 'Unauthorized'
            }
        }
    },
    INVALID_SIGNATURE: {
        properties: {
            statusCode: {
                type: 'number',
                example: 401
            },
            message: {
                type: 'string',
                example:
                    'Firebase ID token has invalid signature. See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.'
            },
            error: {
                type: 'string',
                example: 'Unauthorized'
            }
        }
    },
    INTERNAL_SERVER_ERROR: {
        properties: {
            statusCode: {
                type: 'number',
                example: 500
            },
            message: {
                type: 'string',
                example: 'Unexpected error occurred'
            },
            error: {
                type: 'string',
                example: 'Internal Server Error'
            }
        }
    }
};
