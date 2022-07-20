<?php
include "conection.php";

if (isset($_POST)) {
    $search = $_POST["task"];
    $searchTaskQuery = "SELECT * FROM tasks WHERE task_name LIKE :task_name";

    $result = $db->prepare($searchTaskQuery);

    $result->execute([":task_name" => "$search%"]);

    if (!$result) {
        echo json_encode([
            "message" => "error"
        ]);
    };
    $json = array();
    while ($rows = $result->fetch()) {
        $json[]=array(
            'task_name' => $rows['task_name'],
            'task_description' => $rows['task_description'],
            'task_id' => $rows['task_id']
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