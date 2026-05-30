import React, { useState, useEffect, useRef } from "react";
import {
  FaPaperPlane,
  FaCheckDouble,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCopy,
  FaGlobe,
  FaCheck,
} from "react-icons/fa";
import Wrapper from "../assets/Wrappers/GetInTouch";

const GetInTouch = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const messagesEndRef = useRef(null);

  // Helper to get formatted local time
  const getTimeString = () => {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/v1/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll when messages update or typing state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText;
    setInputText("");

    // Optimistically add message to state
    const tempId = `temp-${Date.now()}`;
    const tempMsg = {
      _id: tempId,
      senderType: "user",
      text,
      time: getTimeString(),
    };
    setMessages((prev) => [...prev, tempMsg]);

    try {
      const res = await fetch("/api/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        fetchMessages();
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("Estimation@SteelDimension.com");
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2000);
  };

  return (
    <Wrapper>
      <div className="contact-page-container">
        {/* Left Side: Chat Console */}
        <div className="chat-outer-container">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="header-left">
              <div className="avatar">
                SB
                <span className="avatar-status-dot"></span>
              </div>
              <div className="info">
                <h4>Steel Bid Support Desk</h4>
                <p>Online</p>
              </div>
            </div>
          </div>

          {/* Chat Message Window */}
          <div className="chat-messages-container">
            <div className="chat-date-divider">Today</div>

            {messages.map((msg) => (
              <div
                key={msg._id || msg.id}
                className={`bubble ${
                  msg.senderType === "user" ? "bubble-user" : "bubble-support"
                }`}
              >
                {msg.text}
                <div className="bubble-meta">
                  <span>{msg.time}</span>
                  {msg.senderType === "user" && (
                    <span className="ticks">
                      <FaCheckDouble size={12} />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="bubble bubble-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Footer Input Row */}
          <div className="chat-footer">
            <form onSubmit={handleSend}>
              <div className="chat-input-wrapper">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="send-circle-btn"
                disabled={!inputText.trim()}
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Contact Info Sidebar */}
        <div className="info-sidebar">
          <div className="sidebar-header">
            <h3>Contact Details</h3>
            <p>Reach out to us directly through any of our channels below.</p>
          </div>

          <div className="info-cards-container">
            {/* Address Card */}
            <div className="info-card">
              <div className="icon-box address">
                <FaMapMarkerAlt />
              </div>
              <div className="card-content">
                <span className="label">Our Office</span>
                <p className="value">Steel Dimension LLC, Florida, USA</p>
              </div>
            </div>

            {/* Phone Card */}
            <a href="tel:+17273781270" className="info-card">
              <div className="icon-box phone">
                <FaPhoneAlt />
              </div>
              <div className="card-content">
                <span className="label">Call Us</span>
                <p className="value">+1 727-378-1270</p>
              </div>
            </a>

            {/* Email Card (Copyable) */}
            <div className="info-card" style={{ cursor: "default" }}>
              <div className="icon-box email">
                <FaEnvelope />
              </div>
              <div className="card-content">
                <span className="label">Email Support</span>
                <p className="value">Estimation@SteelDimension.com</p>
              </div>
              <div className="copy-btn-wrapper">
                <button
                  type="button"
                  className="copy-btn"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <FaCheck style={{ color: "#10b981" }} /> : <FaCopy />}
                </button>
                {copiedEmail && <span className="copied-tooltip">Copied!</span>}
              </div>
            </div>



            {/* Business Hours Card */}
            <div className="info-card">
              <div className="icon-box hours">
                <FaClock />
              </div>
              <div className="card-content">
                <span className="label">Business Hours</span>
                <p className="value">Mon - Fri: 8:00 AM - 5:00 PM (EST)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default GetInTouch;
