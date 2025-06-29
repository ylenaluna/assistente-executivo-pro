
import React from 'react';
import { DashboardStats } from '../components/DashboardStats';
import { TodaySchedule } from '../components/TodaySchedule';
import { QuickActions } from '../components/QuickActions';
import { RecentDocuments } from '../components/RecentDocuments';
import { N8nIntegration } from '@/components/N8nIntegration';

const Dashboard = () => {
  const dashboardData = {
    totalTasks: 12,
    completedTasks: 5,
    pendingTasks: 7,
    upcomingMeetings: 3,
    documentsCount: 8,
    currentTime: new Date().toISOString(),
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Bem-vindo de volta! Aqui está um resumo do seu dia.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Hoje</p>
          <p className="text-lg font-semibold text-gray-900">27 de Junho, 2025</p>
          <p className="text-sm text-gray-500">Quinta-feira</p>
        </div>
      </div>

      {/* n8n Integration Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <N8nIntegration
          title="Dashboard Summary"
          data={dashboardData}
        />
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TodaySchedule />
        </div>
        <div className="space-y-8">
          <QuickActions />
          <RecentDocuments />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
