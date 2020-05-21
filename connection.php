<?php
	$conn = mysqli_connect("localhost", "root", "Mass4Pass", "my_database");
	if (!$conn) {
	  die("Connection failed: " . mysqli_connect_error());
	}
	session_start();
	if(!isset($_SESSION['userid']) && empty($_SESSION['userid'])){
		header('location:login.php');
	}
?>