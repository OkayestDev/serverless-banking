import { response } from '../types';

export const constructResponse = (statusCode: number, body: object): response => ({
    statusCode,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
});
