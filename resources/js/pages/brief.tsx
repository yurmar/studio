import { useNavigate } from 'react-router-dom'
import BriefOrderModal from '@/components/BriefOrderModal'

export default function Brief() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen">
            <BriefOrderModal open onClose={() => navigate('/')} />
        </div>
    )
}
