# William Huang — Mechanical Engineering Portfolio

A static portfolio for `willblah/willcom`
Live site: https://willblah.github.io/willcom/

## Preview locally

Requires Node.js 22 or newer

```sh
node server.mjs
```

Open **http://127.0.0.1:4186**

No installation or credentials are needed to preview the site
The small Node server only serves files on your computer
You can also use `pnpm dev` for automatic server restarts
Refresh the browser after editing frontend files

The Resume page renders the PDF directly with a local copy of PDF.js 5.6.205.
It loads when the Resume page is opened, fits to the page width, and supports
text selection without requiring a browser PDF plugin. Replace the PDF named
by `resume` in `public/content.js` to update both the preview and download.
PDF.js and its Apache-2.0 license are in `public/vendor/pdfjs/`.

Set the `PORT` environment variable if you need a different local port

## Edit your content

Edit **`public/content.js`**

| Content | What to edit |
| --- | --- |
| Home introduction | `summary` (blank lines separate paragraphs) |
| Sample projects | `featuredProjects` (project IDs in display order) |
| Experience cards | Add entries to `experience` with a `startDate` in `YYYY-MM` format; newest appears first, with all cards the same size |
| Projects | Edit entries in `projects`; the expanded stories use the separate content files listed below |
| Resume | Put your PDF in `public/assets/` and set `resume` to its relative URL |

Experience example:

```js
experience: [
  {
    startDate: '2026-05',
    dates: 'May – August 2026',
    role: 'Your role',
    organization: 'Organization name',
    logo: './assets/organization-logo.png',
    description: 'Your responsibilities and accomplishments',
    content: []
  }
]
```

Click an experience card to open its popup. The popup shows its role,
organization, dates, logo, and My role section. Add blocks to that entry's
`content` array to fill My role with a longer story, photos, or videos.
The brief `description` appears only on the card.
Experience popups support all the same blocks documented for projects below.

Use `project-links` to add clickable project cards to an experience:

```js
{ type: 'project-links', items: [
  { projectId: '06', label: '2026 · FRC season', description: 'Intake and indexing development.' },
  { projectId: '05', label: '2025 · WCP Cadathon', description: 'Robot concept and strategy.' }
] }
```

The cards use the matching project's current title and cover image. They open
that project in the same popup. Clicking outside or pressing Escape returns one
level at a time, preserving scroll position and focus. The top-right X closes
every popup layer and returns focus to the original experience card.
Stat blocks accept any number of entries; use only meaningful, contextualized results.

Project example:

```js
{
  id: 'your-project',
  slug: 'your-project',
  title: 'Your project title',
  description: 'A short description that stays visible on the project card',
  purpose: 'What you did it for',
  category: 'Student Teams',
  image: './assets/your-project.jpg',
  placeholder: false,
  content: []
}
```

Categories are `Internships`, `Personal`, `Student Teams`, and `Classwork`
The `All` filter includes every project. The Internships filter is currently hidden.
The six project entries contain sourced descriptions, photos, CAD views, and demos.
Source mapping and qualifications are recorded in `docs/project-sources.md`.

Each project has a stable link such as `#projects/cycloidal-gearbox`.
Visitors can copy the URL from the address bar. Direct links and reloads reopen the project;
browser Back/Forward follows popup levels. Report figures can be selected to
enlarge them. Escape or a backdrop click returns to the previous view; X closes
all popup layers.
Keep project slugs stable when editing titles so shared links keep working.

## Write a project popup

Click any project image to open its popup
Edit the popup in **`public/content.js`**, inside that project's **`content`** array
The expanded stories live in `public/robotic-hand-content.js`,
`public/swerve-content.js`, `public/wallet-content.js`, and
`public/cycloidal-gearbox-content.js`. Use concise first-person writing and
short headings such as “Palm design,” “Wrist and forearm,” and “Testing.”
Describe the work, decisions, and results directly. Omit filler, jokes,
generic lessons, rhetorical contrasts, and calculation walkthroughs. Credit
shared work and keep metric qualifications brief.
Save the file, refresh the local preview, and click the project again to see your changes
The existing projects demonstrate the available layouts

The popup uses blocks arranged from top to bottom
Each block is one paragraph, heading, image, video, gallery, or list
Additional blocks provide opening summaries, tools, paired media
and text, highlighted notes, and report links:

```js
{ type: 'tags', items: ['Onshape', '3D printing'] }
{ type: 'lead', text: 'One sentence introducing the project.' }
{ type: 'feature',
  media: { type: 'image', src: './assets/project.jpg', alt: 'Prototype' },
  heading: 'Design decisions',
  content: [{ type: 'text', text: 'What changed and why.' }] }
{ type: 'callout', label: 'Test results', text: 'A result or lesson.' }
{ type: 'links', items: [{ label: 'Read the report', reader: './assets/report.pdf', href: 'https://example.com/report' }] }
```

`feature` places media beside copy on desktop and stacks it on mobile. A gallery
can use `media: [...]` for image and video blocks together, or the original
`images: [...]` format. Use `layout: 'drawings'` for three drawing previews that
stack on mobile and enlarge when selected. Put each opening summary directly
below its tags. Project popups omit separate contribution sections.
Report buttons open a themed in-page PDF reader with
page selection, previous/next controls, zoom, and selectable text. Set `reader`
to a local PDF asset; `href` records the original source. A direct HTTPS PDF can
also be used, provided its server permits cross-origin requests. The swerve report
is bundled locally so visitors need no Google login. Set `newTab: true` to open
the original `href` in a new tab instead, as the Helios technical binder does.

Use a `video` block for playable demonstrations. MP4 with H.264 video and AAC
audio works well in browsers. For example:

```js
{ type: 'video', src: './assets/robotic_hand_vid.mp4', size: 'small',
  label: 'Robotic Hand V1 demonstration', poster: './assets/robotic-hand-video-poster.jpg' }
```

Videos have playback controls and pause when the project popup closes.
**Move a whole block up or down in the array to move it in the popup**
Repeat any block as many times as you need

### Quick example: text, image, then more text

1. Put your image in `public/assets/`, for example `public/assets/my-project/prototype.jpg`
2. Find the project you want in `public/content.js`
3. Replace its `content: []` with this example and change the words and image path

```js
content: [
  { type: 'heading', text: 'Overview' },
  {
    type: 'text',
    text: `Write what the project is and why you made it

You can write several lines here and leave a blank line between paragraphs`
  },
  {
    type: 'image',
    src: './assets/my-project/prototype.jpg',
    alt: 'A description of what is visible in the image',
    caption: 'An optional caption beneath the photo',
    size: 'wide'
  },
  {
    type: 'image',
    src: './assets/my-project/testing.jpg',
    alt: 'The prototype during testing',
    size: 'medium',
    align: 'center'
  },
  { type: 'heading', text: 'Results' },
  {
    type: 'list',
    items: [
      'A result or accomplishment',
      'Something you learned',
      'What you would change next'
    ]
  }
]
```

To place an image before all your writing, make the image block first
To place it between two paragraphs, insert it between two `text` blocks
The grid thumbnail comes from the project's `image` field, while popup images come from its `content` blocks
This lets you use different images in the grid and popup

### Image sizes and placement

| Field | What it does |
| --- | --- |
| `src` | Image path, such as `./assets/my-project/photo.jpg` |
| `alt` | Short description for screen readers and when the image cannot load |
| `caption` | Optional text directly underneath the image |
| `size: 'wide'` | Full content width, the default |
| `size: 'medium'` | Up to 520 pixels wide |
| `size: 'small'` | Up to 320 pixels wide |
| `align: 'left'` | Align a smaller image to the left |
| `align: 'center'` | Center the image, the default |
| `align: 'right'` | Align a smaller image to the right |

Images shrink to fit phones and keep their full picture without cropping
Use JPG, PNG, WebP, or SVG files
Paths begin with `./assets/` because that folder is inside `public/`
Match the filename and extension exactly, including capitalization

### Two images beside each other

Insert a `gallery` block anywhere in the same `content` array
Its images sit in two columns on desktop and stack on phones
Add more image objects to extend the gallery

```js
{
  type: 'gallery',
  images: [
    {
      src: './assets/my-project/cad-model.png',
      alt: 'The CAD model',
      caption: 'Initial design'
    },
    {
      src: './assets/my-project/finished-part.jpg',
      alt: 'The finished part',
      caption: 'Finished prototype'
    }
  ]
}
```

### Editing tips

- Use backticks around longer text, as in the example, so apostrophes and line breaks are easy to write
- Put a comma between neighboring blocks and between neighboring projects
- Keep a unique `id` for every project
- Add or remove headings freely to suit the project
- Text is displayed as written, so use separate blocks for formatting instead of HTML or Markdown
- If `content` is empty or omitted, the popup shows the grid image and a short coming-soon message
- Close a popup using the X button, Escape, or the shaded area outside it

## Add your resume

Put your PDF in `public/assets/` and set its path in `public/content.js`:

```js
resume: './assets/william-huang-resume.pdf'
```

Adding a resume URL enables the centered download button and embedded PDF preview
Until then, the button is disabled and the page shows a placeholder
Browsers without embedded PDF support get a link to open the document

## Contact

Contact contains two links:

- [LinkedIn](https://www.linkedin.com/in/c-williamhuang/)
- [c.william.huang@gmail.com](mailto:c.william.huang@gmail.com)

The LinkedIn block opens the profile in a new tab. The email block copies the
address to the clipboard and shows an inline confirmation. Neither opens a popup.
There is no contact form, SMTP endpoint, or Gmail app password requirement
Any previously created local `.env` file remains ignored by Git and is no longer loaded

## Design

- Warm off-white background and blue navigation
- Inter at weight 400, with weight 500 for the selected navigation item
- Larger navigation targets and a clearer selected state
- Plain centered summary text, with matching line–diamond–line ornaments around the home introduction
- Page names retained only as accessible headings for screen readers
- Centered filters above the project grid
- Three project columns on desktop, two on tablets, one on phones
- Project titles and purposes appear on hover or keyboard focus and remain visible on touch devices
- Clicking a project opens an accessible popup with its own text and image blocks
- Short slide transitions and reduced-motion support

## Validation

```sh
node --test tests/*.test.mjs
```

The server test checks static file delivery, private file protection, and removal of the contact endpoint
Browser checks cover navigation, exclusive project filters, responsive layouts, the contact links, and popup opening, dismissal, focus, and scrolling

## GitHub Pages

The `public/` directory contains the complete website and can be served by static hosting
There is no production Node backend requirement
The `Publish portfolio` workflow checks the site and publishes `public/` to
GitHub Pages when changes are pushed to `main`. Pages uses GitHub Actions as
its publishing source. Local edits appear online after they are committed
and pushed.

## Files

```text
public/
  index.html     Six page sections
  styles.css     Layout, colors, responsiveness, and motion
  app.js         Navigation, filters, and project cards
  project-dialog.js  Popup behavior and content block rendering
  content.js     Your editable portfolio content
  robotic-hand-content.js  Hand story and original report figures
  swerve-content.js  Swerve story and original report figures
  wallet-content.js  Red → white → final black prototype story
  cycloidal-gearbox-content.js  Gearbox story, photos, and calculations
  assets/        Example SVGs, Inter fonts, and future images/PDF
server.mjs       Local preview server
tests/          Static server check
```

Inter uses the SIL Open Font License included in `public/assets/Inter-OFL.txt`
