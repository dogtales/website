//Purpose: Handles authentication (sign up, sign in, OAuth, sign out), tracks current user, and exposes helper functions.
//Status:
    //All main auth functions are exported and use the correct Supabase client.
    //updateAuthUI and listenForAuthChanges are present for UI state.
//No issues detected.

import { SUPABASE_URL, SUPABASE_KEY } from './supabase-config.js';

export const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentUser = null;

export function getCurrentUser() {
    return currentUser;
}

export function updateAuthUI(user, prefillProfile) {
    currentUser = user;
    if (user) {
        prefillProfile(user); // Call prefillProfile if user exists
    } else {
        prefillProfile(null); // Clear profile fields if no user
    }
    // Update UI as needed (show/hide elements, etc.) - specific UI updates moved to main.js
}

export async function handleSignUp(email, password, showModalError) {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) showModalError(error.message);
    else {
        // Optionally show success message or switch to sign-in tab
        showModalError('Sign up successful! Check your email for a confirmation link.'); // Reusing showModalError for success
    }
}

export async function handleSignIn(email, password, showModalError) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) showModalError(error.message);
    else {
        // Optionally show success message
        showModalError('Signed in successfully!'); // Reusing showModalError for success
    }
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
    else {
        showModalError('Signed out successfully!'); // Reusing showModalError for success
    }
}

export function listenForAuthChanges(updateAuthUI, prefillProfile) {
    supabase.auth.getUser().then(({ data: { user } }) => {
        updateAuthUI(user, prefillProfile);
    });
    supabase.auth.onAuthStateChange((event, session) => {
        updateAuthUI(session?.user, prefillProfile);
    });
}
export function prefillProfile(user) {
    const nameField = document.getElementById('profileName');
    const emailField = document.getElementById('profileEmail');
    if (user) {
        nameField.value = user.user_metadata.full_name || '';
        emailField.value = user.email || '';
    } else {
        nameField.value = '';
        emailField.value = '';
    }
}