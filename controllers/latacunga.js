var express = require('express');


const Latacungas = require('../models/latacungas');



// POST CREAR CLIENTE
const creaLatacunga = (req, res) => {
    // Crear un cliente
    const latacunga = new Latacungas(req.body);

    // GUARDAR UNA OPCION EN MongoDB
    latacunga.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


// todos las opciones
const getLatacunga = (req, res) => {
    Latacungas.find({}).populate('usuario img')
        .then(latacunga => {
            res.json(latacunga);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};



// todos las opciones
const getLatacungaId = (req, res) => {
    Latacungas.find({usuario:req.query.usuario_id})

    .populate('usuario ')
        .then(latacunga => {
            res.json(latacunga);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


//ENCUENTRE UNA OPCION
const getIdLatacunga=  (req, res) => {
    Latacungas.findById(req.params._id)
        .then(latacunga => {
            if (!latacunga) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(latacunga);
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
const actualizarLatacunga =  (req, res) => {
    //Encuentra un cliente y actualízalo
    Latacungas.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(latacunga => {
            if (!latacunga) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(latacunga);
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
const eliminarLatacunga = (req, res) => {
    Iasas.findByIdAndDelete(req.params._id)
        .then(latacunga => {
            if (!latacunga) {
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

    creaLatacunga,
    getLatacunga,
    getLatacungaId,
    getIdLatacunga,
    actualizarLatacunga,
    eliminarLatacunga

}