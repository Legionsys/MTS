<?php
//set vars and checks    
if (isset($_POST['jobno'])) {
    $jbno = trim($_POST['jobno']);
};

require_once 'dbh.inc.php';

//check if jobnumber is not 0, and is a number

//insert new line into conNotes table and get the ID
$sql = "INSERT INTO conNotes (jobID) VALUES (?);";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt,$sql)) {

    return "ERROR";
    exit();
}
mysqli_stmt_bind_param($stmt, "s", $jbno);
mysqli_stmt_execute($stmt);
//return 'instered';
$resultData = mysqli_insert_id($conn);
mysqli_stmt_close($stmt);
if ($resultData != null ) {
    $num = "E".sprintf('%05d', $resultData);
    echo "<script>console.log('ID ".$resultData."');</script>";
    echo "<script>console.log('Num ".$num."');</script>";
    $sql = "UPDATE conNotes set cnNum=? WHERE cnID=?;";
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt,$sql)) {
        return "ERROR";
        exit();
    }
    mysqli_stmt_bind_param($stmt, "si", $num, $resultData);
    
    mysqli_stmt_execute($stmt);    
    mysqli_stmt_close($stmt);

    echo '<div data-id="'.$resultData.'" class="ccnt_card"><div class="cnnum">'.$num.'</div><div class="cnscomp">Blank</div><div class="cnrcomp">Blank</div>';
    echo '<div class="cnitm">0 itms</div><div class="cnwgt">0 kg</div><div class="cnm3">0 m3</div></div>';   
    
    //return $resultData;
} else {
    return "ERROR";
    exit();
}
//mysqli_stmt_close($stmt);




?>