// Edit your portfolio here. Images and PDFs go in public/assets/.
// Project details are grounded in the supplied resume, portfolio, and design reports.
// See docs/project-sources.md for source mapping and prototype qualifications.
import { roboticHandContent } from './robotic-hand-content.js';
import { walletContent } from './wallet-content.js';
import { cycloidalGearboxContent } from './cycloidal-gearbox-content.js?v=20261013-deformation';
import { swerveContent } from './swerve-content.js';

export const portfolio = {
  summary: "Hi there! I’m a first-year engineering student at McMaster, planning to study mechanical engineering.\n\nI became interested in engineering through the FIRST Robotics Competition and have since joined McMaster’s FSAE team as part of the drivetrain sub-team!",
  featuredProjects: ['03', '01', '02'],
  experience: [
    {
      startDate: '2026-09', // YYYY-MM controls newest-first ordering.
      dates: 'September 2026 - Present',
      role: 'Drivetrain Member',
      organization: 'MAC Formula Electric',
      logo: './assets/mac-formula-electric-logo.png',
      logoScale: 1.35,
      description: 'As a drivetrain sub-team member, I will help test and improve existing designs and develop new powertrain systems.',
      // Add detailed blocks here for My role; description stays the brief summary.
      content: [
        { type: 'text', text: "Planned drivetrain work includes improving motor cooling, developing a gearbox to replace the team's decade-old unit, and reducing vibration and harmonics." },
        { type: 'text', text: 'Developed a MATLAB gearbox forces calculator to calculate planetary gear-mesh and planet-pin loads, helping validate the gearbox design.' },
      ]
    },
    {
      startDate: '2024-09',
      dates: 'September 2024 - June 2026',
      role: 'Design Lead',
      organization: 'FIRST Robotics Competition · Team 1360',
      logo: './assets/orbit-1360-logo.jpg',
      description: 'Led Team 1360’s mechanical sub-team through competition robot design, build, and testing.',
      content: [
        { type: 'text', text: 'Led more than 35 mechanical members through design and assembly. Established design standards and documentation practices that cut design time by 38% compared with previous years.' },
        { type: 'text', text: 'Introduced part tracking to coordinate fabrication and assembly, eliminating duplicate parts.' },
        { type: 'text', text: 'Standardized full-system CAD planning for the battery, power distribution panel, robot controller, sensors, wiring routes, and maintenance access. Assembly finished a week ahead of the projected schedule.' },
        { type: 'heading', text: 'Learn more' },
        { type: 'project-links', items: [
          { projectId: '06', label: '2026 · FRC season', description: 'Intake and indexing improvements.' },
          { projectId: '03', label: '2025 · Offseason Project', description: 'A 31:1 gearbox that reduced arm backlash.' },
          { projectId: '05', label: '2025 · WCP Cadathon', description: 'Robot design and electronics packaging.' }
        ] }
      ]
    }
  ],
  // Experience content fills My role and supports the same blocks as projects.
  resume: './assets/William_Huang_Resume.pdf', // Example: './assets/william-huang-resume.pdf'
  projects: [
    {
      id: '01',
      slug: 'robotic-hand-v1',
      title: 'Robotic Hand V1',
      description: 'Built an 11-DOF robotic hand with flexion/extension and abduction/adduction across all five fingers.',
      purpose: 'Classwork',
      category: 'Classwork',
      dates: 'January 2026',
      image: './assets/Robotic_hand_cover_v1.png',
      placeholder: false,
      content: roboticHandContent
    },
    {
      id: '02',
      slug: 'mechanical-fanning-wallet',
      title: 'Mechanical Fanning Wallet',
      description: 'Button-activated mechanical wallet that fans and holds up to eight cards.',
      purpose: 'Personal',
      category: 'Personal',
      dates: 'November 2025',
      image: './assets/wallet_cover.jpg',
      placeholder: false,
      content: walletContent
    },
    {
      id: '03',
      slug: 'cycloidal-gearbox',
      title: 'Cycloidal Gearbox',
      description: '31:1 printed cycloidal gearbox delivering 10.9 N·m output torque at 78% efficiency.',
      purpose: 'Student Teams',
      category: 'Student Teams',
      dates: 'July 2025',
      image: './assets/cycloidal_gearbox_half.jpg',
      placeholder: false,
      content: cycloidalGearboxContent
    },
    {
      id: '06',
      slug: 'andromeda',
      title: 'Andromeda',
      description: 'Mechanical design lead for Andromeda, Team 1360’s 2026 FRC robot. The team reached the Ontario Provincial Championship semifinals and qualified for the FIRST World Championship.',
      purpose: 'First Robotics Competition · Team 1360',
      category: 'Student Teams',
      dates: '2025–2026 · Design Lead',
      image: './assets/1360_coverphoto.jpg',
      placeholder: false,
      content: [
        { type: 'tags', items: ['Mechanical Design', 'Team Leadership', 'Prototyping', 'Design Standards'] },
        { type: 'lead', text: 'Mechanical design lead for Andromeda, Team 1360’s 2026 FRC robot. The team reached the Ontario Provincial Championship semifinals and qualified for the FIRST World Championship.' },
        { type: 'heading', text: 'Results' },
        { type: 'text', text: 'Team 1360 ranked 17th of 185 Canadian teams and rose from 536th to 185th worldwide between 2025 and 2026. In 2026, the team recorded its highest normalized EPA since the 2018 peak.' },
        { type: 'image', src: './assets/andromeda-team-performance.png', width: 1839, height: 722, alt: 'Team 1360 normalized EPA from 2016 to 2026, peaking in 2018 with 2026 the highest year since that peak', caption: 'Team 1360 normalized EPA, 2016–2026.' },
        { type: 'heading', text: 'Mid-season improvements' },
        { type: 'text', text: 'A mid-season redesign improved Andromeda’s indexing and intake systems. Indexing changes increased scoring throughput by nearly 150%. Collisions at the first competition broke polycarbonate plates and printed bearing caps, causing a 68% intake failure rate. The redesigned intake used thicker plates and custom-machined aluminum bearing caps, reducing breakdowns by 95%. The revised intake was tested through wall collisions, throws, and impacts.' },
        {
          type: 'feature',
          media: { type: 'video', src: './assets/frc-2026-shooting.mp4', poster: './assets/frc-2026-shooting-poster.jpg', label: 'Team 1360 robot shooting during the 2026 FRC season' },
          heading: 'Design practices',
          content: [
            { type: 'text', text: 'Applied the team’s design standards to Andromeda’s mechanical design. Part tracking coordinated fabrication and assembly while preventing duplicate parts.' },
            { type: 'text', text: 'Electronics-planning methods from Helios informed Andromeda’s CAD. Battery, power distribution, controls, sensor placement, wiring routes, and maintenance access were planned together, reducing wiring time from one week to three days.' }
          ]
        },
        { type: 'gallery', images: [
          { src: './assets/andromeda-cad.jpg', alt: 'Andromeda Team 1360 CAD model showing the robot chassis, intake, and upper mechanisms' },
          { src: './assets/1360_coverphoto.jpg', alt: 'Team 1360’s competition robot on the field among yellow game pieces' }
        ] }
      ]
    },
    {
      id: '04',
      slug: 'differential-swerve-drive',
      title: 'Differential Swerve Drive',
      description: 'Four-motor swerve chassis with Python controls; measured speed was about 7.0 ft/s.',
      purpose: 'Classwork',
      category: 'Classwork',
      dates: 'November 2025',
      image: './assets/differential_swerve_module.jpg',
      placeholder: false,
      content: swerveContent
    },
    {
      id: '05',
      slug: 'helios',
      title: 'Helios',
      description: 'Led a robot concept for a one-week CAD competition, placing 3rd among 150+ teams.',
      purpose: 'West Coast Products FRC Cadathon · Team 1360',
      category: 'Student Teams',
      dates: 'November 10–17, 2025',
      image: './assets/helios_render.jpg',
      placeholder: false,
      content: [
        { type: 'tags', items: ['Onshape', 'Fusion 360', 'Mechanism Design', 'Technical Documentation'] },
        { type: 'lead', text: 'Led Helios for the one-week 2025 WCP Cadathon. Team 1360’s robot concept and technical binder placed 3rd among more than 150 teams.' },
        { type: 'links', items: [{ label: 'Read the technical binder', description: 'Robot design and game strategy.', featured: true, newTab: true, href: 'https://drive.google.com/file/d/1NdKU0Dtdt5ZYhMjqqKIRh9OMxwaFLkP9/view' }] },
        { type: 'image', src: './assets/helios_render.jpg', alt: 'Rendered Helios robot with a blue chassis, elevator, arm, and ground intake' },
        { type: 'heading', text: 'Design Constraints' },
        { type: 'text', text: 'Compared scoring, cycle time, teammate dependence, and packaging across three robot classes before selecting the gadgeteer class. The design constraints included a 100 lb weight limit and 42 in maximum vertical reach.' },
        {
          type: 'feature',
          media: { type: 'image', src: './assets/helios-cad.jpg', alt: 'Helios CAD assembly with the elevator and arm extended above the chassis' },
          heading: 'Design',
          content: [
            { type: 'text', text: 'The design used an elevator-mounted arm, ground intake, indexer, and adjustable shooter. A two-stage continuous elevator also deployed a detachable climber with a cam grip and winch.' },
            { type: 'text', text: 'Integrated electronics layouts and battery access into CAD for the first time on the team; the same practices were later applied to Andromeda.' }
          ]
        },
        { type: 'callout', label: 'Next steps', text: 'The climber’s calculated safety factor was 1.1. With more time, the margin could be increased and a physical prototype tested.' }
      ]
    },
    {
      id: '07',
      slug: 'gravity-towel-holder',
      title: 'Home Improvements',
      description: 'Compact, single-piece 3D-printed gravity towel holder for towels up to 5 lb.',
      purpose: 'Gravity Towel Holder',
      category: 'Personal',
      dates: 'July 2026 - Present',
      image: './assets/towel-holder-installed.jpeg',
      placeholder: false,
      content: [
        { type: 'tags', items: ['Product Design', '3D Printing', 'Force Calculations'] },
        { type: 'lead', text: 'Calculated contact forces to maximize grip in a compact gravity towel holder designed for towels up to 5 lb.' },
        { type: 'feature', media: { type: 'image', src: './assets/towel-holder-installed.jpeg', alt: 'Two printed towel holders mounted beside a bathroom mirror' }, heading: 'Mounting', content: [
          { type: 'text', text: 'A rear slot accommodates a Command strip for flush, screw-free mounting and easy removal.' },
          { type: 'text', text: 'Printed as one piece for faster production.' }
        ] },
        { type: 'heading', text: 'Wall clearance' },
        { type: 'text', text: 'Prototype revisions increased the wall offset so towels can touch the wall, reducing trapped moisture and helping them dry.' },
        { type: 'gallery', images: [
          { src: './assets/towel-holder-clearance.jpeg', alt: 'Towel hanging from the holder with clearance to the wall' },
          { src: './assets/towel-holder-grip.jpeg', alt: 'Close view of the holder opening and textured internal grip' }
        ] }
      ]
    }
  ]
};
