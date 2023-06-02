const express = require('express');

const router = express.Router();



router.get("/login", (req, res) => {
    res.render("login", { titulo: "Página de login" });
});
router.get("/logup", (req, res) => {
    res.render("logup", { titulo: "Página de logup" });
});


module.exports = router;