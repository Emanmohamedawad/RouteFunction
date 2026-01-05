// postcss.config.js
module.exports = {
  plugins: {
    // tailwind فقط إن كنت تستخدمين Tailwind
    "tailwindcss": {},
    "postcss-preset-env": {
      stage: 1,
      features: {
        "nesting-rules": true
      }
    },
    // cssnano يقلل ويسمح بإزالة التعليقات البيضاء في وضع production
    ...(process.env.NODE_ENV === "production" ? { "cssnano": { preset: ["default", { discardComments: { removeAll: true } }] } } : {})
  }
};
