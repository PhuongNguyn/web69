import { useState } from 'react'
import AppRouter from './routers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AppRouter/>
    </div>
  )
}

export default App
