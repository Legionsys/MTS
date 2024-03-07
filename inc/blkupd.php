<?php
if (isset($_POST['lnk']) && !empty($_POST['lnk'])) {
    $link = json_decode($_POST['lnk'], true);
    // Check if JSON decoding was successful
    if ($link === null) {
        echo "ERROR: Invalid JSON data";
        exit();
    }
    //Extract first level information
    $id = $link['id'];
    $ori = $link['ori'];
    $table = "";
    $idvar = "";
    switch ($ori){
        case "jobDetails":
            $table = "jobList";
            $idvar = "jobID";
            break;
        case "jobNotes":
            $table = "jobNote";
            $idvar = "jnID";
            break;
        case "jobSupplier":
            $table = "jobSup";
            $idvar = "jsID";
            break;
        case "conDetails":
            $table = "conDets";
            $idvar = "conID";
            break;
        case "conNote":
            $table = "conNotes";
            $idvar = "cnID";
            break;
        default:
            die("ERROR: Table Not Found");
    }
    $updData = $link['Data'];
    // Convert empty values to null
    $updData = array_map(function ($value) {
        return $value === '' ? null : $value;
    }, $updData);

    define("FS_ROOT", realpath(dirname(__FILE__)));
    require_once FS_ROOT.'/dbh.inc.php';

    // Validate and sanitize column names
    $sqlColumns = "SHOW COLUMNS FROM $table;";
    $resultColumns = mysqli_query($conn, $sqlColumns);
    
    if (!$resultColumns) {
        echo "ERROR: Unable to fetch column names";
        exit();
    }

    $validColumns = array();
    while ($row = mysqli_fetch_assoc($resultColumns)) {
        $validColumns[] = $row['Field'];
    }

    foreach (array_keys($updData) as $column) {
        if (!in_array($column, $validColumns)) {
            echo "ERROR: Invalid column name - $column";
            exit();
        }
    }

    // Dynamically construct the update string
    $updateString = '';
    foreach ($updData as $column => $value) {
        $updateString .= "`$column` = ?, ";
    }
    $updateString = rtrim($updateString, ', ');

    // Construct the prepared statement
    $sql = "UPDATE $table SET $updateString WHERE $idvar=?;";
    $stmt = mysqli_stmt_init($conn);
    
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "ERROR: Prepare failed - " . mysqli_stmt_error($stmt);
        exit();
    }

    // Determine data types for binding parameters
    $types = str_repeat('s', count($updData)) . 'i';
    $params = array_merge([$stmt, $types], array_values($updData), [$id]);
    // Bind parameters dynamically
    call_user_func_array('mysqli_stmt_bind_param', $params);

    // Execute the query
    if (!mysqli_stmt_execute($stmt)) {
        echo "ERROR: Execute failed - " . mysqli_stmt_error($stmt);
        exit();
    }

    echo "success";
} else {
    echo "ERROR: No JSON data received";
    exit();
}
?>