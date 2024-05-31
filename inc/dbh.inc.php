<?php


//A2 Prod

/*$serverName = "sg1-lr2.a2hosting.com";
$dBUsername = "aden_webusr";
$dBPassword = "Webusr_password";
$dBName = "aden_MOORTSP";*/

//A2 Test
/*
$serverName = "sg1-lr2.a2hosting.com";
$dBUsername = "aden_webusr";
$dBPassword = "Webusr_password";
$dBName = "aden_test_MOORTSP";
*/
//local Dev
$serverName = "localhost";
$dBUsername = "root";
$dBPassword = "";
$dBName = "aden_MOORTSP";


$conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}
