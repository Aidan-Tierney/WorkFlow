import SidebarAddtask from '../SidebarAddtask'
import { createClient } from '@/lib/supabase/server'
import Usermenu from '../Settings'
import {redirect} from 'next/navigation'
import NavLink  from '../ui/NavLink'
import Sidebar from '../Sidebar'
import { Inbox, Folder, Calendar, CircleCheck, CircleDashed } from "lucide-react";
import SidebarProjects from '../SidebarProjects'
export default async function MainLayout({
  children,
}: {
  
  children: React.ReactNode
}) {
const supabase = await createClient()
const { data } = await supabase.auth.getUser()
const emailname = data.user?.email
const displayName = data.user?.user_metadata?.display_name || emailname
const {data: projects} = await supabase
.from('projects')
.select('id, project_name')
.order('created_at')
if (!data.user) {
    redirect('/signin')   // stops here, sends the visitor to /join
  }
// data.user is the user object if logged in, or null if not
  return (
    <div className="min-h-screen flex">
      <Sidebar>
        <div className="flex justify-between items-center">
        
        {emailname && (
<Usermenu email={emailname} name={displayName} />
 )}
</div>
        <SidebarAddtask />
        <nav className="flex flex-col gap-1 mt-4 min-w-0">
          <NavLink href="/" label="Dashboard" icon={<Inbox size={18} />} />
          <NavLink href="/calendar" label="Calendar" icon={<Calendar size={18} />} />
          <NavLink href="/completed" label="Completed" icon={<CircleCheck size={18} />} />
       </nav>
       <SidebarProjects projects={projects ?? []} />
       <div className="mt-auto">
          <NavLink href="/settings" label="Connect Canvas" icon={<CircleDashed size={18} />} />
        </div>
      </Sidebar>

      <main className="flex-1 p-8 min-w-0">{children}</main>
    </div>
  )
}
