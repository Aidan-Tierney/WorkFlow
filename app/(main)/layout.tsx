import Addtask from '../Addtask'
import { createClient } from '@/lib/supabase/server'
import Usermenu from '../Usermenu'
import {redirect} from 'next/navigation'
import Link from 'next/link'
export default async function MainLayout({
  children,
}: {
  
  children: React.ReactNode
}) {
const supabase = await createClient()
const { data } = await supabase.auth.getUser()
const emailname = data.user?.email
if (!data.user) {
    redirect('/signin')   // stops here, sends the visitor to /join
  }
// data.user is the user object if logged in, or null if not
  return (
    <div className="min-h-full flex">
      <aside className="w-64 border-r border-gray-400 p-4">
        <div className="flex justify-between items-center">
        
        {emailname && (
<Usermenu email={emailname} />
 )}
</div>
        <Addtask />
        <div className="flex flex-col gap-2">
       <Link href="/" className="underline">Dashboard</Link>
       </div>
       <div className="flex flex-col gap-2">
         <Link href="/projects" className="underline">Projects</Link>
       </div>
       <div className="flex flex-col gap-2">
       <Link href="/completed" className="underline">Completed</Link>
       </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
