module.exports = (app) => {
    let router = require("express").Router();
    


    //list all user
    router.get("/", (req, res) => {
        res.json({ message: "All User" });
    });

    app.use("/api/user", router);

};


