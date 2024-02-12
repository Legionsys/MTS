<?php
// Set vars and checks    
if (isset($_POST['updstr'])) {
    $updstr = trim($_POST['updstr']);
}

if (isset($_POST['cno'])) {
    $cno = trim($_POST['cno']);
}

define("FS_ROOT", realpath(dirname(__FILE__)));
require_once FS_ROOT . '/dbh.inc.php';

// Check if updstr is a valid JSON string
$data = json_decode($updstr, true);
if ($data === null) {
    echo "ERROR: Invalid JSON data";
    exit();
}

// Get column names from the table conDets
$sqlColumns = "SHOW COLUMNS FROM conDets";
$resultColumns = $conn->query($sqlColumns);

if (!$resultColumns) {
    echo "ERROR: Unable to fetch column names";
    exit();
}

$columnNames = array();
while ($row = $resultColumns->fetch_assoc()) {
    $columnNames[] = $row['Field'];
}

// Validate and construct SET clause
$setClause = "";
$columnLst = "";
foreach ($data as $column => $value) {
    if (!in_array($column, $columnNames)) {
        echo "ERROR: Invalid column name - $column";
        exit();
    }

    $escapedValue = mysqli_real_escape_string($conn, $value);
    $setClause .= "$column = '$escapedValue', ";
    $columnLst .= "$column,";
}
$columnLst = substr($columnLst, 0, -1);
if (empty($setClause)) {
    echo "ERROR: No valid columns provided for update";
    exit();
}

$setClause = rtrim($setClause, ', ');
// Prepare and execute the update query
$sqlUpdate = "UPDATE conDets SET $setClause WHERE itID = ?;";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $sqlUpdate)) {
    echo "ERROR: Prepare failed - " . mysqli_stmt_error($stmt);
    exit();
}

mysqli_stmt_bind_param($stmt, "i", $cno);

if (!mysqli_stmt_execute($stmt)) {
    echo "ERROR: Execute failed - " . mysqli_stmt_error($stmt);
    exit();
}

// Retrieve updated values from the database
$sqlSelect = "SELECT $columnLst FROM conDets WHERE itID = ?;";
$stmtSelect = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmtSelect, $sqlSelect)) {
    echo "ERROR: Prepare failed - " . mysqli_stmt_error($stmtSelect);
    exit();
}

mysqli_stmt_bind_param($stmtSelect, "i", $cno);
mysqli_stmt_execute($stmtSelect);

$resultSelect = mysqli_stmt_get_result($stmtSelect);
$updatedData = mysqli_fetch_assoc($resultSelect);

// Check if the updated values match the provided JSON data
$updatedDataAsString = array_map('strval', $updatedData);

echo "success";

mysqli_stmt_close($stmt);
mysqli_stmt_close($stmtSelect);
mysqli_close($conn);



/*
//set vars and checks    
if (isset($_POST['updstr'])) {
    $updstr = trim($_POST['updstr']);
};
if (isset($_POST['cno'])) {
    $cno = trim($_POST['cno']);
};
    define("FS_ROOT", realpath(dirname(__FILE__)));
    require_once FS_ROOT.'/dbh.inc.php';

//require_once 'dbh.inc.php';

//update updstr 
$updstr = mysqli_real_escape_string($conn, $updstr);

$sql = "UPDATE conDets set $updstr where itID=?;";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt,$sql)) {
    echo "ERROR with prepare statement";
    exit();
}

mysqli_stmt_bind_param($stmt, "i", $cno);
mysqli_stmt_execute($stmt);    
$resultData = mysqli_insert_id($conn);
echo $resultData;
mysqli_stmt_close($stmt);
*/
?>