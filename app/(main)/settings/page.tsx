import {createClient} from '@/lib/supabase/server'
import CanvasConnect from '@/app/Canvasconnect'
import Syncbutton from '@/app/Syncbutton'
import ProfileSection from '@/app/ProfileSection'
import EmailSection from '@/app/EmailSection'
import PasswordSection from '@/app/PasswordSection'
export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
const email = user?.email ?? ''
const displayName = user?.user_metadata?.display_name ?? ''
  const { data: connection } = await supabase
    .from('canvas')
    .select('canvas_url')
    .maybeSingle()

  return (
    <div className="max-w-2xl mx-auto p-8 flex flex-col gap-8">
  <h1 className="text-2xl font-bold">Settings</h1>

  <section className="flex flex-col gap-3">
    <h2 className="font-semibold">Profile</h2>
    <ProfileSection initialName={displayName} />
  </section>

  <section className="flex flex-col gap-3 border-t border-line pt-6">
    <h2 className="font-semibold">Account</h2>
    <EmailSection currentEmail={email}/>
    <PasswordSection />
  </section>

  <section className="flex flex-col gap-3 border-t border-line pt-6">
    <h2 className="font-semibold">Canvas</h2>
    {connection ? <p>Connected to {connection.canvas_url}</p> : <p>Not connected</p>}

      <CanvasConnect />
      <Syncbutton />
  </section>
</div>
  )
}
