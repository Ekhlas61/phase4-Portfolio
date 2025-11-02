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

    // Contact Form Submission with EmailJS
    $(function () {
      // EmailJS Configuration
      const EMAILJS_PUBLIC_KEY = "wHK_6GczZuJQ_twJK"; // EmailJS Public Key
      const EMAILJS_SERVICE_ID = "service_5o1kv2v"; // EmailJS Service ID
      const EMAILJS_TEMPLATE_ID = "template_mwk0t7p"; // EmailJS Template ID
      
      // Check if EmailJS is configured
      const isEmailJSConfigured = EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" && 
                                   EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" && 
                                   EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID";
      
      // Initialize EmailJS only if configured
      if (isEmailJSConfigured) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
      }

      $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const sendBtn = $('#send-btn');
        const btnText = $('#btn-text');
        const btnLoading = $('#btn-loading');
        const formMessage = $('#form-message');
        
        // Get form values
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const message = $('#message').val().trim();
        
        // Validate form
        if (!name || !email || !message) {
          showMessage('Please fill in all fields.', 'error');
          return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showMessage('Please enter a valid email address.', 'error');
          return;
        }
        
        // Check if EmailJS is configured
        if (!isEmailJSConfigured) {
          showMessage('Contact form is not configured yet. Please contact directly at ekhlasabdulmelik@gmail.com', 'error');
          console.error('EmailJS not configured. Please set up EmailJS credentials in js/custom.js');
          return;
        }
        
        // Show loading state
        sendBtn.prop('disabled', true);
        btnText.hide();
        btnLoading.show();
        formMessage.hide();
        
        // EmailJS template parameters
        const templateParams = {
          from_name: name,
          from_email: email,
          message: message,
          to_email: 'ekhlasabdulmelik@gmail.com' // Your email address where you want to receive messages
        };
        
        // Send email using EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
          .then(function(response) {
            // Success
            showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
            form[0].reset(); // Reset form
            sendBtn.prop('disabled', false);
            btnText.show();
            btnLoading.hide();
          }, function(error) {
            // Error
            showMessage('Sorry, there was an error sending your message. Please try again later or contact me directly at ekhlasabdulmelik@gmail.com', 'error');
            sendBtn.prop('disabled', false);
            btnText.show();
            btnLoading.hide();
            console.error('EmailJS error:', error);
          });
      });
      
      function showMessage(text, type) {
        const formMessage = $('#form-message');
        formMessage.removeClass('alert-success alert-danger');
        
        if (type === 'success') {
          formMessage.addClass('alert-success');
          formMessage.css('background-color', '#d4edda');
          formMessage.css('color', '#155724');
          formMessage.css('border', '1px solid #c3e6cb');
        } else {
          formMessage.addClass('alert-danger');
          formMessage.css('background-color', '#f8d7da');
          formMessage.css('color', '#721c24');
          formMessage.css('border', '1px solid #f5c6cb');
        }
        
        formMessage.text(text);
        formMessage.fadeIn();
        
        // Scroll to message
        $('html, body').animate({
          scrollTop: formMessage.offset().top - 100
        }, 500);
        
        // Hide success message after 5 seconds
        if (type === 'success') {
          setTimeout(function() {
            formMessage.fadeOut();
          }, 5000);
        }
      }
    });

})(jQuery);
