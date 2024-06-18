"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
};
exports.default = errorHandler;
