
import React from 'react';
import { Calendar, Clock, CheckSquare, AlertTriangle } from 'lucide-react';

const stats = [
  {
    title: 'Compromissos Hoje',
    value: '8',
    icon: Calendar,
    color: 'bg-blue-500',
    change: '+2 em relação a ontem'
  },
  {
    title: 'Reuniões Esta Semana',
    value: '24',
    icon: Clock,
    color: 'bg-green-500',
    change: '+15% vs semana passada'
  },
  {
    title: 'Tarefas Pendentes',
    value: '12',
    icon: CheckSquare,
    color: 'bg-yellow-500',
    change: '3 vencendo hoje'
  },
  {
    title: 'Urgentes',
    value: '3',
    icon: AlertTriangle,
    color: 'bg-red-500',
    change: 'Requer atenção imediata'
  }
];

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
