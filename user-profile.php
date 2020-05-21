<?php
	include('connection.php');

	if($_SESSION['type'] == 'admin'){
		header('location:dashboard.php?status=unauthorised');	
	}

	$id  = $_SESSION['userid'];

	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		unset($_POST['btn_submit_add']);
		$_POST['dob'] = date('Y-m-d', strtotime($_POST['dob']));
		
		$data = json_encode($_POST);
		$sql  = "UPDATE users SET updated_data = '$data' WHERE id = '$id'";
		
		if($conn->query($sql) === TRUE) {
			header('location:user-profile.php?status=will_update');
		} else {
			header('location:user-profile.php?status=error');	
		}
		//echo'<pre>';print_r($_POST);exit();
	}

	$sql = "SELECT * FROM users WHERE id = '$id'";
	$row = $conn->query($sql)->fetch_object();
	
	include('include/header.php');
?>
<div id="group-5" class="l-page-navi__section js-waypoint custom_im_row_holder">
	<div class="_row fixed-width page-section testimonial-masonry padtopbottom3em custom_im_row" >
		<div class="_colwrap _centered custom_im_row_colwrap" >
			<div class="_col custom_im_row_col" style="width:100%" >
				<h3 style="text-align:center;">User Data</h3>
				<hr  style="height:20px;" />
				<div  class="testimonial-masonry-card">
					<div  class="description">
						
<div class="wrapper_holder" id="wrapper_holder_documentlist">
	<div class="wrapper" id="wrapper_documentlist">
		<div style="clear:both"></div>
		<div class="form_documentlist_holder">
			<form action="" method="post" id="" name="" onSubmit="return validate_documentlist_form()">
				<div class="form_section_documentlist" id="form_section_documentlist_0">
					<label>First Name</label>
					<input type="text" name="f_name" value="<?=$row->f_name?>" class="contact-txtbox" required="">
				</div>
				<div class="form_section_documentlist" id="form_section_documentlist_1">
					<label>Last Name</label>
					<input type="text" name="l_name" value="<?=$row->l_name?>" class="contact-txtbox" required="">
				</div>
				
				<div class="form_section_documentlist" id="form_section_documentlist_3">
					<label>Age</label>
					<input type="number" max="100" name="age" value="<?=$row->age?>" class="contact-txtbox" required="">
				</div>
				<div class="form_section_documentlist" id="form_section_documentlist_4">
					<label>Date of Birth</label>
					<input type="date" name="dob" value="<?=$row->dob?>" class="contact-txtbox" required="">
				</div>
				<div class="form_section_documentlist" id="form_section_documentlist_5">
					<label>State</label>
					<input type="text" name="state" value="<?=$row->state?>" class="contact-txtbox" required="">
				</div>
				<div class="form_section_documentlist" id="form_section_documentlist_0">
					<label>Country</label>
					<input type="text" name="country" value="<?=$row->country?>" class="contact-txtbox" required="">
				</div>
				<div class="form_section_documentlist" id="form_section_documentlist_2">
					<label>Select your gender</label>
					<select name="gender" class="contact-txtbox" required="">
						<option value="M" <?=($row->gender == 'M')?'selected':''?>>Male</option>
						<option value="F" <?=($row->gender == 'F')?'selected':''?>>Female</option>
						<option value="O" <?=($row->gender == 'O')?'selected':''?>>Other</option>
					</select>
				</div>
				<div class="form_section_documentlist" id="form_section_documentlist_1">
					<label>City</label>
					<input type="text" name="city" value="<?=$row->city?>" class="contact-txtbox" required="">
				</div>
				<div style="clear:both"></div>
				<div class="form_section_documentlist form_section_documentlist_submit" id="form_section_documentlist_8">
					<input type="submit" class="btn_submit_documentlist" name="btn_submit_add" value="Update Info.">
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