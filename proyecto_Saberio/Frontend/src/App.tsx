import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  const route = window.location.pathname

  if (route === '/login') return <LoginPage />
  if (route === '/registro') return <RegisterPage />
  return <HomePage />
}

export default App