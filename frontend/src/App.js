import './App.css'
import RootProvider from './providers/RootProvider'
import RouterRoot from './RouterRoot'

function App() {
  return (
    <RootProvider>
      <RouterRoot />
    </RootProvider>
  )
}

export default App
