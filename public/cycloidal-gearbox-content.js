const photo = (name, alt, caption) => ({ src: `./assets/project-process/${name}.webp`, width: 1152, height: 1536, alt, caption });
const preview = (name, alt, caption) => ({ src: `./assets/project-process/${name}-preview.webp`, width: 352, height: 470, alt, caption });

export const cycloidalGearboxContent = [
  { type: 'tags', items: ['Onshape', '3D Printing', 'Tolerance Design', 'Backlash Testing', 'Data Acquisition'] },
  { type: 'lead', text: 'A 31:1 printed cycloidal gearbox delivering 10.9 N·m output torque at 78% efficiency.' },
  { type: 'image', src: './assets/cycloidal_gearbox_half.jpg', size: 'wide', alt: 'Sectioned CAD model showing the cycloidal disks, pins, bearings, and housing' },
  { type: 'heading', text: 'Design' },
  { type: 'text', text: 'Team 1360’s 2025 robot struggled with arm backlash. Designed to improve positioning and support future mechanisms, the gearbox suits a 3-axis mill, uses inexpensive parts, and fits a range of FRC applications.' },
  { type: 'heading', text: 'Design considerations' },
  { type: 'list', items: [
    'CNC machining: Geometry fits a 3-axis mill. A four-piece cycloidal shaft simplifies machining; dowel pins join and align the pieces.',
    'Cost: Inexpensive, standard shoulder bolts, dowel pins, and bearings keep costs down, with custom plates designed around them.',
    'Versatility: A standard FRC half-inch hex bore supports shaft-driven setups; adapters allow direct motor mounting. The Kraken X60 adapter uses standard #10-32 mounting holes. At 1.2 inches thick and 2.5 inches in diameter, the 31:1 gearbox is about one-third the length of a comparable planetary gearbox stack.'
  ] },
  { type: 'heading', text: 'Prototyping' },
  { type: 'text', text: 'Printed disks and housing supported iterative checks of disk profiles, pin clearances, and bearing fits. Excess clearance increased backlash; tight fits increased friction.' },
  { type: 'text', text: 'Heavy-load tests and deformation analysis validated the disk FEA simulations, revealing weak sections between the large central bearing and smaller bearing holes.' },
  { type: 'gallery', images: [
    preview('img_7064', 'Printed cycloidal disks, housing rings, and input components laid out on a wooden floor', 'Printed components before assembly.'),
    photo('cycloidal-disk-bearings', 'Printed cycloidal disk photographed to inspect deformation around the central bearing and smaller bearing holes', 'Plastic deformation analysis — disk bearing holes.')
  ] },
  { type: 'gallery', images: [
    photo('cycloidal-disk-profile', 'Side view of the printed cycloidal disk photographed to inspect wear and plastic deformation', 'Plastic deformation analysis — disk profile.'),
    photo('cycloidal-pin-ring-profile', 'Side view of the printed pin ring photographed to inspect wear and plastic deformation', 'Plastic deformation analysis — pin ring.')
  ] },
  { type: 'image', src: './assets/cycloidal-gearbox-exploded.png', width: 396, height: 776, size: 'medium', tall: true, alt: 'Exploded cycloidal gearbox showing the stacked housing, two disks, pins, bearings, spacers, and screws', caption: 'Exploded view' },
  { type: 'gallery', images: [
    preview('img_7144', 'Partly assembled cycloidal gearbox with perimeter pins and a central input component visible', 'Open gearbox assembly.'),
    preview('img_7147', 'Closed black printed cycloidal gearbox standing on a workbench with its output bearing and hex bore visible', 'Assembled gearbox.')
  ] },
  { type: 'heading', text: 'Testing' },
  { type: 'text', text: 'Backlash fell from about 7° to 0.4°. Torque-wrench measurements showed lubrication improvements raised mechanical efficiency from 64% to 78%.' },
  { type: 'text', text: 'At 0.45 N·m input torque and 78% efficiency, output torque is 10.9 N·m. Estimated maximum output speed is about 194 RPM near no load.' },
  { type: 'gallery', media: [
    { type: 'video', src: './assets/cycloidal-gearbox-demo.mp4', poster: './assets/cycloidal-gearbox-video-poster.jpg', label: 'Cycloidal gearbox operation', caption: 'Gearbox operation.' },
    { type: 'video', src: './assets/cycloidal-gearbox-metal-bar.mp4', poster: './assets/cycloidal-gearbox-metal-bar-poster.jpg', label: 'Cycloidal gearbox rotating a metal bar', caption: 'Metal-bar test.' }
  ] },
  { type: 'video', src: './assets/project-process/cycloidal-high-speed.mp4', poster: './assets/project-process/cycloidal-high-speed-poster.jpg', label: 'Cycloidal gearbox spinning quickly during testing', caption: 'High-speed test.' }
];
