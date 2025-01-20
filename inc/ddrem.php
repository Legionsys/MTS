<?php
//define variables
$builtJSON = file_get_contents('php://input');

if ($builtJSON === FALSE) {
    echo 'Error JSON Build Fail';
}
$url_Decode = urldecode($builtJSON);
$rec_arr = json_decode($url_Decode, true);

if ($rec_arr === null) {
    $error = json_last_error_msg();
    echo "Error decoding JSON: " . $error;
    exit;
}

$mrk = $rec_arr['mrk'] ?? '';
$crdencoded = $rec_arr['crd'] ?? '';
$clid = $rec_arr['clid'] ?? '';

$crd = [];
if (!empty($crd)) {
    $crd = json_decode($crdencoded, true);
    if ($crd === null) {
        $error = json_last_error_msg();
        echo "Error decoding nested JSON in 'crd': " . $error;
        exit; // Terminates the script execution
    }
} else {
    echo "CRD data is missing or empty.";
    exit; // Terminates if 'crd' is not provided in the JSON
}
$now = date('Y-m-d H:i:s');
//link to other sources
define("FS_ROOT", realpath(dirname(__FILE__)));
require_once FS_ROOT.'/dbh.inc.php';

//clid check
if (empty($clid)) {
    $clname = $crd['lstcli'] ?? '';
    $sql = "Select clientId from clientList where clientName = ?;";
    $stmt = mysqli_prepare($conn, $sql);
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, 's', $clname);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $clid = mysqli_fetch_all($result, MYSQLI_ASSOC);
        mysqli_stmt_close($stmt);
    
    } else {
        echo json_encode(['error' => 'Client check Query failed']);
    }

}

switch ($mrk){
    case "client":
    case "contact":
        $sql = "UPDATE jobList set pmrk = NOW() where jobID in (select a.jobID from jobList a left join clientList b on a.clientId = b.clientid where a.clientId = ?";
        $params = [];
        array_push($params, $clid);
        $cnt = 1;
        $types = "i";
        $where = '';
        $ktc = [
            'lstcont' => 'contd',
            'lstcph' => 'contPh',
            'lstctc' => 'contEm',
            'lstctc2' => 'contEm2'
        ];
        //create where clause and parameters
        foreach ($ktc as $oldKey => $newKey) {
            // Check if the old key exists in the array
            if (array_key_exists($oldKey, $crd)) {
                //add the newkey to the where clause and the params list
                if ($crd[$oldKey] = '') {
                    $where .= ' '.$newkey.' is null';
                } else {
                    array_push($params, $crd[$oldKey]);
                    $where .= ' '.$newkey.' = ?';
                    $cnt++;
                    $types .= "s";
                }

            } else {
                $where .= ' '.$newkey.' is null';
            }
        }
       
        $sql = $sql.$where;


        break;
    case "address":
        break;
    case "conDetails":
        break;
    default:
        die("ERROR: Table Not Found");
}
$stmt = mysqli_prepare($conn, $sql);
if ($stmt) {
    // set params
    
    mysqli_stmt_bind_param($stmt, $types, ...$params);

    mysqli_stmt_execute($stmt);

    $affectedRows = mysqli_stmt_affected_rows($stmt);

    mysqli_stmt_close($stmt);

    if ($affectedRows == 0) {
        // No rows were updated
        $response = ['status' => 'fail', 'message' => 'No lines were updated.'];
    } elseif ($affectedRows > 0) {
        // At least one row was updated
        $response = ['status' => 'success', 'message' => "$affectedRows line(s) were updated."];
    } else {
        // This case might not happen with UPDATE statements but included for completeness
        $response = ['status' => 'error', 'message' => 'An unexpected error occurred.'];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    echo json_encode(['error' => 'Query failed']);
}

mysqli_close($conn);


?>