import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Plus, Trash2, Pencil, Eye, EyeOff, X } from 'lucide-react'
import { apiGetProjects, apiCreateProject, apiUpdateProject, apiDeleteProject, ProjectItem } from '@/api/projects'
import Modal from '@/components/ui/Modal'
import ConfirmModal from '@/components/ui/ConfirmModal'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const FIELDS = [
    { key: 'title', label: 'Название проекта', type: 'text' as const },
    { key: 'stack', label: 'Стек', type: 'text' as const, placeholder: 'React, Laravel, MySQL' },
    { key: 'description', label: 'Описание', type: 'textarea' as const },
    { key: 'screenshot_path', label: 'Картинка', type: 'image' as const },
    { key: 'url', label: 'Ссылка на проект', type: 'url' as const, placeholder: 'https://...' },
    { key: 'sort_order', label: 'Порядок (меньше — выше)', type: 'text' as const },
]

export default function ProjectsSection({ limit }: { limit?: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const isAuth = useSelector((s: RootState) => s.auth.isAuthenticated)
    const [items, setItems] = useState<ProjectItem[]>([])
    const [modal, setModal] = useState(false)
    const [editing, setEditing] = useState<ProjectItem | null>(null)
    const [form, setForm] = useState<Record<string, string>>({})
    const [saving, setSaving] = useState(false)
    const [toDelete, setToDelete] = useState<ProjectItem | null>(null)
    const [deleting, setDeleting] = useState(false)
    const [detail, setDetail] = useState<ProjectItem | null>(null)

    useEffect(() => {
        apiGetProjects().then(r => setItems(r.data)).catch(() => {})
    }, [])

    const displayed = limit ? items.slice(0, limit) : items

    const openCreate = () => {
        setEditing(null)
        setForm({ title: '', stack: '', description: '', screenshot_path: '', url: '', sort_order: String(items.length) })
        setModal(true)
    }

    const openEdit = (item: ProjectItem) => {
        setEditing(item)
        setForm({
            title: item.title,
            stack: item.stack ?? '',
            description: item.description ?? '',
            screenshot_path: item.screenshot_path ?? '',
            url: item.url ?? '',
            sort_order: String(item.sort_order),
        })
        setModal(true)
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const payload = {
                ...form,
                sort_order: Number(form.sort_order),
                is_featured: editing?.is_featured ?? false,
                is_concept: editing?.is_concept ?? false,
            }
            if (editing) {
                const r = await apiUpdateProject(editing.id, payload)
                setItems(prev => prev.map(p => p.id === editing.id ? r.data : p))
            } else {
                const r = await apiCreateProject(payload as any)
                setItems(prev => [...prev, r.data])
            }
            setModal(false)
        } finally {
            setSaving(false)
        }
    }

    const toggleActive = async (item: ProjectItem) => {
        const r = await apiUpdateProject(item.id, { title: item.title, is_active: !item.is_active })
        setItems(prev => prev.map(p => p.id === item.id ? r.data : p))
    }

    const handleDelete = async () => {
        if (!toDelete) return
        setDeleting(true)
        try {
            await apiDeleteProject(toDelete.id)
            setItems(prev => prev.filter(p => p.id !== toDelete.id))
            setToDelete(null)
        } finally {
            setDeleting(false)
        }
    }

    return (
        <section id="projects" ref={ref} className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-between mb-12"
                >
                    <div>
                        <p className="text-sky-400 text-sm font-medium tracking-widest uppercase mb-2">Портфолио</p>
                        <h2 className="text-4xl md:text-5xl font-bold">Несколько недавних работ</h2>
                    </div>
                    {isAuth && (
                        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 transition-colors">
                            <Plus size={12} /> Добавить
                        </button>
                    )}
                </motion.div>

                {displayed.length === 0 ? (
                    <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="text-muted-foreground text-center py-16">
                        Работы скоро появятся
                    </motion.p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {displayed.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                                    className={`relative group card-block rounded-2xl overflow-hidden ${item.is_active ? '' : 'opacity-60'}`}
                                >
                                    {/* Screenshot */}
                                    <div onClick={() => setDetail(item)} className="relative h-44 cursor-pointer bg-gradient-to-br from-sky-900/30 to-purple-900/30 overflow-hidden">
                                        {item.screenshot_path ? (
                                            <img src={item.screenshot_path} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-4xl font-bold text-white/10">{item.title[0]}</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                        {item.is_concept && (
                                            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-400 text-black">Концепт</span>
                                        )}

                                        {isAuth && !item.is_active && (
                                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[11px] font-medium bg-black/60 text-white/80">Неактивна</span>
                                        )}

                                        {/* Auth controls */}
                                        {isAuth && (
                                            <div className="absolute top-2 right-2 flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => toggleActive(item)} title={item.is_active ? 'Деактивировать' : 'Активировать'} className={`w-7 h-7 rounded-lg flex items-center justify-center text-white ${item.is_active ? 'bg-amber-500' : 'bg-emerald-500'}`}>{item.is_active ? <Eye size={12} /> : <EyeOff size={12} />}</button>
                                                <button onClick={() => openEdit(item)} className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center text-white"><Pencil size={12} /></button>
                                                <button onClick={() => setToDelete(item)} className="w-7 h-7 rounded-lg bg-red-500 flex items-center justify-center text-white"><Trash2 size={12} /></button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                                        {item.stack && (
                                            <p className="text-sky-400 text-xs font-medium mb-2 line-clamp-2">{item.stack}</p>
                                        )}
                                        {item.is_concept && (
                                            <p className="text-amber-400/90 text-xs font-medium mb-2">Концепт, не для реальных заказчиков</p>
                                        )}
                                        {item.description ? (
                                            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{item.description}</p>
                                        ) : (
                                            <p className="text-muted-foreground text-sm mb-4 italic">Описание скоро появится</p>
                                        )}
                                        <div className="flex items-center gap-4">
                                        <button onClick={() => setDetail(item)} className="text-xs text-foreground/80 hover:text-sky-400 font-medium transition-colors">Подробнее</button>
                                        {item.url && (
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-medium transition-colors"
                                            >
                                                {item.is_concept ? 'Смотреть концепт' : 'Открыть проект'} <ExternalLink size={12} />
                                            </a>
                                        )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {detail && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm overflow-y-auto p-4 flex"
                        onClick={() => setDetail(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
                            onClick={e => e.stopPropagation()}
                            className="relative m-auto w-full max-w-3xl card-block rounded-2xl overflow-hidden"
                        >
                            <button onClick={() => setDetail(null)} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg bg-black/50 hover:bg-black/70 text-white flex items-center justify-center"><X size={16} /></button>
                            {detail.screenshot_path && <img src={detail.screenshot_path} alt={detail.title} className="w-full max-h-[50vh] object-cover object-top" />}
                            <div className="p-6 md:p-8">
                                <h3 className="text-2xl font-bold mb-3">{detail.title}</h3>
                                {detail.is_concept && (
                                    <p className="mb-4 px-3 py-2 rounded-lg text-sm bg-amber-400/10 text-amber-300 border border-amber-400/30">
                                        Это концепт для портфолио, а не работа для реального заказчика. Бренд, тексты, люди и цифры вымышлены.
                                    </p>
                                )}
                                {detail.stack && (
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {detail.stack.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                                            <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">{t}</span>
                                        ))}
                                    </div>
                                )}
                                {detail.description && <p className="text-muted-foreground leading-relaxed whitespace-pre-line mb-6">{detail.description}</p>}
                                {detail.url && (
                                    <a href={detail.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-colors">
                                        {detail.is_concept ? 'Смотреть концепт' : 'Открыть сайт'} <ExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ConfirmModal
                open={!!toDelete}
                title="Удалить работу?"
                message={toDelete ? `«${toDelete.title}» будет удалена без возможности восстановления.` : ''}
                requireCode
                confirming={deleting}
                onConfirm={handleDelete}
                onClose={() => setToDelete(null)}
            />

            <Modal open={modal} title={editing ? 'Редактировать проект' : 'Добавить проект'} fields={FIELDS} values={form} onChange={(k, v) => setForm(p => ({ ...p, [k]: v }))} onSave={handleSave} onClose={() => setModal(false)} saving={saving} />
        </section>
    )
}
