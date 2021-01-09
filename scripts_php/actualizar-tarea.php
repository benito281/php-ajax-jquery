<?php


include('conexion.php');
     $id=$_POST['id'];
     $stmt = $conexion->prepare("SELECT * FROM tareas WHERE id_tarea=:id_tarea");
     $stmt->execute([":id_tarea" => $id]);
     $tareas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (!$tareas) {
        die("Error en la consulta");
    }
    $json=array();
    foreach($tareas as $tarea){
        $json[]=array(
            'id_tarea'=>$tarea['id_tarea'],
            'nombre'=>$tarea['nombre'],
            'descripcion'=>$tarea['descripcion']
        );
    }
      echo json_encode($json[0]);





?>