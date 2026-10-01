(function () {
  "use strict";

  if (document.querySelector("[data-talkto]")) return;

  var PHONE_DISPLAY = "066 002 3685";
  var PHONE_TEL = "+27660023685";
  var WHATSAPP = "27660023685";
  var EMAIL = "tsheposelomob@gmail.com";

  var style = document.createElement("style");
  style.textContent =
    ".talkto{position:fixed;right:1rem;bottom:1rem;z-index:80;font-family:\"IBM Plex Sans\",system-ui,sans-serif}" +
    ".talkto-toggle{border:0;background:var(--primary,oklch(24% 0.055 265));color:var(--primary-foreground,oklch(97% 0.01 250));padding:0.7rem 1.05rem;font:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;box-shadow:0 10px 28px color-mix(in oklch,var(--navy-deep,oklch(24% 0.055 265)) 28%,transparent)}" +
    ".talkto-panel{position:absolute;right:0;bottom:calc(100% + 0.6rem);width:min(20rem,calc(100vw - 2rem));border:1px solid var(--border,oklch(90% 0.015 250));background:var(--background,oklch(98.5% 0.004 250));color:var(--foreground,oklch(24% 0.055 265));padding:1rem;box-shadow:0 16px 40px color-mix(in oklch,var(--navy-deep,oklch(24% 0.055 265)) 18%,transparent)}" +
    ".talkto-panel[hidden]{display:none}" +
    ".talkto-kicker{font-size:0.7rem;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--accent,oklch(55% 0.09 250))}" +
    ".talkto-panel h2{margin:0.35rem 0 0;font-family:\"Libre Baskerville\",Georgia,serif;font-size:1.25rem;line-height:1.25}" +
    ".talkto-panel p{margin:0.45rem 0 0;font-size:0.8rem;line-height:1.5;color:var(--muted-foreground,oklch(47% 0.03 258))}" +
    ".talkto-panel label{display:block;margin-top:0.85rem;font-size:0.7rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted-foreground,oklch(47% 0.03 258))}" +
    ".talkto-panel textarea{display:block;width:100%;margin-top:0.35rem;border:1px solid var(--input,oklch(90% 0.015 250));background:var(--card,#fff);color:inherit;padding:0.55rem 0.65rem;font:inherit;font-size:0.875rem;line-height:1.45;resize:vertical}" +
    ".talkto-actions{display:flex;flex-direction:column;gap:0.45rem;margin-top:0.85rem}" +
    ".talkto-actions button,.talkto-actions a{display:block;border:1px solid var(--primary,oklch(24% 0.055 265));background:var(--primary,oklch(24% 0.055 265));color:var(--primary-foreground,oklch(97% 0.01 250));padding:0.55rem 0.75rem;font:inherit;font-size:0.8rem;font-weight:600;text-align:center;cursor:pointer}" +
    ".talkto-actions .talkto-line{border-color:var(--border,oklch(90% 0.015 250));background:transparent;color:var(--foreground,oklch(24% 0.055 265))}";
  document.head.appendChild(style);

  var root = document.createElement("div");
  root.className = "talkto";
  root.setAttribute("data-talkto", "");
  root.innerHTML =
    '<div class="talkto-panel" id="talkto-panel" role="dialog" aria-label="Talk to Lee Ann" hidden>' +
    '<div class="talkto-kicker">Lee Ann Holdings</div>' +
    "<h2>Talk to us</h2>" +
    "<p>Send a message on WhatsApp or email, or call " +
    PHONE_DISPLAY +
    ".</p>" +
    '<label>Message<textarea rows="3" data-talkto-message placeholder="What do you need?"></textarea></label>' +
    '<div class="talkto-actions">' +
    '<button type="button" data-talkto-whatsapp>Send on WhatsApp</button>' +
    '<button type="button" class="talkto-line" data-talkto-email>Send by email</button>' +
    '<a class="talkto-line" href="tel:' +
    PHONE_TEL +
    '">Call ' +
    PHONE_DISPLAY +
    "</a>" +
    "</div></div>" +
    '<button type="button" class="talkto-toggle" data-talkto-toggle aria-expanded="false" aria-controls="talkto-panel">Talk to</button>';
  document.body.appendChild(root);

  var panel = root.querySelector(".talkto-panel");
  var toggle = root.querySelector("[data-talkto-toggle]");
  var message = root.querySelector("[data-talkto-message]");

  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Talk to";
    if (open) message.focus();
  }

  function messageText() {
    var text = message.value.trim();
    if (!text) text = "Hello, I would like to talk about Lee Ann Holdings.";
    return text + "\n\nPage: " + document.title;
  }

  toggle.addEventListener("click", function () {
    setOpen(panel.hidden);
  });

  root.querySelector("[data-talkto-whatsapp]").addEventListener("click", function () {
    var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(messageText());
    window.open(url, "_blank", "noopener");
  });

  root.querySelector("[data-talkto-email]").addEventListener("click", function () {
    var subject = encodeURIComponent("Message from the Lee Ann website");
    var body = encodeURIComponent(messageText());
    window.location.href = "mailto:" + EMAIL + "?subject=" + subject + "&body=" + body;
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) setOpen(false);
  });

  document.addEventListener("click", function (event) {
    if (!panel.hidden && !root.contains(event.target)) setOpen(false);
  });
})();
