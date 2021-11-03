var express = require('express');


const Iasas = require('../models/iasas');



// POST CREAR CLIENTE
const creaIasa = (req, res) => {
    // Crear un cliente
    const iasa = new Iasas(req.body);

    // GUARDAR UNA OPCION EN MongoDB
    iasa.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


// todos las opciones
const getIasa = (req, res) => {
    Iasas.find({}).populate('usuario img')
        .then(iasa => {
            res.json(iasa);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};



// todos las opciones
const getIasaId = (req, res) => {
    Iasas.find({usuario:req.query.usuario_id})

    .populate('usuario ')
        .then(iasa => {
            res.json(iasa);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


//ENCUENTRE UNA OPCION
const getIdIasa=  (req, res) => {
    Iasas.findById(req.params._id)
        .then(iasa => {
            if (!iasa) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(iasa);
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
const actualizarIasa =  (req, res) => {
    //Encuentra un cliente y actualízalo
    Iasas.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(iasa => {
            if (!iasa) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(iasa);
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
const eliminarIasa = (req, res) => {
    Iasas.findByIdAndDelete(req.params._id)
        .then(iasa => {
            if (!iasa) {
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

    creaIasa,
    getIasa,
    getIasaId,
    getIdIasa,
    actualizarIasa,
    eliminarIasa

}