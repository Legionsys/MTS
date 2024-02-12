<?php
    session_start();
    if (isset($_COOKIE['remember_user'])) {
        // Assuming you have a valid session validation mechanism in your application
        // Check if the user's session is still valid
        if (isset($_SESSION['user_id'])) {
            // If the session is valid, redirect to the dashboard
            header('Location: dashboard.php');
            exit();
        }
    }
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
    <link rel="stylesheet" href="/css/reset.css" />
    <link rel="stylesheet" href="/css/log.css" />
    <link rel="icon" href="/img/mts.ico" type="image/x-icon">

    <title>Login</title>
    <style>
    .box {
        <?php if (isset($_GET["error"])) {
            echo "height: 450px;";
            echo "top: calc(50% - (450px /1.5));";
        }

        else {
            echo "height: 400px;";
            echo "top: calc(50% - (400px /1.5));";
        }

        ?>
    }

    .response {
        <?php if (isset($_GET["error"])) {
            echo "height: 20px;";
            echo "padding: 5px;";
            echo "margin-top: 2.5rem;";
        }

        else {
            echo "height: 0px;";
            echo "padding: 0px;";
            echo "margin-top: 0rem;";
        }

        ?>
    }
    </style>
</head>

<body>
    <div class="box">
        <div id="header">
            <div id="cont-lock"><i class="material-icons lock">MTS Job and Con-Note</i></div>
            <div id="bottom-head">
                <h1 id="logintoregister">Login</h1>
            </div>
        </div>
        
            <form action="/inc/uriel.php" method="post">
                <div class="group">
                    <input class="inputMaterial" name="name" type="text" required />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Username</label>
                </div>
                <div class="group">
                    <input class="inputMaterial" name="pwd" type="password" required />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Password</label>
                </div>
                <!-- <div class="group rm">
                    <label class="switch">
                        <input type="checkbox" name="remember" value="1">
                        <span class="slider round"></span>
                    </label>
                    <label id=rml>Remember Me</label>
                </div> -->
                <div class="response">
                    <?php 
                        if (isset($_GET["error"])) {
                            if ($_GET["error"]=="emptyinput") {
                                echo "<p>Fill in all Fields!</p>";
                            }
                            else if ($_GET["error"]=="wronglogin") {
                                echo "<p>Incorrect Email/Username/Password</p>";
                            }
                            else {
                            echo "<p>Unknown Error, please try again</p>";
                            }
                        }
                    ?>          
                </div>
                <button id="buttonlogintoregister" type="submit" name="submit">Login</button>
            </form>

        <div id="footer-box">
            <p class="footer-text">Need access? <br> Please speak to the team at Moorish Transport Services</p>
        </div>
    </div>
</body>

</html>