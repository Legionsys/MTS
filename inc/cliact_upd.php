<?php
//set vars and checks    
if (isset($_POST['cli'])) {
    $cli = trim($_POST['cli']);
};
if (isset($_POST['mkr'])) {
    $mkr = trim($_POST['mkr']);
};
    define("FS_ROOT", realpath(dirname(__FILE__)));
    require_once FS_ROOT.'/dbh.inc.php';

//require_once 'dbh.inc.php';

$sql = "UPDATE clientList set act=? where clientId=?;";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt,$sql)) {
    return "ERROR";
    exit();
}
mysqli_stmt_bind_param($stmt, "ii", $mkr, $cli);

mysqli_stmt_execute($stmt);    
$resultData = mysqli_insert_id($conn);
echo $resultData;
mysqli_stmt_close($stmt);

?>