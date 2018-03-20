$(document).ready(function(){
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

  $(".arrow").click(function(){
    // setTimeout(function () {
    //     $(".burger").addClass('is-active');
    // }, 1000);
    $(".box.side").css({"flex":"30%"});
    $(".box.main-start").css({"flex":"70%"});
    // $(".box.main-start").addClass("active");

    // anime({
    //   targets: ".box.main-start",
    //   backgroundColor: '#42BE9A',
    //   // color: "#222222",
    //   duration: 400,
    //   easing: [.6,.03,.2,1],
    //   // delay: 700
    // });
    anime({
      targets: ".start-side",
      translateX: 100,
      duration: 600,
      easing: [.6,.03,.2,1],
      opacity: 0,
      delay: 600
    });
    anime({
      targets: ".design-side",
      translateX: 0,
      opacity: 1,
      duration: 600,
      easing: [.6,.03,.2,1],
      // scale: [1.1,1],
      delay: 600
    });
    anime({
      targets: ".arrow",
      translateX: "200px",
      delay: 0,
      // easing: [.6,.03,.2,1],
      scale: [1,.3]
    });
    anime({
      targets: ".nav-container",
      translateX: -100,
      delay: 300,
      duration: 600,
      easing: [.6,.03,.2,1]
    });
    anime({
      targets: ".main-start",
      translateX: "-100%",
      delay: 600,
      duration: 600,
      easing: [.6,.03,.2,1],
      opacity: 0
    });
    anime({
      targets: ".box.main-content",
      translateX: 0,
      delay: 700,
      duration: 600,
      easing: [.6,.03,.2,1],
      opacity: 1
    });
    anime({
      targets: ".burger",
      translateX: [100,0],
      delay: 1000,
      duration: 400,
      easing: [.6,.03,.2,1],
      opacity: 1
    });

  });

  $(document).on("click", ".logo", function(){
    toStart();
  })

  var toStart = function(){
    anime({
      targets: ".box.main-content",
      translateX: "100%",
      duration: 600,
      easing: [.6,.03,.2,1],
      opacity: 1
    });
    anime({
      targets: ".main-start",
      translateX: 0,
      // delay: 600,
      duration: 600,
      easing: [.6,.03,.2,1],
      opacity: 1
    });
    anime({
      targets: ".start-side",
      translateX: 0,
      duration: 600,
      easing: [.6,.03,.2,1],
      opacity: 1,
      delay: 600
    });
    anime({
      targets: ".design-side",
      translateX: -100,
      opacity: 1,
      duration: 600,
      easing: [.6,.03,.2,1],
      // scale: [1.1,1],
      delay: 600
    });
    anime({
      targets: ".arrow",
      translateX: 0,
      delay: 0,
      easing: [.6,.03,.2,1]
      // scale: [.8,1]
    });
    anime({
      targets: ".nav-container",
      translateX: 0,
      delay: 300,
      duration: 600,
      easing: [.6,.03,.2,1]
    });
  }



});
