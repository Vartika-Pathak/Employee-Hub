import type { ReactNode } from 'react'; 
import { useState } from 'react'; 
import { QueryClient, QueryClientProvider } 
from '@tanstack/react-query'; 
import { ErrorBoundary } from '@/components/error-boundary'; 
import { Toaster } from '@/components/ui/toaster'; 
import { TooltipProvider } from '@/components/ui/tooltip'; 
import { PeopleShell } from '@/components/people-shell'; 
import NotFound from '@/pages/not-found'; 
import { Attendance, Employees, Overview, Profile, Reports, Tasks } from '@/pages/people-ops'; 
import { LoginPage } from '@/LoginPage'; 
import { getToken, clearToken } from '@/lib/springApi'; 
import { Route, Switch, Router as WouterRouter, useLocation, } from 'wouter'; 

const queryClient = new QueryClient(); function Router() { 
  return ( <RoutedErrorBoundary> <Switch> <Route path="/" component={Overview} /> 
  <Route path="/employees" component={Employees} /> 
  <Route path="/employees/:id" component={Profile} /> 
  <Route path="/attendance" component={Attendance} /> 
  <Route path="/reports" component={Reports} /> 
  <Route path="/tasks" component={Tasks} /> 
  <Route component={NotFound} /> </Switch> 
  </RoutedErrorBoundary> ); } 
  
  function RoutedErrorBoundary({ children }: { children: ReactNode }) { 
    const [location] = useLocation(); 
    return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>; 
  } 
  function App() { const [loggedIn, setLoggedIn] = useState(getToken() !== null); 
    const logout = () => { clearToken(); setLoggedIn(false); }; 
    return ( <QueryClientProvider client={queryClient}> {loggedIn ? <TooltipProvider> <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}> <PeopleShell><Router /></PeopleShell> </WouterRouter> <button onClick={logout} style={{ position: 'fixed', bottom: 16, right: 16, padding: '8px 14px', borderRadius: 8, background: '#222', color: 'white', border: 'none', cursor: 'pointer', fontSize: 12, zIndex: 100 }} > Log out </button> <Toaster /> </TooltipProvider> : <LoginPage onSuccess={() => setLoggedIn(true)} />} </QueryClientProvider> ); 
  }

  export default App;