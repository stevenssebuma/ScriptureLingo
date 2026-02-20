import { supabase } from '@/lib/supabase';

export interface DailyUsage {
  id: string;
  user_id: string;
  date: string;
  minutes_spent: number;
  created_at: string;
  updated_at: string;
}

export interface UserGoal {
  id: string;
  user_id: string;
  daily_goal_minutes: number;
  min_weekly_minutes: number;
  max_weekly_minutes: number;
  created_at: string;
  updated_at: string;
}

const MIN_WEEKLY_MINUTES = 35;
const MAX_WEEKLY_MINUTES = 105;

/**
 * Gets the user's daily goal settings
 */
export async function getUserGoal(userId: string): Promise<UserGoal | null> {
  try {
    const { data, error } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user goal:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserGoal:', error);
    return null;
  }
}

/**
 * Updates or creates user's daily goal
 */
export async function setUserGoal(
  userId: string,
  dailyGoalMinutes: number
): Promise<UserGoal | null> {
  try {
    const existingGoal = await getUserGoal(userId);

    if (existingGoal) {
      const { data, error } = await supabase
        .from('user_goals')
        .update({
          daily_goal_minutes: dailyGoalMinutes,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('user_goals')
        .insert({
          user_id: userId,
          daily_goal_minutes: dailyGoalMinutes,
          min_weekly_minutes: MIN_WEEKLY_MINUTES,
          max_weekly_minutes: MAX_WEEKLY_MINUTES,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Error in setUserGoal:', error);
    return null;
  }
}

/**
 * Records time spent on learning
 */
export async function logUsageTime(userId: string, minutesSpent: number): Promise<boolean> {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { data: existing } = await supabase
      .from('daily_usage')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    if (existing) {
      const { error } = await supabase
        .from('daily_usage')
        .update({
          minutes_spent: existing.minutes_spent + minutesSpent,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      return !error;
    } else {
      const { error } = await supabase.from('daily_usage').insert({
        user_id: userId,
        date: today,
        minutes_spent: minutesSpent,
      });

      return !error;
    }
  } catch (error) {
    console.error('Error logging usage time:', error);
    return false;
  }
}

/**
 * Gets total minutes spent this week (last 7 days)
 */
export async function getWeeklyUsage(userId: string): Promise<number> {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const startDate = sevenDaysAgo.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('daily_usage')
      .select('minutes_spent')
      .eq('user_id', userId)
      .gte('date', startDate);

    if (error) {
      console.error('Error fetching weekly usage:', error);
      return 0;
    }

    return data.reduce((total, record) => total + (record.minutes_spent || 0), 0);
  } catch (error) {
    console.error('Error in getWeeklyUsage:', error);
    return 0;
  }
}

/**
 * Checks if user can start a new session without violating limits
 * Returns { canStart: boolean, reason?: string, weeklyTotal: number }
 */
export async function canStartSession(
  userId: string,
  sessionMinutes: number
): Promise<{
  canStart: boolean;
  reason?: string;
  weeklyTotal: number;
  minWeekly: number;
  maxWeekly: number;
}> {
  try {
    const weeklyTotal = await getWeeklyUsage(userId);
    const newWeeklyTotal = weeklyTotal + sessionMinutes;

    if (newWeeklyTotal > MAX_WEEKLY_MINUTES) {
      return {
        canStart: false,
        reason: `Starting this session would exceed your weekly limit of ${MAX_WEEKLY_MINUTES} minutes. Current: ${weeklyTotal} min.`,
        weeklyTotal,
        minWeekly: MIN_WEEKLY_MINUTES,
        maxWeekly: MAX_WEEKLY_MINUTES,
      };
    }

    return {
      canStart: true,
      weeklyTotal,
      minWeekly: MIN_WEEKLY_MINUTES,
      maxWeekly: MAX_WEEKLY_MINUTES,
    };
  } catch (error) {
    console.error('Error in canStartSession:', error);
    return {
      canStart: true, // Allow on error to not block user
      weeklyTotal: 0,
      minWeekly: MIN_WEEKLY_MINUTES,
      maxWeekly: MAX_WEEKLY_MINUTES,
    };
  }
}

/**
 * Gets today's usage
 */
export async function getTodayUsage(userId: string): Promise<number> {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('daily_usage')
      .select('minutes_spent')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching today usage:', error);
    }

    return data?.minutes_spent || 0;
  } catch (error) {
    console.error('Error in getTodayUsage:', error);
    return 0;
  }
}

/**
 * Gets weekly usage stats including how much more is needed
 */
export async function getWeeklyStats(userId: string): Promise<{
  weeklyTotal: number;
  remainingToMin: number;
  remainingToMax: number;
  minMet: boolean;
  maxReached: boolean;
}> {
  try {
    const weeklyTotal = await getWeeklyUsage(userId);
    const remainingToMin = Math.max(0, MIN_WEEKLY_MINUTES - weeklyTotal);
    const remainingToMax = Math.max(0, MAX_WEEKLY_MINUTES - weeklyTotal);

    return {
      weeklyTotal,
      remainingToMin,
      remainingToMax,
      minMet: weeklyTotal >= MIN_WEEKLY_MINUTES,
      maxReached: weeklyTotal >= MAX_WEEKLY_MINUTES,
    };
  } catch (error) {
    console.error('Error in getWeeklyStats:', error);
    return {
      weeklyTotal: 0,
      remainingToMin: MIN_WEEKLY_MINUTES,
      remainingToMax: MAX_WEEKLY_MINUTES,
      minMet: false,
      maxReached: false,
    };
  }
}
