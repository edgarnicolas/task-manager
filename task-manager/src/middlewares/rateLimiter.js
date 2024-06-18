"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests, please try again later.' }
});
exports.default = rateLimiter;
