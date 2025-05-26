# Documentation Guide

This directory contains the markdown content for the Antimetal documentation. This README explains how to add or modify documentation.

## Directory Structure

```
docs/
├── content/           # Markdown content files
│   ├── getting-started.md
│   ├── architecture.md
│   └── ...
├── getting-started/   # Page components that render the markdown
│   └── page.tsx
├── architecture/
│   └── page.tsx
└── ...
```

## Adding New Documentation

To add new documentation:

1. Create a new markdown file in the `content/` directory (e.g., `content/new-topic.md`)
2. Create a new directory for the page component (e.g., `new-topic/`)
3. Create a `page.tsx` file in the new directory that renders the markdown content
4. Add a link to the new documentation page in the main documentation page (`docs/page.tsx`)

## Markdown Guidelines

When writing markdown documentation:

- Use heading levels appropriately (start with `#` for the title)
- Use code blocks with language specification for code examples (e.g., ```jsx)
- Use relative links for internal navigation
- Include images in the `public/docs/` directory and reference them with absolute paths

## Rendering Markdown

In a production environment, you would use a markdown parser like `remark` or `markdown-it` to convert the markdown to HTML. To implement this:

1. Install the necessary packages:
   ```bash
   npm install remark remark-html
   # or
   yarn add remark remark-html
   ```

2. Update the page components to use the markdown parser:
   ```jsx
   import { remark } from 'remark';
   import html from 'remark-html';

   // ...

   async function getMarkdownContent(filename) {
     const markdownPath = path.join(process.cwd(), `src/app/docs/content/${filename}.md`);
     const markdownContent = fs.readFileSync(markdownPath, 'utf8');
     
     const processedContent = await remark()
       .use(html)
       .process(markdownContent);
       
     return processedContent.toString();
   }

   // ...

   // In your component:
   const contentHtml = await getMarkdownContent('your-file-name');
   
   // Then render it:
   <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
   ```

## Best Practices

- Keep documentation up-to-date with code changes
- Use clear, concise language
- Include examples and code snippets
- Break down complex topics into smaller sections
- Use consistent formatting and style
- Include diagrams or images for visual explanation when helpful 