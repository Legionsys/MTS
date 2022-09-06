<?php
$builtJSON = file_get_contents('php://input');

if ($builtJSON === FALSE) {
    echo 'Error JSON Build Fail';
}

$arr = json_decode($builtJSON, true);

//Database connection
require_once 'dbh.inc.php';
//require_once 'functions.inc.php';

if ($arr['id'] == 0) {
    //Update Userdetails
    $pwd = 'Moorish'.rand(10,99);

    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (usersName,usersEmail,usersUid,usersPwd) VALUES (?, ?, ?, ?);";

    
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "Error prepare failure";
        exit();
    }
    

    mysqli_stmt_bind_param($stmt, "ssss", $arr['name'], $arr['email'], $arr['scr'], $hashedPwd);
    mysqli_stmt_execute($stmt);
    $resultData = mysqli_insert_id($conn);
    if ($resultData != null ) {
        echo "Success1-".$resultData."-".$pwd;

    } else {
        echo "Error User not created".$stmt->error;;
        exit();
    }
    //mysqli_stmt_close($stmt);
    //echo "Error - Stuffed up";
    //echo "Success2 -".$resultData."-".$pwd;

} else {
    echo "updating string";
    //Update Userdetails
    $sql = "UPDATE users set usersName = ?, usersEmail = ?, usersUid = ? where usersId = ?;";

    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "Error prepare failure";
        exit();
    }

    mysqli_stmt_bind_param($stmt, "sssi", $arr['name'], $arr['email'], $arr['scr'], $arr['id']);

    //echo $stmt;
    mysqli_stmt_execute($stmt);    
    if(!$stmt->execute())
    {
        // There was an error
        echo 'Error : '.$stmt->error;
    }
}
//$resultData = mysqli_insert_id($conn);
//echo $resultData;
mysqli_stmt_close($stmt);

?>
