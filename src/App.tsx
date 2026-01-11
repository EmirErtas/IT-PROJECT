```javascript
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/pages/dashboard/Dashboard'
import KanbanBoard from '@/pages/kanban/KanbanBoard'
import Pomodoro from '@/pages/pomodoro/Pomodoro'
import ProjectList from '@/pages/projects/ProjectList'
import ProjectDetails from '@/pages/projects/ProjectDetails'
import Analytics from '@/pages/analytics/Analytics'
import TaskForm from '@/pages/tasks/TaskForm'
import Calendar from '@/pages/calendar/Calendar'
import Notes from '@/pages/notes/Notes'
import Profile from '@/pages/profile/Profile'
import Settings from '@/pages/settings/Settings'

// Protected Route Wrapper
const ProtectedRoute = () => {
  const { session } = useAuth()
  if (!session) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background font-sans antialiased text-foreground">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={
                  <Layout> 
                    <Dashboard /> 
                  </Layout>
              } />
              <Route path="/kanban" element={
                  <Layout> 
                    <KanbanBoard /> 
                  </Layout>
              } />
              <Route path="/pomodoro" element={
                  <Layout>
                    <Pomodoro />
                  </Layout>
              } />
              <Route path="/projects" element={
                  <Layout>
                    <ProjectList />
                  </Layout>
              } />
              <Route path="/projects/:id" element={
                  <Layout>
                    <ProjectDetails />
                  </Layout>
              } />
              <Route path="/analytics" element={
                  <Layout>
                    <Analytics />
                  </Layout>
              } />
              <Route path="/tasks/new" element={
                  <Layout> 
                    <TaskForm /> 
                  </Layout>
              } />
              <Route path="/calendar" element={
                  <Layout>
                    <Calendar />
                  </Layout>
              } />
              <Route path="/notes" element={
                  <Layout>
                    <Notes />
                  </Layout>
              } />
              <Route path="/profile" element={
                  <Layout> 
                    <Profile /> 
                  </Layout>
              } />
              <Route path="/settings" element={
                  <Layout>
                    <Settings />
                  </Layout>
              } />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
```
