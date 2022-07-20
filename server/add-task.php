<?php
include 'conection.php';

//Add task
if (isset($_POST)) {
     $title_task = $_POST['taskName'];
     $description_task = $_POST['taskDescription'];

    $addTaskQuery = ("INSERT INTO tasks (task_name, task_description) VALUES (:task_name, :task_description)");
    $result = $db->prepare($addTaskQuery);
    $result->execute([":task_name" => $title_task, ":task_description" => $description_task]);
    if ($result == true) {
      echo json_encode([
        "message" => "ok"
      ]);
    }
    else{
      echo json_encode([
        "message" => "error"
      ]);
    }
}


?>