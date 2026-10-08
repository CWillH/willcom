const video = (name, label, caption) => ({ type: 'video', src: `./assets/project-process/${name}.mp4`, poster: `./assets/project-process/${name}-poster.jpg`, label, caption });

const drawing = (name, label) => ({ type: 'image', src: `./assets/wallet-drawings/${name}.webp`, width: 2807, height: 1984, alt: `${label} manufacturing drawing with dimensions and tolerances`, caption: label });

export const walletContent = [
  { type: 'tags', items: ['Onshape', '3D Printing', 'Mechanism Design', 'CNC Drawings', 'DFM'] },
  { type: 'lead', text: 'I created a unique button activated mechanical fanning wallet with an 8 card capacity. I worked through 13 3D printed prototypes to reach nearly 100% consistency before CNC machining it out of aluminum.' },
  { type: 'heading', text: 'Initial prototypes' },
  { type: 'text', text: 'I modeled the mechanism in Onshape and tested the first printed prototypes. Fanning was inconsistent, with cards lifting out of the guide and moving too far outward.' },
  { type: 'gallery', media: [
    video('wallet-red-prototype', 'Initial wallet prototype fanning its cards', 'Initial fanning test.'),
    video('wallet-red-card-launch', 'A card flying out of the initial wallet prototype', 'Card launch.')
  ] },
  { type: 'heading', text: 'Further improvements' },
  { type: 'text', text: 'I revised the printed mechanism, slightly improving fanning consistency.' },
  { type: 'feature',
    media: { type: 'image', src: './assets/project-process/wallet-white-corner-foam.webp', width: 1152, height: 1536, alt: 'Improved wallet prototype with cards fanned out and a foam piece at the top-right corner', caption: 'Corner foam.' },
    heading: 'Card retention',
    content: [
      { type: 'text', text: 'Cards kept lifting out of the guide. I added foam at the corner to press them down into the fanning path.' }
    ]
  },
  { ...video('wallet-white-improved-fan', 'Later fanning test of the improved wallet prototype', 'Revised prototype.'), size: 'small' },
  { type: 'heading', text: 'Final prototype' },
  { type: 'video', src: './assets/wallet-fanning.mp4', poster: './assets/wallet-fanning-poster.jpg', size: 'small', label: 'Final printed wallet prototype fanning its cards', caption: 'Final prototype fanning test.' },
  { type: 'heading', text: 'Manufacturing' },
  { type: 'image', src: './assets/wallet_cover.jpg', width: 2160, height: 2880, size: 'medium', alt: 'CNC-machined aluminum wallet with cards fanned out on a green background', caption: 'CNC-machined wallet.' },
  { type: 'heading', text: 'CNC drawings' },
  { type: 'text', text: 'I sent these drawings to JLCCNC to specify thread sizes, hole locations, and tolerances.' },
  { type: 'gallery', layout: 'drawings', media: [
    drawing('front-plate', 'Front plate'),
    drawing('back-plate', 'Back plate'),
    drawing('fanning-lever', 'Fanning lever')
  ] }
];
