<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set JSON header
header('Content-Type: application/json');

session_start();
define("FS_ROOT", realpath(dirname(__FILE__)));
require_once FS_ROOT . '/dbh.inc.php';

// Check if job number is provided
if (isset($_POST['jobno'])) {
    $jb = trim($_POST['jobno']);
} else {
    echo json_encode([
        'status' => 'error',
        'details' => 'job number not set'
    ]);
    exit();
}

// Ensure job number is not blank or null
if ($jb == '' || $jb == null) {
    $details = $jb == '' ? 'jb is blank' : ($jb == null ? 'jb is null' : 'jb is unknown');
    echo json_encode([
        'status' => 'error',
        'details' => $details
    ]);
    exit();
}

// Start transaction
mysqli_begin_transaction($conn);

try {
    // Retrieve column names from jobList table
    $sql = "SELECT GROUP_CONCAT(COLUMN_NAME) AS columns
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'jobList' AND COLUMN_NAME not in ('jobID','jobDate','jobFin','jobComp','jobInv','invNum')";

    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        throw new Exception("Error: prepare statement failed for column retrieval");
    }

    mysqli_stmt_bind_param($stmt, "s", $dBName);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        $columns = $row['columns'];
    } else {
        throw new Exception("Error: could not retrieve column names");
    }
    mysqli_stmt_close($stmt);

    // Duplicate jobList record
    $sql = "INSERT INTO jobList ($columns)
            SELECT $columns FROM jobList WHERE jobID = ?";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        throw new Exception("Error: prepare statement failed for jobList duplication");
    }

    mysqli_stmt_bind_param($stmt, "i", $jb);
    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception("Error: execution failed for jobList duplication - " . mysqli_stmt_error($stmt));
    }

    // Get the new jobID
    $newJobID = mysqli_insert_id($conn);
    mysqli_stmt_close($stmt);

    // Array of related tables to duplicate
    $tables = ['jobNote'];

    // Duplicate records in related tables
    foreach ($tables as $table) {
        // Get column names for the current table, excluding jobID
        $sql = "SELECT GROUP_CONCAT(COLUMN_NAME) AS columns
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME != 'jnID' AND COLUMN_NAME != 'jobID'";

        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            throw new Exception("Error: prepare statement failed for $table columns");
        }

        mysqli_stmt_bind_param($stmt, "ss", $dBName, $table);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($row = mysqli_fetch_assoc($result)) {
            $tableColumns = $row['columns'];
        } else {
            throw new Exception("Error: could not retrieve column names for $table");
        }
        mysqli_stmt_close($stmt);

        // Create INSERT statement, explicitly setting jobID to newJobID
        $sql = "INSERT INTO $table ($tableColumns, jobID)
                SELECT $tableColumns, ? FROM $table WHERE jobID = ?";

        $stmt = mysqli_stmt_init($conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            throw new Exception("Error: prepare statement failed for $table duplication");
        }

        mysqli_stmt_bind_param($stmt, "ii", $newJobID, $jb);
        if (!mysqli_stmt_execute($stmt)) {
            throw new Exception("Error: execution failed for $table duplication - " . mysqli_stmt_error($stmt));
        }
        mysqli_stmt_close($stmt);
    }

    // Commit transaction
    mysqli_commit($conn);
    echo json_encode([
        'status' => 'success',
        'details' => "$newJobID"
    ]);
} catch (Exception $e) {
    // Rollback transaction on error
    mysqli_rollback($conn);
    echo json_encode([
        'status' => 'error',
        'details' => $e->getMessage()
    ]);
}

// Close connection
mysqli_close($conn);
