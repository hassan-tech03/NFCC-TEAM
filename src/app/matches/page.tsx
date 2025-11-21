'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase.client'
import { isAdmin } from '@/lib/supabase.auth'

interface Match {
  id: string
  title: string
  slug: string
  opponent: string
  opponent_logo_url?: string
  match_date: string
  venue: string
  match_type: 'T20' | 'ODI' | 'Test'
  description?: string
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdminUser, setIsAdminUser] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    loadMatches()
    checkAdmin()
  }, [])

  async function loadMatches() {
    if (!supabase) {
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('match_date', { ascending: true })

    if (!error && data) {
      setMatches(data)
    }
    setLoading(false)
  }

  async function checkAdmin() {
    const admin = await isAdmin()
    setIsAdminUser(admin)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Upcoming Matches
          </h1>
          <p className="text-xl text-gray-600">Check out our match schedule</p>
        </div>

        {isAdminUser && (
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Match
            </button>
          </div>
        )}

        {matches.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Upcoming Matches</h2>
            <p className="text-gray-500">
              {isAdminUser ? 'Click "Add Match" to schedule a match!' : 'Check back soon for upcoming matches.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} isAdmin={isAdminUser} onUpdate={loadMatches} />
            ))}
          </div>
        )}

        {showAddForm && (
          <AddMatchModal
            onClose={() => setShowAddForm(false)}
            onSuccess={() => {
              setShowAddForm(false)
              loadMatches()
            }}
          />
        )}
      </div>
    </div>
  )
}

function MatchCard({ match, isAdmin, onUpdate }: { match: Match; isAdmin: boolean; onUpdate: () => void }) {
  const [showMenu, setShowMenu] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!supabase) return
    
    setDeleting(true)
    
    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('id', match.id)
    
    setDeleting(false)
    
    if (!error) {
      setShowDeleteConfirm(false)
      onUpdate()
    }
  }

  const matchDate = new Date(match.match_date)
  const formattedDate = matchDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  const formattedTime = matchDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {isAdmin && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
          {showMenu && (
            <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl py-2 min-w-[120px] z-20">
              <button 
                onClick={() => {
                  setShowEditModal(true)
                  setShowMenu(false)
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
              >
                Edit
              </button>
              <button 
                onClick={() => {
                  setShowDeleteConfirm(true)
                  setShowMenu(false)
                }}
                className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      {showEditModal && (
        <EditMatchModal
          match={match}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false)
            onUpdate()
          }}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Delete Match?</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this match? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            {match.match_type}
          </span>
          <span className="text-sm opacity-90">{formattedTime}</span>
        </div>
        <h3 className="text-2xl font-bold mb-2">{match.title}</h3>
        <p className="text-white/90 text-lg">vs {match.opponent}</p>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{match.venue}</span>
          </div>
        </div>
        {match.description && (
          <p className="mt-4 text-gray-600 text-sm">{match.description}</p>
        )}
      </div>
    </div>
  )
}

function EditMatchModal({ match, onClose, onSuccess }: { match: Match; onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: match.title,
    opponent: match.opponent,
    match_date: new Date(match.match_date).toISOString().slice(0, 16),
    venue: match.venue,
    match_type: match.match_type,
    description: match.description || '',
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return

    setLoading(true)

    const slug = formData.title.toLowerCase().replace(/\s+/g, '-')
    
    const { error } = await supabase
      .from('matches')
      .update({
        title: formData.title,
        slug,
        opponent: formData.opponent,
        match_date: new Date(formData.match_date).toISOString(),
        venue: formData.venue,
        match_type: formData.match_type,
        description: formData.description,
      })
      .eq('id', match.id)

    setLoading(false)

    if (!error) {
      onSuccess()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Edit Match</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Match Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="League Championship Match"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Opponent *</label>
            <input
              type="text"
              required
              value={formData.opponent}
              onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="City Stars"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Match Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={formData.match_date}
                onChange={(e) => setFormData({ ...formData, match_date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Match Type *</label>
              <select
                required
                value={formData.match_type}
                onChange={(e) => setFormData({ ...formData, match_type: e.target.value as 'T20' | 'ODI' | 'Test' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="T20">T20</option>
                <option value="ODI">ODI</option>
                <option value="Test">Test</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Venue *</label>
            <input
              type="text"
              required
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Central Cricket Ground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
              placeholder="Important league match..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Match'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AddMatchModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    opponent: '',
    match_date: '',
    venue: '',
    match_type: 'T20',
    description: '',
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return

    setLoading(true)

    const slug = formData.title.toLowerCase().replace(/\s+/g, '-')
    
    const { error } = await supabase
      .from('matches')
      .insert([{
        title: formData.title,
        slug,
        opponent: formData.opponent,
        match_date: new Date(formData.match_date).toISOString(),
        venue: formData.venue,
        match_type: formData.match_type,
        description: formData.description,
      }])

    setLoading(false)

    if (!error) {
      onSuccess()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Add New Match</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Match Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="League Championship Match"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Opponent *</label>
            <input
              type="text"
              required
              value={formData.opponent}
              onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="City Stars"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Match Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={formData.match_date}
                onChange={(e) => setFormData({ ...formData, match_date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Match Type *</label>
              <select
                required
                value={formData.match_type}
                onChange={(e) => setFormData({ ...formData, match_type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="T20">T20</option>
                <option value="ODI">ODI</option>
                <option value="Test">Test</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Venue *</label>
            <input
              type="text"
              required
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Central Cricket Ground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={3}
              placeholder="Important league match..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Match'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
