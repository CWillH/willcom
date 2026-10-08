// Original 25-page project report. Page numbers below
// refer to PDF pages; the printed page labels start at zero.
const sizes = {
  12: [[1350, 1800]], 14: [[563, 477], [570, 539]], 15: [[909, 727]],
  16: [[1350, 1800], [694, 676]], 17: [[473, 532], [489, 325]],
  18: [[1350, 1800], [1350, 1800], [1350, 1800], [1350, 1800]],
  19: [[1350, 1800], [1350, 1800]], 20: [[496, 418], [1350, 1800], [310, 274]],
  21: [[870, 435], [414, 395]], 22: [[359, 382], [571, 518]],
  23: [[657, 733], [672, 627]]
};
const figure = (page, index, alt, caption) => {
  const [width, height] = sizes[page][index - 1];
  return { src: `./assets/swerve-report/page-${page}-${String(index).padStart(2, '0')}.webp`, width, height, alt, caption };
};

export const swerveContent = [
  { type: 'tags', items: ['Fusion 360', '3D Printing', 'Python', 'VEX V5', 'Print-fit Testing'] },
  { type: 'lead', text: 'I built a four-motor differential swerve chassis and developed its mechanical design and Python controls, measuring about 7.0 ft/s in a timed distance test against a 6.5 ft/s target.' },
  { type: 'image', src: './assets/diff_swerve_fullchassis.jpg', alt: 'My assembled differential swerve chassis with two blue powered modules and omni support wheels', size: 'medium', caption: 'Assembled chassis.' },
  { type: 'heading', text: 'Requirements' },
  { type: 'text', text: 'The class project required VEX V5 parts, 4-inch wheels, printed components, and a 6.5 ft/s target speed. The four-motor limit allowed two powered modules and two passive support wheels.' },
  { type: 'text', text: 'I chose a differential arrangement that combines two motors’ motion to control wheel speed and steering. Both motors contribute to driving the wheel.' },
  { type: 'heading', text: 'Gearing' },
  { type: 'text', text: 'I used 600 RPM cartridges, 25:75 and 75:40 gear stages, and 4-inch wheels. This gave a calculated wheel speed of 375 RPM, or about 6.54 ft/s.' },
  { type: 'heading', text: 'Module design' },
  { type: 'text', text: 'My first module occupied roughly 7 by 7 inches with excess space around the mechanism. I moved the motors and supports closer to the wheel hub in the second version.' },
  { type: 'gallery', images: [
    figure(14, 1, 'First differential swerve CAD module with a large square mounting plate', 'First module layout.'),
    figure(14, 2, 'More compact differential swerve CAD module with two motors above the wheel hub', 'Compact second layout.')
  ] },
  { type: 'heading', text: 'Print tolerances' },
  { type: 'text', text: 'I printed fit tests before the full modules. For these prints, the inserts needed 0.003 inches of clearance on each side, and the bearings fit with no added clearance.' },
  { type: 'gallery', images: [
    figure(18, 3, 'Red printed test strip with several heat-set insert holes', 'Insert fit test.'),
    figure(18, 1, 'Two bearings seated in a small blue printed fit-test part', 'Bearing fit test.')
  ] },
  { type: 'text', text: 'The V-rings fit snugly with 0.001-inch clearance. Aligned print seams caused a bump during rotation. I used random seam placement to spread the seams around the ring.' },
  { type: 'gallery', images: [
    figure(18, 2, 'Blue printed V-ring with a concentrated line of print seams', 'V-ring with aligned seams.'),
    figure(18, 4, 'Blue printed V-ring with the seam locations distributed around its edge', 'V-ring with random seams.')
  ] },
  { type: 'heading', text: 'Bearing support' },
  { type: 'text', text: 'I used V-groove bearings to support the gears and wheel hub. I adjusted their fit to maintain gear mesh and reduce friction, spacing the bearings away from the adjacent mount faces to prevent rubbing.' },
  { type: 'gallery', images: [
    figure(21, 1, 'Color-coded bearing cross-section with a yellow bearing, green gear, and blue and orange mount faces', 'Bearing clearance section.'),
    figure(21, 2, 'Printed wheel hub with traction wheel held between two large black gears', 'Assembled wheel hub.')
  ] },
  { type: 'text', text: 'The module rotated under an approximately 20-pound load on the main plate, with increased friction. The upper gear had more friction due to tighter bearing seating and excess preload.' },
  { type: 'heading', text: 'Assembly' },
  { type: 'text', text: 'I reprinted a large plate that warped during early removal from the print bed. I also reduced the support columns from eight inserts each to four after checking their stability.' },
  { type: 'image', size: 'medium', ...figure(20, 2, 'Printed wheel hub parts and reprinted plate laid out on a workbench', 'Revised assembly parts.') },
  { type: 'heading', text: 'Support wheels' },
  { type: 'text', text: 'The first support-wheel design used a swiveling caster. Its 4-inch wheel needed a large turning arc, restricting tight turns.' },
  { type: 'gallery', images: [
    figure(16, 2, 'Initial swivel caster CAD with a four-inch omni wheel and vertical pivot', 'Initial swivel caster.'),
    figure(17, 1, 'Revised fixed omni-wheel CAD with a printed mounting plate', 'Fixed omni-wheel mount.')
  ] },
  { type: 'text', text: 'I replaced the caster with a fixed omni wheel at 45°. The rollers allow sideways movement. Each mount used a printed plate, two spacers, and VEX hardware. Large fillets supported the wheel, with minimal bending during load checks.' },
  { type: 'image', ...figure(17, 2, 'Two assembled blue printed omni-wheel support mounts', 'Completed support wheels.') },
  { type: 'heading', text: 'Chassis' },
  { type: 'text', text: 'The assembled frame flexed enough to lift wheels off the floor. I added a cross-brace and mounted the brain and battery lower at the center of the chassis.' },
  { type: 'image', ...figure(15, 1, 'Full chassis CAD with two differential modules, two support wheels, and a central cross-brace', 'Chassis CAD with cross-brace.') },
  { type: 'gallery', images: [
    figure(22, 1, 'First completed swerve module with two VEX motors, wiring, and steering encoder', 'Completed module.'),
    figure(23, 1, 'Assembled differential swerve module viewed from the side with exposed gears and bearing supports', 'Module gearing and supports.')
  ] },
  { type: 'heading', text: 'Testing' },
  { type: 'text', text: 'I wrote Python controls to convert joystick input into paired motor commands. Steering-position errors caused the modules to lose synchronization.' },
  { type: 'text', text: 'The lower pinion plates and wheel hubs deflected under changing loads, causing gear skipping. I had identified the pinion-plate risk in CAD. I used rubber bands to hold the pinions against the main gears as a temporary fix. After a skipped tooth, the motor encoders could no longer track the wheel hub accurately.' },
  { type: 'callout', label: 'Next steps', text: 'I would reinforce the pinion plates, improve steering feedback, and adjust the V-ring fits to reduce hub deflection and friction. Lower motor mounts would reduce the center of gravity.' }
];
