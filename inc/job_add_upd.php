<?php
//set vars and checks    
if (isset($_POST['col'])) {
    $col = trim($_POST['col']);
};
if (isset($_POST['val'])) {
    $val = trim($_POST['val']);
};
if (isset($_POST['jno'])) {
    $jobn = trim($_POST['jno']);
};
echo $col."-".$val."-".$jobn;

if ($val == "") {
    $val = Null;
};

echo $col."-".$val."-".$jobn." || ".date("Y-m-d");
require_once 'dbh.inc.php';

$sql = "UPDATE jobList set " . $col . " = ? where jobID = ?;";
echo $sql;
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt,$sql)) {
    return "ERROR on prepare";
    exit();
}
//change bindings if date req.
mysqli_stmt_bind_param($stmt, "si", $val, $jobn);

mysqli_stmt_execute($stmt);    
$resultData = mysqli_insert_id($conn);
if ($resultData != null ) {
    return $resultData;
} else {
    return "ERROR on result";
    exit();
}
mysqli_stmt_close($stmt);

?>