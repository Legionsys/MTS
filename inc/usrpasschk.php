<?php
$builtJSON = file_get_contents('php://input');

if ($builtJSON === FALSE) {
    echo 'Error JSON Build Fail';
}

$arr = json_decode($builtJSON, true);

//Database connection
require_once 'dbh.inc.php';
require_once 'functions.inc.php';

$uidExists = usridExists($conn,$arr['id']);

if ($uidExists === false) {
    echo 'usridExists Error';
    exit();        
}
$checkPwd = password_verify($arr['pass'], $uidExists["usersPwd"]);

if($checkPwd === false) {
    //echo 'Pass match Error - '.$uidExists["usersPwd"].' -- '.$arr['pass'].'='.password_hash($arr['pass'], PASSWORD_DEFAULT);
    echo 'Pass match Error';
    exit();          
} else if ($checkPwd === true) {
    echo 'Pass match found ';
}
    
    



?>