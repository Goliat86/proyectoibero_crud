const { response } = require('express');
var express = require ('express')
var app = express()

var bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extends:true}))


app.all('*',function(request,response,next){
    var whitelist = request.headers.origin;

    response.header('Access-Control-Allow-Origin', whitelist)
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    response.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    response.header("Access-Control-Allow-Credentials", "true");

    next()
})

var cors = require('cors')

app.use(cors({
    origin:function(origin,callback){
        console.log(origin)
        if(!origin) return callback(null,true) 
        var listablanca =[
            'http://127.0.0.1:5500'
        ]
        if(listablanca.indexOf(origin)=== -1){
        return callback('error de cors',false)
        }
        
        return callback(null,true)
    }
    
}))


//CRUD
//Create
var datos = [];
app.post("/Usuarios/Guardar", function(request,response){

    var post = {
        cedula:request.body.cedula,
        name:request.body.name,
        apellido:request.body.apellido,
        direccion:request.body.direccion,
        telefono:request.body.telefono,
        edad:request.body.edad,
        estadocivil:request.body.estadocivil,
    }

    if (post.cedula == "" || post.cedula==null || post.cedula == undefined ){
        response.json({state:false,mensaje:"El campo cedula es obligatorio"})
        return false
    }
    if( isNaN(post.cedula) ) {
        response.json({state:false,mensaje:"El campo cedula solo acepta valores numericos"})
        return false;
    }

    if (post.cedula.length <= 5){
        response.json({state:false,mensaje:"El campo cedula debe ser superior a 5 números"})
        return false
    }

    if (post.cedula.length > 15){
        response.json({state:false,mensaje:"El campo cedula no debe ser superior a 15 números"})
        return false
    }
    
   
    if (post.name == "" || post.name==null || post.name == undefined ){
        response.json({state:false,mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if (post.name.length <= 2){
        response.json({state:false,mensaje:"El campo nombre debe ser superior a 2 caracteres"})
        return false
    }
    if (post.name.length > 20){
        response.json({state:false,mensaje:"El campo nombre no debe ser superior a 20 caracteres"})
        return false
    }
    

    if (post.apellido == "" || post.apellido==null || post.apellido == undefined ){
        response.json({state:false,mensaje:"El campo apellido es obligatorio"})
        return false
    }

    if (post.apellido.length <= 2){
        response.json({state:false,mensaje:"El campo apellido debe ser superior a 2 caracteres"})
        return false
    }
    if (post.apellido.length > 20){
        response.json({state:false,mensaje:"El campo apellido no debe ser superior a 20 caracteres"})
        return false
    }

    if (post.direccion == "" || post.direccion==null || post.direccion == undefined ){
        response.json({state:false,mensaje:"El campo dirección es obligatorio"})
        return false
    }


    if (post.telefono == "" || post.telefono==null || post.telefono == undefined ){
        response.json({state:false,mensaje:"El campo teléfono es obligatorio"})
        return false
    }
    if( isNaN(post.telefono) ) {
        response.json({state:false,mensaje:"El campo teléfono solo acepta valores numericos"})
        return false;
    }

    if (post.telefono.length <= 5){
        response.json({state:false,mensaje:"El campo teléfono debe ser superior a 5 números"})
        return false
    }

    if (post.telefono.length > 15){
        response.json({state:false,mensaje:"El campo teléfono no debe ser superior a 15 números"})
        return false
    }

    if (post.edad == "" || post.edad==null || post.edad == undefined ){
        response.json({state:false,mensaje:"El campo edad es obligatorio"})
        return false
    }
    if( isNaN(post.edad) ) {
        response.json({state:false,mensaje:"El campo edad solo acepta valores numericos"})
        return false;
    }

    var age = parseInt(post.edad)

    if (age <= 0){
        response.json({state:false,mensaje:"El campo edad debe ser superior a 0 años"})
        return false
    }

    if (age > 120){
        response.json({state:false,mensaje:"El campo edad no debe ser superior a 120 años"})
        return false
    }

    
   if(post.estadocivil == "" || post.estadocivil == null || post.estadocivil == undefined){
       response.json({state:true,mensaje:"El campo estado civil es obligatorio"})
       return false
   }

datos.push({
    cedula:         post.cedula,
    nombre:         post.name,
    apellido:       post.apellido,
    direccion:      post.direccion,
    telefono:       post.telefono,
    edad:           post.edad,
    estadocivil:    post.estadocivil})

response.json({state:true,mensaje:"usuario guardado"})

})



//Read
app.post("/Usuarios/ListarUsuarios", function(request,response){
    response.json({state:true,datos:datos})
})



//Update
app.post("/Usuarios/ActualizarPorCedula", function(request,response){
    var post = {
        cedula:request.body.cedula,
        name:request.body.name,
        apellido:request.body.apellido,
        direccion:request.body.direccion,
        telefono:request.body.telefono,
        edad:request.body.edad,
        estadocivil:request.body.estadocivil,

    }
    if (post.cedula == "" || post.cedula==null || post.cedula == undefined ){
        response.json({state:false,mensaje:"El campo cedula es obligatorio"})
        return false
    }
    if( isNaN(post.cedula) ) {
        response.json({state:false,mensaje:"El campo cedula solo acepta valores numericos"})
        return false;
    }

    if (post.cedula.length <= 5){
        response.json({state:false,mensaje:"El campo cedula debe ser superior a 5 números"})
        return false
    }

    if (post.cedula.length > 15){
        response.json({state:false,mensaje:"El campo cedula no debe ser superior a 15 números"})
        return false
    }

    
    // if (post.name == "" || post.name==null || post.name == undefined ){
    //     response.json({state:false,mensaje:"El campo nombre es obligatorio"})
    //     return false
    // }

    // if (post.name.length <= 2){
    //     response.json({state:false,mensaje:"El campo nombre debe ser superior a 2 caracteres"})
    //     return false
    // }
    // if (post.name.length > 20){
    //     response.json({state:false,mensaje:"El campo nombre no debe ser superior a 20 caracteres"})
    //     return false
    // }
    

    // if (post.apellido == "" || post.apellido==null || post.apellido == undefined ){
    //     response.json({state:false,mensaje:"El campo apellido es obligatorio"})
    //     return false
    // }

    // if (post.apellido.length <= 2){
    //     response.json({state:false,mensaje:"El campo apellido debe ser superior a 2 caracteres"})
    //     return false
    // }
    // if (post.apellido.length > 20){
    //     response.json({state:false,mensaje:"El campo apellido no debe ser superior a 20 caracteres"})
    //     return false
    // }

    if (post.direccion == "" || post.direccion==null || post.direccion == undefined ){
        response.json({state:false,mensaje:"El campo dirección es obligatorio"})
        return false
    }


    if (post.telefono == "" || post.telefono==null || post.telefono == undefined ){
        response.json({state:false,mensaje:"El campo teléfono es obligatorio"})
        return false
    }
    if( isNaN(post.telefono) ) {
        response.json({state:false,mensaje:"El campo teléfono solo acepta valores numericos"})
        return false;
    }

    if (post.telefono.length <= 5){
        response.json({state:false,mensaje:"El campo teléfono debe ser superior a 5 números"})
        return false
    }

    if (post.telefono.length > 15){
        response.json({state:false,mensaje:"El campo teléfono no debe ser superior a 15 números"})
        return false
    }

    if (post.edad == "" || post.edad==null || post.edad == undefined ){
        response.json({state:false,mensaje:"El campo edad es obligatorio"})
        return false
    }
    if( isNaN(post.edad) ) {
        response.json({state:false,mensaje:"El campo edad solo acepta valores numericos"})
        return false;
    }

    var age = parseInt(post.edad)

    if (age <= 0){
        response.json({state:false,mensaje:"El campo edad debe ser superior a 0 años"})
        return false
    }

    if (age > 120){
        response.json({state:false,mensaje:"El campo edad no debe ser superior a 120 años"})
        return false
    }

    
   if(post.estadocivil == "" || post.estadocivil == null || post.estadocivil == undefined){
       response.json({state:true,mensaje:"El campo estado civil es obligatorio"})
       return false
   }

   var posicion = datos.findIndex((item)=> item.cedula == post.cedula)

   if(posicion == -1){
    response.json({state:false,mensaje:"El usuario no existe"})
    return false
   }


   datos[posicion].direccion = post.direccion
   datos[posicion].telefono = post.telefono
   datos[posicion].edad = post.edad
   datos[posicion].estadocivil = post.estadocivil
   response.json({state:true,mensaje:"Se actualizó correctamente"})

})



//Delete
app.post("/Usuarios/EliminarPorCedula",function(request,response){
    
    var post = {
        cedula:request.body.cedula,
        
    }
    
    // if (post.cedula == "" || post.cedula==null || post.cedula == undefined ){
    //     response.json({state:false,mensaje:"El campo cedula es obligatorio"})
    //     return false
    // }
    // if( isNaN(post.cedula) ) {
    //     response.json({state:false,mensaje:"El campo cedula solo acepta valores numericos"})
    //     return false;
    // }

    // if (post.cedula.length <= 5){
    //     response.json({state:false,mensaje:"El campo cedula debe ser superior a 5 números"})
    //     return false
    // }

    // if (post.cedula.length > 15){
    //     response.json({state:false,mensaje:"El campo cedula no debe ser superior a 15 números"})
    //     return false
    // }


    var posicion = datos.findIndex((item)=> item.cedula == post.cedula)

    if(posicion == -1){
        response.json({state:false,mensaje:"El usuario no existe"})
        return false
    }

    datos.splice(posicion,1)

    response.json({state:true,mensaje:"Se eliminó correctamente"})
})




app.listen(3000, function(){
        console.log('servidor funcionando por el puerto: ' + 3000)
 }
 )















 // app.get("/saluda",function(request,response){
//     response.json({state:true,mensaje:'hola mundo'})
//     response.statusCode=200;
// })
// //get
// app.get("/matematica/suma/:num1/:num2/:num3/:num4",function(request,response){
//     var total1 = parseInt(request.params.num1) + parseInt(request.params.num2)
//     var total2 = parseInt(request.params.num3) + parseInt(request.params.num4)
//     var total = total1 * total2
//     response.json({state:true,total:total})
// })
//get
// app.get("/matematica/resta/:num1/:num2",function(request,response){
//     var total = parseInt(request.params.num1) - parseInt(request.params.num2)
//     response.json({state:true,total:total})
// })
// //get
// app.get("/matematica/multiplicacion/:num1/:num2",function(request,response){
//     var total = parseInt(request.params.num1) * parseInt(request.params.num2)
//     response.json({state:true,total:total})
// })
// //get
// app.get("/matematica/division/:num1/:num2",function(request,response){
//     var total = parseInt(request.params.num1) / parseInt(request.params.num2)
//     response.json({state:true,total:total})
// })



// app.post("/matematica/operacion", function(request,response){
//     var num1 = parseFloat(request.body.num1)
//     var num2 = parseFloat(request.body.num2)
//     var total1
//     var total = Math.sqrt(total1= (Math.pow(num1, 6)) + (Math.pow(num2, 3)))
// if (total < 100){
    
//     response.json({state:true,"el reultado es: ":total.toFixed(2)   })
// }
// else {
//     response.json({state:false, "el resultado es mayor a 100":total.toFixed(2)})
// }
// })
