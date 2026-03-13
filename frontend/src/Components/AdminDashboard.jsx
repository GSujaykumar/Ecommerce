import React, { useState, useEffect, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiPackage, FiUsers, FiDollarSign, FiShoppingCart,
    FiTrendingUp, FiAlertCircle, FiCheckCircle, FiXCircle,
    FiPlus, FiEdit2, FiTrash2, FiRefreshCw, FiActivity,
    FiServer, FiDatabase, FiZap, FiEye, FiSave, FiX,
    FiBarChart2, FiPieChart, FiGrid
} from 'react-icons/fi';
import { ShopContext } from '../Context/ShopContext';
import { getAllProducts, getMyOrders } from '../api';
import { formatPrice } from '../utils';
import axios from 'axios';

const GATEWAY = 'http://127.0.0.1:8080';

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, sub, color, trend }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
    >
        <div className="flex items-start justify-between">
            <div className={`w-11 h-11 rounded-xl ${color} bg-opacity-10 flex items-center justify-center`}>
                <Icon className={`${color.replace('bg-', 'text-')} opacity-80`} size={20} />
            </div>
            {trend !== undefined && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                </span>
            )}
        </div>
        <div className="mt-3">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
            {sub && <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">{sub}</p>}
        </div>
    </motion.div>
);

// ─── Mini Bar Chart ───────────────────────────────────────────────────────────
const MiniBarChart = ({ data, label }) => {
    const max = Math.max(...data.map(d => d.value), 1);
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">{label}</h3>
            <div className="flex items-end gap-1.5 h-28">
                {data.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                        <div className="relative w-full flex items-end h-24">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${(d.value / max) * 100}%` }}
                                transition={{ duration: 0.6, delay: i * 0.05 }}
                                className="w-full rounded-t-md bg-gradient-to-t from-indigo-600 to-violet-500 group-hover:from-violet-600 group-hover:to-pink-500 transition-colors cursor-pointer min-h-[4px]"
                                title={`${d.label}: ${d.value}`}
                            />
                        </div>
                        <span className="text-[9px] text-gray-400 truncate w-full text-center">{d.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Service Health ───────────────────────────────────────────────────────────
const services = [
    { name: 'Product Service', port: 8082, path: '/actuator/health' },
    { name: 'Order Service', port: 8083, path: '/actuator/health' },
    { name: 'Cart Service', port: 8084, path: '/actuator/health' },
    { name: 'Payment Service', port: 8085, path: '/actuator/health' },
    { name: 'User Service', port: 8081, path: '/actuator/health' },
    { name: 'Inventory', port: 8086, path: '/actuator/health' },
    { name: 'Notification', port: 8087, path: '/actuator/health' },
    { name: 'API Gateway', port: 8080, path: '/actuator/health' },
];

const ServiceHealthPanel = () => {
    const [health, setHealth] = useState({});
    const [checking, setChecking] = useState(false);

    const checkAll = useCallback(async () => {
        setChecking(true);
        const results = {};
        await Promise.allSettled(
            services.map(async (svc) => {
                try {
                    const res = await axios.get(`http://localhost:${svc.port}${svc.path}`, { timeout: 3000 });
                    results[svc.name] = res.data?.status === 'UP' ? 'UP' : 'DEGRADED';
                } catch {
                    results[svc.name] = 'DOWN';
                }
            })
        );
        setHealth(results);
        setChecking(false);
    }, []);

    useEffect(() => { checkAll(); }, []);

    const statusIcon = (s) => {
        if (s === 'UP') return <FiCheckCircle className="text-green-500" />;
        if (s === 'DEGRADED') return <FiAlertCircle className="text-yellow-500" />;
        if (s === 'DOWN') return <FiXCircle className="text-red-500" />;
        return <FiActivity className="text-gray-400 animate-pulse" />;
    };

    const upCount = Object.values(health).filter(s => s === 'UP').length;

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <FiServer className="text-indigo-500" /> Service Health
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{upCount}/{services.length} services UP</p>
                </div>
                <button
                    onClick={checkAll}
                    disabled={checking}
                    className="flex items-center gap-1.5 text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition font-medium"
                >
                    <FiRefreshCw className={checking ? 'animate-spin' : ''} size={12} /> Refresh
                </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {services.map(svc => (
                    <div key={svc.name} className="flex items-center gap-2 p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        {statusIcon(health[svc.name])}
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{svc.name}</p>
                            <p className={`text-[10px] font-bold ${health[svc.name] === 'UP' ? 'text-green-500' :
                                    health[svc.name] === 'DOWN' ? 'text-red-500' :
                                        health[svc.name] === 'DEGRADED' ? 'text-yellow-500' : 'text-gray-400'
                                }`}>{health[svc.name] || 'Checking...'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Product Edit Modal ───────────────────────────────────────────────────────
const ProductModal = ({ product, onClose, onSave }) => {
    const [form, setForm] = useState(product || {
        name: '', description: '', skuCode: '', price: '', imageUrl: '', category: 'men', subCategory: ''
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            if (product?.id) {
                await axios.put(`${GATEWAY}/api/products/${product.id}`, form, {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
                });
            } else {
                await axios.post(`${GATEWAY}/api/products`, form, {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
                });
            }
            onSave();
        } catch (e) {
            alert('Error saving product: ' + (e.response?.data?.message || e.message));
        }
        setSaving(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl"
            >
                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                        {product?.id ? '✏️ Edit Product' : '➕ Add New Product'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <FiX />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-5 grid grid-cols-2 gap-3">
                    {[
                        { key: 'name', label: 'Product Name', span: 2 },
                        { key: 'skuCode', label: 'SKU Code' },
                        { key: 'price', label: 'Price (₹)', type: 'number' },
                        { key: 'imageUrl', label: 'Image URL', span: 2 },
                        { key: 'subCategory', label: 'Sub-Category' },
                    ].map(field => (
                        <div key={field.key} className={`flex flex-col gap-1 ${field.span === 2 ? 'col-span-2' : ''}`}>
                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">{field.label}</label>
                            <input
                                type={field.type || 'text'}
                                value={form[field.key] || ''}
                                onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                                required
                                className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                            />
                        </div>
                    ))}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Category</label>
                        <select
                            value={form.category || 'men'}
                            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                            className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                        >
                            {['men', 'women', 'kids', 'electronics', 'home'].map(c => (
                                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-2 flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
                        >
                            <FiSave size={14} /> {saving ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
const AdminDashboard = () => {
    const { user } = useContext(ShopContext);
    const [tab, setTab] = useState('overview');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editProduct, setEditProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');

    const load = useCallback(async () => {
        setLoading(true);
        const [p, o] = await Promise.allSettled([getAllProducts(), getMyOrders()]);
        setProducts(p.status === 'fulfilled' ? p.value : []);
        setOrders(o.status === 'fulfilled' ? o.value : []);
        setLoading(false);
    }, []);

    useEffect(() => { load(); }, []);

    const handleDelete = async (product) => {
        if (!confirm(`Delete "${product.title}"? This cannot be undone.`)) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${GATEWAY}/api/products/${product.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            load();
        } catch (e) {
            alert('Delete failed: ' + (e.response?.status === 403 ? 'Admin access required.' : e.message));
        }
    };

    // --- Derived Stats ---
    const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.totalPrice || 0), 0);
    const avgOrderValue = orders.length ? totalRevenue / orders.length : 0;
    const categories = [...new Set(products.map(p => p.category))];

    // --- Category breakdown for chart ---
    const categoryData = categories.map(cat => ({
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        value: products.filter(p => p.category === cat).length
    }));

    // --- Order status chart (mock daily trend) ---
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const orderTrend = days.map(label => ({
        label,
        value: Math.max(1, Math.floor(orders.length / 7) + Math.floor(Math.random() * 3))
    }));

    const filteredProducts = products.filter(p =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase())
    );

    const tabs = [
        { id: 'overview', label: 'Overview', icon: FiBarChart2 },
        { id: 'products', label: 'Products', icon: FiGrid },
        { id: 'orders', label: 'Orders', icon: FiPackage },
        { id: 'health', label: 'Services', icon: FiServer },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19]">
            {/* Header */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <FiZap className="text-indigo-600" /> ObitoStore Admin
                        </h1>
                        <p className="text-xs text-gray-500">Welcome back, {user?.fullName || 'Admin'} 👋</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={load} className="p-2 text-gray-400 hover:text-indigo-600 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition">
                            <FiRefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                            {(user?.fullName || 'A')[0].toUpperCase()}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
                    {tabs.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition whitespace-nowrap ${tab === t.id
                                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <t.icon size={14} /> {t.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

                {/* ── OVERVIEW TAB ── */}
                {tab === 'overview' && (
                    <>
                        {/* Stats Row */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard icon={FiDollarSign} label="Total Revenue" value={formatPrice(totalRevenue)} sub={`from ${orders.length} orders`} color="bg-green-500" trend={12} />
                            <StatCard icon={FiPackage} label="Total Orders" value={orders.length} sub="all time" color="bg-blue-500" trend={8} />
                            <StatCard icon={FiGrid} label="Products" value={products.length} sub={`${categories.length} categories`} color="bg-violet-500" trend={3} />
                            <StatCard icon={FiTrendingUp} label="Avg Order" value={formatPrice(avgOrderValue)} sub="per transaction" color="bg-orange-500" trend={5} />
                        </div>

                        {/* Charts Row */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <MiniBarChart data={orderTrend} label="📈 Orders This Week" />
                            <MiniBarChart data={categoryData} label="📦 Products by Category" />
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-gray-100 dark:border-gray-800">
                                <h3 className="font-semibold text-gray-900 dark:text-white">🧾 Recent Orders</h3>
                            </div>
                            <div className="divide-y divide-gray-50 dark:divide-gray-800">
                                {orders.slice(0, 5).map((o, i) => (
                                    <div key={o.orderNumber || i} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                        <div>
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">#{(o.orderNumber || o.id || `ORD-${i}`).toString().slice(-8)}</p>
                                            <p className="text-xs text-gray-400">{o.userId?.slice(0, 12) || 'Unknown User'}…</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">{formatPrice(o.totalPrice || 0)}</p>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${o.status === 'PLACED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                    o.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                                }`}>{o.status || 'PLACED'}</span>
                                        </div>
                                    </div>
                                ))}
                                {orders.length === 0 && (
                                    <div className="py-10 text-center text-gray-400 text-sm">No orders yet</div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* ── PRODUCTS TAB ── */}
                {tab === 'products' && (
                    <>
                        <div className="flex gap-3 items-center">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                            />
                            <button
                                onClick={() => { setEditProduct(null); setShowModal(true); }}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold hover:opacity-90 transition whitespace-nowrap"
                            >
                                <FiPlus size={16} /> Add Product
                            </button>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                                        <tr>
                                            {['Product', 'Category', 'Price', 'SKU', 'Actions'].map(h => (
                                                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                        {filteredProducts.map(p => (
                                            <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{p.title}</p>
                                                            <p className="text-xs text-gray-400 line-clamp-1">{p.description?.slice(0, 40)}…</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 capitalize">{p.category}</span>
                                                </td>
                                                <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{formatPrice(p.price)}</td>
                                                <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.skuCode}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => { setEditProduct(p); setShowModal(true); }}
                                                            className="p-1.5 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition"
                                                        >
                                                            <FiEdit2 size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(p)}
                                                            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                                                        >
                                                            <FiTrash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredProducts.length === 0 && (
                                            <tr><td colSpan={5} className="py-12 text-center text-gray-400">No products found</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 border-t border-gray-100 dark:border-gray-700">
                                Showing {filteredProducts.length} of {products.length} products
                            </div>
                        </div>
                    </>
                )}

                {/* ── ORDERS TAB ── */}
                {tab === 'orders' && (
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="font-bold text-gray-900 dark:text-white">All Orders ({orders.length})</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                                    <tr>
                                        {['Order #', 'User ID', 'Total', 'Items', 'Status', 'Placed At'].map(h => (
                                            <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                    {orders.map((o, i) => (
                                        <tr key={o.orderNumber || i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                            <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                                                #{(o.orderNumber || o.id || '').toString().slice(-8)}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                                                {(o.userId || 'N/A').slice(0, 12)}…
                                            </td>
                                            <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">
                                                {formatPrice(o.totalPrice || 0)}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                                {o.orderLineItemsList?.length || o.items?.length || '—'} items
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${o.status === 'PLACED' || o.status === 'SUCCESS' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    }`}>{o.status || 'PLACED'}</span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 text-xs">
                                                {o.placedAt ? new Date(o.placedAt).toLocaleDateString('en-IN') : '—'}
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr><td colSpan={6} className="py-12 text-center text-gray-400">No orders yet</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ── HEALTH TAB ── */}
                {tab === 'health' && (
                    <>
                        <ServiceHealthPanel />
                        <div className="grid sm:grid-cols-3 gap-4">
                            {[
                                { label: 'Keycloak (Auth)', url: 'http://localhost:8181/admin', icon: '🔐' },
                                { label: 'Eureka Dashboard', url: 'http://localhost:8761', icon: '🌐' },
                                { label: 'RabbitMQ Console', url: 'http://localhost:15672', icon: '🐰' },
                                { label: 'Grafana Metrics', url: 'http://localhost:3000', icon: '📊' },
                                { label: 'Zipkin Tracing', url: 'http://localhost:9411', icon: '🔍' },
                                { label: 'MailDev Inbox', url: 'http://localhost:1080', icon: '📧' },
                            ].map(link => (
                                <a
                                    key={link.label}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition group"
                                >
                                    <span className="text-2xl">{link.icon}</span>
                                    <div>
                                        <p className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-indigo-600 transition">{link.label}</p>
                                        <p className="text-xs text-gray-400">{link.url}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Product Modal */}
            <AnimatePresence>
                {showModal && (
                    <ProductModal
                        product={editProduct}
                        onClose={() => setShowModal(false)}
                        onSave={() => { setShowModal(false); load(); }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
