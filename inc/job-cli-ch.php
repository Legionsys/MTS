<?php
//set vars and checks    
    if (isset($_POST['client'])) {
        $client = rawurldecode(trim($_POST['client']));
    };

    if (isset($_POST['jobno'])) {
        $jbno = trim($_POST['jobno']);
    };
    require_once 'dbh.inc.php';
    require_once 'jobfunct.inc.php';

    //check if ClientID exists
    $cliexist = cliIdexist($conn,$client);
    if ($cliexist === false) {
    //no client entry, add new entry
        
        $clientId = addcli($conn,$client);
        
        if ($clientId === 'ERROR') {
            echo "Error on insert";
            exit();        
        } else {

            if($jbno == 0){
                $jbno = newJob($conn,$clientId);
            } else {
                $jbno = updJob($conn,$clientId,$jbno);
            }
            echo $jbno;
        }


    } else if ($cliexist === 'error') {
        echo "Error on search";
        exit();        
    } else {
        //$clientId = $cliexist["clientId"];
        $clientId = $cliexist;
        if($jbno == 0){
            $jbno = newJob($conn,$clientId);
        } else {
            $jbno = updJob($conn,$clientId,$jbno);
        }
        echo $jbno;
    }


?>