const handleProfileGet = (req, res, db) => {
    const {id} = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(404).json({errorMessage: 'Not found'});
            }
        })
        .catch(() => res.status(400).json({errorMessage: 'Error getting user'}));
};

module.exports = {
    handleProfileGet: handleProfileGet
}