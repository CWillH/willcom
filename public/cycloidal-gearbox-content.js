const photo = (name, alt, caption) => ({ src: `./assets/project-process/${name}.webp`, width: 1152, height: 1536, alt, caption });
const preview = (name, alt, caption) => ({ src: `./assets/project-process/${name}-preview.webp`, width: 352, height: 470, alt, caption });

export const cycloidalGearboxContent = [
  { type: 'tags', items: ['Onshape', '3D Printing', 'Tolerance Design', 'Backlash Testing', 'Data Acquisition'] },
  { type: 'lead', text: 'I designed a 31:1 printed cycloidal gearbox with 10.9 N·m output torque at 78% efficiency.' },
  { type: 'image', src: './assets/cycloidal_gearbox_half.jpg', size: 'wide', alt: 'Sectioned CAD model showing the cycloidal disks, pins, bearings, and housing' },
  { type: 'heading', text: 'Design' },
  { type: 'text', text: 'Team 1360’s 2025 robot struggled with arm backlash. I designed this gearbox to improve positioning and support future mechanisms. It had to suit a 3-axis mill, use inexpensive parts, and fit a range of FRC applications.' },
  { type: 'heading', text: 'Design considerations' },
  { type: 'list', items: [
    'CNC machining: I kept the geometry compatible with a 3-axis mill. I split the cycloidal shaft into four independently machinable pieces, joined and precisely aligned with dowel pins.',
    'Cost: I chose inexpensive, standard shoulder bolts, dowel pins, and bearings, then designed the custom plates around them.',
    'Versatility: I used a standard FRC half-inch hex bore for shaft-driven setups and direct motor mounting with adapters. I made a Kraken X60 adapter and used standard #10-32 mounting holes. At 1.2 inches thick and barely 2.5 inches in diameter, the 31:1 gearbox was about one-third the length of a comparable planetary gearbox stack.'
  ] },
  { type: 'heading', text: 'Prototyping' },
  { type: 'text', text: 'I printed the disks and housing, then adjusted the disk profiles, pin clearances, and bearing fits through assembly checks. Excess clearance increased backlash; tight fits increased friction.' },
  { type: 'gallery', images: [
    preview('img_7064', 'Printed cycloidal disks, housing rings, and input components laid out on a wooden floor', 'Printed components before assembly.'),
    photo('cycloidal-disk-bearings', 'Printed cycloidal disk with its central bearing and output-hole bearings installed', 'Disk with bearings installed.')
  ] },
  { type: 'gallery', images: [
    photo('cycloidal-disk-profile', 'Printed cycloidal disk held on its side, showing the lobed edge and thickness', 'Printed disk profile.'),
    photo('cycloidal-pin-ring-profile', 'Printed fixed pin ring held on its side with the perimeter pins visible', 'Pin ring, side view.')
  ] },
  { type: 'image', src: './assets/cycloidal-gearbox-exploded.png', width: 396, height: 776, size: 'medium', tall: true, alt: 'Exploded cycloidal gearbox showing the stacked housing, two disks, pins, bearings, spacers, and screws', caption: 'Exploded view' },
  { type: 'gallery', images: [
    preview('img_7144', 'Partly assembled cycloidal gearbox with perimeter pins and a central input component visible', 'Open gearbox assembly.'),
    preview('img_7147', 'Closed black printed cycloidal gearbox standing on a workbench with its output bearing and hex bore visible', 'Assembled gearbox.')
  ] },
  { type: 'heading', text: 'Testing' },
  { type: 'text', text: 'I reduced backlash from about 7° to 0.4°. I measured mechanical efficiency with a torque wrench; lubrication improvements raised it from 64% to 78%.' },
  { type: 'text', text: 'At 0.45 N·m input torque and 78% efficiency, output torque is 10.9 N·m. Estimated maximum output speed is about 194 RPM near no load.' },
  { type: 'gallery', media: [
    { type: 'video', src: './assets/cycloidal-gearbox-demo.mp4', poster: './assets/cycloidal-gearbox-video-poster.jpg', label: 'Cycloidal gearbox operation', caption: 'Gearbox operation.' },
    { type: 'video', src: './assets/cycloidal-gearbox-metal-bar.mp4', poster: './assets/cycloidal-gearbox-metal-bar-poster.jpg', label: 'Cycloidal gearbox rotating a metal bar', caption: 'Metal-bar test.' }
  ] },
  { type: 'video', src: './assets/project-process/cycloidal-high-speed.mp4', poster: './assets/project-process/cycloidal-high-speed-poster.jpg', label: 'Cycloidal gearbox spinning quickly during testing', caption: 'High-speed test.' }
];
