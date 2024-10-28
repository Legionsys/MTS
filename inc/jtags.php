<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
define("FS_ROOT", realpath(dirname(__FILE__)));
require_once FS_ROOT.'/dbh.inc.php';
session_start();
// Get required parameters
$jobNumber = isset($_GET['job']) ? intval($_GET['job']) : null;
$action = isset($_GET['action']) ? $_GET['action'] : null;
$detail = isset($_GET['detail']) ? $_GET['detail'] : null;
$user = $_SESSION["useruid"]; 
header('Content-Type: application/json');
if ($detail === 'null' || $detail === '') {
    $detail = null; // You can set this to an empty string instead if needed
}
//echo $user;
if ((!$jobNumber && $jobNumber != 0) || !$action) {
    if (!$jobNumber) {
        die(json_encode(['error' => 'Job number are required']));
    }
    die(json_encode(['error' => 'Job number and action are required - act = ' . $action . ' - job - ' . $jobNumber]));
}

// Switch based on action
switch ($action) {
    case 'retrieve':
        // Retrieve all active tags
        $sql = "SELECT tag FROM jobTags WHERE job = ? AND removed IS NULL";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $jobNumber);
        $stmt->execute();
        $result = $stmt->get_result();
        $tags = [];
        while ($row = $result->fetch_assoc()) {
            $tags[] = $row['tag'];
        }
        header('Content-Type: application/json');
        echo json_encode(['tags' => $tags]);
        break;

    case 'add':
        if (!$detail) {
            die(json_encode(['error' => 'Tag detail is required for adding a tag']));
        }
        // Add a tag
        $sql = "INSERT INTO jobTags (job, tag, added, addby) VALUES (?, ?, CURDATE(), ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iss", $jobNumber, $detail, $user);
        header('Content-Type: application/json');
        if ($stmt->execute()) {
            echo json_encode(['success' => 'Tag added']);
        } else {
            echo json_encode(['error' => 'Failed to add tag']);
        }
        break;

    case 'remove':
        if (!$detail) {
            die(json_encode(['error' => 'Tag detail is required for removing a tag']));
        }
        // Remove a tag
        $sql = "UPDATE jobTags SET removed = CURDATE(), remby = ? WHERE job = ? AND tag = ? AND removed IS NULL";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sis", $user, $jobNumber, $detail);
        header('Content-Type: application/json');
        if ($stmt->execute()) {
            echo json_encode(['success' => 'Tag removed']);
        } else {
            echo json_encode(['error' => 'Failed to remove tag']);
        }
        break;

    case 'hide':
        if (!$detail) {
            die(json_encode(['error' => 'Tag detail is required for hiding a tag']));
        }
        // Hide a tag
        $sql = "UPDATE jobTags SET hide = CURDATE(), hideby = ? WHERE tag = ? AND hide IS NULL";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $user, $detail);
        header('Content-Type: application/json'); // Set the content type to JSON
        if ($stmt->execute()) {
            echo json_encode(['success' => 'Tags hidden']);
        } else {
            echo json_encode(['error' => 'Failed to hide tags']);
        }
        break;
    case 'list':
        $srch = '%'.$detail.'%';
        $sql = "SELECT DISTINCT tag FROM jobTags WHERE hide IS NULL AND tag LIKE ? AND tag NOT IN (SELECT tag FROM jobTags WHERE job = ? AND removed IS NULL);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $srch, $jobNumber);
        $stmt->execute();
        $result = $stmt->get_result();
        $tags = [];
    
        while ($row = $result->fetch_assoc()) {
            $tags[] = $row['tag'];
        }
        header('Content-Type: application/json');
        echo json_encode(['tags' => $tags]);
        break;
    case 'flist':
        $srch = '%'.$detail.'%';
        $sql = "SELECT DISTINCT tag,hide FROM jobTags WHERE tag LIKE ? AND tag NOT IN (SELECT tag FROM jobTags WHERE job = ? AND removed IS NULL);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $srch, $jobNumber);
        $stmt->execute();
        $result = $stmt->get_result();
        $tags = [];
    
        while ($row = $result->fetch_assoc()) {
            $tags[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode(['tags' => $tags]);
        break;

    default:
        echo json_encode(['error' => 'Invalid action - act = ' . $action]);
        break;
}

// Close the prepared statement if necessary
if (isset($stmt)) {
    $stmt->close();
    exit;
}
