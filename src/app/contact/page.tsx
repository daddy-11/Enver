"use client";

import { Navigation } from "@/components/layout/Navigation";
import Image from "next/image";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <Navigation />
      <main>
        <div className="page active" id="page-contact">
          <div className="section reveal in">
            <div className="s-eyebrow">Contact</div>
            <h2 className="s-h2">Get in touch</h2>
            <p className="s-sub">Request early access, discuss a custom project, or just ask a question. Every message is reviewed within 48 hours.</p>
            
            <div className="contact-grid">
              <div className="c-info">
                <div className="c-item">
                  <i className="ti ti-mail c-item-icon" aria-hidden="true"></i>
                  <div><h4>Email</h4><p>hello@enver-ai.tech</p></div>
                </div>
                <div className="c-item">
                  <i className="ti ti-clock c-item-icon" aria-hidden="true"></i>
                  <div><h4>Response time</h4><p>Within 48 hours, usually faster</p></div>
                </div>
                <div className="c-item">
                  <i className="ti ti-lock c-item-icon" aria-hidden="true"></i>
                  <div><h4>Access model</h4><p>All products are invite-only. Fill the form to apply.</p></div>
                </div>
                <div className="c-item">
                  <i className="ti ti-code c-item-icon" aria-hidden="true"></i>
                  <div><h4>Custom builds</h4><p>Small number of engagements taken each quarter.</p></div>
                </div>
                
                <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius)', padding: '1.25rem', marginTop: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '.5rem' }}>
                    <Image src="/logo.png" alt="Enver AI Tech" width={20} height={20} style={{ objectFit: 'contain' }} />
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Enver AI Tech</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 12, fontFamily: 'var(--mono)' }}>enver-ai.tech &middot; hello@enver-ai.tech</p>
                </div>
              </div>
              
              <form className="contact-form" id="cform" onSubmit={handleSubmit}>
                <div className="cf-row">
                  <div className="cf-field">
                    <label>First name</label>
                    <input type="text" placeholder="Ahmed" />
                  </div>
                  <div className="cf-field">
                    <label>Last name</label>
                    <input type="text" placeholder="Rahman" />
                  </div>
                </div>
                <div className="cf-field">
                  <label>Email</label>
                  <input type="email" placeholder="you@company.com" />
                </div>
                <div className="cf-field">
                  <label>I&#39;m interested in</label>
                  <select>
                    <option>Early access to a product</option>
                    <option>Custom AI product build</option>
                    <option>Partnership or integration</option>
                    <option>General enquiry</option>
                  </select>
                </div>
                <div className="cf-field">
                  <label>Message</label>
                  <textarea rows={4} placeholder="Tell us what you're building..."></textarea>
                </div>
                <button type="submit" className="cf-submit">Send message</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
