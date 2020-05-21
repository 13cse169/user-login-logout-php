<?php
	session_start();
	//echo'<pre>';print_r($_SESSION);exit();
	if(isset($_SESSION['userid']) && !empty($_SESSION['userid'])){
		header('location:dashboard.php?status=success');
	} else {
		header('location:login.php');
	}
?>