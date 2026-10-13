import Addtask from '../Addtask'
import { createClient } from '@/lib/supabase/server'
import Usermenu from '../Usermenu'
export default async function MainLayout({
  children,
}: {
  
  children: React.ReactNode
}) {
  const supabase = await createClient()
const { data } = await supabase.auth.getUser()
const emailname = data.user?.email

// data.user is the user object if logged in, or null if not
  return (
    <div className="min-h-full flex">
      <aside className="w-64 border-r border-gray-400 p-4">
        <div className="flex justify-between items-center">
        <h2 className="font-semibold">Sidebar</h2>
        {emailname && (
<Usermenu email={emailname} />
 )}
</div>
        <Addtask />
          

      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
