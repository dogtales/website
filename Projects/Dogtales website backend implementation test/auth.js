import { SUPABASE_URL, SUPABASE_KEY } from './supabase-config.js';

export const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentUser = null;

export function getCurrentUser() {
    return currentUser;
}

export function updateAuthUI(user, prefillProfile) {
    currentUser = user;
    if (user) prefillProfile(user);
    // Update UI as needed (show/hide elements, etc.)
}

export async function handleSignUp(email, password, showModalError) {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) showModalError(error.message);
    // else: show success message or switch to sign-in tab
}

export async function handleSignIn(email, password, showModalError) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) showModalError(error.message);
}

export async function handleOAuthSignIn(provider, showModalError) {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: { redirectTo: window.location.href }
    });
    if (error) showModalError(error.message);
}

export async function handleSignOut(showModalError) {
    const { error } = await supabase.auth.signOut();
    if (error) showModalError(error.message);
}

export function listenForAuthChanges(updateAuthUI, prefillProfile) {
    supabase.auth.getUser().then(({ data: { user } }) => {
        updateAuthUI(user, prefillProfile);
    });
    supabase.auth.onAuthStateChange((event, session) => {
        updateAuthUI(session?.user, prefillProfile);
    });
}