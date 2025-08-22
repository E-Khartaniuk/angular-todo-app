
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://E-Khartaniuk.github.io/angular-todo-app/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/angular-todo-app"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5039, hash: 'e7fdade4345b501bc2ef5c5db1f60c1580e00d43c0633ffdeb20942320cea9b3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1015, hash: '0d72daaa4677515ca9a4d777d71663809914ba1478cef2a5be79ee3efcdb8c95', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 28117, hash: '2107b82a2ff8d538b5ec48fc212e105199c8d40b5ebe2aaec9d5f0f5595bfc64', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-BVJQD57C.css': {size: 230873, hash: 'YU+im7r2LDs', text: () => import('./assets-chunks/styles-BVJQD57C_css.mjs').then(m => m.default)}
  },
};
