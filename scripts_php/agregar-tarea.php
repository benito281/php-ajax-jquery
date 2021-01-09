<?php
include('conexion.php');

if (isset($_POST['nombre'])) {
     $nombre=$_POST['nombre'];
     $descripcion=$_POST['descripcion'];

    $insertar = ("INSERT INTO tareas (nombre, descripcion) VALUES (:nombre, :descripcion)");
    $result = $conexion->prepare($insertar);
    $result->execute([":nombre" => $nombre, ":descripcion" => $descripcion]);
      echo ("Se a agregado correctamente la tarea");
}


?>