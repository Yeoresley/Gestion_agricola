
import React, { useState } from 'react';
import { Plus, Search, Trash2, X, Save } from 'lucide-react';

interface ModuleManagerProps {
  title: string;
  items: any[];
  onAdd: (item: any) => void;
  onDelete: (id: string) => void;
  fields: string[];
  schema: Record<string, string | string[]>;
}

const ModuleManager: React.FC<ModuleManagerProps> = ({ title, items, onAdd, onDelete, fields, schema }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const filteredItems = items.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({});
    setIsModalOpen(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">Base de Datos Local Operativa</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm w-full md:w-64"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-emerald-600/20"
          >
            <Plus size={18} />
            Nuevo
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              {fields.map(field => (
                <th key={field} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {field === 'hectareas' ? 'Hectáreas' : field.charAt(0).toUpperCase() + field.slice(1)}
                </th>
              ))}
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Gestión</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                {fields.map(field => (
                  <td key={field} className="px-6 py-4 text-sm text-slate-700">
                    {field === 'estado' ? (
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        item[field] === 'Activo' || item[field] === 'Operativo'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item[field] === 'Inactivo' || item[field] === 'Fuera de Servicio'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item[field]}
                      </span>
                    ) : (
                      field === 'salario' ? `$${item[field]}` : item[field]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => {
                      if(confirm('¿Seguro que desea eliminar este registro?')) onDelete(item.id);
                    }}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredItems.length === 0 && (
          <div className="p-20 text-center text-slate-400">
            <Search size={48} className="mx-auto mb-4 opacity-10" />
            <p>No hay registros disponibles</p>
          </div>
        )}
      </div>

      {/* Modal de Formulario */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h4 className="text-lg font-bold text-slate-800">Añadir a {title}</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {Object.entries(schema).map(([field, type]) => (
                <div key={field}>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{field}</label>
                  {Array.isArray(type) ? (
                    <select 
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                      onChange={(e) => handleInputChange(field, e.target.value)}
                    >
                      <option value="">Seleccionar...</option>
                      {type.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input 
                      type={type as string}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                      placeholder={`Ingrese ${field}...`}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                    />
                  )}
                </div>
              ))}
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleManager;
