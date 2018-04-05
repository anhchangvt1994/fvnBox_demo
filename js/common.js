$(function() {
  var obj = {
    init: function() {
      this.smoothAnchor();
      this.scrollMatch();
      this.paralaxClouds();
      this.logoScroll();
      this.changeTime();
      this.setTextCopy();
    },
    smoothAnchor: function() {
      function hashScroll(hash) {
        if (hash != "" && hash != "#") {
          var target = hash + "-fvn";
          if ($(target).length > 0) {
            $(".h_inner a").removeClass("choosenTag");
            $("a[href='" + hash + "']").addClass("choosenTag");
            $("html,body").stop().animate({ scrollTop: $(target).offset().top - $(target).outerHeight(true) }, 500);
          }
        } else {
          var scrPoint = $(window).scrollTop(),
            topLimit, botLimit;
          $("[id^='box0']").each(function(id, data) {
            topLimit = $(data).offset().top - $(data).outerHeight(true);
            if (id < $("[id^='box0']").length - 1) {
              botLimit = $($("[id^='box0']")[id + 1]).offset().top - $($("[id^='box0']")[id + 1]).outerHeight(true);
            } else {
              botLimit = $("footer").offset().top + 10;
            }
            if (scrPoint >= topLimit && scrPoint < botLimit) {
              $("a[href='#" + data.id.split("-")[0] + "']").addClass("choosenTag");
            }
          })
        }
        return false;
      }
      hashScroll(location.hash);
      $(".h_inner a").on("click touchstart", function() {
        var hashTag = "#" + $(this).attr("href").split("#")[$(this).attr("href").split("#").length - 1];
        hashScroll(hashTag);
      });
    },
    scrollMatch: function() {
      $(window).on("scroll", function(e) {
        $(".h_inner a").removeClass("choosenTag");
        var scrPoint = $(window).scrollTop(),
          topLimit, botLimit;
        $("[id^='box0']").each(function(id, data) {
          topLimit = $(data).offset().top - $(data).outerHeight(true);
          if (id < $("[id^='box0']").length - 1) {
            botLimit = $($("[id^='box0']")[id + 1]).offset().top - $($("[id^='box0']")[id + 1]).outerHeight(true);
          } else {
            botLimit = $("footer").offset().top + 10;
          }
          if (scrPoint >= topLimit && scrPoint < botLimit) {
            $("a[href='#" + data.id.split("-")[0] + "']").addClass("choosenTag");
            return false;
          }
        })
      })
    },
    paralaxClouds: function() {
      var timer = Math.floor(Math.random() * (10000 - 5000) + 5000),
        distance01 = (Math.random() * (3500 - 3000) + 2000),
        distance02 = (Math.random() * (3500 - 3000) + 2000),
        distance03 = (Math.random() * (3500 - 3000) + 2000),
        distance04 = (Math.random() * (3500 - 3000) + 2000),
        rd01, rd02, rd03, rd04, topCloud01, topCloud02, leftCloud01, leftCloud02,
        isScrolling;
      setCordClouds();

      function autoRun() {
        return setInterval(function() {
          timer = Math.floor(Math.random() * (10000 - 5000) + 5000);
          distance01 = (Math.random() * (3500 - 3000) + 2000),
            distance02 = (Math.random() * (3500 - 3000) + 2000),
            distance03 = (Math.random() * (3500 - 3000) + 2000),
            distance04 = (Math.random() * (3500 - 3000) + 2000),
            setCordClouds();
        }, timer);
      }
      var interval = autoRun();

      function setCordClouds() {
        rd01 = (Math.random() * (3 - 0.0100) + 0.0100).toFixed(4),
          rd02 = (Math.random() * (3 - 0.0100) + 0.0100).toFixed(4),
          rd03 = (Math.random() * (3 - 0.0100) + 0.0100).toFixed(4),
          rd04 = (Math.random() * (3 - 0.0100) + 0.0100).toFixed(4);
        topCloud01 = -(distance01 * parseFloat(rd01)),
          topCloud02 = -(distance02 * parseFloat(rd02)),
          leftCloud01 = distance03 * parseFloat(rd03),
          leftCloud02 = -(distance04 * parseFloat(rd04));
        $('#main').css("backgroundPosition", leftCloud01 + "px " + topCloud01 + "px ," + leftCloud02 + "px " + topCloud02 + "px");
      }
      $(window).on("scroll", function() {
        clearInterval(interval);
        distance01 = (Math.random() * (3500 - 3000) + 2000),
          distance02 = (Math.random() * (3500 - 3000) + 2000),
          distance03 = (Math.random() * (3500 - 3000) + 2000),
          distance04 = (Math.random() * (3500 - 3000) + 2000),
          setCordClouds();
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
          timer = Math.floor(Math.random() * (10000 - 5000) + 5000);
          interval = autoRun();
        }, 66);
      })
    },
    logoScroll: function() {
      $(window).on("scroll resize load", function() {
        if ($(this).outerWidth(true) > 640) {
          $(".logoTxt").removeAttr("style");
        } else {
          $(".logoTxt").offset({ top: 30 - ($(this).scrollTop() * 0.5) });
        }
      })
    },
    changeTime: function() {
      var currentdate = new Date();

      function checkHours() {
        if (currentdate.getHours() >= 19) {
          $("#main").removeClass("afternoonBg morningBg");
          $("#main").addClass("nightBg");
        } else if (currentdate.getHours() >= 14) {
          $("#main").removeClass("nightBg morningBg");
          $("#main").addClass("afternoonBg");
        } else {
          $("#main").removeClass("nightBg afternoonBg");
          $("#main").addClass("morningBg");
        }
      }
      checkHours();
      setInterval(function() {
        checkHours();
      }, 1000);
    },
    setTextCopy: function() {
      document.addEventListener("copy", function(e) {
        console.log($($(e.target).parent())[0].className);
        if($($(e.target).parent())[0].className == "codeDemo") {
          var txt = window.getSelection().toString();
          var clipboard = e.clipboardData || window.clipboardData || e.originalEvent.clipboardData;          
          clipboard.setData("text/plain",txt.replace(/\s/g, ''));
          e.preventDefault();
        }
      })
    }
  };
  obj.init();
})