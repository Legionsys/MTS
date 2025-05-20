<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
define("FS_ROOT", realpath(dirname(__FILE__)));
require_once FS_ROOT . '/dbh.inc.php';

// Get required parameters
$jobNumber = isset($_GET['job']) ? intval($_GET['job']) : null;
$action = isset($_GET['action']) ? trim($_GET['action']) : null;
$user = isset($_SESSION['useruid']) ? trim($_SESSION['useruid']) : null;

// Validate parameters
if ($jobNumber === null || !$action || !$user) {
    header('Content-Type: application/json', true, 400);
    if ($jobNumber === null) {
        die(json_encode(['error' => 'Job number is required']));
    }
    if (!$action) {
        die(json_encode(['error' => 'Action is required']));
    }
    if (!$user) {
        die(json_encode(['error' => 'User is not authenticated']));
    }
}

// Switch based on action
switch ($action) {
    case 'enable':
        $sql = "UPDATE jobList SET cnmrk = 0, cmusr = ?, cnupd = CURRENT_TIMESTAMP WHERE jobid = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $user, $jobNumber);
        header('Content-Type: application/json');
        if ($stmt->execute()) {
            echo json_encode(['success' => 'Con Notes enabled']);
        } else {
            echo json_encode(['error' => 'Failed to enable Con Notes'], JSON_THROW_ON_ERROR);
        }
        $stmt->close();
        break;

    case 'disable':
        $sql = "UPDATE jobList SET cnmrk = 1, cmusr = ?, cnupd = CURRENT_TIMESTAMP WHERE jobid = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $user, $jobNumber);
        header('Content-Type: application/json');
        if ($stmt->execute()) {
            echo json_encode(['success' => 'Con Notes disabled']);
        } else {
            echo json_encode(['error' => 'Failed to disable Con Notes'], JSON_THROW_ON_ERROR);
        }
        $stmt->close();
        break;

    default:
        header('Content-Type: application/json', true, 400);
        echo json_encode(['error' => 'Invalid action: ' . htmlspecialchars($action)]);
        break;
}

exit;
