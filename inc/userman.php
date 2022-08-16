<?php
//set vars and checks    
if (isset($_POST['funct'])) {
    $funct = trim($_POST['funct']);
};
if (isset($_POST['idn'])) {
    $id = trim($_POST['idn']);
};
if (isset($_POST['ind'])) {
    $fld = trim($_POST['ind']);
};
if (isset($_POST['val'])) {
    $val = trim($_POST['val']);
};

//linked files
require_once 'dbh.inc.php';

//check what function is required
if ($funct == 'status') {
    //check that ID is not 0
    if ($id != 0) {
        if ($val == 0) {
            $sql = "UPDATE users set active = NULL where usersid=?;";
            
            $stmt = mysqli_stmt_init($conn);

            if (!mysqli_stmt_prepare($stmt,$sql)) {
                return "ERROR";
                exit();
            }
            mysqli_stmt_bind_param($stmt, "i", $id);
        } else {
            $sql = "UPDATE users set active = ? where usersid = ?;";
            
            $stmt = mysqli_stmt_init($conn);

            if (!mysqli_stmt_prepare($stmt,$sql)) {
                return "ERROR";
                exit();
            }
            mysqli_stmt_bind_param($stmt, "ii", $val, $id);
        }
        mysqli_stmt_execute($stmt);    
        $resultData = mysqli_insert_id($conn);
        echo $resultData;
        mysqli_stmt_close($stmt);
    }
} else if ($funct == 'pwdres') {
    if ($id != 0) {
        $sql = "UPDATE users set usersPwd = ? where usersid = ?;";
            
        $stmt = mysqli_stmt_init($conn);

        if (!mysqli_stmt_prepare($stmt,$sql)) {
            return "ERROR";
            exit();
        }
        $pwd = 'Moorish'.rand(10,99);
        $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

        mysqli_stmt_bind_param($stmt, "si", $hashedPwd, $id);                
        if (mysqli_stmt_execute($stmt)) {
            echo $pwd;
            mysqli_stmt_close($stmt);
        } else {
            echo 'Error';
        };    
        
        
    }
}

?>