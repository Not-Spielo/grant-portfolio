// Simple Markdown Parser
function parseMarkdown(markdown) {
  let html = markdown;

  // Headings
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Inline code
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');

  // Code blocks
  html = html.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Unordered lists
  html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>)/gs, function(match) {
    if (!match.includes('<ul>')) {
      return '<ul>' + match + '</ul>';
    }
    return match;
  });

  // Ordered lists
  html = html.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');

  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<h[1-6]|<ul>|<ol>|<pre>)/g, '$1');
  html = html.replace(/(<\/h[1-6]>|<\/ul>|<\/ol>|<\/pre>)<\/p>/g, '$1');

  return html;
}

// Extract frontmatter from markdown
function extractFrontmatter(markdown) {
  const frontmatterMatch = markdown.match(/^---([\s\S]*?)---/);
  if (!frontmatterMatch) return { metadata: {}, content: markdown };

  const metadata = {};
  const metadataStr = frontmatterMatch[1];
  
  const lines = metadataStr.split('\n');
  for (let line of lines) {
    if (line.trim()) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim().replace(/['"`]/g, '');
      metadata[key.trim().toLowerCase()] = value;
    }
  }

  const content = markdown.substring(frontmatterMatch[0].length).trim();
  return { metadata, content };
}

// Load and generate cards for projects or music
async function loadCards(type) {
  const container = document.getElementById('cards-container');
  if (!container) return;

  // add a body class for project-specific styling
  if (type === 'projects') {
    document.body.classList.add('projects-page');
  } else {
    document.body.classList.remove('projects-page');
  }

  // List of example files to try loading
  // Add your own project/music filenames here
  const filenames = type === 'projects' 
    ? [`untitled-starfox-tribute`, 'idle-type', `highsteaks`, `ailurophobia`, `missing-in-time`, `wavesplash`]
    : [`ailurophobia`, `infinite`, `missing-in-time`, `its-easy`, `peace-of-mind`, 'super-lofi-bros', `cycling`, 'hero-no-more'];

  for (let filename of filenames) {
    const path = `posts/${type}-post/${filename}.md`;
    try {
      const response = await fetch(path);
      if (response.ok) {
        const markdown = await response.text();
        const { metadata, content } = extractFrontmatter(markdown);
        const card = createCard(filename, metadata, type);
        container.appendChild(card);
      }
    } catch (error) {
      console.log(`Could not load ${filename}`);
    }
  }
}

// Create a card element
function createCard(filename, metadata, type) {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.cursor = 'pointer';

  const title = metadata.title || filename.replace(/-/g, ' ').toUpperCase();
  const image = metadata.image || '';
  const description = metadata.description || '';
  const release = metadata.release || '';

  card.innerHTML = `
    <div class="card-media">
      ${image ? `<img src="${image}" alt="${title}" class="card-image">` : '<div class="card-image" style="background-color: #e0e0e0;"></div>'}
      <div class="card-overlay">
        <div class="overlay-title">${title}</div>
        ${release ? `<div class="overlay-release">${release}</div>` : ''}
        <div class="overlay-description">${description}</div>
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    window.location.href = `pages/${type}/${filename}.html`;
  });

  return card;
}

// Load and display detail page
async function loadDetailPage(type, filename) {
  const path = `../../posts/${type}-post/${filename}.md`;
  const imageContainer = document.getElementById('detail-image');
  const titleContainer = document.getElementById('detail-title');
  const contentContainer = document.getElementById('detail-content');

  // Add type-specific class to body
  document.body.classList.remove('projects-page', 'music-page');
  if (type === 'projects') {
    document.body.classList.add('projects-page');
  } else if (type === 'music') {
    document.body.classList.add('music-page');
  }

  try {
    const response = await fetch(path);
    const markdown = await response.text();
    const { metadata, content } = extractFrontmatter(markdown);

    if (metadata.image && imageContainer) {
      const img = document.createElement('img');
      img.src = metadata.image;
      img.alt = metadata.title || filename;
      img.className = 'detail-image';
      imageContainer.appendChild(img);
    }

    if (titleContainer) {
      titleContainer.textContent = metadata.title || filename.replace(/-/g, ' ');
    }

    if (contentContainer) {
      const htmlContent = parseMarkdown(content);
      contentContainer.innerHTML = htmlContent;
    }
  } catch (error) {
    console.error('Error loading detail page:', error);
    if (contentContainer) {
      contentContainer.innerHTML = '<p>Error loading content.</p>';
    }
  }
}

// Utility function to get URL parameters
function getUrlParameter(name) {
  const url = window.location.href;
  const regex = new RegExp('[?&]' + name + '=([^&#]*)');
  const results = regex.exec(url);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Get filename from URL path (for detail pages)
function getFilenameFromPath() {
  const path = window.location.pathname;
  const parts = path.split('/');
  const filename = parts[parts.length - 1].replace('.html', '');
  return filename;
}
