$(document).ready(function(){

		// Variables
		var body 							= $("body"),
				modalVisibility		= "showing-in",
				active 						= "active",
				backdrop 					= $("<div />", {
					class: "vmodal-backdrop"
				});

		// Menu
			$("[data-menu]").click(function(){
				var menu_href = $(this).attr("data-menu");
				//$(body).toggleClass('vnav-active');
				$(menu_href).toggleClass('vnav-active');
				//$("[data-menu]").not($(this)).removeClass(active);
				$(this).toggleClass(active);
			});
			$('.vnav-menu a[href*="#"]').click(function(){
				var href = $(this).attr('href');
				$('body,html').animate({
					scrollTop: $(href).offset().top
				},2000);
				$("[data-menu]").removeClass(active);
				body.toggleClass(active);
				return false;
			});
			$(".vnav-text-toggle").click(function(){
				$(this).toggleClass(active);
				$(".vnav-text").toggleClass(active);
			});


		// Scroll to block
			$('.anchor').click(function(){
				var href = $(this).attr('href');
				$('body,html').animate({
					scrollTop: $(href).offset().top
				},2000);
				return false;
			});


		// Modal
			var videoBlock = $('#modalvideo .vmodal-video');
			function videoBlockClear(){
				videoBlock.html('');
			}
			function videoBlockIsShowing(){
				if($("#modalvideo").hasClass('showing-in')){
					videoBlockClear();
				}
			}
			$('[data-func="vmodal"]').click(function(){
				var thisTarget = $(this).attr("data-target");
				videoBlockIsShowing();
				if ( $(thisTarget).length > 0 ) {
					$('.vmodal').removeClass(modalVisibility)
					$(thisTarget).addClass(modalVisibility);
					body.addClass("vmodal-open").append(backdrop.addClass(modalVisibility));
				}else{
					console.log("No element with " + thisTarget + " name");
				}
			});
			$('[data-close="vmodal"]').click(function(){
				$(this).closest(".showing-in").removeClass(modalVisibility);
				backdrop.removeClass(modalVisibility);
				body.removeClass("vmodal-open");
			});
			$(window).click(function(e){
				if ( backdrop.length > 0 && $(e.target).is(".vmodal") ) {
					$(".showing-in").removeClass(modalVisibility);
					backdrop.removeClass(modalVisibility);
					videoBlockClear();
					body.removeClass("vmodal-open");
				}
			});


			// Video
			$('[data-video]').click(function(){
				var thisVideo = $(this).attr('data-video');
				var thisSource = $(this).attr('data-source');
				var thisTitle = $(this).attr('data-title');
				var output;
				videoBlockClear();
				if(thisTitle){
					$("#modalvideo .vmodal-title").text(thisTitle);
				}
				if( thisSource == 'youtube'){
					output = $('<iframe />', {
						class: 'vmodal-iframe',
						src: thisVideo + '?autoplay=1'
					}).appendTo('#modalvideo .vmodal-video');
				}
			});
			$("#modalvideo .vmodal-close").click(function(){
				videoBlockClear();
			});

		// Collapse
			$(".vcollapse-inner.active").children(".vcollapse-body").slideDown();
			$(".vcollapse-header").click(function(){
				$(this).parent().toggleClass(active);
				$(this).next().slideToggle("slow");
				$(this).closest(".vcollapse-wrap").children(".vcollapse-inner").not($(this).parent()).removeClass("active");
				$(this).closest(".vcollapse-wrap").children(".vcollapse-inner").children(".vcollapse-body").not($(this).next()).slideUp("slow");
			});


		// Tabs
			$('[data-func="tab"]').click(function(){
				
				// Tab links toggle class
					$(this).closest(".vtabs-list").children("li").removeClass(active);
					$(this).parent().addClass(active);

				// Show tab content
					var tabTarget = $(this).attr('data-target');
					$(tabTarget).addClass(active);
					$(".vtabs-content > div").not($(tabTarget)).removeClass(active);
				
			});


		// Develope
			
			var theoryPercentage = $('.ratio-theory-percentage');
			var practicPercentage = $('.ratio-practic-percentage');
			var onceTime = false;
			function ratioInterval(increment, value, limit, element, speed = 40){
				var interval = setInterval(function(){
					if(increment > 0){
						value += increment;
						if(value > limit){
							value = limit;
							clearInterval(interval);
						}
					}else{
						value += increment;
						if(value < limit){
							value = limit;
							clearInterval(interval);
						}
					}
					element.text(value);
				}, speed);
			}
			
			function theoryVisible(){
				var visible = $('.ratio-wrap').visible(true, false, 'vertical');
				$('.ratio-wrap').toggleClass('visible',visible);
				
			}
			
			theoryVisible();
			//console.log($('.ratio-wrap').offset().top + '_--');
			$(window).scroll(function(){

				theoryVisible();
				//console.log($(window).scrollTop());
				if ( ($(this).scrollTop() >= $('.ratio-section').offset().top - 300) && onceTime === false ){

					ratioInterval(-1, 100, 30, theoryPercentage, 40);
					ratioInterval(1, 0, 100, practicPercentage, 30);
					onceTime = true;
				}
			});

			

			if( $(window).width() >= 1200 ){
				$('.brilliant-block-text').addClass('brilliant-block-hidden')
			}
			$('.brilliant-block').hover(function(){
				$(this).find('.brilliant-block-hidden').slideToggle();
				//console.log(5);
			});

			$('.owl-carousel').owlCarousel({
				loop:true,
				margin:10,
				nav:true,
				navText: ['',''],
				items: 1,
				responsive:{
						480: {
							items: 3
						},
						768:{
							items: 4
						},
						1025:{
							items: 6
						}
				}
			});
			// if( $('.ratio-theory').visible() ){
			// 	setTimeout(function(){
			// 		$('.ratio-theory').addClass('ratio-theory-fluid-none');
			// 	},1000);
			// }
});	