const host = 'http://localhost:3000';

// WEBPACK_PROXY_TARGET для разработки в docker: для бекендеров,
// которые хотят проверять работу морды со своей локальной версией, и не хотят помнить/разбираться,
// что нужно что-то менять в proxy.conf.js.
const target = process.env.WEBPACK_PROXY_TARGET || host;

const PROXY_CONFIG = [
  {
    context: [
      "/api/**",
    ],
    target,
    secure: false,
    changeOrigin: true,
    debug: true,
  },
  {
    context: [
      "/card/**",
    ],
    target: 'http://localhost:4200',
    secure: false,
    changeOrigin: true,
    debug: true,
  },
];

module.exports = PROXY_CONFIG;
