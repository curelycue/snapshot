import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteComponents from 'unplugin-vue-components/vite';
import visualizer from 'rollup-plugin-visualizer';

export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [
    vue({ reactivityTransform: true }),
    ViteComponents({
      dirs: ['src/components', 'src/plugins'],
      directoryAsNamespace: true
    }),
    visualizer({
      filename: './dist/stats.html',
      template: 'sunburst',
      gzipSize: true
    }),
    () => {
      // create list of plugins from plugin.json files in src/plugins
      fs.writeFileSync(
        'src/plugins/_plugins.json',
        JSON.stringify(
          Object.fromEntries(
            fs.readdirSync('src/plugins', { withFileTypes: true })
              .filter(file => file.isDirectory() && !file.name.startsWith('_'))
              .map(dir => {
                try {
                  return [
                    dir.name,
                    JSON.parse(fs.readFileSync(`src/plugins/${dir.name}/plugin.json`, 'utf-8'))
                  ];
                } catch {
                  return null;
                }
              })
              .filter(plugin => plugin)
          ),
          null,
          2
        )
      )
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    dedupe: ['@popperjs/core']
  },
  optimizeDeps: {
    include: ['color'],
    // @ts-ignore
    allowNodeBuiltins: ['stream']
  }
});
