var express = require('express');


const ViceAdministrativos = require('../models/viceAdministrativos');



// POST CREAR CLIENTE
const creaViceAdministrativo = (req, res) => {
    // Crear un cliente
    const viceAdministrativo = new ViceAdministrativos(req.body);

    // GUARDAR UNA OPCION EN MongoDB
    viceAdministrativo.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


// todos las opciones
const getViceAdministrativo = (req, res) => {
    ViceAdministrativos.find({}).populate('usuario img')
        .then(viceAdministrativo => {
            res.json(viceAdministrativo);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};



// todos las opciones
const getViceAdministrativoId = (req, res) => {
    ViceAdministrativos.find({usuario:req.query.usuario_id})

    .populate('usuario ')
        .then(viceAdministrativo => {
            res.json(viceAdministrativo);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


//ENCUENTRE UNA OPCION
const getIdViceAdministrativo=  (req, res) => {
    ViceAdministrativos.findById(req.params._id)
        .then(viceAdministrativo => {
            if (!viceAdministrativo) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(viceAdministrativo);
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
const actualizarViceAdministrativo =  (req, res) => {
    //Encuentra un cliente y actualízalo
    ViceAdministrativos.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(viceAdministrativo => {
            if (!viceAdministrativo) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(viceAdministrativo);
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
const eliminarViceAdministrativo = (req, res) => {
    ViceAdministrativos.findByIdAndDelete(req.params._id)
        .then(viceAdministrativo => {
            if (!viceAdministrativo) {
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

    creaViceAdministrativo,
    getViceAdministrativo,
    getViceAdministrativoId,
    getIdViceAdministrativo,
    actualizarViceAdministrativo,
    eliminarViceAdministrativo

}