(function ($) {

  "use strict";

    // COLOR MODE
    $('.color-mode').click(function(){
        $('.color-mode-icon').toggleClass('active')
        $('body').toggleClass('dark-mode')
    })

    // HEADER
    $(".navbar").headroom();

    // PROJECT CAROUSEL
    $('.owl-carousel').owlCarousel({
    	items: 1,
	    loop:true,
	    margin:10,
	    nav:true
	});

    // SMOOTHSCROLL
    $(function() {
      $('.nav-link, .custom-btn-link').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });  

    // TOOLTIP
    $('.social-links a').tooltip();

    // TIMELINE SLIDER for resume (Education & Experience)
    $('.timeline-slider').each(function () {
        const $slider = $(this);
        const $timeline = $slider.find('.timeline');
        const $wrappers = $timeline.find('.timeline-wrapper');
        let index = 0;
        const visibleCount = 1;
        
        function updateSlider() {
            const w = $timeline.outerWidth();
            $timeline.css({ 'transform': `translateX(-${index * w}px)` });
            $timeline.toggleClass('slider-animating', true);
            setTimeout(() => $timeline.toggleClass('slider-animating', false), 550);
            // update arrows
            $slider.find('.prev-arrow').prop('disabled', index <= 0);
            $slider.find('.next-arrow').prop('disabled', index >= $wrappers.length - visibleCount);
        }
        // Set timeline wrappers as inline-block for correct horizontal scroll
        $timeline.css({ display: 'flex', width: `${$wrappers.length * 100}%` });
        $wrappers.css({ flex: `0 0 100%`, maxWidth: '100%' });
        // Initial state
        updateSlider();

        $slider.find('.next-arrow').click(function () {
            if (index < $wrappers.length - visibleCount) {
                index++;
                updateSlider();
            }
        });
        $slider.find('.prev-arrow').click(function () {
            if (index > 0) {
                index--;
                updateSlider();
            }
        });
        // Responsive: reset on resize
        $(window).on('resize', function () { updateSlider(); });
    });

    // Animate Skills list pop-in on navigation/scroll
    $(function () {
      function animateSkills() {
        var skillsSection = $('#skills');
        var skillsList = $('.skills-list');
        if (skillsSection.length && skillsList.length && skillsList.is(':visible')) {
          if (!skillsList.hasClass('pop-in')) {
            skillsList.addClass('pop-in');
          }
        }
      }

      // On navbar click
      $('a[href="#skills"]').on('click', function () {
        setTimeout(animateSkills, 800); // Delay to allow scroll animation
      });

      // On scroll into view
      $(window).on('scroll', function () {
        if ($('#skills').offset().top < $(window).scrollTop() + $(window).height() - 100) {
          animateSkills();
        }
      });
    });

})(jQuery);
