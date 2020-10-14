const bcryptjs = require("bcryptsjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { isValid } = require("../users/users-service");
const Users = require("../users/user-model");
const secret = require("./secret");