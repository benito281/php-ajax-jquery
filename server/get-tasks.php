<?php
include("conection.php");

if (isset($_GET)) {
    $getTaskQuery = "SELECT * FROM tasks";
    $result = $db->prepare($getTaskQuery);
    $result->execute();
    $tasks = $result->fetchAll(PDO::FETCH_ASSOC);

    if(!$tasks){
        echo json_encode([ "message" => "No-tasks" ]);
    }
    else{
        echo json_encode($tasks);
    }
        /* $json = array();
        foreach($tasks as $taskslist){
            $json[] = array(
                'task_name' => $taskslist['task_name'],
                'task_description' => $taskslist['task_description'],
                'task_id' => $taskslist['task_id']
            );
        } */
        //echo json_encode($tasks);
    
}


?>