<?php
	include('connection.php');

	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		if($_POST['newPassword'] == $_POST['rePassword']){
			
			$id  = $_SESSION['userid'];
			$sql = "SELECT * FROM users WHERE id = '$id'";
			$row = $conn->query($sql)->fetch_object();

			if($row->password == $_POST['oldPassword']){
				$newPassword = $_POST['newPassword'];
				$sql  = "UPDATE users SET password = '$newPassword' WHERE id = '$id'";
		
				if($conn->query($sql) === TRUE) {
					header('location:reset-password.php?status=pwd_updated');
				} else {
					header('location:reset-password.php?status=error');	
				}
				echo'<pre>';print_r($row);exit();
			} else {
				header('location:reset-password.php?status=incorrect_pwd');	
			}
		} else {
			header('location:reset-password.php?status=pwd_not_match');
		}
	}

	include('include/header.php');
?>
<div id="group-5" class="l-page-navi__section js-waypoint custom_im_row_holder">
	<div class="_row fixed-width page-section testimonial-masonry padtopbottom3em custom_im_row" >
		<div class="_colwrap _centered custom_im_row_colwrap" >
			<div class="_col custom_im_row_col" style="width:50%" >
				<h3 style="text-align:center;">Update User Data</h3>
				<hr  style="height:20px;" />
				<div  class="testimonial-masonry-card">
					<div  class="description">
						
<div class="wrapper_holder" id="wrapper_holder_documentlist">
	<div class="wrapper" id="wrapper_documentlist">
		<div style="clear:both"></div>
		<div class="form_documentlist_holder">
			<form action="" method="post" id="" name="" onSubmit="return validatePassword()">
				<div class="form_section_documentlist" id="form_section_documentlist_0">
					<label>Old Password</label>
					<input type="password" name="oldPassword" placeholder="Old Password" class="contact-txtbox" required="">
				</div>
				<div style="clear:both"></div>
				<div class="form_section_documentlist" id="form_section_documentlist_0">
					<label>New Password</label>
					<input type="password" name="newPassword" id="newPassword" placeholder="New Password" class="contact-txtbox" required="">
				</div>
				<div style="clear:both"></div>
				<div class="form_section_documentlist" id="form_section_documentlist_0">
					<label>Confirm Password</label>
					<input type="password" max="100" name="rePassword" id="rePassword" placeholder="Confirm Password" class="contact-txtbox" required="">
				</div>
				<div style="clear:both"></div>
				<div class="form_section_documentlist form_section_documentlist_submit" id="form_section_documentlist_0" style="margin-top: 30px;">
					<input type="submit" class="btn_submit_documentlist" name="btn_submit_reset" value="Reset Password">
				</div>
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
<?php include('include/footer.php'); ?>