<?php
include 'conection.php';


if (isset($_POST)) {
    $id = $_POST['taskId'];
    $getTaskByIdQuery = $db->prepare("SELECT * FROM tasks WHERE task_id = :task_id");
    $getTaskByIdQuery->execute([":task_id" => $id]);
    $task = $getTaskByIdQuery->fetchAll(PDO::FETCH_ASSOC);
   if (!$task) {
      echo json_encode([
        "message" => "error"
      ]);
   }
   $json = array();
   foreach($task as $taskSelected){
       $json[] = array(
           'task_id' => $taskSelected['task_id'],
           'task_name' => $taskSelected['task_name'],
           'task_description' => $taskSelected['task_description']
       );
   }
     echo json_encode($json[0]);
}






?>