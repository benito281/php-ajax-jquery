<?php

define('USER_NAME','root');
define('USER_PASS','');
define('DB_NAME','practica1');
define('DB_HOST','localhost');

try {
    $conexion = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME
                    , USER_NAME
                    , USER_PASS
                    ,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));        
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);		    
}
catch(PDOException $e){
    echo "Falló la conexión: " . $e->getMessage();
    exit;
}


?>