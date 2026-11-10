export interface ProjectSpec {
  label: string;
  desc: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  sector: string;
  status: string;
  summary: string;
  specs: ProjectSpec[];
  icon: string;
}

export const projectsData: Record<string, ProjectItem> = {
  residential: {
    id: 'residential',
    title: 'Residential Development Project',
    sector: 'Residential',
    status: 'UAE Sector Scope',
    icon: 'residential',
    summary: 'Turnkey electromechanical contracting for modern residential communities and high-end villas. Encompasses DEWA-compliant power distribution, smart living connectivity, and premium water distribution networks.',
    specs: [
      { label: 'Electrical & ELV', desc: 'MDB, SMDB & DB panels, interior architectural LED lighting, perimeter lighting, structured Cat6A data points, and smart home automation.' },
      { label: 'HVAC & Mechanical', desc: 'High-efficiency chilled water FCUs, duct insulated networks, fresh air handling, and smart digital thermostats.' },
      { label: 'Plumbing & Drainage', desc: 'Hot & cold PPR water distribution lines, centralized water heating, booster pump manifolds, and sanitary fittings fit-out.' },
      { label: 'Authority Handover', desc: 'Complete civil defence, DEWA, and municipality approvals with certified as-built documentation.' }
    ]
  },
  corporate: {
    id: 'corporate',
    title: 'Corporate Commercial Tower',
    sector: 'Corporate',
    status: 'UAE Sector Scope',
    icon: 'corporate',
    summary: 'Full-scope MEP design, supply, installation, and commissioning for multi-story corporate headquarters and grade-A commercial office developments.',
    specs: [
      { label: 'Electrical & ELV', desc: 'LV switchgear assembly, busbar risers, essential UPS circuits, biometric access control, and enterprise CCTV monitoring.' },
      { label: 'HVAC & Mechanical', desc: 'Central chilled water plant connection, precision server room cooling, variable air volume (VAV) systems, and air balancing.' },
      { label: 'Plumbing & Sanitation', desc: 'High-rise water booster stations, storm drainage risers, dedicated washroom batteries, and water metering systems.' },
      { label: 'Authority Handover', desc: 'Consultant coordination, technical material approvals, third-party testing, and turnkey authority inspection.' }
    ]
  },
  retail: {
    id: 'retail',
    title: 'Retail & Showroom Complex',
    sector: 'Retail',
    status: 'UAE Sector Scope',
    icon: 'retail',
    summary: 'Fast-track electromechanical installation tailored for luxury retail flagships, multi-brand showrooms, and shopping mall fit-outs in Dubai and the wider UAE.',
    specs: [
      { label: 'Electrical & ELV', desc: 'High-CRI accent lighting track systems, sub-metering boards, public address (PA) audio, and theft-prevention EAS cabling.' },
      { label: 'HVAC & Mechanical', desc: 'Mall chilled water tie-ins, rooftop package unit ducting, custom linear slot diffusers, and smoke extraction.' },
      { label: 'Plumbing & Safety', desc: 'Staff pantry water services, drainage connections, grease interceptor tie-ins, and fire hose reel/sprinkler coordination.' },
      { label: 'Authority Handover', desc: 'Mall facility management liaison, out-of-hours testing, load balance submittals, and fast-track permit closures.' }
    ]
  },
  hospitality: {
    id: 'hospitality',
    title: 'Hospitality & Luxury Suites',
    sector: 'Hospitality',
    status: 'UAE Sector Scope',
    icon: 'hospitality',
    summary: 'Acoustically isolated, high-comfort MEP contracting designed for luxury hotel suites, resorts, and premium serviced residences.',
    specs: [
      { label: 'Electrical & ELV', desc: 'Guest Room Management System (GRMS), bespoke mood lighting controls, high-speed Wi-Fi access points, and IPTV network lines.' },
      { label: 'HVAC & Mechanical', desc: 'Ultra-low acoustic NC-25 chilled water FCUs, insulated sound attenuators, continuous bathroom extract, and fresh air supply.' },
      { label: 'Plumbing & Drainage', desc: 'Instantaneous hot water circulation loops, pressure-balanced thermostatic mixers, luxury concealed cisterns, and acoustic drainage pipes.' },
      { label: 'Authority Handover', desc: 'Comprehensive thermal performance commissioning, sound level verification, and turnkey hotel operator sign-off.' }
    ]
  },
  healthcare: {
    id: 'healthcare',
    title: 'Healthcare & Clinic Facility',
    sector: 'Healthcare',
    status: 'UAE Sector Scope',
    icon: 'healthcare',
    summary: 'Stringent clinical-grade electromechanical installations compliant with UAE health authority and international hospital safety standards.',
    specs: [
      { label: 'Electrical & ELV', desc: 'Isolated power supplies (IPS), medical-grade grounding, uninterruptible power systems (UPS), and nurse call stations.' },
      { label: 'HVAC & Mechanical', desc: 'HEPA filtration air handling units, positive/negative pressure isolation rooms, laminar flow systems, and medical gas duct coordination.' },
      { label: 'Plumbing & Drainage', desc: 'Medical washbasin touchless fittings, chemical-resistant drainage piping, and pure water purification distribution.' },
      { label: 'Authority Handover', desc: 'DHA / MOH health regulations compliance, air particulate validation, and sterilisation testing certification.' }
    ]
  },
  education: {
    id: 'education',
    title: 'Educational Campus Facility',
    sector: 'Education',
    status: 'UAE Sector Scope',
    icon: 'education',
    summary: 'High-durability, energy-efficient MEP infrastructure engineered for educational campuses, laboratories, sports complexes, and auditoriums.',
    specs: [
      { label: 'Electrical & ELV', desc: 'Outdoor feeder pillars, classroom presentation AV cabling, synchronized campus PA/emergency broadcast, and secure campus perimeter CCTV.' },
      { label: 'HVAC & Mechanical', desc: 'High-volume central chiller plant distribution, lab exhaust fume extraction, and energy-recovery ventilation (ERV).' },
      { label: 'Plumbing & Sanitation', desc: 'Heavy-traffic student washroom plumbing batteries, safety eyewash stations, centralized water storage reservoirs, and pump stations.' },
      { label: 'Authority Handover', desc: 'Ministry of Education compliance, utility sub-station energisation, and comprehensive preventive maintenance schedule.' }
    ]
  }
};
