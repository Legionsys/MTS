<?php
//set vars and checks    
if (isset($_POST['fle'])) {
    $file = trim($_POST['fle']);
};
if (isset($_POST['vars'])) {
    $var = trim($_POST['vars']);
};

define("FS_ROOT", realpath(dirname(__FILE__)));
require_once FS_ROOT.'/dbh.inc.php';

$usr = $_SESSION['useruid'];

$sql = "INSERT INTO eLog (tStamp,phpFile,vars,usr) VALUES (current_timestamp(),?,?,?);";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt,$sql)) {
    return "ERROR";
    exit();
}
mysqli_stmt_bind_param($stmt, "sss", $file,$var,$usr);
mysqli_stmt_execute($stmt);


mysqli_stmt_close($stmt);


?>