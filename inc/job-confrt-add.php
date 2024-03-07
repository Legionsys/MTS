<?php
// Set vars and checks
if (isset($_POST["cnum"])) {
    $cnum = urldecode(intval($_POST["cnum"])); // Convert to integer
}
require_once 'dbh.inc.php';
if (isset($_POST['kv'])) {
    $kv = trim(urldecode($_POST['kv']));
    $data = json_decode($kv, true);
    $dtoc = json_decode($kv, true);
    // Remove key-value pairs with null values
    $data = array_filter($data, function ($value) {
        return $value !== null;
    });
    // Retrieve valid column names from the database
    $sqlColumns = "SHOW COLUMNS FROM conDets;";
    $resultColumns = mysqli_query($conn, $sqlColumns);
    if (!$resultColumns) {
        echo "ERROR: Unable to fetch column names - " . mysqli_error($conn);
        exit();
    }

    $validColumns = array();
    while ($row = mysqli_fetch_assoc($resultColumns)) {
        $validColumns[] = $row['Field'];
    }
    foreach ($data as $key => $value) {
        if (!in_array($key, $validColumns)) {
            echo "ERROR: Invalid column name - $key";
            exit();
        }
    }
}

// Build the dynamic part of the SQL query for columns
$columns = implode(", ", array_keys($data));

// Build the dynamic part of the SQL query for placeholders
$placeholders = implode(", ", array_fill(0, count($data), "?"));

// SQL query to insert data
$sqlInsert = "INSERT INTO conDets (cnID, $columns) VALUES (?, $placeholders);";

$stmtInsert = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmtInsert, $sqlInsert)) {
    echo "ERROR: Prepare failed - " . mysqli_stmt_error($stmtInsert);
    exit();
}

// Bind parameters dynamically
$types = "i" . str_repeat("s", count($data));
$bindParams = array($stmtInsert, $types, $cnum);
$bindParams = array_merge($bindParams, array_values($data));

call_user_func_array('mysqli_stmt_bind_param', $bindParams);

// Execute the query
mysqli_stmt_execute($stmtInsert);
$itID = mysqli_insert_id($conn);
if ($itID === 0) {
    echo "ERROR: Error when trying to add row";
    exit();
}

mysqli_stmt_close($stmtInsert);

// SQL query to retrieve inserted data
$sqlSelect = "SELECT * FROM conDets WHERE itID = ?;";
$stmtSelect = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmtSelect, $sqlSelect)) {
    echo "ERROR: Prepare failed - " . mysqli_stmt_error($stmtSelect);
    exit();
}

// Bind parameter
mysqli_stmt_bind_param($stmtSelect, "i", $itID);

// Execute the query
mysqli_stmt_execute($stmtSelect);

// Get result
$resultSelect = mysqli_stmt_get_result($stmtSelect);

// Check if the retrieved data matches the inserted data
$updatedData = mysqli_fetch_assoc($resultSelect);

// Return inserted data in JSON format
echo json_encode($updatedData);

mysqli_stmt_close($stmtSelect);
mysqli_close($conn);








/*
//set vars and checks    
if (isset($_POST["cnum"])) {
    $cnum = trim($_POST["cnum"]);
};
if (isset($_POST['sref'])) {
    $sref = trim($_POST['sref']);
};
if (isset($_POST['nitm'])) {
    $nitm = trim($_POST['nitm']);
};
if (isset($_POST['psn'])) {
    $psn = trim($_POST['psn']);
};
if (isset($_POST['itWgt'])) {
    $itWgt = trim($_POST['itWgt']);
};
if (isset($_POST['itLen'])) {
    $itLen = trim($_POST['itLen']);
};
if (isset($_POST['itWid'])) {
    $itWid = trim($_POST['itWid']);
};
if (isset($_POST['itHei'])) {
    $itHei = trim($_POST['itHei']);
};
if (isset($_POST['itQty'])) {
    $itQty = trim($_POST['itQty']);
};
if (isset($_POST['unNum'])) {
    $unNum = trim($_POST['unNum']);
};
if (isset($_POST['dcls'])) {
    $dcls = trim($_POST['dcls']);
};
if (isset($_POST['sRisk'])) {
    $sRisk = trim($_POST['sRisk']);
};
if (isset($_POST['pkGr'])) {
    $pkGr = trim($_POST['pkGr']);
};
if (isset($_POST['pkDes'])) {
    $pkDes = trim($_POST['pkDes']);
};


require_once 'dbh.inc.php';

//
$sql = "INSERT INTO conDets (cnID,senRef,noItem,psn,itWgt,itLen,itWid,itHei,itQty,unNum,class,sRisk,pkGr,pkDes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt,$sql)) {
    return "ERROR";
    exit();
}
mysqli_stmt_bind_param($stmt, "isisiiiiisssss", $cnum,$sref,$nitm,$psn,$itWgt,$itLen,$itWid,$itHei,$itQty,$unNum,$dcls,$sRisk,$pkGr,$pkDes);
mysqli_stmt_execute($stmt);
$resultData = mysqli_insert_id($conn);
if ($resultData == null) {
    echo "<script>alert('Error when trying to add row');</script>";
    exit();
}
mysqli_stmt_close($stmt);

//$sql = "SELECT * FROM conDets WHERE cnID = ? and frtDie is Null order by class desc;";
$sql = "SELECT * FROM conDets WHERE itID =?;";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt,$sql)) {
    return "ERROR";
    exit();
}
mysqli_stmt_bind_param($stmt, "i", $resultData);
mysqli_stmt_execute($stmt);
$resultData = mysqli_stmt_get_result($stmt);
if (mysqli_num_rows($resultData) > 0){

    while ($row = mysqli_fetch_assoc($resultData)) {
        $emparray[] = $row;
    }
    echo json_encode($emparray); 
}
mysqli_stmt_close($stmt);*/
?>