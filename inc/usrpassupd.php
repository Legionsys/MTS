<?php
$builtJSON = file_get_contents('php://input');

if ($builtJSON === FALSE) {
    echo 'Error JSON Build Fail';
}

$arr = json_decode($builtJSON, true);

//Database connection
require_once 'dbh.inc.php';

$hashedPwd = password_hash($arr['npass'], PASSWORD_DEFAULT);
//Update Userdetails
$sql = "UPDATE users set usersPwd = ? where usersId = ?;";

$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt,$sql)) {
    return "Error prepare failure";
    exit();
}

mysqli_stmt_bind_param($stmt, "si", $hashedPwd, $arr['id']);

//echo $stmt;
mysqli_stmt_execute($stmt);    
if(!$stmt->execute())
{
    // There was an error
    echo 'Error : '.$stmt->error;
} else {
    echo 'Password updated Successful';
}
//$resultData = mysqli_insert_id($conn);
//echo $resultData;
mysqli_stmt_close($stmt);

?>