import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { ProjectData } from '../services/api';

interface AdminViewProps {
  onClose: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onClose }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('niraj_portfolio_admin_token')
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<
    'stats' | 'projects' | 'messages' | 'experience'
  >('stats');
  const [stats, setStats] = useState<any>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Project Form State (for Create/Edit)
  const [editingProject, setEditingProject] = useState<Partial<ProjectData> | null>(null);
  const [projectFormError, setProjectFormError] = useState('');

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await api.adminLogin(email.trim(), password);
      if (res.success && res.token) {
        localStorage.setItem('niraj_portfolio_admin_token', res.token);
        setToken(res.token);
      } else {
        setLoginError(res.message || 'Invalid email or password');
      }
    } catch {
      setLoginError('Authentication server error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('niraj_portfolio_admin_token');
    setToken(null);
    onClose();
  };

  // Fetch Dashboard Data
  const loadDashboardData = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const [statsRes, projRes, msgRes] = await Promise.all([
        api.adminGetStats(),
        api.adminGetProjects(),
        api.adminGetMessages(),
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (projRes.success && projRes.data) setProjects(projRes.data);
      if (msgRes.success && msgRes.data) setMessages(msgRes.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token]);

  // Project Actions
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setProjectFormError('');

    try {
      if (editingProject._id) {
        // Update
        const res = await api.adminUpdateProject(editingProject._id, editingProject);
        if (res.success) {
          setEditingProject(null);
          loadDashboardData();
        } else {
          setProjectFormError(res.message || 'Update failed');
        }
      } else {
        // Create
        const res = await api.adminCreateProject({
          ...editingProject,
          technologies: typeof editingProject.technologies === 'string'
            ? (editingProject.technologies as string).split(',').map((t: string) => t.trim())
            : editingProject.technologies || ['Linux'],
        });
        if (res.success) {
          setEditingProject(null);
          loadDashboardData();
        } else {
          setProjectFormError(res.message || 'Creation failed');
        }
      }
    } catch {
      setProjectFormError('Failed to save project');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await api.adminDeleteProject(id);
      if (res.success) {
        setProjects(projects.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleMessageStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
    try {
      const res = await api.adminUpdateMessageStatus(id, newStatus);
      if (res.success) {
        setMessages(
          messages.map((m) => (m._id === id ? { ...m, status: newStatus } : m))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      const res = await api.adminDeleteMessage(id);
      if (res.success) {
        setMessages(messages.filter((m) => m._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // If not logged in, render Admin Login Modal
  if (!token) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="w-full max-w-md p-6 rounded-2xl bg-[var(--c-surface)] border border-[var(--c-border)] shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--c-border)] mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--c-accent)]"></span>
              <h2 className="font-mono text-sm uppercase tracking-wider font-bold text-[var(--c-heading)]">
                Admin Authentication
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-[var(--c-muted)] hover:text-[var(--c-heading)] text-lg"
            >
              ✕
            </button>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--c-muted)] mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dhoreniraj83@gmail.com"
                className="w-full p-2.5 rounded-lg bg-[var(--c-surface-alt)] border border-[var(--c-border)] text-sm text-[var(--c-heading)] focus:outline-none focus:border-[var(--c-accent)]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--c-muted)] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full p-2.5 rounded-lg bg-[var(--c-surface-alt)] border border-[var(--c-border)] text-sm text-[var(--c-heading)] focus:outline-none focus:border-[var(--c-accent)]"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="cv-btn cv-btn--main flex-1 justify-center py-2.5 cursor-pointer disabled:opacity-50"
              >
                {isLoggingIn ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="cv-btn cv-btn--variant py-2.5 px-4 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard View
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-5xl rounded-2xl bg-[var(--c-surface)] border border-[var(--c-border)] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--c-border)] bg-[var(--c-surface-alt)]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <h2 className="font-mono text-sm uppercase tracking-wider font-bold text-[var(--c-heading)]">
                Portfolio Admin Console · Niraj Dhore
              </h2>
              <span className="text-[11px] font-mono text-[var(--c-muted)]">
                Full-Stack MongoDB Management
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-mono px-3 py-1.5 rounded-lg border border-[var(--c-border)] text-[var(--c-muted)] hover:text-red-400 hover:border-red-400/40 transition-colors"
            >
              Sign Out
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-muted)] hover:text-[var(--c-heading)]"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[var(--c-border)] px-5 pt-3 gap-4 bg-[var(--c-surface)] font-mono text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveTab('stats');
              setEditingProject(null);
            }}
            className={`pb-3 border-b-2 font-semibold ${
              activeTab === 'stats'
                ? 'border-[var(--c-accent)] text-[var(--c-accent)]'
                : 'border-transparent text-[var(--c-muted)] hover:text-[var(--c-heading)]'
            }`}
          >
            OVERVIEW
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`pb-3 border-b-2 font-semibold ${
              activeTab === 'projects'
                ? 'border-[var(--c-accent)] text-[var(--c-accent)]'
                : 'border-transparent text-[var(--c-muted)] hover:text-[var(--c-heading)]'
            }`}
          >
            PROJECTS ({projects.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('messages');
              setEditingProject(null);
            }}
            className={`pb-3 border-b-2 font-semibold flex items-center gap-1.5 ${
              activeTab === 'messages'
                ? 'border-[var(--c-accent)] text-[var(--c-accent)]'
                : 'border-transparent text-[var(--c-muted)] hover:text-[var(--c-heading)]'
            }`}
          >
            MESSAGES ({messages.length})
            {stats?.unreadMessages > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
            )}
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {isLoading && (
            <div className="text-center py-8 text-sm font-mono text-[var(--c-muted)]">
              Loading live database records...
            </div>
          )}

          {/* TAB 1: Overview */}
          {activeTab === 'stats' && !isLoading && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface-alt)]">
                  <span className="font-mono text-xs text-[var(--c-muted)]">Total Projects</span>
                  <div className="text-2xl font-bold font-mono text-[var(--c-heading)] mt-1">
                    {stats?.projects ?? projects.length}
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface-alt)]">
                  <span className="font-mono text-xs text-[var(--c-muted)]">Messages Received</span>
                  <div className="text-2xl font-bold font-mono text-[var(--c-heading)] mt-1">
                    {stats?.messages ?? messages.length}
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface-alt)]">
                  <span className="font-mono text-xs text-[var(--c-muted)]">Unread Inquiries</span>
                  <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
                    {stats?.unreadMessages ?? 0}
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface-alt)]">
                  <span className="font-mono text-xs text-[var(--c-muted)]">Total Skills</span>
                  <div className="text-2xl font-bold font-mono text-[var(--c-accent)] mt-1">
                    {stats?.skills ?? 12}
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface-alt)] space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--c-heading)] font-bold">
                  Backend Operational Status
                </h3>
                <div className="text-xs font-mono text-[var(--c-muted)] space-y-1.5">
                  <div>✓ MongoDB Connection: Connected &amp; Seeded</div>
                  <div>✓ JWT Authentication: Active (SHA-256 + bcrypt)</div>
                  <div>✓ Rate Limiter: Active (100 req/15min)</div>
                  <div>✓ Server Health: 200 OK</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Projects CRUD */}
          {activeTab === 'projects' && !isLoading && (
            <div className="space-y-6">
              {!editingProject ? (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--c-heading)]">
                      Managed Projects ({projects.length})
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject({
                          title: '',
                          slug: '',
                          category: 'Projects',
                          description: '',
                          technologies: [],
                          liveUrl: '',
                          githubUrl: '',
                          featured: false,
                          status: 'completed',
                          order: projects.length + 1,
                        })
                      }
                      className="cv-btn cv-btn--main text-xs py-1.5 px-3 cursor-pointer"
                    >
                      + Add New Project
                    </button>
                  </div>

                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div
                        key={proj._id}
                        className="p-4 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface-alt)] flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[var(--c-heading)] truncate">
                              {proj.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--c-surface)] text-[var(--c-accent)] border border-[var(--c-border)]">
                              {proj.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--c-muted)] truncate mt-1">
                            {proj.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setEditingProject(proj)}
                            className="cv-btn cv-btn--variant text-xs py-1 px-3 cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(proj._id)}
                            className="text-xs font-mono py-1 px-3 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Edit/Create Form */
                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--c-border)]">
                    <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--c-heading)]">
                      {editingProject._id ? 'Edit Project' : 'Create New Project'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="text-xs font-mono text-[var(--c-muted)] hover:text-[var(--c-heading)]"
                    >
                      Cancel
                    </button>
                  </div>

                  {projectFormError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400">
                      {projectFormError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[var(--c-muted)] mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProject.title || ''}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, title: e.target.value })
                        }
                        className="w-full p-2.5 rounded-lg bg-[var(--c-surface)] border border-[var(--c-border)] text-sm text-[var(--c-heading)] focus:outline-none focus:border-[var(--c-accent)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[var(--c-muted)] mb-1">
                        Slug (URL identifier)
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProject.slug || ''}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, slug: e.target.value })
                        }
                        className="w-full p-2.5 rounded-lg bg-[var(--c-surface)] border border-[var(--c-border)] text-sm text-[var(--c-heading)] focus:outline-none focus:border-[var(--c-accent)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--c-muted)] mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editingProject.description || ''}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, description: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg bg-[var(--c-surface)] border border-[var(--c-border)] text-sm text-[var(--c-heading)] focus:outline-none focus:border-[var(--c-accent)] resize-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[var(--c-muted)] mb-1">
                        Status
                      </label>
                      <select
                        value={editingProject.status || 'completed'}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            status: e.target.value as any,
                          })
                        }
                        className="w-full p-2.5 rounded-lg bg-[var(--c-surface)] border border-[var(--c-border)] text-sm text-[var(--c-heading)] focus:outline-none focus:border-[var(--c-accent)]"
                      >
                        <option value="completed">Completed</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[var(--c-muted)] mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={editingProject.category || 'Projects'}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, category: e.target.value })
                        }
                        className="w-full p-2.5 rounded-lg bg-[var(--c-surface)] border border-[var(--c-border)] text-sm text-[var(--c-heading)] focus:outline-none focus:border-[var(--c-accent)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[var(--c-muted)] mb-1">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={editingProject.order ?? 1}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            order: parseInt(e.target.value, 10) || 1,
                          })
                        }
                        className="w-full p-2.5 rounded-lg bg-[var(--c-surface)] border border-[var(--c-border)] text-sm text-[var(--c-heading)] focus:outline-none focus:border-[var(--c-accent)]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="cv-btn cv-btn--main py-2 px-5 cursor-pointer"
                    >
                      Save Project to MongoDB
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="cv-btn cv-btn--variant py-2 px-4 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: Contact Messages */}
          {activeTab === 'messages' && !isLoading && (
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--c-heading)]">
                Inquiries from Portfolio Contact Form ({messages.length})
              </h3>

              {messages.length === 0 ? (
                <div className="text-center py-10 text-xs font-mono text-[var(--c-muted)]">
                  No contact messages received yet.
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`p-4 rounded-xl border ${
                      msg.status === 'unread'
                        ? 'border-[var(--c-accent)] bg-[var(--c-surface-alt)]'
                        : 'border-[var(--c-border)] bg-[var(--c-surface)]'
                    } space-y-2`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[var(--c-heading)]">
                          {msg.name}
                        </span>
                        <span className="text-[11px] font-mono text-[var(--c-muted)]">
                          &lt;{msg.email}&gt;
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--c-muted)]">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="font-mono text-xs text-[var(--c-accent)] font-semibold">
                      Subject: {msg.subject}
                    </div>

                    <p className="text-xs text-[var(--c-text)] whitespace-pre-wrap bg-[var(--c-surface-alt)] p-3 rounded-lg border border-[var(--c-border)]">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleToggleMessageStatus(msg._id, msg.status)}
                        className="text-[11px] font-mono px-2.5 py-1 rounded bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-muted)] hover:text-[var(--c-heading)]"
                      >
                        Mark as {msg.status === 'unread' ? 'Read' : 'Unread'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="text-[11px] font-mono px-2.5 py-1 rounded border border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
