$(document).ready(function () {
  var envelope = $("#envelope");
  var letter = $(".letter");
  var mainLink = $(".main-link");
  var isDragging = false;
  var startY, currentY, diffY;

  // Toggle open/close envelope
  envelope.click(function (e) {
    if ($(e.target).hasClass("letter") || $(e.target).parents(".letter").length)
      return;

    if (envelope.hasClass("open")) {
      closeEnvelope();
    } else {
      openEnvelope();
    }
  });

  function openEnvelope() {
    envelope.addClass("open").removeClass("close");
    envelope.stop().animate({ top: "250px" }, 600);

    letter.css({
      transform: "translateY(-100px)",
      opacity: 1,
      transition: "transform 0.8s ease, opacity 0.5s ease"
    });
    mainLink.fadeOut(300); // hide button when re-opening
  }

  function closeEnvelope() {
    envelope.addClass("close").removeClass("open");
    envelope.stop().animate({ top: "150px" }, 600);

    letter.css({
      transform: "translateY(0px)",
      opacity: 1,
      transition: "transform 0.8s ease, opacity 0.5s ease"
    });
    mainLink.fadeOut(300); // hide button when closing
  }

  // Drag the letter
  letter.on("mousedown touchstart", function (e) {
    if (!envelope.hasClass("open")) return;
    isDragging = true;
    startY = e.pageY || e.originalEvent.touches[0].pageY;
    diffY = 0;
    letter.css("transition", "none");
    e.preventDefault();
  });

  $(document).on("mousemove touchmove", function (e) {
    if (!isDragging) return;
    currentY = e.pageY || e.originalEvent.touches[0].pageY;
    diffY = currentY - startY;

    if (diffY < -200) diffY = -200;
    if (diffY > 0) diffY = 0;

    letter.css("transform", "translateY(" + diffY + "px)");

    // Fade away when pulled far
    if (diffY <= -150) {
      letter.css("opacity", 0);
    } else {
      letter.css("opacity", 1);
    }
  });

  $(document).on("mouseup touchend", function () {
    if (!isDragging) return;
    isDragging = false;

    if (diffY <= -150) {
      letter.css({
        transform: "translateY(-200px)",
        opacity: 0,
        transition: "transform 0.4s ease, opacity 0.4s ease"
      });

      // 🌸 Show button after fade away
      setTimeout(function () {
        mainLink.fadeIn(800);
      }, 600);
    } else {
      letter.css({
        transform: "translateY(-100px)",
        opacity: 1,
        transition: "transform 0.4s ease, opacity 0.4s ease"
      });
    }
  });
});