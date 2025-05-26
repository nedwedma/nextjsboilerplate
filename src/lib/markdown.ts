import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

/**
 * Converts markdown to HTML using remark, remark-html, and remark-gfm
 * This provides proper GitHub Flavored Markdown support including tables, strikethrough, etc.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(gfm) // Enables GitHub Flavored Markdown
    .use(html, {
      sanitize: false, // Allow HTML in markdown
    })
    .process(markdown);
    
  return result.toString();
}

/**
 * Reads a markdown file from the content directory and converts it to HTML
 */
export async function getMarkdownContent(filename: string): Promise<string> {
  const markdownPath = path.join(process.cwd(), `src/app/(sites)/docs/content/${filename}.md`);
  const markdownContent = fs.readFileSync(markdownPath, 'utf8');
  return await markdownToHtml(markdownContent);
} 