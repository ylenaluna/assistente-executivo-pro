
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  const events = {
    15: [{ time: '09:00', title: 'Reunião Diretoria' }],
    20: [{ time: '14:00', title: 'Almoço Cliente' }],
    25: [{ time: '10:00', title: 'Apresentação' }, { time: '16:00', title: 'Call Investidores' }],
    27: [{ time: '09:00', title: 'Reunião Diretoria' }, { time: '14:00', title: 'Almoço de Negócios' }]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <CalendarIcon className="w-8 h-8 text-executive-600" />
          <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
        </div>
        <button className="bg-executive-600 hover:bg-executive-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Novo Compromisso</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 bg-executive-100 text-executive-700 rounded-lg hover:bg-executive-200 transition-colors"
              >
                Hoje
              </button>
              <button 
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-7 gap-4 mb-4">
            {weekDays.map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="h-24"></div>
            ))}
            
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const hasEvents = events[day];
              const isToday = day === new Date().getDate() && 
                             currentDate.getMonth() === new Date().getMonth() && 
                             currentDate.getFullYear() === new Date().getFullYear();
              
              return (
                <div
                  key={day}
                  className={`h-24 border rounded-lg p-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isToday 
                      ? 'bg-executive-100 border-executive-500' 
                      : hasEvents 
                        ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className={`font-semibold ${isToday ? 'text-executive-700' : 'text-gray-900'}`}>
                    {day}
                  </div>
                  {hasEvents && (
                    <div className="mt-1 space-y-1">
                      {hasEvents.slice(0, 2).map((event, idx) => (
                        <div key={idx} className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded truncate">
                          {event.time} {event.title}
                        </div>
                      ))}
                      {hasEvents.length > 2 && (
                        <div className="text-xs text-gray-600">+{hasEvents.length - 2} mais</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
