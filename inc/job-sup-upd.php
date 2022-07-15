<?php
//set vars and checks    
if (isset($_POST['updstr'])) {
    $updstr = trim($_POST['updstr']);
};
if (isset($_POST['ref'])) {
    $col = trim($_POST['ref']);
};
if (isset($_POST['cno'])) {
    $cno = trim($_POST['cno']);
};
    
    require_once 'dbh.inc.php';

$sql = "UPDATE jobSup set ".$col."=? where jsID=?;";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt,$sql)) {
    return "ERROR";
    exit();
}
mysqli_stmt_bind_param($stmt, "si", $updstr, $cno);

mysqli_stmt_execute($stmt);    
$resultData = mysqli_insert_id($conn);
echo $resultData;
mysqli_stmt_close($stmt);

?>