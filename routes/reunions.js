const express = require('express');
const router = express.Router();
const Reunions = require('../db/reunions');

//get all reunions
router.route('/').get((req, res) => {
    Reunions.find()
        .then(reunions => {
            res.statusCode = 200;
            res.send(reunions);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

//get 1 reunion by its id_reunion
router.route('/:id_reunion').get((req, res) => {
    Reunions.findOne({
            id_reunion: req.params.id_reunion
        })
        .then(reunion => {
            res.statusCode = 200;
            res.send(reunion);
        })
        .catch(reason => {
            res.statusCode = 500;
            res.end();
        });
});

//create reunion
router.route('/').post(async function (req, res) {
    let newReunion = req.body;
    let reunions = await Reunions.find();
    let lastID = reunions.length > 0 ? Math.max.apply(null, rescates.map(item => item.id_reunion)) : 0; //si es el primero, el ulId sera 0
    console.log("last ID: ", lastID);
    newReunion.id_reunion = (lastID + 1);
    //save in DB
    let reunionDocument = Reunions(newReunion);
    reunionDocument.save()
        .then(reunion => {
            res.statusCode = 200;
            res.send(reunion);
        })
        .catch(reason => {
            res.statusCode = 500;
            console.log(reason);
            res.end();
        });

});

//edit reunion
router.route('/:id_reunion').put(async function (req, res) {

    Reunions.findOne({
            id_reunion: req.params.id_reunion
        })
        .then(reunion => {
            reunion.duration = req.body.duration;
            reunion.masks = req.body.masks;
            reunion.open_space = req.body.open_space;
            reunion.risk = req.body.risk;
            reunion.users = req.body.users;
         
            reunion.save()
                .then(reunion => {
                    res.statusCode = 200;
                    res.end();
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
            console.log("error in finding reunion");
            console.log(reason);
            res.end();
        });

});

//delete un reunion
router.route('/:id_reunion').delete((req, res) => {
    Reunions.deleteOne({
            id_reunion: req.params.id_reunion
        })
        .then(() => {
            res.statusCode = 200;
            console.log("reunion deleted");
            res.end();
        })
        .catch(reason => {
            res.statusCode = 500;
            console.log(reason);
            res.end();
        });
});

module.exports = router;