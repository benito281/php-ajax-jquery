<?php
include "conexion.php";
/* if (isset($_POST)) {
    echo var_dump($_POST);
} */

if (isset($_POST)) {
$busqueda=$_POST["busqueda"];
$consulta = "SELECT * FROM tareas WHERE nombre LIKE :nombre";

$result = $conexion->prepare($consulta);

$result->execute([":nombre" => "$busqueda%"]);

if (!$result) {
    die("Error de consulta");
};
$json=array();
while ($filas= $result->fetch()) {
    $json[]=array(
        'nombre'=>$filas['nombre'],
        'descripcion'=>$filas['descripcion'],
        'id_tarea'=>$filas['id_tarea']
    );

}
echo json_encode($json);
/* $filas= $result->fetchAll(PDO::FETCH_OBJ); */



/* $json=array();

while ($filas) {
    $json[]=array(
        'nombre'=>$filas['nombre'],
        'descripcion'=>$filas['descripcion'],
        'id_tarea'=>$filas['id_tarea']
    );
}

echo json_encode($json); */



};

?>