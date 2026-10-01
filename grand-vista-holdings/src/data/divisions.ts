import { withBase } from "../lib/paths";
import transportation from "../assets/division-transportation.jpg";
import technology from "../assets/division-technology.jpg";
import supply from "../assets/division-supply.jpg";
import gasAircon from "../assets/division-gas-aircon.jpg";
import construction from "../assets/division-construction.jpg";

export type DivisionService = {
  title: string;
  description: string;
};

export type Division = {
  number: string;
  name: string;
  slug: string;
  to: string;
  site: string;
  blurb: string;
  image: string;
  imageAlt: string;
  tagline: string;
  intro: string[];
  services: DivisionService[];
};

export const divisions: Division[] = [
  {
    number: "01",
    name: "Transportation",
    slug: "transportation",
    to: "/divisions/transportation",
    site: withBase("/lee-ann-transportation/index.html"),
    blurb:
      "Road freight, fleet management and logistics that keep goods moving — on schedule, every time.",
    image: transportation,
    imageAlt: "Freight trucks on a highway at golden hour",
    tagline: "Moving goods and people, reliably.",
    intro: [
      "The Transportation Division moves freight and equipment for businesses that can't afford to miss a delivery window. We plan routes, manage fleets and coordinate drivers so cargo arrives when we said it would.",
      "Because we sit inside a group with procurement and construction capability, we can also move materials and equipment as part of a wider project — one plan, one accountable partner.",
    ],
    services: [
      {
        title: "Road freight & haulage",
        description:
          "Full and part-load road transport for general freight, building materials and equipment, locally and regionally.",
      },
      {
        title: "Fleet management",
        description:
          "Vehicle maintenance, compliance, tracking and driver management for owned and contracted fleets.",
      },
      {
        title: "Contract & scheduled transport",
        description:
          "Recurring route contracts and scheduled deliveries for businesses that need reliable weekly capacity.",
      },
      {
        title: "Project logistics",
        description:
          "Coordinated movement of materials and plant for construction and multi-site projects, timed to the programme.",
      },
    ],
  },
  {
    number: "02",
    name: "Technology",
    slug: "technology",
    to: "/divisions/technology",
    site: withBase("/lee-ann-tech/index.html"),
    blurb:
      "Practical IT infrastructure, software and connectivity solutions that modernise how you operate.",
    image: technology,
    imageAlt: "Professionals working at data screens in a modern operations room",
    tagline: "Practical technology that keeps business moving.",
    intro: [
      "The Technology Division designs, installs and supports the systems a business runs on — networks, hardware, software and the people who keep them working. We focus on practical, dependable solutions rather than technology for its own sake.",
      "From a first office network to a multi-site operation, we scope clearly, install cleanly and stay on for support.",
    ],
    services: [
      {
        title: "IT infrastructure & support",
        description:
          "Servers, workstations, Wi-Fi and structured cabling — supplied, installed and supported on call-out or contract.",
      },
      {
        title: "Software & systems",
        description:
          "Business software setup, systems integration and process automation that removes manual work.",
      },
      {
        title: "Connectivity & networking",
        description:
          "Internet connectivity, VPNs and multi-site networking to keep branches and remote teams connected.",
      },
      {
        title: "Security & backup",
        description:
          "Cybersecurity essentials, access control and managed backups so your business can recover when it matters.",
      },
    ],
  },
  {
    number: "03",
    name: "Supply & Procurement",
    slug: "supply-procurement",
    to: "/divisions/supply-procurement",
    site: withBase("/lee-ann-supply-procurement/index.html"),
    blurb:
      "Strategic sourcing, supplier management and distribution that secure the right goods at the right price.",
    image: supply,
    imageAlt: "Organized logistics warehouse with stacked pallets and a forklift",
    tagline: "Sourcing right. Delivering on time.",
    intro: [
      "The Supply & Procurement Division handles the buying side of your business: finding reliable suppliers, negotiating properly, managing contracts and making sure goods land where they need to be — complete and on time.",
      "We support tenders, recurring supply agreements and one-off project procurement, with transparent documentation at every step.",
    ],
    services: [
      {
        title: "Strategic sourcing & tendering",
        description:
          "Supplier identification, quote comparison and tender support with full paper trails and compliant processes.",
      },
      {
        title: "Supplier & contract management",
        description:
          "Ongoing management of supplier performance, pricing, delivery terms and contract renewals.",
      },
      {
        title: "Warehousing & distribution",
        description:
          "Stock holding, order fulfilment and last-mile distribution for businesses without their own warehouse.",
      },
      {
        title: "Project procurement",
        description:
          "Bulk buying and coordinated delivery of materials and equipment for construction and multi-division projects.",
      },
    ],
  },
  {
    number: "04",
    name: "Gas & Aircon",
    slug: "gas-aircon",
    to: "/divisions/gas-aircon",
    site: withBase("/lee-ann-gas-aircon/index.html"),
    blurb:
      "HVAC and gas installations, servicing and compliance certification for homes and businesses.",
    image: gasAircon,
    imageAlt: "Technician installing a wall-mounted air conditioning unit",
    tagline: "Comfort and compliance, installed and maintained.",
    intro: [
      "The Gas & Aircon Division supplies, installs and services air conditioning, ventilation, refrigeration and gas systems for homes and businesses — with compliant, certified work on every installation.",
      "We also run preventative maintenance contracts so your systems are serviced before they fail, not after.",
    ],
    services: [
      {
        title: "Air conditioning supply & install",
        description:
          "Split, cassette and ducted systems for homes, offices and retail — correctly sized and cleanly installed.",
      },
      {
        title: "Servicing & maintenance",
        description:
          "Planned servicing, deep cleaning and repairs for aircon, ventilation and refrigeration equipment.",
      },
      {
        title: "Gas installations",
        description:
          "LPG installations for heating, cooking and backup — installed by qualified technicians to regulation.",
      },
      {
        title: "Compliance certification",
        description:
          "Certificates of conformity (COC) for gas installations, plus inspections for insurance and property sales.",
      },
    ],
  },
  {
    number: "05",
    name: "Construction",
    slug: "construction",
    to: "/divisions/construction",
    site: withBase("/lee-ann-construction/index.html"),
    blurb:
      "Building and civil works delivered with quality, safety and cost certainty from groundbreak to handover.",
    image: construction,
    imageAlt: "Construction site with tower crane and steel structure at dusk",
    tagline: "Building with quality, safety and certainty.",
    intro: [
      "The Construction Division delivers building and civil works with disciplined project management — clear programmes, honest costing and safe sites. From a home renovation to a commercial build, we finish what we start.",
      "As part of the group, our sites draw on in-house supply, transport and gas & aircon capability, which shortens lead times and removes coordination risk.",
    ],
    services: [
      {
        title: "Residential construction",
        description:
          "New homes, extensions and structural alterations — managed from plans and approvals to final handover.",
      },
      {
        title: "Commercial construction",
        description:
          "Office, retail and industrial builds and fit-outs, delivered to programme with professional site management.",
      },
      {
        title: "Civil works & infrastructure",
        description:
          "Earthworks, concrete structures, paving, drainage and site preparation for private and public clients.",
      },
      {
        title: "Renovations & project management",
        description:
          "Renovations, refurbishments and turnkey project management with transparent costing and reporting.",
      },
    ],
  },
];

export function getDivision(slug: string) {
  return divisions.find((division) => division.slug === slug);
}
