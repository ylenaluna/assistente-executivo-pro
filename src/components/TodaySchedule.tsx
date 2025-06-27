
import React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';

const todayEvents = [
  {
    time: '09:00',
    title: 'Reunião Diretoria',
    location: 'Sala de Reuniões A',
    attendees: 8,
    type: 'meeting',
    color: 'border-l-blue-500 bg-blue-50'
  },
  {
    time: '10:30',
    title: 'Call com Investidores',
    location: 'Zoom',
    attendees: 5,
    type: 'call',
    color: 'border-l-green-500 bg-green-50'
  },
  {
    time: '14:00',
    title: 'Almoço de Negócios',
    location: 'Restaurante Central',
    attendees: 3,
    type: 'meal',
    color: 'border-l-yellow-500 bg-yellow-50'
  },
  {
    time: '16:00',
    title: 'Apresentação Projeto X',
    location: 'Auditório Principal',
    attendees: 25,
    type: 'presentation',
    color: 'border-l-purple-500 bg-purple-50'
  },
  {
    time: '18:30',
    title: 'Evento Networking',
    location: 'Hotel Copacabana',
    attendees: 50,
    type: 'event',
    color: 'border-l-gold-500 bg-gold-50'
  }
];

export const TodaySchedule = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Agenda de Hoje</h2>
        <span className="text-sm text-gray-500">27 de Junho, 2025</span>
      </div>
      
      <div className="space-y-4">
        {todayEvents.map((event, index) => (
          <div
            key={index}
            className={`border-l-4 ${event.color} p-4 rounded-r-lg hover:shadow-md transition-shadow duration-200`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">{event.time}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{event.attendees} pessoas</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors">
                  Editar
                </button>
                <button className="text-xs bg-executive-100 hover:bg-executive-200 text-executive-700 px-3 py-1 rounded-full transition-colors">
                  Detalhes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full bg-executive-600 hover:bg-executive-700 text-white py-3 rounded-lg font-medium transition-colors duration-200">
          Ver Agenda Completa
        </button>
      </div>
    </div>
  );
};
