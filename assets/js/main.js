$(document).ready(function(){

  const easeCustom = [.6,.03,.2,1]

  $(".nav-container").accordion({
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


  new TypeIt('.typeItCode', {
     strings: ['HTML', 'CSS', 'JAVASCRIPT', 'RUBY', 'NODEJS', 'RAILS', 'GIT', 'SQL'],
     breakLines: false,
     autoStart: true,
     cursorChar: "_",
     nextStringDelay: ["1000","2000"],
     loop: true,
     loopDelay: "1500"

  });


  /* ANIMATIONS */

  function clickedLink() {
    return $(".ui-accordion-header-active").attr("data-link");
  }

  function activeSlide() {
    return $(".active");
  }

  function showContent(section) {
    $("[class^=main-content-]").hide().removeClass("active");
    $(".main-content-" + (section || clickedLink())).show().addClass("active");
  }

  function closeSubmenu() {
    $(".burger-menu").removeClass('is-active');
    $(".burger").removeClass('is-active');
  }

  var swichtContent = function(section){
    var contentOff = $("[class^=main-content-]");
    contentOff.fadeOut();
    var contentOn = $(".main-content-" + section);
    var anim = new TimelineLite();
    anim
      .fromTo (contentOn , 0.6, {x: 1000}, {x:"0%",opacity:1,display:'block', ease: Power3.easeInOut})
    return anim;
  }

  var contentSwitchTimeline = new TimelineMax({paused: true});

  function navTlGenerator(link){
    var navTimeline = new TimelineMax({delay: .3, paused: true});
    navTimeline
      .to(".nav-container", .6,{x: "-100%", ease: Power3.easeInOut}, "switch")
      .to(".main-start", .6,{x: "-100%", opacity: 0, ease: Power3.easeInOut}, "switch+=0.3")
      .to(".main-container", .6,{width: "75%", ease: Power3.easeInOut}, "switch+=0.3")
      .to(link, .6,{opacity: 1, x: "0%", ease: Power3.easeInOut}, "switch+=0.3")
      .to(".start-side", .6,{opacity: 1, x: "100%", ease: Power3.easeInOut}, "switch+=0.3")
      .to(".main-content", .6,{opacity: 1, x: "0%", ease: Power3.easeInOut}, "switch+=0.3")
      .to(".burger", .2, {opacity: 1, x: 20})
    return navTimeline
  }

  function backToHome(link){
    var backToHomeTl = new TimelineMax({pause: true})
    backToHomeTl
      .to(".nav-container", .6,{x: "0%", ease: Power3.easeInOut}, "switch")
      .to(".main-start", .6,{x: "0%", opacity: 1, ease: Power3.easeInOut}, "switch+=0.3")
      .to(".main-container", .6,{width: "60%", ease: Power3.easeInOut}, "switch+=0.3")
      .to(link, .6,{ x: "-100%", ease: Power3.easeInOut}, "switch+=0.3")
      .to(".start-side", .6,{opacity: 1, x: "0%", ease: Power3.easeInOut}, "switch+=0.3")
      .to(".main-content", .6,{opacity: 0, x: "100%", ease: Power3.easeInOut}, "switch+=0.3")
      .to(".burger", .2, {opacity: 0, x: 0})
    return backToHomeTl
  }


  $(".arrow").click(function(){
    showContent();
    var link = $("." + clickedLink() + "-side");
    var tl = navTlGenerator(link);
    tl.play();
  });

  $(".logo").click(function(){
    closeSubmenu();
    var link = $("." + clickedLink() + "-side");
    var tl = backToHome(link);
    tl.play();
  });

  $(".toSection").click(function(event){
    event.preventDefault();
    var section = $(this).attr("data-link");
    console.log(section);
    contentSwitchTimeline.add(swichtContent(section))
    contentSwitchTimeline.play();
  });

});
