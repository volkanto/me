import { defineConfig } from 'astro/config';
// Code blocks can scroll independently and must be reachable by keyboard.
function accessibleCodeBlocks() {
  return tree => {
    function walk(node) {
      if (node.type === 'element' && node.tagName === 'pre') {
        node.properties ||= {};
        node.properties.tabIndex = 0;
        node.properties['aria-label'] = 'Code example';
      }
      node.children?.forEach(walk);
    }
    walk(tree);
  };
}
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.SITE_BASE || '/',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: { themes: { light: 'github-light-high-contrast', dark: 'github-dark-high-contrast' } },
    rehypePlugins: [accessibleCodeBlocks],
  },
  devToolbar: { enabled: false },
});
