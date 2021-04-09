"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const debug = require("debug")("app");
const simpleLogger = function (req, res, next) {
    debug(new Date().toLocaleString(), req.method, req.originalUrl, req.ip);
    next();
};
exports.default = simpleLogger;
//# sourceMappingURL=simpleLogger.js.map