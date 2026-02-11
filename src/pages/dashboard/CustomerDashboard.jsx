import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Package, 
  Clock, 
  CheckCircle,
  TrendingUp,
  DollarSign,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';

/**
 * Customer Dashboard
 * Shows customer-specific metrics and quick actions
 */
const CustomerDashboard = () => {
  const { user } = useAuth();

  // Sample stats data (would come from API in production)
  const stats = [
    {
      title: 'Total Orders',
      value: '24',
      change: '+12%',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Configurations',
      value: '8',
      change: '+5%',
      icon: Package,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Pending Approval',
      value: '3',
      change: '-2%',
      icon: Clock,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Completed',
      value: '21',
      change: '+18%',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      product: 'Custom Cabinet Configuration',
      status: 'Processing',
      date: '2024-02-08',
      amount: '$2,450',
    },
    {
      id: 'ORD-002',
      product: 'Premium Desk Setup',
      status: 'Completed',
      date: '2024-02-05',
      amount: '$1,890',
    },
    {
      id: 'ORD-003',
      product: 'Office Chair - Executive',
      status: 'Pending',
      date: '2024-02-03',
      amount: '$750',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-blue-100">
              Here's what's happening with your orders today
            </p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-16 h-16 text-white/30" />
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card hover glass className="relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </h3>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Card glass>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <Link to="/orders">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <motion.div
                  key={order.id}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{order.product}</p>
                      <p className="text-sm text-gray-500">{order.id} • {order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{order.amount}</p>
                    <span className={`
                      inline-block px-2 py-1 text-xs font-medium rounded-full
                      ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : ''}
                      ${order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : ''}
                      ${order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : ''}
                    `}>
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card glass>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="space-y-3">
              <Link to="/configurator">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold mb-1">New Configuration</p>
                      <p className="text-sm text-blue-100">Create custom product</p>
                    </div>
                    <Sparkles className="w-8 h-8" />
                  </div>
                </motion.div>
              </Link>

              <Link to="/orders">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">View Orders</p>
                      <p className="text-sm text-gray-500">Track your orders</p>
                    </div>
                    <ShoppingCart className="w-8 h-8 text-gray-400" />
                  </div>
                </motion.div>
              </Link>

              <Link to="/products">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-400 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Browse Products</p>
                      <p className="text-sm text-gray-500">Explore catalog</p>
                    </div>
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                </motion.div>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerDashboard;