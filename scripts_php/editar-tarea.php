<?php
include("conexion.php");
 
$id= $_POST['id'];
$nombre= $_POST['nombre'];
$descripcion= $_POST['descripcion'];

$actualizar = "UPDATE tareas SET nombre=:nombre, descripcion=:descripcion WHERE id_tarea=:id";
$result = $conexion->prepare($actualizar);
if ($result->execute([":nombre" => $nombre, ":descripcion" => $descripcion, ":id" => $id])) {
    echo 'Se actualizado la tarea correctamente';
} else {
    die("Error en la consulta");
}





?>