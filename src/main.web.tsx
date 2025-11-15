import { createRoot } from 'react-dom/client'

import App from '../example/App'

// AppRegistry.registerComponent('main', () => App)
createRoot(document.querySelector('#root')!).render(<App />)
