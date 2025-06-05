
import { createRoot } from 'react-dom/client'
import App from './App'

const blogs = [
    {
      id: "1",
      author: "Gerhard Berger",
      title: "AI",
      url: "www.aiblogi.com"
    },
    {
      id: "2",
      author: "Kimmo Kiljunen",
      title: "Developping",
      url: "www.deveblogi.com"
    }
  ]

createRoot(document.getElementById('root')).render(
<App blogs={blogs}/>
)
