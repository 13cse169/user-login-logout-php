$('document').ready(function(){$(window).scroll(function(){var scroll=$(window).scrollTop();if(scroll>1){$(".secondbar").addClass("scrolling-nav")}
else{$(".secondbar").removeClass("scrolling-nav")}})});(function($){$('#courseinfo .accordion div > li:eq(0) a').addClass('active').next().slideDown();$('#courseinfo .accordion a').click(function(j){var dropDown=$(this).closest('li').find('div.content');$(this).closest('#courseinfo .accordion').find('div.content').not(dropDown).slideUp();if($(this).hasClass('active')){$(this).removeClass('active')}else{$(this).closest('#courseinfo .accordion').find('a.active').removeClass('active');$(this).addClass('active')}
dropDown.stop(!1,!0).slideToggle();j.preventDefault()})})(jQuery)