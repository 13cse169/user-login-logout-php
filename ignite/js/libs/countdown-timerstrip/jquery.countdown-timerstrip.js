(function($) {

  $.fn.countDownTimerStrip = function(options) {

    var default_layout = '';
        default_layout += '{y<}<div class="digits_wrap"><div class="digits y10 image{y10}">{y10}</div><div class="digits y1 image{y1}">{y1}</div><div class="datepart">YEARS</div></div>{y>}';
        default_layout += '{o<}<div class="digits_wrap"><div class="digits o10 image{o10}">{o10}</div><div class="digits o1 image{o1}">{o1}</div><div class="datepart">MONTHS</div></div>{o>}';
        default_layout += '{w<}<div class="digits_wrap"><div class="digits w10 image{w10}">{w10}</div><div class="digits w1 image{w1}">{w1}</div></div><div class="datepart">WEEKS</div>{w>}';
        default_layout += '<div class="digits_wrap"><div class="digits d10 image{d10}">{d10}</div><div class="digits d1 image{d1}">{d1}</div><div class="datepart">DAYS</div></div>';
        default_layout += '<div class="digits_wrap"><div class="digits h10 image{h10}">{h10}</div><div class="digits h1 image{h1}">{h1}</div><div class="datepart hours">HOURS</div></div>';
        default_layout += '<div class="digits_wrap"><div class="digits m10 image{m10}">{m10}</div><div class="digits m1 image{m1}">{m1}</div><div class="datepart minutes">MINUTES</div></div>';
        default_layout += '<div class="digits_wrap"><div class="digits s10 image{s10}">{s10}</div><div class="digits s1 image{s1}">{s1}</div><div class="datepart seconds">SECONDS</div></div>';

    // Defaults
    var settings = $.extend( {
      layout          : default_layout,
      format          : 'DHMS',
      onTick          : _checkPeriods
    }, options);

    function _checkPeriods(periods){

      var $this = $(this);
      var last_periods = $(this).data('last_periods');

      if(last_periods){

        _addTickFlag(last_periods[0], periods[0], '.y', $this);
        _addTickFlag(last_periods[1], periods[1], '.o', $this);
        _addTickFlag(last_periods[2], periods[2], '.w', $this);
        _addTickFlag(last_periods[3], periods[3], '.d', $this);
        _addTickFlag(last_periods[4], periods[4], '.h', $this);
        _addTickFlag(last_periods[5], periods[5], '.m', $this);
        _addTickFlag(last_periods[6], periods[6], '.s', $this);

      }else{  // Tick everything if null - first iteration
        $this.find('.digits').addClass('tick');

      }

      $(this).data('last_periods',periods);
    }

    function _addTickFlag(old_period, new_period, classname, ele){

      if(old_period != new_period) {

        if(old_period % 10 == 0) {
          ele.find(classname + '10').addClass('tick');
        }

        ele.find(classname + '1').addClass('tick');

      }

    }


    // Maintain Chainability
    return this.each(function(i){

      // Create data store for last period
      $(this).data('last_periods', null);

      $(this).countdown(settings);
    });

  }

})(jQuery);