
import React, { useState } from 'react';
import { Lock, User, Leaf } from 'lucide-react';

interface LoginProps {
  onLogin: (name: string, role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin('Administrador', 'Jefe de Unidad');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-3xl mb-6 shadow-xl shadow-emerald-500/20">
            <Leaf className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Bienvenido de nuevo</h1>
          <p className="text-slate-400">Accede a la Unidad Agrícola Delfín Castillo</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-2xl space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Usuario</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="nombre.apellido"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500 border-slate-300" />
              <span className="text-slate-500">Recordarme</span>
            </label>
            <a href="#" className="text-emerald-600 font-semibold hover:underline">¿Olvidaste tu clave?</a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? 'Autenticando...' : 'Iniciar Sesión'}
          </button>

          <div className="text-center pt-4 border-t border-slate-100">
            <p className="text-slate-500 text-sm">
              ¿No tienes cuenta? <a href="#" className="text-emerald-600 font-bold hover:underline">Regístrate aquí</a>
            </p>
          </div>
        </form>

        <p className="text-center text-slate-500 text-xs mt-10">
          © 2024 Unidad Agrícola Delfín Pedro Castillo. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;
