const express = require("express");
const gastoInversions=require('../models/gastoInversions');

exports.crearGastoInversion= async (req,res)=>{
    
    try{
        let gastoInversion;

        gastoInversion= new gastoInversions(req.body);

        await gastoInversion.save();
        res.send(gastoInversion);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerGastoInversions = async(req,res)=>{

    try{

        const gastoInversion = await gastoInversions.find();
        res.json(gastoInversion)

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerGastoInversion = async (req, res) => {

    try {
        let gastoInversion = await gastoInversions.findById(req.params.id);

        if(!gastoInversion) {
            res.status(404).json({ msg: 'No existe el usuario' })
        }
       
        res.json(GastoInversion);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

