import { defineAsyncComponent } from 'vue';
import plugins from '@/plugins/_plugins.json';

const usePlugin = async (plugin: string) =>
  (await import(`../plugins/${plugin}/index.ts`)).default();


const getComponent = (plugin: string, component: string) => {
  return defineAsyncComponent(() =>
    import(`../plugins/${plugin}/components/${component}.vue`)
  );
}

const getInfo = (plugin) => {
  return plugins[plugin];
}

export function usePlugins() {
  return {
    plugins,
    usePlugin,
    getComponent,
    getInfo
  }
}