(function () {
  "use strict";

  var shop = window.LeeAnnShop;
  if (!shop) return;

  var page = document.body.getAttribute("data-page");

  function card(product) {
    return (
      '<article class="product-card" data-category="' +
      product.category +
      '">' +
      '<a href="product.html?id=' +
      product.id +
      '"><img class="product-photo" src="' +
      product.image +
      '" alt="' +
      product.imageAlt +
      '"></a>' +
      '<div class="product-body"><div class="eyebrow">' +
      product.categoryLabel +
      "</div>" +
      "<h3><a href=\"product.html?id=" +
      product.id +
      '">' +
      product.name +
      "</a></h3>" +
      "<p>" +
      product.blurb +
      "</p>" +
      '<div class="product-actions">' +
      '<button type="button" class="btn btn-primary" data-add="' +
      product.id +
      '">Add to cart</button>' +
      '<a class="btn btn-line" href="product.html?id=' +
      product.id +
      '">Details</a>' +
      "</div></div></article>"
    );
  }

  function bindAdd(root) {
    root.querySelectorAll("[data-add]").forEach(function (button) {
      button.addEventListener("click", function () {
        shop.addToCart(button.getAttribute("data-add"), 1);
        var previous = button.textContent;
        button.textContent = "Added";
        window.setTimeout(function () {
          button.textContent = previous;
        }, 900);
      });
    });
  }

  function renderFeatured() {
    var root = document.querySelector("[data-featured]");
    if (!root) return;
    root.innerHTML = shop.products
      .filter(function (product) {
        return product.featured;
      })
      .map(card)
      .join("");
    bindAdd(root);
  }

  function renderCatalog() {
    var root = document.querySelector("[data-catalog]");
    var filters = document.querySelector("[data-filters]");
    if (!root || !filters) return;
    var params = new URLSearchParams(window.location.search);
    var active = params.get("cat") || "all";

    function paint() {
      var category = shop.categories.find(function (item) {
        return item.id === active;
      });
      var photo = document.querySelector("[data-hero-photo]");
      var kicker = document.querySelector("[data-hero-kicker]");
      var title = document.querySelector("[data-hero-title]");
      var copy = document.querySelector("[data-hero-copy]");
      if (category) {
        if (photo) {
          photo.src = category.image;
          photo.alt = category.imageAlt;
        }
        if (kicker) kicker.textContent = "Service " + category.number;
        if (title) title.textContent = category.name;
        if (copy) copy.textContent = category.blurb;
        document.title = category.name + " | Lee Ann Catalogue";
      } else {
        if (photo) {
          photo.src = "assets/hero.jpg";
          photo.alt = "City skyline at dusk";
        }
        if (kicker) kicker.textContent = "Catalogue";
        if (title) title.textContent = "Every service the group offers.";
        if (copy) copy.textContent = "The same services as the five divisions. Prices are not shown yet.";
        document.title = "Catalogue | Lee Ann Catalogue";
      }
      var list =
        active === "all"
          ? shop.products
          : shop.products.filter(function (product) {
              return product.category === active;
            });
      root.innerHTML = list.length
        ? list.map(card).join("")
        : '<p class="notice">Nothing in this category yet.</p>';
      bindAdd(root);
      filters.querySelectorAll("button").forEach(function (button) {
        button.classList.toggle("is-active", button.getAttribute("data-cat") === active);
      });
    }

    filters.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-cat]");
      if (!button) return;
      active = button.getAttribute("data-cat");
      var next = active === "all" ? "shop.html" : "shop.html?cat=" + active;
      window.history.replaceState(null, "", next);
      paint();
    });

    paint();
  }

  function renderProduct() {
    var root = document.querySelector("[data-product]");
    if (!root) return;
    var id = new URLSearchParams(window.location.search).get("id");
    var product = id ? shop.findProduct(id) : null;
    if (!product) {
      root.innerHTML =
        '<div class="empty-state"><h1>Service not found</h1><p>That service is not in the catalogue.</p><a class="btn btn-primary" href="shop.html">Back to the catalogue</a></div>';
      return;
    }
    document.title = product.name + " | Lee Ann Catalogue";
    var related = shop.products
      .filter(function (item) {
        return item.category === product.category && item.id !== product.id;
      })
      .slice(0, 3);
    root.innerHTML =
      '<div class="split product-layout">' +
      '<img class="product-photo large" src="' +
      product.image +
      '" alt="' +
      product.imageAlt +
      '">' +
      "<div><div class=\"eyebrow\">" +
      product.categoryLabel +
      "</div><h1>" +
      product.name +
      '</h1><p class="notice">' +
      product.description +
      '</p><div class="product-actions"><div class="qty" data-qty><button type="button" data-qty-down aria-label="Decrease quantity">−</button><span data-qty-value>1</span><button type="button" data-qty-up aria-label="Increase quantity">+</button></div><button type="button" class="btn btn-primary" data-add-qty>Add to cart</button></div><p class="notice">A quote follows once the scope is confirmed.</p></div></div>' +
      (related.length
        ? '<div class="section-pad" style="padding-bottom:0"><div class="eyebrow">Related</div><h2>More in ' +
          product.categoryLabel +
          '</h2><div class="product-grid">' +
          related.map(card).join("") +
          "</div></div>"
        : "");
    var qty = 1;
    var value = root.querySelector("[data-qty-value]");
    root.querySelector("[data-qty-down]").addEventListener("click", function () {
      qty = Math.max(1, qty - 1);
      value.textContent = String(qty);
    });
    root.querySelector("[data-qty-up]").addEventListener("click", function () {
      qty += 1;
      value.textContent = String(qty);
    });
    root.querySelector("[data-add-qty]").addEventListener("click", function (event) {
      var button = event.currentTarget;
      shop.addToCart(product.id, qty);
      button.textContent = "Added";
      window.setTimeout(function () {
        button.textContent = "Add to cart";
      }, 900);
    });
    bindAdd(root);
  }

  function renderCart() {
    var root = document.querySelector("[data-cart]");
    if (!root) return;
    var items = shop.readCart();
    if (!items.length) {
      root.innerHTML =
        '<div class="empty-state"><h2>Your cart is empty</h2><p>Add a service from the catalogue.</p><a class="btn btn-primary" href="shop.html">Browse the catalogue</a></div>';
      return;
    }
    var lines = items
      .map(function (item) {
        var product = shop.findProduct(item.id);
        if (!product) return "";
        return (
          '<div class="cart-line"><div><h3><a href="product.html?id=' +
          product.id +
          '">' +
          product.name +
          "</a></h3><p>" +
          product.categoryLabel +
          "</p><button type=\"button\" class=\"link-quiet\" data-remove=\"" +
          product.id +
          '">Remove</button></div><div class="qty"><button type="button" data-dec="' +
          product.id +
          '" aria-label="Decrease quantity">−</button><span>' +
          item.qty +
          '</span><button type="button" data-inc="' +
          product.id +
          '" aria-label="Increase quantity">+</button></div></div>'
        );
      })
      .join("");
    root.innerHTML =
      '<div class="split contact"><div>' +
      lines +
      '</div><aside class="summary-card"><div class="eyebrow">Summary</div><h2>Your request</h2><p class="notice">Pricing is not shown yet. Send the list and the team will confirm scope before a quote.</p><a class="btn btn-primary" href="checkout.html" style="margin-top:1rem">Checkout</a></aside></div>';
    root.querySelectorAll("[data-inc]").forEach(function (button) {
      button.addEventListener("click", function () {
        var id = button.getAttribute("data-inc");
        var current = shop.readCart().find(function (item) {
          return item.id === id;
        });
        shop.setQty(id, (current ? current.qty : 0) + 1);
        renderCart();
      });
    });
    root.querySelectorAll("[data-dec]").forEach(function (button) {
      button.addEventListener("click", function () {
        var id = button.getAttribute("data-dec");
        var current = shop.readCart().find(function (item) {
          return item.id === id;
        });
        shop.setQty(id, (current ? current.qty : 1) - 1);
        renderCart();
      });
    });
    root.querySelectorAll("[data-remove]").forEach(function (button) {
      button.addEventListener("click", function () {
        shop.removeItem(button.getAttribute("data-remove"));
        renderCart();
      });
    });
  }

  function renderCheckout() {
    var root = document.querySelector("[data-checkout]");
    var form = document.querySelector("[data-checkout-form]");
    if (!root || !form) return;

    function paintSummary() {
      var items = shop.readCart();
      var card = form.closest(".form-card");
      if (!items.length) {
        root.innerHTML =
          '<div class="empty-state"><h2>Nothing to check out</h2><p>Your cart is empty.</p><a class="btn btn-primary" href="shop.html">Browse the catalogue</a></div>';
        if (card) card.hidden = true;
        return;
      }
      if (card) card.hidden = false;
      root.innerHTML = items
        .map(function (item) {
          var product = shop.findProduct(item.id);
          if (!product) return "";
          return (
            '<div class="summary-row"><span>' +
            item.qty +
            " × " +
            product.name +
            "</span><span>" +
            product.categoryLabel +
            "</span></div>"
          );
        })
        .join("") +
        '<p class="notice">Pricing is not shown yet. A quote follows once the scope is confirmed.</p>';
    }

    paintSummary();

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var items = shop.readCart();
      if (!items.length) {
        paintSummary();
        return;
      }
      var data = new FormData(form);
      var name = String(data.get("name") || "");
      var email = String(data.get("email") || "");
      var phone = String(data.get("phone") || "");
      var company = String(data.get("company") || "");
      var address = String(data.get("address") || "");
      var notes = String(data.get("notes") || "");
      var lines = items
        .map(function (item) {
          var product = shop.findProduct(item.id);
          if (!product) return "";
          return item.qty + " × " + product.name + " (" + product.categoryLabel + ")";
        })
        .filter(Boolean)
        .join("\n");
      var subject = "Service request from " + name;
      var text =
        "Name: " +
        name +
        "\nEmail: " +
        email +
        "\nPhone: " +
        phone +
        "\nCompany: " +
        company +
        "\nSite or address: " +
        address +
        "\n\nServices:\n" +
        lines +
        (notes ? "\n\nNotes: " + notes : "");
      var wa = "https://wa.me/27660023685?text=" + encodeURIComponent(text);
      var mailto =
        "mailto:tsheposelomob@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(text);
      var note = document.querySelector("[data-checkout-note]");
      var opened = window.open(wa, "_blank", "noopener,noreferrer");
      if (note) {
        note.replaceChildren();
        note.append(
          opened
            ? "WhatsApp should open with this request. If it does not, "
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
        note.append(waLink, " or ", mailLink, ". We will confirm scope before a quote.");
      }
    });
  }

  if (page === "home") renderFeatured();
  if (page === "shop") renderCatalog();
  if (page === "product") renderProduct();
  if (page === "cart") renderCart();
  if (page === "checkout") renderCheckout();
})();
