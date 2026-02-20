import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Plus,
    Edit,
    Trash2,
    TrendingUp,
    DollarSign
} from 'lucide-react';

const AdminDashboard = () => {
    const { state } = useAppContext();
    const { lessons, users } = state;
    const [activeTab, setActiveTab] = useState('overview');

    const totalLessons = lessons?.length || 0;
    const totalStudents = users?.length || 0;
    const totalRevenue = lessons?.reduce((sum, lesson) => sum + lesson.price, 0) || 0;
    const averagePrice = totalLessons > 0 ? Math.round(totalRevenue / totalLessons) : 0;

    const stats = [
        {
            icon: BookOpen,
            label: 'Total Lessons',
            value: totalLessons,
            color: '#10b981',
            bgColor: '#f0fdf4'
        },
        {
            icon: Users,
            label: 'Total Students',
            value: totalStudents,
            color: '#3b82f6',
            bgColor: '#eff6ff'
        },
        {
            icon: DollarSign,
            label: 'Average Price',
            value: `$${averagePrice}`,
            color: '#f59e0b',
            bgColor: '#fef3c7'
        },
        {
            icon: TrendingUp,
            label: 'Total Revenue',
            value: `$${totalRevenue}`,
            color: '#8b5cf6',
            bgColor: '#f5f3ff'
        },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'lessons', label: 'Manage Lessons', icon: BookOpen },
        { id: 'students', label: 'Manage Students', icon: Users },
    ];

    return (
        <div style={{ minHeight: 'calc(100vh - 64px)', backgroundColor: '#f9fafb' }}>
            <div style={{
                backgroundColor: 'white',
                borderBottom: '1px solid #e5e7eb',
                padding: '2rem 1rem'
            }}>
                <div className="container">
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#111827',
                        marginBottom: '0.5rem'
                    }}>
                        Admin Dashboard
                    </h1>
                    <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                        Manage your tennis coaching business
                    </p>
                </div>
            </div>

            <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '2rem', padding: '0 1rem' }}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '1rem 0',
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: activeTab === tab.id ? '3px solid #10b981' : '3px solid transparent',
                                    color: activeTab === tab.id ? '#10b981' : '#6b7280',
                                    fontWeight: activeTab === tab.id ? 600 : 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <tab.icon size={20} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem 1rem' }}>
                {activeTab === 'overview' && <OverviewTab stats={stats} lessons={lessons} />}
                {activeTab === 'lessons' && <LessonsTab />}
                {activeTab === 'students' && <StudentsTab users={users} />}
            </div>
        </div>
    );
};

const OverviewTab = ({ stats, lessons }) => {
    return (
        <div>
            <div className="grid grid-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="card"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            padding: '2rem',
                            backgroundColor: 'white'
                        }}
                    >
                        <div style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '1rem',
                            backgroundColor: stat.bgColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <stat.icon size={36} color={stat.color} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                {stat.label}
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>
                                {stat.value}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-2" style={{ gap: '2rem' }}>
                <div className="card">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
                        Recent Lessons
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {lessons?.slice(0, 3).map((lesson) => (
                            <div
                                key={lesson._id}
                                style={{
                                    padding: '1rem',
                                    backgroundColor: '#f9fafb',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 600, color: '#111827' }}>{lesson.title}</div>
                                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{lesson.level}</div>
                                </div>
                                <div style={{ fontWeight: 'bold', color: '#10b981' }}>${lesson.price}</div>
                            </div>
                        )) || <p style={{ color: '#6b7280' }}>No lessons yet</p>}
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
                        Quick Actions
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ justifyContent: 'flex-start', gap: '0.75rem' }}
                            onClick={() => alert('Click "Manage Lessons" tab to create lessons!')}
                        >
                            <Plus size={20} />
                            Create New Lesson
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ justifyContent: 'flex-start', gap: '0.75rem' }}
                            onClick={() => alert('Student management coming soon!')}
                        >
                            <Plus size={20} />
                            Add New Student
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LessonsTab = () => {
    const { state, addLesson, updateLesson, deleteLesson } = useAppContext();
    const { lessons } = state;
    const [isCreating, setIsCreating] = useState(false);
    const [editingLesson, setEditingLesson] = useState(null);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this lesson?')) {
            try {
                await deleteLesson(id);
                alert('Lesson deleted successfully!');
            } catch (error) {
                console.error('Delete error:', error);
                alert('Error deleting lesson: ' + error.message);
            }
        }
    };

    const handleSave = async (lessonData) => {
        try {
            console.log('Saving lesson:', lessonData);

            if (editingLesson) {
                await updateLesson(editingLesson._id, lessonData);
                alert('Lesson updated successfully!');
            } else {
                await addLesson(lessonData);
                alert('Lesson created successfully!');
            }

            setIsCreating(false);
            setEditingLesson(null);
        } catch (error) {
            console.error('Save error:', error);
            alert('Error: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                    All Lessons ({lessons?.length || 0})
                </h2>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setIsCreating(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Plus size={20} />
                    Add New Lesson
                </button>
            </div>

            {(isCreating || editingLesson) && (
                <LessonForm
                    lesson={editingLesson}
                    onClose={() => {
                        setIsCreating(false);
                        setEditingLesson(null);
                    }}
                    onSave={handleSave}
                />
            )}

            <div className="card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                                Title
                            </th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>
                                Level
                            </th>
                            <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151' }}>
                                Duration
                            </th>
                            <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151' }}>
                                Price
                            </th>
                            <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151' }}>
                                Max Students
                            </th>
                            <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: '#374151' }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons?.map((lesson) => (
                            <tr key={lesson._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 600, color: '#111827' }}>{lesson.title}</div>
                                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                                        {lesson.description?.substring(0, 50)}...
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        backgroundColor: lesson.level === 'Beginner' ? '#dbeafe' :
                                            lesson.level === 'Intermediate' ? '#fed7aa' : '#fecaca',
                                        color: lesson.level === 'Beginner' ? '#1e40af' :
                                            lesson.level === 'Intermediate' ? '#c2410c' : '#991b1b',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.875rem',
                                        fontWeight: 600
                                    }}>
                                        {lesson.level}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>
                                    {lesson.duration} min
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#10b981' }}>
                                    ${lesson.price}
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>
                                    {lesson.maxStudents}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                        <button
                                            type="button"
                                            onClick={() => setEditingLesson(lesson)}
                                            style={{
                                                padding: '0.5rem',
                                                backgroundColor: '#eff6ff',
                                                border: 'none',
                                                borderRadius: '0.375rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Edit size={18} color="#3b82f6" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(lesson._id)}
                                            style={{
                                                padding: '0.5rem',
                                                backgroundColor: '#fef2f2',
                                                border: 'none',
                                                borderRadius: '0.375rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Trash2 size={18} color="#ef4444" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) || (
                                <tr>
                                    <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
                                        No lessons found. Create your first lesson!
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const LessonForm = ({ lesson, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: lesson?.title || '',
        description: lesson?.description || '',
        duration: lesson?.duration || 60,
        price: lesson?.price || 75,
        level: lesson?.level || 'Beginner',
        maxStudents: lesson?.maxStudents || 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
                {lesson ? 'Edit Lesson' : 'Create New Lesson'}
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                        <label className="form-label">Title *</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Level *</label>
                        <select
                            className="form-select"
                            value={formData.level}
                            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                            required
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="All Levels">All Levels</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Description *</label>
                    <textarea
                        className="form-textarea"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows="3"
                        required
                    />
                </div>

                <div className="grid grid-3" style={{ gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                        <label className="form-label">Duration (minutes) *</label>
                        <input
                            type="number"
                            className="form-input"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                            min="30"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Price ($) *</label>
                        <input
                            type="number"
                            className="form-input"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Max Students *</label>
                        <input
                            type="number"
                            className="form-input"
                            value={formData.maxStudents}
                            onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })}
                            min="1"
                            required
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        {lesson ? 'Update Lesson' : 'Create Lesson'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const StudentsTab = ({ users }) => {
    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                    All Students ({users?.length || 0})
                </h2>
            </div>

            <div className="card">
                <p style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                    Student management coming soon! For now, you can view students on the Ranking page.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;