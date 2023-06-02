const express = require('express');

const router = express.Router();



router.get('/', (req, res) => {
    const urls = [
        { origin: "https://www.google.com", shortURL: "shshshs" },
        { origin: "https://www.bluuweb.org", shortURL: "sjskjfkbkfhie" },
        { origin: "https://www.twitter.org", shortURL: "sjskjfkbkfhie" },
    ];
    res.render("home", { titulo: "Página de inicio", urls });
});



module.exports = router;