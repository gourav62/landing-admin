const mongoose = require("mongoose");

const looksLikePublicId = (val) => {
  if (typeof val !== "string") return false;
  // Cloudinary public_id often contains alnum, underscores, dashes, slashes (folders)
  // No whitespace, no punctuation other than _ - /
  return /^[A-Za-z0-9_\-\/]{6,250}$/.test(val) && !/\s/.test(val);
};

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 200 },
  designation: { type: String, trim: true, maxlength: 100 },
  description: { type: String, trim: true, maxlength: 1000, default: "" },
  image: { type: String, trim: true, default: "" },
  imagePublicId: { type: String, trim: true, default: "" },
}, { timestamps: true });

// Defensive pre-save: if description looks suspicious (public id) or equals imagePublicId, clear it
ClientSchema.pre("save", function (next) {
  try {
    if (!this.description) return next();

    const desc = String(this.description).trim();

    if (this.imagePublicId && desc === this.imagePublicId) {
      // exact match with stored public id -> clear it
      this.description = "";
      return next();
    }

    // heuristic: if description looks like a public id (no spaces, only allowed chars), clear it
    if (looksLikePublicId(desc)) {
      // you may log in dev only
      if (process.env.NODE_ENV !== "production") {
        console.warn("Clearing suspicious description that looks like a public id:", desc);
      }
      this.description = "";
    }

    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("Client", ClientSchema);

