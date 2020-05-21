<?php
	include('connection.php');
	include('include/header.php');
?>
<div  class="sec-benefits padtop1em mobile-padtop2em custom_im_row_holder">
	<div class="_row fixed-width custom_im_row" >
		<div class="_colwrap _centered custom_im_row_colwrap" >
			<div class="_col custom_im_row_col" style="width:80%" >
				<h3 style="text-align:center;">
					<?=($_REQUEST['status'] == 'success')?'Welcome '.$_SESSION['f_name'].' '.$_SESSION['l_name']:'Welcome to Dasboard'?>
				</h3>
				
				<hr  style="height:20px;" />
				<div class="_row fixed-width padbottom1em mobile-padbottom2em" >
					<div class="_colwrap _tri how_can_help_section_holder" >
						
						<div class="_col _left how_can_help_section" >
							<img src="images/how_1.jpg" srcset="images/how_1_2x.jpg 2x" class="user-assets img-round" alt="Lorem Ipsum 1">
							<h6 style="text-align:center;" class="_nomarginbottom icon_list _margintop1rem">Lorem Ipsum 1</h6>
						</div>
						
						<div class="_col _middle how_can_help_section" >
							<img src="images/how_2.jpg" srcset="images/how_2_2x.jpg 2x" class="user-assets img-round" alt="Lorem Ipsum 2">
							<h6 style="text-align:center;" class="_nomarginbottom icon_list _margintop1rem">Lorem Ipsum 2</h6>
						</div>
						
						<div class="_col _right how_can_help_section" >
							<img src="images/how_3.jpg" srcset="images/how_3_2x.jpg 2x" class="user-assets img-round" alt="Lorem Ipsum 3">
							<h6 style="text-align:center;" class="_nomarginbottom icon_list _margintop1rem">Lorem Ipsum 3</h6>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?php include('include/footer.php'); ?>