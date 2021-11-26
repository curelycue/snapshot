import { defineAsyncComponent } from 'vue';
import plugins from '@/plugins/_plugins.json';

const usePlugin = async (plugin: string) =>
  (await import(`../plugins/${plugin}/index.ts`)).default();


const getPluginComponent = (plugin: string, component: string) => {
  return defineAsyncComponent(() =>
    import(`../plugins/${plugin}/components/${component}.vue`)
  );
}

const getPluginInfo = (plugin) => {
  return plugins[plugin];
}

export function usePlugins() {
  return {
    plugins,
    usePlugin,
    getPluginComponent,
    getPluginInfo
  }
}