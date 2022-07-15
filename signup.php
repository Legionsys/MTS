<?php 
    include_once 'header.php'
?>



<section class="signup-form">
    <h2>Sign Up</h2>
    <div class="signup-form-form">
        <form action="includes/signup.inc.php" method="post">
            <input type="text" name="name" placeholder="Name">
            <input type="text" name="email" placeholder="Email">
            <input type="text" name="uid" placeholder="Username">
            <input type="password" name="pwd" placeholder="Password">
            <input type="password" name="pwd2" placeholder="Repeat Password">
            <button type="submit" name="submit">Sign Up</button>
        </form>
    </div>
    <?php
    if (isset($_GET["error"])) {
        if ($_GET["error"] == "emptyinput") {
            echo "<p>Fill in all Fields!</p>";
        } else if ($_GET["error"] == "invaliduid") {
            echo "<p>Please choose a valid Username</p>";
        } else if ($_GET["error"] == "invalidemail")  {
            echo "<p>Please enter a valid email</p>";
        } else if ($_GET["error"] == "pwdmismatch")  {
            echo "<p>The Passwords don't match</p>";
        } else if ($_GET["error"] == "uidtaken")  {
            echo "<p>Username already exists</p>";
        } else if ($_GET["error"] == "stmtfailed")  {
            echo "<p>Something went wrong, try again</p>";
        } else if ($_GET["error"] == "none")  {
            echo "<p>You have Signed up</p>";
        }
    } else {
        echo "<p> </p>";
    }
?>
</section>


<?php 
    include_once 'footer.php'
?>