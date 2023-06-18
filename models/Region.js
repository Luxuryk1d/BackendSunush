const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegionSchema = new Schema({
    kgTitle: {
        type: String,
    },
    rusTitle: {
        type: String,
    },
    engTitle: {
        type: String,
    }
});

const Region = mongoose.model("Region", RegionSchema);
module.exports = Region;