<?php
//set vars and checks  
if (isset($_POST['jobno'])) {
    $jbno = trim($_POST['jobno']);
};  
if (isset($_POST["typ"])) {
    $styp = trim($_POST["typ"]);
};
if (isset($_POST["nam"])) {
    $snam = trim($_POST["nam"]);
};
if (isset($_POST["des"])) {
    $sdes = trim($_POST["des"]);
};
if (isset($_POST["ire"])) {
    $sire = trim($_POST["ire"]);
};
if (isset($_POST["not"])) {
    $snot = trim($_POST["not"]);
};
if (isset($_POST["est"])) {
    $sest = trim($_POST["est"]);
};
require_once 'dbh.inc.php';

$sql = "INSERT INTO jobSup (jobID,jsType,jsName,jsDesc,jsInvRec,jsNotes,jsEst) VALUES (?,nullif(?,''),nullif(?,''),nullif(?,''),nullif(?,''),nullif(?,''),nullif(?,''));";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt,$sql)) {
    return "ERROR";
    exit();
}
mysqli_stmt_bind_param($stmt, "sssssss", $jbno,$styp,$snam,$sdes,$sire,$snot,$sest);
mysqli_stmt_execute($stmt);

//return 'instered';
$resultData = mysqli_insert_id($conn);

if ($sest != null) {
    $sest = number_format($sest,2);
}

if ($resultData != null ) {
    $sql = "Select * FROM jobSup where jsID = $resultData;";
    mysqli_stmt_close($stmt);
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt,$sql)) {
        echo "<script>console.log('Error with return');</script>";
        exit();
    }
    mysqli_stmt_execute($stmt);

    $resultDta = mysqli_stmt_get_result($stmt);
    if (mysqli_num_rows($resultDta) > 0){
        while ($row = mysqli_fetch_assoc($resultDta)) {
            $emparray[] = $row;
        }
        echo json_encode($emparray);
     } else {
        $result = false;
        echo "<script>console.log('Error or Zero rows for Job Supplier index ".$resultData."');</script>";     
    }
    /*
    echo '<div class="supln" data-id="'.$resultData.'">';
    echo '<div contenteditable="true" data-col="jsName" class="supSu lsup">'.$snam.'</div>';
    echo '<div contenteditable="true" data-col="jsType" class="supTy lsup">'.$styp.'</div>';
    echo '<div contenteditable="true" data-col="jsDesc" class="supDe lsup">'.$sdes.'</div>';
    echo '<div contenteditable="true" data-col="jsEst" class="supEc lsup">'.$sest.'</div>';
    echo '<div contenteditable="true" data-col="jsNotes" class="supNo lsup">'.$snot.'</div>';
    echo '<div contenteditable="true" data-col="jsInvRec" class="supIr lsup">'.$sire.'</div>';
    echo '<div class="suprm td" data-id="'.$resultData.'">Remove Supplier</div></div>';*/
} else {
    echo "<script>console.log('Error with adding');</script>";
    exit();
}
mysqli_stmt_close($stmt);



?>