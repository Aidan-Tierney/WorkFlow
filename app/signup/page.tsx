//Signup page
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Button from '@/app/ui/Button'
import Input from '@/app/ui/Input'
import AuthCard from '../AuthCard'

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
<AuthCard title="Welcome to WorkFlow">


      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <Button
        onClick={handleSubmit}

      >
        Sign up
      </Button>
<p className="text-sm">
  Already have an account? <Link href="/signin" className="underline">Sign in</Link>
</p>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </AuthCard>
  )
}
