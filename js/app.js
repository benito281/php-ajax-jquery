/* Iniciamos jquery
*/
$(document).ready(function () {  
    let editar=false;
/* Ocultamos la tarjeta con el resultado de busqueda */
    $('#resultados').hide();
    console.log('Trabajando con jquery');
    /* Traemos las tareas */
    traerTareas();
    /* Inciamos la funcion de busqueda cada vez que tecleamos un tecla se 
    visualizara en la tarjeta
    */
   /* ---------------INICIAMOS KEYUP---------------- */
        $('#busqueda').keyup(function (e) { 
            if ($('#busqueda').val()) {
                let busqueda= $('#busqueda').val();
                console.log(busqueda);
                $.ajax({
                    type: "POST",
                    url: "scripts_php/buscar-tarea.php",
                    data: {busqueda},
                    success: function (response) {
                        let tareas=JSON.parse(response);
                        let template='';
                        tareas.forEach(tarea => {
                            template += `<li>
                            <a>${tarea.nombre}</a>
                            </li>`;
                            console.log(tarea);
                        });
                        /* Muestra los resultados en una tarjeta, utiliza un id no una clase*/
                        $('#resultado-tareas').html(template);
                         /* Visualizamos el reultado la tarjeta */
                        $('#resultados').show();
                    }
                });
            }
        });
    /* ---------------------------------------------- */
        /* Iniciamos la funcion de agregar tareas */
    /*---------------INICIAMOS ENVIO DE TAREAS------------  */
        $('#formulario-tarea').submit(function (e) { 
            e.preventDefault();
            /* console.log('enviando'); */
            const enviaDatos={
                nombre:$('#nombre').val(),
                descripcion:$('#descripcion').val(),
                id:$('#id_tarea').val()
            };
            let url= editar===false ? 'scripts_php/agregar-tarea.php': 'scripts_php/editar-tarea.php';
            console.log(url);
            $.post(url, enviaDatos, function (response) {
                /* Para que se pueda agregar cualquier tarea imediatamente
                Se debe llamar a la función traer tareas antes que resete el formulario 
                con trigger('reset');
                */
                    traerTareas();
                    console.log(response);
                    $('#formulario-tarea').trigger('reset');
                }
            
            );
        });
    /* ---------------------------------------------------- */

    /* -----------------TRAER TAREAS------------------------- */
        function traerTareas() {
            $.ajax({
                type: "GET",
                url: "scripts_php/ver-tarea.php",
                success: function (response) {
                    let tareas=JSON.parse(response);
                    let template='';
                    tareas.forEach(tarea => {
                        template += `<tr tarea_id="${tarea.id_tarea}">
                        <td >${tarea.id_tarea}</td>
                        <td><a href="#" class="item-tarea">${tarea.nombre}</a></td>
                        <td>${tarea.descripcion}</td>
                        <td>
                        <button class="elimina-tarea btn btn-danger">Eliminar</button>
                        </td>
                        </tr>`;
                        /* console.log(tarea); */
                    });
                    $('#tareas').html(template);
                    
                }
            });
        }
    /* ------------------------------------------------------- */
/* ---------------------ELIMINAR TAREAS------------------------ */
    $(document).on('click','.elimina-tarea', function () {
        if (confirm("¿Esta seguro que desea eliminar esta tarea?")) {
         /* Seleccionamos el elemento padre, quiere decir que cuando hacemos click
        seleccionamos toda la fila*/
       let elemento=$(this)[0].parentElement.parentElement;
       /* Buscamos el elemento id del elemento y lo utilizamos */
        let id= $(elemento).attr('tarea_id');
        $.post("scripts_php/eliminar-tarea.php",{id}, function (response) {
                traerTareas();
                console.log(response);
            }
        );
        }
        
    });
    /* --------------------------------------------------------- */


    /* ------------------------ACTUAIZAR TAREAS--------------------- */
    /* Lo que hacemos es cuando se haga click en el nombre de la tarea
    esto traera la tarea al formulario
    */
    $(document).on('click','.item-tarea', function () {
        let elemento=$(this)[0].parentElement.parentElement;
        let id=$(elemento).attr('tarea_id');
        $.post("scripts_php/actualizar-tarea.php", {id},function(response) {
            let tarea=JSON.parse(response);
            $("#nombre").val(tarea.nombre);
            $("#descripcion").val(tarea.descripcion);
            $('#id_tarea').val(tarea.id_tarea);
            editar=true;
            console.log(response);
            }
        );
        console.log(id);
    });

});