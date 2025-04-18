import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Info, Clock, Star, TrendingUp, Search, BarChart } from 'lucide-react';

// Define TypeScript interfaces
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  budget: string;
  score: number;
  probability: number;
  status: 'Hot Lead' | 'Qualified Lead' | 'Warm Lead';
  lastContact: string;
  notes: string;
}

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

interface LeadCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
  isActive: boolean;
}

interface LeadDetailsProps {
  lead: Lead | null;
}

interface ChatMessageType {
  role: 'bot' | 'user';
  content: string;
}

// Dummy lead data
const LEADS: Lead[] = [
  {
    id: "L1001",
    name: "Sarah Johnson",
    email: "sarah.j@techinnovate.com",
    phone: "(415) 555-7890",
    company: "TechInnovate Inc.",
    industry: "Technology",
    budget: "$15,000",
    score: 85,
    probability: 75,
    status: "Qualified Lead",
    lastContact: "2025-04-02",
    notes: "Interested in AI Copilot for their sales team of 35 people. Looking to implement in Q3."
  },
  {
    id: "L1002",
    name: "Michael Chen",
    email: "mchen@healthplus.org",
    phone: "(312) 555-3456",
    company: "HealthPlus",
    industry: "Healthcare",
    budget: "$8,500",
    score: 70,
    probability: 60,
    status: "Warm Lead",
    lastContact: "2025-04-05",
    notes: "Requested demo after webinar. Primary interest in lead scoring and CRM integration."
  },
  {
    id: "L1003",
    name: "Amanda Rodriguez",
    email: "amanda@nextedufuture.edu",
    phone: "(212) 555-9876",
    company: "NextEdu Future",
    industry: "Education",
    budget: "$20,000",
    score: 92,
    probability: 85,
    status: "Hot Lead",
    lastContact: "2025-04-08",
    notes: "Decision maker, urgently looking to implement before fall semester. Has budget approved."
  },
  {
    id: "L1004",
    name: "Raj Patel",
    email: "raj@quickcommerce.co",
    phone: "(650) 555-2345",
    company: "QuickCommerce",
    industry: "E-commerce",
    budget: "$12,000",
    score: 65,
    probability: 55,
    status: "Warm Lead",
    lastContact: "2025-03-28",
    notes: "Comparing solutions, concerned about implementation timeline and ROI calculation."
  },
  {
    id: "L1005",
    name: "Emma Wilson",
    email: "ewilson@financepro.com",
    phone: "(617) 555-8765",
    company: "FinancePro Services",
    industry: "Finance",
    budget: "$25,000",
    score: 88,
    probability: 80,
    status: "Hot Lead",
    lastContact: "2025-04-07",
    notes: "Looking to replace current system by Q2 end. Specifically interested in AI deal probability features."
  }
];

// Gemini API Service
interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

const GeminiService = {
  apiKey: 'AIzaSyBEAFoleUwqMl2Uk0TVx1PuyFsJ3vgzygg',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',

  async getResponse(userInput: string, leadData: Lead | Lead[]): Promise<string> {
    const salesAssistantContext = `
You are SalesAI Assistant, an AI tool helping sales reps get information about their leads.
You have access to lead data and can answer questions about specific leads or general sales performance.
Be professional, concise, and helpful.

Current lead information available: ${JSON.stringify(leadData)}

If asked about sales strategies, suggest:
1. Personalized outreach based on lead data
2. Follow-up within 24 hours of any interaction
3. Focus on value proposition relevant to lead's industry
4. Address specific pain points identified in lead notes
5. Suggest specific next actions based on lead status

Keep responses brief (2-3 sentences per point) and actionable.
`;

    const url = `${this.baseUrl}?key=${this.apiKey}`;
    
    const payload = {
      "contents": [
        {
          "role": "user",
          "parts": [
            {
              "text": `${salesAssistantContext}\n\nSales rep's question: ${userInput}\n\nYour response:`
            }
          ]
        }
      ],
      "generationConfig": {
        "temperature": 0.3,
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
        const jsonResponse: GeminiResponse = await response.json();
        return jsonResponse?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
      } else {
        console.error('Gemini API error:', response.status);
        throw new Error(`Failed to get response from Gemini: ${response.status}`);
      }
    } catch (e) {
      console.error('Error calling Gemini API:', e);
      return `I'm having trouble connecting to my knowledge base. Please try again in a moment. Error: ${e instanceof Error ? e.message : 'Unknown error'}`;
    }
  }
};

// Chat message component
const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot }) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex items-start max-w-3/4 p-3 rounded-lg ${isBot ? 'bg-blue-50 text-gray-800' : 'bg-emerald-500 text-white'}`}>
        <div className={`mr-2 p-2 rounded-full ${isBot ? 'bg-blue-100' : 'bg-emerald-600'}`}>
          {isBot ? <Bot className="w-5 h-5 text-blue-600" /> : <User className="w-5 h-5 text-white" />}
        </div>
        <div className="flex-1">
          {message}
        </div>
      </div>
    </div>
  );
};

// Lead card component
const LeadCard: React.FC<LeadCardProps> = ({ lead, onClick, isActive }) => {
  return (
    <div 
      className={`p-4 border rounded-lg mb-3 cursor-pointer transition-all ${
        isActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onClick(lead)}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">{lead.name}</h3>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          lead.status === 'Hot Lead' 
            ? 'bg-red-100 text-red-700' 
            : lead.status === 'Qualified Lead'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-yellow-100 text-yellow-700'
        }`}>
          {lead.status}
        </div>
      </div>
      <div className="text-sm text-gray-600 mt-1">{lead.company} • {lead.industry}</div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="w-3 h-3 mr-1" />
          <span>Last: {new Date(lead.lastContact).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <span className="text-xs mr-1 text-gray-500">Score:</span>
          <div className="flex items-center">
            <Star className="w-3 h-3 text-amber-500" />
            <span className="text-xs font-medium ml-1">{lead.score}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Lead details component
const LeadDetails: React.FC<LeadDetailsProps> = ({ lead }) => {
  if (!lead) return null;
  
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{lead.name}</h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          lead.status === 'Hot Lead' 
            ? 'bg-red-100 text-red-700' 
            : lead.status === 'Qualified Lead'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-yellow-100 text-yellow-700'
        }`}>
          {lead.status}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <div className="w-5 h-5 mr-2 flex items-center justify-center">
            <Info className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Company</div>
            <div className="text-sm font-medium">{lead.company}</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-5 h-5 mr-2 flex items-center justify-center">
            <Info className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Industry</div>
            <div className="text-sm font-medium">{lead.industry}</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-5 h-5 mr-2 flex items-center justify-center">
            <Info className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Email</div>
            <div className="text-sm font-medium">{lead.email}</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-5 h-5 mr-2 flex items-center justify-center">
            <Info className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Phone</div>
            <div className="text-sm font-medium">{lead.phone}</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-5 h-5 mr-2 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Budget</div>
            <div className="text-sm font-medium">{lead.budget}</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-5 h-5 mr-2 flex items-center justify-center">
            <BarChart className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <div className="text-xs text-gray-500">Probability</div>
            <div className="text-sm font-medium">{lead.probability}%</div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">Notes</div>
        <div className="text-sm p-3 bg-gray-50 rounded-lg border border-gray-100">
          {lead.notes}
        </div>
      </div>
      
      <div className="flex justify-between">
        <div className="flex flex-col items-center flex-1">
          <div className="text-xs text-gray-500 mb-2">Lead Score</div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
            {lead.score}%
          </div>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div className="text-xs text-gray-500 mb-2">Close Probability</div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
            {lead.probability}%
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Sales AI Assistant Component
const SalesTeamAIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    { role: 'bot', content: "Hi there! I'm your AI sales assistant. How can I help you with your leads today?" }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Filter leads based on search term
  const filteredLeads = LEADS.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (): Promise<void> => {
    if (!inputText.trim() || isLoading) return;
    
    const userMessage = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    
    try {
      // Get AI response considering the selected lead or all leads
      const leadContext = selectedLead ? selectedLead : LEADS;
      const response = await GeminiService.getResponse(userMessage, leadContext);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', content: response }]);
        setIsLoading(false);
      }, 600); // Small delay to make it feel more natural
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." 
      }]);
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleLeadClick = (lead: Lead): void => {
    setSelectedLead(lead);
    // Add a helpful message when a lead is selected
    if (!messages.some(msg => msg.content.includes(lead.name))) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: `I've loaded ${lead.name}'s data. What would you like to know about this ${lead.status.toLowerCase()} from ${lead.company}?` 
      }]);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Sales Team AI Assistant</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead list section */}
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Leads</h2>
            <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
              {filteredLeads.map(lead => (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  onClick={handleLeadClick} 
                  isActive={selectedLead !== null && selectedLead.id === lead.id}
                />
              ))}
              {filteredLeads.length === 0 && (
                <div className="text-center py-6 text-gray-500">No leads match your search</div>
              )}
            </div>
          </div>
          
          {/* Chat section */}
          <div className="bg-white rounded-xl shadow lg:col-span-2">
            <div className="flex flex-col h-[calc(100vh-150px)]">
              {/* Chat messages */}
              <div className="flex-1 p-6 overflow-y-auto bg-gray-50 rounded-t-xl">
                {messages.map((msg, idx) => (
                  <ChatMessage 
                    key={idx} 
                    message={msg.content} 
                    isBot={msg.role === 'bot'} 
                  />
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Selected lead details */}
              {selectedLead && (
                <div className="px-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Currently selected lead:</h3>
                    <button 
                      className="text-xs text-blue-600 hover:text-blue-800"
                      onClick={() => setSelectedLead(null)}
                    >
                      Clear selection
                    </button>
                  </div>
                  <div className="flex items-center bg-blue-50 p-2 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="ml-2">
                      <div className="text-sm font-medium">{selectedLead.name}</div>
                      <div className="text-xs text-gray-500">{selectedLead.company} • {selectedLead.status}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Input area */}
              <div className="p-4 border-t">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about your leads or sales strategies..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isLoading}
                    className={`px-6 py-3 bg-emerald-500 text-white rounded-lg flex items-center justify-center gap-2 transition-all ${
                      !inputText.trim() || isLoading 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-emerald-600'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Try asking: "Tell me about my hot leads" or "What's the best approach for Amanda?"
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Lead details panel - only visible when lead is selected */}
        {selectedLead && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Lead Details</h2>
            <LeadDetails lead={selectedLead} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesTeamAIAssistant;