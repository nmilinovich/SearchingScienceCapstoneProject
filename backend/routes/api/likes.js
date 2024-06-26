const express = require('express');
const { Question, Like, Answer, Image, Comment, sequelize, User, Sequelize } = require('../../db/models')
const { requireAuth, sendAuthorizationError } = require('../../utils/auth.js')
const { Op } = require('sequelize');
const router = express.Router();

router.get(
    '/current',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id
        userLikes = await Like.findAll({
            where: {
                userId
            }
        })
        return res.status(200).json({Likes: userLikes})

    }
)

router.post(
    '/',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id
        const { likeableType, likeableId, dislike } = req.body;
        // alreadyLiked = await Like.findOne({where: { likeableType, likeableId, userId, dislike }})
        // if (alreadyLiked){
        //     const err = new Error("You cannot like the same item twice");
        //     err.title = "You cannot like the same item twice";
        //     err.errors = "You cannot like the same item twice";
        //     err.status = 400;
        //     return next(err);
        // }
        if (likeableType === 'question') {
            const question = await Question.findByPk(likeableId);
            if (!question) {
                const err = new Error("Question couldn't be found");
                err.title = "Question couldn't be found";
                err.errors = "Question couldn't be found";
                err.status = 404;
                return next(err);
            }
            else {
                const newLike = await question.createLike({
                    userId,
                    likeableType,
                    likeableId,
                    dislike
                })
                return res.status(201).json(newLike)
            }
        } else if (likeableType === 'answer') {
            const answer = await Answer.findByPk(likeableId);
            if (!answer) {
                const err = new Error("Answer couldn't be found");
                err.title = "Answer couldn't be found";
                err.errors = "Answer couldn't be found";
                err.status = 404;
                return next(err);
            } else {
                const newLike = await answer.createLike({
                    userId,
                    likeableType,
                    likeableId,
                    dislike
                })
                return res.status(201).json(newLike)
            }
        } else if (likeableType === 'comment') {
            const comment = await Comment.findByPk(likeableId);
            if (!comment) {
                const err = new Error("Comment couldn't be found");
                err.title = "Comment couldn't be found";
                err.errors = "Comment couldn't be found";
                err.status = 404;
                return next(err);
            } else {
                const newLike = await comment.createLike({
                    userId,
                    likeableType,
                    likeableId,
                    dislike
                })
                return res.status(201).json(newLike)
            }
        } else {
            const err = new Error("Server Error");
            err.title = "Server Error";
            err.errors = "Server Error";
            err.status = 500;
            return next(err);
        }
    }
);

router.patch(
    '/',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id
        const { likeableType, likeableId, dislike } = req.body;
        const like = await Like.findOne({where: { likeableType, likeableId, userId }});
        if (!like) {
            const err = new Error("Like couldn't be found");
            err.title = "Like couldn't be found";
            err.errors = "Like couldn't be found";
            err.status = 404;
            return next(err);
        } else if (like.dislike === dislike) {
            return res.status(400).json(like);
        } else {
            like.dislike = dislike
            await like.save();
            return res.status(200).json(like)
        }
    }
);

router.delete(
    '/:likeId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id
        const likeId = req.params.likeId
        const like = await Like.findByPk(likeId);
        if (!like) {
            const err = new Error("Like couldn't be found");
            err.title = "Like couldn't be found";
            err.errors = "Like couldn't be found";
            err.status = 404;
            return next(err);
        } else if (like && like.userId !== userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else {
            await like.destroy()
            return res.status(200).json({ "message": "successfully deleted" })
        }
    }
);

module.exports = router
