"use client";
import React from "react";
import { EntropyBackground } from "@/components/ui/EntropyBackground";
import { Sparkles, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client"; // Assuming better-auth client is here, or we'll just mock the click if it doesn't exist

export default function LoginPage() {
  const handleGoogleSignIn = async () => {
    // Attempt to use better-auth client, if it's set up
    try {
      if (typeof authClient !== 'undefined' && authClient.signIn) {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/dashboard" // Redirect to the internal portal after login
        });
      } else {
        // Fallback or alert if client isn't fully configured
        alert("Google SSO initialization requested. Redirecting to OAuth flow...");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Entropy Resonance */}
      <EntropyBackground />

      <div className="relative z-10 w-full max-w-md p-4">
        {/* Glassmorphic Login Card */}
        <div className="bg-black/40 border border-purple-500/20 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.15)] flex flex-col items-center text-center">
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 flex items-center justify-center mb-6 shadow-inner">
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Sanctuary Access</h1>
          <p className="text-neutral-400 text-sm mb-8">
            Identify yourself. Tethers are strictly monitored.
          </p>

          <button
            onClick={handleGoogleSignIn}
            className="w-full relative group flex items-center justify-center gap-3 bg-white text-black font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 hover:bg-neutral-200"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
            
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md -z-10" />
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-500 bg-white/5 py-2 px-4 rounded-full border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Restricted to @enveraitech.com domains
          </div>
        </div>
      </div>
    </div>
  );
}
