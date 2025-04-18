import React, { useState, useEffect, useRef, KeyboardEvent, FC } from 'react';
import { IoChatbubbleSharp } from "react-icons/io5";
import { X, Maximize, Minimize, Send, Languages } from "lucide-react";

// Type definitions
interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
  industry: string;
  budget: string;
  serviceRequirements: string;
  language: string;
  leadSource: string;
  status: string;
  createdAt: Date;
}

interface Language {
  code: string;
  name: string;
  flag: string; // Add flag emoji for better visual representation
}

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

interface LeadScoringDisplayProps {
  leadData: LeadData;
}

interface LanguageSelectorProps {
  selectedLanguage: string;
  onSelect: (code: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

// Gemini API Service
const GeminiService = {
  apiKey: 'AIzaSyBEAFoleUwqMl2Uk0TVx1PuyFsJ3vgzygg',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',

  async getResponse(userInput: string, context: string, language: string = 'en'): Promise<string> {
    const leadCollectionContext = `
You are NurtureBot X, an AI assistant for Loopify's lead management system. Your goal is to:
1. Collect lead information naturally through conversation
2. Ask questions to gather data for our lead schema: name, email, phone, industry, budget, service requirements, language preference
3. Assess lead quality based on their responses
4. Be friendly, professional, and respectful of the user's time

Current lead information: ${context}

Important facts about Loopify's NurtureBot X:
- AI that personalizes outreach and nurtures leads
- Provides AI-Powered Lead DNA (Deep Lead Profiling)
- Features Predictive Lead Intent with AI Behavioral Scoring
- Has AI-Powered Call Summary & Action Item Generator
- Offers CRM Re-engagement to identify cold leads
- Includes AI-Based Deal Closing Probability & Win Prediction
- Provides an AI Copilot for Sales Teams

If asked about why we're different, highlight these key advantages:
- Increased Lead Conversion & Revenue Growth through AI-driven scoring
- Enhanced Efficiency & Productivity with automation
- Better Customer Experience with personalized interactions
- Data-Driven Decision Making with AI-powered analytics
- Reduced Lead Drop-off by re-engaging cold leads
- Scalability & Competitive Edge with multi-language support

Always respond in ${language}. Keep responses concise (2-3 sentences) and focused on lead information collection. Use a warm, professional tone.
`;

    const url = `${this.baseUrl}?key=${this.apiKey}`;
    
    const payload = {
      "contents": [
        {
          "role": "user",
          "parts": [
            {
              "text": `${leadCollectionContext}\n\nUser's message: ${userInput}\n\nYour response (in ${language}):`
            }
          ]
        }
      ],
      "generationConfig": {
        "temperature": 0.4,
        "topK": 40,
        "topP": 0.95,
        "maxOutputTokens": 1024,
        "stopSequences": []
      },
      "safetySettings": [
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "threshold": "BLOCK_ONLY_HIGH"
        },
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "threshold": "BLOCK_ONLY_HIGH"
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "threshold": "BLOCK_ONLY_HIGH"
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "threshold": "BLOCK_ONLY_HIGH"
        }
      ]
    };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
      } else {
        console.error('Gemini API error:', response.status, await response.text());
        throw new Error(`Failed to get response from Gemini: ${response.status}`);
      }
    } catch (e: any) {
      console.error('Error calling Gemini API:', e);
      throw new Error(`Failed to communicate with Gemini: ${e.message}`);
    }
  }
};

// Lead scoring logic
const LeadScorer = {
  calculateScore(leadData: LeadData): number {
    let score = 0;
    const maxScore = 100;
    
    // Basic presence checks
    if (leadData.name) score += 10;
    if (leadData.email) score += 10;
    if (leadData.phone) score += 10;
    
    // Industry factor
    const highValueIndustries = ['technology', 'healthcare', 'finance', 'education', 'ecommerce'];
    if (leadData.industry) {
      const industryNormalized = leadData.industry.toLowerCase();
      if (highValueIndustries.some(ind => industryNormalized.includes(ind))) {
        score += 15;
      } else {
        score += 5;
      }
    }
    
    // Budget factor - bigger budgets score higher
    if (leadData.budget) {
      const budget = parseFloat(leadData.budget.replace(/[^0-9.]/g, ''));
      if (budget >= 10000) score += 25;
      else if (budget >= 5000) score += 20;
      else if (budget >= 1000) score += 15;
      else if (budget > 0) score += 10;
    }
    
    // Service requirements - more detailed requirements score higher
    if (leadData.serviceRequirements) {
      const wordCount = leadData.serviceRequirements.split(' ').length;
      if (wordCount >= 20) score += 15;
      else if (wordCount >= 10) score += 10;
      else if (wordCount > 0) score += 5;
    }
    
    // Ensure score doesn't exceed maximum
    return Math.min(score, maxScore);
  },
  
  calculateDealProbability(score: number): number {
    // Convert score to probability percentage
    // Using a non-linear curve that favors higher scores
    if (score >= 90) return 95;
    if (score >= 80) return 85;
    if (score >= 70) return 70;
    if (score >= 60) return 55;
    if (score >= 50) return 40;
    if (score >= 40) return 30;
    if (score >= 30) return 20;
    return 10;
  },
  
  getQualityLabel(score: number): string {
    if (score >= 80) return "Hot Lead";
    if (score >= 60) return "Qualified Lead";
    if (score >= 40) return "Warm Lead";
    return "Cold Lead";
  }
};

// Language options
const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
];

// Pre-defined question sequences
const QUESTION_SEQUENCES = {
  initial: [
    "Hi there! I'm NurtureBot X, an AI assistant from Loopify. May I know your name?",
    "Thanks! What's the best email to reach you?",
    "Great! And what's a good phone number to contact you?",
    "What industry is your business in?",
    "What's your approximate budget for this project?",
    "Could you briefly describe what services you're looking for?",
    "Is there a preferred language you'd like to communicate in?"
  ],
  followUp: [
    "How soon are you looking to implement this solution?",
    "Have you used similar services or products before?",
    "What challenges are you currently facing that you hope we can help with?",
    "How did you hear about Loopify's NurtureBot X?"
  ]
};

// Helper function to extract info from messages
const extractLeadInfo = (messages: ChatMessage[]): Partial<LeadData> => {
  // This is a simplistic implementation - in production you'd use NLP
  let leadInfo: Partial<LeadData> = {
    name: '',
    email: '',
    phone: '',
    industry: '',
    budget: '',
    serviceRequirements: '',
    language: 'en',
    leadSource: 'chatbot'
  };
  
  // Simple pattern matching
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneRegex = /\b(\+\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}\b/;
  const budgetRegex = /\$?\s*\d{1,3}(,\d{3})*(\.\d+)?\s*(k|thousand|million|m|usd|dollars)?/i;
  
  messages.forEach(msg => {
    if (msg.role === 'user') {
      // Extract email
      const emailMatch = msg.content.match(emailRegex);
      if (emailMatch && !leadInfo.email) leadInfo.email = emailMatch[0];
      
      // Extract phone
      const phoneMatch = msg.content.match(phoneRegex);
      if (phoneMatch && !leadInfo.phone) leadInfo.phone = phoneMatch[0];
      
      // Extract budget
      const budgetMatch = msg.content.match(budgetRegex);
      if (budgetMatch && !leadInfo.budget) leadInfo.budget = budgetMatch[0];
      
      // Extract other info based on context from bot messages
      const lastBotMsg = messages.filter(m => m.role === 'bot' && messages.indexOf(m) < messages.indexOf(msg)).pop();
      
      if (lastBotMsg) {
        const lowerBotMsg = lastBotMsg.content.toLowerCase();
        const lowerUserMsg = msg.content.toLowerCase();
        
        // Name extraction
        if (lowerBotMsg.includes('name') && !leadInfo.name && msg.content.split(' ').length <= 5) {
          leadInfo.name = msg.content.replace(/^(i am|my name is|this is|i'm|call me)/i, '').trim();
        }
        
        // Industry extraction
        if (lowerBotMsg.includes('industry') && !leadInfo.industry) {
          leadInfo.industry = msg.content;
        }
        
        // Service requirements extraction
        if ((lowerBotMsg.includes('service') || lowerBotMsg.includes('looking for')) && !leadInfo.serviceRequirements) {
          leadInfo.serviceRequirements = msg.content;
        }
      }
    }
  });
  
  return leadInfo;
};

const ChatMessage: FC<ChatMessageProps> = ({ message, isBot }) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3 sm:mb-4`}>
      <div className={`max-w-[85%] sm:max-w-3/4 px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${isBot ? 'bg-gray-100 text-gray-800' : 'bg-emerald-500 text-white'} text-sm sm:text-base`}>
        {message}
      </div>
    </div>
  );
};

const LeadScoringDisplay: FC<LeadScoringDisplayProps> = ({ leadData }) => {
  const score = LeadScorer.calculateScore(leadData);
  const probability = LeadScorer.calculateDealProbability(score);
  const label = LeadScorer.getQualityLabel(score);
  
  return (
    <div className="bg-gray-50 border-t border-gray-200 p-3">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-medium text-gray-700">Lead Score</h4>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold">
              {score}%
            </div>
            <span className="ml-2 text-sm font-medium text-gray-600">{label}</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700">Deal Probability</h4>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold">
              {probability}%
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <h4 className="text-xs font-medium text-gray-500">Collected Info</h4>
        <div className="text-xs text-gray-600 mt-1">
          {leadData.name && <div><span className="font-medium">Name:</span> {leadData.name}</div>}
          {leadData.email && <div><span className="font-medium">Email:</span> {leadData.email}</div>}
          {leadData.phone && <div><span className="font-medium">Phone:</span> {leadData.phone}</div>}
          {leadData.industry && <div><span className="font-medium">Industry:</span> {leadData.industry}</div>}
          {leadData.budget && <div><span className="font-medium">Budget:</span> {leadData.budget}</div>}
        </div>
      </div>
    </div>
  );
};

const LanguageSelector: FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onSelect, 
  isOpen, 
  onToggle 
}) => {
  const selectedLang = LANGUAGES.find(l => l.code === selectedLanguage);

  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        className="flex items-center gap-1 sm:gap-2 text-white hover:bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors"
        title="Change language"
      >
        <Languages className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-xs sm:text-sm hidden xs:flex items-center gap-1 sm:gap-2">
          {selectedLang?.flag} <span className="hidden sm:inline">{selectedLang?.name}</span>
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden w-48 sm:w-56 py-2 max-h-[300px] sm:max-h-[400px] overflow-y-auto z-50">
          <div className="px-3 py-1.5 sm:px-4 sm:py-2 border-b border-gray-100">
            <h3 className="text-xs sm:text-sm font-medium text-gray-700">Select Language</h3>
          </div>
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`flex items-center w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm gap-2 sm:gap-3 transition-colors ${
                selectedLanguage === lang.code 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => onSelect(lang.code)}
            >
              <span className="text-base sm:text-lg">{lang.flag}</span>
              <span className="flex-1 text-left">{lang.name}</span>
              {selectedLanguage === lang.code && (
                <span className="text-emerald-600">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const FloatingChat: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    industry: '',
    budget: '',
    serviceRequirements: '',
    language: 'en',
    leadSource: 'chatbot',
    status: 'new',
    createdAt: new Date()
  });
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Initial greeting and start question sequence when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = QUESTION_SEQUENCES.initial[0];
      setMessages([{ role: 'bot', content: greeting }]);
      setQuestionIndex(1);
    }
  }, [isOpen, messages.length]);
  
  // Update lead data whenever we get new messages
  useEffect(() => {
    if (messages.length > 0) {
      const extractedInfo = extractLeadInfo(messages);
      setLeadData(prev => ({
        ...prev,
        ...extractedInfo,
        language: currentLanguage
      }));
    }
  }, [messages, currentLanguage]);
  
  const handleLanguageChange = async (langCode: string) => {
    setCurrentLanguage(langCode);
    setIsLanguageSelectorOpen(false);
    
    // Translate the last bot message to the new language
    if (messages.length > 0) {
      const lastBotMsg = [...messages].reverse().find(m => m.role === 'bot');
      if (lastBotMsg) {
        setIsLoading(true);
        try {
          const translatedResponse = await GeminiService.getResponse(
            "Translate your last message to the selected language, but don't mention that this is a translation.",
            JSON.stringify(leadData),
            langCode
          );
          
          // Replace the last bot message with translated version
          setMessages(prev => 
            prev.map((msg, idx) => 
              idx === prev.indexOf(lastBotMsg) ? { ...msg, content: translatedResponse } : msg
            )
          );
        } catch (error) {
          console.error("Translation error:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };
  
  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;
    
    const userMessage = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    
    try {
      // Get AI response
      const response = await GeminiService.getResponse(
        userMessage,
        JSON.stringify(leadData),
        currentLanguage
      );
      
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
      
      // Check if we should continue with question sequence
      if (questionIndex < QUESTION_SEQUENCES.initial.length) {
        setTimeout(() => {
          const nextQuestion = QUESTION_SEQUENCES.initial[questionIndex];
          setMessages(prev => [...prev, { role: 'bot', content: nextQuestion }]);
          setQuestionIndex(questionIndex + 1);
        }, 1500);
      }
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105"
      >
        {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <IoChatbubbleSharp className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>
      
      {isOpen && (
        <div
          className={`fixed ${
            // On mobile: fullscreen 
            // On desktop: floating window properly positioned
            window.innerWidth < 640 
              ? 'inset-0' 
              : 'bottom-20 right-6 rounded-2xl'
          } bg-white border border-gray-200 shadow-2xl overflow-hidden transition-all duration-300 ${
            // Size control based on maximized state (desktop only)
            isMaximized 
              ? "sm:w-[480px] sm:h-[600px]" 
              : "sm:w-[380px] sm:h-[520px]"
          }`}
        >
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 sm:px-5 py-3 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">NurtureBot X</h3>
                <p className="text-emerald-50 text-xs">AI Lead Assistant</p>
              </div>
              <div className="flex items-center space-x-2">
                <LanguageSelector
                  selectedLanguage={currentLanguage}
                  onSelect={handleLanguageChange}
                  isOpen={isLanguageSelectorOpen}
                  onToggle={() => setIsLanguageSelectorOpen(!isLanguageSelectorOpen)}
                />
                <button 
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="text-white hover:bg-white/10 p-1.5 rounded-full transition-colors hidden sm:block"
                >
                  {isMaximized ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-[calc(100%-3.5rem)]">
            {/* Enhanced Messages Area */}
            <div className="flex-1 p-3 sm:p-6 overflow-y-auto bg-gray-50">
              {messages.map((msg, idx) => (
                <ChatMessage 
                  key={idx} 
                  message={msg.content} 
                  isBot={msg.role === 'bot'} 
                />
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white shadow-sm px-3 py-2 sm:px-4 sm:py-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Lead Scoring Display - Show only after collecting basic info */}
            {leadData.name && leadData.email && (
              <div className="bg-white border-t border-gray-100 p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 sm:p-4">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">Lead Score</h4>
                    <div className="flex items-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg">
                        {LeadScorer.calculateScore(leadData)}%
                      </div>
                      <span className="ml-3 sm:ml-4 text-xs sm:text-sm font-medium text-gray-800">
                        {LeadScorer.getQualityLabel(LeadScorer.calculateScore(leadData))}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-3 sm:p-4">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">Deal Probability</h4>
                    <div className="flex items-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg">
                        {LeadScorer.calculateDealProbability(LeadScorer.calculateScore(leadData))}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Input Area */}
            <div className="p-3 sm:p-6 border-t bg-white">
              <div className="flex gap-2 sm:gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className={`px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-all ${
                    !inputText.trim() || isLoading 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105'
                  }`}
                >
                  <span className="hidden sm:inline">Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;