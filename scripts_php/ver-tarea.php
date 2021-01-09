<?php
include("conexion.php");

$stmt = $conexion->prepare("SELECT * FROM tareas");
$stmt->execute();
$select = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (!$select) {
    die("No hay resultados");
}
else{
 $json=array();
foreach($select as $tareas){
    $json[]=array(
        'nombre'=>$tareas['nombre'],
        'descripcion'=>$tareas['descripcion'],
        'id_tarea'=>$tareas['id_tarea']
    );
    
}
    echo json_encode($json);
}


?>