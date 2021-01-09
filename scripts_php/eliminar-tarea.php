<?php

include('conexion.php');

if (isset($_POST['id'])) {
     $id=$_POST['id'];

    $eliminar = ("DELETE FROM tareas WHERE id_tarea=:id_tarea");
    $result = $conexion->prepare($eliminar);
    $result->execute([":id_tarea" => $id]);
    if (!$result) {
        die("Error en la consulta");
    }
      echo ("Se a eliminado correctamente la tarea");
}




?>