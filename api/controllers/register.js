const handleRegister = (req, res, db, bcrypt) => {
    const {email, name, password} = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ errorMessage: 'Incorrect form submission' });
    }

    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(() => res.status(400).json({ errorMessage: 'Unable to register. This e-mail address is already registered.' }));
}

module.exports = {
  handleRegister: handleRegister
};