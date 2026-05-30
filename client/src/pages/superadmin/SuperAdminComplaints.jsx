import React, { useState, useEffect, useRef } from "react";
import { Wrapper as ChatWrapper } from "../../assets/Wrappers/GetInTouch";
import { FaCommentAlt } from "react-icons/fa";

const SuperAdminComplaints = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const messagesEndRef = useRef(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/admin/app-stats");
      if (res.status === 401 || res.status === 403) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      const filtered = (data.userStats || []).filter(u => u.email !== "royalgroups247@gmail.com");
      setUsers(filtered);
      if (filtered.length > 0) {
        setSelectedUser(filtered[0]);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchChatHistory = async () => {
    if (!selectedUser) return;
    try {
      const res = await fetch(`/api/v1/messages?userId=${selectedUser._id}`);
      if (res.ok) {
        const data = await res.json();
        setMessagesList(data.messages || []);
      }
    } catch (err) {
      console.error("Failed to load chat history:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchChatHistory();
    const interval = setInterval(fetchChatHistory, 4000);
    return () => clearInterval(interval);
  }, [selectedUser]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList, selectedUser]);

  const getTimeString = () => {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText;
    setInputText("");

    // Optimistic state update
    const tempId = `temp-${Date.now()}`;
    const tempMsg = {
      _id: tempId,
      senderType: "admin",
      text,
      time: getTimeString(),
    };
    setMessagesList((prev) => [...prev, tempMsg]);

    try {
      const res = await fetch("/api/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, receiverId: selectedUser._id }),
      });
      if (res.ok) {
        fetchChatHistory();
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "var(--grey-500)" }}>
        <p>Loading customer conversations...</p>
      </div>
    );
  }

  return (
    <ChatWrapper>
      <div className="admin-header" style={{ marginBottom: "1.5rem" }}>
        <h2>Customer Support Conversations</h2>
        <p>Respond to real-time customer support queries and system feedback.</p>
      </div>

      <div className="contact-page-container">
        {/* Left Side: Client List */}
        <div className="info-sidebar" style={{ flex: 0.8, padding: "1.25rem" }}>
          <div className="sidebar-header" style={{ marginBottom: "1rem", paddingBottom: "0.75rem" }}>
            <h3>Registered Customers</h3>
            <p>Select a customer to view history.</p>
          </div>
          
          <div className="info-cards-container" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {users.length === 0 ? (
              <p style={{ color: "var(--grey-400)", fontSize: "0.85rem", textAlign: "center" }}>No registered customers found.</p>
            ) : (
              users.map((u) => {
                const isActive = selectedUser && selectedUser._id === u._id;
                const initials = u.name
                  ? u.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                  : "US";

                return (
                  <div
                    key={u._id}
                    onClick={() => setSelectedUser(u)}
                    className="info-card"
                    style={{
                      cursor: "pointer",
                      background: isActive ? "var(--primary-50)" : "var(--grey-50)",
                      borderColor: isActive ? "var(--primary-500)" : "var(--sidebar-border)",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.85rem",
                      borderRadius: "8px",
                      transition: "0.2s ease-in-out",
                    }}
                  >
                    <div className="icon-box" style={{
                      background: isActive ? "var(--primary-100)" : "var(--grey-100)",
                      color: isActive ? "var(--primary-600)" : "var(--grey-600)",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}>
                      {initials}
                    </div>
                    <div className="card-content" style={{ flex: 1 }}>
                      <span className="label" style={{ color: isActive ? "var(--primary-600)" : "var(--grey-400)", fontWeight: 700, fontSize: "0.7rem" }}>
                        {u.role}
                      </span>
                      <h5 style={{ margin: 0, fontSize: "0.9rem", color: "var(--grey-800)", fontWeight: 600 }}>{u.name}</h5>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--grey-500)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {u.email}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Chat Console */}
        {selectedUser ? (
          <div className="chat-outer-container">
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

            <div className="chat-messages-container">
              <div className="chat-date-divider">Today</div>
              
              {/* Static Welcome Message */}
              <div className="bubble bubble-support">
                Hello! Welcome to the Steel Bid Support Desk. How can we help you today with your estimations or company bid configurations?
                <div className="bubble-meta"><span>12:00 PM</span></div>
              </div>

              {/* Dynamic Conversation Thread */}
              {messagesList.map((msg) => (
                <div
                  key={msg._id || msg.id}
                  className={`bubble ${msg.senderType === "user" ? "bubble-support" : "bubble-user"}`}
                >
                  {msg.text}
                  <div className="bubble-meta">
                    <span>{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-footer">
              <form onSubmit={handleSend}>
                <div className="chat-input-wrapper">
                  <input
                    placeholder="Type a message..."
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>
                <button type="submit" className="send-circle-btn" disabled={!inputText.trim()}>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="chat-outer-container" style={{ display: "grid", placeItems: "center", background: "var(--grey-50)" }}>
            <div style={{ textAlign: "center", color: "var(--grey-400)" }}>
              <FaCommentAlt size={48} style={{ marginBottom: "1rem" }} />
              <p>Select a customer from the left list to view their chat history.</p>
            </div>
          </div>
        )}
      </div>
    </ChatWrapper>
  );
};

export default SuperAdminComplaints;
