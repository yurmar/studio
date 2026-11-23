import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import BriefOrderModal from '@/components/BriefOrderModal'
import { apiGetBriefPrefill, BriefFormData } from '@/api/briefOrders'

export default function Brief() {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const token = params.get('t') || undefined
    const [initial, setInitial] = useState<Partial<BriefFormData> | undefined>()
    const [ready, setReady] = useState(!token)

    // Ссылка из Telegram-бота: подставляем уже известные данные заявки
    useEffect(() => {
        if (!token) return
        apiGetBriefPrefill(token)
            .then(r => setInitial(r.data))
            .catch(() => {})
            .finally(() => setReady(true))
    }, [token])

    return (
        <div className="min-h-screen">
            {ready && <BriefOrderModal open onClose={() => navigate('/')} initial={initial} token={initial ? token : undefined} />}
        </div>
    )
}
