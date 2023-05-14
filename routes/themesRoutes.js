const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Themes = mongoose.model("Themes");

//
require("dotenv").config();
//

// Route POST pour ajouter des thèmes à la base de données
router.post('/themes', (req, res) => {
    console.log("Envoyé par le client les thèmes - ", req.body);

    const userId = req.body.userId;
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const selectedThemes = req.body.themes;

    if (selectedThemes.length > 3) {
        return res.status(400).json({
            error: 'Vous pouvez sélectionner au maximum 3 thèmes !'
        });
    } else if (selectedThemes.length == 0) {
        return res.status(400).json({
            error: 'Sélectionner au minimum 3 thèmes !'
        });
    }

    Themes.findOne({ userEmail: userEmail }).then(async (savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "Données déjà existantes" });
        }

        const theme = new Themes({
            themes: selectedThemes,
            userName: userName,
            userEmail: userEmail,
            userId: userId
        });
        theme.save().then(result => {
            res.status(201).json({
                message: 'Thèmes ajoutés avec succès!',
                themes: selectedThemes,
                userName: userName,
                userName: userEmail,
                userId: userId
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });
});

module.exports = router;