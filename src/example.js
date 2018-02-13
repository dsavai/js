var loadedCount = 0; //current number of images loaded
var imagesToLoad = $('.preload-image').length; //number of slides with .bcg container
var loadingProgress = 0; //timeline progress - starts at 0
 
$('.preload-image').imagesLoaded({
    background: true
}).progress( function( instance, image ) {
    loadProgress();
    // $("#backgroundMusic")[0].play();
});
 
function loadProgress(imgLoad, image){
    loadedCount++;
    loadingProgress = (loadedCount/imagesToLoad);
    TweenLite.to(progressTl, 0.7, {progress:loadingProgress, ease:Linear.easeNone});

}

var progressTl = new TimelineMax({
    paused: true,
    onUpdate: progressUpdate,
    onComplete: loadComplete
});
 
progressTl.to($('.progress span'), 1, {width:100, ease:Linear.easeNone});
 
function progressUpdate(){
    loadingProgress = Math.round(progressTl.progress() * 100);
    $(".txt-perc").text(loadingProgress + '%');
 
}
function loadComplete() {
    var preloaderOutTl = new TimelineMax();
 
    preloaderOutTl
        .to($('.progress'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn})
        .to($('.txt-perc'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn}, 0.1)
        .set($('body'), {className: '-=is-loading'})
        .set($('#intro-page'), {className: '+=is-loaded'})
        .to($('#preloader'), 0.7, {yPercent: 100, ease:Power4.easeInOut})
        .set($('#preloader'), {className: '+=is-hidden'})
        .from($('.intro-wrap .logo'), 0.2, {y: 20, autoAlpha: 0, ease:Power1.easeOut}, '-=0.2')
        .from($('.intro-wrap .intro-text'), 0.3, {y: 30, autoAlpha: 0, ease:Power1.easeOut}, '+=0.2')
        .from($('.intro-wrap .intro-title'), 0.3, {y: 30, autoAlpha: 0, ease:Power1.easeOut}, '+=0.1')
        .from($('.intro-wrap .creative'), 0.4, {autoAlpha: 0, ease:Power1.easeOut}, '+=0.1')
        .from($('.intro-wrap .intro-cta'), 0.4, {autoAlpha: 0, ease:Power1.easeOut}, '+=0.1');
 
    return preloaderOutTl;

}
var tl = new TimelineMax;

$(document).ready(function(){
	var globaBody = $("body"),
		  sHome = $(".spread"),
	    hHome = $('.page-content-title'),
    	contentHome = $('.p-sc'),
    	hButton = $(".spread-bar"),
    	//image  =  $(".page-image"),
    	homeElements = $('.page-content-title, .spread-bar'),
    	spreadMore = $('.spread-more');

	var homeSwiper = new Swiper('.swiper-landing', {
    	direction: 'vertical',
    	pagination: '.swiper-pagination',
	    paginationClickable: true,
	    watchActiveIndex: true,
	    slidesPerView: 1,
	    speed: 1500,
	    preloadImages: true,
	    lazyLoading: true,
	    draggable: false,
	    preventClicks: false,
	    mousewheel: true,
	    pagination: {
	        el: '.swiper-pagination',
	        type: 'fraction',
	    },
	    on: {
		    transitionStart: function () {
		    	var totalItems = $('#intro-page .swiper-slide').length;
				$('.swiper-slide-active').addClass('active');
		    },
		    slideChange: function () {
				$('.swiper-slide-active').removeClass('active');
		    }
		}
    });

    var animalSwiper = new Swiper('.swiper-inner', {
    	direction: 'vertical',
	    paginationClickable: true,
	    watchActiveIndex: true,
	    spaceBetween: 100,
	    effect: 'fade',
	    slidesPerView: 1,
	    speed: 200,
	    preloadImages: true,
	    lazyLoading: true,
	    draggable: false,
		mousewheel: true,
	    hash: true,
	    slideToClickedSlide:true,
	    nextButton: '.swiper-button-next',
	    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + "0" + (index + 1) + '</span>';
        },
    },
      on:{
          transitionStart: function () {
              //animation_in();
          },
          slideChange: function () {
            //animation_in();
          },
          onSlideChangeEnd:function(e){
              //animalSwiper.update(true);
        }
      }
    });




    function animation_in(){
      var tla = new TimelineMax({
        delay: 0.5
      });
      var slide = $(".s-p-animal");
      var title = slide.find('h1');
      var subtitle = $(slide).find('h2');
      var text = $(slide).find('p');
      var button = $(slide).find('button');
      //var image = $(slide).find('.page-image');
      
      tla.fromTo(title, 0.9,{autoAlpha:0, x:100}, {autoAlpha:0.6, x:0, ease: Power4.easeOut});
      tla.fromTo(subtitle, 0.9,{autoAlpha:0, x:-200}, {autoAlpha:1, x:0, ease: Power4.easeOut},'-0.1');
      tla.fromTo(text, 0.9,{autoAlpha:0, x:50}, {autoAlpha:1, x:0, ease: Power4.easeOut});
      tla.fromTo(button, 0.5,{autoAlpha:0}, {autoAlpha:1, ease: Power4.easeOut});
      //TweenMax.to(image, 0.9, {autoAlpha:1});
    }


    $(".spread-bar-more-openbtn").hover(    		
    	function() {
		    TweenMax.to(image, .4, {css: {scaleX: 1.05, scaleY: 1.05},ease:Power1.easeOut});
		}, function() {
		    TweenMax.to(image, .49, {css: {scaleX: 1, scaleY: 1},ease:Power1.easeOut});
    });

    $("#know-more").click(function(){
        $(".modal-container").show();
    });
    $("#close-modal").click(function(){
        $(".modal-container").hide();
    });

    $(".spread-bar-more-openbtn").click(function(){
      var tla = new TimelineMax({
        delay: 0.5
      });
      var morePara = $(".spread-more-container p");
      var moreAchor = $(".spread-more-container a");
      if($(this).hasClass('button-open')) {
        $(".page-content").addClass("show-more-open");
        $(".spread-more").fadeIn();
        tla.fromTo(morePara, 0.9,{autoAlpha:0, y:100}, {autoAlpha:1, y:0, ease: Power4.easeOut});
        tla.staggerFrom(moreAchor, 0.9,{autoAlpha:0, y:70}, {autoAlpha:1, y:0, ease: Power4.easeOut});
      $(this).removeClass("button-open").addClass('button-close');
      } else if($(this).hasClass('button-close')) {
        $(".page-content").removeClass("show-more-open");
        $(".spread-more").fadeOut();
        $(this).removeClass('button-close').addClass('button-open');
      }
    });
    $(".spread-more-close").click(function(){
        $(".spread-more").fadeOut();
        $(".page-content").removeClass("show-more-open");
        $(".spread-bar-more-openbtn").removeClass('button-close').addClass('button-open');
    });

    $('a.animal-click').click(function(e) {
        // e.preventDefault();
        var id=($(this).attr('id')); 
        alert(id);
            $.ajax({
            type: 'GET',
            cache: true,
            url: "http://localhost/projects/thisismykenya/ajax.php",
            data: {id: id},
            success: function (data) {
              $('#stages').html(data).delay(50);
                animateOverlayout();
           },
            error: function () {
                //handle errors here
            }
        });
    });

    $('a[data-slide]').click(function(e){
      e.preventDefault();
      animalSwiper.slideTo( $(this).data('slide') );
    }); 

    $("#main_sidebar_toggle").click(function(){
      if($(this).hasClass('menu-on')) {
        $(this).addClass("menu-show");
        $("#mobile_nav").fadeIn();
      $(this).removeClass("menu-on").addClass('off');
      } else if($(this).hasClass('off')) {
         $(this).removeClass("menu-show");
         $("#mobile_nav").fadeOut();
        $(this).removeClass('off').addClass('menu-on');
      }
    }); 


    var resolver = {
  resolve: function resolve(options, callback) {
      // The string to resolve
      var resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
      var combinedOptions = Object.assign({}, options, {resolveString: resolveString});

      function getRandomInteger(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      function randomCharacter(characters) {
          return characters[getRandomInteger(0, characters.length - 1)];
      };


      function doRandomiserEffect(options, callback) {
          var characters = options.characters;
          var timeout = options.timeout;
          var element = options.element;
          var partialString = options.partialString;

          var iterations = options.iterations;

          setTimeout(function () {
              if (iterations >= 0) {
                  var nextOptions = Object.assign({}, options, {iterations: iterations - 1});

                  // Ensures partialString without the random character as the final state.
                  if (iterations === 0) {
                      element.textContent = partialString;
                  } else {
                      // Replaces the last character of partialString with a random character
                      element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
                  }

                  doRandomiserEffect(nextOptions, callback)
              } else if (typeof callback === "function") {
                  callback();
              }
          }, options.timeout);
      }

      function doResolverEffect(options, callback) {
          var resolveString = options.resolveString;
          var characters = options.characters;
          var offset = options.offset;
          var partialString = resolveString.substring(0, offset);
          var combinedOptions = Object.assign({}, options, {partialString: partialString});

          // console.log('element', options.element);

          doRandomiserEffect(combinedOptions, function () {
              var nextOptions = Object.assign({}, options, {offset: offset + 1});

              if (offset <= resolveString.length) {
                  doResolverEffect(nextOptions, callback);
              } else if (typeof callback === "function") {
                  callback();
              }
          });
      }

      if (document.getElementById('intro-page')) {
          doResolverEffect(combinedOptions, callback);
      }
  }
};

var strings = [
  'Our beautiful country is full of rare treasures. It is our privilege to celebrate them and our responsibility to come together to conserve them.',
  'Conservation is more than preserving our environment or our wildlife..',
  'it is about protecting our heritage so that future generations will not only read or hear of a world that had a diverse and beautiful wildlife…',
  'but experience it for themselves firsthand and fiercely protect it for their children.',
];

var counter = 0;

var options = {
  // Initial position
  offset: 0,
  // Timeout between each random character
  timeout: 10,
  // Number of random characters to show
  iterations: 1,
  // Random characters to pick from
  characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
  // String to resolve
  resolveString: strings[counter],
  // The element
  element: document.querySelector('[data-target-resolver]')
};

// Callback function when resolve completes
function callback() {
  setTimeout( function() {
    counter ++;
    
    if (counter >= strings.length) {
      counter = 0;
    }
    
    var nextOptions = Object.assign({}, options, {resolveString: strings[counter]});
    resolver.resolve(nextOptions, callback);
  }, 1000);
}

resolver.resolve(options, callback);
});


function animateOverlayout(){
    tl.to("#page-trans", 0.6, {
        scaleX: 0,
        transformOrigin: 'right 50% 0px',
        ease:Power1.easeIn, delay:0.8
    });
}
function animateOvelayin(){
  tl.to("#page-trans", 0.6, {
    scaleX: 1,
    transformOrigin: 'left 50% 0px',
    ease:Power1.easeIn
  });
}
tl.restart();
     
function loadAnimalContent(page_id){
   // var id=($(this).attr('id')); 
   var id = page_id;
    $.ajax({
        type: 'GET',
        cache: true,
        url: "",
        data: {id: id},
        beforeSend: function(){
          animateOvelayin();
        },
        complete: function(){
          animateOverlayout();
        },
        success: function (data) {
          $('#stages').html(data).delay(50);
       },
        error: function () {
            //handle errors here
        } 
  });
}