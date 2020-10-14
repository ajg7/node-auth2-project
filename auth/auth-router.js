const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { isValid } = require("../users/users-service");
const Users = require("../users/user-model");
const Secret = require("./secret");

function getJwt(user) {
    const payload = {
        username: user.username,
        department: user.department
    }
    const secret = Secret.jwtSecret;
    const options = {
        expiresIn: "10h"
    }
    return jwt.sign(payload, secret, options)
}


router.post("/register", (request, response) => {
    const credentials = request.body;

    const hash = bcryptjs.hashSync(credentials.password, 10);
    credentials.password = hash;

    Users.add(credentials)
        .then(user => {
            response.status(201).json({ data: user })
        })
        .catch(error => {
            response.status(500).json({ message: error.message })
        })
})

router.post("/login", (request, response) => {
    const { username, password } = request.body;

    if (isValid(request.body)) {
        Users.findBy({ username: username })
            .then(([user]) => {
                
          // compare the password the hash stored in the database
            if (user && bcryptjs.compareSync(password, user.password)) {

            const token = getJwt(user);

            response.status(200).json({ message: "Welcome to our API", token });
            } else {
            response.status(401).json({ message: "Invalid credentials" });
            }
        })
        .catch(error => {
            response.status(500).json({ message: error.message });
        });
    } else {
        response.status(400).json({
        message: "please provide username and password and the password shoud be alphanumeric",
    });
    }
});



module.exports = router;