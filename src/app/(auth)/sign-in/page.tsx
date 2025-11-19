"use client";

import Link from "next/link";
import Image from "next/image";

import { authClient } from "@/lib/auth-client";

const SignIn = () => {
  return (
    <main className="sign-in">
      {/* Animated floating orb */}
      <div className="orb-2" />
      
      <div className="sign-in-container">
        {/* Left Section - Branding */}
        <section className="brand-section">
          

          <h2 className="tagline">
            Record. Share. Collaborate.
          </h2>

         

          

            

            
         

          
           
            
         
        </section>

        {/* Right Section - Sign In Card */}
        <section className="auth-section">
          <div className="auth-card">
            <div className="card-glow" />
            
            <div className="card-header">
              <div className="logo-small">
                
                <h2>RecordIt</h2>
              </div>
              <h3>Welcome back</h3>
              <p>Sign in to start creating amazing screen recordings</p>
            </div>

            <button
              className="sign-in-button"
              onClick={async () => {
                return await authClient.signIn.social({
                  provider: "google",
                });
              }}
            >
              <Image
                src="/assets/icons/google.svg"
                alt="Google"
                width={20}
                height={20}
              />
              <span>Continue with Google</span>
            </button>

            <div className="divider">
              <div className="line" />
              <span>or</span>
              <div className="line" />
            </div>

            <div className="social-buttons">
              <button
              className="sign-in-button"
              onClick={async () => {
                return await authClient.signIn.social({
                  provider: "github",
                });
              }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span>Continue with GitHub</span>
              </button>
            </div>

            <p className="footer-text">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignIn;