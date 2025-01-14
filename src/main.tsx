import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { store } from './app/store.ts'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
