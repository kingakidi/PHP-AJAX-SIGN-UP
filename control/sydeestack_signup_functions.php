<?php 
    include "sysudb.php";

    if (isset($_POST['u'])) {
        include_once('sysudb.php');
        $username = mysqli_escape_string($conn, strtolower($_POST['u']));
        

        // CHECK USERNAME ELIGIBILITY
        if (is_numeric($username[0])) {
            echo "Invalid username";
        
        }elseif (strlen($username) < 5 ){
            echo "Username is too short";
        }else{

            // CHECK NAME IN DATABASE 
            $query = mysqli_query($conn, "SELECT * FROM signup WHERE username='$username'");
            if (mysqli_num_rows($query) < 1) {
                echo "OK";
            }else{
                echo "username is taken";
            }

        }
    }

    // SANITAIZE DATA 
    function formData($data){
        global $conn;
        $formSanitize = mysqli_escape_string($conn, strip_tags(stripcslashes(trim(strtolower(($data))))));
        return($formSanitize);
    }
            // sanitize password 
            function passData($data){
                global $conn;
                $formSanitize = mysqli_escape_string($conn, strip_tags(stripcslashes(trim($data))));
                return($formSanitize);
            }
    // END SANITAIZE DATA 
    if (isset($_POST['username']) && isset($_POST['e'])) {

            $u = formData($_POST['username']);
            $e = formData($_POST['e']);
            $n = formData($_POST['n']);
            $p = passData($_POST['p']);
            $cp = passData($_POST['cp']);

            // USERNAME QUERY, USERNAME LENGTH, EMAIL QUERY
            $query = mysqli_query($conn, "SELECT * FROM signup WHERE username='$u' LIMIT 1");
            $eQuery = mysqli_query($conn, "SELECT * FROM signup WHERE email='$e' LIMIT 1");

            // CHECK EMPTY FIELD 
            if (empty($u) || empty($e) || empty($n) || empty($p) || empty($cp) ) {
                echo "All field is required";

            // CHECK NUMBERIC IN USERNAME START 
            }elseif (is_numeric($u[0])) {
                echo 'Invalid Username';

            // CHECK USERNAME AVAILABILITY 
            }elseif(strlen($u) < 5){
                echo "Username is too short";
            } elseif (mysqli_num_rows($query) > 0) {
                echo "Username is taken";
                // CHECK VALID EMAIL ADDRESS 
            }elseif (!filter_var($e, FILTER_VALIDATE_EMAIL)) {
                echo "Invalid Email";
            } elseif (mysqli_num_rows($eQuery) > 0) {
                    echo "Email is in use";
            // PASSWOR MATCH 
            }elseif (strlen($n) !== 11) {
                echo "Invalid Phone Number";
            } elseif ($p !== $cp) {
                echo "Password mismatch";
            // PASSWORD LENGHT 
            }elseif (strlen($p) < 6) {
                echo "Minimum of 6 character";
            } else{

                // HASH PASSWORD 
            $p = password_hash($p, PASSWORD_DEFAULT);
                // INSERT IT INTO DATABASE 
            $sql = "INSERT INTO `signup`(`userid`, `username`, `email`, `phone`, `password`, `date`, `verification_status`, `verification_code`) VALUES (NULL,'$u', '$e','$n','$p', now(),'1','2w34e4')";
            $query = mysqli_query($conn, $sql);
            
            if ($query) {
                echo "success";
            }else{
                die("UNABLE TO ADD RECORD" . mysqli_error($conn));
            }
        
        }
    }



   
?>