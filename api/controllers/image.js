const Clarifai = require('clarifai');
const redisClient = require('./signin').redisClient;

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY || 'd9f1fd65553c49efa6167f3fdc1ad96f'
});

const handleApiCall = (req, res) => {
    const input = req.body.input;

    if (!input) {
        return res.status(400).json({errorMessage: 'Incorrect data.'});
    } else {
        app.models
            .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
            .then(data => {
                res.json(data);
            })
            .catch(() => res.status(400).json({errorMessage: 'Unable to work with API'}));
    }
};

const handleImage = (req, res, db) => {
    const {id} = req.body;
    const {authorization} = req.headers;

    if (!id) {
        return res.status(400).json({errorMessage: 'Incorrect data.'});
    }

    redisClient.get(authorization, function (err, reply) {
        if (id.toString() !== reply.toString()) {
            return res.status(400).json({errorMessage: 'Access denied.'});
        } else {
            db('users').where('id', '=', id)
                .increment('entries', 1)
                .returning('entries')
                .then(entries => {
                    res.json({entries: entries[0]});
                })
                .catch(() => res.status(400).json({errorMessage: 'Unable to get entries.'}));
        }
    });
};

module.exports = {
    handleImage,
    handleApiCall
}