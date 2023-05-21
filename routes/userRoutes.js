const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// Configuration de multer pour gérer le téléchargement d'images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/")); // Spécifiez le dossier de destination des images téléchargées
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Utilisez le nom de fichier d'origine pour enregistrer l'image
  },
});

const upload = multer({ storage: storage });

//
require("dotenv").config();
//

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

// Récupérer les informations de l'utilisateur
router.get("/user", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Ajouter des thèmes à l'utilisateur connecté
router.post("/user/themes", authenticateToken, async (req, res) => {
  const userId = req.user._id;
  const { themes } = req.body;

  try {
    // Rechercher l'utilisateur connecté
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Vérifier la longueur des thèmes
    if (themes.length > 3) {
      return res
        .status(400)
        .json({ error: "Vous pouvez sélectionner au maximum 3 thèmes" });
    }

    if (themes.length === 0) {
      return res.status(400).json({ error: "Sélectionnez au moins 3 thèmes" });
    }

    // Ajouter les nouveaux thèmes à l'utilisateur
    user.themes.push(...themes);
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Ajouter une photo de profil à l'utilisateur connecté
router.post("/user/profile-image", authenticateToken, upload.single("profileImage"), async (req, res) => {
  const userId = req.user._id;

  try {
    // Rechercher l'utilisateur connecté
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Mettre à jour l'URL de l'image de profil
    const filePath = req.file.path;
    const fileName = filePath.substring(filePath.lastIndexOf("\\") + 1); // Obtient le nom du fichier à partir du chemin complet
    const relativePath = `uploads/${fileName}`; // Construit le chemin relatif
    const absolutePath = `http://192.168.1.86:3000/${relativePath}`; // Construit l'URL complète

    user.profileImage = absolutePath;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Mettre à jour la photo de profil de l'utilisateur connecté
router.put("/user/profile-image", authenticateToken, upload.single("profileImage"), async (req, res) => {
  const userId = req.user._id;

  try {
    // Rechercher l'utilisateur connecté
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Mettre à jour l'URL de l'image de profil
    const filePath = req.file.path;
    const fileName = filePath.substring(filePath.lastIndexOf("\\") + 1); // Obtient le nom du fichier à partir du chemin complet
    const relativePath = `uploads/${fileName}`; // Construit le chemin relatif
    const absolutePath = `http://192.168.1.86:3000/${relativePath}`; // Construit l'URL complète

    user.profileImage = absolutePath;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});


// Mettre à jour le champ "name" de l'utilisateur connecté
router.put("/user/name", authenticateToken, async (req, res) => {
  const userId = req.user._id;
  const { name } = req.body;

  try {
    // Rechercher l'utilisateur connecté
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Mettre à jour le champ "name"
    user.name = name;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Mettre à jour le champ "email" de l'utilisateur connecté
router.put("/user/email", authenticateToken, async (req, res) => {
  const userId = req.user._id;
  const { email } = req.body;

  try {
    // Rechercher l'utilisateur connecté
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Mettre à jour le champ "email"
    user.email = email;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Mettre à jour le champ "themes" de l'utilisateur connecté
router.put("/user/themes", authenticateToken, async (req, res) => {
  const userId = req.user._id;
  const { themes } = req.body;

  try {
    // Rechercher l'utilisateur connecté
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Vérifier la longueur des thèmes
    if (themes.length > 3) {
      return res
        .status(400)
        .json({ error: "Vous pouvez sélectionner au maximum 3 thèmes" });
    }

    if (themes.length === 0) {
      return res.status(400).json({ error: "Sélectionnez au moins 3 thèmes" });
    }

    // Mettre à jour les thèmes de l'utilisateur
    user.themes = themes;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
