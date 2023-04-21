const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    themes: [{
        type: String,
        required: true,
    }],
});

mongoose.model('Themes', themeSchema);