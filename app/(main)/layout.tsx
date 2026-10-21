import Addtask from '../Addtask'
import { createClient } from '@/lib/supabase/server'
import Usermenu from '../Usermenu'
import {redirect} from 'next/navigation'
import NavLink  from '../ui/NavLink'
import Sidebar from '../Sidebar'
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
      <Sidebar>
        <div className="flex justify-between items-center">
        
        {emailname && (
<Usermenu email={emailname} />
 )}
</div>
        <Addtask />
        <nav className="flex flex-col gap-1 mt-4">
          <NavLink href="/" label="Dashboard" />
          <NavLink href="/calendar" label="Calendar" />
          <NavLink href="/projects" label="Projects" />
          <NavLink href="/completed" label="Completed" />

       </nav>
      </Sidebar>

      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
