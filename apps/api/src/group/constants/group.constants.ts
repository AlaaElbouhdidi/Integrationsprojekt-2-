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
                    'activity must be a valid enum value',
                    'activity should not be empty',
                    'member must be an array',
                    'member should not be empty',
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
                example: 'Could not find group',
            },
            error: {
                type: 'string',
                example: 'Not Found',
            },
        },
    },
    NONE_FOUND: {
        properties: {
            statusCode: {
                type: 'number',
                example: 404,
            },
            message: {
                type: 'string',
                example: 'No groups found',
            },
            error: {
                type: 'string',
                example: 'Not Found',
            },
        },
    },
};
