var express = require('express');


const Indicadores = require('../models/indicadores');



// POST CREAR CLIENTE
const creaIndicador = (req, res) => {
    // Crear un cliente
    const indicador = new Indicadores(req.body);

    // GUARDAR UNA OPCION EN MongoDB
   indicador.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


// todos las opciones
const getIndicador = (req, res) => {
    Indicadores.find({}).populate('usuario img')
        .then(indicadores => {
            res.json(indicadores);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};



// todos las opciones
const getIndicadorId = (req, res) => {
    Indicadores.find({usuario:req.query.usuario_id})

    .populate('usuario ')
        .then(indicador => {
            res.json(indicador);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


//ENCUENTRE UNA OPCION
const getIdIndicador =  (req, res) => {
    Indicadores.findById(req.params._id)
        .then(indicador => {
            if (!indicador) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(indicador);
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
const actualizarIndicadores =  (req, res) => {
    //Encuentra un cliente y actualízalo
    Indicadores.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(indicador => {
            if (!indicador) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(indicador);
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
const eliminarIndicador = (req, res) => {
    Indicadores.findByIdAndDelete(req.params._id)
        .then(indicador => {
            if (!indicador) {
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

    creaIndicador,
    getIndicador,
    getIndicadorId,
    getIdIndicador,
    actualizarIndicadores,
    eliminarIndicador

}