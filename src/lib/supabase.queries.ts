import { supabase } from "./supabase.client";

// Dummy data for when Supabase is not configured
const dummyData = {
  settings: {
    team_name: "New Friends Cricket Club",
    team_logo_url:
      "https://res.cloudinary.com/dfy225ucr/image/upload/v1763752913/NFCC_qrgele.jpg",
    tagline: "Excellence in Cricket",
    description:
      "A passionate cricket team dedicated to excellence both on and off the field.",
    contact_email: "info@nfcc.com",
    social_links: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
    },
  },
  players: [
    {
      id: "1",
      name: "John Smith",
      slug: "john-smith",
      role: "batsman",
      stats: { matches: 45, runs: 2340 },
    },
    {
      id: "2",
      name: "Mike Johnson",
      slug: "mike-johnson",
      role: "bowler",
      stats: { matches: 42, runs: 890 },
    },
    {
      id: "3",
      name: "David Brown",
      slug: "david-brown",
      role: "all-rounder",
      stats: { matches: 50, runs: 1560 },
    },
  ],
  stats: {
    totalPlayers: 15,
    matchesWon: 12,
    totalMatches: 20,
    upcomingMatches: 3,
  },
};

// Settings
export async function getSettings() {
  if (!supabase) {
    console.log("⚠️ Supabase not configured, using dummy data");
    return dummyData.settings;
  }

  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    // console.error('❌ Error fetching settings:', error)
    console.log("Using dummy data for settings");
    return dummyData.settings;
  }

  if (!data) {
    console.log("No settings found in database, using dummy data");
    return dummyData.settings;
  }

  console.log("✅ Settings loaded from database:", data);
  return data;
}

// Players
export async function getPlayers() {
  if (!supabase) return dummyData.players;

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching players:", error);
    return dummyData.players;
  }

  return data || [];
}

export async function getFeaturedPlayers() {
  if (!supabase) return dummyData.players;

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("is_featured", true)
    .order("name", { ascending: true })
    .limit(3);

  if (error) {
    console.error("Error fetching featured players:", error);
    return dummyData.players;
  }

  return data || [];
}

export async function getPlayerBySlug(slug: string) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching player:", error);
    return null;
  }

  return data;
}

// Matches (Upcoming)
export async function getUpcomingMatches() {
  if (!supabase) return [];

  // Get current date/time to filter out past matches
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .gte("match_date", now)
    .order("match_date", { ascending: true });

  if (error) {
    console.error("Error fetching matches:", error);
    return [];
  }

  return data || [];
}

export async function getNextMatch() {
  if (!supabase) {
    return {
      id: "1",
      title: "League Championship Match",
      opponent: "City Stars",
      match_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      venue: "Central Cricket Ground",
      match_type: "T20",
    };
  }

  // Get current date/time to filter out past matches
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .gte("match_date", now)
    .order("match_date", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching next match:", error);
    return null;
  }

  return data;
}

export async function getMatchBySlug(slug: string) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("matches")
    .select(
      `
      *,
      match_squad (
        player:players (*)
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching match:", error);
    return null;
  }

  return data;
}

// Previous Matches (Results)
export async function getPreviousMatches() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("previous_matches")
    .select("*")
    .order("match_date", { ascending: false });

  if (error) {
    console.error("Error fetching previous matches:", error);
    return [];
  }

  return data || [];
}

export async function getRecentMatches() {
  if (!supabase) {
    return [
      {
        id: "1",
        title: "Quarter Final",
        opponent: "Eagles CC",
        result: "won",
        our_score: "185/7",
        opponent_score: "178/9",
        match_date: new Date(
          Date.now() - 5 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
      {
        id: "2",
        title: "League Match",
        opponent: "Warriors XI",
        result: "won",
        our_score: "220/6",
        opponent_score: "215/8",
        match_date: new Date(
          Date.now() - 12 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
      {
        id: "3",
        title: "Friendly Match",
        opponent: "Lions CC",
        result: "lost",
        our_score: "165/9",
        opponent_score: "168/5",
        match_date: new Date(
          Date.now() - 20 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
    ];
  }

  const { data, error } = await supabase
    .from("previous_matches")
    .select("*")
    .order("match_date", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching recent matches:", error);
    return [];
  }

  return data || [];
}

export async function getPreviousMatchBySlug(slug: string) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("previous_matches")
    .select(
      `
      *,
      man_of_match:players!man_of_match_id (*),
      top_performers (
        performance,
        player:players (*)
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching previous match:", error);
    return null;
  }

  return data;
}

// News
export async function getNews() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching news:", error);
    return [];
  }

  return data || [];
}

export async function getFeaturedNews() {
  if (!supabase) {
    return [
      {
        id: "1",
        title: "Team Wins Championship Quarter Final",
        slug: "championship-quarter-final",
        excerpt:
          "Thunder Cricket Club secures a thrilling victory in the quarter finals with an outstanding team performance.",
        published_at: new Date(
          Date.now() - 3 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
      {
        id: "2",
        title: "New Players Join the Squad",
        slug: "new-players-announcement",
        excerpt:
          "We are excited to welcome three talented players to our squad for the upcoming season.",
        published_at: new Date(
          Date.now() - 10 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
      {
        id: "3",
        title: "Training Camp Schedule Announced",
        slug: "training-camp-schedule",
        excerpt:
          "Pre-season training camp dates have been finalized. All players are expected to attend.",
        published_at: new Date(
          Date.now() - 15 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
    ];
  }

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching featured news:", error);
    return [];
  }

  return data || [];
}

export async function getNewsBySlug(slug: string) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching news:", error);
    return null;
  }

  return data;
}

// Stats
export async function getStats() {
  if (!supabase) return dummyData.stats;

  const [playersCount, upcomingCount, wonCount, totalCount] = await Promise.all(
    [
      supabase.from("players").select("*", { count: "exact", head: true }),
      supabase
        .from("matches")
        .select("*", { count: "exact", head: true })
        .gte("match_date", new Date().toISOString()),
      supabase
        .from("previous_matches")
        .select("*", { count: "exact", head: true })
        .eq("result", "won"),
      supabase
        .from("previous_matches")
        .select("*", { count: "exact", head: true }),
    ]
  );

  return {
    totalPlayers: playersCount.count || 0,
    upcomingMatches: upcomingCount.count || 0,
    matchesWon: wonCount.count || 0,
    totalMatches: totalCount.count || 0,
  };
}
