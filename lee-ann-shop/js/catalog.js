(function (global) {
  "use strict";

  var STORAGE_KEY = "lee-ann-shop-cart";

  var categories = [
    {
      id: "transportation",
      number: "01",
      name: "Transportation",
      blurb: "Road freight, fleet management and logistics that keep goods moving — on schedule, every time.",
      image: "assets/transportation.jpg",
      imageAlt: "Freight trucks on a highway at golden hour",
    },
    {
      id: "technology",
      number: "02",
      name: "Technology",
      blurb: "Practical IT infrastructure, software and connectivity solutions that modernise how you operate.",
      image: "assets/technology.jpg",
      imageAlt: "Professionals working at data screens in a modern operations room",
    },
    {
      id: "supply-procurement",
      number: "03",
      name: "Supply & Procurement",
      blurb: "Strategic sourcing, supplier management and distribution that secure the right goods at the right price.",
      image: "assets/supply.jpg",
      imageAlt: "Organized logistics warehouse with stacked pallets and a forklift",
    },
    {
      id: "gas-aircon",
      number: "04",
      name: "Gas & Aircon",
      blurb: "HVAC and gas installations, servicing and compliance certification for homes and businesses.",
      image: "assets/gas-aircon.jpg",
      imageAlt: "Technician installing a wall-mounted air conditioning unit",
    },
    {
      id: "construction",
      number: "05",
      name: "Construction",
      blurb: "Building and civil works delivered with quality, safety and cost certainty from groundbreak to handover.",
      image: "assets/construction.jpg",
      imageAlt: "Construction site with a tower crane and steel structure at dusk",
    },
  ];

  var products = [
    {
      id: "road-freight",
      name: "Road freight & haulage",
      category: "transportation",
      categoryLabel: "Transportation",
      featured: true,
      blurb: "Full and part-load road transport for general freight, building materials and equipment, locally and regionally.",
      description:
        "Full and part-load road transport for general freight, building materials and equipment, locally and regionally. Requested from the Transportation division of Lee Ann Holdings.",
    },
    {
      id: "fleet-management",
      name: "Fleet management",
      category: "transportation",
      categoryLabel: "Transportation",
      featured: false,
      blurb: "Vehicle maintenance, compliance, tracking and driver management for owned and contracted fleets.",
      description:
        "Vehicle maintenance, compliance, tracking and driver management for owned and contracted fleets. Requested from the Transportation division of Lee Ann Holdings.",
    },
    {
      id: "scheduled-transport",
      name: "Contract & scheduled transport",
      category: "transportation",
      categoryLabel: "Transportation",
      featured: false,
      blurb: "Recurring route contracts and scheduled deliveries for businesses that need reliable weekly capacity.",
      description:
        "Recurring route contracts and scheduled deliveries for businesses that need reliable weekly capacity. Requested from the Transportation division of Lee Ann Holdings.",
    },
    {
      id: "project-logistics",
      name: "Project logistics",
      category: "transportation",
      categoryLabel: "Transportation",
      featured: false,
      blurb: "Coordinated movement of materials and plant for construction and multi-site projects, timed to the programme.",
      description:
        "Coordinated movement of materials and plant for construction and multi-site projects, timed to the programme. Requested from the Transportation division of Lee Ann Holdings.",
    },
    {
      id: "it-infrastructure",
      name: "IT infrastructure & support",
      category: "technology",
      categoryLabel: "Technology",
      featured: true,
      blurb: "Servers, workstations, Wi-Fi and structured cabling — supplied, installed and supported on call-out or contract.",
      description:
        "Servers, workstations, Wi-Fi and structured cabling — supplied, installed and supported on call-out or contract. Requested from the Technology division of Lee Ann Holdings.",
    },
    {
      id: "software-systems",
      name: "Software & systems",
      category: "technology",
      categoryLabel: "Technology",
      featured: false,
      blurb: "Business software setup, systems integration and process automation that removes manual work.",
      description:
        "Business software setup, systems integration and process automation that removes manual work. Requested from the Technology division of Lee Ann Holdings.",
    },
    {
      id: "connectivity",
      name: "Connectivity & networking",
      category: "technology",
      categoryLabel: "Technology",
      featured: false,
      blurb: "Internet connectivity, VPNs and multi-site networking to keep branches and remote teams connected.",
      description:
        "Internet connectivity, VPNs and multi-site networking to keep branches and remote teams connected. Requested from the Technology division of Lee Ann Holdings.",
    },
    {
      id: "security-backup",
      name: "Security & backup",
      category: "technology",
      categoryLabel: "Technology",
      featured: false,
      blurb: "Cybersecurity essentials, access control and managed backups so your business can recover when it matters.",
      description:
        "Cybersecurity essentials, access control and managed backups so your business can recover when it matters. Requested from the Technology division of Lee Ann Holdings.",
    },
    {
      id: "strategic-sourcing",
      name: "Strategic sourcing & tendering",
      category: "supply-procurement",
      categoryLabel: "Supply & Procurement",
      featured: true,
      blurb: "Supplier identification, quote comparison and tender support with full paper trails and compliant processes.",
      description:
        "Supplier identification, quote comparison and tender support with full paper trails and compliant processes. Requested from the Supply & Procurement division of Lee Ann Holdings.",
    },
    {
      id: "contract-management",
      name: "Supplier & contract management",
      category: "supply-procurement",
      categoryLabel: "Supply & Procurement",
      featured: false,
      blurb: "Ongoing management of supplier performance, pricing, delivery terms and contract renewals.",
      description:
        "Ongoing management of supplier performance, pricing, delivery terms and contract renewals. Requested from the Supply & Procurement division of Lee Ann Holdings.",
    },
    {
      id: "warehousing",
      name: "Warehousing & distribution",
      category: "supply-procurement",
      categoryLabel: "Supply & Procurement",
      featured: false,
      blurb: "Stock holding, order fulfilment and last-mile distribution for businesses without their own warehouse.",
      description:
        "Stock holding, order fulfilment and last-mile distribution for businesses without their own warehouse. Requested from the Supply & Procurement division of Lee Ann Holdings.",
    },
    {
      id: "project-procurement",
      name: "Project procurement",
      category: "supply-procurement",
      categoryLabel: "Supply & Procurement",
      featured: false,
      blurb: "Bulk buying and coordinated delivery of materials and equipment for construction and multi-division projects.",
      description:
        "Bulk buying and coordinated delivery of materials and equipment for construction and multi-division projects. Requested from the Supply & Procurement division of Lee Ann Holdings.",
    },
    {
      id: "aircon-install",
      name: "Air conditioning supply & install",
      category: "gas-aircon",
      categoryLabel: "Gas & Aircon",
      featured: true,
      blurb: "Split, cassette and ducted systems for homes, offices and retail — correctly sized and cleanly installed.",
      description:
        "Split, cassette and ducted systems for homes, offices and retail — correctly sized and cleanly installed. Requested from the Gas & Aircon division of Lee Ann Holdings.",
    },
    {
      id: "hvac-servicing",
      name: "Servicing & maintenance",
      category: "gas-aircon",
      categoryLabel: "Gas & Aircon",
      featured: false,
      blurb: "Planned servicing, deep cleaning and repairs for aircon, ventilation and refrigeration equipment.",
      description:
        "Planned servicing, deep cleaning and repairs for aircon, ventilation and refrigeration equipment. Requested from the Gas & Aircon division of Lee Ann Holdings.",
    },
    {
      id: "gas-installations",
      name: "Gas installations",
      category: "gas-aircon",
      categoryLabel: "Gas & Aircon",
      featured: false,
      blurb: "LPG installations for heating, cooking and backup — installed by qualified technicians to regulation.",
      description:
        "LPG installations for heating, cooking and backup — installed by qualified technicians to regulation. Requested from the Gas & Aircon division of Lee Ann Holdings.",
    },
    {
      id: "gas-compliance",
      name: "Compliance certification",
      category: "gas-aircon",
      categoryLabel: "Gas & Aircon",
      featured: false,
      blurb: "Certificates of conformity (COC) for gas installations, plus inspections for insurance and property sales.",
      description:
        "Certificates of conformity (COC) for gas installations, plus inspections for insurance and property sales. Requested from the Gas & Aircon division of Lee Ann Holdings.",
    },
    {
      id: "residential-construction",
      name: "Residential construction",
      category: "construction",
      categoryLabel: "Construction",
      featured: true,
      blurb: "New homes, extensions and structural alterations — managed from plans and approvals to final handover.",
      description:
        "New homes, extensions and structural alterations — managed from plans and approvals to final handover. Requested from the Construction division of Lee Ann Holdings.",
    },
    {
      id: "commercial-construction",
      name: "Commercial construction",
      category: "construction",
      categoryLabel: "Construction",
      featured: false,
      blurb: "Office, retail and industrial builds and fit-outs, delivered to programme with professional site management.",
      description:
        "Office, retail and industrial builds and fit-outs, delivered to programme with professional site management. Requested from the Construction division of Lee Ann Holdings.",
    },
    {
      id: "civil-works",
      name: "Civil works & infrastructure",
      category: "construction",
      categoryLabel: "Construction",
      featured: false,
      blurb: "Earthworks, concrete structures, paving, drainage and site preparation for private and public clients.",
      description:
        "Earthworks, concrete structures, paving, drainage and site preparation for private and public clients. Requested from the Construction division of Lee Ann Holdings.",
    },
    {
      id: "renovations",
      name: "Renovations & project management",
      category: "construction",
      categoryLabel: "Construction",
      featured: false,
      blurb: "Renovations, refurbishments and turnkey project management with transparent costing and reporting.",
      description:
        "Renovations, refurbishments and turnkey project management with transparent costing and reporting. Requested from the Construction division of Lee Ann Holdings.",
    },
  ];

  var servicePhotos = {
    "road-freight": "A freight truck and trailer on the highway",
    "fleet-management": "A technician servicing a vehicle in the workshop",
    "scheduled-transport": "A box van on a scheduled delivery route",
    "project-logistics": "Shipping containers at a logistics terminal",
    "it-infrastructure": "Server racks and cabling in a data room",
    "software-systems": "A laptop open on a desk with software on the screen",
    "connectivity": "An ethernet patch panel in a network cabinet",
    "security-backup": "Electronic hardware of the kind used in security systems",
    "strategic-sourcing": "A sourcing meeting with laptops and marked-up plans",
    "contract-management": "A contract being signed",
    warehousing: "A warehouse aisle of pallet racking",
    "project-procurement": "A crew placing reinforcement steel on a building slab",
    "aircon-install": "A technician fitting a wall-mounted air conditioner",
    "hvac-servicing": "An outdoor air-conditioning unit and its ductwork",
    "gas-installations": "A technician with a pipe wrench on a gas installation",
    "gas-compliance": "Installed natural-gas pipework with its safety marking",
    "residential-construction": "A completed family home",
    "commercial-construction": "A commercial building slab with the site team",
    "civil-works": "Excavators on a civil works site",
    renovations: "A finished kitchen after a renovation",
  };

  products.forEach(function (product) {
    product.image = "assets/services/" + product.id + ".jpg";
    product.imageAlt = servicePhotos[product.id] || product.name;
  });

  function known(id) {
    return products.some(function (product) {
      return product.id === id;
    });
  }

  function readCart() {
    try {
      var parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(function (item) {
        return item && known(item.id) && item.qty > 0;
      });
    } catch (error) {
      return [];
    }
  }

  function cartCount(items) {
    return items.reduce(function (sum, item) {
      return sum + item.qty;
    }, 0);
  }

  function writeCart(items) {
    var next = items.filter(function (item) {
      return known(item.id) && item.qty > 0;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    var count = cartCount(next);
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = String(count);
      el.hidden = count === 0;
    });
    return next;
  }

  function findProduct(id) {
    return products.find(function (product) {
      return product.id === id;
    });
  }

  function addToCart(id, qty) {
    if (!known(id)) return readCart();
    var amount = qty > 0 ? qty : 1;
    var items = readCart();
    var existing = items.find(function (item) {
      return item.id === id;
    });
    if (existing) existing.qty += amount;
    else items.push({ id: id, qty: amount });
    return writeCart(items);
  }

  function setQty(id, qty) {
    var items = readCart().map(function (item) {
      if (item.id !== id) return item;
      return { id: item.id, qty: qty };
    });
    return writeCart(items);
  }

  function removeItem(id) {
    return writeCart(
      readCart().filter(function (item) {
        return item.id !== id;
      })
    );
  }

  function mark(name) {
    var parts = name.replace(/[^A-Za-z ]/g, "").trim().split(/\s+/);
    return ((parts[0] || "L").charAt(0) + (parts[1] || parts[0] || "A").charAt(0)).toUpperCase();
  }

  global.LeeAnnShop = {
    categories: categories,
    products: products,
    readCart: readCart,
    writeCart: writeCart,
    findProduct: findProduct,
    addToCart: addToCart,
    setQty: setQty,
    removeItem: removeItem,
    mark: mark,
  };

  writeCart(readCart());
})(window);
