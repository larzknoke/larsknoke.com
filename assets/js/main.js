$(document).ready(function(){

  const easeCustom = [.6,.03,.2,1]

  $(".nav-container").accordion({
      // heightStyle: "fill",
      collapsible: true,
      active: 0,
      animate: "swing",
      event: "click"
  });

  $("nav h1").click(function(){
    var h1height = $(this).outerHeight();
    var index = $(this).parent().children('h1').index(this) + 1;
    $(".arrow").animate({top: (h1height * index) - (index == 1 ? 56 : 40)}, 300, "swing")
  });

  $(document).on("click", ".burger" ,function(){
    $(".burger").toggleClass('is-active');
    $(".burger-menu").toggleClass('is-active');
  });


  $('.toContact').click(function(e){
    e.preventDefault();
    $("[class^=main-content-]").hide();
    $(".main-content-contact").show();
    startSection(false);
    sideBig(true);
    toggleSection("contact", true);
    burger(true);
  });


  $(".arrow").click(function(){

    var section = $(".ui-accordion-header-active").attr("data-link");
    $("[class^=main-content-]").hide();
    $(".main-content-" + section).show();

    sideBig(true);
    toggleSection(section, true);
    burger(true);
    startSection(false);



  });

  $(document).on("click", ".logo", function(){
    toStart();
    sideBig(false);
    $(".burger-menu").removeClass('is-active');
    $(".burger").removeClass('is-active');
  });

  var sideBig = function(data){
    if (!data) {
      $(".box.side").css({"flex":"40%"});
      $(".box.main-container").css({"flex":"60%"});
    } else {
      $(".box.side").css({"flex":"30%"});
      $(".box.main-container").css({"flex":"70%"});
    }
  }

  var toggleSection = function(section, trigger){
    anime({
      targets: "." + section + "-side",
      translateX: trigger ? 0 : "-100%",
      opacity: 1,
      duration: 600,
      easing: easeCustom,
      delay: 600
    });
  }

  var burger = function(trigger){
    anime({
      targets: ".burger",
      translateX: trigger ? [100,0] : [0,100],
      duration: 200,
      easing: easeCustom,
      delay: trigger ? 1100 : 0,
      opacity: trigger ? 1 : 0
    });
  }

  var toStart = function(){
    var section = $(".ui-accordion-header-active").attr("data-link");
    toggleSection(section, false);
    burger(false);
    startSection(true);
  }

  var startSection = function(trigger){
    if (!trigger) {
      anime({
        targets: ".start-side",
        translateX: 100,
        duration: 600,
        easing: easeCustom,
        opacity: 0,
        delay: 600
      });
      anime({
        targets: ".nav-container",
        translateX: "-100%",
        delay: 300,
        duration: 600,
        easing: easeCustom
      });
      anime({
        targets: ".main-start",
        translateX: "-100%",
        delay: 600,
        duration: 600,
        easing: easeCustom,
        opacity: 0
      });
      anime({
        targets: ".main-content",
        translateX: 0,
        delay: 700,
        duration: 600,
        easing: easeCustom,
        opacity: 1
      });
    } else {
      anime({
        targets: ".main-content",
        translateX: "100%",
        duration: 600,
        easing: easeCustom,
        opacity: 1
      });
      anime({
        targets: ".main-start",
        translateX: 0,
        duration: 600,
        easing: easeCustom,
        opacity: 1
      });
      anime({
        targets: ".start-side",
        translateX: 0,
        duration: 600,
        easing: easeCustom,
        opacity: 1,
        delay: 600
      });
      anime({
        targets: ".nav-container",
        translateX: 0,
        delay: 300,
        duration: 600,
        easing: easeCustom
      });
    }
  }

  new TypeIt('.typeItCode', {
     strings: ['HTML', 'CSS', 'JAVASCRIPT', 'RUBY', 'NODEJS', 'RAILS', 'GIT', 'SQL'],
     breakLines: false,
     autoStart: true,
     cursorChar: "_",
     nextStringDelay: ["1000","2000"],
     loop: true,
     loopDelay: "1500"

});

});
