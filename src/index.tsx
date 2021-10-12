import ReactDOM from 'react-dom'
import { BrowserRouter, App } from '@norm/app'
import Layout from './pages/_layout'

const routes = import.meta.globEager('/src/pages/**/*.tsx')

ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <App routes={routes} />
    </Layout>
  </BrowserRouter>,
  document.getElementById('norm')
)
