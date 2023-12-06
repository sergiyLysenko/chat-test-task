"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Responses = exports.Events = void 0;
var Events;
(function (Events) {
    Events["SEND_MESSAGE"] = "SEND_MESSAGE";
    Events["JOIN_ROOM"] = "JOIN_ROOM";
    Events["GET_ALL_ROOMS"] = "GET_ALL_ROOMS";
    Events["DISCONNECT"] = "DISCONNECT";
    Events["ADD_ROOM"] = "ADD_ROOM";
    Events["GET_ROOM_MESSAGE"] = "GET_ROOM_MESSAGE";
})(Events || (exports.Events = Events = {}));
var Responses;
(function (Responses) {
    Responses["RECEIVE_MESSAGE"] = "RECEIVE_MESSAGE";
    Responses["ALL_ROOMS"] = "ALL_ROOMS";
    Responses["JOINED_ROOM"] = "JOINED_ROOM";
    Responses["ADDED_ROOM"] = "ADDED_ROOM";
    Responses["RECEIVE_ROOM_MESSAGE"] = "RECEIVE_ROOM_MESSAGE";
    Responses["ERROR"] = "ERROR";
})(Responses || (exports.Responses = Responses = {}));
