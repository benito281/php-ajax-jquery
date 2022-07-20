<?php

include 'conection.php';

if (isset($_POST)) {
    $id = intval($_POST["id"]);
    $deleteTaskQuewry = ("DELETE FROM tasks WHERE task_id = :task_id");
    $result = $db -> prepare($deleteTaskQuewry);
    $result->execute([":task_id" => $id]);
    if (!$result) {
        echo json_encode([
            "message" => "error"
        ]);
    }
    echo json_encode([
        "message" => "ok"
    ]);

}

?>