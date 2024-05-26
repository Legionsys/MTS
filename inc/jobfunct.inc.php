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
        $jid = $resultData;
        $usrid = $_SESSION["useruid"];
        $resp = jobTag($conn, $jid, $usrid);
        if ($resp == 'Success') {
            return $jid;
            mysqli_stmt_close($stmt);
            exit();
        } else {
            return $resp."||".$jid;
            exit();
        }
        
        
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
function jobTag($conn, $job, $mrkr) {
    if ($job != "" && $mrkr != "") {
        // Check if tag exists
        $sql = "SELECT * FROM jobTags WHERE job = ? AND tag = ?";
        $stmt = mysqli_stmt_init($conn);
        
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            echo "Error: Prepare failure";
            exit();
        }
        
        mysqli_stmt_bind_param($stmt, "is", $job, $mrkr);
        mysqli_stmt_execute($stmt);
        $resultData = mysqli_stmt_get_result($stmt);
        
        if (mysqli_num_rows($resultData) > 0) {
            // If yes, update remove tag information
            $sql = "UPDATE jobTags SET removed = NOW(), removedby = ? WHERE job = ? AND tag = ?";
            mysqli_stmt_prepare($stmt, $sql);
            mysqli_stmt_bind_param($stmt, "sis", $_SESSION["useruid"], $job, $mrkr);
        } else {
            // If no, insert tag information
            $sql = "INSERT INTO jobTags (job, tag, added, addby) VALUES (?, ?, NOW(), ?)";
            mysqli_stmt_prepare($stmt, $sql);
            mysqli_stmt_bind_param($stmt, "iss", $job, $mrkr, $_SESSION["useruid"]);
        }
        

        mysqli_stmt_execute($stmt);
        
        // Confirm back that the tags are updated
        return "Success";
        
        mysqli_stmt_close($stmt);
    } else {
        return "Error: Missing job or mrkr - job: $job, mrkr: $mrkr - user: " . $_SESSION["useruid"];
    }
}

/*
function jobTag($conn, $job, $mrkr) {
    if ($job != "" && $mrkr != "") {
        // Check if tag exists
        $sql = "SELECT * FROM jobTags WHERE job = $job AND tag = $mrkr";
        $resultData = mysqli_query($conn, $sql);
        
        if (mysqli_num_rows($resultData) > 0) {
            // If yes, update remove tag information
            $sql = "UPDATE jobTags SET removed = NOW(), removedby = '" . $_SESSION["useruid"] . "' WHERE job = $job AND tag = $mrkr";
        } else {
            // If no, insert tag information
            $sql = "INSERT INTO jobTags (job, tag, added, addby) VALUES ($job, $mrkr, NOW(), '" . $_SESSION["useruid"] . "')";
        }
        
        // Execute query
        $stmt = mysqli_stmt_init($conn);

        if (!mysqli_stmt_prepare($stmt, $sql)) {
            echo "Error: Prepare failure";
            exit();
        }
        
        mysqli_stmt_execute($stmt);    
        if (!$stmt->execute()) {
            // There was an error
            echo 'Error : ' . $stmt->error;
        } else {
            // Confirm back that the tags are updated
            echo "Success";
        }
        
        mysqli_stmt_close($stmt);
    } else {
        echo "Error: Missing job or mrkr - job: $job, mrkr: $mrkr - user: " . $_SESSION["useruid"];
    }
}*/







?>