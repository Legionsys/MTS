<?php


/*A2
$serverName = "sg1-lr2.a2hosting.com";
$dBUsername = "aden_webusr";
$dBPassword = "Webusr_password";
$dBName = "aden_MOORTSP";
*/

/*xampp or local*/
$serverName = "localhost";
$dBUsername = "root";
$dBPassword = "Pass1v3$";
$dBName = "aden_MOORTSP";


$conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}