<?php


//A2 Prod

$serverName = "sg1-lr2.a2hosting.com";
$dBUsername = "aden_webusr";
$dBPassword = "Webusr_password";
$dBName = "aden_MOORTSP";

//A2 Test
/*
$serverName = "sg1-lr2.a2hosting.com";
$dBUsername = "aden_webusr";
$dBPassword = "Webusr_password";
$dBName = "aden_test_MOORTSP";

//local Dev
$serverName = "localhost";
$dBUsername = "root";
$dBPassword = "";
$dBName = "aden_MOORTSP";
*/





$conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}

//functions

function safeStrReplace($search, $replace, $subject)
{
    return str_replace($search, $replace, $subject ?? '');
}
function cleanUTF8($str)
{
    if (mb_detect_encoding($str, 'UTF-8', true) === false) {
        $str = mb_convert_encoding($str, 'UTF-8', 'ISO-8859-1');
    }
    return $str;
}
/*/**
 * Log SQL error to errtable
 *
 * @param mysqli $conn The database connection
 * @param string $sql The SQL string that caused the error
 * @return void
 *//*
function logSQLError($conn, $sql, $usr) {
    // Escape the SQL string to prevent SQL injection in the logging query
    $escaped_sql = mysqli_real_escape_string($conn, $sql);
    
    // Insert the error SQL string into errtable
    $errorSql = "INSERT INTO Errors (usersId,sqlstr,error,errtime) VALUES ('$escaped_sql')";
    
    if (!mysqli_query($conn, $errorSql)) {
        echo "Error logging SQL error: " . mysqli_error($conn);
    }
}*/
