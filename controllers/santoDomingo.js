var express = require('express');


const SantoDomingos = require('../models/santoDomingos');



// POST CREAR CLIENTE
const creaSantoDomingo = (req, res) => {
    // Crear un cliente
    const santoDomingo = new SantoDomingos(req.body);

    // GUARDAR UNA OPCION EN MongoDB
    santoDomingo.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


// todos las opciones
const getSantoDomingo = (req, res) => {
    SantoDomingos.find({}).populate('usuario img')
        .then(santoDomingo => {
            res.json(santoDomingo);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};



// todos las opciones
const getSantoDomingoId = (req, res) => {
    SantoDomingos.find({usuario:req.query.usuario_id})

    .populate('usuario ')
        .then(santoDomingo => {
            res.json(santoDomingo);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


//ENCUENTRE UNA OPCION
const getIdSantoDomingo=  (req, res) => {
    SantoDomingos.findById(req.params._id)
        .then(santoDomingo => {
            if (!santoDomingo) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(santoDomingo);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            return res.status(500).json({
                msg: "Error retrieving Opciones with id " + req.params._id
            });
        });
};

// ACTUALIZAR OPCION
const actualizarSantoDomingo =  (req, res) => {
    //Encuentra un cliente y actualízalo
    SantoDomingos.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(santoDomingo => {
            if (!santoDomingo) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(santoDomingo);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            return res.status(500).json({
                msg: "Error updating opciones with id " + req.params._id
            });
        });
};






//ELIMINAR OPCION
const eliminarSantoDomingo = (req, res) => {
    SantoDomingos.findByIdAndDelete(req.params._id)
        .then(santoDomingo => {
            if (!santoDomingo) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json({ msg: "Opciones deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            return res.status(500).json({
                msg: "Could not delete opciones with id " + req.params._id
            });
        });
};


module.exports = {

    creaSantoDomingo,
    getSantoDomingo,
    getSantoDomingoId,
    getIdSantoDomingo,
    actualizarSantoDomingo,
    eliminarSantoDomingo

}