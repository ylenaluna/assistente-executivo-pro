
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Clock, CheckSquare, Users, FileText, Plane, Settings, BarChart3 } from 'lucide-react';

const navigationItems = [
  { to: '/', icon: BarChart3, label: 'Dashboard', end: true },
  { to: '/calendar', icon: Calendar, label: 'Agenda' },
  { to: '/tasks', icon: CheckSquare, label: 'Tarefas' },
  { to: '/contacts', icon: Users, label: 'Contatos' },
  { to: '/documents', icon: FileText, label: 'Documentos' },
  { to: '/travel', icon: Plane, label: 'Viagens' },
  { to: '/settings', icon: Settings, label: 'Configurações' },
];

export const Sidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-executive-900 to-executive-800 text-white shadow-xl">
      <div className="p-6 border-b border-executive-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Assistente Virtual</h1>
            <p className="text-executive-300 text-sm">Executivo</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'text-executive-300 hover:bg-executive-700 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
