<?php
//set vars and checks    
if (isset($_POST['dj'])) {
    $dj = trim($_POST['dj']);
};
if (isset($_POST['cno'])) {
    $cno = trim($_POST['cno']);
};
/*    define("FS_ROOT", realpath(dirname(__FILE__)));
    require_once FS_ROOT.'/dbh.inc.php';*/

require_once 'dbh.inc.php';

$sql = "UPDATE conNotes set jobID=? where cnID=?;";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt,$sql)) {
    return "ERROR";
    exit();
}
mysqli_stmt_bind_param($stmt, "ii",$dj, $cno);

mysqli_stmt_execute($stmt);    
$resultData = mysqli_insert_id($conn);
echo $resultData;
mysqli_stmt_close($stmt);

?>