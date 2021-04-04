const express = require('express');
const router = express.Router();
const Users = require('../db/users');

//get all Users
router.route('/').get((req, res) => {
    Users.find()
        .then(users => {
            res.statusCode = 200;
            res.send(users);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

//get 1 user by its email
router.route('/:email').get((req, res) => {
    Users.findOne({
            email: req.params.email
        })
        .then(user => {
            res.statusCode = 200;
            res.send(user);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

//create user
router.route('/').post(async function (req, res) {
    let newUser = req.body;

    // Validar if this is an existing user (by email or name)
    let sameEmailUser = await Users.find({
        email: newUser.email
    });
    let sameNameAndLastName = await Users.find({
        name: newUser.name,
        last_name: newUser.last_name
    });

    if (sameEmailUser.length > 0) {
        res.statusCode = 400;
        res.send('This email is already registered');
    } else if (sameNameAndLastName.length > 0) {
        res.statusCode = 400;
        res.send('This name is already registered');
    } else {
        //save in DB
        newUser.registered_date = new Date(); //today
        console.log(newUser.registered_date);
        let userDocument = Users(newUser);
        userDocument.save()
            .then(user => {
                res.statusCode = 200;
                res.send(user);
            })
            .catch(reason => {
                res.statusCode = 500;
                console.log(reason);
                res.end();
            });
    }
});

//edit user
router.route('/:email').put(async function (req, res) {
    let sameNameAndLastName = await Users.findOne({
        name: req.body.name,
        last_name: req.body.last_name
    });
    if (sameNameAndLastName && sameNameAndLastName.email != req.params.email) {
        res.statusCode = 400;
        res.send('This name is already registered');
    } else {
        Users.findOne({
                email: req.params.email
            })
            .then(user => {
                //email, pswd, pp, and register date cannot be edited!
                user.name = req.body.name;
                user.last_name = req.body.last_name;
                user.birth_date = req.body.birth_date;
                user.previously_infected = req.body.previously_infected;
                user.phone = req.body.phone;
                user.allergies = req.body.allergies;
                user.blood_type = req.body.blood_type;
                user.vaccinated = req.body.vaccinated;
                user.previously_infected = req.body.previously_infected;
                user.currently_infected = req.body.currently_infected;
                user.save()
                    .then(user => {
                        res.statusCode = 200;
                        res.send(user);
                    })
                    .catch(reason => {
                        res.statusCode = 500;
                        console.log("error in saving");
                        console.log(reason);
                        res.end();
                    });

            })
            .catch(reason => {
                res.statusCode = 500;
                console.log("error in finding user");
                console.log(reason);
                res.end();
            });
    }
});

//delete un user
router.route('/:email').delete((req, res) => {
    Users.deleteOne({
            email: req.params.email
        })
        .then(() => {
            res.statusCode = 200;
            console.log("user deleted");
            res.send("user deleted");
        })
        .catch(reason => {
            res.statusCode = 500;
            console.log(reason);
            res.end();
        });
});

module.exports = router;