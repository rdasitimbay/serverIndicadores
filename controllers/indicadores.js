var express = require('express');
const path = require('path');
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

// POST VARIOS CREAR INDICADOR
const allCreaIndicador = (req, res) => {
    // Crear un cliente
    Indicadores.insertMany(req.body)
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
    Indicadores.find({}).populate('usuario img').sort({ fechaReporte: -1 })
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
    Indicadores.find({ usuario: req.query.usuario_id }).sort({ fechaReporte: -1 })
        .populate('usuario ')
        .then(indicador => {
            console.log(indicador)
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};

//ENCUENTRE UNA OPCION
const getIdIndicador = (req, res) => {
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
const actualizarIndicadores = (req, res) => {
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

//ENCUENTRE CON FILTRO
const filtrosIndicadores = async (req, res) => {

    try {
        if (req.query.unidad == 'TODOS') {
            const indicadores = await Indicadores.find({
                $and: [
                    { fechaReporte: { $gte: new Date(req.query.desde) } },
                    { fechaReporte: { $lte: new Date(req.query.hasta) } }
                ]
            }).sort({ fechaReporte: -1 });
            res.json({
                data: indicadores,
                ok: true
            });
        } else {
            const indicadores = await Indicadores.find({
                'unidad': req.query.unidad, $and: [
                    { fechaReporte: { $gte: new Date(req.query.desde) } },
                    { fechaReporte: { $lte: new Date(req.query.hasta) } }
                ]
            }).sort({ fechaReporte: -1 });
            res.json({
                data: indicadores,
                ok: true
            });
        }

    } catch (error) {
        res.status(500).send({
            ok: false,
            msg: "Error inesperado"
        });
    }

};

//Unidades de Indicadores
const getUnidadesIndicador = async (req, res) => {

    Indicadores.find({}).distinct('unidad')
        .then(indicador => {
            res.json(indicador);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });

};

//Eliminar Varios dIndicadores
const deleteIndicadoresVarios = async (req, res) => {
    // Eliminar un cliente
    Indicadores.deleteMany({ _id: req.body })
        .then(data => {
            res.json(
                {
                    msg: 'Eliminados Correctamente',
                    ok: true
                }
            );
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });

};

//ENCUENTRE CON FILTRO
const descargarFileIndicador = async (req, res) => {

    const tipo = req.query.tipo;
    const file = req.query.file;
    const pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${file}`)

    res.sendFile(pathImagen);

};

const listarIndicadoresRol = async (req, res) => {
    try {
        var indicadores;
        if(req.query.role == "UPDI_ROLE"){
            indicadores = await Indicadores.find({}).sort({fechaModificacion:-1}).exec();
        }else{
            indicadores = await Indicadores.find({ role: req.query.role }).sort({fechaModificacion:-1}).exec();
        }
        res.status(200).send({ ok: true, cantidad: indicadores.length ,datos: indicadores });
    } catch (error) {
        res.status(500).send({ ok: false, msg: "Error inesperado \n" + error.toString() });
    }
};

const listarIndicadoresUsuario = async (req, res) => {
    try {
        var indicadores;
        var user = req.query.usuario_id;
        indicadores = await Indicadores.find({usuario : user }).populate('usuario').sort({fechaModificacion:-1}).exec();
        res.status(200).send({ ok: true, cantidad: indicadores.length ,datos: indicadores });
    } catch (error) {
        res.status(500).send({ ok: false, msg: "Error inesperado \n" + error.toString() });
    }
};

module.exports = {

    creaIndicador,
    allCreaIndicador,
    getIndicador,
    getIndicadorId,
    getIdIndicador,
    actualizarIndicadores,
    eliminarIndicador,
    filtrosIndicadores,
    descargarFileIndicador,
    getUnidadesIndicador,
    deleteIndicadoresVarios,
    listarIndicadoresRol,
    listarIndicadoresUsuario,

}