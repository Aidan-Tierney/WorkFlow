import {createClient} from '@/lib/supabase/server'
import CanvasConnect from '@/app/Canvasconnect'
import Syncbutton from '@/app/Syncbutton'
export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: connection } = await supabase
    .from('canvas')
    .select('canvas_url')
    .maybeSingle()

  return (
    <div className="max-w-2xl mx-auto p-8 flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Settings</h1>
      <h2 className="font-semibold">Canvas</h2>
     {connection ? <p>Connected to {connection.canvas_url}</p> : <p>Not connected</p>}

      <CanvasConnect />
      <Syncbutton />
    </div>
  )
}
