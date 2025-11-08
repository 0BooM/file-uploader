exports.getLoginForm = (req, res) => {
    try {
        res.render("./authentication/loginForm")
    } catch (err) {
        res.status(404).render("404");
    }
}