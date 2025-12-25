
import React from 'react';
import { ViewType } from '../types';
import { 
  LayoutDashboard, 
  Sprout, 
  Droplets, 
  Users, 
  Wrench, 
  Truck, 
  BarChart3, 
  Package 
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: ViewType.DASHBOARD, label: 'Panel Principal', icon: LayoutDashboard },
    { id: ViewType.CULTIVOS, label: 'Cultivos', icon: Sprout },
    { id: ViewType.INSUMOS, label: 'Insumos', icon: Package },
    { id: ViewType.PERSONAL, label: 'Personal', icon: Users },
    { id: ViewType.EQUIPOS, label: 'Equipos', icon: Truck },
    { id: ViewType.RIEGO, label: 'Sistemas Riego', icon: Droplets },
    { id: ViewType.REPORTES, label: 'Reportes', icon: BarChart3 },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          D
        </div>
        <span className="font-bold text-white leading-tight">Delfín Castillo Agric.</span>
      </div>
      
      <nav className="flex-1 mt-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id 
                ? 'bg-emerald-600 text-white' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-6 text-xs text-slate-500 text-center border-t border-slate-800">
        v1.2.0 Management System
      </div>
    </aside>
  );
};

export default Sidebar;
