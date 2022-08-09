const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  images: {
    domains: ['gunfunded-avatars.vercel.app']
  }
})
