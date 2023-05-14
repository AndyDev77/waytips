const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  themes: {
    type: [String],
    required: true
  }
});

themeSchema.pre('save', async function(next) {
  try {
    const user = await this.model('User').findById(this.userId);
    this.userName = user.name;
    this.userEmail = user.email;
    next();
  } catch (err) {
    next(err);
  }
});

mongoose.model("Themes", themeSchema);
