import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Example validation
    if (!form.name || !form.email || !form.message) {
      setError("Name, Email, and Message are required.");
      return;
    }

    // Replace with actual API call if needed
    setSubmitted(true);
    // Reset form after submit, or after successful network request
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white/80 rounded-3xl shadow-2xl max-w-lg mx-auto w-full p-8 border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>
        <p className="mb-8 text-center text-gray-500">
          We'd love to hear from you! Use the form below to send feedback, questions, or report an issue.
        </p>
        {submitted ? (
          <div className="text-green-700 font-medium text-center mb-6">
            Thank you for contacting us! We'll get back to you soon.
          </div>
        ) : null}
        {error && (
          <div className="text-red-500 mb-4 text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-600 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-600 mb-1">Subject (Optional)</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-600 mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400 resize-none"
              value={form.message}
              onChange={handleChange}
              placeholder="Type your message here..."
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary text-white rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
