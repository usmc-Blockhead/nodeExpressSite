const express = require('express');
const promotionRouter = express.Router();
const Promotion = require("../models/promotion");
const authenticate = require('../authenticate');
const cors = require('./cors');

promotionRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Promotion.find()
            .then((promotions) => {
                res.statusCode = 200;
                res.json(promotions);
            })
            .catch((err) => next(err));
})
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Promotion.create(req.body)
            .then((promotion) => {
                console.log("Promotion Created ", promotion);
                res.statusCode = 200;
                res.json(promotion);
            })
            .catch((err) => next(err));
})
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotion');
})
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Promotion.deleteMany()
            .then((response) => {
                res.statusCode = 200;
                res.json(response);
            })
            .catch((err) => next(err));
});

promotionRouter.route('/:promotionId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Promotion.findById(req.params.promotionId)
            .then((promotion) => {
                res.statusCode = 200;
                res.json(promotion);
            })
            .catch((err) => next(err));
})
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
        res.end(
            `POST operation not supported on /promotions/${req.params.promotionId}`
        );
})
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Promotion.findByIdAndUpdate(
        req.params.promotionId,
        {
            $set: req.body,
        },
        { new: true }
    )
        .then((promotion) => {
            res.statusCode = 200;
            res.json(promotion);
        })
        .catch((err) => next(err));
})
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
            .then((response) => {
                res.statusCode = 200;
                res.json(response);
            })
            .catch((err) => next(err));
});
module.exports = promotionRouter;
