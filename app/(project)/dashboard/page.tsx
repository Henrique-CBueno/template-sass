import { auth } from "@/app/lib/auth"
import { redirect } from "next/navigation"
import { handleAuth } from "@/app/actions/handle-auth"
import Link from "next/link"

export default async function Dashboard() {
    
    const session = await auth()

    if(!session) {
        redirect('/login')
    }

    return (
        <div className="flex flex-col gap-10 items-center justify-center h-screen"> 
            <h1 className="text-4xl font-bold">Protected Dashboard Page</h1> 
            <p>{session?.user?.email ? `email do user: ${session?.user?.email}` : 'nenhum usuario logado'}</p>

            {
                session?.user?.email && (
                    <form action={handleAuth}>
                    
                        <button type="submit" className="border rounded-md px-2 cursor-pointer">Logout</button>
                    </form>
                )
            }
            <Link href="/pagamentos">Pagamentos</Link>
        </div>
    )
}