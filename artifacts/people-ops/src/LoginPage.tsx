import { useState } from 'react'; 
import { useLogin, useRegister, setToken } from '@/lib/springApi'; 
export function LoginPage({ onSuccess }: { onSuccess: () => void }) { 
    const [mode, setMode] = useState<'login' | 'register'>('login'); 
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 
    const loginMutation = useLogin(); 
    const registerMutation = useRegister(); 
    const submit = (e: React.FormEvent) => { e.preventDefault(); setError(''); 
        const mutation = mode === 'login' ? loginMutation : registerMutation; 
        mutation.mutate( { username, password }, { onSuccess: (data) => { setToken(data.token); onSuccess(); }, onError: () => { setError(mode === 'login' ? 'Invalid username or password' : 'Could not create account'); }, } ); }; 
            return ( 
            <div 
            style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                background: '#f4f2ee' 
                }}> 
            <form onSubmit={submit} style={{ 
                width: 320, 
                padding: 24, 
                border: '1px solid #ddd', 
                borderRadius: 12, 
                background: 'white' 
                }}> 
            <h2 style={{ marginBottom: 16 }}>
                {mode === 'login' ? 'Log in' : 'Create an account'}
            </h2> 
            <input 
            value={username} onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username" style={{ 
                display: 'block', 
                width: '100%', 
                marginBottom: 12, 
                padding: 8, 
                boxSizing: 'border-box' }} 
                required 
                /> 
            <input 
            value={password} onChange={(e) => setPassword(e.target.value)} 
            type="password" placeholder="Password" 
            style={{ 
                display: 'block', 
                width: '100%', 
                marginBottom: 12, 
                padding: 8, 
                boxSizing: 'border-box' 
                }} 
                required 
                /> 
            {error && <p style={{ color: 'red', marginBottom: 12, fontSize: 13 }}>{error}</p>} 
            <button type="submit" disabled={loginMutation.isPending || registerMutation.isPending} style={{ width: '100%', padding: 10, marginBottom: 8, cursor: 'pointer' }}> {mode === 'login' ? 'Log in' : 'Sign up'} </button> 
                <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ width: '100%', background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 13 }}> 
                    {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'} </button> 
                    </form> 
                    </div> 
                    ); 
}