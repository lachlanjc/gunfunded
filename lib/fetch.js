import fetch from 'isomorphic-unfetch'

const origin = req => {
  if (!req) return ''
  if (req.headers['x-now-deployment-url']) {
    return `https://${req.headers['x-now-deployment-url']}`
  }
  return `http://${req.headers.host}`
}

export default (req, path) =>
  fetch(`${origin(req)}/api${path}`).then(res => res.json())
