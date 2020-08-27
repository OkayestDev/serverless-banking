require('dotenv').config();

const { API_VERSION, ENDPOINT } = process.env;

const OK = 200;
const NOT_FOUND = 404;

export { API_VERSION, ENDPOINT, OK, NOT_FOUND };
