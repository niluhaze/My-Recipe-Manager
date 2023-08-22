const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.render("edit")
})

router.get("/:url_name", (req, res) => {
    res.render("edit")
})

module.exports = router