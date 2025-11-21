import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to get image URL from Supabase Storage
export function getImageUrl(bucket: string, path: string) {
  if (!supabase) {
    return 'https://via.placeholder.com/400x300?text=Image'
  }
  
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
