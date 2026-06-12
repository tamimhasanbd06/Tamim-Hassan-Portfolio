import React, { useState } from "react";
import {
  FaPhone, FaWhatsapp, FaEnvelope,
  FaLinkedin, FaFacebook, FaCopy, FaCheck,
  FaPaperPlane, FaTimes
} from "react-icons/fa";
import { BsDiscord, BsTelegram } from "react-icons/bs";

const Contact = () => {
  const [copiedId, setCopiedId] = useState(null);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null);
  const [message, setMessage] = useState("Assalamu Alaikum, my name is Tamim Hasan. How can I help you?");

  const contactData = [
    {
      id: 1,
      category: "Contact",
      label: "Phone",
      copyText: "+8801883650010",
      href: "tel:+8801883650010",
      icon: <FaPhone />,
      hasMessage: false,
    },
    {
      id: 2,
      category: "Contact",
      label: "WhatsApp",
      copyText: "+8801883650010",
      href: "https://wa.me/8801883650010",
      icon: <FaWhatsapp />,
      hasMessage: true,
      type: "whatsapp",
    },
    {
      id: 3,
      category: "Contact",
      label: "Email",
      copyText: "tamimhasanbd06@gmail.com",
      href: "mailto:tamimhasanbd06@gmail.com",
      icon: <FaEnvelope />,
      hasMessage: true,
      type: "email",
    },
    {
      id: 6,
      category: "Social",
      label: "LinkedIn",
      copyText: "https://www.linkedin.com/in/tamim-hasan-th018836/",
      href: "https://www.linkedin.com/in/tamim-hasan-th018836/",
      icon: <FaLinkedin />,
      hasMessage: false,
    },
    {
      id: 7,
      category: "Social",
      label: "Facebook",
      copyText: "https://www.facebook.com/tamimhasanbd06",
      href: "https://www.facebook.com/tamimhasanbd06",
      icon: <FaFacebook />,
      hasMessage: false,
    },
    {
      id: 8,
      category: "Social",
      label: "Discord",
      copyText: "Tamim#1234",
      href: "https://discord.com",
      icon: <BsDiscord />,
      hasMessage: false,
    },
    {
      id: 9,
      category: "Social",
      label: "Telegram",
      copyText: "https://t.me/tamimhasan",
      href: "https://t.me/tamimhasan",
      icon: <BsTelegram />,
      hasMessage: false,
    },
  ];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setToast("Copied Successfully ✔");
    setTimeout(() => {
      setCopiedId(null);
      setToast("");
    }, 1500);
  };

  const handleSend = () => {
    if (!message.trim()) return;

    if (modal.type === "whatsapp") {
      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/8801883650010?text=${encoded}`, "_blank");
    } else if (modal.type === "email") {
      const encoded = encodeURIComponent(message);
      window.open(`mailto:tamimhasanbd06@gmail.com?subject=Hello&body=${encoded}`, "_blank");
    }

    setToast("Message Sent ✔");
    setModal(null);
    setMessage("Assalamu Alaikum, my name is Tamim Hasan. How can I help you?");
    setTimeout(() => setToast(""), 1500);
  };

  const handleCardClick = (item) => {
    if (item.hasMessage) {
      setModal(item);
    } else {
      window.open(item.href, "_blank");
    }
  };

  const renderCards = (category) => (
    <div className="flex flex-col gap-3 w-full">

      <h2 className="text-sm sm:text-base font-bold text-blue-400/80 uppercase tracking-widest px-2">
        {category}
      </h2>

      {contactData
        .filter((item) => item.category === category)
        .map((item) => (
          <div
            key={item.id}
            className="group relative flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 active:scale-[0.98]"
          >

            <div
              onClick={() => handleCardClick(item)}
              className="flex items-center gap-3 flex-grow cursor-pointer"
            >
              <div className="text-xl sm:text-2xl text-cyan-400 p-2 sm:p-3 rounded-lg bg-white/5 group-hover:text-blue-300 group-hover:scale-125 group-hover:rotate-3 transition-all duration-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]">
                {item.icon}
              </div>

              <p className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-cyan-300 transition">
                {item.label}
              </p>
            </div>

            <button
              onClick={() => handleCopy(item.copyText, item.id)}
              className="relative p-2 sm:p-3 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-transparent hover:border-cyan-400/40 transition overflow-hidden"
            >
              <span className="absolute inset-0 scale-0 group-active:scale-100 bg-cyan-400/20 rounded-full transition"></span>
              {copiedId === item.id ? (
                <FaCheck className="text-green-400 text-sm sm:text-base animate-pulse" />
              ) : (
                <FaCopy className="text-gray-400 text-sm sm:text-base" />
              )}
            </button>

          </div>
        ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white py-16 sm:py-20 px-4 sm:px-6 flex flex-col items-center relative overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[160px] rounded-full top-[-100px] left-[-100px]" />

      <header className="mb-10 sm:mb-16 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
          Contact Me
        </h1>
        <p className="text-gray-400 text-sm sm:text-lg max-w-xl mx-auto mt-3">
          Click any item to explore or copy instantly
        </p>
      </header>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
        {renderCards("Contact")}
        {renderCards("Social")}
      </div>

      <div className="mt-16 sm:mt-20 opacity-40 text-center">
        <p className="text-xs sm:text-sm tracking-[8px] uppercase">
          Available for Work
        </p>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 px-5 py-2 rounded-full backdrop-blur-md animate-pulse z-50">
          {toast}
        </div>
      )}

      {modal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => setModal(null)}
        >
          <div
            className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl text-cyan-400">
                  {modal.icon}
                </div>
                <h3 className="text-white font-semibold text-lg">
                  Send via {modal.label}
                </h3>
              </div>
              <button
                onClick={() => setModal(null)}
                className="text-gray-500 hover:text-white transition p-1"
              >
                <FaTimes />
              </button>
            </div>

            <div className="text-xs text-gray-500 bg-white/5 rounded-lg px-4 py-2">
              To: <span className="text-cyan-400">{modal.copyText}</span>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none resize-none focus:border-cyan-400/50 transition"
              placeholder="Type your message..."
            />

            <div className="flex gap-3">
              <button
                onClick={() => setModal(null)}
                className="flex-1 py-2 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="flex-1 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-300 transition text-sm flex items-center justify-center gap-2"
              >
                <FaPaperPlane />
                Send
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Contact;