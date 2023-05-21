const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//nodemailer
async function mailer(recieveremail, code) {
  // Le code de votre fonction mailer reste inchangé
  // ...
}

router.post("/signup", (req, res) => {
  console.log("Envoyé par le client - ", req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Merci de compléter tous les champs" });
  }

  User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "Données déjà existantes" });
    }
    const user = new User({
      name,
      email,
      password,
    });

    try {
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.send({ token, user });
    } catch (err) {
      console.log(err);
    }
  });
});

router.post("/verify", (req, res) => {
  console.log("Envoyé par le client - ", req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Merci de compléter tous les champs" });
  }

  User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: "Données déjà existantes" });
    }

    try {
      let verificationCode = Math.floor(100000 + Math.random() * 900000);
      let user = [
        {
          name,
          email,
          password,
          verificationCode,
        },
      ];
      await mailer(email, verificationCode);
      res.send({
        message: "Vérification de code envoyé à votre email",
        userdata: user,
      });
    } catch (err) {
      console.log(err);
    }
  });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Merci d'ajouter un email ou un mot de passe" });
  }
  const savedUser = await User.findOne({ email: email });

  if (!savedUser) {
    return res.status(422).json({ error: "L'email n'est pas valide" });
  }

  try {
    bcrypt.compare(password, savedUser.password, (err, result) => {
      if (result) {
        console.log("Mot de passe correcte");

        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        res.send({ token, user: savedUser });
      } else {
        console.log("Le mot de passe n'est pas valide");
        return res
          .status(422)
          .json({ error: "Le mot de passe n'est pas valide" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;