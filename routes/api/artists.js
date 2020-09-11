const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const { csrfProtection, asyncHandler } = require('./utils');

const { User: User, Artist, ReactionType, UserReaction } = require('../../db/models');



router.get("/", asyncHandler(async (req, res) => {
    let artists = await Artist.findAll();
    res.json({ artists });
}));

router.post("/", csrfProtection, asyncHandler(async (req, res) => {
    let userId = await req.user.id;
    const { _csrf, favoriteArtistArray } = req.body;
    // console.log(userId, _csrf, favoriteArtistArray)

    for (let i = 0; i < favoriteArtistArray.length; i++) {
        let artist = favoriteArtistArray[i];
        let reactionTypeId = 1
        let artistInfo = await Artist.findOne({
            where: {
                name: `${artist}`
            }
        })
        let artistId = artistInfo.id;
        await UserReaction.create({
            reactionTypeId,
            userId,
            artistId,

        })
    }
    // for (const key in req.body) {
    //     artistId = key
    //     reactionTypeId = req.body[key]
    //     console.log("Artist" + artistId, "Reaction" + reactionTypeId)
    //     UserReaction.create({
    //         artistId,
    //         reactionTypeId
    //     })
    // };
    let artists = await UserReaction.findAll({
        where: {
            userId: userId
        },

    });

    res.json({ artists });
}));

router.get("/favorite-artists", asyncHandler(async (req, res) => {
    let userId = await req.user.id;
    let userReactions = await UserReaction.findAll({
        where: {
            userId: userId
        },
    })

    let favoriteArtists = [];
    for (let i = 0; i < userReactions.length; i++) {
        let num = userReactions[i].artistId
        let artist = await Artist.findByPk(num)
        favoriteArtists.push(artist);
    }
    // console.log(favoriteArtists)
    res.json({ favoriteArtists })
}));

module.exports = router;
