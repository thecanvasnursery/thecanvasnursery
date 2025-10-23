jQuery(window).on('scroll load', function() {
	var scroll = jQuery(window).scrollTop();
	var headerHeight = jQuery('.header-cntr:not(.is-sticky)').outerHeight();	
	if (scroll >= headerHeight*2) {	
	   jQuery(".header-cntr.is-sticky").addClass("show");	
	} else {	
		jQuery(".header-cntr.is-sticky").removeClass("show");	
	}
});

jQuery(function() {	
	function isTouchDevice(){
		return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
	}	

	if(isTouchDevice()===true) {
		jQuery('body').addClass('touch-devices-body')
	}
	else {
		jQuery('body').addClass('no-touch-devices-body')
	}
	
	jQuery('.header-cntr a.menuToggle, .mobile-menu a.menuToggle').click(function(e) {
        e.preventDefault();
		jQuery('html,body').toggleClass('is-show');
    });

    jQuery('.mobile-menu ul .sub-menu').before('<span class="mobile-menu-toggle">Sub Menu Toggle</span>');

    jQuery('.mobile-menu-toggle').click(function(e) {
        e.preventDefault();
		jQuery(this).toggleClass('is-active');
		jQuery(this).next('.sub-menu').slideToggle();
    });

    jQuery('.menu-bar .searchToggle').click(function(e) {
        e.preventDefault();
		jQuery('.header-searchbox').addClass('is-show');
    });

    jQuery('.header-searchbox .closebtn').click(function(e) {
        e.preventDefault();
		jQuery('.header-searchbox').removeClass('is-show');
    });

    jQuery('.read-more-toggle').click(function(e) {
	  e.preventDefault();
	  jQuery(this).text(function(i, t) {
	    return t == 'read less' ? 'read more' : 'read less';
	  }).toggleClass('is-active').parent('p').next('.more-content').slideToggle();
	});
	
	jQuery('.rent-faq-sec .head').click(function(e) {
        e.preventDefault();
		if(jQuery(this).next('.content').is(':visible')){
			jQuery(this).parent('.repeat').removeClass('is-active');
			jQuery(this).next('.content').slideUp();
		}else{
			jQuery(this).parents('.faq-wrap').find('.repeat').removeClass('is-active');
			jQuery(this).parents('.faq-wrap').find('.content').slideUp();
			jQuery(this).parent('.repeat').addClass('is-active');
			jQuery(this).next('.content').slideDown();
		}
    });
	
	const debug = true;
	
	var $slider = jQuery('.hero-bar .hero-slider');
    
	jQuery('.hero-bar .hero-slider').slick({
		//infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,		
		autoplaySpeed: 2000,
		arrows: true,
		dots: true,
		autoplay: true,
		responsive: [
		{
		  breakpoint: 767,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 1,
		  }
		},
		{
		  breakpoint: 479,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		  }
		}
	  ]
		
	});
	
	
	if(!debug){ $('.slick-dots').hide(); }

	var slider = jQuery('.hero-bar .hero-slider');
	var dots = $('.slick-dots');
	var scrollbar = "slick-scrollbar";
	
	slider.each(function(){
	  var slides = dots.find('li').length - 1; 
		 var scrollId = "ssb-" + (Math.random() + 1).toString(36).substring(7);
		 var scrollWidth = 50;
	  var scroll = `
			<div class="${scrollbar} ${scrollId}"><input type="range" min="0" max="${slides}" step="0.01"value="0" /></div>		
			`;
		
		$(scroll).insertAfter(dots);
	})
	
	
	$('body').on('input mouseout change', slider.find("." + scrollbar), function(){
	  
	  var current = Math.round($(this).find('input').val());
	  slider.slick('slickGoTo', current);
	  
	})
	
	
	
	// On before slide change
	slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		if(!$("." + scrollbar + " input").is(":focus") ){
			$(this).find("." + scrollbar + " input").val(nextSlide);	
		}
			//$('.wrapper .msg').remove();
	});

	jQuery('.home-section-2-sec .category-tabs li a').click(function(e){
		e.preventDefault();
		jQuery('.home-section-2-sec .products-content .content').hide();
		jQuery('.home-section-2-sec .category-tabs li a').removeClass('is-active');
		jQuery('.home-section-2-sec .products-content '+jQuery(this).attr('data-slug')+'.content').show();
		jQuery(this).addClass('is-active');
		jQuery('.home-section-2-sec .titles__wrap .repeat').removeClass('is-show');
		
		jQuery('.home-section-2-sec .titles__wrap').each(function(index, element) {
			jQuery(this).find('.repeat:lt(8)').addClass('is-show');
			
			if(jQuery(this).find('.repeat').size() > 8){
				jQuery(this).next('.more-wrap').addClass('is-show');
			}
		});
	})
	
	if(jQuery('.lightgallery').length){	
		jQuery('.lightgallery').lightGallery({
			selector: '.tiled-gallery-item',
			loop: false,
			exThumbImage: 'data-exthumbimage',
		});
	}
	
	/* Blog Page */
	var x = 8;	
			
	var wHref  = window.location.href,
		wHref = wHref.split('?cat=');		
	
	jQuery('.home-section-2-sec .titles__wrap').each(function(index, element) {
        if(jQuery(this).find('.repeat').size() > 8){
			jQuery(this).next('.more-wrap').addClass('is-show');
		}
    });
	
	
	jQuery('.home-section-2-sec .more-wrap .more-toggle').click(function (e) {
		e.preventDefault();
		var _this = jQuery(this).parent('.more-wrap').prev('.titles__wrap');
		var size_li = _this.find('.repeat').size();
		x= (x+8 <= size_li) ? x+8 : size_li;
		_this.find('.repeat:lt('+x+')').addClass('is-show').find('.animated ').addClass('go');
		if(_this.find('.repeat.is-show').size() == size_li){
			jQuery(this).parent('.more-wrap').removeClass('is-show');
		}
	});
	
	if(wHref[1]){
		jQuery('.filter-bar ul li a[href="'+wHref[1]+'"]').trigger('click');
	}else{			
		jQuery('.home-section-2-sec .titles__wrap .repeat:lt(8)').addClass('is-show');
	}
	
	jQuery('.custom-file input[type="file"]').on("change", function(e){
	   jQuery('.custom-file input[type="text"]').val(e.target.files[0].name);
	})
	
	//jQuery('body a[data-src="#TCSPopUp"]').trigger('click');
});

