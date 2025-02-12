<?php
$col = $val = $jobn = NULL;
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
if ($val == "") {
    $val = Null;
};
require_once 'dbh.inc.php';
$sql = "UPDATE jobList set " . $col . " = ? where jobID = ?;";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt, $sql)) {
    return "ERROR on prepare";
    exit();
}
//change bindings if date req.
mysqli_stmt_bind_param($stmt, "si", $val, $jobn);
mysqli_stmt_execute($stmt);


if (mysqli_affected_rows($conn) > 0) {
    mysqli_stmt_close($stmt);

    $sql = "SELECT " . $col . " FROM jobList WHERE jobID = ?";
    $stmt = mysqli_stmt_init($conn);

    if (mysqli_stmt_prepare($stmt, $sql)) {

        mysqli_stmt_bind_param($stmt, "i", $jobn);
        mysqli_stmt_execute($stmt);

        $resultData2 = mysqli_stmt_get_result($stmt);

        if ($row = mysqli_fetch_assoc($resultData2)) {

            if ($row[$col] == $val) {
                echo "success";
            } else {
                echo "error";
            }
        }
    } else {
        die("ERROR: " . mysqli_error($conn));
    }
    mysqli_stmt_close($stmt);
} else {
    die("ERROR: Update failed");
}

// Close the database connection
mysqli_close($conn);
