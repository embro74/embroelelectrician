(function ($) {
    "use strict";

    // Spinner
    $(window).on('load', function () {
        $('#spinner').removeClass('show');
    });

    // Initiate WOW.js
    new WOW({
        offset: 50, // Trigger animations earlier
        mobile: false, // Disable animations on mobile
    }).init();

    // Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        autoplay: true,
        smartSpeed: 500,
        autoplayHoverPause: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });

    // Service carousel
    $(".service-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        autoplayHoverPause: true,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1200: { items: 2 }
        }
    });

    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        autoplayHoverPause: true,
        dots: true,
        loop: true,
        margin: 25,
        responsive: {
            0: { items: 1 },
            1200: { items: 2 }
        }
    });

    // Back-to-top button
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

})(jQuery);
