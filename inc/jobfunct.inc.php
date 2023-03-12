<?php
function cliIdexist($conn,$client)  {
    $sql = "SELECT clientId FROM clientList WHERE clientName = ?;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return 'error';
        exit();
    }
    
    mysqli_stmt_bind_param($stmt, "s", $client);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);
    if ($row = mysqli_fetch_assoc($resultData)) {
        return $row['clientId'];        
    } else {
        $result = false;
        return $result;
    }
    mysqli_stmt_close($stmt);    
}


function addcli($conn,$client) {
    $sql = "INSERT INTO clientList (clientName) VALUES (?);";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "ERROR";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "s", $client);
    mysqli_stmt_execute($stmt);
    //return 'instered';
    $resultData = mysqli_insert_id($conn);

    if ($resultData != null ) {
        return $resultData;
    } else {
        return "ERROR";
        exit();
    }
    mysqli_stmt_close($stmt);
}

function newJob($conn,$clientId){
    $sql = "INSERT INTO jobList (clientId) VALUES (?);";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "ERROR newJob prepare";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "s", $clientId);
    mysqli_stmt_execute($stmt);
    //return 'instered';
    $resultData = mysqli_insert_id($conn);

    if ($resultData != null ) {
        return $resultData;
    } else {
        return "ERROR newJob exe";
        exit();
    }
    mysqli_stmt_close($stmt);
}
function updJob($conn,$clientId,$jbno){
    $sql = "UPDATE jobList set clientId = ? WHERE jobID = ?;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "ERROR updJob prepare";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "ss", $clientId,$jbno);
    mysqli_stmt_execute($stmt);
    //return 'instered';
    $resultData = mysqli_affected_rows($conn);

    if ($resultData != -1 ) {
        return $jbno;
    } else {
        return "Error affected";
        exit();
    }
    mysqli_stmt_close($stmt);
}








?>