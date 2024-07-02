<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
$usr = $_SESSION["userid"];
$uid = $_SESSION["useruid"];
$mrkr = new DateTime();
$mrkr = $mrkr->format('Y-m-d H:i:s');


//determine the job to be cleared with the job number
if (isset($_POST['jobno'])) {
    $jb = trim($_POST['jobno']);
} else {
    echo "Error: job number not set";
    exit();
}
echo "uid - ".$uid;
echo "usr - ".$usr;
//ensure job number is not blank or null


if ($jb == '' || $jb == null ) {
    if ($jb == '') {
        echo ("jb is blank");
    } else if ($jb == null) {
        echo ("jb is null");
    } else {
        echo ("jb is unknown");
    }
    //echo "$jb Error: no job number received2";
}
// set user variable and also date and time marker


//copy the job details to table called delJobList
require_once 'dbh.inc.php';

// Retrieve column names from jobList table
$sql = "SELECT GROUP_CONCAT(COLUMN_NAME) AS columns
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'jobList'";

$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $sql)) {
    echo "Error: prepare statement failed";
    exit();
}

mysqli_stmt_bind_param($stmt, "s", $dBName);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    $columns = $row['columns'];
} else {
    echo "Error: could not retrieve column names";
    exit();
}

mysqli_stmt_close($stmt);

$sql = "INSERT INTO delJobList (d_del, usersId, $columns)
        SELECT ?, ?, $columns FROM jobList WHERE jobID = ?";

$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt,$sql)) {
    
    echo "Error prepare failure";
    exit();
}

mysqli_stmt_bind_param($stmt, "sii", $mrkr, $usr, $jb);

if(!$stmt->execute())
{
    // There was an error
    echo 'Error : '.$stmt->error;
}

mysqli_stmt_close($stmt);

//move all suppliers, con notes and job notes to job 0
$oldJobID = $jb;
$newJobID = 0;

// Create an array of table names to update
$tables = ['jobSup', 'jobNote', 'conNotes'];

// Prepare the update statement for each table and execute
foreach ($tables as $table) {
    $sql = "UPDATE $table SET jobID = ? WHERE jobID = ?";
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "Error: prepare statement failed for table $table - " . mysqli_error($conn);
        exit();
    }

    mysqli_stmt_bind_param($stmt, "ii", $newJobID, $oldJobID);

    if (!mysqli_stmt_execute($stmt)) {
        echo "Error: execution failed for table $table - " . mysqli_stmt_error($stmt);
        exit();
    }

    mysqli_stmt_close($stmt);
}


// Remove jobID from the columns list
$columnsArray = explode(',', $columns);
$columnsArray = array_filter($columnsArray, function($col) {
    $trimmedCol = trim($col);
    return $trimmedCol !== 'jobID' && $trimmedCol !== 'clientId';
});
$columns = implode(', ', $columnsArray);

// Construct the SET clause for the UPDATE statement
$setClause = implode(' = NULL, ', $columnsArray) . ' = NULL';

// Construct the complete UPDATE query
$updateSql = "UPDATE jobList SET clientId=0,$setClause where jobID = ?";
//echo " ---- " . $updateSql;
//echo " ----- " . $jb;
$stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $updateSql)) {
        echo "Error: prepare statement failed for clearing joblist data - " . mysqli_error($conn);
        exit();
    }

    mysqli_stmt_bind_param($stmt, "i", $jb);

    if (!mysqli_stmt_execute($stmt)) {
        echo "Error: execution failed for clearing joblist data - " . mysqli_stmt_error($stmt);
        exit();
    }

    mysqli_stmt_close($stmt);



?>