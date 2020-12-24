const express = require('express');
const { sample } = require('lodash')

const User = require('../models/User');

const router = express.Router()

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => console.error(err))
})

router.post('/', (req, res) => {
    const currentUser = req.body.currentUser
    User.find( {
        $and: [
                { '_id': { $ne: currentUser } },
                { 'giftFrom': '' }
        ]
    }).exec()
        .then((sideUsers) => {
            if (sideUsers.length) {
                const randomSideUser = sample(sideUsers)
                User.updateOne({ '_id': currentUser }, { 'giftTo': randomSideUser.name })
                    .then(() => {
                        User.updateOne({ '_id': randomSideUser }, { 'giftFrom': currentUser.name })
                            .then(() => {
                                res.send({
                                    user: randomSideUser
                                })
                            })
                    })
            } else {
                res.send({
                    message: 'Поздравлять некого - все с подарками'
                })
            }
        })
        .catch(e => console.error(e))
})
module.exports = router
