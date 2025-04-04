import { SupabaseClient } from '@supabase/supabase-js';
import { Database, Tables } from '../../../database.types';

export type UsersNote = Tables<'users_note'>;
export type UserStatistice = Tables<'user_statistics'>;

export type Supabse = SupabaseClient<Database>;
