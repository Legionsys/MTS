<?php
session_start();
if (isset($_SESSION["useruid"])) {
} else {
    header("location: /index.php");
    exit();
}
if (!defined("FS_ROOT")) {
    define("FS_ROOT", realpath(dirname(__FILE__)));
}
include FS_ROOT . '/inc/dbh.inc.php';
//include '/inc/dbh.inc.php';

function fileDetails($fnam)
{
    $cssFilePath = $_SERVER['DOCUMENT_ROOT'] . $fnam;

    // Check if the file exists
    if (file_exists($cssFilePath)) {
        // Get the file's last modification timestamp
        $lastModifiedTimestamp = filemtime($cssFilePath);

        // Format the timestamp into 'mm-yy' or any format you prefer
        $formattedDate = date("dm", $lastModifiedTimestamp);
        $formattedTime = date("His", $lastModifiedTimestamp);
        $fullDateTime = date("YmdHis", $lastModifiedTimestamp);
        $dayHour = date("Hi", $lastModifiedTimestamp);
        $filetogo = $fnam . '?ver=' . $formattedDate . '-' . $dayHour;
    } else {
        $filetogo = $fnam;
    }
    return $filetogo;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MTS Job & Connote</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/nav.css">
    <link rel="icon" href="/img/mts.ico" type="image/x-icon">


    <?php
    if ($pName == "jdet") {
        echo '<link rel="stylesheet" href="' . fileDetails("/css/jdet.css") . '">';
        echo '<link rel="stylesheet" href="' . fileDetails("/css/cnote.css") . '">';
    } elseif ($pName == "jsumm") {
        echo '<link rel="stylesheet" href="' . fileDetails("/css/jsumm.css") . '">';
    } elseif ($pName == "uman") {
        echo '<link rel="stylesheet" href="' . fileDetails("/css/uman.css") . '">';
    } elseif ($pName == "jboard") {
        echo '<link rel="stylesheet" href="' . fileDetails("/css/jboard.css") . '">';
    } else {
        echo '<link rel="stylesheet" href="' . fileDetails("/css/style.css") . '">';
    }

    ?>
<script>
    // Heartbeat to keep session alive
    document.addEventListener('DOMContentLoaded', function() {
        // Send heartbeat every 10 minutes (600,000 ms)
        setInterval(function() {
            fetch('/inc/keepalive.php', {
                method: 'GET',
                credentials: 'same-origin' // Include cookies for session
            })
            .then(response => {
                if (!response.ok) {
                    // Get status and try to extract response text for more details
                    const errorMessage = `Keepalive failed with status: ${response.status} (${response.statusText})`;
                    // Attempt to parse response text for additional error details
                    return response.text().then(text => {
                        console.error(errorMessage, text);
                        alert(
                            'Your server session has unexpectedly ended. Please send this to the site admin:\n\n' +
                            `${errorMessage}\nResponse: ${text || 'No additional details available'}`
                        );
                    });
                }
                return response; // Continue if response is OK
            })
            .catch(error => {
                // Handle network or fetch errors (e.g., no connection)
                const errorMessage = `Keepalive error: ${error.message}`;
                console.error(errorMessage);
                alert(
                    'Your server session has unexpectedly ended. Please send this to the site admin:\n\n' +
                    `${errorMessage}\nDetails: Network error or server unreachable`
                );
            });
        }, 600000); // 10 minutes
    });
</script>
</head>

<body>
    <nav>
        <input type="checkbox" id="nav-check">
        <div id="nav-head" class="nav-header">
            <div id="nav-title" class="nav-title">
                <?php
                switch ($pName) {
                    case "jdet":
                        echo 'Job Details';
                        break;
                    case "jsumm":
                        echo 'Job Summary';
                        break;
                    case "uman":
                        echo 'User Management';
                        break;
                    case "jboard":
                        echo 'Job Board';
                        break;                    
                    default:
                        echo 'Transport System';
                        break;
                }
                ?>
            </div>
        </div>
        <div class="nav-btn">
            <label for="nav-check">
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>

        <div class="nav-links">
            <a href="jsumm.php?wild=null&cli=null&inv=All&job=Act">Job Summary</a>
            <a href="jobboard.php">Job Board</a>
            <!-- <a href="reports.php">Reports</a> -->
            <a href="uman.php">User Management</a>
            <a href="/inc/logout.inc.php">Log out</a>


        </div>
    </nav>

    <div class="wrapper">