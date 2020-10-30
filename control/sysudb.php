<?php 
$host = 'localhost';
$username = 'root';
$password = '';
$db = 'sydeestack';

$conn = mysqli_connect($host, $username, $password, $db);
if(!$conn){
    echo "UNABLE TO CONNECT";
}

?>