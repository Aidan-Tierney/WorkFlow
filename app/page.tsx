

import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data, error } = await supabase.from('tasks').select()

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

