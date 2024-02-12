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
    include FS_ROOT.'/inc/dbh.inc.php';
    //include '/inc/dbh.inc.php';
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
        //echo '<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>';
        echo '<link rel="stylesheet" href="/css/jdet.css?ver=0224-2">';
        echo '<link rel="stylesheet" href="/css/cnote.css?ver=1">';
    } elseif ($pName == "jsumm") {
        echo '<link rel="stylesheet" href="/css/jsumm.css?ver=0224">';    
    } elseif ($pName == "uman") {
        echo '<link rel="stylesheet" href="/css/uman.css?ver=0224">';
    } else {
        echo '<link rel="stylesheet" href="/css/style.css">';
    }
    
?>
</head>

<body>
    <nav>
        <input type="checkbox" id="nav-check">
        <div class="nav-header">
            <div class="nav-title">
                Job Management Sheets
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
            <!-- <a href="reports.php">Reports</a> -->
            <a href="uman.php">User Management</a>
            <a href="/inc/logout.inc.php">Log out</a>


        </div>
    </nav>

    <div class="wrapper">