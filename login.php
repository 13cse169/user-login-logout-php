<?php
	if($_SERVER['REQUEST_METHOD'] == 'POST'){

		$conn = mysqli_connect("localhost", "root", "Mass4Pass", "my_database");
		if (!$conn) {
		  die("Connection failed: " . mysqli_connect_error());
		}
		
		if(isset($_POST['btn_submit_login'])){
			extract($_POST);
			$sql    = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
			$result = $conn->query($sql);

			if($result->num_rows > 0) {
				$row = $result->fetch_object();
				if($row->status == 'A'){
					session_start();
					
					$_SESSION['userid'] = $row->id;
					$_SESSION['f_name'] = $row->f_name;
					$_SESSION['l_name'] = $row->l_name;
					$_SESSION['type']   = $row->user_type;
					
					//echo'<pre>';print_r($_SESSION);
					header('location:index.php');
				} else {
					header('location:login.php?status=not_allowed');	
				}
			} else {
				header('location:login.php?status=login_failed');
			}
		} elseif(isset($_POST['btn_submit_pwd'])) {
			//echo'<pre>';print_r($_POST);exit();
			extract($_POST);
			$sql    = "SELECT * FROM users WHERE username = '$username' AND dob = '$dob'";
			$result = $conn->query($sql);

			if($result->num_rows > 0) {
				$row = $result->fetch_object();
				header('location:login.php?path=forgot_pwd&rw='.base64_encode($row->password));	

			} else {
				header('location:login.php?path=forgot_pwd&status=not_found');
			}
		}
	}
?>
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
					</div>
				</div>
			</header>

			<div class="_main" role="main">
				<div class="_wrapper">
					<div class="_row fixed-width herobanner-sp content-bg" >
						<div class="_colwrap _centered" >
							<div class="_col" style="width:100%" >
								<hr  style="height:50px;" />
								<div class="_row fixed-width " >
									<div class="_colwrap _centered" >
										<div class="_col" style="width:52%" >
											<div  class="sec-banner-wrapper banner-rounded">
												<div class="_row fixed-width aside-left col-nospace onecolumn-device" >
													<div class="_colwrap _quarters " >
														<hr  style="height:5px;" />
														<div class="_col _aside " >
															<img src="images/badge_3.png" class="user-assets compose center desktop_tablet bigger" alt="" id="timer_badge" />
															<hr  class="desktop" style="height:10px;" />
														</div>
														
														<div class="_col _article _nomarginbottom" >
															<hr  class="desktop" style="height:5px;" />
															<p style="text-align:center;" class="_nomargin txt-grey">Lorem Ipsum is simply dummy text</p>
															
															<div class="countdowntimer strip center timerbanner txt-grey" id="pauseResume"></div>
															<div class="player-container player-pauseResume center timerbanner txt-grey" style="display:none;width:320%;height:240px;">
																<div id="player-pauseResume" class="center timerbanner txt-grey">
																</div>
															</div>
															<div id="pauseResume" class="center timerbanner txt-grey" style="">
																<div id="streamer_redirect1540351224"></div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="_colwrap _centered" >
					<div class="_col" style="width:50%" >
						<?php if($_REQUEST['status'] == 'login_failed') { ?>
							<div class="alert alert-error">Login failed. Check your credentials and try again...</div>
						<?php } elseif($_REQUEST['status'] == 'not_allowed') { ?>
							<div class="alert alert-error">Login failed. You are not allow to login...</div>
						<?php } elseif($_REQUEST['status'] == 'not_found') { ?>
							<div class="alert alert-error">Sorry! user not found...</div>
						<?php } ?>
					</div>
				</div>
				<?php if($_REQUEST['path'] == 'forgot_pwd') { ?>
				<div id="group-6" class="l-page-navi__section js-waypoint custom_im_row_holder">
					<div  class="page-section about-introduction custom_im_row_holder_inner">
						<div class="_row fixed-width custom_im_row" >
							<div class="_colwrap _centered custom_im_row_colwrap" >
								<div class="_col custom_im_row_col" style="width:50%" >
									<h3 style="text-align:center;">Get your Password</h3>
									
									<div  class="testimonial-masonry-card">
										<div  class="description">
											<div class="wrapper_holder" id="wrapper_holder_documentlist">
												<div class="wrapper" id="wrapper_documentlist">
													<div style="clear:both"></div>
													<div class="form_documentlist_holder">
														<?php if(isset($_REQUEST['rw'])) { 
															echo '
																<strong>Password : </strong>
																<small>'.base64_decode($_REQUEST['rw']).'</small>
																<div style="clear:both;"></div>
																<a href="login.php">Login</a>
															';
														} else { ?>
														<form action="login.php" method="post" id="" name="">
															<div class="form_section_documentlist" id="form_section_documentlist_0">
																<label>Username</label>
																<input type="text" name="username" id="" placeholder="Username" class="contact-txtbox" value="" required="true">
															</div>
															<div style="clear:both"></div>
															<div class="form_section_documentlist" id="form_section_documentlist_4">
																<label>Date of Birth</label>
																<input type="date" name="dob" placeholder="Date of Birth" class="contact-txtbox" required="">
															</div>
															<div style="clear:both; height: 20px;"></div>
															<div class="form_section_documentlist form_section_documentlist_submit" id="form_section_documentlist_4">
																<input type="submit" class="btn_submit_documentlist" name="btn_submit_pwd" value="Login">
															</div>
															<div style="clear:both;"></div>
															<a href="login.php">Login</a>
														</form>
														<?php } ?>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<?php } else { ?>
				<div id="group-6" class="l-page-navi__section js-waypoint custom_im_row_holder">
					<div  class="page-section about-introduction custom_im_row_holder_inner">
						<div class="_row fixed-width custom_im_row" >
							<div class="_colwrap _centered custom_im_row_colwrap" >
								<div class="_col custom_im_row_col" style="width:50%" >
									<h3 style="text-align:center;">LOGIN</h3>
									
									<div  class="testimonial-masonry-card">
										<div  class="description">
											<div class="wrapper_holder" id="wrapper_holder_documentlist">
												<div class="wrapper" id="wrapper_documentlist">
													<div style="clear:both"></div>
													<div class="form_documentlist_holder">
														<form action="login.php" method="post" id="" name="">
															<div class="form_section_documentlist" id="form_section_documentlist_0">
																<input type="text" name="username" id="" placeholder="Username" class="contact-txtbox" value="" required="true">
															</div>
															<div style="clear:both"></div>
															<div class="form_section_documentlist" id="form_section_documentlist_2">
																<input type="password" name="password" id="" placeholder="Password" class="contact-txtbox" value="" required="true">
															</div>
															<div style="clear:both"></div>
															<div class="form_section_documentlist form_section_documentlist_submit" id="form_section_documentlist_4">
																<input type="submit" class="btn_submit_documentlist" name="btn_submit_login" value="Login">
															</div>
															<div style="clear:both"></div>
															<a href="?path=forgot_pwd">forgot password?</a>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<?php } ?>
			</div>
		</div>

		<footer class="fixed-width footer" style="position:relative">
			<div class="_colwrap center gdpr">
				<p>Copyright &copy; Lorem Ipsum. Lorem Ipsum.</p>
			</div>
			<a href="#body_top" class="custom_gototop_button scroll-link scroll">&#8593;</a>
		</footer>
	</body>
  
  	<script src="ignite/js/libs/jquery-1.7.1.min.js" type="text/javascript"></script>
	<script src="ignite/js/script.js" async></script>
	<script src="js/script.js" async></script>

	<!-- Class inject -->
	<script async>
		div = {
			show: function(elem) {
				document.getElementById(elem).style.visibility = 'visible';
			},
			hide: function(elem) {
				document.getElementById(elem).style.visibility = 'hidden';
			}
		}
		var masterclassPaths = ['reviews','online-training', 'products'];
		var $body = $('body');
		for (var i = 0; i < masterclassPaths.length; i++) {
			if(window.location.href.indexOf(masterclassPaths[i]) > -1) {
				$body.addClass('l-masterclass l-academy');
			} else {
				$body.addClass('l-academy');
			}
		}
	</script>
	<!-- end scripts-->
	<script type="text/javascript">
		$(document).ready(function() {
			$('.alert').click(function() {
				$(this).fadeOut();
			});
			
			setTimeout(function() {
				$('.alert').fadeOut();
			}, 3000);
		});
	</script>
</html>