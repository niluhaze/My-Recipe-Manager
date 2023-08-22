const express = require("express")
const router = express.Router()

router.get("/:url_name", (req, res) => {
    res.render("edit")
})

module.exports = router