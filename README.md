# My Portfolio Website

A simple, elegant portfolio website to showcase your projects and music. Built with vanilla HTML, CSS, and JavaScript — no complex build tools required!

## Features

✨ **Simple to Use** - Just add markdown files and they automatically appear  
📱 **Responsive Design** - Looks great on desktop, tablet, and mobile  
🎨 **Clean & Modern** - Minimalist design focused on your work  
⚡ **Fast & Lightweight** - No frameworks or bloat, pure HTML/CSS/JS  
🎵 **Projects & Music** - Separate galleries for different types of work

## Folder Structure

```
grant-portfolio/
├── index.html              (Home page)
├── projects.html           (Projects gallery)
├── music.html              (Music gallery)
├── about-me.html           (About page)
├── styles/
│   └── style.css           (All styling)
├── js/
│   └── script.js           (Markdown rendering & card generation)
├── media/
│   ├── images/             (Project & music cover images)
│   └── audio/              (Audio files)
├── posts/
│   ├── projects-post/      (Project markdown files)
│   └── music-post/         (Music markdown files)
└── pages/
    ├── projects/           (Project detail pages)
    └── music/              (Music detail pages)
```

## How to Add Projects

1. Create a new markdown file in `posts/projects-post/`
2. Name it something descriptive (e.g., `my-first-app.md`)
3. Add frontmatter at the top with metadata:

```markdown
---
title: My App Title
image: ../media/images/my-app.jpg
description: A brief description of the project
---

# Project Details

Your full project description in markdown format...
```

4. Create a corresponding HTML file in `pages/projects/` with the same name:
   - Copy `pages/projects/portfolio-website.html` as a template
   - Change the filename in the JavaScript: `loadDetailPage('projects', 'your-filename');`

5. Update `js/script.js` - add your filename to the `filenames` array in the `loadCards()` function

## How to Add Music

Same process as projects:

1. Create markdown in `posts/music-post/`
2. Add frontmatter with `title`, `image`, and `description`
3. Create HTML detail page in `pages/music/`
4. Update `js/script.js` filenames array

Example:

```markdown
---
title: My Album
image: ../media/images/album-cover.jpg
description: Album description
---

# Album Name

Album content goes here...
```

## Running Locally

Since this uses the Fetch API to load markdown files, you need to run it through a local server (not as `file://`).

### Option 1: Python (if you have it)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then visit `http://localhost:8000`

### Option 2: Node.js (if you have it)

```bash
npx http-server
```

### Option 3: VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

## Customizing Content

### Website Title & Info

- Edit `index.html` for the home page content
- Edit `about-me.html` for your bio

### Styling

- All CSS is in `styles/style.css`
- Colors, fonts, spacing can be customized there

### Navigation

Navigation appears on all pages. To modify menu items, edit the `<nav>` section in any HTML file.

## Markdown Formatting

The markdown parser supports:

- **Headings**: `# Heading 1`, `## Heading 2`, `### Heading 3`
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Links**: `[text](url)`
- **Code**: `` `inline code` ``
- **Code blocks**: ` ```code here``` `
- **Lists**: `* item` or `1. item`

## Image & Media Paths

When adding images or audio files:

- Store them in the `media/` folder
- In markdown files, reference them relative to the post file:
  - `image: ../media/images/my-image.jpg`
- In HTML files (like about-me), use:
  - `src="media/images/my-image.jpg"`

## Tips for Success

- Keep markdown file names simple (lowercase, hyphens instead of spaces)
- Provide good quality cover images (16:9 aspect ratio works best)
- Write compelling descriptions for the card view (appear in galleries)
- Always create both the markdown file AND the HTML detail page
- Update `js/script.js` when adding new projects/music

## Browser Support

Works in all modern browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## License

Free to use and modify for your portfolio!
