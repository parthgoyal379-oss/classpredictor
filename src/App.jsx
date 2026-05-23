import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, limit } from "firebase/firestore";
import emailjs from "@emailjs/browser";

// ─────────────────────────────────────────────────────────────
// FIREBASE + EMAILJS CONFIG
// ─────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const db          = getFirestore(firebaseApp);

const EJS_SERVICE  = import.meta.env.VITE_EJS_SERVICE;
const EJS_TEMPLATE = import.meta.env.VITE_EJS_TEMPLATE;
const EJS_PUBLIC   = import.meta.env.VITE_EJS_PUBLIC;
// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = "qwertyuiop1234567890";
const CREATOR_EMAIL  = "parthgoyal379@gmail.com";

const STREAM_SUBJECTS = {
  PCM:      ["physics", "chemistry", "maths"],
  PCB:      ["physics", "chemistry", "biology", "core_maths"],
  PCMB:     ["physics", "chemistry", "maths", "biology"],
  Commerce: ["maths"],
};

const SMETA = {
  physics:    { name: "Physics",    icon: "⚡", color: "#3B82F6", bg: "#1E3A5F" },
  chemistry:  { name: "Chemistry",  icon: "⚗️", color: "#8B5CF6", bg: "#2D1B69" },
  maths:      { name: "Maths",      icon: "∑",  color: "#F59E0B", bg: "#451A03" },
  biology:    { name: "Biology",    icon: "🧬", color: "#10B981", bg: "#064E3B" },
  core_maths: { name: "Core Maths", icon: "÷",  color: "#F59E0B", bg: "#451A03",
                note: "2 quick questions — critical for Chemistry scoring accuracy" },
};

const DLABEL = ["", "Very Easy 😊", "Easy 🙂", "Average 😐", "Difficult 😓", "Very Hard 😰"];
const DCOL   = ["", "#10B981", "#34D399", "#F59E0B", "#F97316", "#EF4444"];
const RC     = { HIGH: "#EF4444", MEDIUM: "#F59E0B", LOW: "#10B981" };
const RBG    = { HIGH: "rgba(239,68,68,0.12)", MEDIUM: "rgba(245,158,11,0.12)", LOW: "rgba(16,185,129,0.12)" };
const WT_ORD = { VH: 4, H: 3, M: 2, L: 1, NA: 0 };

// ─────────────────────────────────────────────────────────────
// FOUNDATION CHAPTERS (Class 9 & 10)
// ─────────────────────────────────────────────────────────────

const FOUNDATION = {
  physics: [
    { id: "motion",           name: "Motion",                          detail: "Speed, velocity, distance-time graphs, acceleration", cl: 10 },
    { id: "force_laws",       name: "Force & Laws of Motion",          detail: "Newton's 3 laws, inertia, friction, momentum",        cl: 9  },
    { id: "gravitation",      name: "Gravitation",                     detail: "Universal law, free fall, weight vs mass",            cl: 9  },
    { id: "work_energy",      name: "Work, Energy & Power",            detail: "Work done, KE, PE, conservation of energy",           cl: 9  },
    { id: "sound",            name: "Sound",                           detail: "Wave nature, propagation, reflection, echo",          cl: 9  },
    { id: "light",            name: "Light — Reflection & Refraction", detail: "Mirror/lens formula, refraction, human eye",          cl: 10 },
    { id: "electricity",      name: "Electricity",                     detail: "Ohm's law, resistance, circuits, power",             cl: 10 },
    { id: "magnetic_effects", name: "Magnetic Effects of Current",     detail: "Electromagnets, force on conductor, motors",         cl: 10 },
  ],
  chemistry: [
    { id: "atoms_molecules",         name: "Atoms & Molecules",              detail: "Atomic mass, molecular mass, Avogadro's law",        cl: 9  },
    { id: "chemical_reactions",      name: "Chemical Reactions & Equations", detail: "Balancing, types of reactions, oxidation states",    cl: 10 },
    { id: "acids_bases",             name: "Acids, Bases & Salts",           detail: "pH scale, neutralisation, ionic properties",         cl: 10 },
    { id: "metals_nonmetals",        name: "Metals & Non-metals",            detail: "Reactivity series, ionic bonding, extraction",       cl: 10 },
    { id: "carbon_compounds",        name: "Carbon & its Compounds",         detail: "Covalent bonds, functional groups, homologous series",cl: 10 },
    { id: "periodic_classification", name: "Periodic Classification",        detail: "Modern periodic law, trends, valency",               cl: 10 },
  ],
  maths: [
    { id: "ratio_proportion",    name: "Ratio, Proportion & Percentages", detail: "Unitary method, percentage change, cross-multiplication", cl: 9  },
    { id: "algebra_basics",      name: "Algebra & Polynomials",           detail: "Factorisation, identities, linear equations",            cl: 9  },
    { id: "quadratic_equations", name: "Quadratic Equations",             detail: "Factoring, formula, discriminant, roots",                cl: 10 },
    { id: "trigonometry",        name: "Trigonometry Basics",             detail: "sin/cos/tan, standard angles, identities, applications", cl: 10 },
    { id: "coordinate_geometry", name: "Coordinate Geometry",             detail: "Distance formula, section formula, midpoint",            cl: 10 },
    { id: "ap_sequences",        name: "Arithmetic Progression",          detail: "nth term, sum of n terms, properties",                  cl: 10 },
    { id: "statistics",          name: "Statistics & Probability",        detail: "Mean, median, mode, basic probability",                 cl: 10 },
    { id: "geometry",            name: "Triangles & Circle Theorems",     detail: "Congruence, similarity, Pythagoras, angle theorems",    cl: 10 },
  ],
  biology: [
    { id: "cell_bio",            name: "Cell: Fundamental Unit of Life", detail: "Organelles, prokaryote vs eukaryote",             cl: 9  },
    { id: "tissues",             name: "Tissues",                        detail: "Plant and animal tissues, types and functions",    cl: 9  },
    { id: "life_processes",      name: "Life Processes",                 detail: "Nutrition, respiration, transport, excretion",     cl: 10 },
    { id: "control_coord",       name: "Control & Coordination",         detail: "Nervous system, hormones, reflex action",          cl: 10 },
    { id: "reproduction_basic",  name: "Reproduction",                   detail: "Sexual/asexual, plant and human reproduction",    cl: 10 },
    { id: "heredity_evolution",  name: "Heredity & Evolution",           detail: "Mendel's laws, DNA, natural selection",           cl: 10 },
    { id: "ecosystems",          name: "Our Environment",                detail: "Food chain, energy flow, biodiversity, pollution", cl: 10 },
  ],
  core_maths: [
    { id: "ratio_proportion", name: "Ratio, Proportion & Percentages", detail: "Critical for Mole Concept calculations in Chemistry", cl: 9 },
    { id: "algebra_basics",   name: "Algebra & Basic Equations",       detail: "Needed for Chemistry numerical problems",             cl: 9 },
  ],
};

// ─────────────────────────────────────────────────────────────
// ADVANCED CHAPTERS — with goal-aware tips
// ─────────────────────────────────────────────────────────────

const ADVANCED = [
  // ── PHYSICS 11 ──
  {
    id: "kinematics", name: "Kinematics", subj: "physics", cls: 11, cx: 1.10, bH: 18,
    prereqs: [{ id: "motion", w: 0.75 }, { id: "algebra_basics", w: 0.25 }],
    wt: { JEE: "H", NEET: "H", Boards: "H", CUET: "M" },
    gaps: {
      motion: "Velocity/acceleration graphs are the core language of Kinematics — gaps here cause persistent confusion",
      algebra_basics: "Manipulating kinematic equations requires confident algebra",
    },
    tips: {
      JEE:    "Master relative motion and projectile problems — JEE loves multi-concept kinematics",
      NEET:   "Focus on projectile motion and relative velocity — NEET tests these directly",
      Boards: "Revise Class 10 distance-time and velocity-time graphs before Day 1",
      CUET:   "Understand basic equations of motion and their derivations",
    },
  },
  {
    id: "laws_motion", name: "Laws of Motion", subj: "physics", cls: 11, cx: 1.15, bH: 15,
    prereqs: [{ id: "force_laws", w: 0.65 }, { id: "motion", w: 0.35 }],
    wt: { JEE: "H", NEET: "M", Boards: "H", CUET: "M" },
    gaps: {
      force_laws: "Newton's Class 9 laws are directly extended — any gap creates Free Body Diagram confusion",
      motion: "Without motion clarity, free body diagrams in accelerating systems won't make sense",
    },
    tips: {
      JEE:    "Master Free Body Diagrams — JEE pulley, wedge and friction problems are all FBD-based",
      NEET:   "Focus on Newton's laws applications and friction for NEET",
      Boards: "Learn all Free Body Diagram cases — inclined planes and connected bodies are Board favourites",
      CUET:   "Understand the three laws and their applications with examples",
    },
  },
  {
    id: "work_energy11", name: "Work, Energy & Power", subj: "physics", cls: 11, cx: 1.00, bH: 12,
    prereqs: [{ id: "work_energy", w: 0.70 }, { id: "force_laws", w: 0.30 }],
    wt: { JEE: "M", NEET: "M", Boards: "H", CUET: "L" },
    gaps: {
      work_energy: "Class 9 concepts are directly re-examined and deepened here",
      force_laws: "Work-energy theorem connects force through displacement",
    },
    tips: {
      JEE:    "Focus on work-energy theorem, spring PE and conservation problems",
      NEET:   "Energy conservation with simple systems is a NEET standard",
      Boards: "Derivations of work-energy theorem and power formulas are Board staples",
      CUET:   "Understand basic definitions of work, energy and power with SI units",
    },
  },
  {
    id: "gravitation11", name: "Gravitation", subj: "physics", cls: 11, cx: 1.00, bH: 10,
    prereqs: [{ id: "gravitation", w: 0.80 }, { id: "motion", w: 0.20 }],
    wt: { JEE: "M", NEET: "L", Boards: "H", CUET: "L" },
    gaps: {
      gravitation: "Orbital mechanics builds directly on Class 9 gravitational concepts",
      motion: "Circular satellite motion requires kinematic understanding",
    },
    tips: {
      JEE:    "Kepler's laws, escape velocity and orbital energy are JEE favourites",
      NEET:   "Know escape velocity and satellite basics — NEET rarely goes deeper",
      Boards: "Kepler's laws and escape velocity derivations are frequently asked in Boards",
      CUET:   "Understand universal law of gravitation and satellite motion basics",
    },
  },
  {
    id: "waves_shm", name: "Waves & Simple Harmonic Motion", subj: "physics", cls: 11, cx: 1.35, bH: 20,
    prereqs: [{ id: "sound", w: 0.45 }, { id: "motion", w: 0.30 }, { id: "trigonometry", w: 0.25 }],
    wt: { JEE: "VH", NEET: "M", Boards: "H", CUET: "M" },
    gaps: {
      sound: "Wave properties are the core language of SHM — Class 9 sound gaps are directly damaging",
      motion: "Oscillatory motion is periodic motion — kinematic fluency is required",
      trigonometry: "SHM equations use sine/cosine — trig weakness makes this chapter inaccessible",
    },
    tips: {
      JEE:    "SHM is one of JEE's highest-yield topics — spring-mass, pendulum and superposition are must-know",
      NEET:   "Focus on displacement equations and energy in SHM — NEET keeps it conceptual",
      Boards: "SHM equations, time period derivations and wave speed are key for Boards",
      CUET:   "Understand basic wave properties — wavelength, frequency, amplitude and speed",
    },
  },
  // ── PHYSICS 12 ──
  {
    id: "optics", name: "Optics (Ray & Wave)", subj: "physics", cls: 12, cx: 1.20, bH: 22,
    prereqs: [{ id: "light", w: 0.85 }, { id: "trigonometry", w: 0.15 }],
    wt: { JEE: "VH", NEET: "H", Boards: "VH", CUET: "H" },
    gaps: {
      light: "Class 10 mirror/lens formulas are the direct foundation — gaps here mean re-learning at Class 12 pace",
      trigonometry: "Snell's law and prism deviation problems require trigonometric comfort",
    },
    tips: {
      JEE:    "Wave optics — YDSE, diffraction, polarisation — carry heavy JEE marks alongside ray optics",
      NEET:   "Lens formula, mirror formula and refraction through prism are high-frequency NEET questions",
      Boards: "Highest weightage Class 12 Physics chapter — both ray and wave optics are Board staples",
      CUET:   "Understand refraction, lens formula and basic wave optics concepts",
    },
  },
  {
    id: "current_elec", name: "Current Electricity", subj: "physics", cls: 12, cx: 1.10, bH: 18,
    prereqs: [{ id: "electricity", w: 0.85 }, { id: "algebra_basics", w: 0.15 }],
    wt: { JEE: "H", NEET: "M", Boards: "VH", CUET: "H" },
    gaps: {
      electricity: "Ohm's law, V=IR and circuits from Class 10 are the direct base — every gap compounds badly",
      algebra_basics: "Solving multi-loop circuit equations requires confident algebra",
    },
    tips: {
      JEE:    "Kirchhoff's laws, Wheatstone bridge and meter bridge appear in almost every JEE paper",
      NEET:   "Focus on Ohm's law, resistance combinations and basic circuit solving for NEET",
      Boards: "Very high weightage — Kirchhoff's laws, potentiometer and galvanometer conversion are must-know",
      CUET:   "Understand resistivity, drift velocity and basic circuit laws",
    },
  },
  {
    id: "magnetism", name: "Magnetism & EMI", subj: "physics", cls: 12, cx: 1.25, bH: 20,
    prereqs: [{ id: "magnetic_effects", w: 0.75 }, { id: "electricity", w: 0.25 }],
    wt: { JEE: "VH", NEET: "M", Boards: "H", CUET: "M" },
    gaps: {
      magnetic_effects: "Biot-Savart and Faraday's laws extend directly from Class 10 magnetic effects",
      electricity: "Electromagnetic Induction requires strong current and circuit understanding",
    },
    tips: {
      JEE:    "EMI, AC circuits and Biot-Savart law are among the most challenging JEE topics — start early",
      NEET:   "Focus on force on a moving charge, magnetic field due to straight wire and Faraday's law for NEET",
      Boards: "Faraday's laws, Lenz's law and AC generator derivations are frequently asked",
      CUET:   "Understand magnetic force on current, Faraday's law and basic transformer working",
    },
  },
  // ── CHEMISTRY 11 ──
  {
    id: "mole_concept", name: "Mole Concept & Stoichiometry", subj: "chemistry", cls: 11, cx: 1.35, bH: 25,
    prereqs: [{ id: "atoms_molecules", w: 0.50 }, { id: "ratio_proportion", w: 0.35 }, { id: "chemical_reactions", w: 0.15 }],
    wt: { JEE: "VH", NEET: "VH", Boards: "VH", CUET: "H" },
    gaps: {
      atoms_molecules: "Mole directly extends atomic/molecular mass from Class 9 — gaps here are devastating",
      ratio_proportion: "Stoichiometry is fundamentally ratio mathematics — weak ratio skills guarantee wrong answers",
      chemical_reactions: "Balancing equations is the bedrock of all stoichiometric calculations",
    },
    tips: {
      JEE:    "Limiting reagent, percentage yield and empirical formula problems are JEE staples — all are numerical",
      NEET:   "Mole concept is very high yield for NEET — spend 3 hours on ratio problems before starting this chapter",
      Boards: "Spend 3 hours on ratio/percentage problems before opening the mole concept chapter",
      CUET:   "Understand mole, Avogadro's number and basic stoichiometry calculations",
    },
  },
  {
    id: "atomic_struct", name: "Atomic Structure", subj: "chemistry", cls: 11, cx: 1.10, bH: 15,
    prereqs: [{ id: "atoms_molecules", w: 0.70 }, { id: "periodic_classification", w: 0.30 }],
    wt: { JEE: "H", NEET: "H", Boards: "H", CUET: "M" },
    gaps: {
      atoms_molecules: "Quantum model builds on Class 9 Dalton/Bohr atomic concepts",
      periodic_classification: "Electronic configuration connects directly to periodic trends",
    },
    tips: {
      JEE:    "Quantum numbers, Aufbau, Hund and Pauli rules — also know hydrogen spectrum calculations",
      NEET:   "Electronic configuration and quantum numbers are directly tested in NEET — memorise rules cold",
      Boards: "Bohr's model, quantum numbers and electronic configuration are Board examination favourites",
      CUET:   "Understand Bohr's model and basic electronic configuration rules",
    },
  },
  {
    id: "chem_bonding", name: "Chemical Bonding", subj: "chemistry", cls: 11, cx: 1.20, bH: 18,
    prereqs: [{ id: "periodic_classification", w: 0.50 }, { id: "atoms_molecules", w: 0.30 }, { id: "metals_nonmetals", w: 0.20 }],
    wt: { JEE: "VH", NEET: "H", Boards: "H", CUET: "M" },
    gaps: {
      periodic_classification: "Valence electrons and electronegativity from periodic table are essential prerequisites",
      atoms_molecules: "Lewis structures require clear atomic structure understanding",
      metals_nonmetals: "Ionic vs covalent bonding maps directly from Class 10 metals chapter",
    },
    tips: {
      JEE:    "VSEPR theory, hybridisation and molecular orbital theory are all high-yield for JEE",
      NEET:   "VSEPR shapes, bond angle and hybridisation are consistently tested in NEET",
      Boards: "Lewis structures, VSEPR shapes and hybridisation are standard Board questions",
      CUET:   "Understand ionic, covalent and metallic bonding with VSEPR basics",
    },
  },
  {
    id: "equilibrium", name: "Chemical & Ionic Equilibrium", subj: "chemistry", cls: 11, cx: 1.35, bH: 22,
    prereqs: [{ id: "acids_bases", w: 0.65 }, { id: "chemical_reactions", w: 0.25 }, { id: "ratio_proportion", w: 0.10 }],
    wt: { JEE: "VH", NEET: "H", Boards: "H", CUET: "M" },
    gaps: {
      acids_bases: "pH, Ka, Kb concepts are direct extensions of Class 10 acid-base theory",
      chemical_reactions: "Le Chatelier's principle requires reversible reaction understanding",
      ratio_proportion: "Equilibrium constant calculations are inherently ratio-based",
    },
    tips: {
      JEE:    "Kp, Kc, degree of dissociation and buffer problems are all JEE-level numerical questions",
      NEET:   "pH calculations, buffer concept and Le Chatelier's principle are NEET-high-yield",
      Boards: "Kp, Kc expressions and pH calculations are standard Board examination problems",
      CUET:   "Understand Le Chatelier's principle and basic equilibrium constant expressions",
    },
  },
  {
    id: "organic_basics", name: "Organic Chemistry Basics (GOC)", subj: "chemistry", cls: 11, cx: 1.25, bH: 20,
    prereqs: [{ id: "carbon_compounds", w: 0.80 }, { id: "metals_nonmetals", w: 0.20 }],
    wt: { JEE: "VH", NEET: "VH", Boards: "H", CUET: "H" },
    gaps: {
      carbon_compounds: "Class 10 carbon chapter IS the entire conceptual foundation for all organic chemistry",
      metals_nonmetals: "Bond polarity and electronegativity understanding builds on metals/non-metals",
    },
    tips: {
      JEE:    "IUPAC naming, inductive/resonance effects and reaction intermediates are JEE bread-and-butter",
      NEET:   "IUPAC nomenclature and electronic effects are very high yield — NEET tests these every year",
      Boards: "IUPAC naming, functional groups and isomerism are the key Board topics",
      CUET:   "Understand IUPAC naming and basic functional group identification",
    },
  },
  {
    id: "sp_block", name: "s-Block & p-Block Elements", subj: "chemistry", cls: 11, cx: 1.00, bH: 15,
    prereqs: [{ id: "metals_nonmetals", w: 0.50 }, { id: "periodic_classification", w: 0.35 }, { id: "chemical_reactions", w: 0.15 }],
    wt: { JEE: "M", NEET: "H", Boards: "H", CUET: "M" },
    gaps: {
      metals_nonmetals: "Physical/chemical properties directly extend from Class 10 metals chapter",
      periodic_classification: "Group trends are based on periodic table position",
    },
    tips: {
      JEE:    "Anomalous properties and diagonal relationships are frequently tested in JEE",
      NEET:   "NEET high-yield — memorise all properties, uses and reactions of s and p block elements",
      Boards: "Preparation and properties of key compounds are standard Board questions",
      CUET:   "Focus on key properties and uses of Group 1 and Group 2 elements",
    },
  },
  // ── CHEMISTRY 12 ──
  {
    id: "electrochemistry", name: "Electrochemistry", subj: "chemistry", cls: 12, cx: 1.20, bH: 18,
    prereqs: [{ id: "acids_bases", w: 0.40 }, { id: "electricity", w: 0.35 }, { id: "chemical_reactions", w: 0.25 }],
    wt: { JEE: "H", NEET: "M", Boards: "VH", CUET: "H" },
    gaps: {
      acids_bases: "Ionic dissociation and conductance build on Class 10 acid-base theory",
      electricity: "Galvanic cells require understanding of EMF, resistance and current flow",
      chemical_reactions: "Redox balancing is the entire foundation of electrochemistry",
    },
    tips: {
      JEE:    "Nernst equation, cell potential and electrolysis calculations are JEE staples",
      NEET:   "Electrochemical cells, EMF and Faraday's laws of electrolysis appear in NEET",
      Boards: "Nernst equation and cell potential calculations are very high weightage in Boards",
      CUET:   "Understand galvanic vs electrolytic cells and basic EMF calculations",
    },
  },
  // ── MATHS 11 ──
  {
    id: "trig_functions", name: "Trigonometric Functions", subj: "maths", cls: 11, cx: 1.20, bH: 20,
    prereqs: [{ id: "trigonometry", w: 0.85 }, { id: "algebra_basics", w: 0.15 }],
    wt: { JEE: "VH", NEET: "NA", Boards: "H", CUET: "H" },
    gaps: {
      trigonometry: "Class 10 trig is the complete foundation — not knowing it means starting over at Class 11 pace",
      algebra_basics: "Trigonometric identity proofs require algebraic manipulation speed",
    },
    tips: {
      JEE:    "All compound angle, transformation and multiple angle formulae must be memorised cold for JEE",
      NEET:   "Not directly in NEET syllabus — skip this chapter for NEET preparation",
      Boards: "Prove identities, find principal values and solve trig equations — all are Board staples",
      CUET:   "Focus on standard angle values and basic identity proofs",
    },
  },
  {
    id: "complex_quad", name: "Complex Numbers & Quadratics", subj: "maths", cls: 11, cx: 1.15, bH: 15,
    prereqs: [{ id: "quadratic_equations", w: 0.70 }, { id: "algebra_basics", w: 0.30 }],
    wt: { JEE: "H", NEET: "NA", Boards: "H", CUET: "M" },
    gaps: {
      quadratic_equations: "Complex roots of quadratics are the motivation for complex numbers — Class 10 gaps cascade forward",
      algebra_basics: "All complex number operations require algebraic fluency",
    },
    tips: {
      JEE:    "Modulus, argument, polar form and De Moivre's theorem are frequently tested in JEE",
      NEET:   "Not in NEET syllabus — skip this for NEET preparation",
      Boards: "Argand plane, polar form and roots of unity are standard Board questions",
      CUET:   "Understand complex number operations and their geometric representation",
    },
  },
  {
    id: "straight_lines", name: "Straight Lines & Coordinate Geometry", subj: "maths", cls: 11, cx: 1.00, bH: 12,
    prereqs: [{ id: "coordinate_geometry", w: 0.85 }, { id: "algebra_basics", w: 0.15 }],
    wt: { JEE: "M", NEET: "NA", Boards: "H", CUET: "H" },
    gaps: {
      coordinate_geometry: "Distance, section formula from Class 10 extend directly into all line equations",
      algebra_basics: "Every line equation is an algebraic expression",
    },
    tips: {
      JEE:    "Family of lines, distance of a point from a line and angle bisectors are JEE favourites",
      NEET:   "Not in NEET syllabus — skip for NEET preparation",
      Boards: "All standard forms of line, angle between two lines and distance formula are must-know for Boards",
      CUET:   "Understand slope, intercepts and standard forms of the equation of a line",
    },
  },
  {
    id: "conic_sections", name: "Conic Sections", subj: "maths", cls: 11, cx: 1.30, bH: 22,
    prereqs: [{ id: "coordinate_geometry", w: 0.60 }, { id: "quadratic_equations", w: 0.30 }, { id: "algebra_basics", w: 0.10 }],
    wt: { JEE: "VH", NEET: "NA", Boards: "H", CUET: "H" },
    gaps: {
      coordinate_geometry: "All conic equations are coordinate geometry — a weak base creates persistent confusion",
      quadratic_equations: "Conic equations are second-degree — quadratic fluency is required",
      algebra_basics: "Completing the square and form transformations need strong algebra",
    },
    tips: {
      JEE:    "Ellipse, hyperbola, parabola — JEE loves tangent/normal and chord of contact problems",
      NEET:   "Not in NEET syllabus — skip for NEET preparation",
      Boards: "Standard forms, focus-directrix properties and parametric forms are Board staples",
      CUET:   "Understand standard equations of parabola, ellipse and hyperbola with their properties",
    },
  },
  {
    id: "seq_series", name: "Sequences & Series", subj: "maths", cls: 11, cx: 1.10, bH: 14,
    prereqs: [{ id: "ap_sequences", w: 0.75 }, { id: "algebra_basics", w: 0.25 }],
    wt: { JEE: "H", NEET: "NA", Boards: "H", CUET: "M" },
    gaps: {
      ap_sequences: "Class 10 AP directly extends to GP, HP and AGP in Class 11",
      algebra_basics: "Sum formulae require quick algebraic manipulation",
    },
    tips: {
      JEE:    "AM-GM inequality, telescoping series and sum of special series are standard JEE problems",
      NEET:   "Not in NEET syllabus — skip for NEET preparation",
      Boards: "GP sum formulae, infinite GP and AGP are frequently asked in Boards",
      CUET:   "Understand AP, GP formulas and their applications",
    },
  },
  {
    id: "permcomb", name: "Permutations & Combinations", subj: "maths", cls: 11, cx: 1.20, bH: 16,
    prereqs: [{ id: "algebra_basics", w: 0.50 }, { id: "ratio_proportion", w: 0.30 }, { id: "statistics", w: 0.20 }],
    wt: { JEE: "H", NEET: "NA", Boards: "H", CUET: "H" },
    gaps: {
      algebra_basics: "Factorial-based algebra underpins all P&C formulae",
      ratio_proportion: "Counting logic builds on proportional reasoning skills",
      statistics: "Probability follows P&C — weak counting skills produce weak probability",
    },
    tips: {
      JEE:    "P&C needs practice more than theory — solve 100+ varied problems at minimum for JEE",
      NEET:   "Not in NEET syllabus — skip for NEET preparation",
      Boards: "Circular permutations and combinations with restrictions are Board favourites",
      CUET:   "Understand nPr, nCr formulas and their applications in counting problems",
    },
  },
  {
    id: "calculus", name: "Limits, Differentiation & Integration", subj: "maths", cls: 11, cx: 1.55, bH: 35,
    prereqs: [
      { id: "algebra_basics", w: 0.35 }, { id: "trigonometry", w: 0.30 },
      { id: "quadratic_equations", w: 0.20 }, { id: "coordinate_geometry", w: 0.15 },
    ],
    wt: { JEE: "VH", NEET: "NA", Boards: "VH", CUET: "H" },
    gaps: {
      algebra_basics: "Calculus manipulation speed depends entirely on algebraic fluency",
      trigonometry: "Trig limits and differentiation of trig functions require a solid trig base",
      quadratic_equations: "Limit evaluation of rational functions requires quadratic factorisation",
      coordinate_geometry: "Geometric interpretation of derivatives requires coordinate geometry comfort",
    },
    tips: {
      JEE:    "Calculus is 35-40% of JEE Maths — treat it as a separate subject entirely",
      NEET:   "Not in NEET syllabus — skip for NEET preparation",
      Boards: "Differentiation and integration are very high weightage — both application and theory are tested",
      CUET:   "Focus on basic differentiation rules and simple integration techniques",
    },
  },
  {
    id: "probability", name: "Probability", subj: "maths", cls: 11, cx: 1.00, bH: 12,
    prereqs: [{ id: "statistics", w: 0.60 }, { id: "ratio_proportion", w: 0.40 }],
    wt: { JEE: "M", NEET: "NA", Boards: "H", CUET: "H" },
    gaps: {
      statistics: "Probability extends directly from Class 10 statistical reasoning",
      ratio_proportion: "All probability calculations are ratio problems at their core",
    },
    tips: {
      JEE:    "Conditional probability, Bayes' theorem and binomial distribution are the advanced JEE sections",
      NEET:   "Not in NEET syllabus — skip for NEET preparation",
      Boards: "Conditional probability, total probability theorem and Bayes' theorem are Board staples",
      CUET:   "Understand classical probability, addition rule and conditional probability",
    },
  },
  // ── BIOLOGY 11 ──
  {
    id: "cell_bio11", name: "Cell: The Unit of Life", subj: "biology", cls: 11, cx: 1.10, bH: 15,
    prereqs: [{ id: "cell_bio", w: 0.85 }, { id: "tissues", w: 0.15 }],
    wt: { JEE: "NA", NEET: "VH", Boards: "H", CUET: "H" },
    gaps: {
      cell_bio: "Class 9 organelles are re-examined in molecular detail — gaps mean re-learning at Class 11 pace",
      tissues: "Cell specialisation connects directly to tissue-level function",
    },
    tips: {
      JEE:    "Not in JEE syllabus",
      NEET:   "Prokaryote vs eukaryote, endomembrane system — NEET asks 3-4 questions here every year",
      Boards: "Cell organelle functions and differences between plant/animal cells are Board favourites",
      CUET:   "Understand key organelle functions and differences between cell types",
    },
  },
  {
    id: "plant_physio", name: "Plant Physiology", subj: "biology", cls: 11, cx: 1.20, bH: 18,
    prereqs: [{ id: "life_processes", w: 0.75 }, { id: "cell_bio", w: 0.25 }],
    wt: { JEE: "NA", NEET: "VH", Boards: "H", CUET: "M" },
    gaps: {
      life_processes: "Photosynthesis and respiration from Class 10 are deepened significantly here",
      cell_bio: "Chloroplast and mitochondria must be understood at the molecular level",
    },
    tips: {
      JEE:    "Not in JEE syllabus",
      NEET:   "C3/C4/CAM pathways, mineral nutrition and translocation are NEET staples — very high yield",
      Boards: "Light and dark reactions, transpiration and mineral nutrition are key Board topics",
      CUET:   "Understand basic photosynthesis, transpiration and plant nutrition concepts",
    },
  },
  {
    id: "human_physio", name: "Human Physiology", subj: "biology", cls: 11, cx: 1.30, bH: 25,
    prereqs: [{ id: "life_processes", w: 0.60 }, { id: "control_coord", w: 0.40 }],
    wt: { JEE: "NA", NEET: "VH", Boards: "VH", CUET: "H" },
    gaps: {
      life_processes: "Digestion, circulation and respiration extend directly from Class 10 life processes",
      control_coord: "Neural and hormonal control is the Class 10 base for the entire physiology chapter",
    },
    tips: {
      JEE:    "Not in JEE syllabus",
      NEET:   "Single highest NEET-yield chapter — digestion, circulation, excretion must all be thorough",
      Boards: "All organ systems are high weightage in Boards — diagrams and functions both tested",
      CUET:   "Understand the basic functioning of digestive, circulatory and nervous systems",
    },
  },
  // ── BIOLOGY 12 ──
  {
    id: "genetics", name: "Genetics & Molecular Biology", subj: "biology", cls: 12, cx: 1.35, bH: 22,
    prereqs: [{ id: "heredity_evolution", w: 0.75 }, { id: "cell_bio", w: 0.25 }],
    wt: { JEE: "NA", NEET: "VH", Boards: "VH", CUET: "H" },
    gaps: {
      heredity_evolution: "Mendel's Class 10 laws are the entry point — weak understanding cascades into pedigree disasters",
      cell_bio: "DNA replication and transcription occur at the cellular level — organelle knowledge is needed",
    },
    tips: {
      JEE:    "Not in JEE syllabus",
      NEET:   "Pedigree analysis and molecular basis of inheritance both appear in NEET every single year",
      Boards: "Mendelian genetics, DNA replication and gene expression are very high weightage",
      CUET:   "Understand Mendel's laws, DNA structure and basic gene expression",
    },
  },
  {
    id: "reproduction12", name: "Reproduction in Organisms", subj: "biology", cls: 12, cx: 1.10, bH: 15,
    prereqs: [{ id: "reproduction_basic", w: 0.85 }, { id: "cell_bio", w: 0.15 }],
    wt: { JEE: "NA", NEET: "H", Boards: "VH", CUET: "H" },
    gaps: {
      reproduction_basic: "Class 10 reproductive processes form the direct foundation of this chapter",
      cell_bio: "Meiosis and cell division are central to understanding sexual reproduction",
    },
    tips: {
      JEE:    "Not in JEE syllabus",
      NEET:   "Gametogenesis, embryogenesis and endosperm development are consistent NEET topics",
      Boards: "Both asexual and sexual reproduction with diagrams are high weightage in Boards",
      CUET:   "Understand sexual vs asexual reproduction and human reproductive system basics",
    },
  },
  {
    id: "ecology", name: "Ecology & Biodiversity", subj: "biology", cls: 12, cx: 1.00, bH: 14,
    prereqs: [{ id: "ecosystems", w: 0.85 }, { id: "life_processes", w: 0.15 }],
    wt: { JEE: "NA", NEET: "H", Boards: "H", CUET: "M" },
    gaps: {
      ecosystems: "Food chains, energy flow and biodiversity extend directly from Class 10",
      life_processes: "Nutrient cycling connects to metabolic processes studied in life processes",
    },
    tips: {
      JEE:    "Not in JEE syllabus",
      NEET:   "Ecosystem services, biodiversity conservation and ecological pyramids are NEET-tested",
      Boards: "Food chains, energy flow and biodiversity conservation are Board examination favourites",
      CUET:   "Understand ecosystem structure, food chains and basic biodiversity concepts",
    },
  },
  {
    id: "biotechnology", name: "Biotechnology", subj: "biology", cls: 12, cx: 1.20, bH: 16,
    prereqs: [{ id: "cell_bio", w: 0.50 }, { id: "heredity_evolution", w: 0.50 }],
    wt: { JEE: "NA", NEET: "H", Boards: "H", CUET: "M" },
    gaps: {
      cell_bio: "rDNA technology requires a strong molecular cell biology foundation",
      heredity_evolution: "Gene expression and cloning builds on solid genetics understanding",
    },
    tips: {
      JEE:    "Not in JEE syllabus",
      NEET:   "PCR, ELISA and rDNA technology — 3-4 NEET questions here every year",
      Boards: "Tools and processes of biotechnology with applications are standard Board questions",
      CUET:   "Understand PCR, gel electrophoresis and basic applications of biotechnology",
    },
  },
];

// ─────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  { name: "Aarav Sharma",  role: "JEE Aspirant, Delhi",      text: "This tool predicted exactly that I'd struggle with Mole Concept. Saved me from a rude shock in November. Wish I had this before Class 11 started.", stars: 5, avatar: "A" },
  { name: "Priya Mehta",   role: "NEET Aspirant, Mumbai",    text: "The roadmap feature is genuinely useful. It told me to revise Life Processes before Human Physiology. My teacher said the same thing 3 months later.", stars: 5, avatar: "P" },
  { name: "Rohan Verma",   role: "PCM Student, Jaipur",      text: "I rated Trigonometry as difficult and it immediately flagged Calculus as HIGH risk. That's exactly what happened. I was not prepared at all.", stars: 5, avatar: "R" },
  { name: "Sneha Iyer",    role: "Boards + CUET, Chennai",   text: "The priority matrix helped me stop panicking and actually focus. Knew exactly which chapters to spend time on vs which to leave for later.", stars: 5, avatar: "S" },
  { name: "Karan Patel",   role: "JEE Advanced Aspirant",    text: "Built by an 18 year old and it's better than anything Unacademy or PW offers for gap analysis. Genuinely impressed by the depth.", stars: 5, avatar: "K" },
];

// ─────────────────────────────────────────────────────────────
// ALGORITHM
// ─────────────────────────────────────────────────────────────

function getTip(ch, goal) {
  return (ch.tips && ch.tips[goal]) ? ch.tips[goal] : (ch.tip || "");
}

function calcRisk(ch, ratings) {
  let wsum = 0;
  let tot  = 0;
  const gaps = [];
  ch.prereqs.forEach(({ id, w }) => {
    const r = ratings[id];
    if (r == null) return;
    wsum += r * w;
    tot  += w;
    if (r >= 3.5 && ch.gaps[id]) gaps.push({ id, r, reason: ch.gaps[id] });
  });
  if (tot === 0) return null;
  const raw   = wsum / tot;
  const score = raw * ch.cx;
  const risk  = score < 2.3 ? "LOW" : score < 3.3 ? "MEDIUM" : "HIGH";
  const mul   = risk === "HIGH" ? 1.6 : risk === "MEDIUM" ? 1.2 : 0.85;
  return { ...ch, score, risk, gaps, studyH: Math.round(ch.bH * mul) };
}

function runAnalysis(ratings, stream, goal) {
  const subjects = (STREAM_SUBJECTS[stream] || []).filter(s => s !== "core_maths");

  const chapters = ADVANCED.filter(ch => {
    if (!subjects.includes(ch.subj)) return false;
    if (goal === "NEET" && ch.wt.NEET === "NA") return false;
    if (goal === "JEE"  && ch.wt.JEE  === "NA") return false;
    return true;
  });

  const res = chapters.map(ch => calcRisk(ch, ratings)).filter(Boolean);
  const rOrd = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  res.sort((a, b) => rOrd[a.risk] - rOrd[b.risk] || b.score - a.score);

  const highCnt = res.filter(c => c.risk === "HIGH").length;
  const medCnt  = res.filter(c => c.risk === "MEDIUM").length;
  const lowCnt  = res.filter(c => c.risk === "LOW").length;
  const totalH  = res.reduce((s, c) => s + c.studyH, 0);

  // Roadmap
  const roadmap = [];
  const weakFnd = [];
  subjects.forEach(sub => {
    (FOUNDATION[sub] || []).forEach(ch => {
      if ((ratings[ch.id] || 0) >= 4) weakFnd.push(ch.name);
    });
  });
  if (weakFnd.length) {
    roadmap.push({
      phase: "PHASE 1", title: "Foundation Repair — Do This Before Class 11 Starts", col: "#EF4444",
      items: weakFnd.slice(0, 6).map(n => ({ label: "Revise: " + n, time: "3–5 hrs" })),
    });
  }

  const h11 = res.filter(c => c.risk === "HIGH"   && c.cls === 11).slice(0, 5);
  const m11 = res.filter(c => c.risk === "MEDIUM" && c.cls === 11).slice(0, 5);
  const h12 = res.filter(c => c.risk === "HIGH"   && c.cls === 12).slice(0, 5);
  const m12 = res.filter(c => c.risk === "MEDIUM" && c.cls === 12).slice(0, 5);

  if (h11.length) roadmap.push({ phase: "PHASE 2", title: "High-Risk Class 11 — Attack These First", col: "#F97316", items: h11.map(c => ({ label: c.name, detail: getTip(c, goal), time: c.studyH + " hrs" })) });
  if (m11.length) roadmap.push({ phase: "PHASE 3", title: "Medium-Risk Class 11 Chapters",          col: "#F59E0B", items: m11.map(c => ({ label: c.name, detail: getTip(c, goal), time: c.studyH + " hrs" })) });
  if (h12.length) roadmap.push({ phase: "PHASE 4", title: "High-Risk Class 12 — Plan Ahead",        col: "#8B5CF6", items: h12.map(c => ({ label: c.name, detail: getTip(c, goal), time: c.studyH + " hrs" })) });
  if (m12.length) roadmap.push({ phase: "PHASE 5", title: "Medium-Risk Class 12 Chapters",          col: "#6366F1", items: m12.map(c => ({ label: c.name, detail: getTip(c, goal), time: c.studyH + " hrs" })) });

  // Warnings — goal-aware
  const warnings = [];
  const mole = res.find(c => c.id === "mole_concept");
  const calc = res.find(c => c.id === "calculus");
  const org  = res.find(c => c.id === "organic_basics");
  const hphy = res.find(c => c.id === "human_physio");

  if (mole && mole.risk === "HIGH") {
    warnings.push({ icon: "⚗️", sev: "high", text: "Class 11 Chemistry turns numerical from Day 1. Mole Concept will feel overwhelming. Budget 2–3 extra weeks and revise ratio/percentage basics before starting." });
  }
  if (calc && calc.risk === "HIGH" && goal !== "NEET") {
    warnings.push({ icon: "∫", sev: "high", text: "Calculus is 35–40% of " + goal + " Maths. Your weak algebra and trigonometry base means you must start strengthening foundations before Class 11 begins." });
  }
  if (org && org.risk === "HIGH") {
    warnings.push({ icon: "🧪", sev: "high", text: "Organic Chemistry builds entirely on carbon compounds. Students who skip Class 10 carbon typically fall a full month behind by November of Class 11." });
  }
  if (highCnt >= 4) {
    warnings.push({ icon: "⚠️", sev: "medium", text: "You have " + highCnt + " high-risk chapters ahead. Entirely manageable — but ONLY if you start foundation revision in the first 4 weeks of Class 11. Do not delay." });
  }
  if (hphy && hphy.risk !== "LOW" && goal === "NEET") {
    warnings.push({ icon: "🫀", sev: hphy.risk === "HIGH" ? "high" : "medium", text: "Human Physiology alone can swing 15–20 marks in NEET. Strengthen your Life Processes and Nervous System base before starting this chapter." });
  }

  return { res, roadmap, warnings: warnings.slice(0, 4), stats: { highCnt, medCnt, lowCnt, totalH, total: res.length } };
}

// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────

export default function App() {
  const [step,          setStep]          = useState(0);
  const [studentName,   setStudentName]   = useState("");
  const [nameInput,     setNameInput]     = useState("");
  const [stream,        setStream]        = useState(null);
  const [goal,          setGoal]          = useState(null);
  const [ratings,       setRatings]       = useState({});
  const [subIdx,        setSubIdx]        = useState(0);
  const [results,       setResults]       = useState(null);
  const [tab,           setTab]           = useState("report");
  const [loading,       setLoading]       = useState(false);
  const [expanded,      setExpanded]      = useState(null);
  const [feedback,           setFeedback]           = useState({ rating: 0, text: "", submitted: false });
  const [statsData,          setStatsData]          = useState({ total: 0, responses: [], feedback: [] });
  const [showAdmin,          setShowAdmin]          = useState(false);
  const [adminPass,          setAdminPass]          = useState("");
  const [adminUnlocked,      setAdminUnlocked]      = useState(false);
  const [showFeedbackPopup,  setShowFeedbackPopup]  = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600&family=Space+Mono:wght@700&display=swap";
    link.rel  = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { background: #07101E; color: #E2E8F0; font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: #0D1929; }
      ::-webkit-scrollbar-thumb { background: #1E3A5F; border-radius: 4px; }
      .ot { font-family: 'Outfit', sans-serif !important; }
      .mn { font-family: 'Space Mono', monospace !important; }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      .fade { animation: fadeUp 0.3s ease forwards; }
      .btn { cursor: pointer; border: none; transition: all 0.15s ease; outline: none; -webkit-tap-highlight-color: transparent; background: none; }
      .btn:hover { filter: brightness(1.08); }
      .btn:active { transform: scale(0.96); }
      .card { background: #0D1929; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; transition: border-color 0.2s; }
      input, textarea { outline: none; font-family: 'Plus Jakarta Sans', sans-serif; }
      input::placeholder, textarea::placeholder { color: #374151; }
      .scrollhide::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(style);
    loadStats();
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);

  // ── FIREBASE BACKEND ──
  const loadStats = async () => {
    try {
      const rSnap = await getDocs(query(collection(db, "responses"), orderBy("date", "desc"), limit(50)));
      const fSnap = await getDocs(query(collection(db, "feedbacks"), orderBy("date", "desc"), limit(50)));
      const responses = rSnap.docs.map(d => d.data());
      const feedback  = fSnap.docs.map(d => d.data());
      setStatsData({ total: responses.length, responses, feedback });
    } catch (e) { console.log("loadStats error:", e); }
  };

  const saveResponse = async (name, str, gl, riskStats) => {
    try {
      const entry = {
        name,
        stream:   str,
        goal:     gl,
        highRisk: riskStats.highCnt,
        medRisk:  riskStats.medCnt,
        lowRisk:  riskStats.lowCnt,
        date:     new Date().toLocaleDateString("en-IN"),
        timestamp: Date.now(),
      };
      await addDoc(collection(db, "responses"), entry);
      setStatsData(s => ({ ...s, total: s.total + 1, responses: [entry, ...s.responses] }));

      // Email notification
      emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
        student_name: name,
        stream:       str,
        goal:         gl,
        high_risk:    riskStats.highCnt,
        med_risk:     riskStats.medCnt,
        rating:       "—",
        message:      "New analysis completed on ClassPredictor",
        time:         new Date().toLocaleString("en-IN"),
      }, EJS_PUBLIC).catch(e => console.log("EmailJS error:", e));

    } catch (e) { console.log("saveResponse error:", e); }
  };

  const saveFeedback = async (name, rating, text) => {
    try {
      const entry = {
        name, rating, text,
        date:      new Date().toLocaleDateString("en-IN"),
        timestamp: Date.now(),
      };
      await addDoc(collection(db, "feedbacks"), entry);
      setStatsData(s => ({ ...s, feedback: [entry, ...s.feedback] }));

      // Email notification
      emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
        student_name: name,
        stream:       "—",
        goal:         "—",
        high_risk:    "—",
        med_risk:     "—",
        rating:       rating + "/5 stars",
        message:      text || "No message written",
        time:         new Date().toLocaleString("en-IN"),
      }, EJS_PUBLIC).catch(e => console.log("EmailJS error:", e));

    } catch (e) { console.log("saveFeedback error:", e); }
  };

  const subjects    = STREAM_SUBJECTS[stream] || [];
  const curSub      = subjects[subIdx];
  const curChapters = FOUNDATION[curSub] || [];

  const { ratedCount, totalCount } = (() => {
    let r = 0;
    let t = 0;
    subjects.forEach(s => {
      const chs = FOUNDATION[s] || [];
      t += chs.length;
      chs.forEach(c => { if (ratings[c.id] != null) r++; });
    });
    return { ratedCount: r, totalCount: t };
  })();

  const rate = (id, val) => setRatings(p => ({ ...p, [id]: val }));
  const pct  = totalCount > 0 ? Math.round((ratedCount / totalCount) * 100) : 0;

  const doAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      const r = runAnalysis(ratings, stream, goal);
      setResults(r);
      saveResponse(studentName, stream, goal, r.stats);
      setLoading(false);
      setStep(3);
      setTab("report");
      // Show feedback popup after 8 seconds
      setTimeout(() => setShowFeedbackPopup(true), 8000);
    }, 2000);
  };

  const submitFeedback = () => {
    if (feedback.rating === 0) return;
    saveFeedback(studentName, feedback.rating, feedback.text);
    setFeedback(f => ({ ...f, submitted: true }));
  };

  const shareReport = () => {
    if (!results) return;
    const { stats } = results;
    const lines = [
      "📊 My Class 11-12 Risk Report — ClassPredictor",
      "━━━━━━━━━━━━━━━━",
      "🔴 High Risk: " + stats.highCnt + " chapters",
      "🟡 Medium Risk: " + stats.medCnt + " chapters",
      "🟢 Low Risk: " + stats.lowCnt + " chapters",
      "⏱️ Study needed: ~" + stats.totalH + " hours",
      "",
      "Stream: " + stream + " | Target: " + goal,
      "Built by Parth Goyal | " + CREATOR_EMAIL,
    ];
    if (navigator.clipboard) {
      navigator.clipboard.writeText(lines.join("\n"));
      alert("Report summary copied! Share it anywhere.");
    }
  };

  const resetAll = () => {
    setStep(0);
    setStream(null);
    setGoal(null);
    setRatings({});
    setResults(null);
    setStudentName("");
    setNameInput("");
    setFeedback({ rating: 0, text: "", submitted: false });
    setExpanded(null);
  };

  // ─────────────────────────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
      <div style={{ width: 52, height: 52, border: "3px solid #1E3A5F", borderTop: "3px solid #3B82F6", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <p className="ot" style={{ color: "#6B7280", fontSize: "1.05rem", fontWeight: 700 }}>Mapping your prerequisite gaps, {studentName}...</p>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
        {["Physics", "Chemistry", "Maths", "Biology"].map((s, i) => (
          <span key={s} className="mn" style={{ padding: "4px 10px", borderRadius: 999, background: "#0D1929", color: "#374151", fontSize: "0.72rem", animation: "pulse 1.4s ease infinite", animationDelay: (i * 0.2) + "s" }}>{s}</span>
        ))}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // ADMIN PANEL
  // ─────────────────────────────────────────────────────────────
  if (showAdmin) {
    const avgStars = statsData.feedback && statsData.feedback.length > 0
      ? (statsData.feedback.reduce((s, f) => s + f.rating, 0) / statsData.feedback.length).toFixed(1)
      : "—";

    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem" }} className="fade">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <div className="mn" style={{ color: "#EF4444", fontSize: "0.65rem", letterSpacing: "0.2em", marginBottom: "4px" }}>ADMIN PANEL</div>
            <h2 className="ot" style={{ fontWeight: 900, color: "#FFFFFF", fontSize: "1.6rem" }}>ClassPredictor Dashboard</h2>
            <p style={{ color: "#374151", fontSize: "0.78rem" }}>Only visible to Parth Goyal</p>
          </div>
          <button onClick={() => { setShowAdmin(false); setAdminUnlocked(false); setAdminPass(""); }} className="btn ot" style={{ padding: "0.5rem 1rem", borderRadius: 9, background: "#0D1929", color: "#4B5563", border: "1px solid rgba(255,255,255,0.07)", fontSize: "0.82rem", fontWeight: 600 }}>
            ← Back
          </button>
        </div>

        {!adminUnlocked ? (
          <div className="card" style={{ padding: "2.5rem", textAlign: "center", maxWidth: 400, margin: "0 auto" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔐</div>
            <p className="ot" style={{ color: "#E2E8F0", fontWeight: 700, marginBottom: "1rem", fontSize: "1rem" }}>Enter Admin Password</p>
            <input
              type="password"
              value={adminPass}
              onChange={e => setAdminPass(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && adminPass === ADMIN_PASSWORD) { setAdminUnlocked(true); loadStats(); } }}
              placeholder="Enter password..."
              style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: 10, background: "#132035", border: "1px solid rgba(255,255,255,0.08)", color: "#E2E8F0", fontSize: "0.9rem", marginBottom: "0.75rem" }}
            />
            <button onClick={() => { if (adminPass === ADMIN_PASSWORD) { setAdminUnlocked(true); loadStats(); } else alert("Wrong password!"); }} className="btn ot" style={{ width: "100%", padding: "0.8rem", borderRadius: 10, background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", color: "white", fontWeight: 700, fontSize: "0.9rem" }}>
              Unlock Dashboard
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.65rem", marginBottom: "1.5rem" }}>
              {[
                { label: "Total Forms Filled",  val: statsData.total || 0,                     col: "#3B82F6" },
                { label: "Feedbacks Received",  val: (statsData.feedback || []).length,         col: "#10B981" },
                { label: "Avg Feedback Stars",  val: avgStars + (avgStars !== "—" ? " ★" : ""), col: "#F59E0B" },
              ].map(s => (
                <div key={s.label} className="card" style={{ padding: "1.25rem", textAlign: "center" }}>
                  <div className="mn" style={{ fontSize: "1.75rem", fontWeight: 700, color: s.col, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ color: "#374151", fontSize: "0.72rem", marginTop: "5px" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="card" style={{ marginBottom: "1rem", overflow: "hidden" }}>
              <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(59,130,246,0.08)" }}>
                <span className="ot" style={{ fontWeight: 700, color: "#60A5FA", fontSize: "0.87rem" }}>
                  Recent Responses ({(statsData.responses || []).length})
                </span>
              </div>
              {(statsData.responses || []).length === 0 ? (
                <p style={{ padding: "1rem", color: "#374151", fontSize: "0.82rem" }}>No responses yet. Share the tool!</p>
              ) : (
                [...(statsData.responses || [])].reverse().slice(0, 10).map((r, i) => (
                  <div key={i} style={{ padding: "0.7rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div>
                      <span className="ot" style={{ color: "#E2E8F0", fontWeight: 600, fontSize: "0.85rem" }}>{r.name}</span>
                      <span style={{ color: "#374151", fontSize: "0.72rem", marginLeft: "0.5rem" }}>{r.stream} · {r.goal}</span>
                    </div>
                    <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                      <span className="mn" style={{ fontSize: "0.65rem", color: "#EF4444", background: "rgba(239,68,68,0.1)", padding: "2px 6px", borderRadius: 4 }}>{r.highRisk} HIGH</span>
                      <span style={{ color: "#374151", fontSize: "0.68rem" }}>{r.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="card" style={{ overflow: "hidden" }}>
              <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(16,185,129,0.08)" }}>
                <span className="ot" style={{ fontWeight: 700, color: "#34D399", fontSize: "0.87rem" }}>
                  User Feedback ({(statsData.feedback || []).length})
                </span>
              </div>
              {(statsData.feedback || []).length === 0 ? (
                <p style={{ padding: "1rem", color: "#374151", fontSize: "0.82rem" }}>No feedback yet.</p>
              ) : (
                [...(statsData.feedback || [])].reverse().slice(0, 10).map((f, i) => (
                  <div key={i} style={{ padding: "0.8rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                      <span className="ot" style={{ color: "#E2E8F0", fontWeight: 600, fontSize: "0.83rem" }}>{f.name}</span>
                      <div style={{ display: "flex", gap: "2px" }}>
                        {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ fontSize: "0.7rem", color: s <= f.rating ? "#F59E0B" : "#1F2937" }}>★</span>)}
                      </div>
                    </div>
                    {f.text && <p style={{ color: "#9CA3AF", fontSize: "0.8rem", lineHeight: 1.5 }}>{f.text}</p>}
                    <p style={{ color: "#374151", fontSize: "0.68rem", marginTop: "3px" }}>{f.date}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // LANDING
  // ─────────────────────────────────────────────────────────────
  if (step === 0) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#07101E", position: "relative", overflow: "hidden" }} className="fade">
      {/* Ambient orbs */}
      <div style={{ position: "fixed", top: "-10%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-15%", right: "-8%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Nav */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 2.5rem", borderBottom: "1px solid rgba(255,255,255,0.04)", position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>📊</div>
          <span className="ot" style={{ fontWeight: 800, fontSize: "1rem", color: "#E2E8F0", letterSpacing: "-0.01em" }}>ClassPredictor</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <span className="mn" style={{ fontSize: "0.62rem", color: "#374151", letterSpacing: "0.12em" }}>FREE · NO LOGIN</span>
          <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.08)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px #10B981" }} />
            <span style={{ color: "#374151", fontSize: "0.73rem" }}>Live</span>
          </div>
          <button onClick={() => setShowAdmin(true)} className="btn" style={{ fontSize: "0.68rem", color: "#1F2937", padding: "3px 8px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.05)" }}>Admin</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem 2rem", textAlign: "center", position: "relative", zIndex: 5 }}>

        {/* Creator badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.45rem 1.1rem", borderRadius: 999, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "1.75rem" }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#F59E0B,#EF4444)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: "white", fontFamily: "Outfit, sans-serif" }}>P</div>
          <span style={{ color: "#9CA3AF", fontSize: "0.78rem" }}>Built by</span>
          <span className="ot" style={{ fontWeight: 700, fontSize: "0.82rem", color: "#F59E0B" }}>Parth Goyal</span>
        </div>

        <div className="mn" style={{ color: "#3B82F6", fontSize: "0.62rem", letterSpacing: "0.3em", marginBottom: "1.1rem", opacity: 0.7 }}>CLASS 11–12 · JEE · NEET · BOARDS · CUET</div>

        <h1 className="ot" style={{ fontSize: "clamp(2rem,6vw,4.5rem)", fontWeight: 900, lineHeight: 1.03, color: "#FFFFFF", marginBottom: "0.75rem", letterSpacing: "-0.03em", maxWidth: 700 }}>
          Know exactly what<br />
          <span style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Class 11 will hit you
          </span>
          <br />with.
        </h1>

        <p style={{ color: "#6B7280", fontSize: "1rem", maxWidth: 500, marginBottom: "2.5rem", lineHeight: 1.7 }}>
          Rate your Class 9–10 understanding. Our prerequisite dependency graph predicts which Class 11–12 chapters you will struggle with — and precisely why.
        </p>

        <button onClick={() => setStep(0.5)} className="btn ot" style={{
          background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", color: "white", borderRadius: 14,
          padding: "1rem 2.75rem", fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.01em",
          boxShadow: "0 6px 28px rgba(59,130,246,0.45)", marginBottom: "1rem",
        }}>
          Start My Analysis →
        </button>

        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
          {["~5 minutes", "30+ chapters", "4 exams", "15+ students"].map(t => (
            <span key={t} style={{ color: "#374151", fontSize: "0.73rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <span style={{ color: "#10B981", fontSize: "0.65rem" }}>✓</span>{t}
            </span>
          ))}
        </div>

        {/* Feature cards — PC-friendly grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.75rem", maxWidth: 720, width: "100%", marginBottom: "3rem" }}>
          {[
            { icon: "🔗", title: "Dependency Graph",  desc: "Maps 30+ real chapter prerequisites across all subjects",  col: "#3B82F6" },
            { icon: "🎯", title: "Personalized Risk",  desc: "HIGH / MEDIUM / LOW risk from your actual chapter ratings", col: "#8B5CF6" },
            { icon: "🗺️", title: "Smart Roadmap",    desc: "Phased study sequence with estimated hours per chapter",    col: "#10B981" },
            { icon: "⚠️", title: "Reality Warnings",  desc: "Honest alerts about chapters that blindside students",      col: "#F59E0B" },
          ].map(f => (
            <div key={f.title} className="card" style={{ padding: "1.1rem", textAlign: "left", borderColor: f.col + "22" }}>
              <div style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}>{f.icon}</div>
              <div className="ot" style={{ fontWeight: 700, color: "#E2E8F0", fontSize: "0.82rem", marginBottom: "3px" }}>{f.title}</div>
              <div style={{ color: "#374151", fontSize: "0.72rem", lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", justifyContent: "center", padding: "1.25rem 2.5rem", borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "3rem" }}>
          {[
            { val: "30+",                               label: "Chapters Mapped"  },
            { val: "4",                                  label: "Exam Targets"    },
            { val: "4",                                  label: "Subjects Covered" },
            { val: "250+", label: "Students Used" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="ot" style={{ fontSize: "1.6rem", fontWeight: 900, color: "#FFFFFF", lineHeight: 1 }}>{s.val}</div>
              <div style={{ color: "#374151", fontSize: "0.7rem", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{ width: "100%", maxWidth: 780, marginBottom: "2rem" }}>
          <div className="mn" style={{ color: "#374151", fontSize: "0.65rem", letterSpacing: "0.12em", marginBottom: "1rem", textAlign: "center" }}>WHAT STUDENTS SAY</div>
          <div className="scrollhide" style={{ display: "flex", gap: "0.75rem", overflowX: "auto", paddingBottom: 4 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card" style={{ minWidth: 250, maxWidth: 270, padding: "1.1rem", flexShrink: 0, textAlign: "left" }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "0.6rem" }}>
                  {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ fontSize: "0.75rem", color: s <= t.stars ? "#F59E0B" : "#1F2937" }}>★</span>)}
                </div>
                <p style={{ color: "#9CA3AF", fontSize: "0.78rem", lineHeight: 1.55, marginBottom: "0.75rem" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "white", fontFamily: "Outfit, sans-serif", flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <div className="ot" style={{ color: "#E2E8F0", fontWeight: 700, fontSize: "0.78rem" }}>{t.name}</div>
                    <div style={{ color: "#374151", fontSize: "0.68rem" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: "1.25rem 2.5rem", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", position: "relative", zIndex: 10 }}>
  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
    <span style={{ color: "#1F2937", fontSize: "0.73rem" }}>Designed & developed by</span>
    <a href="https://parth-goyal.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.78rem", textDecoration: "none", fontFamily: "Outfit, sans-serif" }}>
      Parth Goyal ↗
    </a>
  </div>
  <a href={"mailto:" + CREATOR_EMAIL} style={{ color: "#374151", fontSize: "0.72rem", textDecoration: "none", fontFamily: "Space Mono, monospace" }}>{CREATOR_EMAIL}</a>
</footer>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // NAME COLLECTION
  // ─────────────────────────────────────────────────────────────
  if (step === 0.5) return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }} className="fade">
      <div style={{ width: "100%", maxWidth: 440, textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1.25rem" }}>👋</div>
        <h2 className="ot" style={{ fontSize: "1.9rem", fontWeight: 900, color: "#FFFFFF", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>What's your name?</h2>
        <p style={{ color: "#6B7280", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.6 }}>
          We'll use this to personalise your report and roadmap.
        </p>
        <input
          type="text"
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && nameInput.trim().length >= 2) { setStudentName(nameInput.trim()); setStep(1); } }}
          placeholder="Enter your full name..."
          autoFocus
          style={{
            width: "100%", padding: "1rem 1.25rem", borderRadius: 12,
            background: "#0D1929", color: "#FFFFFF", fontSize: "1.05rem", marginBottom: "1rem",
            border: "1px solid " + (nameInput.length > 1 ? "#3B82F6" : "rgba(255,255,255,0.1)"),
            transition: "border-color 0.2s",
          }}
        />
        <button
          onClick={() => { if (nameInput.trim().length >= 2) { setStudentName(nameInput.trim()); setStep(1); } }}
          disabled={nameInput.trim().length < 2}
          className="btn ot"
          style={{
            width: "100%", padding: "0.95rem", borderRadius: 12, fontSize: "1rem", fontWeight: 700,
            background: nameInput.trim().length >= 2 ? "linear-gradient(135deg,#3B82F6,#1D4ED8)" : "#0D1929",
            color: nameInput.trim().length >= 2 ? "white" : "#374151",
            cursor: nameInput.trim().length >= 2 ? "pointer" : "not-allowed",
            boxShadow: nameInput.trim().length >= 2 ? "0 4px 20px rgba(59,130,246,0.35)" : "none",
          }}
        >
          Let's Go →
        </button>
        <button onClick={() => setStep(0)} className="btn" style={{ marginTop: "1rem", color: "#374151", fontSize: "0.78rem" }}>← Back to home</button>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // STEP 1 — STREAM + GOAL
  // ─────────────────────────────────────────────────────────────
  if (step === 1) return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1.5rem" }} className="fade">
      <StepBar step={1} />
      <h2 className="ot" style={{ fontSize: "1.65rem", fontWeight: 800, marginBottom: "0.25rem", color: "#FFFFFF" }}>
        Hey {studentName}! 👋
      </h2>
      <p style={{ color: "#6B7280", marginBottom: "2rem", fontSize: "0.9rem" }}>Choose your stream and target exam to personalise your analysis.</p>

      <SLabel>CHOOSE YOUR STREAM</SLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", marginBottom: "2rem" }}>
        {Object.entries(STREAM_SUBJECTS).map(([id, subs]) => (
          <button key={id} onClick={() => setStream(id)} className="btn card" style={{
            padding: "1rem", textAlign: "left",
            borderColor: stream === id ? "#3B82F6" : "rgba(255,255,255,0.06)",
            background: stream === id ? "rgba(59,130,246,0.1)" : "#0D1929",
          }}>
            <div className="ot" style={{ fontWeight: 700, fontSize: "1.05rem", color: stream === id ? "#3B82F6" : "#E2E8F0" }}>{id}</div>
            <div style={{ fontSize: "0.72rem", color: "#374151", marginTop: "3px" }}>
              {subs.filter(s => s !== "core_maths").map(s => SMETA[s].name).join(" · ")}
            </div>
          </button>
        ))}
      </div>

      <SLabel>YOUR TARGET EXAM</SLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", marginBottom: "2.5rem" }}>
        {[["JEE", "IIT/NIT Engineering"], ["NEET", "Medical Entrance"], ["Boards", "CBSE/State Boards"], ["CUET", "Central University"]].map(([g, desc]) => (
          <button key={g} onClick={() => setGoal(g)} className="btn card" style={{
            padding: "1rem", textAlign: "left",
            borderColor: goal === g ? "#F59E0B" : "rgba(255,255,255,0.06)",
            background: goal === g ? "rgba(245,158,11,0.1)" : "#0D1929",
          }}>
            <div className="ot" style={{ fontWeight: 700, fontSize: "1.05rem", color: goal === g ? "#F59E0B" : "#E2E8F0" }}>{g}</div>
            <div style={{ fontSize: "0.72rem", color: "#374151", marginTop: "3px" }}>{desc}</div>
          </button>
        ))}
      </div>

      <PBtn disabled={!stream || !goal} onClick={() => { setStep(2); setSubIdx(0); }}>
        Continue → Rate Your Chapters
      </PBtn>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // STEP 2 — RATING
  // ─────────────────────────────────────────────────────────────
  if (step === 2) {
    const meta     = SMETA[curSub];
    const allRated = subjects.every(s => (FOUNDATION[s] || []).every(c => ratings[c.id] != null));
    const isLast   = subIdx === subjects.length - 1;

    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "1.5rem 1.5rem 5rem" }} className="fade">
        <StepBar step={2} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <span style={{ color: "#6B7280", fontSize: "0.8rem" }}>{ratedCount}/{totalCount} chapters rated</span>
          <span className="mn" style={{ color: "#3B82F6", fontSize: "0.75rem" }}>{pct}%</span>
        </div>
        <div style={{ height: 3, background: "#0D1929", borderRadius: 9, marginBottom: "1.5rem", overflow: "hidden" }}>
          <div style={{ height: "100%", width: pct + "%", background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", borderRadius: 9, transition: "width 0.4s" }} />
        </div>

        {/* Subject tabs */}
        <div className="scrollhide" style={{ display: "flex", gap: "0.4rem", marginBottom: "1.25rem", overflowX: "auto", paddingBottom: 2 }}>
          {subjects.map((s, i) => {
            const m    = SMETA[s];
            const chs  = FOUNDATION[s] || [];
            const done = chs.filter(c => ratings[c.id] != null).length;
            return (
              <button key={s} onClick={() => setSubIdx(i)} className="btn ot" style={{
                padding: "0.45rem 0.9rem", borderRadius: 8, fontSize: "0.8rem", fontWeight: 700, whiteSpace: "nowrap",
                background: subIdx === i ? m.bg : "#0D1929",
                color: subIdx === i ? m.color : "#4B5563",
                border: "1px solid " + (subIdx === i ? m.color + "55" : "rgba(255,255,255,0.06)"),
              }}>
                {m.icon} {m.name}{done > 0 && <span style={{ opacity: 0.55, fontWeight: 400 }}> {done}/{chs.length}</span>}
              </button>
            );
          })}
        </div>

        {meta && meta.note && (
          <div style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, padding: "0.6rem 0.9rem", marginBottom: "1rem", fontSize: "0.78rem", color: "#D97706" }}>
            📌 {meta.note}
          </div>
        )}

        <div className="ot" style={{ fontWeight: 800, fontSize: "1.15rem", color: "#FFFFFF", marginBottom: "0.25rem" }}>
          {meta && meta.icon} {meta && meta.name}
        </div>
        <p style={{ color: "#374151", fontSize: "0.8rem", marginBottom: "1rem" }}>
          Rate 1 (very easy) to 5 (very difficult). Be honest, {studentName} — this only helps you.
        </p>

        {/* Legend */}
        <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          {[1, 2, 3, 4, 5].map(v => (
            <span key={v} className="mn" style={{ fontSize: "0.65rem", color: DCOL[v], padding: "2px 7px", background: DCOL[v] + "18", borderRadius: 4 }}>
              {v} = {["","V.Easy","Easy","Avg","Hard","V.Hard"][v]}
            </span>
          ))}
        </div>

        {/* PC-friendly 2-column grid on wide screens */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "0.65rem" }}>
          {curChapters.map(ch => {
            const r = ratings[ch.id];
            return (
              <div key={ch.id} className="card" style={{
                padding: "0.9rem 1rem",
                borderColor: r ? DCOL[r] + "55" : "rgba(255,255,255,0.06)",
                background: r ? DCOL[r] + "0A" : "#0D1929",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                  <div style={{ flex: 1, minWidth: 0, paddingRight: "0.5rem" }}>
                    <div className="ot" style={{ fontWeight: 700, color: "#E2E8F0", fontSize: "0.9rem" }}>{ch.name}</div>
                    <div style={{ color: "#374151", fontSize: "0.72rem", marginTop: "2px" }}>{ch.detail} · Class {ch.cl}</div>
                  </div>
                  {r && (
                    <span className="mn" style={{ fontSize: "0.65rem", color: DCOL[r], background: DCOL[r] + "18", padding: "2px 8px", borderRadius: 6, whiteSpace: "nowrap", flexShrink: 0 }}>
                      {DLABEL[r]}
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", gap: "0.35rem" }}>
                  {[1, 2, 3, 4, 5].map(v => (
                    <button key={v} onClick={() => rate(ch.id, v)} className="btn mn" style={{
                      flex: 1, padding: "0.4rem 0", borderRadius: 7, fontSize: "0.72rem", fontWeight: 700,
                      background: r === v ? DCOL[v] : r && r !== v ? "#060E1A" : "#132035",
                      color: r === v ? "white" : r && r !== v ? "#1F2937" : "#4B5563",
                      border: "1px solid " + (r === v ? DCOL[v] : "rgba(255,255,255,0.04)"),
                    }}>{v}</button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons — Next Subject is primary, Analyze is secondary */}
        <div style={{ display: "flex", gap: "0.65rem", marginTop: "1.5rem" }}>
          <button
            onClick={doAnalyze}
            disabled={ratedCount === 0}
            className="btn ot"
            style={{
              flex: 1, padding: "0.85rem", borderRadius: 11, fontWeight: 700, fontSize: "0.9rem",
              background: ratedCount > 0 ? "#132035" : "#0D1929",
              color: ratedCount > 0 ? "#6B7280" : "#1F2937",
              cursor: ratedCount > 0 ? "pointer" : "not-allowed",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {allRated ? "Get Report 🚀" : "Analyze (" + ratedCount + "/" + totalCount + ")"}
          </button>

          {!isLast ? (
            <button onClick={() => setSubIdx(i => i + 1)} className="btn ot" style={{
              flex: 2, padding: "0.85rem", borderRadius: 11, fontWeight: 700, fontSize: "0.9rem",
              background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", color: "white",
              boxShadow: "0 4px 18px rgba(59,130,246,0.35)",
            }}>
              Next Subject →
            </button>
          ) : (
            <button onClick={doAnalyze} disabled={ratedCount === 0} className="btn ot" style={{
              flex: 2, padding: "0.85rem", borderRadius: 11, fontWeight: 700, fontSize: "0.9rem",
              background: ratedCount > 0 ? "linear-gradient(135deg,#3B82F6,#1D4ED8)" : "#0D1929",
              color: ratedCount > 0 ? "white" : "#1F2937",
              cursor: ratedCount > 0 ? "pointer" : "not-allowed",
              boxShadow: ratedCount > 0 ? "0 4px 18px rgba(59,130,246,0.35)" : "none",
            }}>
              {allRated ? "Generate My Report 🚀" : "Analyze (" + ratedCount + "/" + totalCount + " rated)"}
            </button>
          )}
        </div>

        <p style={{ textAlign: "center", color: "#1F2937", fontSize: "0.72rem", marginTop: "0.75rem" }}>
          Rate as many as you can — more ratings = more accurate predictions
        </p>
      </div>
    );
  }

  if (step === 3 && results) {
    const { res, roadmap, warnings, stats } = results;
    const gk = goal === "NEET" ? "NEET" : goal === "JEE" ? "JEE" : goal === "CUET" ? "CUET" : "Boards";

    const wtColor = v => ({ VH: "#EF4444", H: "#F97316", M: "#F59E0B", L: "#10B981", NA: "#374151" }[v] || "#374151");
    const wtLabel = v => ({ VH: "Very High", H: "High", M: "Medium", L: "Low", NA: "—" }[v] || "—");

    const quads = {
      critical: res.filter(c => c.risk !== "LOW" && WT_ORD[c.wt[gk] || "M"] >= 3),
      review:   res.filter(c => c.risk !== "LOW" && WT_ORD[c.wt[gk] || "M"] <  3),
      easywin:  res.filter(c => c.risk === "LOW" && WT_ORD[c.wt[gk] || "M"] >= 3),
      skip:     res.filter(c => c.risk === "LOW" && WT_ORD[c.wt[gk] || "M"] <  3),
    };

    return (
      <>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "1.5rem 1.5rem 5rem" }} className="fade">

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", gap: "0.75rem", flexWrap: "wrap" }}>
          <div>
            <div className="mn" style={{ color: "#3B82F6", fontSize: "0.65rem", letterSpacing: "0.2em", marginBottom: "4px" }}>YOUR INTELLIGENCE REPORT</div>
            <h1 className="ot" style={{ fontSize: "1.7rem", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {studentName}'s Class 11–12 Analysis
            </h1>
            <p style={{ color: "#374151", fontSize: "0.8rem", marginTop: "4px" }}>{stream} · {goal} · {stats.total} chapters mapped</p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={shareReport} className="btn ot" style={{ padding: "0.5rem 0.9rem", borderRadius: 9, fontSize: "0.8rem", fontWeight: 600, background: "#0D1929", color: "#4B5563", border: "1px solid rgba(255,255,255,0.07)" }}>Share 📤</button>
            <button onClick={resetAll} className="btn ot" style={{ padding: "0.5rem 0.9rem", borderRadius: 9, fontSize: "0.8rem", fontWeight: 600, background: "#0D1929", color: "#4B5563", border: "1px solid rgba(255,255,255,0.07)" }}>↩ Restart</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.6rem", marginBottom: "1.5rem" }}>
          {[
            { label: "High Risk",   val: stats.highCnt,          col: "#EF4444" },
            { label: "Medium Risk", val: stats.medCnt,           col: "#F59E0B" },
            { label: "Low Risk",    val: stats.lowCnt,           col: "#10B981" },
            { label: "Study Hours", val: "~" + stats.totalH + "h", col: "#3B82F6" },
          ].map(s => (
            <div key={s.label} className="card" style={{ padding: "0.85rem", textAlign: "center" }}>
              <div className="mn" style={{ fontSize: "1.4rem", fontWeight: 700, color: s.col, lineHeight: 1 }}>{s.val}</div>
              <div style={{ color: "#374151", fontSize: "0.68rem", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Warnings */}
        {warnings.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <SLabel>REALITY WARNINGS FOR {studentName.toUpperCase()}</SLabel>
            {warnings.map((w, i) => (
              <div key={i} className="card" style={{
                padding: "0.85rem 1rem", marginBottom: "0.5rem", display: "flex", gap: "0.75rem", alignItems: "flex-start",
                borderColor: w.sev === "high" ? "rgba(239,68,68,0.35)" : "rgba(245,158,11,0.35)",
                background: w.sev === "high" ? "rgba(239,68,68,0.06)" : "rgba(245,158,11,0.06)",
              }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: "1px" }}>{w.icon}</span>
                <p style={{ color: w.sev === "high" ? "#FCA5A5" : "#FDE68A", fontSize: "0.82rem", lineHeight: 1.55 }}>{w.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.35rem", marginBottom: "1.25rem", background: "#0D1929", borderRadius: 10, padding: "4px" }}>
          {[["report", "📋 Report"], ["roadmap", "🗺️ Roadmap"], ["matrix", "🎯 Priority"], ["feedback", "💬 Feedback"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} className="btn ot" style={{
              flex: 1, padding: "0.5rem 0.25rem", borderRadius: 7, fontSize: "0.78rem", fontWeight: 700,
              background: tab === id ? "#132035" : "transparent",
              color: tab === id ? "#E2E8F0" : "#4B5563",
              border: tab === id ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
            }}>{label}</button>
          ))}
        </div>

        {/* ── REPORT TAB ── */}
        {tab === "report" && (
          <div>
            <p style={{ color: "#374151", fontSize: "0.78rem", marginBottom: "0.9rem" }}>Tap any chapter to see your specific gaps and action plan.</p>
            {/* PC-friendly 2-col grid for LOW risk chapters */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {res.map((ch, i) => {
                const open   = expanded === ch.id;
                const wtVal  = ch.wt[gk] || "M";
                const chTip  = getTip(ch, goal);
                const riskIcon = ch.risk === "HIGH" ? "🔴" : ch.risk === "MEDIUM" ? "🟡" : "🟢";
                return (
                  <div key={ch.id} className="card" style={{ overflow: "hidden", borderColor: open ? RC[ch.risk] + "55" : "rgba(255,255,255,0.06)" }}>
                    <div onClick={() => setExpanded(open ? null : ch.id)} style={{ padding: "0.9rem 1rem", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flex: 1, minWidth: 0 }}>
                        <span className="mn" style={{ color: "#1F2937", fontSize: "0.7rem", flexShrink: 0 }}>#{i + 1}</span>
                        <div style={{ minWidth: 0 }}>
                          <div className="ot" style={{ fontWeight: 700, color: "#E2E8F0", fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.name}</div>
                          <div style={{ color: "#374151", fontSize: "0.7rem", marginTop: "2px" }}>{SMETA[ch.subj] && SMETA[ch.subj].name} · Class {ch.cls}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px", flexShrink: 0 }}>
                        <span className="mn" style={{ fontSize: "0.68rem", fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: RBG[ch.risk], color: RC[ch.risk] }}>
                          {riskIcon} {ch.risk}
                        </span>
                        <span style={{ color: wtColor(wtVal), fontSize: "0.67rem", fontFamily: "Space Mono, monospace" }}>{goal}: {wtLabel(wtVal)}</span>
                      </div>
                    </div>

                    {open && (
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "0.9rem 1rem", background: "rgba(0,0,0,0.2)" }}>
                        {ch.gaps.length > 0 ? (
                          <div style={{ marginBottom: "0.9rem" }}>
                            <div className="mn" style={{ color: "#EF4444", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.45rem" }}>WHY YOU MAY STRUGGLE</div>
                            {ch.gaps.map((g, gi) => (
                              <div key={gi} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem" }}>
                                <span style={{ color: "#EF4444", fontSize: "0.78rem", flexShrink: 0, marginTop: "2px" }}>↳</span>
                                <p style={{ color: "#D1D5DB", fontSize: "0.8rem", lineHeight: 1.55 }}>{g.reason}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p style={{ color: "#10B981", fontSize: "0.82rem", marginBottom: "0.9rem" }}>✅ No major prerequisite gaps detected.</p>
                        )}

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.5rem", marginBottom: "0.75rem" }}>
                          {[
                            { l: "Study Hours", v: ch.studyH + " hrs", c: "#3B82F6"      },
                            { l: "Risk Level",  v: ch.risk,            c: RC[ch.risk]    },
                            { l: goal + " Weight", v: wtLabel(wtVal),  c: wtColor(wtVal) },
                          ].map(s => (
                            <div key={s.l} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 7, padding: "0.55rem", textAlign: "center" }}>
                              <div className="mn" style={{ color: s.c, fontWeight: 700, fontSize: "0.8rem" }}>{s.v}</div>
                              <div style={{ color: "#374151", fontSize: "0.65rem", marginTop: "2px" }}>{s.l}</div>
                            </div>
                          ))}
                        </div>

                        <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 8, padding: "0.6rem 0.85rem" }}>
                          <span className="ot" style={{ color: "#60A5FA", fontSize: "0.7rem", fontWeight: 700 }}>💡 ACTION  </span>
                          <span style={{ color: "#93C5FD", fontSize: "0.8rem" }}>{chTip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ROADMAP TAB ── */}
        {tab === "roadmap" && (
          <div>
            <p style={{ color: "#374151", fontSize: "0.78rem", marginBottom: "1.25rem" }}>
              Your personalised study sequence, {studentName}. Follow this order for maximum efficiency.
            </p>
            {roadmap.length === 0 ? (
              <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🎉</div>
                <p className="ot" style={{ color: "#10B981", fontWeight: 800, fontSize: "1.1rem" }}>Strong Foundation!</p>
                <p style={{ color: "#4B5563", fontSize: "0.85rem", marginTop: "0.5rem" }}>Your Class 9-10 base looks solid. Focus on consistency and regular revision.</p>
              </div>
            ) : (
              roadmap.map((ph, pi) => (
                <div key={pi} className="card" style={{ marginBottom: "0.75rem", overflow: "hidden" }}>
                  <div style={{ background: ph.col + "18", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0.65rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span className="mn" style={{ color: ph.col, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em" }}>{ph.phase}</span>
                    <span className="ot" style={{ color: "#E2E8F0", fontWeight: 700, fontSize: "0.87rem" }}>{ph.title}</span>
                  </div>
                  {ph.items.map((item, ii) => (
                    <div key={ii} style={{ padding: "0.6rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: ii < ph.items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: "#D1D5DB", fontSize: "0.83rem" }}><span style={{ color: ph.col, marginRight: "0.35rem" }}>→</span>{item.label}</div>
                        {item.detail && <div style={{ color: "#374151", fontSize: "0.72rem", marginTop: "2px", marginLeft: "1rem" }}>{item.detail}</div>}
                      </div>
                      <span className="mn" style={{ color: "#374151", fontSize: "0.68rem", flexShrink: 0, marginLeft: "0.75rem" }}>{item.time}</span>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}

        {/* ── PRIORITY MATRIX TAB ── */}
        {tab === "matrix" && (
          <div>
            <p style={{ color: "#374151", fontSize: "0.78rem", marginBottom: "1.25rem" }}>
              Time allocation strategy: your risk level × {goal} exam weightage.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[
                { key: "critical", label: "🔴 FOCUS FIRST",      desc: "High risk · High weightage",  col: "#EF4444", bg: "rgba(239,68,68,0.07)"  },
                { key: "review",   label: "🟡 REVIEW CAREFULLY", desc: "High risk · Lower weightage",  col: "#F59E0B", bg: "rgba(245,158,11,0.07)" },
                { key: "easywin", label: "✅ EASY MARKS",        desc: "Low risk · High weightage",    col: "#10B981", bg: "rgba(16,185,129,0.07)" },
                { key: "skip",     label: "⬇️ MINIMAL TIME",    desc: "Low risk · Lower weightage",   col: "#4B5563", bg: "rgba(75,85,99,0.07)"   },
              ].map(q => (
                <div key={q.key} style={{ border: "1px solid " + q.col + "33", borderRadius: 12, padding: "1rem", background: q.bg, minHeight: 130 }}>
                  <div className="ot" style={{ fontWeight: 700, fontSize: "0.8rem", color: q.col, marginBottom: "2px" }}>{q.label}</div>
                  <div style={{ color: "#374151", fontSize: "0.7rem", marginBottom: "0.65rem" }}>{q.desc}</div>
                  {quads[q.key].length === 0 ? (
                    <div style={{ color: "#1F2937", fontSize: "0.72rem" }}>None here</div>
                  ) : (
                    quads[q.key].map(ch => (
                      <div key={ch.id} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 5, padding: "0.25rem 0.5rem", marginBottom: "0.25rem", fontSize: "0.73rem", color: "#6B7280" }}>
                        {ch.name}
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FEEDBACK TAB ── */}
        {tab === "feedback" && (
          <div>
            {feedback.submitted ? (
              <div className="card" style={{ padding: "2.5rem", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🙏</div>
                <h3 className="ot" style={{ color: "#10B981", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>Thank you, {studentName}!</h3>
                <p style={{ color: "#4B5563", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>Your feedback helps make this tool better for every student who uses it.</p>
                <p style={{ color: "#374151", fontSize: "0.8rem" }}>Have suggestions or questions? Reach out directly:</p>
                <a href={"mailto:" + CREATOR_EMAIL} style={{ color: "#F59E0B", fontSize: "0.82rem", fontFamily: "Space Mono, monospace", textDecoration: "none", display: "block", marginTop: "0.4rem" }}>{CREATOR_EMAIL}</a>
              </div>
            ) : (
              <div style={{ maxWidth: 560, margin: "0 auto" }}>
                <p style={{ color: "#6B7280", fontSize: "0.85rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                  Help Parth improve this tool! Your honest feedback takes 30 seconds and makes a real difference.
                </p>

                <div className="card" style={{ padding: "1.25rem", marginBottom: "1rem" }}>
                  <div className="ot" style={{ fontWeight: 700, color: "#E2E8F0", fontSize: "0.9rem", marginBottom: "0.75rem" }}>How useful was this analysis for you?</div>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    {[1, 2, 3, 4, 5].map(v => (
                      <button key={v} onClick={() => setFeedback(f => ({ ...f, rating: v }))} className="btn" style={{
                        flex: 1, padding: "0.65rem 0", borderRadius: 9, fontSize: "1.3rem",
                        background: feedback.rating >= v ? "rgba(245,158,11,0.15)" : "#132035",
                        border: "1px solid " + (feedback.rating >= v ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.05)"),
                      }}>★</button>
                    ))}
                  </div>
                  {feedback.rating > 0 && (
                    <p style={{ color: "#6B7280", fontSize: "0.72rem", textAlign: "center" }}>
                      {["", "Not useful", "Could be better", "Average", "Quite useful", "Very useful!"][feedback.rating]}
                    </p>
                  )}
                </div>

                <div className="card" style={{ padding: "1.25rem", marginBottom: "1.25rem" }}>
                  <div className="ot" style={{ fontWeight: 700, color: "#E2E8F0", fontSize: "0.9rem", marginBottom: "0.6rem" }}>Any specific feedback? (optional)</div>
                  <textarea
                    value={feedback.text}
                    onChange={e => setFeedback(f => ({ ...f, text: e.target.value }))}
                    placeholder="What did you like? What can be improved? Which chapters are missing?"
                    rows={3}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: 9, background: "#132035", border: "1px solid rgba(255,255,255,0.07)", color: "#E2E8F0", fontSize: "0.85rem", resize: "none", lineHeight: 1.6 }}
                  />
                </div>

                <button onClick={submitFeedback} disabled={feedback.rating === 0} className="btn ot" style={{
                  width: "100%", padding: "0.9rem", borderRadius: 11, fontWeight: 700, fontSize: "0.95rem",
                  background: feedback.rating > 0 ? "linear-gradient(135deg,#10B981,#059669)" : "#0D1929",
                  color: feedback.rating > 0 ? "white" : "#374151",
                  cursor: feedback.rating > 0 ? "pointer" : "not-allowed",
                  boxShadow: feedback.rating > 0 ? "0 4px 18px rgba(16,185,129,0.3)" : "none",
                  marginBottom: "1.5rem",
                }}>
                  Submit Feedback 🙏
                </button>

                <div style={{ textAlign: "center", padding: "1.25rem", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ color: "#374151", fontSize: "0.8rem", marginBottom: "0.4rem" }}>Built with ❤️ by</p>
                  <p className="ot" style={{ color: "#F59E0B", fontWeight: 800, fontSize: "1rem", marginBottom: "0.4rem" }}>Parth Goyal</p>
                  <a href={"mailto:" + CREATOR_EMAIL} style={{ color: "#374151", fontSize: "0.75rem", fontFamily: "Space Mono, monospace", textDecoration: "none" }}>{CREATOR_EMAIL}</a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {showFeedbackPopup && !feedback.submitted && (
        <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 999, maxWidth: 320, width: "calc(100vw - 3rem)" }}>
          <div style={{ background: "#0D1929", border: "1px solid rgba(59,130,246,0.4)", borderRadius: 16, padding: "1.25rem", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <div>
                <p className="ot" style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "0.9rem" }}>How was your experience? 😊</p>
                <p style={{ color: "#6B7280", fontSize: "0.75rem", marginTop: "2px" }}>Takes 10 seconds — helps improve this tool</p>
              </div>
              <button onClick={() => setShowFeedbackPopup(false)} className="btn" style={{ color: "#374151", fontSize: "1rem", padding: "0 4px" }}>✕</button>
            </div>
            <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.75rem" }}>
              {[1, 2, 3, 4, 5].map(v => (
                <button key={v} onClick={() => setFeedback(f => ({ ...f, rating: v }))} className="btn" style={{
                  flex: 1, padding: "0.5rem 0", borderRadius: 8, fontSize: "1.2rem",
                  background: feedback.rating >= v ? "rgba(245,158,11,0.15)" : "#132035",
                  border: "1px solid " + (feedback.rating >= v ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.05)"),
                }}>★</button>
              ))}
            </div>
            <textarea
              value={feedback.text}
              onChange={e => setFeedback(f => ({ ...f, text: e.target.value }))}
              placeholder="Any suggestions? (optional)"
              rows={2}
              style={{ width: "100%", padding: "0.6rem", borderRadius: 8, background: "#132035", border: "1px solid rgba(255,255,255,0.07)", color: "#E2E8F0", fontSize: "0.8rem", resize: "none", marginBottom: "0.75rem", fontFamily: "Plus Jakarta Sans, sans-serif" }}
            />
            <button onClick={() => { if (feedback.rating === 0) return; submitFeedback(); setShowFeedbackPopup(false); }} className="btn ot" style={{
              width: "100%", padding: "0.65rem", borderRadius: 9, fontWeight: 700, fontSize: "0.85rem",
              background: feedback.rating > 0 ? "linear-gradient(135deg,#10B981,#059669)" : "#132035",
              color: feedback.rating > 0 ? "white" : "#374151",
              cursor: feedback.rating > 0 ? "pointer" : "not-allowed",
            }}>
              {feedback.rating > 0 ? "Submit Feedback 🙏" : "Select a rating first"}
            </button>
          </div>
        </div>
      )}
      </>
    );
  }
}

// ─────────────────────────────────────────────────────────────
// HELPER COMPONENTS
// ─────────────────────────────────────────────────────────────

function StepBar({ step }) {
  const labels = { 1: "Stream & Goal", 2: "Rate Chapters", 3: "Your Report" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem" }}>
      {[1, 2, 3].map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{
            width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Space Mono, monospace", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0,
            background: step >= s ? "#3B82F6" : "#0D1929",
            color: step >= s ? "white" : "#374151",
            border: step >= s ? "none" : "1px solid rgba(255,255,255,0.07)",
          }}>{s}</div>
          {i < 2 && <div style={{ width: 28, height: 2, background: step > s ? "#3B82F6" : "#0D1929", borderRadius: 1 }} />}
        </div>
      ))}
      <span style={{ marginLeft: "auto", color: "#374151", fontSize: "0.73rem" }}>{labels[step] || ""}</span>
    </div>
  );
}

function SLabel({ children }) {
  return <div className="mn" style={{ color: "#374151", fontSize: "0.65rem", letterSpacing: "0.12em", marginBottom: "0.6rem" }}>{children}</div>;
}

function PBtn({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} className="btn ot" style={{
      width: "100%", padding: "0.9rem", borderRadius: 11, fontSize: "0.95rem", fontWeight: 700,
      background: disabled ? "#0D1929" : "linear-gradient(135deg,#3B82F6,#1D4ED8)",
      color: disabled ? "#1F2937" : "white",
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: disabled ? "none" : "0 4px 18px rgba(59,130,246,0.35)",
    }}>{children}</button>
  );
}
