const { useRouter } = require("next/navigation");



export default function GoBack(){
    const router = useRouter()
    return router.back()
}