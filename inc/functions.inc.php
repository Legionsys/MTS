<?php

function emptyInputSignup($name, $email, $uid, $pwd, $pwd2) {
    $result = true;
    if (empty($name) || empty($email) || empty($uid) || empty($pwd) || empty($pwd2)) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function invalidUid($uid) {
    $result=true;
    if (!preg_match("/^[a-zA-Z0-9]*$/",$uid)) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}


function invalidEmail($email) {
    $result=true;
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}


function pwdMatch($pwd, $pwd2) {
    $result=true;
    if ($pwd !== $pwd2) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function uidExists($conn,$uid,$email) {
    $sql = "SELECT * FROM users WHERE usersUid = ? OR usersEmail = ?;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        header("location: ../signup.php?error=uidtaken");
        exit();
    }
    
    mysqli_stmt_bind_param($stmt, "ss", $uid, $email);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);
    if ($row = mysqli_fetch_assoc($resultData)) {
        return $row;        
    } else {
        $result = false;
        return $result;
    }
    mysqli_stmt_close($stmt);
}

function createUser($conn, $name, $email, $uid, $pwd) {
    $sql = "INSERT INTO users (usersName,usersEmail,usersUid,usersPwd) VALUES (?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        header("location: ../signup.php?error=uidtaken");
        exit();
    }

    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
    
    mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $uid, $hashedPwd);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    header("location: ../signup.php?error=none");
    exit();
}
function emptyInputlogin($username, $pwd) {
    $result = true;
    if (empty($username) || empty($pwd)) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function loginUser($conn,$username,$pwd) {
    $uidExists = uidExists($conn,$username,$username);

    if ($uidExists === false) {
        header("location: ../index.php?error=wronglogin");
        exit();        
    }

    $pwdHashed = $uidExists["usersPwd"];
    $checkPwd = password_verify($pwd, $pwdHashed);

    if($checkPwd === false) {
        header("location: ../index.php?error=wronglogin");
        exit();          
    } else if ($checkPwd === true) {
        session_start();
        $_SESSION["userid"] = $uidExists["usersId"];
        $_SESSION["useruid"] = $uidExists["usersUid"];
        header("location: ../jsumm.php");
        exit();         
    }
}