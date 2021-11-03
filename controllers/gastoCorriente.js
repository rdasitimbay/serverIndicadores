var express = require('express');
const gastoCorrientes = require('../models/gastoCorrientes');



// POST CREAR CLIENTE 
const creaGastoCorriente = (req, res) => {
    // Crear un cliente
    const gastoCorriente = new gastoCorrientes(req.body);

    // GUARDAR UNA OPCION EN MongoDB
    gastoCorriente.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


// todos las opciones
const getGastoCorriente = (req, res) => {
    gastoCorrientes.find({}).populate('usuario img')
        .then(iasa => {
            res.json(iasa);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};



// todos las opciones
const getGastoCorrienteId = (req, res) => {
    gastoCorrientes.find({ usuario: req.query.usuario_id })

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
const getIdGastoCorriente = (req, res) => {
    GastoCorrientes.findById(req.params._id)
        .then(gastoCorriente => {
            if (!gastoCorriente) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(gastoCorriente);
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
const actualizarGastoCorriente = (req, res) => {
    //Encuentra un cliente y actualízalo
    GastoCorrientes.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(gastoCorriente => {
            if (!gastoCorriente) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(gastoCorriente);
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
const eliminarGastoCorriente = (req, res) => {
    GastoCorrientes.findByIdAndDelete(req.params._id)
        .then(gastoCorriente => {
            if (!gastoCorriente) {
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


// filtrar
const filtrosIndicadores = async (req, res) => {

    try {
        let enviarGasto = [];
        const gasto = new RegExp(req.query.tipoGasto, 'i');

        const gastos = await gastoCorrientes.find({
            tipoGasto: gasto,
        })

        gastos[0].campos.forEach(element => {
            if( element.Extension.includes(req.query.extension) ) {
                enviarGasto.push(element);
            }
        });

        res.json({
            data: enviarGasto,
            ok: true
        });

    } catch (error) {
        res.status(500).send({
            ok: false,
            msg: "Error inesperado"
        });
    }

};


module.exports = {

    creaGastoCorriente,
    getGastoCorriente,
    getGastoCorrienteId,
    getIdGastoCorriente,
    actualizarGastoCorriente,
    eliminarGastoCorriente,
    filtrosIndicadores

}