var Accounts = function(){
  var exports = {}

  var Utils = (function(){
    var Utils = {}

    Utils.popup = function(opts){
      var screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
          screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
          windowWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.documentElement.clientWidth,
          windowHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.documentElement.clientHeight - 22),
          width = Utils.isMobile() ? null : opts.size.width,
          height = Utils.isMobile() ? null : opts.size.height,
          offsetX = (screenX < 0) ? window.screen.width + screenX : screenX,
          left = parseInt(offsetX + ((windowWidth - width) / 2), 10),
          top = parseInt(screenY + ((windowHeight - height) / 2.5), 10),
          popupOptions = [];
      if (width !== null) popupOptions.push('width=' + width);
      if (height !== null) popupOptions.push('height=' + height);
      popupOptions.push('left=' + left);
      popupOptions.push('top=' + top);
      popupOptions.push('scrollbars=1');
      popupOptions.push('location=1,toolbar=0');
      popupOptions = popupOptions.join(',');
      var win;
      if (!Utils.isMobile()){
        win = window.open(opts.url, opts.id, popupOptions);
      }else{
        $.cookie('ac.action_referrer', window.location.href, { path: '/' });
        window.location.href = opts.url;
      }

      if (!win) return;
    }

    Utils.http_build_query = function(formdata, numeric_prefix, arg_separator) {
      var value, key, tmp = [],
        that = this;

      var _http_build_query_helper = function(key, val, arg_separator) {
        var k, tmp = [];
        if (val === true) {
          val = '1';
        } else if (val === false) {
          val = '0';
        }
        if (val != null) {
          if (typeof val === 'object') {
            for (k in val) {
              if (val[k] != null) {
                tmp.push(_http_build_query_helper(key + '[' + k + ']', val[k], arg_separator));
              }
            }
            return tmp.join(arg_separator);
          } else if (typeof val !== 'function') {
            return Utils.urlencode(key) + '=' + Utils.urlencode(val);
          } else {
            throw new Error('There was an error processing for http_build_query().');
          }
        } else {
          return '';
        }
      };

      if (!arg_separator) {
        arg_separator = '&';
      }
      for (key in formdata) {
        value = formdata[key];
        if (numeric_prefix && !isNaN(key)) {
          key = String(numeric_prefix) + key;
        }
        var query = _http_build_query_helper(key, value, arg_separator);
        if (query !== '') {
          tmp.push(query);
        }
      }

      return tmp.join(arg_separator);
    }

    Utils.isMobile = function(){
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }

    Utils.urlencode = function(str) {
      str = (str + '')
        .toString();

      // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
      // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
      return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
        .replace(/%20/g, '+');
    }

    Utils.validateEmail = function(email) {
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(email);
    }

    return Utils;
  })();


  var LoginButtonsHandler = (function(){
    var exports = {};

    exports.initialize = function(){
      $('.ac\\:login-btn').live('click', handleLoginButtonClick);
    }

    var handleLoginButtonClick = function(event){
      var login_options = {
        layout: 'plain'
      };

      var url_params = Utils.http_build_query(login_options);
      var cache_buster = '&z=' + new Date().getTime();
      Utils.popup({
        id: 'accounts.oauth.authorize',
        url: AC.login_path + '?' + url_params + cache_buster,
        size: {
          width: '450',
          height: '400'
        }
      })

      return false;
    }

    return exports;
  })();


  var RegisterButtonsHandler = (function(){
    var exports = {};

    exports.initialize = function(){
      $('.ac\\:register-btn').live('click', handleRegisterButtonClick);
    }

    var handleRegisterButtonClick = function(event){
      var cache_buster = 'z=' + new Date().getTime();
      Utils.popup({
        id: 'accounts.user.register',
        url: AC.register_path + '?' + cache_buster,
        size: {
          width: '450',
          height: '570'
        }
      })

      return false;
    }

    return exports;
  })();

  var RegisterFormsHandler = (function(){
    var exports = {};
    var theForm = false;

    exports.initialize = function(){
      $('.ac\\:registerform').data('callback-status', 'pending');
      $('.ac\\:registerform').submit(handleRegisterFormSubmit);
    }

    exports.handleCallback = function(data){
      if (theForm) {
        $('input[name=firstname], input[name=first_name]', $(theForm)).val(data.first_name);
        $('input[name=email]', $(theForm)).val(data.email);
        $(theForm).data('callback-status', 'complete');
        $('button[name=submit]', theForm).html('<img src="'+AC.base_path+'_ignite/images/ajax-loader-button.gif">');

        setTimeout(function(){
          $(theForm).submit();
        }, 500);
        return true;
      }
      return false;
    }

    var handleRegisterFormSubmit = function(event){
      theForm = event.target;

      var firstname = $('input[name=firstname]', $(theForm)).val() || $('input[name=first_name]', $(theForm)).val() || '';
      var email = $('input[name=email]', $(theForm)).val() || '';

      // Submit if already have first name & email
      if(firstname.length > 0 && email.length > 0 && Utils.validateEmail(email)){
        $('button[name=submit_button]', theForm).html('<img src="'+AC.base_path+'_ignite/images/ajax-loader-button.gif">');
        return true;
      }

      // Handle callback
      var callback_status = $(theForm).data('callback-status');
      if(callback_status == 'complete'){
        $(theForm).data('callback-status', 'pending');
        theForm = false;
        return true;
      }

      // Get user to register
      var cache_buster = 'z=' + new Date().getTime();
      Utils.popup({
        id: 'accounts.user.register',
        url: AC.register_path + '?' + cache_buster,
        size: {
          width: '450',
          height: '570'
        }
      });
      return false;
    }

    return exports;

  })();

  exports.registrationCallback = function(data){
    return RegisterFormsHandler.handleCallback(data);
  }

  exports.initialize = function(){
    LoginButtonsHandler.initialize();
    RegisterButtonsHandler.initialize();
    RegisterFormsHandler.initialize();
  }

  return exports;
}();

$(function(){
  Accounts.initialize();
});
