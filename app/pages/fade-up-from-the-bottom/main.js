(function() {
  var $elems = $('.elem');
  var $window = $(window);

  /**
   * main
   */
  function checkIfInView() {
    var windowHeight = $window.height();
    var windowTopPosition = $window.scrollTop();
    var windowBottomPosition = (windowHeight + windowTopPosition);

    $.each($elems, function() {
      var $elem = $(this);
      // var elemHeight = $elem.outerHeight();
      var elemTopPosition = $elem.offset().top;
      // var elemBottomPosition = (elemTopPosition + elemHeight);

      if (elemTopPosition <= windowBottomPosition) {
        $elem.addClass('in-view');
      } else {
        $elem.removeClass('in-view');
      }
    });
  }

  $window.on('scroll resize', checkIfInView);
  $window.trigger('scroll');
})();
