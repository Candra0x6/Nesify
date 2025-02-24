import { supabase } from "./supabase";

// Authentication utilities
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Database utilities
export const createRecord = async (table: string, data: any) => {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();
  return { data: result, error };
};

export const getRecords = async (table: string) => {
  const { data, error } = await supabase.from(table).select("*");
  return { data, error };
};

export const updateRecord = async (table: string, id: string, data: any) => {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq("id", id)
    .select();
  return { data: result, error };
};

export const deleteRecord = async (table: string, id: string) => {
  const { error } = await supabase.from(table).delete().eq("id", id);
  return { error };
};
