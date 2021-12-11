/**
 * The game constants to feed the swagger documentation
 * */
export const GameConstants = {
    BAD_REQUEST: {
        properties: {
            statusCode: {
                type: 'number',
                example: 400
            },
            message: {
                type: 'array',
                example: [
                    'activity must be a valid enum value',
                    'activity should not be empty',
                    'firstTeam must be a non-empty object',
                    'secondTeam must be a non-empty object',
                    'date must be a valid ISO 8601 date string',
                    'date should not be empty',
                    'firstTeamScore must be a number conforming to the specified constraints',
                    'secondTeamScore must be a number conforming to the specified constraints'
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
                example: 'Could not find game'
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
                example: 'No games found'
            },
            error: {
                type: 'string',
                example: 'Not Found'
            }
        }
    }
};
