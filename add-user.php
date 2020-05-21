<?php
	include('connection.php');

	if($_SESSION['type'] == 'user'){
		header('location:dashboard.php?status=unauthorised');	
	}

	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		//echo'<pre>';print_r($_POST);exit();
		unset($_POST['btn_submit_add']);
		$_POST['dob'] = date('Y-m-d', strtotime($_POST['dob']));
    			
		$keys   = implode(',', array_keys($_POST));
		$values = "'".implode("', '", array_values($_POST))."'";
		
		$sql = "INSERT INTO users($keys) VALUES($values)";
		
		if($conn->query($sql) === TRUE) {
			$lastID   = $conn->insert_id;
			$username = 'user_'.sprintf("%03d", $lastID);
			$password = substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyz'), 0, 8);

			$sql = "UPDATE users SET username = '$username', password = '$password' WHERE id = '$lastID'";
			$conn->query($sql);

			header('location:add-user.php?status=added');
		} else {
			header('location:add-user.php?status=error');	
		}
	}

	include('include/header.php');
?>
<div id="group-5" class="l-page-navi__section js-waypoint custom_im_row_holder">
	<div class="_row fixed-width page-section testimonial-masonry padtopbottom3em custom_im_row" >
		<div class="_colwrap _centered custom_im_row_colwrap" >
			<div class="_col custom_im_row_col" style="width:100%" >
				<h3 style="text-align:center;">Add User</h3>
				<hr  style="height:20px;" />
				<div  class="testimonial-masonry-card">
					<div  class="description">
						
<div class="wrapper_holder" id="wrapper_holder_documentlist">
	<div class="wrapper" id="wrapper_documentlist">
		<div style="clear:both"></div>
		<div class="form_documentlist_holder">
			<form action="add-user.php" method="post" id="" name="" onSubmit="return validate_documentlist_form()">
				<div class="form_section_documentlist" id="form_section_documentlist_0">
					<input type="text" name="f_name" placeholder="First Name" class="contact-txtbox" required="">
				</div>
				<div class="form_section_documentlist" id="form_section_documentlist_1">
					<input type="text" name="l_name" placeholder="Last Name" class="contact-txtbox" required="">
				</div>
				<div class="form_section_documentlist" id="form_section_documentlist_2">
					<select name="gender" class="contact-txtbox" required="">
						<option value="" hidden="">Select your gender</option>
						<option value="M">Male</option>
						<option value="F">Female</option>
						<option value="O">Other</option>
					</select>
				</div>
				<div class="form_section_documentlist" id="form_section_documentlist_3">
					<input type="number" max="100" name="age" placeholder="Age" class="contact-txtbox" required="">
				</div>
				<div class="form_section_documentlist" id="form_section_documentlist_4">
					<input type="date" name="dob" placeholder="Date of Birth" class="contact-txtbox" required="">
				</div>
				<div class="form_section_documentlist" id="form_section_documentlist_5">
					<input type="text" name="country" placeholder="Country" class="contact-txtbox" required="">
				</div>
				<div class="form_section_documentlist" id="form_section_documentlist_0">
					<input type="text" name="state" placeholder="State" class="contact-txtbox" required="">
				</div>
				<div class="form_section_documentlist" id="form_section_documentlist_1">
					<input type="text" name="city" placeholder="City" class="contact-txtbox" required="">
				</div>
				<div style="clear:both"></div>
				<div class="form_section_documentlist form_section_documentlist_submit" id="form_section_documentlist_8">
					<input type="submit" class="btn_submit_documentlist" name="btn_submit_add" value="Add User">
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