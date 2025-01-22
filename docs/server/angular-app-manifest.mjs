
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/<PaintingProEdition>/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/<PaintingProEdition>/login",
    "route": "/<PaintingProEdition>"
  },
  {
    "renderMode": 2,
    "route": "/<PaintingProEdition>/login"
  },
  {
    "renderMode": 2,
    "route": "/<PaintingProEdition>/dashboard"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23668, hash: '5abaefaa36074e69747cf312c3e4c6f1b73c9c8175b41931687a6281c9955f3f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17173, hash: 'ef00989b8249daff0d815babaaa2cbb04b990237616af4011962c24ad6c5367d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 24516, hash: 'd4ca062eede01b14eecacd36cd2fe04425a8c24fe2bbfddd18fa0da63a33ef78', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 24516, hash: 'd4ca062eede01b14eecacd36cd2fe04425a8c24fe2bbfddd18fa0da63a33ef78', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'styles-QBODS2WJ.css': {size: 7119, hash: 'keE6TmlJVEY', text: () => import('./assets-chunks/styles-QBODS2WJ_css.mjs').then(m => m.default)}
  },
};
