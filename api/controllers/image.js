const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(() => res.status(400).json({errorMessage: 'Unable to work with API'}));
};

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json({entries: entries[0]});
        })
        .catch(() => res.status(400).json({errorMessage: 'Unable to get entries.'}));
};

module.exports = {
    handleImage,
    handleApiCall
}