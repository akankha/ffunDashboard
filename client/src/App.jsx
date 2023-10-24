import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import { Container } from 'react-bootstrap'

import Sidebar from './components/Sidebar'
import Home from './components/Home'

function App() {
  

  return (
    

  <Container className="container-fluid">
      <div className="row">
      <Sidebar/>
        <Home/>
      </div>
  </Container>
 
  
  )
}

export default App
