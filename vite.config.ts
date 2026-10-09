import { defineConfig, Plugin } from 'vite';

function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        let cssContent = '';
        for (const [fileName, file] of Object.entries(ctx.bundle)) {
          if (fileName.endsWith('.css') && file.type === 'asset') {
            cssContent += file.source.toString();
            delete ctx.bundle[fileName];
          }
        }
        if (!cssContent) return html;
        let cleanedHtml = html.replace(
          /<link[^>]*rel=["']stylesheet["'][^>]*href=["'][^"']*\.css["'][^>]*>/gi,
          ''
        );
        return cleanedHtml.replace('</head>', `<style>${cssContent}</style></head>`);
      },
    },
  };
}

export default defineConfig({
  plugins: [inlineCss()],
  build: {
    target: 'es2022',
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
