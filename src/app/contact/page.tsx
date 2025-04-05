"use client";

import React, { useState } from "react";
import { IconCoffee, IconSend } from "@tabler/icons-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
              Let&apos;s Chat!
            </h1>
            <p className="text-[var(--text)] opacity-80 max-w-lg mx-auto">
              Ready to start a project together? Fill out the form below, and
              I&apos;ll get back to you as soon as possible. Coffee&apos;s on
              me!
            </p>
          </div>

          <div className="bg-[var(--foreground)] rounded-2xl p-8 shadow-lg">
            {submitSuccess ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <IconSend className="text-green-500" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-2">
                  Message Sent!
                </h3>
                <p className="text-center text-[var(--text)] opacity-80">
                  Thanks for reaching out! I&apos;ll get back to you as soon as
                  possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--text)] mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--dark)] border border-[var(--background)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--text)] mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--dark)] border border-[var(--background)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[var(--text)] mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[var(--dark)] border border-[var(--background)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-[var(--text)]"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-[var(--text)] opacity-80">
                    <IconCoffee size={16} />
                    <span>Coffee&apos;s on me!</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 bg-[var(--accent)] hover:bg-opacity-90 text-[var(--dark)] px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    <IconSend
                      size={18}
                      className={`transform transition-transform duration-300 ${
                        isSubmitting
                          ? "animate-pulse"
                          : "group-hover:translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
