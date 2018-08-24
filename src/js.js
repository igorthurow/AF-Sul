// Importo via AJAX o footer e o topo.
(function () {
  var getURL = (url, success, error) => {
    if (!window.XMLHttpRequest) return;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status !== 200) {
          if (error && typeof error === 'function') {
            error(request.responseText, request);
          }
          return;
        }
        if (success && typeof success === 'function') {
          success(request.responseText, request);
        }
      }
    };
    request.open('GET', url);
    request.send();
  };
  // Passa o caminho dos imports com algumas alterações caso seja a home.
  getURL(
    './imports.html',
    function (data) {
      ['.navbar', '.footer'].map((importClass) => {
        var el = document.createElement(el);
        el.innerHTML = data;
        const fetch = el.querySelector(importClass);
        const embed = document.querySelector(importClass);
        if (!fetch || !embed) return;
        if (!document.querySelector('.index-nav')) {
          const optionalChild = el.querySelector('.navbar-nav');
          Array.from(optionalChild.childNodes).map(
            (child) => {
              if (child.classList.contains('nav-index')) {
                optionalChild.removeChild(child)
              }
            });
        } else {
          ['.navbar-brand', '.nav-home'].map((classOfLink) =>
            el.querySelector(classOfLink).href = '#'
          )
        }
        embed.innerHTML = fetch.innerHTML;
      })
    }
  );
})();

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