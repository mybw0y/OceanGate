(function () {
  "use strict";

  window.__OCEANGATE__ = window.__BRAND__ = {
    name: "OceanGate",
    tagline: "Trusted Port Agency & Vessel Support",
    sub: "Across Costa Rica",
    founded: 2018,
    email: "info@oceangate.com",
    phone: "+506 2222-0000",
    whatsapp: "+50622220000",
    emergency: "+506 8888-0000",

    stats: [
      { value: 7,   suffix: "",   label: "Ports Covered" },
      { value: 24,  suffix: "/7", label: "Operations Desk" },
      { value: 98,  suffix: "%",  label: "On-Time Record" },
      { value: 45,  suffix: "min", label: "Avg. Response Time" }
    ],

    ports: [
      { id: "moin",       name: "Moín",        coast: "Caribbean", lat: 10.00, lng: -83.07 },
      { id: "limon",      name: "Limón",        coast: "Caribbean", lat: 9.99,  lng: -83.04 },
      { id: "puntarenas", name: "Puntarenas",   coast: "Pacific",   lat: 9.98,  lng: -84.83 },
      { id: "caldera",    name: "Caldera",       coast: "Pacific",   lat: 9.90,  lng: -84.72 },
      { id: "quepos",       name: "Quepos",        coast: "Pacific",   lat: 9.43,  lng: -84.16 },
      { id: "punta-morales", name: "Punta Morales", coast: "Pacific", lat: 10.02, lng: -84.96 },
      { id: "golfito",    name: "Golfito",       coast: "Pacific",   lat: 8.65,  lng: -83.18 }
    ],

    services: [
      {
        id: "port-agency",
        icon: "anchor",
        title: "Port Agency",
        short: "Full port agency services with local expertise and international standards.",
        desc: "We serve as the direct representative of ship owners, charterers, and operators at every port of call. From pre-arrival coordination to final departure, we manage every interface with port authorities, customs, and local vendors."
      },
      {
        id: "vessel-support",
        icon: "ship",
        title: "Vessel Support",
        short: "Comprehensive on-site support for every vessel call across Costa Rica.",
        desc: "Our teams are deployed at port-side to manage every operational requirement: bunkering coordination, provisions, spare parts delivery, and technical support. We ensure vessels depart on schedule."
      },
      {
        id: "crew-logistics",
        icon: "users",
        title: "Crew Logistics",
        short: "Crew change coordination, visas, hotels, and transfer management.",
        desc: "We handle the full crew change process including immigration clearances, visa processing, hotel accommodation, transportation, and flight coordination. Seamless, compliant, on time."
      },
      {
        id: "logistics-supply",
        icon: "box",
        title: "Logistics & Supply",
        short: "Ship chandlery, spares procurement, and supply chain management.",
        desc: "From deck provisions to technical spare parts, we source, procure and deliver whatever a vessel needs. Our supply network covers all major Costa Rican ports with same-day delivery capability."
      },
      {
        id: "emergency-response",
        icon: "alert",
        title: "Emergency Vessel Support — 24/7",
        short: "24/7 emergency coordination for incidents at sea and in port.",
        desc: "When incidents happen, speed is everything. Our emergency desk is staffed around the clock with experienced coordinators who can mobilize resources, engage authorities, and manage crisis communications in real time.",
        details: [
          "Engine casualty coordination",
          "Medical assistance",
          "Spare parts logistics",
          "Tug and towage coordination",
          "Port authority communication",
          "Crew emergency assistance"
        ]
      },
      {
        id: "marine-services",
        icon: "wave",
        title: "Marine Services",
        short: "Pilotage assistance, towage, mooring, and technical diving.",
        desc: "We coordinate all marine services required for safe port entry and exit: pilotage, towage, mooring gangs, line-handling teams, and underwater inspection. Full documentation included."
      },
      {
        id: "customs",
        icon: "file",
        title: "Customs Coordination",
        short: "End-to-end customs clearance and documentation management.",
        desc: "Our customs specialists handle all import/export documentation, duty management, and clearance processes with Costa Rican authorities. We ensure compliance and eliminate delays."
      },
      {
        id: "operations-desk",
        icon: "headset",
        title: "24/7 Operations Desk",
        short: "Round-the-clock operational support and communication center.",
        desc: "Our operations center is never offline. Staffed 24 hours a day, 365 days a year, with multilingual coordinators ready to handle any operational requirement, inquiry, or emergency."
      }
    ],

    industries: [
      { icon: "tanker",    title: "Tanker Operators",      sub: "Chemical & Oil" },
      { icon: "bulk",      title: "Bulk Carriers",         sub: "Dry & Liquid" },
      { icon: "container", title: "Container Lines",       sub: "Feeder & Ocean" },
      { icon: "cruise",    title: "Cruise Companies",      sub: "Ocean & River" },
      { icon: "offshore",  title: "Offshore Operators",    sub: "OSV & Platform" }
    ],

    why: [
      { stat: "45min", label: "Average Response", desc: "Industry-leading first response time across all seven ports." },
      { stat: "24/7",  label: "Operations Desk",  desc: "Continuously staffed control center, every day of the year." },
      { stat: "100%",  label: "Local Expertise",  desc: "Deep knowledge of Costa Rican port procedures, regulations, and relationships." },
      { stat: "7",     label: "Ports Covered",    desc: "Complete Caribbean and Pacific coast coverage across seven ports, one agency." },
      { stat: "98%",   label: "On-Time Record",   desc: "Consistent delivery performance validated across vessel calls." },
      { stat: "CRI",   label: "Proudly Costa Rican", desc: "Locally incorporated, internationally operated, globally trusted." }
    ],

    process: [
      { step: "01", title: "Pre-Arrival",      desc: "We receive vessel ETA and begin coordinating all port authorities, berthing, and services 48 hours in advance." },
      { step: "02", title: "Port Coordination", desc: "Our team manages berth booking, customs pre-clearance, and all pre-port logistics before the vessel arrives." },
      { step: "03", title: "Operations",        desc: "On-site coordinators execute all services: cargo ops, provisioning, crew logistics, and technical support." },
      { step: "04", title: "Departure",         desc: "Full clearance documentation, exit coordination with port and immigration authorities." },
      { step: "05", title: "Post-Call Report",  desc: "Detailed disbursement account and operational report delivered within 24 hours of vessel departure." }
    ],

    testimonials: [
      {
        quote: "OceanGate handled our entire call at Caldera with zero delays and perfect documentation. The kind of agent you want at every port worldwide.",
        author: "Capt. Henrik Larsen",
        role: "Fleet Director",
        company: "Nordic Bulk Carriers"
      },
      {
        quote: "When we had an engine casualty outside Limón at 02:00, OceanGate had a response team and emergency contacts mobilized within 30 minutes. Exceptional.",
        author: "Mark Thornton",
        role: "Operations Manager",
        company: "Pacific Offshore Services"
      },
      {
        quote: "Their 24/7 desk is the real deal. Every crew change, every provision order handled professionally and on schedule. Best agent in Central America.",
        author: "Ana Reyes",
        role: "Marine Superintendent",
        company: "Caribbean Container Lines"
      }
    ]
  };
})();
