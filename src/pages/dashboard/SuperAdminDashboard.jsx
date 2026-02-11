import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Bell, TrendingUp, Briefcase, Activity, CheckCircle } from 'lucide-react';

const SuperAdminDashboard = () => {
  const [userData, setUserData] = useState({ name: "Super Admin", company: "CRM Pro" });

  const stats = [
    { id: 1, label: 'Total Users', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 2, label: 'Active Projects', value: '43', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 3, label: 'System Health', value: '99.9%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 4, label: 'New Requests', value: '12', icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {userData.name} 👋</h1>
        <p className="text-gray-500">System overview for {userData.company}.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon size={20} />
            </div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4 text-lg">Recent Updates</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-indigo-600" />
                <span className="text-sm text-gray-700">Database optimization completed successfully.</span>
              </div>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;