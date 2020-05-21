<?php
	include('connection.php');

	if($_SESSION['type'] == 'user'){
		header('location:dashboard.php?status=unauthorised');	
	}

	if(!empty($_REQUEST['status']) && !empty($_REQUEST['path'])){
		$id   = round(base64_decode($_REQUEST['path']) * 169);
		$status = $_REQUEST['status'];

		$sql = "UPDATE users SET status = '$status' WHERE id = '$id'";

		if($conn->query($sql) === TRUE) {
			header('location:user-list.php?status=status_changed');
		} else {
			header('location:add-user.php?status=error');	
		}
	}

	$sql    = "SELECT * FROM users WHERE user_type = 'user' ORDER BY created_on DESC";
	$result = $conn->query($sql);

	include('include/header.php');
?>
<style type="text/css">
	td{ padding: 5px 0px; }
</style>
<div id="group-5" class="l-page-navi__section js-waypoint custom_im_row_holder">
	<div class="_row fixed-width page-section testimonial-masonry padtopbottom3em custom_im_row" >
		<div class="_colwrap _centered custom_im_row_colwrap" >
			<div class="_col custom_im_row_col" style="width:100%" >
				<h3 style="text-align:center;">User List</h3>
				<hr  style="height:20px;" />
				
				<div  class="testimonial-masonry-card">
					<div  class="description">
						<table width="100%" border="1">
							<thead>
								<tr>
									<td><strong>Sl.No.</strong></td>
									<td><strong>Name</strong></td>
									<td><strong>DOB</strong></td>
									<td><strong>Gender</strong></td>
									<td><strong>Age</strong></td>
									<td><strong>Country</strong></td>
									<td><strong>State</strong></td>
									<td><strong>City</strong></td>
									<td><strong>Username / Password</strong></td>
									<td><strong>Action</strong></td>
								</tr>
							</thead>
							<tbody>
								<?php
									if($result->num_rows > 0){ $count = 0;
										while ($row = $result->fetch_object()) { ?>
											<?php if($row->updated_data) { ?>
												<tr style="background-color: #3e4b5b; color: #fff;">
											<?php } else { ?>
												<tr>
											<?php } ?>
												<td><?=++$count?>.</td>
												<td><?=$row->f_name.' '.$row->l_name?></td>
												<td><?=date('d-M-Y', strtotime($row->dob))?></td>
												<td><?php
													switch ($row->gender) {
														case 'M': echo 'Male'; break;
														case 'F': echo 'Female'; break;
														default: echo 'Other'; break;
													}
												?></td>
												<td><?=$row->age?></td>
												<td><?=$row->country?></td>
												<td><?=$row->state?></td>
												<td><?=$row->city?></td>
												<td><?=$row->username?> / <?=$row->password?></td>
												<td>
													<a href="update-user.php?path=<?=base64_encode($row->id/169)?>">
														<i class="fa fa-pencil fa-fw" aria-hidden="true" style="color:#ff9800; font-size: 25px;"></i>
													</a>
													<?php if($row->status == 'A') { ?>

														<a href="user-list.php?status=D&path=<?=base64_encode($row->id/169)?>">
															<i class="fa fa-power-off fa-fw" aria-hidden="true" style="color:#43a047; font-size: 25px;"></i>
														</a>
													<?php } else { ?>
														<a href="user-list.php?status=A&path=<?=base64_encode($row->id/169)?>">
															<i class="fa fa-power-off fa-fw" aria-hidden="true" style="color:#dd2c00; font-size: 25px;"></i>
														</a>
													<?php } if($row->updated_data) { ?>
														<a href="update-request.php?path=<?=base64_encode($row->id/169)?>">
															<i class="fa fa-edit fa-fw" aria-hidden="true" style="color:#17babe; font-size: 25px;"></i>
														</a>
													<?php } ?>
												</td>
											</tr>
										<?php }
									} else { ?>
										<tr>
											<td colspan="9" align="center">No record found...</td>
										</tr>
									<?php }
								?>
							</tbody>
						</table>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>
<?php include('include/footer.php'); ?>