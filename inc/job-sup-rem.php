<?php
session_start();

// Check for required POST data
if (!isset($_POST["id"])) {
    echo json_encode(["status" => "error", "message" => "Missing jsID"]);
    exit();
}
$jsid = intval(trim($_POST["id"])); // Cast to integer

// Validate session user (optional, depending on requirements)
$usr = isset($_SESSION['useruid']) ? $_SESSION['useruid'] : null;
if (empty($usr)) {
    $usr = "empty";
}

require_once 'dbh.inc.php';

// First query: DELETE from jobSup
$sqlDelete = "DELETE FROM jobSup WHERE jsID = ?";
$stmtDelete = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmtDelete, $sqlDelete)) {
    echo json_encode(["status" => "error", "message" => "Prepare failed: " . mysqli_error($conn)]);
    exit();
}
mysqli_stmt_bind_param($stmtDelete, "i", $jsid); // Bind as integer
mysqli_stmt_execute($stmtDelete);
$deleteRows = mysqli_stmt_affected_rows($stmtDelete);
mysqli_stmt_close($stmtDelete);

// Second query: UPDATE jobConSupLnk
$sqlUpdate = "UPDATE jobConSupLnk SET delusr = ?, deltime = NOW() WHERE deltime IS NULL AND jsID = ?";
$stmtUpdate = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmtUpdate, $sqlUpdate)) {
    echo json_encode(["status" => "error", "message" => "Prepare failed: " . mysqli_error($conn)]);
    exit();
}
mysqli_stmt_bind_param($stmtUpdate, "si", $usr, $jsid);
mysqli_stmt_execute($stmtUpdate);
$updateRows = mysqli_stmt_affected_rows($stmtUpdate);
mysqli_stmt_close($stmtUpdate);

// Close database connection
mysqli_close($conn);

// Determine overall success
if ($deleteRows > 0) {
    echo json_encode(["status" => "success", "message" => "Record deleted and updated successfully"]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Operation failed",
        "delete_affected" => $deleteRows,
        "update_affected" => $updateRows
    ]);
}
