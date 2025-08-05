<?php
session_start();

// Database configuration
define("FS_ROOT", realpath(dirname(__FILE__)));
require_once FS_ROOT . '/dbh.inc.php';

// Get parameters
$id = isset($_GET['id']) ? $_GET['id'] : null;
$token = isset($_GET['token']) ? $_GET['token'] : null;

if (!$id || !$token) {
    http_response_code(400);
    echo 'Missing ID or token';
    exit;
}

// Query files table
$sql = "SELECT path, filename FROM files WHERE id = ? AND download_token = ?";
$stmt = mysqli_prepare($conn, $sql);
if (!$stmt) {
    http_response_code(500);
    echo 'Database error: ' . mysqli_error($conn);
    exit;
}
mysqli_stmt_bind_param($stmt, 'is', $id, $token);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$file = mysqli_fetch_assoc($result);
mysqli_stmt_close($stmt);

if (!$file) {
    error_log('Download error: No file found for id=' . $id . ', token=' . $token);
    http_response_code(404);
    echo 'File not found or invalid token';
    exit;
}

// Resolve file path from document root if it starts with 'Uploads/'
$resolved_path = $file['path'];
if (strpos($file['path'], 'uploads/') === 0) {
    $resolved_path = $_SERVER['DOCUMENT_ROOT'] . '/' . $file['path'];
}

// Verify file exists
if (!file_exists($resolved_path)) {
    error_log('Download error: File not found at ' . $resolved_path);
    http_response_code(404);
    echo 'File not found';
    exit;
}

// Determine Content-Type based on file extension
$extension = strtolower(pathinfo($file['filename'], PATHINFO_EXTENSION));
$contentTypes = [
    'jpeg' => 'image/jpeg',
    'jpg' => 'image/jpeg',
    'png' => 'image/png',
    'pdf' => 'application/pdf',
    'txt' => 'text/plain',
    'doc' => 'application/msword',
    'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
$contentType = isset($contentTypes[$extension]) ? $contentTypes[$extension] : 'application/octet-stream';
$full_file = $resolved_path . $file['filename'];

// Serve the file
header('Content-Type: ' . $contentType);
header('Content-Disposition: inline; filename="' . $file['filename'] . '"');
header('Content-Length: ' . filesize($full_file));
readfile($full_file);
exit;
?>