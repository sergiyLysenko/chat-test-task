"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var socket_io_1 = require("socket.io");
var express = require("express");
var app = express();
var http = require("http");
var cors = require("cors");
app.use(cors());
var server = http.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
io.on("connection", function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var rooms, messages;
    return __generator(this, function (_a) {
        rooms = [{ name: 'General Room', id: 'testID' }];
        messages = new Map();
        socket.on(types_1.Events.JOIN_ROOM, function (data) {
            socket.join(data.roomID);
            socket.emit(types_1.Responses.JOINED_ROOM, { roomID: data.roomID });
            console.log("User with ID: ".concat(socket.id, " joined room: ").concat(data.roomID));
        });
        socket.on(types_1.Events.SEND_MESSAGE, function (data) {
            if (!data.message) {
                socket.emit(types_1.Responses.ERROR, {
                    error: {
                        type: types_1.Events.SEND_MESSAGE,
                        message: 'Message cannot be empty'
                    }
                });
                return;
            }
            if (!messages.has(data.roomID)) {
                messages.set(data.roomID, [data]);
            }
            else {
                messages.set(data.roomID, __spreadArray([data], messages.get(data.roomID), true));
            }
            socket.to(data.roomID).emit(types_1.Responses.RECEIVE_MESSAGE, data);
            socket.emit(types_1.Responses.RECEIVE_MESSAGE, data);
        });
        socket.on(types_1.Events.ADD_ROOM, function (data) {
            rooms.push(data);
            socket.emit(types_1.Responses.ADDED_ROOM, data);
        });
        socket.on(types_1.Events.GET_ROOM_MESSAGE, function (room) {
            socket.emit(types_1.Responses.RECEIVE_ROOM_MESSAGE, messages.get(room.id));
        });
        socket.on(types_1.Events.GET_ALL_ROOMS, function () {
            socket.emit(types_1.Responses.ALL_ROOMS, rooms);
        });
        socket.on(types_1.Events.DISCONNECT, function (data) {
            console.log(data);
        });
        return [2 /*return*/];
    });
}); });
server.listen(3001, function () {
    console.log("SERVER RUNNING");
});
