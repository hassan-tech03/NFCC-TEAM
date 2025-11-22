"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase.client";
import { isAdmin } from "@/lib/supabase.auth";

interface Player {
  id: string;
  name: string;
  slug: string;
  photo_url?: string;
  role: "batsman" | "bowler" | "all-rounder" | "wicket-keeper";
  batting_style?: string;
  bowling_style?: string;
  age?: number;
  jersey_number?: number;
  stats?: any;
  seasonStats?: {
    matches: number;
    runs: number;
    ballsPlayed: number;
    fifties: number;
    hundreds: number;
    notOuts: number;
    wickets: number;
    fiveWickets: number;
    tenWickets: number;
    catches: number;
    stumpings: number;
    runouts: number;
  };
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    loadPlayers();
    checkAdmin();
  }, []);

  async function loadPlayers() {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get players
    const { data: playersData, error } = await supabase
      .from("players")
      .select("*")
      .order("name", { ascending: true });

    if (error || !playersData) {
      setLoading(false);
      return;
    }

    // Get current season
    const { data: currentSeason } = await supabase
      .from("seasons")
      .select("id")
      .eq("is_current", true)
      .single();

    if (!currentSeason) {
      setPlayers(playersData);
      setLoading(false);
      return;
    }

    // Get season stats for all players
    const { data: seasonStats } = await supabase
      .from("player_season_stats")
      .select("*")
      .eq("season_id", currentSeason.id);

    // Calculate stats for each player
    const playersWithStats = playersData.map((player) => {
      const playerStats = seasonStats?.filter((s) => s.player_id === player.id) || [];
      
      return {
        ...player,
        seasonStats: {
          matches: playerStats.length,
          runs: playerStats.reduce((sum, s) => sum + (s.runs || 0), 0),
          ballsPlayed: playerStats.reduce((sum, s) => sum + (s.balls_played || 0), 0),
          fifties: playerStats.filter((s) => s.is_fifty).length,
          hundreds: playerStats.filter((s) => s.is_hundred).length,
          notOuts: playerStats.filter((s) => s.not_out).length,
          wickets: playerStats.reduce((sum, s) => sum + (s.wickets || 0), 0),
          fiveWickets: playerStats.filter((s) => s.is_five_wicket).length,
          tenWickets: playerStats.filter((s) => s.is_ten_wicket).length,
          catches: playerStats.reduce((sum, s) => sum + (s.catches || 0), 0),
          stumpings: playerStats.reduce((sum, s) => sum + (s.stumpings || 0), 0),
          runouts: playerStats.reduce((sum, s) => sum + (s.runouts || 0), 0),
        },
      };
    });

    setPlayers(playersWithStats);
    setLoading(false);
  }

  async function checkAdmin() {
    const admin = await isAdmin();
    setIsAdminUser(admin);
  }

  const groupedPlayers = {
    batsman: players.filter((p) => p.role === "batsman"),
    bowler: players.filter((p) => p.role === "bowler"),
    "all-rounder": players.filter((p) => p.role === "all-rounder"),
    "wicket-keeper": players.filter((p) => p.role === "wicket-keeper"),
  };

  const filteredPlayers =
    selectedRole === "all"
      ? players
      : players.filter((p) => p.role === selectedRole);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Our Squad
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Meet the talented players of our team
          </p>
        </div>

        {/* Admin Controls */}
        {isAdminUser && (
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Player
            </button>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {["all", "batsman", "bowler", "all-rounder", "wicket-keeper"].map(
            (role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedRole === role
                    ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                }`}
              >
                {role === "all"
                  ? "All Players"
                  : role
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                s
              </button>
            )
          )}
        </div>

        {/* Players Grid */}
        {filteredPlayers.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏏</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              No Players Yet
            </h2>
            <p className="text-gray-500">
              {isAdminUser
                ? 'Click "Add Player" to add your first player!'
                : "Players will appear here soon."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                isAdmin={isAdminUser}
                onUpdate={loadPlayers}
                onClick={() => setSelectedPlayer(player)}
              />
            ))}
          </div>
        )}

        {/* Add Player Modal */}
        {showAddForm && (
          <AddPlayerModal
            onClose={() => setShowAddForm(false)}
            onSuccess={() => {
              setShowAddForm(false);
              loadPlayers();
            }}
          />
        )}

        {/* Player Stats Popup */}
        {selectedPlayer && (
          <PlayerStatsPopup
            player={selectedPlayer}
            onClose={() => setSelectedPlayer(null)}
          />
        )}
      </div>
    </div>
  );
}

function PlayerCard({
  player,
  isAdmin,
  onUpdate,
  onClick,
}: {
  player: Player;
  isAdmin: boolean;
  onUpdate: () => void;
  onClick: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!supabase) return;

    setDeleting(true);

    const { error } = await supabase
      .from("players")
      .delete()
      .eq("id", player.id);

    setDeleting(false);

    if (!error) {
      setShowDeleteConfirm(false);
      onUpdate();
    } else {
      alert("Error deleting player: " + error.message);
    }
  }

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Jersey Number Badge */}
      {player.jersey_number && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-br from-primary-600 to-primary-700 text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
          {player.jersey_number}
        </div>
      )}

      {/* Admin Menu */}
      {isAdmin && (
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
          {showMenu && (
            <div className="absolute top-12 left-0 bg-white rounded-lg shadow-xl py-2 min-w-[120px] z-20">
              <button
                onClick={() => {
                  setShowEditModal(true);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(true);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditPlayerModal
          player={player}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            onUpdate();
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            {/* Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-center mb-2">
              Delete Player?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">{player.name}</span>
              ? This action cannot be undone.
            </p>

            {/* Buttons */}
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
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Player Photo */}
      <div className="relative h-80 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
        {player.photo_url ? (
          <Image
            src={player.photo_url}
            alt={player.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🏏
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Player Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1 text-gray-900">{player.name}</h3>
        <p className="text-primary-600 font-medium capitalize mb-4">
          {player.role.replace("-", " ")}
        </p>

        {/* Season Stats */}
        {player.seasonStats && player.seasonStats.matches > 0 ? (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <div className="text-gray-500 text-xs">Matches</div>
                <div className="font-bold text-lg">{player.seasonStats.matches}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <div className="text-gray-500 text-xs">Runs</div>
                <div className="font-bold text-lg">{player.seasonStats.runs}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <div className="text-gray-500 text-xs">Wkts</div>
                <div className="font-bold text-lg">{player.seasonStats.wickets}</div>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="w-full bg-primary-50 hover:bg-primary-100 text-primary-700 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              View Full Stats →
            </button>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500 text-sm">
            No stats for current season
          </div>
        )}

        {/* Styles */}
        <div className="mt-4 flex flex-wrap gap-2">
          {player.batting_style && (
            <span className="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-medium">
              {player.batting_style === "right-hand" ? "RHB" : "LHB"}
            </span>
          )}
          {player.bowling_style && player.bowling_style !== "na" && (
            <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
              {player.bowling_style.split("-")[0].toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function EditPlayerModal({
  player,
  onClose,
  onSuccess,
}: {
  player: Player;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: player.name,
    role: player.role as "batsman" | "bowler" | "all-rounder" | "wicket-keeper",
    batting_style: player.batting_style || "right-hand",
    bowling_style: player.bowling_style || "na",
    age: player.age?.toString() || "",
    jersey_number: player.jersey_number?.toString() || "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;

    setLoading(true);

    const slug = formData.name.toLowerCase().replace(/\s+/g, "-");

    const { error } = await supabase
      .from("players")
      .update({
        name: formData.name,
        slug,
        role: formData.role,
        batting_style: formData.batting_style,
        bowling_style: formData.bowling_style,
        age: formData.age ? parseInt(formData.age) : null,
        jersey_number: formData.jersey_number
          ? parseInt(formData.jersey_number)
          : null,
      })
      .eq("id", player.id);

    setLoading(false);

    if (!error) {
      onSuccess();
    } else {
      alert("Error updating player: " + error.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Edit Player</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Player Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter player name"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <select
              required
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as
                    | "batsman"
                    | "bowler"
                    | "all-rounder"
                    | "wicket-keeper",
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="batsman">Batsman</option>
              <option value="bowler">Bowler</option>
              <option value="all-rounder">All-rounder</option>
              <option value="wicket-keeper">Wicket-keeper</option>
            </select>
          </div>

          {/* Age and Jersey Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jersey Number
              </label>
              <input
                type="number"
                value={formData.jersey_number}
                onChange={(e) =>
                  setFormData({ ...formData, jersey_number: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="10"
              />
            </div>
          </div>

          {/* Batting Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batting Style
            </label>
            <select
              value={formData.batting_style}
              onChange={(e) =>
                setFormData({ ...formData, batting_style: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="right-hand">Right-hand</option>
              <option value="left-hand">Left-hand</option>
            </select>
          </div>

          {/* Bowling Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bowling Style
            </label>
            <select
              value={formData.bowling_style}
              onChange={(e) =>
                setFormData({ ...formData, bowling_style: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="na">N/A</option>
              <option value="right-arm-fast">Right-arm Fast</option>
              <option value="left-arm-fast">Left-arm Fast</option>
              <option value="right-arm-medium">Right-arm Medium</option>
              <option value="left-arm-medium">Left-arm Medium</option>
              <option value="right-arm-spin">Right-arm Spin</option>
              <option value="left-arm-spin">Left-arm Spin</option>
            </select>
          </div>

          {/* Buttons */}
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
              {loading ? "Updating..." : "Update Player"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddPlayerModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    role: "batsman",
    batting_style: "right-hand",
    bowling_style: "na",
    age: "",
    jersey_number: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;

    setLoading(true);

    const slug = formData.name.toLowerCase().replace(/\s+/g, "-");

    const { error } = await supabase.from("players").insert([
      {
        name: formData.name,
        slug,
        role: formData.role,
        batting_style: formData.batting_style,
        bowling_style: formData.bowling_style,
        age: formData.age ? parseInt(formData.age) : null,
        jersey_number: formData.jersey_number
          ? parseInt(formData.jersey_number)
          : null,
        stats: {
          matches: 0,
          runs: 0,
          wickets: 0,
          average: 0,
          strikeRate: 0,
          highestScore: 0,
          hundreds: 0,
          fifties: 0,
        },
      },
    ]);

    setLoading(false);

    if (!error) {
      onSuccess();
    } else {
      alert("Error adding player: " + error.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Add New Player</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Player Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter player name"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <select
              required
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="batsman">Batsman</option>
              <option value="bowler">Bowler</option>
              <option value="all-rounder">All-rounder</option>
              <option value="wicket-keeper">Wicket-keeper</option>
            </select>
          </div>

          {/* Age and Jersey Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jersey Number
              </label>
              <input
                type="number"
                value={formData.jersey_number}
                onChange={(e) =>
                  setFormData({ ...formData, jersey_number: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="10"
              />
            </div>
          </div>

          {/* Batting Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batting Style
            </label>
            <select
              value={formData.batting_style}
              onChange={(e) =>
                setFormData({ ...formData, batting_style: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="right-hand">Right-hand</option>
              <option value="left-hand">Left-hand</option>
            </select>
          </div>

          {/* Bowling Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bowling Style
            </label>
            <select
              value={formData.bowling_style}
              onChange={(e) =>
                setFormData({ ...formData, bowling_style: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="na">N/A</option>
              <option value="right-arm-fast">Right-arm Fast</option>
              <option value="left-arm-fast">Left-arm Fast</option>
              <option value="right-arm-medium">Right-arm Medium</option>
              <option value="left-arm-medium">Left-arm Medium</option>
              <option value="right-arm-spin">Right-arm Spin</option>
              <option value="left-arm-spin">Left-arm Spin</option>
            </select>
          </div>

          {/* Buttons */}
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
              {loading ? "Adding..." : "Add Player"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PlayerStatsPopup({ player, onClose }: { player: Player; onClose: () => void }) {
  const stats = player.seasonStats;

  if (!stats) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-1">{player.name}</h2>
              <p className="text-primary-100 capitalize">{player.role.replace('-', ' ')}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Content */}
        <div className="p-6 space-y-6">
          {/* Batting Stats */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏏</span>
              Batting Statistics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatCard label="Matches" value={stats.matches} />
              <StatCard label="Runs" value={stats.runs} highlight />
              <StatCard label="Balls" value={stats.ballsPlayed} />
              <StatCard label="50s" value={stats.fifties} />
              <StatCard label="100s" value={stats.hundreds} />
              <StatCard label="Not Outs" value={stats.notOuts} />
            </div>
          </div>

          {/* Bowling Stats */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Bowling Statistics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatCard label="Wickets" value={stats.wickets} highlight />
              <StatCard label="5-Wicket Hauls" value={stats.fiveWickets} />
              <StatCard label="10-Wicket Hauls" value={stats.tenWickets} />
            </div>
          </div>

          {/* Fielding Stats */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🧤</span>
              Fielding Statistics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatCard label="Catches" value={stats.catches} />
              <StatCard label="Stumpings" value={stats.stumpings} />
              <StatCard label="Run Outs" value={stats.runouts} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
          <p className="text-sm text-gray-600 text-center">
            Current Season Statistics • Updated in real-time
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? 'bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200' : 'bg-gray-50'}`}>
      <div className={`text-xs font-medium mb-1 ${highlight ? 'text-primary-700' : 'text-gray-600'}`}>
        {label}
      </div>
      <div className={`text-2xl font-bold ${highlight ? 'text-primary-700' : 'text-gray-900'}`}>
        {value}
      </div>
    </div>
  );
}
