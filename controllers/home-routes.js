const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

router.get("/", (req, res) => {
    console.log(req.session);
    
    Post.findAll({
        attributes: [
            "id",
            "post_url", 
            "title",
            "created_at",
            [sequelize.literal("(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"), "vote_count"]
        ], 
        include: [
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_text", 
                    "post_id", 
                    "user_id",
                    "created_at"
                ],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
    .then(dbPostData => {
        // loop over each sequelize object, saving the results to a new posts array
        const posts = dbPostData.map(post => post.get({ plain: true }));

        // pass a single post object into the homepage template
        res.render("homepage", { posts });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
    // check if there is a session (a logged-in user)
    if (req.session.loggedIn) {
        // if yes - redirect to homepage
        res.redirect("/");
        return;
    };
    
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

module.exports = router;