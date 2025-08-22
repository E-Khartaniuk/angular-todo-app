
export default {
  basePath: 'https://E-Khartaniuk.github.io/angular-todo-app',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
