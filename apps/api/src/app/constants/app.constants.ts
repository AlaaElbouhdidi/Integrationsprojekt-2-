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
    BAD_REQUEST: {
        properties: {
            statusCode: {
                type: 'number',
                example: 400,
            },
            message: {
                type: 'array',
                example: 'Unexpected error occurred',
            },
            error: {
                type: 'string',
                example: 'Bad Request',
            },
        },
    },
};
