
import React, { useState, useEffect } from 'react';
import { ViewType, AppState, Crop, InputItem, Employee } from './types';
import { dbService } from './dbService';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ModuleManager from './components/ModuleManager';
import Reports from './components/Reports';
import Login from './components/Login';

const App: React.FC = () => {
  const [dbReady, setDbReady] = useState(false);
  const [state, setState] = useState<AppState | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.DASHBOARD);

  // Inicializar SQLite
  useEffect(() => {
    const init = async () => {
      await dbService.initSQLite();
      syncFromSQLite();
      setDbReady(true);
    };
    init();
  }, []);

  const syncFromSQLite = () => {
    const crops = dbService.query("SELECT * FROM cultivos");
    const inputs = dbService.query("SELECT * FROM insumos");
    const employees = dbService.query("SELECT * FROM personal");
    
    setState({
      user: { name: 'Administrador', role: 'Jefe de Producción' },
      crops: crops as any,
      inputs: inputs as any,
      employees: employees as any,
      equipment: [],
      irrigation: [],
      maintenance: []
    });
  };

  const handleAddCrop = (item: Partial<Crop>) => {
    const id = dbService.generateId();
    dbService.run(
      "INSERT INTO cultivos (id, nombre, variedad, fecha, hectareas, estado) VALUES (?, ?, ?, ?, ?, ?)",
      [id, item.nombre, item.variedad, new Date().toISOString(), item.hectareas, item.estado]
    );
    syncFromSQLite();
  };

  const handleDeleteCrop = (id: string) => {
    dbService.run("DELETE FROM cultivos WHERE id = ?", [id]);
    syncFromSQLite();
  };

  const handleLogin = (name: string, role: string) => {
    if (state) setState({ ...state, user: { name, role } });
  };

  if (!dbReady || !state) return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-bold">Cargando Motor SQLite3...</h2>
      <p className="text-slate-400 text-sm mt-2">Versión Portable para Windows 11</p>
    </div>
  );

  if (!state.user) return <Login onLogin={handleLogin} />;

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={state.user} currentView={currentView} onLogout={() => setState({...state, user: null})} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {currentView === ViewType.DASHBOARD && <Dashboard state={state} />}
          
          {currentView === ViewType.CULTIVOS && (
            <ModuleManager 
              title="Base de Datos: Cultivos" 
              items={state.crops} 
              onAdd={handleAddCrop}
              onDelete={handleDeleteCrop}
              fields={['nombre', 'variedad', 'hectareas', 'estado']}
              schema={{
                nombre: 'text',
                variedad: 'text',
                hectareas: 'number',
                estado: ['Activo', 'Cosechado', 'En proceso']
              }}
            />
          )}

          {currentView === ViewType.INSUMOS && (
            <ModuleManager 
              title="Base de Datos: Insumos" 
              items={state.inputs} 
              onAdd={(item) => {
                dbService.run("INSERT INTO insumos (id, nombre, tipo, cantidad, unidad) VALUES (?,?,?,?,?)", 
                [dbService.generateId(), item.nombre, item.tipo, item.cantidad, item.unidad]);
                syncFromSQLite();
              }}
              onDelete={(id) => {
                dbService.run("DELETE FROM insumos WHERE id = ?", [id]);
                syncFromSQLite();
              }}
              fields={['nombre', 'tipo', 'cantidad', 'unidad']}
              schema={{
                nombre: 'text',
                tipo: ['Fertilizante', 'Pesticida', 'Semilla'],
                cantidad: 'number',
                unidad: 'text'
              }}
            />
          )}

          {currentView === ViewType.REPORTES && <Reports state={state} />}
        </main>
      </div>
    </div>
  );
};

export default App;
