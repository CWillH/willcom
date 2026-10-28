// Figures are extracted from William Huang Robotic Hand Design Report.pdf.
// Page numbers refer to the 27-page original report, not the later V2 concept.
const sizes = {
  '15': [[1200, 1600]], '16': [[1200, 1600]],
  '18': [[794, 530], [1376, 754], [1014, 594], [1172, 686]],
  '19': [[744, 172], [376, 412]],
  '20': [[788, 794], [822, 846], [644, 624], [1200, 1600]],
  '21': [[1200, 1600], [891, 691]],
  '22': [[920, 758], [1200, 1600], [1142, 578], [1200, 1600]],
  '23': [[1200, 1600], [1600, 1200], [1600, 1200]],
  '24': [[930, 236], [1006, 1042], [1038, 208]],
  '25': [[984, 514], [1056, 346]]
};
const figure = (page, number, alt, caption) => {
  const [width, height] = sizes[page][number - 1];
  return {
    src: `./assets/robotic-hand-report/page-${page}-${String(number).padStart(2, '0')}.webp`,
    width, height, alt, caption
  };
};

export const roboticHandContent = [
  { type: 'tags', items: ['Fusion 360', '3D Printing', 'Tendon Mechanisms', 'Raspberry Pi Pico', 'Design for Assembly'] },
  { type: 'lead', text: 'Built an 11-DOF robotic hand with flexion/extension and abduction/adduction across all five fingers.' },
  {
    type: 'feature',
    media: { type: 'video', src: './assets/robotic_hand_vid.mp4', poster: './assets/robotic-hand-video-poster.jpg', label: 'Robotic Hand V1 finger and wrist actuation' },
    heading: 'Actuation',
    content: [
      { type: 'text', text: 'Each finger curls and moves side to side, while the wrist rotates. Fishing-line tendons connect each finger to two MG90S servos in the forearm. An MG996R drives the wrist; a Raspberry Pi Pico controls all 11 servos.' }
    ]
  },
  { type: 'heading', text: 'Design' },
  { type: 'text', text: 'Compared push-pull tendons, elastic returns, and four-bar linkages. Elastic returns simplified construction and added grip resistance; four-bar linkages required more joints and assembly.' },
  { type: 'gallery', images: [
    figure('15', 1, 'William Huang’s hand concept sketches with finger joints and tendon routing', 'Hand concept. Report p. 15.'),
    figure('16', 1, 'William Huang’s early forearm concept sketches', 'Forearm sketch. Report p. 16.')
  ] },
  { type: 'heading', text: 'Finger design' },
  { type: 'text', text: 'Circular tendon holes in the first knuckles rubbed against the line as joints rotated. Open slots reduced friction and allowed the tendon angle to change.' },
  { type: 'gallery', images: [
    figure('18', 2, 'Early finger CAD model with enclosed tendon holes', 'Initial tendon holes. Report p. 18.'),
    figure('18', 3, 'Revised finger CAD model with an open tendon routing slot', 'Revised tendon slot. Report p. 18.')
  ] },
  { type: 'text', text: 'Printed pins connect the finger segments. Tendons curl the fingers and control sideways movement; elastic returns extend them. Tendon routes were checked in extended and curled CAD positions.' },
  { type: 'gallery', images: [
    figure('19', 1, 'CAD model of the tendon-driven finger fully extended', 'Extended finger. Report p. 19.'),
    figure('19', 2, 'CAD model of the tendon-driven finger curled', 'Curled finger. Report p. 19.')
  ] },
  { type: 'heading', text: 'Palm design' },
  { type: 'text', text: 'Tendons crossed and tangled inside the open palm, so a central pillar separates their routes. The upper palm holds the finger hinges; the lower half provides tendon access.' },
  { type: 'gallery', images: [
    figure('20', 1, 'Initial lower palm CAD with an open interior cavity', 'Initial lower palm. Report p. 20.'),
    figure('20', 2, 'Revised lower palm CAD with a central tendon-routing pillar', 'Lower palm with routing pillar. Report p. 20.')
  ] },
  { type: 'feature',
    media: { type: 'image', size: 'small', ...figure('20', 4, 'Printed palm with fingers and red elastic return bands', 'Palm with elastic returns. Report p. 20.') },
    content: [{ type: 'text', text: 'The thumb and fingers use the same connection method to simplify assembly. Printed joints and tendon routes were checked against the CAD.' }]
  },
  { type: 'gallery', images: [
    figure('21', 2, 'Complete robotic hand CAD assembly viewed from the palm', 'Complete hand CAD assembly. Report p. 21.'),
    figure('21', 1, 'Assembled gray 3D-printed robotic hand with five fingers', 'The assembled printed hand. Report p. 21.')
  ] },
  { type: 'heading', text: 'Wrist and forearm' },
  { type: 'text', text: 'The hand, forearm, and wrist form an integrated assembly. A drive gear turns a ring gear, with a bearing supporting the hand. Compact gearing fits inside the forearm but reduces available travel.' },
  { type: 'text', text: 'A wrist tendon guide keeps the lines clear of the gears. The forearm halves capture the bearing adapter, and four M3 screws attach the hand. Servo string adapters pull the tendons.' },
  { type: 'gallery', images: [
    figure('22', 1, 'Sectioned wrist CAD showing the ring gear, drive gear, bearing, and tendon passage', 'Wrist section. Report p. 22.'),
    figure('22', 3, 'Forearm CAD with internal servo positions and wiring space', 'Forearm servo layout. Report p. 22.')
  ] },
  { type: 'heading', text: 'Assembly' },
  { type: 'text', text: 'The forearm print sagged, leaving a seam gap and misaligned screw holes. A printed gasket restored clamping between the halves.' },
  { type: 'gallery', images: [
    figure('23', 2, 'Printed forearm enclosure seam showing distortion and a fit gap', 'Forearm seam gap. Report p. 23.'),
    figure('23', 1, 'Thin printed gasket made to fill the forearm enclosure gap', 'Printed gasket. Report p. 23.')
  ] },
  { type: 'image', ...figure('23', 3, 'Opened forearm with installed servos, tendon adapters, and wiring', 'Installed servos and wiring. Report p. 23.') },
  { type: 'heading', text: 'Servo controls' },
  { type: 'text', text: 'Pico controls were written in C. Each servo record stores its GPIO, PWM slice, and channel. A shared pin array simplifies connection changes, while finger states track idle, sideways movement, and retraction.' },
  { type: 'text', text: 'The servos use 50 Hz PWM with 500–2,500 microsecond pulses. Software limits commands to 0–180°; physical travel depends on each mechanism’s calibration.' },
  { type: 'gallery', images: [
    figure('25', 1, 'C servo initialization function configuring GPIO and PWM', 'Servo initialization. Report p. 25.'),
    figure('25', 2, 'C servo angle function clamping commands and setting pulse width', 'Angle commands. Report p. 25.')
  ] },
  {
    type: 'feature',
    media: { type: 'video', src: './assets/robotic-hand-servo-actuation.mp4', poster: './assets/robotic-hand-servo-actuation-poster.jpg', label: 'Robotic hand opened to show the servos actuating' },
    heading: 'Tendon adjustment',
    content: [
      { type: 'text', text: 'Line tension is adjusted manually through the removable palm covers.' }
    ]
  },
  { type: 'heading', text: 'Testing' },
  { type: 'list', items: [
    'Printed joint pins caused friction under load. Maximum grip force was not measured.',
    'Simultaneous actuation slowed the hand, and commands above four fingers could stall it. Power-supply and wiring issues were suspected but not isolated.',
    'The hand had no joint or tendon sensors to verify finger position or tendon load.'
  ] },
  { type: 'callout', label: 'Next steps', text: 'Replace printed joint pins with bearings, simplify tendon tensioning, and improve the forearm print to reduce sag.' }
];
