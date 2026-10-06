import React, { useState } from 'react';
import { api } from '../services/api';

export const ContactView: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const email = 'dhoreniraj83@gmail.com';

  // Form State
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status & Validation State
  const [statusNotice, setStatusNotice] = useState<{
    type: 'success' | 'error';
    heading: string;
    text: string;
  } | null>(null);

  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string; subject?: string; message?: string } = {};

    if (!name.trim()) {
      errors.name = 'Please provide your name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(userEmail.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!subject.trim()) {
      errors.subject = 'Please provide a subject.';
    }

    if (!message.trim()) {
      errors.message = 'Please provide a message.';
    } else if (message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusNotice(null);

    if (!validateForm()) {
      setStatusNotice({
        type: 'error',
        heading: 'Submission Error',
        text: 'Please review and resolve the errors highlighted below.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitContact({
        name: name.trim(),
        email: userEmail.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

      if (res.success) {
        setStatusNotice({
          type: 'success',
          heading: 'Message Sent',
          text: 'Thank you for reaching out! Your message was received and I will reply to your email promptly.',
        });
        setName('');
        setUserEmail('');
        setSubject('');
        setMessage('');
        setFieldErrors({});
      } else {
        setStatusNotice({
          type: 'error',
          heading: 'Submission Failed',
          text: res.message || 'Unable to submit your message at this time. Please try again shortly.',
        });
      }
    } catch {
      setStatusNotice({
        type: 'error',
        heading: 'Network Error',
        text: 'A connection issue occurred. Please check your network or email dhoreniraj83@gmail.com directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Reference Hero Header */}
      <div className="contact-hero reveal">
        <h1 className="title title--h1 title__separate">
          Contact<span className="title--tone">.</span>
        </h1>
        <p className="contact-hero__lead">
          Have an opportunity, project, or technical discussion in mind? I'm currently focused on
          DevOps and Cloud engineering and I'm open to relevant internship and software
          opportunities.
        </p>
      </div>

      {/* Two-Column Contact Layout matching Reference */}
      <div className="contact-layout reveal reveal-delay-1">
        {/* Left Column: Direct Channels & Social Links */}
        <aside className="contact-channels">
          <dl className="contact-channels__list">
            <div className="contact-channels__item">
              <dt>Email</dt>
              <dd>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <a href={`mailto:${email}`} className="contact-channels__mail">
                    {email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="pill pill--mono"
                    style={{
                      fontSize: '11px',
                      padding: '0.15rem 0.5rem',
                      lineHeight: '1.2',
                      cursor: 'pointer',
                    }}
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </dd>
            </div>

            <div className="contact-channels__item">
              <dt>Based in</dt>
              <dd>Bilaspur, Chhattisgarh, India</dd>
            </div>

            <div className="contact-channels__item">
              <dt>Availability</dt>
              <dd>Open to internships &amp; software/cloud opportunities</dd>
            </div>

            <div className="contact-channels__item">
              <dt>Elsewhere</dt>
              <dd>
                <ul className="contact-channels__social" aria-label="Social media profiles">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/niraj-dhore-56538a416"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      title="LinkedIn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="app-icon"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://github.com/niraj1234-svg"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      title="GitHub"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="app-icon"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://leetcode.com/u/Niraj_009/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LeetCode"
                      title="LeetCode"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="app-icon"
                      >
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.kalaofficial.store/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="KALA Store"
                      title="KALA Store"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="app-icon"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </aside>

        {/* Right Column: Contact Form */}
        <div className="contact-form-wrap">
          {/* Submission Feedback Notice */}
          {statusNotice && (
            <div
              className={`contact-notice ${
                statusNotice.type === 'success'
                  ? 'contact-notice--success'
                  : 'contact-notice--error'
              }`}
              role="alert"
            >
              <div className="contact-notice__icon">
                {statusNotice.type === 'success' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                )}
              </div>
              <div className="contact-notice__body">
                <span className="contact-notice__heading">{statusNotice.heading}</span>
                <span className="contact-notice__text">{statusNotice.text}</span>
              </div>
            </div>
          )}

          <form id="contact-form" name="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form-row">
              {/* Full Name */}
              <div className="contact-field">
                <div className="contact-field__head">
                  <label htmlFor="name" className="contact-field__label">
                    Full Name
                  </label>
                </div>
                <input
                  type="text"
                  className={`contact-field__input ${
                    fieldErrors.name ? 'contact-field__input--error' : ''
                  }`}
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                  }}
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  aria-required="true"
                />
                {fieldErrors.name && (
                  <span className="contact-field__error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {fieldErrors.name}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div className="contact-field">
                <div className="contact-field__head">
                  <label htmlFor="email" className="contact-field__label">
                    Email Address
                  </label>
                </div>
                <input
                  type="email"
                  className={`contact-field__input ${
                    fieldErrors.email ? 'contact-field__input--error' : ''
                  }`}
                  id="email"
                  name="email"
                  value={userEmail}
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                  }}
                  autoComplete="email"
                  inputMode="email"
                  spellCheck="false"
                  placeholder="name@example.com"
                  required
                  aria-required="true"
                />
                {fieldErrors.email && (
                  <span className="contact-field__error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {fieldErrors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="contact-field">
              <div className="contact-field__head">
                <label htmlFor="subject" className="contact-field__label">
                  Subject
                </label>
              </div>
              <input
                type="text"
                className={`contact-field__input ${
                  fieldErrors.subject ? 'contact-field__input--error' : ''
                }`}
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (fieldErrors.subject) setFieldErrors({ ...fieldErrors, subject: undefined });
                }}
                placeholder="What would you like to discuss?"
                required
                aria-required="true"
              />
              {fieldErrors.subject && (
                <span className="contact-field__error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {fieldErrors.subject}
                </span>
              )}
            </div>

            {/* Message */}
            <div className="contact-field">
              <div className="contact-field__head">
                <label htmlFor="message" className="contact-field__label">
                  Your Message
                </label>
                <span
                  className={`contact-field__count ${
                    message.length >= 500 ? 'contact-field__count--limit' : ''
                  }`}
                >
                  {message.length} / 500
                </span>
              </div>
              <textarea
                className={`contact-field__input contact-field__input--textarea ${
                  fieldErrors.message ? 'contact-field__input--error' : ''
                }`}
                id="message"
                name="message"
                placeholder="A sentence or two about the project, role, or technical topic."
                rows={5}
                maxLength={500}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: undefined });
                }}
                required
                aria-required="true"
              ></textarea>
              {fieldErrors.message && (
                <span className="contact-field__error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {fieldErrors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="contact-submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="contact-submit__spinner" aria-hidden="true"></span>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="app-icon"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
