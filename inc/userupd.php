<?php
$builtJSON = file_get_contents('php://input');

if ($builtJSON === FALSE) {
    echo 'Error JSON Build Fail';
}

$arr = json_decode($builtJSON, true);

//Database connection
require_once 'dbh.inc.php';


//set array and variables
//$add_arr = explode("|`|",$stxt);
$now = date('Y-m-d H:i:s');


//update all the tables
//Connotes - Shipper
    for ($i = 0; $i < 5; $i++) {
        if ($i == 0) {    
            $sql = "UPDATE conNotes set smrk = NOW()";// where snam=? and sadd1=? and sadd2=? and sadd3=? and sst=? and spc=? and sCtc=? and sPh=?;";
            $tbl = "conNotes_S";
            $mkr = "s";
        } elseif ($i == 1) {
            $sql = "UPDATE conNotes set rmrk = NOW()";// where rnam=? and radd1=? and radd2=? and radd3=? and rst=? and rpc=? and rCtc=? and rPh=?;";
            $mkr = "r";
            $tbl = "conNotes_R";
        } elseif ($i == 2) {
            $sql = "UPDATE conNotes set omrk = NOW()";// where onam=? and oadd1=? and oadd2=? and oadd3=? and ost=? and opc=? and oCtc=? and oPh=?;";
            $tbl = "conNotes_O";
            $mkr = "o";
        } elseif ($i == 3) {
            $sql = "UPDATE jobList set cmrk = NOW()";// where cnam=? and cadd1=? and cadd2=? and cadd3=? and cst=? and cpc=? and cCtc=? and cPh=?;";
            $tbl = "jobList_C";
            $mkr = "c";
        } elseif ($i == 4) {
            $sql = "UPDATE jobList set dmrk = NOW()";// where dnam=? and dadd1=? and dadd2=? and dadd3=? and dst=? and dpc=? and dCtc=? and dPh=?;";
            $tbl = "jobList_D";
            $mkr = "d";
        } else {
            exit();
        }
        $where = ' where ';
        foreach ($add_arr as $key => $val) {
            
            if ($add_arr[$key] === '') {
                $where = $where.$mkr.$key.' is Null and ';
                //$add_arr[$key] = NULL;
                
            } else {
                $where = $where.$mkr.$key.'="'.str_replace('"','""',$val).'" and ';
            }
        }
        $where = substr($where, 0, strlen($where)-5);
        $sql = $sql.$where;
        //echo '--------'.$sql.'--------';
        $stmt = mysqli_stmt_init($conn);

        if (!mysqli_stmt_prepare($stmt,$sql)) {
            return "Error prepare failure";
            exit();
        }

        //mysqli_stmt_bind_param($stmt, "ssssssss", $nam, $add1, $add2, $add3, $st, $pc, $Ctc, $Ph);
        
        //echo $stmt;
        mysqli_stmt_execute($stmt);    
        if(!$stmt->execute())
        {
            // There was an error
            echo 'Error : '.$stmt->error;
        }
        //$resultData = mysqli_insert_id($conn);
        //echo $resultData;
        mysqli_stmt_close($stmt);

    }

?>
