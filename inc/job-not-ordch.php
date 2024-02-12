<?php


// set vars and checks    
if (isset($_POST['nord'])) {
    $nord = trim($_POST['nord']);
}
if (isset($_POST['job'])) {
    $job = trim($_POST['job']);
}
define("FS_ROOT", realpath(dirname(__FILE__)));
require_once FS_ROOT.'/dbh.inc.php';

$narr = explode('|', $nord);

for ($i = 0; $i < count($narr); ++$i) {
    $sql = "UPDATE jobNote SET jnOrd = ? WHERE jnID = ? AND jobID = ?;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        die("Prepare Error: " . mysqli_error($conn));
    }
    $jnOrd = (int)($i + 1);
    $jnID = (int)$narr[$i];
    $jobID = (int)$job;

    if (!mysqli_stmt_bind_param($stmt, "iii", $jnOrd, $jnID, $jobID)) {
        die("Bind Param Error: " . mysqli_stmt_error($stmt));
    }
    if (!mysqli_stmt_execute($stmt)) {
        die("Execute Error: " . mysqli_stmt_error($stmt));
    }
    mysqli_stmt_close($stmt);
}

echo "Update completed successfully.";

?>
