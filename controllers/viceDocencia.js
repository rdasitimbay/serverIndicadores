var express = require('express');


const ViceDocencias = require('../models/viceDocencias');



// POST CREAR CLIENTE
const creaViceDocencia = (req, res) => {
    // Crear un cliente
    const viceDocencia = new ViceDocencias(req.body);

    // GUARDAR UNA OPCION EN MongoDB
    viceDocencia.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


// todos las opciones
const getViceDocencia = (req, res) => {
    ViceDocencias.find({}).populate('usuario img')
        .then(viceDocencia => {
            res.json(viceDocencia);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};



// todos las opciones
const getViceDocenciaId = (req, res) => {
    ViceDocencias.find({usuario:req.query.usuario_id})

    .populate('usuario ')
        .then(viceDocencia => {
            res.json(viceDocencia);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


//ENCUENTRE UNA OPCION
const getIdViceDocencia=  (req, res) => {
    ViceDocencias.findById(req.params._id)
        .then(viceDocencia => {
            if (!viceDocencia) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(viceDocencia);
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
const actualizarViceDocencia=  (req, res) => {
    //Encuentra un cliente y actualízalo
    ViceDocencias.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(viceDocencia => {
            if (!viceDocencia) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(viceDocencia);
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
const eliminarViceDocencia = (req, res) => {
    ViceDocencias.findByIdAndDelete(req.params._id)
        .then(viceDocencia => {
            if (!viceDocencia) {
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
     
    creaViceDocencia,
    getViceDocencia,
    getViceDocenciaId,
    getIdViceDocencia,
    actualizarViceDocencia,
    eliminarViceDocencia

}