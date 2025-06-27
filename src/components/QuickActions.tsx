
import React from 'react';
import { Plus, Calendar, Users, FileText, Plane, Mail } from 'lucide-react';

const quickActions = [
  { icon: Calendar, label: 'Nova Reunião', color: 'bg-blue-500 hover:bg-blue-600' },
  { icon: Plus, label: 'Adicionar Tarefa', color: 'bg-green-500 hover:bg-green-600' },
  { icon: Users, label: 'Novo Contato', color: 'bg-purple-500 hover:bg-purple-600' },
  { icon: FileText, label: 'Upload Documento', color: 'bg-orange-500 hover:bg-orange-600' },
  { icon: Plane, label: 'Planejar Viagem', color: 'bg-cyan-500 hover:bg-cyan-600' },
  { icon: Mail, label: 'Enviar Email', color: 'bg-red-500 hover:bg-red-600' },
];

export const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={action.label}
            className={`${action.color} text-white p-4 rounded-lg flex flex-col items-center space-y-2 transition-all duration-200 hover:transform hover:scale-105 hover:shadow-lg`}
          >
            <action.icon className="w-6 h-6" />
            <span className="text-sm font-medium text-center">{action.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-executive-500 to-executive-600 text-white p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Assistente IA</h3>
          <p className="text-sm text-executive-100 mb-3">
            "Precisa de ajuda? Posso organizar sua agenda ou priorizar suas tarefas."
          </p>
          <button className="bg-white text-executive-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
            Perguntar ao Assistente
          </button>
        </div>
      </div>
    </div>
  );
};
