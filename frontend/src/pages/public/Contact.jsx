import { useState } from "react";
import { Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-container">
      <section className="section-heading text-center">
        <span className="eyebrow">GET IN TOUCH</span>
        <h1>Contact Support & Feedback</h1>
        <p>Have questions about StreamHub or need assistance? Reach out to our team.</p>
      </section>

      <div className="contact-layout mt-8">
        <div className="contact-info-card">
          <h3>StreamHub Headquarters</h3>
          <p className="text-muted text-sm mt-2">
            Our engineers and customer support team are available 24/7.
          </p>

          <div className="contact-details-list mt-6">
            <div className="flex items-center gap-3">
              <Mail className="text-purple-400" size={20} />
              <span>support@streamhub.com</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <MessageCircle className="text-indigo-400" size={20} />
              <span>Live chat available on dashboard</span>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          {submitted ? (
            <div className="contact-success-state text-center py-10">
              <CheckCircle2 size={48} className="text-green-400 mx-auto mb-3" />
              <h3>Message Sent!</h3>
              <p className="text-muted mt-2">
                Thank you, {name}. A member of our team will get back to you at {email} within 24 hours.
              </p>
              <button className="btn btn-outline mt-4" onClick={() => setSubmitted(false)}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  className="form-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Question about subscription"
                  required
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows={4}
                  className="form-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary full-width">
                <Send size={16} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
