<?php
//set vars and checks    
if (isset($_POST['updstr'])) {
    $updstr = trim($_POST['updstr']);
};
if (isset($_POST['cno'])) {
    $cno = trim($_POST['cno']);
};
    define("FS_ROOT", realpath(dirname(__FILE__)));
    require_once FS_ROOT.'/dbh.inc.php';

$data = json_decode($updstr, true);
if ($data === null) {
    // Handle JSON decoding error
    die('Error decoding JSON');
}
$stmt = mysqli_stmt_init($conn);
$updateQuery = "UPDATE conNotes SET ";


//generate list of columns
$sql = "SHOW COLUMNS FROM conNotes";
$result = $conn->query($sql);
if ($result) {
    $columnNames = array();
    while ($row = $result->fetch_assoc()) {
        $columnNames[] = $row['Field'];
    }

    foreach ($data as $column => $value) {
        //check if column is column for database
        if (in_array($column, $columnNames)) {
            //process data update
            $escapedValue = mysqli_real_escape_string($conn, $value); // Make sure to escape values to prevent SQL injection
            $updateQuery .= "$column = '$escapedValue', ";            
            //$updateQuery .= "$column = '$value', ";            
        } else {
            die("Column does not exist: $column");
        }

    }
    $updateQuery = rtrim($updateQuery, ', ');
    $updateQuery .= " WHERE cnID=?;";
 
    if (!mysqli_ping($conn)) {
        echo "ERROR: Database connection lost";
        exit();
    }
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$updateQuery)) {
        echo "ERROR: Prepare failed - " . mysqli_error($conn);
        exit();
    }
    $bindingResult = mysqli_stmt_bind_param($stmt, "i", $cno);
    if (!$bindingResult) {
        echo "ERROR: Binding parameters failed - " . mysqli_stmt_error($stmt);
        exit();
    }



    //mysqli_stmt_bind_param($stmt, "i", $cno);
    if (mysqli_stmt_execute($stmt)) {
        echo "success";
    } else {
        // An error occurred during execution, handle it
        echo "Error: " . mysqli_stmt_error($stmt);
    }
    mysqli_stmt_close($stmt);
} else {
    echo "Error: Failure to load column check";
}
?>