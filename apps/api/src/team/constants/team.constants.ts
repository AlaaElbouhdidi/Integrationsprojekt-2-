/**
 * The event constants to feed the swagger documentation
 * */
export const TeamConstants = {
    BAD_REQUEST: {
        properties: {
            statusCode: {
                type: 'number',
                example: 400
            },
            message: {
                type: 'array',
                example: [
                    'member must be an array',
                    'member should not be empty',
                    'groupId must be a string',
                    'groupId should not be empty'
                ]
            },
            error: {
                type: 'string',
                example: 'Bad Request'
            }
        }
    },
    NOT_FOUND: {
        properties: {
            statusCode: {
                type: 'number',
                example: 404
            },
            message: {
                type: 'string',
                example: 'Could not find team'
            },
            error: {
                type: 'string',
                example: 'Not Found'
            }
        }
    },
    NONE_FOUND: {
        properties: {
            statusCode: {
                type: 'number',
                example: 404
            },
            message: {
                type: 'string',
                example: 'No teams found'
            },
            error: {
                type: 'string',
                example: 'Not Found'
            }
        }
    }
};
