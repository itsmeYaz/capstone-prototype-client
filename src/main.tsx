// @ts-ignore
import ReactDOM from 'react-dom'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Navigation from '@/components/Navigation.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Navigation />
    <App />
  </BrowserRouter>,
)
