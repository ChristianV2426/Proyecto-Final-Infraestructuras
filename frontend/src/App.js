import './App.css'
import RootProvider from './providers/RootProvider'
import Main from './Main'

function App() {
  return (
    <RootProvider>
      <Main />
    </RootProvider>
  )
}

export default App
