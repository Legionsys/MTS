<?php
//set vars and checks    
if (isset($_POST['updstr'])) {
    $updstr = trim($_POST['updstr']);
}
if (isset($_POST['ref'])) {
    $col = trim($_POST['ref']);
}
if (isset($_POST['cno'])) {
    $cno = trim($_POST['cno']);
}
    require_once 'dbh.inc.php';

    $sql = "UPDATE jobSup set ".$col."=? where jsID=?;";

    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        die("ERROR: " . mysqli_error($conn));
    }

    $updstr = str_replace('<br>', "\n", urldecode($updstr));
    $updstr = mysqli_real_escape_string($conn, $updstr);

    mysqli_stmt_bind_param($stmt, "si", $updstr, $cno);
    mysqli_stmt_execute($stmt);

    if (mysqli_affected_rows($conn) > 0) {
        mysqli_stmt_close($stmt);

        $sql = "SELECT " . $col . " FROM jobSup WHERE jsID=?;";
        $stmt = mysqli_stmt_init($conn);

        if (mysqli_stmt_prepare($stmt, $sql)) {
            mysqli_stmt_bind_param($stmt, "i", $cno);
            mysqli_stmt_execute($stmt);

            $resultData2 = mysqli_stmt_get_result($stmt);

            if ($row = mysqli_fetch_assoc($resultData2)) {
                if ($row[$col] == $updstr) {
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
        die("Update failed - $sql - $updstr");
    }

    // Close the database connection
    mysqli_close($conn);
?>
