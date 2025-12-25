
import React, { useState } from 'react';
import { AppState } from '../types';
import { dbService } from '../dbService';
import { FileText, Download, BarChart2, Database, ShieldCheck, Save } from 'lucide-react';

interface ReportsProps { state: AppState; }

const Reports: React.FC<ReportsProps> = ({ state }) => {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Consola de Administración</h3>
          <p className="text-sm text-slate-500">Gestión de base de datos física SQLite3.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => dbService.downloadSQLiteFile()}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-sm"
          >
            <Save size={18} />
            Descargar Archivo .sqlite
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg text-sm"
          >
            <Download size={18} />
            Imprimir Reporte PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportSummary icon={<Database className="text-blue-500"/>} label="Motor DB" value="SQLite 3.x WASM" />
        <ReportSummary icon={<ShieldCheck className="text-emerald-500"/>} label="Estado" value="Producción OK" />
        <ReportSummary icon={<BarChart2 className="text-purple-500"/>} label="Transacciones" value="Persistentes" />
        <ReportSummary icon={<FileText className="text-orange-500"/>} label="Ubicación" value="Memoria Local" />
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <h4 className="text-lg font-bold text-slate-800 mb-4">Información de Portabilidad</h4>
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>Esta aplicación está diseñada para ser <strong>100% portable</strong> en Windows 11. No requiere instalación de MySQL, PostgreSQL ni ningún otro gestor.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Los datos se guardan automáticamente en el perfil de usuario de tu navegador.</li>
            <li>Si deseas mover los datos a otra PC, usa el botón <strong>"Descargar Archivo .sqlite"</strong>.</li>
            <li>Puedes abrir este archivo descargado con herramientas como <em>DB Browser for SQLite</em> en cualquier Windows.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const ReportSummary: React.FC<{icon: any, label: string, value: string}> = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="mb-4">{icon}</div>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-lg font-bold text-slate-800">{value}</p>
  </div>
);

export default Reports;
