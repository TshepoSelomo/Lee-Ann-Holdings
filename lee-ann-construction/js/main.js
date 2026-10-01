(function () {
  "use strict";

  var toggle = document.querySelector("[data-nav-toggle]");
  var menu = document.querySelector("[data-nav-mobile]");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = !menu.classList.contains("is-open");
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "×" : "≡";
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "≡";
      });
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  function showEnquiry(form, wa, mailto, opened) {
    var note = form.querySelector("[data-form-status]");
    if (!note) {
      note = document.createElement("p");
      note.className = "form-note";
      note.setAttribute("data-form-status", "");
      form.appendChild(note);
    }
    note.replaceChildren();
    note.append(
      opened
        ? "WhatsApp should open with your message. If it does not, "
        : "Your browser blocked the new tab. "
    );
    var waLink = document.createElement("a");
    waLink.href = wa;
    waLink.target = "_blank";
    waLink.rel = "noopener";
    waLink.textContent = "send it on WhatsApp";
    waLink.style.textDecoration = "underline";
    waLink.style.fontWeight = "600";
    var mailLink = document.createElement("a");
    mailLink.href = mailto;
    mailLink.textContent = "open it in email";
    mailLink.style.textDecoration = "underline";
    mailLink.style.fontWeight = "600";
    note.append(waLink, " or ", mailLink, ".");
  }

  document.querySelectorAll("[data-contact-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var company = String(data.get("company") || "").trim();
      var service = String(data.get("service") || data.get("division") || "").trim();
      var message = String(data.get("message") || "").trim();
      var email = form.getAttribute("data-email") || "tsheposelomob@gmail.com";
      var label = form.getAttribute("data-subject") || "Website enquiry";
      var subject = label + (service ? " — " + service : "") + (name ? " from " + name : "");
      var text =
        "Name: " +
        name +
        "\nCompany: " +
        company +
        (service ? "\nService: " + service : "") +
        "\n\n" +
        message;
      var wa = "https://wa.me/27660023685?text=" + encodeURIComponent(text);
      var mailto =
        "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text);
      var opened = window.open(wa, "_blank", "noopener,noreferrer");
      showEnquiry(form, wa, mailto, !!opened);
    });
  });
})();

(function () {
  if (document.querySelector("script[data-talkto-src]")) return;
  var current = document.currentScript;
  if (!current) return;
  var script = document.createElement("script");
  script.src = new URL("../../shared/talkto.js", current.src).href;
  script.setAttribute("data-talkto-src", "");
  document.body.appendChild(script);
})();
