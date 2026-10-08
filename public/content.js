// Edit your portfolio here. Images and PDFs go in public/assets/.
// Project details are grounded in the supplied resume, portfolio, and design reports.
// See docs/project-sources.md for source mapping and prototype qualifications.
import { roboticHandContent } from './robotic-hand-content.js';
import { walletContent } from './wallet-content.js';
import { cycloidalGearboxContent } from './cycloidal-gearbox-content.js';
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
      description: 'I recently joined the drivetrain sub-team, where I’ll help test and improve existing designs and develop new powertrain systems.',
      // Add detailed blocks here for My role; description stays the brief summary.
      content: [
        { type: 'text', text: "As apart of the drivetrain sub-team I will be working to develop and improve the motor cooling sleve, a new gearbox to replace the team's decade old one, and vibration/harmonics reduction." },
      ]
    },
    {
      startDate: '2024-09',
      dates: 'September 2024 - June 2026',
      role: 'Design Lead',
      organization: 'FIRST Robotics Competition · Team 1360',
      logo: './assets/orbit-1360-logo.jpg',
      description: 'I led Team 1360’s mechanical sub-team, guiding the design, build, and testing of a competition robot.',
      content: [
        { type: 'text', text: 'I led more than 35 mechanical members through design and assembly, imparting design standards and documentation practices that helped reduce design time by 38% compared with previous years.' },
        { type: 'text', text: 'I introduced a part tracking system to coordinate fabrication and assembly that completely eliminated unnecessary duplicate parts.' },
        { type: 'text', text: 'I institutionzlied the practice to include the battery, power distribution panel, robot brain, sensors, wiring routes, and maintenance access consideration in CAD that made actually assembling the robot later significantly easier. We beat our projected assembly time by a week.' },
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
      description: 'I built an 11-DOF robotic hand with flexion/extension and abbduction/adduction in all 5 fingers.',
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
      description: 'I created a unique button activated mechanical fanning wallet with 8 card capaicity.',
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
      description: 'I designed a 31:1 printed cycloidal gearbox with 10.9 N·m output torque at 78% efficiency.',
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
      description: 'I led mechanical design for Andromeda, Team 1360’s 2026 FRC robot. The team reached the Ontario Provincial Championship semifinals and qualified for the FIRST World Championship.',
      purpose: 'First Robotics Competition · Team 1360',
      category: 'Student Teams',
      dates: '2025–2026 · Design Lead',
      image: './assets/1360_coverphoto.jpg',
      placeholder: false,
      content: [
        { type: 'tags', items: ['Mechanical Design', 'Team Leadership', 'Prototyping', 'Design Standards'] },
        { type: 'lead', text: 'I led the design of Andromeda, Team 1360’s 2026 FRC robot. The team reached the Ontario Provincial Championship semifinals and qualified for the FIRST World Championship.' },
        { type: 'heading', text: 'Results' },
        { type: 'text', text: 'Team 1360 ranked 17th of 185 Canadian teams and rose from 536th to 185th worldwide between 2025 and 2026. In 2026, Team 1360 recorded its highest normalized EPA since our peak in 2018.' },
        { type: 'image', src: './assets/andromeda-team-performance.png', width: 1839, height: 722, alt: 'Team 1360 normalized EPA from 2016 to 2026, peaking in 2018 with 2026 the highest year since that peak', caption: 'Team 1360 normalized EPA, 2016–2026.' },
        { type: 'heading', text: 'Mid-season improvements' },
        { type: 'text', text: 'I led Andromeda’s mid-season redesign, improving the indexing and intake systems. The indexing changes increased scoring throughput by nearly 150%. Collisions at our first competition broke polycarbonate plates and printed bearing caps, causing a 68% intake failure rate. I led the intake redesign with thicker plates and custom-machined aluminum bearing caps, reducing breakdowns by 95%. I tested the revised intake through wall collisions, throwing, and impacts.' },
        {
          type: 'feature',
          media: { type: 'video', src: './assets/frc-2026-shooting.mp4', poster: './assets/frc-2026-shooting-poster.jpg', label: 'Team 1360 robot shooting during the 2026 FRC season' },
          heading: 'Design practices',
          content: [
            { type: 'text', text: 'I implemented the design standards I established for the team throughout Andromeda’s mechanical design. I used part tracking to coordinate fabrication and assembly and avoid duplicate parts.' },
            { type: 'text', text: 'I brought electronics-planning methods from Helios into Andromeda’s CAD assembly. I planned battery, power distribution, controls, and sensor placement alongside wiring routes and maintenance access. This helped reduce wiring time from one week to three days.' }
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
      description: 'I built a four-motor swerve chassis with Python controls and measured about 7.0 ft/s.',
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
      description: 'I led the design of a robot concept for a one-week CAD competition, placing 3rd of 150+ teams.',
      purpose: 'West Coast Products FRC Cadathon · Team 1360',
      category: 'Student Teams',
      dates: 'November 10–17, 2025',
      image: './assets/helios_render.jpg',
      placeholder: false,
      content: [
        { type: 'tags', items: ['Onshape', 'Fusion 360', 'Mechanism Design', 'Technical Documentation'] },
        { type: 'lead', text: 'I led the design of Helios for the one-week 2025 WCP Cadathon. Team 1360’s robot concept and technical binder placed 3rd among more than 150 teams.' },
        { type: 'links', items: [{ label: 'Read the technical binder', description: 'Robot design and game strategy.', featured: true, newTab: true, href: 'https://drive.google.com/file/d/1NdKU0Dtdt5ZYhMjqqKIRh9OMxwaFLkP9/view' }] },
        { type: 'image', src: './assets/helios_render.jpg', alt: 'Rendered Helios robot with a blue chassis, elevator, arm, and ground intake' },
        { type: 'heading', text: 'Design Constraints' },
        { type: 'text', text: 'I compared scoring, cycle time, teammate dependence, and packaging across three robot classes, eventualyl deciding on the gadgeteer class. This established our general design constraints such as a weight limit of 100 pounds and max vertical reach of 42"' },
        {
          type: 'feature',
          media: { type: 'image', src: './assets/helios-cad.jpg', alt: 'Helios CAD assembly with the elevator and arm extended above the chassis' },
          heading: 'Design',
          content: [
            { type: 'text', text: 'The design used an elevator-mounted arm, ground intake, indexer, and adjustable shooter. A two-stage continuous elevator also deployed a detachable climber with a cam grip and winch.' },
            { type: 'text', text: 'I worked to incorporate electronic layouts and battery accesss into the CAD which was the first time my team had ever attmpedted this. I would later re-implement these practices I developed with great success on Andromeda in 2026.' }
          ]
        },
        { type: 'callout', label: 'Next steps', text: 'I calculated the climber had a safety factor of 1.1 to show it would likely work in real life. With more time, I would have tried to increased that margin and test a physical prototype.' }
      ]
    }
  ]
};
