<?php

if (isset($_POST["submit"])) {
    $username = htmlspecialchars($_POST["name"]);
    $pwd = $_POST["pwd"];
    $rm = null;
    if(isset($_POST["remember"])){
        $rm = $_POST["remember"];
    }
    require_once 'dbh.inc.php';
    require_once 'functions.inc.php';

   
    if (emptyInputLogin($username, $pwd) !== false) {
        header("location: ../index.php?error=emptyinput");
        exit();

    } 
        loginUser($conn,$username,$pwd,$rm);
    }   else {

        header("location: ../index.php?error=nosubmit");
        exit();
    }