		</div>

		<footer class="fixed-width footer" style="position:relative">
			<div class="_colwrap center gdpr">
				<p>Copyright &copy; Lorem Ipsum. Lorem Ipsum.</p>
			</div>
			<a href="#body_top" class="custom_gototop_button scroll-link scroll">&#8593;</a>
		</footer>
	
	</div>
 
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
		function validatePassword(){
			if($('#newPassword').val() != $('#rePassword').val()){
				alert('Your password not match.!');
				return false;
			}
		}
		
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