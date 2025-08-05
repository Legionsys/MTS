<?php
session_start();
header('Content-Type: application/json');

// Database configuration
define("FS_ROOT", realpath(dirname(__FILE__)));
require_once FS_ROOT . '/dbh.inc.php';

// Create uploads directory if it doesn't exist
$uploadDir = realpath(FS_ROOT . '/../uploads/') . '/';
$allowed_types = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
$max_file_size = 20 * 1024 * 1024;

if (!file_exists($uploadDir)) {
    echo json_encode(['success' => false, 'message' => 'Folder Not found']);
    exit;
    //mkdir($uploadDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $entity_type = isset($_POST['entity_type']) ? $_POST['entity_type'] : null;
    $entity_id = isset($_POST['entity_id']) ? $_POST['entity_id'] : null;
    $file_class = isset($_POST['file_class']) ? $_POST['file_class'] : null;
    $notes = isset($_POST['notes']) ? $_POST['notes'] : null;
    $uplusr = isset($_SESSION['useruid']) ? $_SESSION['useruid'] : null;
    
    // Validate file
    if (!$uplusr) {
        $response['message'] = 'Missing required fields: user not found';
        echo json_encode($response);
        exit;
    }
    if (!$entity_type || !$entity_id) {
        $response['message'] = 'Missing required fields: entity_type or entity_id not found';
        echo json_encode($response);
        exit;
    }
    if (!in_array($entity_type, ['job', 'con-note', 'supplier'])) {
        $response['message'] = 'Invalid entity_type';
        echo json_encode($response);
        exit;
    }

    if ($file_class && (strlen($file_class) > 10 || $file_class !== strtoupper($file_class))) {
        $response['message'] = 'file_class must be uppercase and 10 characters or less';
        echo json_encode($response);
        exit;
    }

    if (!$uplusr) {
        $response['message'] = 'User not authenticated';
        echo json_encode($response);
        exit;
    }

    if (!in_array($file['type'], $allowed_types)) {
        $response['message'] = 'Invalid file type';
        echo json_encode($response);
        exit;
    }

    if ($file['size'] > $max_file_size) {
        $response['message'] = 'File too large';
        echo json_encode($response);
        exit;
    }

    // Generate unique filename and download token
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid('file_') . '.' . $extension;
    $file_path = $uploadDir . $filename;
    if (!move_uploaded_file($file['tmp_name'], $file_path)) {
        echo json_encode(['success' => false, 'message' => 'Failed to save file']);
        exit;
    }


    $download_token = bin2hex(random_bytes(16)); // Unique token for secure downloads
    $upload_date = date('Y-m-d H:i:s');
    $path = 'uploads/'; // Store only the directory path
    // Database insert
    
    $stmt = $conn->prepare('INSERT INTO files (filename, path, entity_type, entity_id, upload_date, uplusr, del_date, delusr, download_token, file_class, notes) VALUES (?, ?, ?, ?, NOW(), ?, NULL, NULL, ?, ?, ?)');
    
    
    //$stmt->execute([$filename, $path, $entity_type, $entity_id, $uplusr, $download_token, $file_class, $notes]);

    if (!$stmt) {
        error_log('Database error: Prepare failed - ' . mysqli_error($conn));
        unlink($file_path);
        echo json_encode(['success' => false, 'message' => 'Database error']);
        exit;
    }
    mysqli_stmt_bind_param($stmt, 'ssssssss', $filename, $path, $entity_type, $entity_id, $uplusr, $download_token, $file_class, $notes);
    if (!mysqli_stmt_execute($stmt)) {
        error_log('Database error: Execute failed - ' . mysqli_error($conn));
        unlink($file_path);
        echo json_encode(['success' => false, 'message' => 'Database error']);
        exit;
    }
    $id = mysqli_insert_id($conn);
    mysqli_stmt_close($stmt);




// Return JSON response
echo json_encode([
    'success' => true,
    'id' => $id,
    'filename' => $filename,
    'entity_type' => $entity_type,
    'entity_id' => $entity_id,
    'uplusr' => $uplusr,
    'upload_date' => $upload_date,
    'file_class' => $file_class,
    'notes' => $notes,
    'download_token' => $download_token
]);

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request or no file uploaded']);
}

?>