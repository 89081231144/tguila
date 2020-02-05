import fs from 'fs-extra';
import bundleRenderer from 'vue-server-renderer';
import serverBundle from './dist/vue-ssr-server-bundle.json';
import clientManifest from './dist/vue-ssr-client-manifest.json';
const template = fs.readFileSync('./src/index.template.html', 'utf-8');
const { createBundleRenderer } = bundleRenderer;

export default createBundleRenderer(serverBundle,{
  //set template
  runInNewContext: false,
  template,
  clientManifest
});
