<!doctype html>
<html class="no-js" lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Lorem Ipsum</title>
		<meta name="description" content="1" />
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<link rel="stylesheet" href="ignite/pre_responsive.css">
		<link rel="stylesheet" href="style.css">
		<link rel="stylesheet" href="my-style.css">
	</head>
	<body>
		<div class="_container" id="body_top">

			<header class="omnibar">
				<div class="omnibar__header">
					<div class="omnibar__wrapper">
						<a href="/">
							<img src="images/logo_updated.png" class="user-assets img-logo" title="Logo" alt="Logo" />
						</a>
						<a href="log-out.php" class="custom_enroll_button scroll-link scroll">Logout</a>
					</div>
				</div>
			</header>

			<div class="_main" role="main">
				<div class="_wrapper">
					<div class="_row fixed-width herobanner-sp content-bg" >
					

						<div class="l-page-navi__placeholder">
							<div class="page-navi">
								<ul class="page-navi__listing">
									<li class="page-navi__list"><a class="page-navi__link waypoint-scroll" href="dashboard.php">Dashboard</a></li>
									<?php if($_SESSION['type'] == 'admin') { ?>
										<li class="page-navi__list"><a class="page-navi__link waypoint-scroll" href="user-list.php">User List</a></li>
										<li class="page-navi__list"><a class="page-navi__link waypoint-scroll" href="add-user.php">Add User</a></li>
									<?php } else { ?>
										<li class="page-navi__list"><a class="page-navi__link waypoint-scroll" href="user-profile.php">User Profile</a></li>
									<?php } ?>
									<li class="page-navi__list"><a class="page-navi__link waypoint-scroll" href="reset-password.php">Reset Password</a></li>
								</ul>
								<span class="page-navi__indicator"></span>
							</div>
						</div>
					
					</div>
				</div>
	 		</div>

			<div class="_colwrap _centered" >
				<div class="_col" style="width:50%" >
					<?php if($_REQUEST['status'] == 'status_changed') { ?>
						<div class="alert alert-success">Success.! User status successfully changed...</div>
					<?php } elseif($_REQUEST['status'] == 'error') { ?>
						<div class="alert alert-error">Oops.! Looks like an error occurred...</div>
					<?php } elseif($_REQUEST['status'] == 'added') { ?>
						<div class="alert alert-success">Success.! User added successfully...</div>
					<?php } elseif($_REQUEST['status'] == 'updated') { ?>
						<div class="alert alert-success">Success.! Data updated successfully...</div>
					<?php } elseif($_REQUEST['status'] == 'pwd_updated') { ?>
						<div class="alert alert-success">Success.! Password has been successfully changed...</div>
					<?php } elseif($_REQUEST['status'] == 'will_update') { ?>
						<div class="alert alert-warn">Wait.! We will update your data soon...</div>
					<?php } elseif($_REQUEST['status'] == 'pwd_not_match') { ?>
						<div class="alert alert-error">Your password not match...</div>
					<?php } elseif($_REQUEST['status'] == 'incorrect_pwd') { ?>
						<div class="alert alert-error">The password you have entered is wrong...</div>
					<?php } elseif($_REQUEST['status'] == 'unauthorised') { ?>
						<div class="alert alert-info">Unauthorised access...</div>
					<?php } ?>
					<!-- <div class="alert alert-warn">Warning! We're currently  some features may not work correctly.</div> -->
					<!-- <div class="alert alert-info">Here's some information you may find useful!</div> -->
				</div>
			</div>