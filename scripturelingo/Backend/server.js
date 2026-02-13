import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ===============================
   Supabase Admin Client (Backend)
   =============================== */

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // NEVER expose this to frontend
);

/* ===============================
   Middleware: Verify JWT
   =============================== */

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = data.user;
  next();
};

/* ===============================
   Routes
   =============================== */

// Health check
app.get("/", (req, res) => {
  res.json({ message: "ScriptureLingo Backend Running 🚀" });
});

// Complete lesson (XP logic)
app.post("/complete-lesson", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { xpEarned } = req.body;

    // Get current profile
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("xp, level, streak, last_completed")
      .eq("id", userId)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    let newXP = profile.xp + xpEarned;

    // Simple leveling formula
    let newLevel = Math.floor(newXP / 100) + 1;

    let newStreak = profile.streak;

    const today = new Date().toISOString().split("T")[0];

    if (profile.last_completed !== today) {
      newStreak += 1;
    }

    await supabase
      .from("profiles")
      .update({
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        last_completed: today,
      })
      .eq("id", userId);

    res.json({
      success: true,
      xp: newXP,
      level: newLevel,
      streak: newStreak,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ===============================
   Start Server
   =============================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
