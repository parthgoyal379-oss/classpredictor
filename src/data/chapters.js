export const ADMIN_PASSWORD = "qwertyuiop1234567890";
export const CREATOR_EMAIL = "parthgoyal379@gmail.com";

export const STREAM_SUBJECTS = {
  PCM: ["physics", "chemistry", "maths"],
  PCB: ["physics", "chemistry", "biology", "core_maths"],
  PCMB: ["physics", "chemistry", "maths", "biology"],
  Commerce: ["maths"],
};

export const SMETA = {
  physics: {
    name: "Physics",
    color: "#3B82F6",
    bg: "rgba(59, 130, 246, 0.1)",
    border: "rgba(59, 130, 246, 0.25)",
  },
  chemistry: {
    name: "Chemistry",
    color: "#A855F7",
    bg: "rgba(168, 85, 247, 0.1)",
    border: "rgba(168, 85, 247, 0.25)",
  },
  maths: {
    name: "Maths",
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.25)",
  },
  biology: {
    name: "Biology",
    color: "#10B981",
    bg: "rgba(16, 185, 129, 0.1)",
    border: "rgba(16, 185, 129, 0.25)",
  },
  core_maths: {
    name: "Core Maths",
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.25)",
    note: "2 targeted questions — vital for Chemistry numerical and mole calculations",
  },
};

export const DLABEL = ["", "Mastered", "Confident", "Moderate", "Struggling", "Unprepared"];
export const DCOL = ["", "#10B981", "#34D399", "#F59E0B", "#F97316", "#EF4444"];
export const RC = { HIGH: "#EF4444", MEDIUM: "#F59E0B", LOW: "#10B981" };
export const RBG = {
  HIGH: "rgba(239, 68, 68, 0.12)",
  MEDIUM: "rgba(245, 158, 11, 0.12)",
  LOW: "rgba(16, 185, 129, 0.12)",
};
export const WT_ORD = { VH: 4, H: 3, M: 2, L: 1, NA: 0 };

export const FOUNDATION = {
  physics: [
    { id: "motion", name: "Motion", detail: "Speed, velocity, distance-time graphs, acceleration", cl: 10 },
    { id: "force_laws", name: "Force & Laws of Motion", detail: "Newton's 3 laws, inertia, friction, momentum", cl: 9 },
    { id: "gravitation", name: "Gravitation", detail: "Universal law, free fall, weight vs mass", cl: 9 },
    { id: "work_energy", name: "Work, Energy & Power", detail: "Work done, KE, PE, conservation of energy", cl: 9 },
    { id: "sound", name: "Sound", detail: "Wave nature, propagation, reflection, echo", cl: 9 },
    { id: "light", name: "Light — Reflection & Refraction", detail: "Mirror/lens formula, refraction, human eye", cl: 10 },
    { id: "electricity", name: "Electricity", detail: "Ohm's law, resistance, circuits, power", cl: 10 },
    { id: "magnetic_effects", name: "Magnetic Effects of Current", detail: "Electromagnets, force on conductor, motors", cl: 10 },
  ],
  chemistry: [
    { id: "atoms_molecules", name: "Atoms & Molecules", detail: "Atomic mass, molecular mass, Avogadro's law", cl: 9 },
    { id: "chemical_reactions", name: "Chemical Reactions & Equations", detail: "Balancing, types of reactions, oxidation states", cl: 10 },
    { id: "acids_bases", name: "Acids, Bases & Salts", detail: "pH scale, neutralisation, ionic properties", cl: 10 },
    { id: "metals_nonmetals", name: "Metals & Non-metals", detail: "Reactivity series, ionic bonding, extraction", cl: 10 },
    { id: "carbon_compounds", name: "Carbon & its Compounds", detail: "Covalent bonds, functional groups, homologous series", cl: 10 },
    { id: "periodic_classification", name: "Periodic Classification", detail: "Modern periodic law, trends, valency", cl: 10 },
  ],
  maths: [
    { id: "ratio_proportion", name: "Ratio, Proportion & Percentages", detail: "Unitary method, percentage change, cross-multiplication", cl: 9 },
    { id: "algebra_basics", name: "Algebra & Polynomials", detail: "Factorisation, identities, linear equations", cl: 9 },
    { id: "quadratic_equations", name: "Quadratic Equations", detail: "Factoring, formula, discriminant, roots", cl: 10 },
    { id: "trigonometry", name: "Trigonometry Basics", detail: "sin/cos/tan, standard angles, identities, applications", cl: 10 },
    { id: "coordinate_geometry", name: "Coordinate Geometry", detail: "Distance formula, section formula, midpoint", cl: 10 },
    { id: "ap_sequences", name: "Arithmetic Progression", detail: "nth term, sum of n terms, properties", cl: 10 },
    { id: "statistics", name: "Statistics & Probability", detail: "Mean, median, mode, basic probability", cl: 10 },
    { id: "geometry", name: "Triangles & Circle Theorems", detail: "Congruence, similarity, Pythagoras, angle theorems", cl: 10 },
  ],
  biology: [
    { id: "cell_bio", name: "Cell: Fundamental Unit of Life", detail: "Organelles, prokaryote vs eukaryote", cl: 9 },
    { id: "tissues", name: "Tissues", detail: "Plant and animal tissues, types and functions", cl: 9 },
    { id: "life_processes", name: "Life Processes", detail: "Nutrition, respiration, transport, excretion", cl: 10 },
    { id: "control_coord", name: "Control & Coordination", detail: "Nervous system, hormones, reflex action", cl: 10 },
    { id: "reproduction_basic", name: "Reproduction", detail: "Sexual/asexual, plant and human reproduction", cl: 10 },
    { id: "heredity_evolution", name: "Heredity & Evolution", detail: "Mendel's laws, DNA, natural selection", cl: 10 },
    { id: "ecosystems", name: "Our Environment", detail: "Food chain, energy flow, biodiversity, pollution", cl: 10 },
  ],
  core_maths: [
    { id: "ratio_proportion", name: "Ratio, Proportion & Percentages", detail: "Critical for Mole Concept calculations in Chemistry", cl: 9 },
    { id: "algebra_basics", name: "Algebra & Basic Equations", detail: "Needed for Chemistry numerical problems", cl: 9 },
  ],
};

export const ADVANCED = [
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
      JEE: "Master relative motion and projectile problems — JEE loves multi-concept kinematics",
      NEET: "Focus on projectile motion and relative velocity — NEET tests these directly",
      Boards: "Revise Class 10 distance-time and velocity-time graphs before Day 1",
      CUET: "Understand basic equations of motion and their derivations",
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
      JEE: "Master Free Body Diagrams — JEE pulley, wedge and friction problems are all FBD-based",
      NEET: "Focus on Newton's laws applications and friction for NEET",
      Boards: "Learn all Free Body Diagram cases — inclined planes and connected bodies are Board favourites",
      CUET: "Understand the three laws and their applications with examples",
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
      JEE: "Focus on work-energy theorem, spring PE and conservation problems",
      NEET: "Energy conservation with simple systems is a NEET standard",
      Boards: "Derivations of work-energy theorem and power formulas are Board staples",
      CUET: "Understand basic definitions of work, energy and power with SI units",
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
      JEE: "Kepler's laws, escape velocity and orbital energy are JEE favourites",
      NEET: "Know escape velocity and satellite basics — NEET rarely goes deeper",
      Boards: "Kepler's laws and escape velocity derivations are frequently asked in Boards",
      CUET: "Understand universal law of gravitation and satellite motion basics",
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
      JEE: "SHM is one of JEE's highest-yield topics — spring-mass, pendulum and superposition are must-know",
      NEET: "Focus on displacement equations and energy in SHM — NEET keeps it conceptual",
      Boards: "SHM equations, time period derivations and wave speed are key for Boards",
      CUET: "Understand basic wave properties — wavelength, frequency, amplitude and speed",
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
      JEE: "Wave optics — YDSE, diffraction, polarisation — carry heavy JEE marks alongside ray optics",
      NEET: "Lens formula, mirror formula and refraction through prism are high-frequency NEET questions",
      Boards: "Highest weightage Class 12 Physics chapter — both ray and wave optics are Board staples",
      CUET: "Understand refraction, lens formula and basic wave optics concepts",
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
      JEE: "Kirchhoff's laws, Wheatstone bridge and meter bridge appear in almost every JEE paper",
      NEET: "Focus on Ohm's law, resistance combinations and basic circuit solving for NEET",
      Boards: "Very high weightage — Kirchhoff's laws, potentiometer and galvanometer conversion are must-know",
      CUET: "Understand resistivity, drift velocity and basic circuit laws",
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
      JEE: "EMI, AC circuits and Biot-Savart law are among the most challenging JEE topics — start early",
      NEET: "Focus on force on a moving charge, magnetic field due to straight wire and Faraday's law for NEET",
      Boards: "Faraday's laws, Lenz's law and AC generator derivations are frequently asked",
      CUET: "Understand magnetic force on current, Faraday's law and basic transformer working",
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
      JEE: "Limiting reagent, percentage yield and empirical formula problems are JEE staples — all are numerical",
      NEET: "Mole concept is very high yield for NEET — spend 3 hours on ratio problems before starting this chapter",
      Boards: "Spend 3 hours on ratio/percentage problems before opening the mole concept chapter",
      CUET: "Understand mole, Avogadro's number and basic stoichiometry calculations",
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
      JEE: "Quantum numbers, Aufbau, Hund and Pauli rules — also know hydrogen spectrum calculations",
      NEET: "Electronic configuration and quantum numbers are directly tested in NEET — memorise rules cold",
      Boards: "Bohr's model, quantum numbers and electronic configuration are Board examination favourites",
      CUET: "Understand Bohr's model and basic electronic configuration rules",
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
      JEE: "VSEPR theory, hybridisation and molecular orbital theory are all high-yield for JEE",
      NEET: "VSEPR shapes, bond angle and hybridisation are consistently tested in NEET",
      Boards: "Lewis structures, VSEPR shapes and hybridisation are standard Board questions",
      CUET: "Understand ionic, covalent and metallic bonding with VSEPR basics",
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
      JEE: "Kp, Kc, degree of dissociation and buffer problems are all JEE-level numerical questions",
      NEET: "pH calculations, buffer concept and Le Chatelier's principle are NEET-high-yield",
      Boards: "Kp, Kc expressions and pH calculations are standard Board examination problems",
      CUET: "Understand Le Chatelier's principle and basic equilibrium constant expressions",
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
      JEE: "IUPAC naming, inductive/resonance effects and reaction intermediates are JEE bread-and-butter",
      NEET: "IUPAC nomenclature and electronic effects are very high yield — NEET tests these every year",
      Boards: "IUPAC naming, functional groups and isomerism are the key Board topics",
      CUET: "Understand IUPAC naming and basic functional group identification",
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
      JEE: "Anomalous properties and diagonal relationships are frequently tested in JEE",
      NEET: "NEET high-yield — memorise all properties, uses and reactions of s and p block elements",
      Boards: "Preparation and properties of key compounds are standard Board questions",
      CUET: "Focus on key properties and uses of Group 1 and Group 2 elements",
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
      JEE: "Nernst equation, cell potential and electrolysis calculations are JEE staples",
      NEET: "Electrochemical cells, EMF and Faraday's laws of electrolysis appear in NEET",
      Boards: "Nernst equation and cell potential calculations are very high weightage in Boards",
      CUET: "Understand galvanic vs electrolytic cells and basic EMF calculations",
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
      JEE: "All compound angle, transformation and multiple angle formulae must be memorised cold for JEE",
      NEET: "Not directly in NEET syllabus — skip this chapter for NEET preparation",
      Boards: "Prove identities, find principal values and solve trig equations — all are Board staples",
      CUET: "Focus on standard angle values and basic identity proofs",
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
      JEE: "Modulus, argument, polar form and De Moivre's theorem are frequently tested in JEE",
      NEET: "Not in NEET syllabus — skip this for NEET preparation",
      Boards: "Argand plane, polar form and roots of unity are standard Board questions",
      CUET: "Understand complex number operations and their geometric representation",
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
      JEE: "Family of lines, distance of a point from a line and angle bisectors are JEE favourites",
      NEET: "Not in NEET syllabus — skip for NEET preparation",
      Boards: "All standard forms of line, angle between two lines and distance formula are must-know for Boards",
      CUET: "Understand slope, intercepts and standard forms of the equation of a line",
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
      JEE: "Ellipse, hyperbola, parabola — JEE loves tangent/normal and chord of contact problems",
      NEET: "Not in NEET syllabus — skip for NEET preparation",
      Boards: "Standard forms, focus-directrix properties and parametric forms are Board staples",
      CUET: "Understand standard equations of parabola, ellipse and hyperbola with their properties",
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
      JEE: "AM-GM inequality, telescoping series and sum of special series are standard JEE problems",
      NEET: "Not in NEET syllabus — skip for NEET preparation",
      Boards: "GP sum formulae, infinite GP and AGP are frequently asked in Boards",
      CUET: "Understand AP, GP formulas and their applications",
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
      JEE: "P&C needs practice more than theory — solve 100+ varied problems at minimum for JEE",
      NEET: "Not in NEET syllabus — skip for NEET preparation",
      Boards: "Circular permutations and combinations with restrictions are Board favourites",
      CUET: "Understand nPr, nCr formulas and their applications in counting problems",
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
      JEE: "Calculus is 35-40% of JEE Maths — treat it as a separate subject entirely",
      NEET: "Not in NEET syllabus — skip for NEET preparation",
      Boards: "Differentiation and integration are very high weightage — both application and theory are tested",
      CUET: "Focus on basic differentiation rules and simple integration techniques",
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
      JEE: "Conditional probability, Bayes' theorem and binomial distribution are the advanced JEE sections",
      NEET: "Not in NEET syllabus — skip for NEET preparation",
      Boards: "Conditional probability, total probability theorem and Bayes' theorem are Board staples",
      CUET: "Understand classical probability, addition rule and conditional probability",
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
      JEE: "Not in JEE syllabus",
      NEET: "Prokaryote vs eukaryote, endomembrane system — NEET asks 3-4 questions here every year",
      Boards: "Cell organelle functions and differences between plant/animal cells are Board favourites",
      CUET: "Understand key organelle functions and differences between cell types",
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
      JEE: "Not in JEE syllabus",
      NEET: "C3/C4/CAM pathways, mineral nutrition and translocation are NEET staples — very high yield",
      Boards: "Light and dark reactions, transpiration and mineral nutrition are key Board topics",
      CUET: "Understand basic photosynthesis, transpiration and plant nutrition concepts",
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
      JEE: "Not in JEE syllabus",
      NEET: "Single highest NEET-yield chapter — digestion, circulation, excretion must all be thorough",
      Boards: "All organ systems are high weightage in Boards — diagrams and functions both tested",
      CUET: "Understand the basic functioning of digestive, circulatory and nervous systems",
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
      JEE: "Not in JEE syllabus",
      NEET: "Pedigree analysis and molecular basis of inheritance both appear in NEET every single year",
      Boards: "Mendelian genetics, DNA replication and gene expression are very high weightage",
      CUET: "Understand Mendel's laws, DNA structure and basic gene expression",
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
      JEE: "Not in JEE syllabus",
      NEET: "Gametogenesis, embryogenesis and endosperm development are consistent NEET topics",
      Boards: "Both asexual and sexual reproduction with diagrams are high weightage in Boards",
      CUET: "Understand sexual vs asexual reproduction and human reproductive system basics",
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
      JEE: "Not in JEE syllabus",
      NEET: "Ecosystem services, biodiversity conservation and ecological pyramids are NEET-tested",
      Boards: "Food chains, energy flow and biodiversity conservation are Board examination favourites",
      CUET: "Understand ecosystem structure, food chains and basic biodiversity concepts",
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
      JEE: "Not in JEE syllabus",
      NEET: "PCR, ELISA and rDNA technology — 3-4 NEET questions here every year",
      Boards: "Tools and processes of biotechnology with applications are standard Board questions",
      CUET: "Understand PCR, gel electrophoresis and basic applications of biotechnology",
    },
  },
];
