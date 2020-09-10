const router = require(".");

router.get('/users/survey', (req, res) => {
    res.render("favorite-artists")
})

module.exports = router;