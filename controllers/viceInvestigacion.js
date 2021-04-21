var express = require('express');


const ViceInvestigacions = require('../models/viceInvestigacions');



// POST CREAR CLIENTE
const creaViceInvestigacion = (req, res) => {
    // Crear un cliente
    const viceInvestigacion = new ViceInvestigacions(req.body);

    // GUARDAR UNA OPCION EN MongoDB
    viceInvestigacion.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


// todos las opciones
const getViceInvestigacion = (req, res) => {
    ViceInvestigacions.find({}).populate('usuario img')
        .then(viceInvestigacion => {
            res.json(viceInvestigacion);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};



// todos las opciones
const getViceInvestigacionId = (req, res) => {
    ViceInvestigacions.find({usuario:req.query.usuario_id})

    .populate('usuario ')
        .then(viceInvestigacion => {
            res.json(viceInvestigacion);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


//ENCUENTRE UNA OPCION
const getIdViceInvestigacion=  (req, res) => {
    ViceInvestigacions.findById(req.params._id)
        .then(viceInvestigacion => {
            if (!viceInvestigacion) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(viceInvestigacion);
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
const actualizarViceInvestigacion =  (req, res) => {
    //Encuentra un cliente y actualízalo
    ViceInvestigacions.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(viceInvestigacion => {
            if (!viceInvestigacion) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(viceInvestigacion);
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
const eliminarViceInvestigacion = (req, res) => {
    ViceInvestigacions.findByIdAndDelete(req.params._id)
        .then(viceInvestigacion => {
            if (!viceInvestigacion) {
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
     
    creaViceInvestigacion,
    getViceInvestigacion,
    getViceInvestigacionId,
    getIdViceInvestigacion,
    actualizarViceInvestigacion,
    eliminarViceInvestigacion

}