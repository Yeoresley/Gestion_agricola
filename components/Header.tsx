
import React from 'react';
import { ViewType } from '../types';
import { LogOut, Bell, UserCircle } from 'lucide-react';

interface HeaderProps {
  user: { name: string; role: string };
  currentView: ViewType;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, currentView, onLogout }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm flex-shrink-0">
      <h2 className="text-lg font-semibold text-slate-800 capitalize">
        {currentView.toLowerCase().replace('_', ' ')}
      </h2>
      
      <div className="flex items-center gap-6">
        <button className="text-slate-500 hover:text-emerald-600 relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">{user.name}</p>
            <p className="text-xs text-slate-500">{user.role}</p>
          </div>
          <UserCircle size={32} className="text-slate-400" />
          <button 
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
