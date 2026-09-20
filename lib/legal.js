/* Conmutador de idioma para las paginas legales.
   No usa translations.js: el texto legal vive completo en el HTML, en dos
   bloques, porque partirlo en claves sueltas hace imposible revisarlo. */
(function () {
  "use strict";

  var toggle = document.getElementById("lang-toggle");
  var cur    = toggle && toggle.querySelector(".lang-toggle-current");
  var oth    = toggle && toggle.querySelector(".lang-toggle-other");

  function apply(lang) {
    document.documentElement.lang = lang;

    Array.prototype.forEach.call(
      document.querySelectorAll("[data-lang-block]"),
      function (el) { el.hidden = el.getAttribute("data-lang-block") !== lang; }
    );

    if (cur && oth) {
      cur.textContent = lang === "en" ? "EN" : "ES";
      oth.textContent = lang === "en" ? "ES" : "EN";
    }

    try { localStorage.setItem("og-lang", lang); } catch (e) {}
  }

  // Abre en el idioma que el visitante venia leyendo en el sitio.
  var stored = "en";
  try { stored = localStorage.getItem("og-lang") || "en"; } catch (e) {}
  apply(stored === "es" ? "es" : "en");

  if (toggle) {
    toggle.addEventListener("click", function () {
      apply(document.documentElement.lang === "en" ? "es" : "en");
    });
  }
})();
