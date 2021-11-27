/**
 * The app constants to feed the swagger documentation
 * */
export const AppConstants = {
    OK: {
        properties: {
            message: {
                type: 'string',
                example: 'Welcome to api!',
            },
        },
    },
    INTERNAL_SERVER_ERROR: {
        properties: {
            statusCode: {
                type: 'number',
                example: 500,
            },
            message: {
                type: 'string',
                example: 'Unexpected error occurred',
            },
            error: {
                type: 'string',
                example: 'Internal Server Error',
            },
        },
    },
};
