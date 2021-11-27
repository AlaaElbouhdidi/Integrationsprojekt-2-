/**
 * The event constants to feed the swagger documentation
 * */
export const GroupConstants = {
    BAD_REQUEST: {
        properties: {
            statusCode: {
                type: 'number',
                example: 400,
            },
            message: {
                type: 'array',
                example: [
                    'name must be a string',
                    'name should not be empty',
                    'description must be a string',
                    'description should not be empty',
                    'date must be a valid ISO 8601 date string',
                    'date should not be empty',
                    'participants must be an array',
                ],
            },
            error: {
                type: 'string',
                example: 'Bad Request',
            },
        },
    },
    NOT_FOUND: {
        properties: {
            statusCode: {
                type: 'number',
                example: 404,
            },
            message: {
                type: 'string',
                example: 'Could not find event',
            },
            error: {
                type: 'string',
                example: 'Not Found',
            },
        },
    },
};
