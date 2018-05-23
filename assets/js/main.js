// ---------------------------------------------------------------
// LOADER
// ---------------------------------------------------------------
function loader(){
  setTimeout(function(){
    var wrapper = $('.mac-wrapper');
    var startTimeline = new TimelineMax({onComplete: loaderOff});
    startTimeline
    .to("#loader", .6,{x: "100%", ease: Power3.easeInOut}, "startAni")
    .from(".main-container", .6,{y: "-100%", ease: Power3.easeInOut}, "startAni")
    .from(".box.side", .6,{y: "100%", ease: Power3.easeInOut}, "startAni")
  }, 10020);
}

function loaderOff(){
  $('#loader').remove();
}

$(document).ready(function(){


// ---------------------------------------------------------------
// HTML HISTORY
// ---------------------------------------------------------------

window.addEventListener('popstate', function(e) {
  var state = e.state;

  if (state == null || state == "home") {
    closeSubmenu();
    navTimeline.reverse();
  } else {
    contentSwitchTimeline.add(swichtContent(state))
    contentSwitchTimeline.play();
  }
});



// ---------------------------------------------------------------
// MAIN JS
// ---------------------------------------------------------------



  $(".nav-container").accordion({
      collapsible: true,
      active: 0,
      animate: "swing",
      event: "click",
      heightStyle: "content"
  });

  $("nav h1").click(function(){
    var h1height = $(this).outerHeight();
    var index = $(this).parent().children('h1').index(this) + 1;
    $(".arrow").animate({top: (h1height * index) - (index == 1 ? 56 : 40)}, 300, "swing")
  });

  $(document).on("click", ".burger" ,function(){
    $(".burger").toggleClass('is-active');
    $(".burger-menu").toggleClass('is-active');
    $(".box.side").toggleClass('is-active');
    $(".main-container").toggleClass('is-active');
  });

  // $(document).on("click", ".imprint-trigger" ,function(){
  //   $(".imprint").toggleClass('is-active');
  //   $(".burger-menu").toggle();
  //   // $(".box.side").toggleClass('is-active');
  //   // $(".main-container").toggleClass('is-active');
  // });


  new TypeIt('.typeItCode', {
     strings: ['HTML', 'CSS', 'JAVASCRIPT', 'RUBY', 'NODEJS', 'RAILS', 'GIT', 'SQL'],
     breakLines: false,
     autoStart: true,
     cursorChar: "_",
     nextStringDelay: ["1000","2000"],
     loop: true,
     loopDelay: "1500"
  });
  new TypeIt('.loadingText', {
     breakLines: false,
     autoStart: true,
     cursorChar: "_",
     loop: false,
     loopDelay: "1500"
  })
  .type('Loading')
  .pause(500)
  .type('.')
  .pause(500)
  .type('.')
  .pause(500)
  .type('.')
  .pause(500)
  .type('.')
  .pause(500)
  .type('.')
  .pause(500)
  .type('.')
  .pause(500)
  .type('.')
  .pause(500)
  .type('.')
  .pause(500)
  .type('.');

  new TypeIt('.notFoundText', {
     breakLines: true,
     autoStart: true,
     cursorChar: "_",
     loop: false,
     loopDelay: "1500"
  })
  .type('404 - Datei nicht gefunden - ')
  .type(' hier geht`s - ')
  .type('<a href="/" >zurück!</a>')


  new TypeIt('.dankeText', {
     breakLines: true,
     autoStart: true,
     cursorChar: "_",
     loop: false,
     loopDelay: "1500",
     speed: 50
  })
  .type('Danke - Ihre Nachricht wurde erfolgreicht versendet!')
  .type(' hier geht`s - ')
  .type('<a href="/" >zurück!</a>')


  /* CONTACT FORM */

  // $('.sendform').click(function() {
  //     var $contactForm = $('#contact-form');
  //     console.log($contactForm);
  //     $contactForm.submit(function(e) {
  //       console.log(e);
  //     	e.preventDefault();
  //     	$.ajax({
  //     		url: 'https://formspree.io/info@larsknoke.com',
  //     		method: 'POST',
  //     		data: $(this).serialize(),
  //     		dataType: 'json',
  //     		beforeSend: function() {
  //     			$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
  //     		},
  //     		success: function(data) {
  //     			$contactForm.find('.alert--loading').hide();
  //     			$contactForm.append('<div class="alert alert--success">Message sent!</div>');
  //     		},
  //     		error: function(err) {
  //     			$contactForm.find('.alert--loading').hide();
  //     			$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
  //     		}
  //     	});
  //     });
  // });



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
    $(".box.side").removeClass('is-active');
    $(".main-container").removeClass('is-active');
  }

  var swichtContent = function(section){
    var contentOff = $("[class^=main-content-]");
    contentOff.fadeOut();
    var contentOn = $(".main-content-" + section);
    var anim = new TimelineLite();
    anim
      .fromTo (contentOn , 0.6, {x: "100%"}, {x:"0%",opacity:1,display:'block', ease: Power3.easeInOut})
    return anim;
  }

  var contentSwitchTimeline = new TimelineMax({paused: true});
  var navTimeline = new TimelineMax({paused: true, onReverseComplete: clearTimeline});

  function clearTimeline(){
    navTimeline.clear();
  }

  function navTlGenerator(link){
    var tablet = $(window).width() <= 768;
    var mobile = $(window).width() <= 667;
    var navTimeline = new TimelineMax();
    navTimeline
      .to(".footer", .4, {opacity: 0, ease: Power3.easeInOut}, "switch")
      .to(".nav-container", .6,{x: "-100%", ease: Power3.easeInOut}, "switch")
      .to(".main-start", .6,{x: "-100%",height: 0, opacity: 0, ease: Power3.easeInOut}, "switch+=0.3")
      .set(".main-content", { css: { position: mobile ? "relative" : "absolute" } })
      .to(".main-container", .6,{width: (tablet ? "100%" : "75%"), ease: Power3.easeInOut}, "switch+=0.3")
      .to(".box.side", .6,{width: (tablet ? "0%" : "25%"), ease: Power3.easeInOut}, "switch+=0.3")
      .to(link, .6,{opacity: 1, x: "0%", ease: Power3.easeInOut}, "switch+=0.3")
      .to(".start-side", .6,{opacity: 1, x: "100%", ease: Power3.easeInOut}, "switch+=0.3")
      .to(".main-content", .6,{opacity: 1, x: "0%", ease: Power3.easeInOut}, "switch+=0.3")
      .to(".burger", .2, {opacity: 1, x: 20})
      .to(".arrow-back", .4, {width: "30px", marginRight: "10px"})
      .to(".footer", .4, {opacity: 1, bottom: mobile ? "1rem" : "2rem"})
    return navTimeline
  }

  $(".arrow, .arrow2, .imprint-trigger").click(function(){
    history.pushState(clickedLink(), null, clickedLink());
    showContent();
    var link = $("." + clickedLink() + "-side");
    navTimeline.add(navTlGenerator(link))
    navTimeline.play();
  });

  $(".logo, .arrow-back").click(function(){
    history.pushState("home", null, "home");
    closeSubmenu();
    navTimeline.reverse();
  });


  $(".toSection").click(function(event){
    event.preventDefault();
    closeSubmenu();
    var section = $(this).attr("data-link");
    history.pushState(section, null, section);
    contentSwitchTimeline.add(swichtContent(section))
    contentSwitchTimeline.play();
  });

  $(document).on("click", ".closeMenu" ,function(){
    closeSubmenu();
  });

});
