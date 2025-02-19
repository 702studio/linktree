import { useState, FormEvent, useEffect, useRef } from 'react';
import Head from 'next/head';
import emailjs from '@emailjs/browser';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface LinkItem {
  title: string;
  url: string;
  category?: string;
}

interface DigitalArtItem {
  title: string;
  url: string;
  platform: string;
  info?: string;
}

export default function Home() {
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showGradient, setShowGradient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // EmailJS'i başlat
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !name.trim()) return;
    
    setIsLoading(true);
    setStatusMessage('');
    setShowSuccess(false);

    try {
      const templateParams = {
        message: message,
        from_name: name,
        to_email: 'tolgaozisik@gmail.com',
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        templateParams
      );

      setMessage('');
      setName('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Email gönderme hatası:', error);
      setStatusMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const adjustTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`; // max 150px
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    const textarea = e.target;
    if (textarea.scrollWidth > textarea.clientWidth) {
      setShowGradient(true);
    } else {
      setShowGradient(false);
    }
  };

  const [links] = useState<LinkItem[]>([
    {
      title: "Official Website",
      url: "https://www.tolgaozisik.com",
      category: "essential"
    },
    {
      title: "Behance",
      url: "https://www.behance.net/tolgaozisik",
      category: "essential"
    },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/tolgaozisik",
      category: "essential"
    },
    {
      title: "YouTube",
      url: "https://www.youtube.com/@TolgaOzisik",
      category: "essential"
    },
    {
      title: "Instagram",
      url: "https://www.instagram.com/tolgaozisik",
      category: "essential"
    },
    {
      title: "Dribbble",
      url: "https://dribbble.com/tolgaozisik",
      category: "essential"
    }
  ]);

  const [digitalArt] = useState<DigitalArtItem[]>([
    {
      title: "Crypto.com",
      url: "https://crypto.com/nft/profile/tolgaozisik?tab=created",
      platform: "Crypto.com",
      info: "Geometric Life Forms NFT koleksiyonu sadece 3 dakikada sold out oldu!"
    },
    {
      title: "MakersPlace",
      url: "https://makersplace.com/tolgaozisik",
      platform: "MakersPlace"
    }
  ]);

  const toggleAccordion = (title: string) => {
    setOpenAccordions(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 max-w-2xl mx-auto">
      <Head>
        <title>TOLGA ÖZIŞIK - Founder & Creative Director | 702.studio</title>
        <meta name="description" content="Founder & Creative Director | 702.studio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-20">
        <h1 className="text-3xl font-light tracking-wide mb-3">
          TOLGA ÖZIŞIK
        </h1>
        <p className="text-base font-light tracking-wide">
          Founder & Creative Director |{' '}
          <a 
            href="https://702.studio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white border-b border-white/30 hover:border-white transition-colors duration-200"
          >
            702.studio
          </a>
        </p>
      </header>

      <main className="space-y-20">
        {/* Links Section */}
        <section>
          <div className="border-t border-white/10">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block py-4 border-b border-white/10 text-base font-light tracking-wide transition-colors duration-200 social-link-hover-effect no-underline text-white/80 visited:text-white/80 ${
                  link.title.toLowerCase().includes('website') ? 'website-link' :
                  link.title.toLowerCase().includes('behance') ? 'behance-link' :
                  link.title.toLowerCase().includes('linkedin') ? 'linkedin-link' :
                  link.title.toLowerCase().includes('youtube') ? 'youtube-link' :
                  link.title.toLowerCase().includes('instagram') ? 'instagram-link' :
                  link.title.toLowerCase().includes('dribbble') ? 'dribbble-link' : ''
                }`}
                style={{ textDecoration: 'none', color: 'rgba(255, 255, 255, 0.8)' }}
              >
                {link.title}
              </a>
            ))}
            
            {/* Digital Art Accordion */}
            <div>
              <button
                onClick={() => toggleAccordion('digital-art')}
                className="w-full py-4 border-b border-white/10 flex items-center justify-between text-base font-light tracking-wide hover:text-white transition-colors duration-200"
              >
                Digital Art
                <span className={`accordion-icon ${openAccordions.includes('digital-art') ? 'rotate-45' : ''} opacity-60`}>
                  +
                </span>
              </button>
              <div className={`accordion-content ${openAccordions.includes('digital-art') ? 'open' : ''}`}>
                {digitalArt.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`accordion-link block py-4 border-b border-white/10 text-base font-light tracking-wide transition-colors duration-200 social-link-hover-effect ${
                      item.platform.toLowerCase().includes('crypto') ? 'crypto-link relative group flex items-center justify-between' :
                      item.platform.toLowerCase().includes('makers') ? 'makers-link' : ''
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
                  >
                    <span>{item.title}</span>
                    {item.info && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedInfo(item.info || '');
                          setIsModalOpen(true);
                        }}
                        className="info-button"
                      >
                        <span className="info-icon">i</span>
                      </button>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Mail Accordion */}
            <div>
              <button
                onClick={() => toggleAccordion('quick-mail')}
                className="w-full py-4 border-b border-white/10 flex items-center justify-between text-base font-light tracking-wide hover:text-white transition-colors duration-200"
              >
                Quick Mail
                <span className={`accordion-icon ${openAccordions.includes('quick-mail') ? 'rotate-45' : ''} opacity-60`}>
                  +
                </span>
              </button>
              <div className={`accordion-content ${openAccordions.includes('quick-mail') ? 'open' : ''}`}>
                <form onSubmit={handleSubmit} className="py-0">
                  <div className="accordion-link" style={{ transitionDelay: '0.1s' }}>
                    <div className="input-container -mx-8">
                      <div className="px-8">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name..."
                          className="w-full bg-transparent text-base font-light tracking-wide placeholder:text-white/40 focus:outline-none h-[50px] py-3"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion-link" style={{ transitionDelay: '0.2s' }}>
                    <div className="input-container flex items-center relative -mx-8">
                      <div className="flex-1 px-8 relative flex items-center h-[50px]">
                        <div className="w-full flex items-center relative">
                          <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Type your message..."
                            className="w-full bg-transparent text-base font-light tracking-wide placeholder:text-white/40 focus:outline-none resize-none whitespace-nowrap overflow-hidden py-0 h-[50px] leading-[50px]"
                            disabled={isLoading}
                            required
                          />
                          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none" 
                               style={{ opacity: showGradient ? 1 : 0, transition: 'opacity 0.3s ease' }}></div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 pr-8 h-[50px] flex items-center">
                        {showSuccess ? (
                          <div className="flex items-center space-x-2">
                            <CheckCircleIcon className="w-5 h-5 text-green-400 animate-scale-in" />
                            <span className="text-sm text-green-400">Sent!</span>
                          </div>
                        ) : (
                          <button
                            type="submit"
                            className="text-sm font-light tracking-wide group disabled:opacity-40 transition-all duration-200 flex items-center"
                            disabled={isLoading || !message.trim() || !name.trim()}
                          >
                            <span className="relative">
                              {isLoading ? 'Sending...' : 'Send'}
                              <span className="absolute -right-4 top-1/2 -translate-y-1/2 group-hover:translate-x-1 transition-transform duration-200">
                                →
                              </span>
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {statusMessage && !showSuccess && (
                    <p className="accordion-link text-sm text-red-400" style={{ transitionDelay: '0.3s' }}>
                      {statusMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-20 fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <p className="text-[11px] font-light tracking-wide opacity-30 select-none">
            © 2024 Tolga Özışık. All content, designs and intellectual property on this site are protected under international copyright law. Any unauthorized use or reproduction is strictly prohibited.
          </p>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>NFT Koleksiyonu Hakkında</h3>
              <button onClick={() => setIsModalOpen(false)} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              {selectedInfo}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 