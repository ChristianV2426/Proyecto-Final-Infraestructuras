import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Main from './Main'
import Projects from './projects/Projects'
import Tasks from './tasks/Tasks'

const RouterRoot = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/" element={<Navigate replace to="/projects" />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Tasks />} />
      </Route>
    </Routes>
  </Router>
)

export default RouterRoot
