$(function(){


  /* HELP MENU DROPDOWN */
  $('html').click(function() {
    if($('#helpddmenu').is(":visible")) {
      $('#helpddmenu').fadeOut();
      $('#helpddbutton').removeClass('_a');
    }
  });
  $('#helpddmenu').click(function(event){
    event.stopPropagation();
  });
  $('#helpddbutton').click(function(event){
      event.stopPropagation();
    $('#helpddmenu').fadeToggle();
    $(this).toggleClass('_a');
    return false;
  });

    $('.btn_goto').on('click', function(e) {
      e.preventDefault();
      $('.lesson-nav').slideToggle();
    });

    /* Lesson page navigation */
    if($('ul').hasClass('lesson-nav')){
        var navLength = $('.lesson-nav li').length;

        $('.lesson-nav li').each(function(){
          $(this).css("width", 1140/navLength+"px");
        });
    }


  /* SMOOTH PAGESCROLL */
  $('a.scroll[href^="#"]').click(function() {
    var target = $(this.hash);
    if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
    if (target.length == 0) target = $('html');

    if(!$('html, body').is(':animated')) {
      $('html, body').animate({ scrollTop: target.offset().top }, 500);
    }

    return false;

  });

  // var locationPath = filterPath(location.pathname);
  // var scrollElem = scrollableElement('html', 'body');

  // $('a.scroll[href*=#]').each(function() {
  //   // if ($.data($(this).get(0),'events') !== undefined ) return;  // Not necessary to check if there's preexisting events, since class "scroll" means we want it to smooth scroll
  //   var thisPath = filterPath(this.pathname) || locationPath;
  //   if ( locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/,'') ) {
  //     var $target = $(this.hash+',a[name='+this.hash.replace(/#/,'')+']'), target = this.hash;
  //     if ($target.length) {
  //       var targetOffset = $target.offset().top;
  //       $(this).click(function(event) {
  //         event.preventDefault();
  //         $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
  //           location.hash = target;
  //         });
  //         return false;
  //       });
  //     }
  //   }
  // });

  /* OPEN CLASS LINKS IN NEW WINDOW */
  $('a').filter('._blank').attr({
    target: "_blank"
  });
});

/* HELPER FUNCTIONS FOR SMOOTH PAGESCROLL */
function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
}

function scrollableElement(els) {
  for (var i = 0, argLength = arguments.length; i <argLength; i++) {
    var el = arguments[i],
    $scrollElement = $(el);
    if ($scrollElement.scrollTop()> 0) {
      return el;
    } else {
      $scrollElement.scrollTop(1);
      var isScrollable = $scrollElement.scrollTop()> 0;
      $scrollElement.scrollTop(0);
      if (isScrollable) {
        return el;
      }
    }
  }
  return [];
}

/* DYNAMIC IMAGE CAPTIONS */
jQuery.fn.captions = function(){
  this.each(function(){
    suffix = '';

      if($(this).hasClass('left')) {
        $(this).removeClass('left');
        suffix = suffix + ' left';
      }
      if($(this).hasClass('right')) {
        $(this).removeClass('right');
      suffix = suffix + ' right';
      }
      if($(this).hasClass('center')) {
        $(this).removeClass('center');
      suffix = suffix + ' center';
      }
      if($(this).hasClass('caption-big')) {
        $(this).removeClass('caption-big');
        suffix = suffix + ' caption-big';
      }
      if($(this).hasClass('caption-left')) {
        $(this).removeClass('caption-left');
        suffix = suffix + ' caption-left';
      }
      if($(this).hasClass('caption-center')) {
        $(this).removeClass('caption-center');
        suffix = suffix + ' caption-center';
      }
      if($(this).hasClass('caption-right')) {
        $(this).removeClass('caption-right');
        suffix = suffix + ' caption-right';
      }
      if($(this).hasClass('pro')) {
        $(this).removeClass('pro');
      suffix = suffix + ' pro';
      }
      if($(this).hasClass('photo')) {
        $(this).removeClass('photo');
      suffix = suffix + ' photo';
      }
      if($(this).hasClass('overlay')) {
        $(this).removeClass('overlay');
      suffix = suffix + ' overlay';
      }

      $(this).wrap("<div class='caption"+suffix+"'></div>");

/*
      if($(this).hasClass('left')) {
        $(this).removeClass('left');
        $(this).wrap("<div class='caption left'></div>");
      } else if($(this).hasClass('right')) {
        $(this).removeClass('right');
        $(this).wrap("<div class='caption right'></div>");
      } else if($(this).hasClass('center')) {
        $(this).removeClass('center');
        $(this).wrap("<div class='caption center'></div>");
      } else {
        $(this).wrap("<div class='caption'></div>");
      }
*/

    if( $(this).attr('alt') !== "") {
      $(this).after('<span>' + $(this).attr('alt') + '</span>');
      $(this).removeAttr('title');
    }

    if( !$(this).hasClass('nofade') ) {
      if ($(this).width()){
        $(this).parent().hide();
        $(this).parent().fadeIn();
        var w = $(this).width();
        $(this).parent().css("width",w+"px");
      }else{
        $(this).parent().hide();
        $(this).load(function() {
          $(this).parent().fadeIn();
          var w = $(this).width();
          $(this).parent().css("width",w+"px");
        });
      }
    }
  });
}

$("img.caption").captions();

/*START "Playlist" required scripts*/
var navopen = false;
$('.ios-menu-button').click(function(){
  if(!navopen){
    openNav();
  }else{
    closeNav();
  }
});

$('#nav_overlay').click(function(){
  closeNav();
})

function openNav(){
  $('#nav_overlay').show();
  $('nav.ios').css('display','block').animate({'margin-top':0});
  $('.ios-menu-button').addClass('on');
  navopen=true;
}

function closeNav(){
  $('#nav_overlay').hide();
  $('nav.ios').css('display','block').animate({'margin-top':-500});
  $('.ios-menu-button').removeClass('on');
  navopen=false;
}

$('.modal').each(function(){
  var $this = $(this);

  if(($this).hasClass('youtube')){
    $this.fancybox({
      width: $this.data('width'),
      height: $this.data('height')
    });
  }else{
    $this.fancybox();
  }
});

function isIOS(){
  var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
  var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
  var isiPod = navigator.userAgent.toLowerCase().indexOf("ipod");

  if(isiPhone > -1 || isiPad > -1 || isiPod > -1){
    return true;
  }
  return false;
}

/*END "Playlist" required scripts*/

// Prevent customers from clicking multiple times for upsells

