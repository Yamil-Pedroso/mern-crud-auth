"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_SECRET = exports.MONGO_URI = exports.PORT = void 0;
exports.PORT = process.env.PORT || 4000;
exports.MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/auth";
exports.TOKEN_SECRET = "mysecrettoken";
