var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();
var Usuario = require('../models/usuario');

var mdAutentication = require('../middlewares/autenticacion')


app.get('/renuevatoken', mdAutentication.verificaToken,(req,res) =>{

    var token =jwt.sign({ usuario: req.usuario}, SEDD,{expiresIn:115200});//24 horas

    res.status(200).json({
   
        ok: true,
        token:token   


    });

});

  

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false, 
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        // Crear un token!!!
        usuarioDB.password = ':)';

        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 115200 }); // 24 horas
     
            res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token: token,
                id: usuarioDB._id,
                menu: obtenerMenu(usuarioDB.role)
            });  
        
      

    })


});


function obtenerMenu(ROLE) {

   var menu = [
        {
         titulo: 'Principal',
         icono: 'mdi mdi-gauge',
         submenu: [ ],
         },

    

        /*{
            titulo: 'Proveedores',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
              
            ],
        }, 

        {
            titulo: 'Informes',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
              
            ],
        }, 
     */
   
    
     ]

   console.log('ROLE', ROLE);

    if (ROLE === 'ADMIN_ROLE') {
        menu[0].submenu.unshift(  
            { titulo : 'USUARIOS', url: '/dashboard/adminUsers' }, 
     
      

     
    );
  

    } 
    if (ROLE === 'USER_ROLE') {
        menu[0].submenu.unshift( 
            { titulo : 'INDICADORES', url: '/dashboard/indicadores' },
           

      );
  

    }   
    
    if (ROLE === 'RECTOR_ROLE') {
        menu[0].submenu.unshift(  
           
        
        );
      
    }

    if (ROLE === 'REQUIRENTE_ROLE') {
        menu[0].submenu.unshift(  
            { titulo : 'REFORMAS PRESUPUESTARIAS', url: '/dashboard/reformas' },
            { titulo : 'REFORMAS ', url: '/dashboard/reformasRequirente' }
        );
      
    }

    if (ROLE === 'VICERECTOR_ROLE') {
        menu[0].submenu.unshift(  
       
        
        );
      
    }

//,'DIRECTOR_UPDI_ROLE','VICERECTOR_ADMINISTRATIVO_ROLE','VICERECTOR_ACADEMICO__GENERAL_ROLE'    


    if (ROLE === 'DIRECTOR_ROLE') {
        menu[0].submenu.unshift(  

        
        );
      
    }
    if (ROLE === 'PLANIFICADOR_ROLE') {
        menu[0].submenu.unshift(  

            { titulo : 'INDICADORES', url: '/dashboard/indicadoresGestion' },
            { titulo : 'INDICADORES EVIADOS', url: '/dashboard/historial' }
        );
      
    }

    if (ROLE === 'UPDI_ROLE') {
        menu[0].submenu.unshift(  

            { titulo : 'INDICADORES UPDI', url: '/dashboard/indicadoresUpdi' },
          //  { titulo : 'INDICADORES EVIADOS', url: '/dashboard/historial' }
        );
      
    }

    if (ROLE === 'PRESUPUESTO_ROLE') {
        menu[0].submenu.unshift(  

            { titulo : 'REFORMAS GENERALES', url: '/dashboard/reformasGenerales' },
          //  { titulo : 'INDICADORES EVIADOS', url: '/dashboard/historial' }
        );
      
    }
    if (ROLE === 'DIRECTOR_UPDI_ROLE') {
        menu[0].submenu.unshift(  

            { titulo : 'REFORMAS GENERALES', url: '/dashboard/reformasGenerales' },
          //  { titulo : 'INDICADORES EVIADOS', url: '/dashboard/historial' }
        );
      
    }
    if (ROLE === 'VICERECTOR_ADMINISTRATIVO_ROLE') {
        menu[0].submenu.unshift(  

            { titulo : 'REFORMAS GENERALES', url: '/dashboard/reformasGenerales' },
          //  { titulo : 'INDICADORES EVIADOS', url: '/dashboard/historial' }
        );
      
    }

    if (ROLE === 'VICERECTOR_ACADEMICO__GENERAL_ROLE') {
        menu[0].submenu.unshift(  

            { titulo : 'REFORMAS GENERALES', url: '/dashboard/reformasGenerales' },
          //  { titulo : 'INDICADORES EVIADOS', url: '/dashboard/historial' }
        );
      
    }

    
    return menu;

} 

   
     

 
module.exports = app;