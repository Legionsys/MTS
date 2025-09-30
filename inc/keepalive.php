<?php
// Start the session to refresh its last access time
session_start();

// Set header to indicate success
header('Content-Type: application/json');
http_response_code(200);

// Optional: Return a small JSON response
echo json_encode(['status' => 'success', 'message' => 'Session kept alive']);

// Optionally log for debugging (uncomment if needed)
// error_log('Keepalive called at ' . date('Y-m-d H:i:s'));
?>