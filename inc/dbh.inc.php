<?php


/*infinitree
$serverName = "sql100.epizy.com";
$dBUsername = "epiz_29730146";
$dBPassword = "8TX5LloePRMu";
$dBName = "epiz_29730146_MOORTSP";
*/

/*xampp or local*/
$serverName = "localhost";
$dBUsername = "root";
$dBPassword = "";
$dBName = "epiz_29730146_MOORTSP";


$conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}