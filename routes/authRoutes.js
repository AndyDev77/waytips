const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

//
require("dotenv").config();
//
const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");

//nodemailer
async function mailer(recieveremail, code) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: "vespuceandy@gmail.com", // generated ethereal user
      pass: "fhsxijwicumicyic", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "vespuceandy@gmail.com", // sender address
    to: `${recieveremail}`, // list of receivers
    subject: "Vérification d'inscription", // Subject line
    text: `Votre code de vérification est ${code}`, // plain text body
    html: `<b>Votre code de vérification est ${code}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

router.post("/signup", (req, res) => {
  //   res.send("Ceci est la page d'inscription");
  console.log("Envoyé par le client - ", req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(422)
      .json({ error: "Merci de compléter tous les champs" });
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
      res.send({ token });
    } catch (err) {
      console.log(err);
    }
  });
});

router.post("/verify", (req, res) => {
  console.log("Envoyé par le client - ", req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(422)
      .json({ error: "Merci de compléter tous les champs" });
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
        res.send({ token });
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
