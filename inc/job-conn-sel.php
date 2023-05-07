<?php
//set vars and checks    
if (isset($_POST['cnid'])) {
    $cnid = trim($_POST['cnid']);
};

require_once 'dbh.inc.php';

$sql = "SELECT * FROM conNotes where cnID=?";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt,$sql)) {
    echo "<script>console.log('Error with return for CN ".$cnid."');</script>";
    exit();
}
mysqli_stmt_bind_param($stmt, "i", $cnid);
mysqli_stmt_execute($stmt);

$resultData = mysqli_stmt_get_result($stmt);
if ($row = mysqli_fetch_assoc($resultData)) {
    echo json_encode($row);
} else {
    $result = false;
    echo "<script>console.log('error on row for CN ".$cnid."');</script>";     
}

mysqli_stmt_close($stmt);
?>