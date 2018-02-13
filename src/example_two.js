//ALL SCRIPTS
//window Height fuction
function resizeContent() {
  //Height
  $height = $(window).height();
  $('.js-window-height, .js-home-banner').height($height);

  widthplus = $(window).width();
  height = $(window).height();
  $('body, .contentBody').css({height: height});
  content = $(window).height();
}

$(document).ready(function(){
  //Widow height detect section
  resizeContent();
    $(window).resize(function() {
      resizeContent();
  });

  
  //mobile content navigation
  if ($(window).width() < 1024) {
    $('.content-nav__links li a').click(function(){
      $(".content-nav").hide();
      $(".content-nav__mobile").removeClass("js-contentmobile");
      $('.content-nav__skip').removeClass("content-nav-added");
      $(".skip-mobile__header").removeClass('js-open').addClass('js-close');
    });

    $('.getting-started__menu li a').click(function(){
      $(".getting-started__menu").hide();
      $(".content-nav__mobile").removeClass("js-contentmobile");
      $('.content-nav__skip').removeClass("content-nav-added");
      $(".skip-mobile__header").removeClass('js-open').addClass('js-close');
    });
  }


  //remove empty paragraphs
  $('.content-body p, .content-body h3').each(function(){
    if($.trim($(this).text()) == '' && $(this).children().length == 0){
        $(this).remove();
    }
  });


  //pane and faqs heights
  $('.pane-block, .fa-list__item').matchHeight();

  //sticky side bar
  if ($(window).width() > 1024) {
    $('#sidebar').stick_in_parent();
  }
  if ($(window).width() > 1024) {
    $(window).on('resize', function(){
        var width = $('.main-container').width();
        if(width >= 1024) {
            $(".main-container").trigger('sticky_kit:detach');
            $('#sidebar').stick_in_parent();
        } else {
            $("#sidebar").trigger('sticky_kit:detach');
            $('.main-container').stick_in_parent();
        }
    });
  }

  if ($(window).width() > 1024) {
    $('#sidebar')
      .on('sticky_kit:bottom', function(e) {
        $(this).parent().css('position', 'static');
      })
      .on('sticky_kit:unbottom', function(e) {
        $(this).parent().css('position', 'relative');
    });
  }

  $(window).scroll(function() {
    $('.content-body__inner .content-body__container').each(function(){
    var imagePos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop();
       if (imagePos < topOfWindow+70) {
          pagestate($(this).attr('id'));
       }
    });
  });
  function pagestate (id){
    $('.content-menu__container ul li a').removeClass('active');
    $('.content-menu__container li').find('a[href="#'+id+'"]').addClass('active');
  };

  //survey toggle class  
  $(".feedback__yes").click(function(){
    if($('.btn-cta').hasClass('feedback__yes')) {
      $(".feedback__yes").addClass("active");
      $(".feedback__no").removeClass("active");
      $("#feedback_btn").show();
      $(this).removeClass('feedback__yes').addClass('feedback__defualt');
    } else if($('.btn-cta').hasClass('feedback__defualt')) {
      $(".feedback__yes").removeClass("active");
      $(this).removeClass('feedback__defualt').addClass('feedback__yes');
    }
  });

  $(".feedback__no").click(function(){
    if($('.feedback__no').hasClass('feedback__no')) {
     $(".feedback__no").addClass("active");
      $(".feedback__yes").removeClass("active");
      $("#feedback_btn").show();
      $(this).removeClass('feedback__no').addClass('feedback__defualt');
    } else if($('.btn-cta').hasClass('feedback__defualt')) {
      $(".feedback__no").removeClass("active");
      $(this).removeClass('feedback__defualt').addClass('feedback__no');
    }
  });
 

  // write review scroll
  $(document).on('click', '.write-review ', function(){
    $('html, body').animate({
      scrollTop: $(".device-content__form").offset().top - 71
     },1000);
  });

  //Board of directors js scrips
  //i.hover to reveal bio cta
  $('.js-team-list li').hover(function(){
    $(this).find('.meta-content__cta').show();
    $(this).addClass("item-block-height");
  }, function(){
    $(this).find('.js-bio-cta').hide();
    $(this).removeClass("item-block-height");
  });


  //ii. show profile modal
  $(".js-bd-pane").click(function(){
    $(".js-bd-modal").show();
    $(".js-bd-content").addClass("animated fadeInUp");
  });

  $(".js-bd-close").click(function(){
    $(".js-bd-modal").hide();
    $(".js-bd-content").removeClass("animated fadeInUp");
  });

  //replace svg images with png
  $(".no-svg img").each(function() {
    var $this = $(this);
    if ($this.attr("src").indexOf(".svg") > -1) {
        var isSvg = $this.attr("src").toString();
        var isPng = isSvg.replace(".svg", ".png");
        $this.attr("src", isPng);
    }
  });

  //animation for main hero slider thumbs
  $("#banner-slider").flexslider({
    animation: "slide",
    //easing:'easeIn',
    useCSS: true,
    mousewheel: false,
    animationLoop: true,
    slideshow: false,
    maxItems:999,
    directionNav: false,
    slideshowSpeed: 5000,
    animationSpeed: 600,
    slideshow: true,
    randomize: false,
    before: function(slider){
      $(slider).find(".animated").each(function(){
        $(this).removeAttr("class");
      });
    },
    start: function(slider){
       $(slider).find(".flex-active-slide")
                .find("h1").addClass("animated fadeInUp show-caption")
                .next().addClass("animated fadeInUp show-caption");

       $(window).trigger('resize');
    },
    after: function(slider){
      $(slider).find(".flex-active-slide")
                .find("h1").addClass("animated fadeInUp show-caption")
                .next().addClass("animated fadeInUp show-caption");
    }
  });

  //animation for widgets
  $(".js-widget").flexslider({
    animation: "slide",
    mousewheel: true,
    animationLoop: false,
    slideshow: true,
    directionNav: false
  });

  //animation for shop device showcase
  $('#device-thumb').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 80,
    itemMargin: 5,
    directionNav: false,
    asNavFor: '#device-gallery'
  });

  $('#device-gallery').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#device-thumb"
  });

  //homepage scroll fixed menu
  $(window).bind('scroll', function() {
    var navHeight = $(window).height();
     if ($(window).scrollTop() > navHeight) {
      $('.homeContentNav').addClass("fixedNav");
      $(".homeContent").addClass("homeContentHeight");
     }
     else {
      $('.homeContentNav').removeClass("fixedNav");
      $(".homeContent").removeClass("homeContentHeight");
     }
  });


  //utility menu
  $(".js-menu-chat").click(function(){
    $(".js-utility-widget").show();
    $(".js-arrow").show();
    $(".header-menu__bottom, .mobile-menu").css({"box-shadow": "none", "border-bottom": "1px solid #ccc"});
  });
  $(".js-widget-close").click(function(){
    $(".js-utility-widget").hide();
    $(".js-arrow").hide();
    $(".header-menu__bottom, .mobile-menu").css({"box-shadow": "0 0 4px rgba(0,0,0,0.2)", "border-bottom": "none"});
  });

  //add class active on homepage menus
  $(".featuredLinks li:first a").addClass("active");
  $('.featuredLinks li a').click(function(){
    $(".featuredLinks li a.active").removeClass("active");
    $(this).addClass("active");
  });


  //page quick menu
  $('.content-nav a[href^="#"], .content-menu a[href^="#"]').bind('click.smoothscroll',function (e) {
    e.preventDefault();
    var target = this.hash,
      $target = $(target);
    $('html, body').stop().animate( {
      'scrollTop': $target.offset().top + - 100
    }, 900, 'swing', function () {
      window.location.hash = target;
    });
  });


  //side menu
  var sideMainmenu = '.getting-started__menu ul li a';
  $(sideMainmenu).first().addClass("active");
  $(sideMainmenu).on('click', function(){
      $(sideMainmenu).removeClass('active');
      $(this).addClass('active');
  });

  //shop filter price accordion
  var filterBody = $(".js-filterBody");
  var selectorfilterHead = '.js-filterHead';
  $(selectorfilterHead).on('click', function(){
    $(selectorfilterHead).removeClass('active');
    $(this).addClass('active');
  });
  $(filterBody).first().css('display', 'block');
  $(selectorfilterHead).first().addClass("active");
  $(".js-filterHead").click(function(){
    if($(filterBody).is(':visible')) {
      $(filterBody).slideUp(300);
      $(".plusminus").text('+');
    }
    if($(this).next(filterBody).is(':visible')){
      $(this).next(filterBody).slideUp(300);
      $(this).children(".plusminus").text('+');
      $(this).removeClass('active');
    }else {
      $(this).next(filterBody).slideDown(300);
      $(this).children(".plusminus").text('-');
    }
  });

  //shop item specs accordion
  var selectorheadShop = '.js-featureHead';
  $(selectorheadShop).on('click', function(){
    $(selectorheadShop).removeClass('active');
    $(this).addClass('active');
  });
  $(".js-featureHead").click(function(){
    $(this).removeClass("active");
    if ($('.js-featureBody').is(':visible')) {
      $(".js-featureBody").slideUp(300);
      $(".plusminus").text('+');
    }
    if( $(this).next(".js-featureBody").is(':visible')){
      $(this).next(".js-featureBody").slideUp(300);
      $(this).children(".plusminus").text('+');
      $(this).removeClass("active");
    }else {
      $(this).next(".js-featureBody").slideDown(300);
      $(this).children(".plusminus").text('-');
    }
  });

  //Single faqs accordion
  var selectorHeader = '.js-spacHeader';
  $(selectorHeader).on('click', function(){
    $(selectorHeader).removeClass('active');
    $(this).addClass('active');
  });
  $('.js-spacBody').first().css('display', 'block');
  $('.js-spacHeader').first().addClass("active");
  $(".js-spacHeader").click(function(){
    if ($('.js-spacBody').is(':visible')) {
      $(".js-spacBody").slideUp(300);
      $(".plusminus").text('+');
    }
    if( $(this).next(".js-spacBody").is(':visible')){
      $(this).next(".js-spacBody").slideUp(300);
      $(this).children(".plusminus").text('+');
      $(this).removeClass('active');
    }else {
      $(this).next(".js-spacBody").slideDown(300);
      $(this).children(".plusminus").text('-');
    }
  });

  //shop switch devices tabs
  $(".shop-nav__tabs li:first").addClass('active');
    $(".item-list__body > div").hide();
    $(".item-list__body > div:first").show();
    $(".shop-nav__tabs ul li a").click(function() {
      $(".shop-nav__tabs ul li").removeClass('active');
      $(".item-list__body").fadeIn();
      $(this).parent().addClass('active');
      var activeTab = $(this).attr('href');
      $(".item-list__body > div:visible").hide();
      $(activeTab).show();
      return false;
  });

  //shop buy options switch
  $(".buy-content__links li:first").addClass('active');
    $(".buy-content__body > div").hide();
    $(".buy-content__body > div:first").show();
    $(".buy-content__links ul li a").click(function() {
      $(".buy-content__links ul li").removeClass('active');
      $(".buy-content__body").fadeIn();
      $(this).parent().addClass('active');
      var activeTab = $(this).attr('href');
      $(".buy-content__body > div:visible").hide();
      $(activeTab).show();
      return false;
  });

  //main menu fixed on scroll
  $(function(){
    var position = $(window).scrollTop();
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > position) {
          $(".header-menu").addClass("stickHeadNew");
          $('.header-menu__bottom').addClass('headerFixedTop');
          $(".js-utility-widget").addClass('utilityFixedTop');
        } else {
          $(".header-menu").removeClass("stickHeadNew");
          $(".js-utility-widget").removeClass('utilityFixedTop');
        }
        position = scroll;
    });
  });

  //close all widgets
  $("#rates_div").click(function(){
    $(this).fadeOut();
  });
  $("#shop_location_erro_div").on("click", ".w-close-icon", function(){
    $("#shop_location_erro_div").hide();
  });

  $("#ussd_div").on("click", ".ussd-close-icon", function(){
    $("#ussd_div").hide();
  });

  //mobile ios detect
  var deviceAgent = navigator.userAgent.toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
  if(agentID){
    $('html, body').addClass("isoFixed");
  };

  //chat module fixed bottom
  $(".back-top a").click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 800);
    return false;
  });



  //IE8 placeholder
  if(!Modernizr.input.placeholder){

  $('[placeholder]').focus(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
      input.val('');
      input.removeClass('placeholder');
      }
    }).blur(function() {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
      input.addClass('placeholder');
      input.val(input.attr('placeholder'));
      }
    }).blur();
    $('[placeholder]').parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
      }
      });
    });

  }

  $(".rating_li").on("click", function () {
      $(this).parent().find('.ratings_vote').removeClass('ratings_vote');
      $(this).prevAll().addClass('ratings_vote');
      $(this).addClass('ratings_vote');

  });

  //shop accordion
  $('.accord_scroll ul').hide();
    $('.accord_scroll li a').click(function (e) {
      e.preventDefault();
      var openMe = $(this).next();
      var mySiblings = $(this).parent().siblings().find('ul');
      mySiblings.slideUp();
      openMe.slideToggle();
  });

  //font size resize
  $("#medium_font").click(function (){
    $(".content-body__inner p, .single_press_aritcle p, .content-body > *").css("font-size", function(i, value) {
        return parseInt(value) + 1.1;
    });
  });
  $("#small_font").click(function (){
    $(".content-body__inner p, .single_press_aritcle p, .content-body > *").css("font-size", function(i, value) {
        return parseInt(value) - 1.1;
    });
  });

  //sponsorship form scripts
  $(".sub_form").click(function() {
      $('html, body').animate({
          scrollTop: $(".input-error").offset().top - 120
      }, 2000);
  });

  if($('#datepicker, #sponsorship_deadline').length > 0) { 
    $("#datepicker, #sponsorship_deadline").datepicker({
      minDate: 0
    });
  };

  var form = $('#sponsor-form');
  var navbar = $('#header-module');

  form.find(':input').on('invalid', function (event) {
      var input = $(this)
      var first = form.find(':invalid').first();
      if (input[0] === first[0]) {
          var navbarHeight = navbar.height() + 100
          var elementOffset = input.offset().top - navbarHeight
          var pageOffset = window.pageYOffset - navbarHeight
          if (elementOffset > pageOffset && elementOffset < pageOffset + window.innerHeight) {
            return true
          }
          $('html,body').scrollTop(elementOffset)
      }
  });

  $(".s-modal").click(function(){
    $(this).fadeOut();
    $("#welcome-video").attr('src','');
  });

  //welcome video
  $('#welcome-newsite a').click(function() {
    $("#welcome-video").attr('src','https://www.youtube.com/embed/n2lAIhZ_1kg?autoplay=0&rel=0&showinfo=0&controls=0'); 
    $(".js-wlc-modal").fadeIn('slow');
  });
  $('.js-bd-close, #experience-site').click(function() {
    $('.js-wlc-modal').fadeOut();
    $("#welcome-video").attr('src','');   
  });

  $(".modal-content__content").click(function(){
    event.stopPropagation();
  });

  //toggle shop filter on mobile
  $("#filter-mobile").click(function(){
    $("#shop-asidefilter").slideToggle();
  });

  //treasure hunt
  $("#show-treasure").click(function(){
    $("#treasure-modal").show();
  });
  $('.js-bd-close').click(function() {
    $('.js-wlc-modal').fadeOut();
    $("#treasure-modal").hide(); 
  });

  //show more/less list on the desk map
  $('.scd-list__container').matchHeight();

  $(".scd-list-show a").each(function() {
    var $link = $(this);
    var $content = $link.parent().prev("div.scd-list-content");

    var visibleHeight = $content[0].clientHeight;
    var actualHide = $content[0].scrollHeight - 1;


    if (actualHide > visibleHeight) {
        $link.show();
    } else {
        $link.hide();
    }
});

$(".scd-list-show a").on("click", function() {
    var $link = $(this);
    var $content = $link.parent().prev("div.scd-list-content");
    var linkText = $link.text();

    $content.toggleClass("scd-list-half, scd-list-full");

    $link.text(getShowLinkText(linkText));
    $.fn.matchHeight._update()

    return false;
});

  function getShowLinkText(currentText) {
    var newText = '';

    if (currentText.toUpperCase() === "SHOW MORE") {
        newText = "Show less";
    } else {
        newText = "Show more";
    }

    return newText;
  }

  $(".scd-list-content a").click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 800);
    return false;
  });


});
