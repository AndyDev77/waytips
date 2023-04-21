const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Themes = mongoose.model("Themes");

//
require("dotenv").config();
//

// Route POST pour ajouter des thèmes à la base de données
router.post('/themes', (req, res) => {
    const selectedThemes = req.body.themes; // récupération des thèmes sélectionnés

    // Ajout des thèmes à la base de données
    selectedThemes.forEach(userName => {
        const theme = new Themes({ name : userName });
        theme.save((err, theme) => {
            if (err) {
                console.error(err);
                res.status(500).send('Erreur lors de l\'ajout du thème : ' + err);
            } else {
                console.log('Thème ajouté à la base de données : ' +  userName);
            }
        });
    });

    res.status(200).send('Thèmes ajoutés à la base de données.');
});


module.exports = router;