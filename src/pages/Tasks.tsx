import React, { useState } from 'react';
import { CheckSquare, Plus, Clock, AlertTriangle, Filter } from 'lucide-react';
import { N8nIntegration } from '@/components/N8nIntegration';

const Tasks = () => {
  const [filter, setFilter] = useState('all');
  
  const tasks = [
    {
      id: 1,
      title: 'Revisar proposta comercial ClienteX',
      description: 'Analisar valores e condições do contrato',
      priority: 'high',
      dueDate: '2025-06-27',
      status: 'pending',
      category: 'Comercial'
    },
    {
      id: 2,
      title: 'Preparar apresentação Q2',
      description: 'Consolidar resultados do segundo trimestre',
      priority: 'high',
      dueDate: '2025-06-28',
      status: 'in-progress',
      category: 'Estratégia'
    },
    {
      id: 3,
      title: 'Reunião com RH sobre contratações',
      description: 'Definir perfis para novas vagas',
      priority: 'medium',
      dueDate: '2025-06-30',
      status: 'pending',
      category: 'RH'
    },
    {
      id: 4,
      title: 'Aprovar orçamento marketing',
      description: 'Revisar campanhas para Q3',
      priority: 'medium',
      dueDate: '2025-07-02',
      status: 'completed',
      category: 'Marketing'
    },
    {
      id: 5,
      title: 'Call com investidores',
      description: 'Apresentar números do mês',
      priority: 'high',
      dueDate: '2025-06-29',
      status: 'pending',
      category: 'Financeiro'
    }
  ];
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'high') return task.priority === 'high';
    return true;
  });
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <CheckSquare className="w-8 h-8 text-executive-600" />
          <h1 className="text-3xl font-bold text-gray-900">Tarefas</h1>
        </div>
        <button className="bg-executive-600 hover:bg-executive-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Nova Tarefa</span>
        </button>
      </div>

      {/* n8n Integration Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <N8nIntegration
          title="Lista de Tarefas"
          data={{
            tasks: filteredTasks,
            filter: filter,
            totalTasks: tasks.length,
            pendingTasks: tasks.filter(t => t.status === 'pending').length,
            completedTasks: tasks.filter(t => t.status === 'completed').length,
            highPriorityTasks: tasks.filter(t => t.priority === 'high').length,
          }}
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filtros:</span>
        </div>
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'Todas' },
            { key: 'pending', label: 'Pendentes' },
            { key: 'completed', label: 'Concluídas' },
            { key: 'high', label: 'Alta Prioridade' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === key 
                  ? 'bg-executive-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status === 'completed' ? 'Concluída' : 
                     task.status === 'in-progress' ? 'Em Andamento' : 'Pendente'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{task.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Vencimento: {new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">{task.category}</span>
                  </div>
                  {task.priority === 'high' && new Date(task.dueDate) <= new Date() && (
                    <div className="flex items-center space-x-1 text-red-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Urgente</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                  Editar
                </button>
                <button className="px-4 py-2 bg-executive-100 hover:bg-executive-200 text-executive-700 rounded-lg text-sm font-medium transition-colors">
                  {task.status === 'completed' ? 'Reabrir' : 'Concluir'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma tarefa encontrada</h3>
          <p className="text-gray-500">Tente ajustar os filtros ou adicione uma nova tarefa.</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
