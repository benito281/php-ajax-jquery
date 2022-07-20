<?php
include "conection.php";
 
if (isset($_POST)) {
    $taskId= $_POST['taskId'];
    $taskName= $_POST['taskName'];
    $taskDescription= $_POST['taskDescription'];

    $updateTaskQuery = "UPDATE tasks SET task_name = :task_name, task_description = :task_description WHERE task_id = :task_id";
    $result = $db->prepare($updateTaskQuery);
    $result->execute([":task_name" => $taskName, ":task_description" => $taskDescription, ":task_id" => $taskId]);
    if(!$result) {
       echo json_encode([
        "Message" => "error"
       ]);
    }
    echo json_encode([
        "message" => "ok"
    ]);
}




?>