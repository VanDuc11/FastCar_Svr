exports.check_login = ((req, res, next) => {
    if (req.session.userLogin) {
        next();
    } else {
        res.json({message: "Chưa login!"});
    }
})