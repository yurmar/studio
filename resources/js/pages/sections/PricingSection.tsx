import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
    Globe, Building2, Layers, Server, Code2, BarChart3,
    Wrench, Terminal, MessageCircle, Bot, Plus, Trash2, Newspaper, Gamepad2, Clock
} from 'lucide-react'
import { apiGetPriceItems, apiCreatePriceItem, apiUpdatePriceItem, apiDeletePriceItem, PriceItem } from '@/api/priceItems'
import EditButton from '@/components/ui/EditButton'
import Modal from '@/components/ui/Modal'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const ICONS: Record<string, React.ReactNode> = {
    Globe: <Globe size={24} />,
    Building2: <Building2 size={24} />,
    Layers: <Layers size={24} />,
    Server: <Server size={24} />,
    Code2: <Code2 size={24} />,
    BarChart3: <BarChart3 size={24} />,
    Wrench: <Wrench size={24} />,
    Terminal: <Terminal size={24} />,
    MessageCircle: <MessageCircle size={24} />,
    Bot: <Bot size={24} />,
    Newspaper: <Newspaper size={24} />,
    Gamepad2: <Gamepad2 size={24} />,
}

const FIELDS = [
    { key: 'title', label: 'Название', type: 'text' as const },
    { key: 'icon', label: 'Иконка (Globe, Bot, Gamepad2…)', type: 'text' as const },
    { key: 'price', label: 'Цена (от 30 000 ₽)', type: 'text' as const },
    { key: 'term', label: 'Срок (5–10 дней)', type: 'text' as const },
    { key: 'description', label: 'Описание', type: 'textarea' as const },
    { key: 'sort_order', label: 'Порядок', type: 'text' as const },
]

export default function PricingSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const isAuth = useSelector((s: RootState) => s.auth.isAuthenticated)
    const [items, setItems] = useState<PriceItem[]>([])
    const [modal, setModal] = useState(false)
    const [editing, setEditing] = useState<PriceItem | null>(null)
    const [form, setForm] = useState<Record<string, string>>({})
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        apiGetPriceItems().then(r => setItems(r.data)).catch(() => {})
    }, [])

    const openCreate = () => {
        setEditing(null)
        setForm({ title: '', icon: '', price: '', term: '', description: '', sort_order: String(items.length) })
        setModal(true)
    }

    const openEdit = (item: PriceItem) => {
        setEditing(item)
        setForm({
            title: item.title,
            icon: item.icon ?? '',
            price: item.price,
            term: item.term,
            description: item.description ?? '',
            sort_order: String(item.sort_order),
        })
        setModal(true)
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const payload = { ...form, sort_order: Number(form.sort_order) }
            if (editing) {
                const r = await apiUpdatePriceItem(editing.id, payload)
                setItems(prev => prev.map(s => s.id === editing.id ? r.data : s))
            } else {
                const r = await apiCreatePriceItem(payload as any)
                setItems(prev => [...prev, r.data])
            }
            setModal(false)
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: number) => {
        await apiDeletePriceItem(id)
        setItems(prev => prev.filter(s => s.id !== id))
    }

    const empty = items.length === 0

    return (
        <section id="pricing" ref={ref} className="py-24 px-4 ">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-between mb-12"
                >
                    <div>
                        <p className="text-sky-400 text-sm font-medium tracking-widest uppercase mb-2">Цены</p>
                        <h2 className="text-4xl md:text-5xl font-bold">Стоимость и сроки работ</h2>
                    </div>
                    {isAuth && (
                        <button
                            onClick={openCreate}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 transition-colors"
                        >
                            <Plus size={12} /> Добавить
                        </button>
                    )}
                </motion.div>

                {empty ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        className="text-muted-foreground text-center py-16"
                    >
                        Скоро будет информация
                    </motion.p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <AnimatePresence>
                            {items.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: 0.1 + i * 0.09, duration: 0.45 }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="relative group card-block rounded-2xl p-5 cursor-default flex flex-col"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
                                        {ICONS[item.icon ?? ''] ?? <Globe size={24} />}
                                    </div>
                                    <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground text-xs leading-relaxed mb-4">{item.description}</p>
                                    <div className="mt-auto pt-3 border-t border-sky-500/15">
                                        <p className="text-lg font-bold text-sky-400">{item.price}</p>
                                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1"><Clock size={12} /> {item.term}</p>
                                    </div>

                                    {isAuth && (
                                        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openEdit(item)} className="p-1 rounded hover:bg-sky-500/20 text-sky-400">
                                                <Code2 size={12} />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="p-1 rounded hover:bg-red-500/20 text-red-400">
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <Modal
                open={modal}
                title={editing ? 'Редактировать цену' : 'Добавить цену'}
                fields={FIELDS}
                values={form}
                onChange={(k, v) => setForm(prev => ({ ...prev, [k]: v }))}
                onSave={handleSave}
                onClose={() => setModal(false)}
                saving={saving}
            />
        </section>
    )
}
