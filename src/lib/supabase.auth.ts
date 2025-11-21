import { supabase } from './supabase.client'

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error('Supabase not configured')
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  return { data, error }
}

export async function signOut() {
  if (!supabase) throw new Error('Supabase not configured')
  
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  if (!supabase) return null
  
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function isAdmin() {
  if (!supabase) return false
  
  const user = await getCurrentUser()
  if (!user) return false
  
  const { data, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', user.email)
    .single()
  
  return !error && !!data
}

export async function getSession() {
  if (!supabase) return null
  
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
