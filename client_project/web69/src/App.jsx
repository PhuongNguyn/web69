import { useState } from 'react'
import AppRouter from './routers'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AppRouter/>
      <Toaster />
    </div>
  )
}

export default App
