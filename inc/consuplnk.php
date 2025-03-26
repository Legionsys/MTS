<?php
// update_links.php
define("FS_ROOT", realpath(dirname(__FILE__)));
require_once FS_ROOT . '/dbh.inc.php';
session_start(); // Start session to access $_SESSION['usr']

// Get the JSON data from the request
$input = json_decode(file_get_contents('php://input'), true);
$cns = $input['cns'] ?? []; // Array of cnid values
$sps = $input['sps'] ?? []; // Array of jsID values
$usr = isset($_SESSION['useruid']) ? $_SESSION['useruid'] : null;    // Session user

// Start transaction
mysqli_begin_transaction($conn);

try {
    // 1. Update existing records to mark as deleted
    if (!empty($cns)) {
        // Escape values for safety
        $cnValues = implode(',', array_map(function ($val) use ($conn) {
            return "'" . mysqli_real_escape_string($conn, $val) . "'";
        }, $cns));

        $spCondition = '';
        if (!empty($sps)) {
            $spValues = implode(',', array_map(function ($val) use ($conn) {
                return "'" . mysqli_real_escape_string($conn, $val) . "'";
            }, $sps));
            $spCondition = "AND jsID NOT IN ($spValues)";
        }

        $updateSql = "UPDATE jobConSupLnk 
                     SET delusr = '" . mysqli_real_escape_string($conn, $usr) . "', 
                         deltime = NOW()
                     WHERE cnid IN ($cnValues)
                     $spCondition";

        if (!mysqli_query($conn, $updateSql)) {
            throw new Exception("Update failed: " . mysqli_error($conn));
        }
    }

    // 2. Insert missing links
    // Get existing combinations
    if (!empty($cns)) {
        $cnValues = implode(',', array_map(function ($val) use ($conn) {
            return "'" . mysqli_real_escape_string($conn, $val) . "'";
        }, $cns));

        $existingSql = "SELECT cnid, jsID 
                       FROM jobConSupLnk 
                       WHERE cnid IN ($cnValues)
                       AND deltime IS NULL";

        $result = mysqli_query($conn, $existingSql);
        if (!$result) {
            throw new Exception("Select failed: " . mysqli_error($conn));
        }

        $existingPairs = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $existingPairs[] = $row['cnid'] . '-' . $row['jsID'];
        }

        // Insert new combinations
        foreach ($cns as $cnid) {
            foreach ($sps as $jsid) {
                $pair = $cnid . '-' . $jsid;
                if (!in_array($pair, $existingPairs)) {
                    $cnidSafe = mysqli_real_escape_string($conn, $cnid);
                    $jsidSafe = mysqli_real_escape_string($conn, $jsid);
                    $insertSql = "INSERT INTO jobConSupLnk (cnid, jsID, lnkusr,lnktime) 
                                VALUES ('$cnidSafe', '$jsidSafe', '$usr', NOW())";

                    if (!mysqli_query($conn, $insertSql)) {
                        throw new Exception("Insert failed: " . mysqli_error($conn));
                    }
                }
            }
        }
    }

    // Commit transaction
    mysqli_commit($conn);

    // Send success response
    echo json_encode(['status' => 'success', 'message' => 'Links updated successfully']);
} catch (Exception $e) {
    // Rollback on error
    mysqli_rollback($conn);

    // Send error response
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    exit;
}
