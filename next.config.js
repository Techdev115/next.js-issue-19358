const withSass = require('@zeit/next-sass')

module.exports = withSass({
  env: {
    LANGUAGE: 'en-US',
    MENU_CATEGORY: ['integrations', 'topics'],
    HOME_PAGE_CATEGORIES: [
      'most-popular',
      'newest-integrations'
    ],
    // set false when debugging
    SERVER_HYDRATE: true
  }
})
