"use client";


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
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignIn;