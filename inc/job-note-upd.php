<?php
//set vars and checks   
$updstr = $jcol = $cno = NULL; 
if (isset($_POST['updstr'])) {
    $updstr = trim($_POST['updstr']);
};
$jcol = '';
if (isset($_POST['ref'])) {
    $jcol = trim($_POST['ref']);
};
if (isset($_POST['cno'])) {
    $cno = trim($_POST['cno']);
};
/*    define("FS_ROOT", realpath(dirname(__FILE__)));
    require_once FS_ROOT.'/dbh.inc.php';*/
if ($jcol == ''){
    exit();
}
require_once 'dbh.inc.php';

if ($updstr == "") {
    $updstr = NULL;
}
if ($updstr != Null) {
    $updstr = html_entity_decode($updstr);
}


$sql = "UPDATE jobNote set " . $jcol . " = ? where jnID=?;";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt,$sql)) {
    die("ERROR: " . mysqli_error($conn));
}
mysqli_stmt_bind_param($stmt, "si",$updstr, $cno);

mysqli_stmt_execute($stmt);    
$resultData = mysqli_insert_id($conn);
//echo $resultData;
echo "success";
mysqli_stmt_close($stmt);
mysqli_close($conn);
?>