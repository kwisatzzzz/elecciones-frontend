import { LayoutDashboard, Map, Flag, Users, FileEdit, CheckCircle, LogOut } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dash' },
  { icon: FileEdit, label: 'Digitalizar Actas', id: 'trans' },
  { icon: CheckCircle, label: 'Validar Actas', id: 'valid' },
  { icon: Map, label: 'Geografía', id: 'geo' },
  { icon: Flag, label: 'Frentes Políticos', id: 'frentes' },
];

export const Sidebar = () => (
  <aside className="w-64 bg-slate-900 min-h-screen text-slate-300 p-4 sticky top-0 flex flex-col hidden md:flex">
    <div className="flex items-center gap-3 mb-10 px-2 py-4 border-b border-slate-800">
      <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">C26</div>
      <span className="font-bold text-white tracking-tight">Cochabamba 2026</span>
    </div>
    
    <nav className="flex-1 space-y-2">
      {menuItems.map((item) => (
        <button key={item.id} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors group text-left">
          <item.icon size={20} className="group-hover:text-red-500 transition-colors" />
          <span className="text-sm font-medium">{item.label}</span>
        </button>
      ))}
    </nav>

    <button className="w-full flex items-center gap-3 px-4 py-3 mt-auto rounded-xl bg-slate-800 text-red-400 hover:bg-red-950 transition-colors">
      <LogOut size={20} />
      <span className="text-sm font-bold">Cerrar Sesión</span>
    </button>
  </aside>
);