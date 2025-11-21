# Fix Stats Table - Quick Guide

## Problem 1: Can't Add Balls, Overs, Runs Conceded

**Solution:** You need to add the new columns to your database.

### Step 1: Run This SQL in Supabase

1. Open Supabase Dashboard → SQL Editor
2. Copy and paste this SQL:

```sql
-- Add new columns to player_season_stats table
ALTER TABLE player_season_stats 
ADD COLUMN IF NOT EXISTS balls_played INTEGER DEFAULT 0;

ALTER TABLE player_season_stats 
ADD COLUMN IF NOT EXISTS overs_bowled NUMERIC(4,1) DEFAULT 0;

ALTER TABLE player_season_stats 
ADD COLUMN IF NOT EXISTS runs_conceded INTEGER DEFAULT 0;
```

3. Click "Run"
4. Refresh your stats page

**OR** use the file `add-new-columns.sql` - it has the same SQL ready to run.

---

## Problem 2: Table is Compressed

**Solution:** ✅ FIXED! I've updated the table styling:

### Changes Made:
- ✅ Increased padding from `px-4 py-3` to `px-6 py-4` (more space)
- ✅ Added `min-w-max` to table (prevents compression)
- ✅ Added `whitespace-nowrap` to cells (prevents text wrapping)
- ✅ Added `min-w-[150px]` to Opponent column (wider for names)
- ✅ Table now scrolls horizontally if needed

### Result:
- Much more spacious and readable
- Columns don't squeeze together
- Better for data entry
- Professional look

---

## How to Test

1. **Run the SQL** to add columns
2. **Refresh** the stats page
3. **Select** a season and player
4. **Click "Add Match"**
5. **Click any cell** to edit
6. **Try entering:**
   - Runs: 45
   - Balls: 32
   - Wickets: 2
   - Overs: 3.2
   - Runs Conceded: 28

Everything should work now! 🎉

---

## Troubleshooting

### Still can't edit?
- Make sure you're logged in as admin
- Check browser console (F12) for errors
- Verify columns exist: Run `SELECT * FROM player_season_stats LIMIT 1;`

### Table still compressed?
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- The table will scroll horizontally on smaller screens (this is normal)

### Overs showing as integer?
- The database column is NUMERIC(4,1) which allows decimals
- You can enter 3.2, 4.5, etc.
- It will display correctly
