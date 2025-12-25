
import React from 'react';
import { AppState } from '../types';
import { 
  TrendingUp, 
  Package, 
  Users, 
  AlertTriangle,
  Droplet,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardProps {
  state: AppState;
}

const Dashboard: React.FC<DashboardProps> = ({ state }) => {
  const totalHa = state.crops.reduce((acc, curr) => acc + curr.hectareas, 0);
  const activeCrops = state.crops.filter(c => c.estado === 'Activo').length;
  const lowStock = state.inputs.filter(i => i.cantidad < 500).length;
  
  const chartData = state.crops.map(c => ({
    name: c.nombre,
    ha: c.hectareas,
    rend: c.rendimientoEsperado
  }));

  const pieData = [
    { name: 'Activos', value: state.crops.filter(c => c.estado === 'Activo').length },
    { name: 'En Proceso', value: state.crops.filter(c => c.estado === 'En proceso').length },
    { name: 'Cosechados', value: state.crops.filter(c => c.estado === 'Cosechado').length },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#3b82f6'];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<TrendingUp className="text-emerald-600" />} 
          label="Hectáreas Totales" 
          value={totalHa.toString()} 
          subtext="+5.4% vs mes anterior" 
        />
        <StatCard 
          icon={<Droplet className="text-blue-600" />} 
          label="Consumo Riego" 
          value="450 m³" 
          subtext="Lote Norte activo" 
        />
        <StatCard 
          icon={<Package className={`text-orange-600`} />} 
          label="Insumos Bajos" 
          value={lowStock.toString()} 
          subtext="Requerir stock" 
        />
        <StatCard 
          icon={<Users className="text-indigo-600" />} 
          label="Personal Activo" 
          value={state.employees.length.toString()} 
          subtext="Turno matutino" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Rendimiento Estimado por Cultivo</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rend" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-6 self-start">Estado de Cultivos</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full mt-4 space-y-2">
            {pieData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span>{item.name}</span>
                </div>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Maintenance Alert */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-orange-800">
          <AlertTriangle />
          <div>
            <p className="font-semibold">Mantenimiento Pendiente</p>
            <p className="text-sm opacity-90">La Sembradora Pro requiere revisión técnica programada para mañana.</p>
          </div>
        </div>
        <button className="text-orange-900 font-semibold text-sm flex items-center gap-1 hover:underline">
          Ver detalles <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; subtext: string }> = ({ 
  icon, label, value, subtext 
}) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
    </div>
    <p className="text-sm text-slate-500 font-medium">{label}</p>
    <p className="text-2xl font-bold text-slate-900 my-1">{value}</p>
    <p className="text-xs text-slate-400">{subtext}</p>
  </div>
);

export default Dashboard;
