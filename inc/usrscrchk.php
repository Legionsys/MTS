<?php
$builtJSON = file_get_contents('php://input');

if ($builtJSON === FALSE) {
    echo 'Error JSON Build Fail';
}

$arr = json_decode($builtJSON, true);

//Database connection
require_once 'dbh.inc.php';

$sql = "SELECT count(usersId) as counter FROM `users` WHERE usersUid = ? and usersId <> ?;";

$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt,$sql)) {
    echo 'Error - issue with Login name confirmation at preparation';
    exit();
}

mysqli_stmt_bind_param($stmt, "si", $arr['scr'], $arr['id']);
mysqli_stmt_execute($stmt);

$resultData = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($resultData) > 0){
    while ($row = mysqli_fetch_assoc($resultData)) {
        if ($row['counter'] == 0) {
            echo 'Unique name approved';
        } else {
            echo 'Error found '.$row['counter'].' matches';
        }     
    }
    
 } else {
    echo 'Error - issue with Login name confirmation';
}






if($checkPwd === false) {
    //echo 'Pass match Error - '.$uidExists["usersPwd"].' -- '.$arr['pass'].'='.password_hash($arr['pass'], PASSWORD_DEFAULT);
    echo 'Pass match Error';
    exit();          
} else if ($checkPwd === true) {
    echo 'Pass match found ';
}
    
    



?>