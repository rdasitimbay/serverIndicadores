var express = require('express');


const Vags = require('../models/vags');



// POST CREAR CLIENTE
const creaVag = (req, res) => {
    // Crear un cliente
    const vag = new Vags(req.body);

    // GUARDAR UNA OPCION EN MongoDB
    vag.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


// todos las opciones
const getVag = (req, res) => {
    Vags.find({}).populate('usuario img')
        .then(vag => {
            res.json(vag);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};



// todos las opciones
const getVagId = (req, res) => {
    Vags.find({usuario:req.query.usuario_id})

    .populate('usuario ')
        .then(vag => {
            res.json(vag);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


//ENCUENTRE UNA OPCION
const getIdVag=  (req, res) => {
    Vags.findById(req.params._id)
        .then(vag => {
            if (!vag) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(vag);
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
const actualizarVag =  (req, res) => {
    //Encuentra un cliente y actualízalo
    Vags.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(vag => {
            if (!vag) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(vag);
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
const eliminarVag = (req, res) => {
    Vags.findByIdAndDelete(req.params._id)
        .then(vag => {
            if (!vag) {
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

    creaVag,
    getVag,
    getVagId,
    getIdVag,
    actualizarVag,
    eliminarVag

}