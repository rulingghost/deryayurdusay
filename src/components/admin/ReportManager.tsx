'use client';
import { useMemo } from 'react';
import { 
  TrendingUp, Users, Calendar, DollarSign, 
  CheckCircle, XCircle, Clock, Star, 
  BarChart3, PieChart, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Appointment {
  id: number;
  customer_name: string;
  service_name: string;
  appointment_date: string;
  status: string;
  duration: number;
}

interface Service {
  id: number;
  name: string;
  price: string;
}

interface ReportManagerProps {
  appointments: Appointment[];
  services: Service[];
}

export default function ReportManager({ appointments, services }: ReportManagerProps) {
  const stats = useMemo(() => {
    const total = appointments.length;
    const confirmed = appointments.filter(a => a.status === 'confirmed').length;
    const pending = appointments.filter(a => a.status === 'pending').length;
    const cancelled = appointments.filter(a => a.status === 'cancelled').length;
    
    // Revenue calc (heuristic: extract number from price string)
    const totalRevenue = appointments
      .filter(a => a.status === 'confirmed')
      .reduce((acc, app) => {
        const service = services.find(s => s.name === app.service_name);
        if (!service) return acc;
        const priceValue = parseInt(service.price.replace(/[^\d]/g, '')) || 0;
        return acc + priceValue;
      }, 0);

    // Service popularity
    const serviceCounts: Record<string, number> = {};
    appointments.forEach(app => {
      if (app.service_name === 'MOLA') return;
      serviceCounts[app.service_name] = (serviceCounts[app.service_name] || 0) + 1;
    });
    
    const popularServices = Object.entries(serviceCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Monthly data
    const monthlyData: Record<string, number> = {};
    appointments.forEach(app => {
      const month = app.appointment_date.substring(0, 7); // YYYY-MM
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    return {
      total,
      confirmed,
      pending,
      cancelled,
      totalRevenue,
      popularServices,
      monthlyData: Object.entries(monthlyData).sort().slice(-6)
    };
  }, [appointments, services]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* KPI Cards */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={item} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-5">
           <div className="p-4 bg-primary/10 rounded-2xl text-primary"><Calendar size={24} /></div>
           <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Toplam Randevu</p>
              <h4 className="text-2xl font-black">{stats.total}</h4>
           </div>
        </motion.div>
        
        <motion.div variants={item} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-5">
           <div className="p-4 bg-green-500/10 rounded-2xl text-green-500"><TrendingUp size={24} /></div>
           <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Tahmini Ciro</p>
              <h4 className="text-2xl font-black">{stats.totalRevenue.toLocaleString('tr-TR')} ₺</h4>
           </div>
        </motion.div>

        <motion.div variants={item} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-5">
           <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500"><CheckCircle size={24} /></div>
           <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Tamamlanan</p>
              <h4 className="text-2xl font-black">{stats.confirmed}</h4>
           </div>
        </motion.div>

        <motion.div variants={item} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-5">
           <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-500"><Clock size={24} /></div>
           <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Bekleyen</p>
              <h4 className="text-2xl font-black">{stats.pending}</h4>
           </div>
        </motion.div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Popular Services */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100"
        >
           <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <Star className="text-yellow-500" size={20} /> En Popüler İşlemler
           </h3>
           <div className="space-y-6">
              {stats.popularServices.map(([name, count], i) => (
                <div key={name} className="space-y-2">
                   <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-gray-700">{name}</span>
                      <span className="text-primary">{count} Randevu</span>
                   </div>
                   <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.total > 0 ? (count / stats.total) * 100 : 0}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-primary"
                      />
                   </div>
                </div>
              ))}
           </div>
        </motion.div>

        {/* Status Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100"
        >
           <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <PieChart className="text-blue-500" size={20} /> Randevu Durumları
           </h3>
           <div className="flex flex-col gap-4 mt-8">
              {[
                { label: 'Onaylandı', count: stats.confirmed, color: 'bg-green-500', text: 'text-green-500' },
                { label: 'Bekliyor', count: stats.pending, color: 'bg-orange-500', text: 'text-orange-500' },
                { label: 'İptal Edildi', count: stats.cancelled, color: 'bg-red-500', text: 'text-red-500' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                   <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${s.color}`}></div>
                      <span className="font-bold text-gray-700">{s.label}</span>
                   </div>
                   <span className={`font-black ${s.text}`}>{s.count}</span>
                </div>
              ))}
           </div>
           
           <div className="mt-10 p-6 bg-primary/5 rounded-3xl border border-primary/10">
              <p className="text-xs font-bold text-primary text-center italic leading-relaxed">
                "Onaylanmış randevuların oranı: %{Math.round((stats.confirmed / (stats.total || 1)) * 100)}"
              </p>
           </div>
        </motion.div>

        {/* Growth Trend */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100"
        >
           <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <BarChart3 className="text-purple-500" size={20} /> Aylık Trend
           </h3>
           <div className="h-[250px] flex items-end justify-around gap-2 pt-10">
              {stats.monthlyData.map(([month, count], i) => {
                const max = Math.max(...stats.monthlyData.map(d => d[1]), 1);
                return (
                  <div key={month} className="flex flex-col items-center gap-3 flex-1">
                     <div className="relative w-full flex flex-col items-center group">
                        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded font-bold">
                           {count}
                        </div>
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${(count / max) * 180}px` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="w-full max-w-[40px] bg-gradient-to-t from-primary to-primary-light rounded-t-xl"
                        />
                     </div>
                     <span className="text-[10px] font-black text-gray-400 rotate-45 mt-4">{month}</span>
                  </div>
                );
              })}
           </div>
        </motion.div>
      </div>

      {/* Recent Activity Mini Log */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100"
      >
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-xl font-black flex items-center gap-2">
              <Activity className="text-red-500" size={20} /> Son İşlemler
           </h3>
           <span className="text-xs font-black text-gray-400 uppercase tracking-widest hidden md:block">Son 10 Kayıt</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
           {appointments.slice(0, 10).map((app, i) => (
             <div key={app.id} className="p-4 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col justify-between h-32">
                <div>
                   <h4 className="font-black text-xs truncate">{app.customer_name}</h4>
                   <p className="text-[9px] font-bold text-primary mt-1">{app.service_name}</p>
                </div>
                <div className="flex justify-between items-end">
                   <div className="text-[8px] font-black text-gray-400 italic">{app.appointment_date}</div>
                   <div className={`w-2 h-2 rounded-full ${app.status === 'confirmed' ? 'bg-green-500' : app.status === 'cancelled' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                </div>
             </div>
           ))}
        </div>
      </motion.div>
    </div>
  );
}
