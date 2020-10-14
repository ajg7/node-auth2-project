const router = require("express").Router();
const Users = require("./user-model");
const restricted = require("../auth/protected-mw");

router.get("/", restricted, (request, response) => {
    Users.find()
        .then(response => {
            response.status(200).json({ data: response })
        })
        .catch(error => {
            response.status(500).json({ message: error.message })
        })
})

module.exports = router;