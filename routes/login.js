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
            { titulo : 'INICIO', url: '/dashboard' },
            { titulo : 'INDICADOR REPORTES', url: '/dashboard/reportesIndicador' }, 
            { titulo : 'RESUMEN', url: '/dashboard/resumen-pug-informe' },
           
        );
      
    }

    if (ROLE === 'REQUIRENTE_ROLE') {
        menu[0].submenu.unshift(  
            { titulo : 'REFORMAS PRESUPUESTARIAS', url: '/dashboard/reformas' },
            { titulo : 'GASTO CORRIENTE', url: '/dashboard/gasto-corriente' },
            { titulo : 'GASTO INVERSION', url: '/dashboard/gasto-inversion' },
            { titulo : 'RESUMEN', url: '/dashboard/resumen-pug-informe' },
           //{ titulo : 'IASA', url: '/dashboard/iasa' },
            //{ titulo : 'LATACUNGA', url: '/dashboard/latacunga' },
            //{ titulo : 'SANTO DOMINGO', url: '/dashboard/santo-domingo' },
            //{ titulo : 'PLANTA CENTRAL', url: '/dashboard/unidades-rectorado' },
            //{ titulo : 'VICE ADMINISTRATIVO', url: '/dashboard/vice-administrativo' },
            //{ titulo : 'VICE INVESTIGACION', url: '/dashboard/vice-investigacion' },
            { titulo : 'REFORMAS ', url: '/dashboard/reformasRequirente' },
            { titulo : 'VAG ', url: '/dashboard/vag' },
            { titulo : 'VICE DOCENCIA ', url: '/dashboard/vice-docencia' }
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
            { titulo : 'INDICADORES ENVIADOS', url: '/dashboard/historial' },
            { titulo : 'INDICADOR REPORTES', url: '/dashboard/reportesIndicador' }
        );
      
    }

    if (ROLE === 'UPDI_ROLE') {
        menu[0].submenu.unshift(  

            { titulo : 'INDICADORES UPDI', url: '/dashboard/indicadoresUpdi' },
            { titulo : 'INDICADOR REPORTES', url: '/dashboard/reportesIndicador' }
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

        //indicadores
        if (ROLE === 'FINANCIERO_ROLE') {
            menu[0].submenu.unshift(  
                { titulo : 'INDICADORES UPDI', url: '/dashboard/indicadoresUpdi' },
            );
        } 
        
        if (ROLE === 'PLANIFICACION_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}            );
        } 
    
        if (ROLE === 'ESPE_LATACUNGA_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}         
                   );
        } 
    
        if (ROLE === 'ESPE_STO_DOMINGO_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}           
                 );
        } 

        if (ROLE === 'CENTRO_DE_EDUCACION_CONTINUA_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}           
                 );
        } 

        if (ROLE === 'CENTRO_DE_INVESTIGACIONES_Y_APLICACIONES_MILITARES_CICTE_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}           
                 );
        } 

        if (ROLE === 'CIMSE_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}           
                 );
        } 
    
        if (ROLE === 'ADMISION_REGISTRO_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}           
                 );
        } 
    
        if (ROLE === 'VICERECTOR_INVESTIGACION_INNOVACION_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}          
                  );
        } 
    
        if (ROLE === 'GESTION_INVESTIGACION_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}         
                   );
        } 
    
        if (ROLE === 'TECNOLOGIAS_INFORMACION_COMUNICACIONES_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}         
                   );
        } 
    
        if (ROLE === 'TECNOLOGIAS_DE_LA_INFORMACION_Y_COMUNICACIONES_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}            
                );
        } 

        if (ROLE === 'DEPARTAMENTO_DE_CIENCIAS_DE_LA_VIDA_Y_AGRICULTURA_CARRERAS_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}            
                );
        }

        if (ROLE === 'DEPARTAMENTO_DE_CIENCIAS_DE_LA_VIDA_Y_LA_AGRICULTURA_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}            
                );
        }

        if (ROLE === 'DEPARTAMENTO_DE_CIENCIAS_ECONOMICAS_ADMINISTRATIVAS_Y_DE_COMERCIO_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}            
                );
        }

        if (ROLE === 'DEPARTAMENTO_DE_CIENCIAS_ECONOMICAS_ADMINISTRATIVAS_Y_DE_COMERCIO_CARRERAS_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}            
                );
        }

        // MIOS
    if (ROLE === 'SEDE_LATACUNGA_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }
    if (ROLE === 'SEDE_LATACUNGA_DEPARTAMENTOS_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }
    if (ROLE === 'SEDE_LATACUNGA_CARRERAS_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }
    if (ROLE === 'SEDE_SANTO_DOMINGO_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }
    if (ROLE === 'SEDE_SANTO_DOMINGO_DEPARTAMENTOS_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }
    if (ROLE === 'SEGUIMIENTO_A_GRADUADOS_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }
    
    if (ROLE === 'UNIDAD_DE_GESTION_DE_LA_INVESTIGACION_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }
    if (ROLE === 'UNIDAD_DE_TALENTO_HUMANO_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }
    if (ROLE === 'UNIDAD_DE_SEGURIDAD_FISICA_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'DESARROLLO_FISICO_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'EDUCACION_A_DISTANCIA_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'IASAI_DEPARTAMENTO_DE_CIENCIAS_DE_LA_VIDA_Y_LA_AGRICULTURA_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'PLANIFICACION_Y_DESARROLLO_INSTITUCIONAL_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'RELACIONES_DE_COOPERACION_INTERINSTITUCIONAL_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    

    if (ROLE === 'DEPARTAMENTO_DE_CIENCIAS_HUMANAS_Y_SOCIALES_CARRERAS_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}         
               );
    } 
    
    if (ROLE === 'DEPARTAMENTO_DE_ELECTRICA_Y_ELECTRONICA_CARRERAS_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}         
               );
    } 

    if (ROLE === 'SEDE_DOMINGO_CARRERAS_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}         
               );
    } 

    if (ROLE === 'DEPARTAMENTO_DE_ELECTRICA_Y_ELECTRONICA_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}         
               );
    } 

    if (ROLE === 'DEPARTAMENTO_DE_ENERGIA_Y_MECANICA_CARRERAS_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}         
               );
    } 

    
    if (ROLE === 'DESARROLLO_EDUCATIVO_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}         
               );
    }
    

        if (ROLE === 'DEPARTAMENTO_DE_CIENCIAS_DE_LA_TIERRA_Y_LA_CONSTRUCCION_CARRERAS_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}            
                );
        }
    
        if (ROLE === 'COMUNICACION_SOCIAL_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}            
                );
        } 
    
        if (ROLE === 'BIENESTAR_ESTUDIANTIL_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}           
                 );
        } 
    
        if (ROLE === 'BIBLIOTECA_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}           
                 );
        } 
    
        if (ROLE === 'CENTRO_DE_EDUCACIÓN_CONTINUA_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}         
                   );
        } 
    
        if (ROLE === 'GESTION_DE_VINCULACION_CON_LA_SOCIEDAD_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}         
                   );
        } 
    
        if (ROLE === 'CENTRO_DE_POSGRADOS_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}          
                  );
        } 
    
        if (ROLE === 'DESAROLLO_FISICO_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}         
                   );
        } 
    
        if (ROLE === 'SERVICIOS_UNIVERSITARIOS_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}           
                 );
        } 
    
        if (ROLE === 'UNIDAD_FINANCIERA_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}           
                 );
        } 
        if (ROLE === 'AUTOEVALUACION_Y_ASEGURAMIENTO_DE_LA_CALIDAD_ACADEMICA_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}           
                 );
        } 

        if (ROLE === 'SEGURIDAD_INTEGRADA_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}           
                 );
        } 
    
        if (ROLE === 'EDUCACION_A_DISTACIA_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}          
                  );
        } 
    
        if (ROLE === 'INSTITUTO_DE_IDIOMAS_ROLE') {
            menu[0].submenu.unshift(  
                {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
        }   
      if (ROLE === 'CICTE_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'TALENTO_HUMANO_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'LOGISTICA_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }
    if (ROLE === 'SECRETARIA_GENERAL_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'IASA_1_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'ASESORIA_JURIDICA_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }
    if (ROLE === 'CENTRO_DE_NANOCIENCIA_Y_NANOTECNOLOGIA_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'SEGURIDAD_FISICA_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'VICERRECTORADO_ACADEMICO_GENERAL_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'DEPARTAMENTO_DE_CIENCIAS_MEDICAS_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'VICERRECTORADO_DE_DOCENCIA_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'DEPARTAMENTO_DE_CIENCIAS_HUMANAS_Y_SOCIALES_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'DEPARTAMENTO_DE_CIENCIAS_DE_LA_VIDA_Y_DE_LA_AGRICULTURA_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'DEPARTAMENTO_DE_CIENCIAS_DE_LA_COMPUTACION_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'DEPARTAMENTO_DE_SEGURIDAD_Y_DEFENSA_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'DEPARTAMENTO_DE_CIENCIAS_ECONOMICAS_ADMINISTRATIVAS_DE_COMERCIO_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'DEPARTAMENTO_DE_CIENCIAS_DE_TIERRA_Y_LA_CONSTRUCCION_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'DEPARTAMENTO_DE_ENERGIA_Y_MECANICA_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'DEPARTAMENTO_DE_ELECTRICA_ELECTRONICA_Y_TELECOMUNICACIONES_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }

    if (ROLE === 'DEPARTAMENTO_DE_CIENCIAS_EXACTAS_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }
    if (ROLE === 'VINCULACION_CON_LA_SOCIEDAD_ROLE') {
        menu[0].submenu.unshift(  
            {titulo:'INDICADORES UPDI',url:'/dashboard/indicadoresUpdi'}
            );
    }
    
   

    
    return menu;

} 

module.exports = app;