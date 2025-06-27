
import React from 'react';
import { FileText, Download, Share, MoreVertical } from 'lucide-react';

const recentDocs = [
  {
    name: 'Relatório Mensal - Junho 2025',
    type: 'PDF',
    size: '2.3 MB',
    modified: '2 horas atrás',
    icon: '📊'
  },
  {
    name: 'Contrato Fornecedor ABC',
    type: 'DOCX',
    size: '1.8 MB',
    modified: '1 dia atrás',
    icon: '📋'
  },
  {
    name: 'Apresentação Projeto X',
    type: 'PPTX',
    size: '5.2 MB',
    modified: '3 dias atrás',
    icon: '📈'
  },
  {
    name: 'Orçamento 2025',
    type: 'XLSX',
    size: '892 KB',
    modified: '1 semana atrás',
    icon: '💰'
  }
];

export const RecentDocuments = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Documentos Recentes</h2>
        <button className="text-executive-600 hover:text-executive-700 text-sm font-medium">
          Ver Todos
        </button>
      </div>
      
      <div className="space-y-4">
        {recentDocs.map((doc, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
          >
            <div className="text-2xl">{doc.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{doc.type}</span>
                <span>•</span>
                <span>{doc.size}</span>
                <span>•</span>
                <span>{doc.modified}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <Download className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <Share className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
