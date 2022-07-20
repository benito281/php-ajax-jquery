console.log('la conexion a sido exitosa');
let alerta=document.getElementById('alert');
$(document).ready(function () {
    traerPeronas();
     
    $('form').on('submit', function (e) {
        e.preventDefault();
       let nombre= $('#enviaNombre').val();
       let contrasenia=$('#enviaContrasenia').val();
        $.ajax({
            type: "POST",
            url: "consults/agregar.php",
            data: $(this).serialize(),
            success: function (response) {
                if (nombre=="" || contrasenia=="") {
                 alerta.innerHTML +=`<div class="alert alert-warning alert-dismissible w-50 mx-auto fade show" role="alert">
                <strong>${response}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>`
                console.log(response);
                }
                else{
                    alerta.innerHTML +=`<div class="alert alert-success alert-dismissible w-50 mx-auto fade show" role="alert">
                    <strong>${response}</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    </div>`
                  
                    $('#centralModalSuccess').modal('show')
                    console.log(response);
                    traerPeronas();
                }
            
            },
            error:function(response){
                $('#centralModalDanger').modal('show');
                console.log(response);
            }
        });
        
    });
/*     let personaTabla=document.getElementById("personas_db"); */

    function traerPeronas(){
        $.ajax({
            type: "GET",
            url: "consults/visualizar.php",
            success: function (response) {
                let mostrar=document.getElementById('personas_db');
                const personas = JSON.parse(response);
                personas.forEach(item => {
                    mostrar.innerHTML += `<tr>
                    <td>${item.nombre}</td>
                    <td>${item.contrasenia}</td>
                  </tr>`;
                    console.log(item);
                        
                });
                
            }
        });
    }

});
     
/* --------------- ESTO FUNCIONA, NO BORRAR--------------------- */
/* $('form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "consults/agregar.php",
        data: $(this).serialize(),
        success: function (response) {
            console.log(response);
        },
        error:function(response){
            console.log(response);
        }
    });
    
}); */

/* ------------------------------------------------- */

/* $(document).ready(function(){
 $('#form').submit(function (e) { 
    const data={
        nombre:$('#enviaNombre').val(),
        contrasenia:$('#enviaContrasenia').val(),
    };
    const url='consults/agregar.php';
    $.post(url, data, (response) => {
        console.log(response);
        console.log(data);
    });
    e.preventDefault();
 
});

}); */
/* 
$(document).ready(function () {
    $('#enviaForm').submit(function (e) { 
       e.preventDefault();
       const data={
           nombre:$('#enviaNombre').val(),
           contrasenia:$('#enviaContrasenia').val(),
       };
       const url= 'consults/agregar.php';
       $.ajax({
           type: "POST",
           url: url,
           data:$('#form').serialize(),
           success: function (response) {
               console.log(response);
           }
       });
   })  ;
   }); */