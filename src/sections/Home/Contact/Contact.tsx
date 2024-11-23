/** @format */

"use client";

import { Title } from "@/components/Global";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane } from "react-icons/fa";
import { AnimateOnView } from "@/components/Global/AnimateOnView/AnimateOnView";
import { useState } from "react";
import { useSpring, animated } from '@react-spring/web';

const ContactInfo = [
  {
    icon: <FaEnvelope className="text-2xl" />,
    title: "Email",
    value: "andikadwisaputra.dev@gmail.com",
    href: "mailto:andikadwisaputra.dev@gmail.com",
  },
  {
    icon: <FaPhone className="text-2xl" />,
    title: "Phone",
    value: "+62 857-4369-9909",
    href: "tel:+6285743699909",
  },
  {
    icon: <FaMapMarkerAlt className="text-2xl" />,
    title: "Location",
    value: "Central Java, Indonesia",
    href: "https://maps.google.com/?q=Central+Java,Indonesia",
  },
];

const StructuredData = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andika Dwi Saputra",
    email: "andikadwisaputra.dev@gmail.com",
    telephone: "+62 858-7544-5853",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Banjarnegara",
      addressRegion: "Central Java",
      addressCountry: "Indonesia",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const loadingSpring = useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    loop: true,
    immediate: !isLoading,
    pause: !isLoading,
    config: { duration: 1000 },
  });

  const planeSpring = useSpring({
    from: { x: 0, opacity: 1 },
    to: async (next) => {
      if (isLoading) {
        await next({ x: 100, opacity: 0 });
      } else {
        await next({ x: 0, opacity: 1 });
      }
    },
    config: { tension: 200, friction: 20 },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="bg-secondary relative h-auto w-full px-4 md:px-10 pb-32 shadow-xl"
      aria-label="Contact Information"
    >
      <AnimateOnView>
        <Title
          title="Get in [Touch]"
          description="Feel free to [contact me] for any [questions] or [opportunities]"
        />
      </AnimateOnView>

      <div className="max-w-4xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ContactInfo.map((info, index) => (
            <AnimateOnView key={index} direction="up" delay={index * 200}>
              <a
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-main rounded-lg shadow-xl hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-secondary">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">
                      {info.title}
                    </h3>
                    <p className="text-text">{info.value}</p>
                  </div>
                </div>
              </a>
            </AnimateOnView>
          ))}
        </div>

        <AnimateOnView direction="up" delay={600}>
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-main text-text border-2 border-transparent focus:border-accent outline-none transition-colors duration-300"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-main text-text border-2 border-transparent focus:border-accent outline-none transition-colors duration-300"
                required
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={6}
              className="w-full p-3 rounded-lg bg-main text-text border-2 border-transparent focus:border-accent outline-none transition-colors duration-300"
              required
            />

            {status.message && (
              <div
                className={`p-4 rounded-lg ${
                  status.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
                role="alert"
              >
                {status.message}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-3 bg-accent text-secondary rounded-lg transition-all duration-300 
                    ${
                      isLoading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-opacity-90"
                    }
                    flex items-center gap-2`}
              >
                {isLoading ? (
                  <>
                    <animated.div
                      style={loadingSpring}
                      className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full"
                    />
                    <span>Sending...</span>
                    <animated.div style={planeSpring} className="text-lg">
                      <FaPaperPlane />
                    </animated.div>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane className="text-lg" />
                  </>
                )}
              </button>
            </div>
          </form>
        </AnimateOnView>
      </div>
      <StructuredData />
    </section>
  );
};
