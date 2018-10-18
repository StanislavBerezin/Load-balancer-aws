let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let statSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    negPercent: Number,
    posPercent: Number,
    negWords: Array,
    posWords: Array,
    positivePie: Number,
    negativePie: Number


});


module.exports = mongoose.model('Stat', statSchema);