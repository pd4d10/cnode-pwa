const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 301
  res.setHeader('Location', 'https://cnode.surge.sh')
  res.end()
})

server.listen(3000)
