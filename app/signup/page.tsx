//Signup page
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Button from '@/app/ui/Button'
import Input from '@/app/ui/Input'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit() {
    setErrorMessage('')

    const { data, error } = await supabase.auth.signUp({
  email: email,
password: password,
})


    if (error) {
      setErrorMessage(error.message)
      return
    }

    router.push('/')
  }

  return (
    <div className="max-w-sm mx-auto p-8 flex flex-col gap-3">
      <h1 className="text-xl font-semibold">Sign up</h1>

      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full border border-gray-300 rounded px-2 py-1"
      />

      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full border border-gray-300 rounded px-2 py-1"
      />

      <Button
        onClick={handleSubmit}
        className="w-full bg-red-500 text-white rounded px-2 py-1"
      >
        Sign up
      </Button>
<p className="text-sm">
  Already have an account? <Link href="/signin" className="underline">Sign in</Link>
</p>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  )
}
