jQuery(document).ready(function ($) {
  /**
   * $('#form-page').ajaxForm(function () {
    $("#form-page")[0].reset();
    alert('Perfeito! Vou te responder o mais rápido possível.');
  });
   */
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#0"]')
    .not('[href="#carouselIndicators"]')
    .click(function (event) {
      var target = $(this.hash);
      if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
      if (target.length == 0) target = $('html');
      $('html, body').animate({
        scrollTop: target.offset().top - 145
      }, 600);
      return false;
    });
});