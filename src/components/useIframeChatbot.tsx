import React, { useState, useEffect, useRef } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

// Define translations
const translations = {
  en: {
    leadScore: "Lead Score",
    engagement: "Engagement",
    interest: "Interest",
    fit: "Fit",
    dealPrediction: "Deal Prediction",
    estimated: "Est. Value",
    time: "Time Frame",
    leadInfo: "Lead Information",
    name: "Name",
    email: "Email",
    phone: "Phone",
    industry: "Industry",
    budget: "Budget",
    service: "Service Required",
    source: "Lead Source",
    status: "Status",
    welcomeTitle: "Welcome to our AI Lead Assistant",
    welcomeDescription: "Our intelligent chatbot is ready to understand your needs and provide personalized solutions. Let's start a conversation to discover how we can help with your projects.",
    startChat: "Start Chat",
    typePlaceholder: "Type your message...",
    greeting: "Hello! I'm your AI assistant. How can I help you today?",
    nameQuestion: "What's your name?",
    emailQuestion: "Could you share your email address?",
    phoneQuestion: "What's your phone number?",
    industryQuestion: "What industry are you in?",
    budgetQuestion: "What's your approximate budget for this project?",
    serviceQuestion: "What services are you looking for?",
    thanksResponse: "Thank you for providing your information! Based on your needs, we offer custom solutions in {{service}} for the {{industry}} industry. Our team has extensive experience with projects in the {{budget}} range. Would you like to know more about our specific capabilities?",
    options: {
      yes: "Yes, tell me more",
      no: "No, thanks",
      services: "Services offered",
      pricing: "Pricing information",
      contact: "Contact a human agent"
    }
  },
  es: {
    leadScore: "Puntuación de Lead",
    engagement: "Compromiso",
    interest: "Interés",
    fit: "Compatibilidad",
    dealPrediction: "Predicción de Acuerdo",
    estimated: "Valor Est.",
    time: "Plazo",
    leadInfo: "Información del Lead",
    name: "Nombre",
    email: "Correo",
    phone: "Teléfono",
    industry: "Industria",
    budget: "Presupuesto",
    service: "Servicio Requerido",
    source: "Fuente del Lead",
    status: "Estado",
    welcomeTitle: "Bienvenido a nuestro Asistente de Leads IA",
    welcomeDescription: "Nuestro chatbot inteligente está listo para entender sus necesidades y proporcionar soluciones personalizadas. Iniciemos una conversación para descubrir cómo podemos ayudar con sus proyectos.",
    startChat: "Iniciar Chat",
    typePlaceholder: "Escribe tu mensaje...",
    greeting: "¡Hola! Soy tu asistente de IA. ¿Cómo puedo ayudarte hoy?",
    nameQuestion: "¿Cuál es tu nombre?",
    emailQuestion: "¿Podrías compartir tu dirección de correo electrónico?",
    phoneQuestion: "¿Cuál es tu número de teléfono?",
    industryQuestion: "¿En qué industria te encuentras?",
    budgetQuestion: "¿Cuál es tu presupuesto aproximado para este proyecto?",
    serviceQuestion: "¿Qué servicios estás buscando?",
    thanksResponse: "¡Gracias por proporcionar tu información! Según tus necesidades, ofrecemos soluciones personalizadas en {{service}} para la industria {{industry}}. Nuestro equipo tiene amplia experiencia con proyectos en el rango de {{budget}}. ¿Te gustaría saber más sobre nuestras capacidades específicas?",
    options: {
      yes: "Sí, cuéntame más",
      no: "No, gracias",
      services: "Servicios ofrecidos",
      pricing: "Información de precios",
      contact: "Contactar con un agente humano"
    }
  },
  fr: {
    leadScore: "Score du Lead",
    engagement: "Engagement",
    interest: "Intérêt",
    fit: "Adéquation",
    dealPrediction: "Prédiction d'Affaire",
    estimated: "Val. Estimée",
    time: "Délai",
    leadInfo: "Informations du Lead",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    industry: "Industrie",
    budget: "Budget",
    service: "Service Requis",
    source: "Source du Lead",
    status: "Statut",
    welcomeTitle: "Bienvenue sur notre Assistant IA pour Leads",
    welcomeDescription: "Notre chatbot intelligent est prêt à comprendre vos besoins et à fournir des solutions personnalisées. Commençons une conversation pour découvrir comment nous pouvons vous aider avec vos projets.",
    startChat: "Démarrer le Chat",
    typePlaceholder: "Tapez votre message...",
    greeting: "Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui ?",
    nameQuestion: "Quel est votre nom ?",
    emailQuestion: "Pourriez-vous partager votre adresse e-mail ?",
    phoneQuestion: "Quel est votre numéro de téléphone ?",
    industryQuestion: "Dans quelle industrie êtes-vous ?",
    budgetQuestion: "Quel est votre budget approximatif pour ce projet ?",
    serviceQuestion: "Quels services recherchez-vous ?",
    thanksResponse: "Merci d'avoir fourni vos informations ! Selon vos besoins, nous proposons des solutions personnalisées en {{service}} pour l'industrie {{industry}}. Notre équipe a une vaste expérience avec des projets dans la gamme de {{budget}}. Souhaitez-vous en savoir plus sur nos capacités spécifiques ?",
    options: {
      yes: "Oui, dites-m'en plus",
      no: "Non, merci",
      services: "Services proposés",
      pricing: "Informations sur les prix",
      contact: "Contacter un agent humain"
    }
  },
  // Indian Languages
  hi: {
    leadScore: "लीड स्कोर",
    engagement: "एंगेजमेंट",
    interest: "रुचि",
    fit: "फिट",
    dealPrediction: "डील की भविष्यवाणी",
    estimated: "अनुमानित मूल्य",
    time: "समय सीमा",
    leadInfo: "लीड जानकारी",
    name: "नाम",
    email: "ईमेल",
    phone: "फोन",
    industry: "उद्योग",
    budget: "बजट",
    service: "आवश्यक सेवा",
    source: "लीड स्रोत",
    status: "स्थिति",
    welcomeTitle: "हमारे AI लीड असिस्टेंट में आपका स्वागत है",
    welcomeDescription: "हमारा बुद्धिमान चैटबॉट आपकी ज़रूरतों को समझने और व्यक्तिगत समाधान प्रदान करने के लिए तैयार है। आइए एक वार्तालाप शुरू करें ताकि पता चल सके कि हम आपके प्रोजेक्ट्स में कैसे मदद कर सकते हैं।",
    startChat: "चैट शुरू करें",
    typePlaceholder: "अपना संदेश लिखें...",
    greeting: "नमस्ते! मैं आपका AI सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
    nameQuestion: "आपका नाम क्या है?",
    emailQuestion: "क्या आप अपना ईमेल पता साझा कर सकते हैं?",
    phoneQuestion: "आपका फोन नंबर क्या है?",
    industryQuestion: "आप किस उद्योग में हैं?",
    budgetQuestion: "इस प्रोजेक्ट के लिए आपका अनुमानित बजट क्या है?",
    serviceQuestion: "आप किन सेवाओं की तलाश कर रहे हैं?",
    thanksResponse: "अपनी जानकारी प्रदान करने के लिए धन्यवाद! आपकी आवश्यकताओं के आधार पर, हम {{industry}} उद्योग के लिए {{service}} में कस्टम समाधान प्रदान करते हैं। हमारी टीम को {{budget}} श्रेणी के प्रोजेक्ट्स के साथ व्यापक अनुभव है। क्या आप हमारी विशिष्ट क्षमताओं के बारे में अधिक जानना चाहेंगे?",
    options: {
      yes: "हां, मुझे और बताएं",
      no: "नहीं, धन्यवाद",
      services: "प्रदान की जाने वाली सेवाएं",
      pricing: "मूल्य निर्धारण जानकारी",
      contact: "मानव एजेंट से संपर्क करें"
    }
  },
  bn: {
    leadScore: "লিড স্কোর",
    engagement: "এনগেজমেন্ট",
    interest: "আগ্রহ",
    fit: "ফিট",
    dealPrediction: "ডিল প্রেডিকশন",
    estimated: "আনুমানিক মূল্য",
    time: "সময়সীমা",
    leadInfo: "লিড তথ্য",
    name: "নাম",
    email: "ইমেল",
    phone: "ফোন",
    industry: "শিল্প",
    budget: "বাজেট",
    service: "প্রয়োজনীয় সেবা",
    source: "লিড সোর্স",
    status: "স্ট্যাটাস",
    welcomeTitle: "আমাদের AI লিড সহায়কে আপনাকে স্বাগতম",
    welcomeDescription: "আমাদের বুদ্ধিমান চ্যাটবট আপনার প্রয়োজনীয়তা বুঝতে এবং ব্যক্তিগতকৃত সমাধান প্রদান করতে প্রস্তুত। আসুন একটি কথোপকথন শুরু করি যাতে আমরা কিভাবে আপনার প্রকল্পগুলিতে সাহায্য করতে পারি তা আবিষ্কার করতে পারি।",
    startChat: "চ্যাট শুরু করুন",
    typePlaceholder: "আপনার বার্তা টাইপ করুন...",
    greeting: "হ্যালো! আমি আপনার AI সহায়ক। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
    nameQuestion: "আপনার নাম কি?",
    emailQuestion: "আপনি কি আপনার ইমেল ঠিকানা শেয়ার করতে পারেন?",
    phoneQuestion: "আপনার ফোন নম্বর কি?",
    industryQuestion: "আপনি কোন শিল্পে আছেন?",
    budgetQuestion: "এই প্রজেক্টের জন্য আপনার আনুমানিক বাজেট কত?",
    serviceQuestion: "আপনি কোন সেবাগুলি খুঁজছেন?",
    thanksResponse: "আপনার তথ্য প্রদান করার জন্য ধন্যবাদ! আপনার প্রয়োজনীয়তার উপর ভিত্তি করে, আমরা {{industry}} শিল্পের জন্য {{service}} এ কাস্টম সমাধান অফার করি। আমাদের দলের {{budget}} সীমার প্রকল্পগুলির সাথে ব্যাপক অভিজ্ঞতা রয়েছে। আপনি কি আমাদের নির্দিষ্ট ক্ষমতা সম্পর্কে আরও জানতে চান?",
    options: {
      yes: "হ্যাঁ, আমাকে আরও বলুন",
      no: "না, ধন্যবাদ",
      services: "অফার করা সেবাগুলি",
      pricing: "মূল্য নির্ধারণ তথ্য",
      contact: "একজন মানুষ এজেন্টের সাথে যোগাযোগ করুন"
    }
  },
  ta: {
    leadScore: "லீட் மதிப்பெண்",
    engagement: "ஈடுபாடு",
    interest: "ஆர்வம்",
    fit: "பொருத்தம்",
    dealPrediction: "ஒப்பந்த கணிப்பு",
    estimated: "மதிப்பிடப்பட்ட மதிப்பு",
    time: "கால அளவு",
    leadInfo: "லீட் தகவல்",
    name: "பெயர்",
    email: "மின்னஞ்சல்",
    phone: "தொலைபேசி",
    industry: "தொழில்துறை",
    budget: "பட்ஜெட்",
    service: "தேவையான சேவை",
    source: "லீட் மூலம்",
    status: "நிலை",
    welcomeTitle: "எங்கள் AI லீட் உதவியாளருக்கு வரவேற்கிறோம்",
    welcomeDescription: "எங்கள் செயற்கை அறிவு சாட்போட் உங்கள் தேவைகளைப் புரிந்துகொண்டு தனிப்பயனாக்கப்பட்ட தீர்வுகளை வழங்க தயாராக உள்ளது. உங்கள் திட்டங்களில் நாங்கள் எவ்வாறு உதவ முடியும் என்பதைக் கண்டறிய ஒரு உரையாடலைத் தொடங்குவோம்.",
    startChat: "உரையாடலைத் தொடங்கு",
    typePlaceholder: "உங்கள் செய்தியை தட்டச்சு செய்யவும்...",
    greeting: "வணக்கம்! நான் உங்கள் AI உதவியாளர். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
    nameQuestion: "உங்கள் பெயர் என்ன?",
    emailQuestion: "உங்கள் மின்னஞ்சல் முகவரியைப் பகிர முடியுமா?",
    phoneQuestion: "உங்கள் தொலைபேசி எண் என்ன?",
    industryQuestion: "நீங்கள் எந்த தொழில்துறையில் இருக்கிறீர்கள்?",
    budgetQuestion: "இந்த திட்டத்திற்கான உங்கள் தோராயமான பட்ஜெட் என்ன?",
    serviceQuestion: "நீங்கள் எந்த சேவைகளை தேடுகிறீர்கள்?",
    thanksResponse: "உங்கள் தகவலை வழங்கியதற்கு நன்றி! உங்கள் தேவைகளின் அடிப்படையில், நாங்கள் {{industry}} தொழில்துறைக்கான {{service}} இல் தனிப்பயனாக்கப்பட்ட தீர்வுகளை வழங்குகிறோம். எங்கள் குழு {{budget}} வரம்பில் உள்ள திட்டங்களில் பரந்த அனுபவம் கொண்டுள்ளது. எங்கள் குறிப்பிட்ட திறன்கள் பற்றி மேலும் அறிய விரும்புகிறீர்களா?",
    options: {
      yes: "ஆம், எனக்கு மேலும் சொல்லுங்கள்",
      no: "இல்லை, நன்றி",
      services: "வழங்கப்படும் சேவைகள்",
      pricing: "விலை நிர்ணய தகவல்",
      contact: "மனித முகவரை தொடர்பு கொள்ளவும்"
    }
  },
  te: {
    leadScore: "లీడ్ స్కోర్",
    engagement: "ఎంగేజ్మెంట్",
    interest: "ఆసక్తి",
    fit: "ఫిట్",
    dealPrediction: "డీల్ ప్రెడిక్షన్",
    estimated: "అంచనా విలువ",
    time: "కాల వ్యవధి",
    leadInfo: "లీడ్ సమాచారం",
    name: "పేరు",
    email: "ఇమెయిల్",
    phone: "ఫోన్",
    industry: "పరిశ్రమ",
    budget: "బడ్జెట్",
    service: "అవసరమైన సేవ",
    source: "లీడ్ మూలం",
    status: "స్థితి",
    welcomeTitle: "మా AI లీడ్ సహాయకుడికి స్వాగతం",
    welcomeDescription: "మా తెలివైన చాట్‌బాట్ మీ అవసరాలను అర్థం చేసుకుని వ్యక్తిగతీకరించిన పరిష్కారాలను అందించడానికి సిద్ధంగా ఉంది. మీ ప్రాజెక్ట్‌లలో మేము ఎలా సహాయపడగలమో కనుగొనడానికి ఒక సంభాషణను ప్రారంభిద్దాం.",
    startChat: "చాట్ ప్రారంభించండి",
    typePlaceholder: "మీ సందేశాన్ని టైప్ చేయండి...",
    greeting: "హలో! నేను మీ AI సహాయకుడిని. నేడు నేను మీకు ఎలా సహాయపడగలను?",
    nameQuestion: "మీ పేరు ఏమిటి?",
    emailQuestion: "మీ ఇమెయిల్ చిరునామాను పంచుకోగలరా?",
    phoneQuestion: "మీ ఫోన్ నంబర్ ఏమిటి?",
    industryQuestion: "మీరు ఏ పరిశ్రమలో ఉన్నారు?",
    budgetQuestion: "ఈ ప్రాజెక్ట్ కోసం మీ అంచనా బడ్జెట్ ఎంత?",
    serviceQuestion: "మీరు ఏ సేవలను వెతుకుతున్నారు?",
    thanksResponse: "మీ సమాచారాన్ని అందించినందుకు ధన్యవాదాలు! మీ అవసరాల ఆధారంగా, మేము {{industry}} పరిశ్రమ కోసం {{service}}లో కస్టమ్ పరిష్కారాలను అందిస్తాము. మా బృందానికి {{budget}} రేంజ్‌లో ప్రాజెక్ట్‌లతో విస్తృత అనుభవం ఉంది. మా నిర్దిష్ట సామర్థ్యాల గురించి మీరు మరింత తెలుసుకోవాలనుకుంటున్నారా?",
    options: {
      yes: "అవును, నాకు మరింత చెప్పండి",
      no: "వద్దు, ధన్యవాదాలు",
      services: "అందించే సేవలు",
      pricing: "ధర సమాచారం",
      contact: "మానవ ఏజెంట్‌ను సంప్రదించండి"
    }
  },
  mr: {
    leadScore: "लीड स्कोर",
    engagement: "एंगेजमेंट",
    interest: "आवड",
    fit: "फिट",
    dealPrediction: "डील भविष्यवाणी",
    estimated: "अंदाजित मूल्य",
    time: "कालावधी",
    leadInfo: "लीड माहिती",
    name: "नाव",
    email: "ईमेल",
    phone: "फोन",
    industry: "उद्योग",
    budget: "बजेट",
    service: "आवश्यक सेवा",
    source: "लीड स्रोत",
    status: "स्थिती",
    welcomeTitle: "आमच्या AI लीड असिस्टंटमध्ये आपले स्वागत आहे",
    welcomeDescription: "आमचा बुद्धिमान चॅटबॉट आपल्या गरजा समजून घेण्यासाठी आणि वैयक्तिकृत उपाय देण्यासाठी तयार आहे. आपल्या प्रकल्पांमध्ये आम्ही कशी मदत करू शकतो हे शोधण्यासाठी एक संभाषण सुरू करूया.",
    startChat: "चॅट सुरू करा",
    typePlaceholder: "आपला संदेश टाइप करा...",
    greeting: "नमस्कार! मी तुमचा AI सहाय्यक आहे. आज मी तुम्हाला कशी मदत करू शकतो?",
    nameQuestion: "तुमचे नाव काय आहे?",
    emailQuestion: "तुम्ही तुमचा ईमेल पत्ता शेअर करू शकता का?",
    phoneQuestion: "तुमचा फोन नंबर काय आहे?",
    industryQuestion: "तुम्ही कोणत्या उद्योगात आहात?",
    budgetQuestion: "या प्रकल्पासाठी तुमचे अंदाजे बजेट काय आहे?",
    serviceQuestion: "तुम्ही कोणत्या सेवा शोधत आहात?",
    thanksResponse: "तुमची माहिती प्रदान केल्याबद्दल धन्यवाद! तुमच्या गरजांवर आधारित, आम्ही {{industry}} उद्योगासाठी {{service}} मध्ये सानुकूल उपाय देतो. आमच्या टीमला {{budget}} रेंजमधील प्रकल्पांसह विस्तृत अनुभव आहे. तुम्हाला आमच्या विशिष्ट क्षमतांबद्दल अधिक जाणून घ्यायला आवडेल का?",
    options: {
      yes: "होय, मला अधिक सांगा",
      no: "नाही, धन्यवाद",
      services: "ऑफर केलेल्या सेवा",
      pricing: "किंमत माहिती",
      contact: "मानवी एजंटशी संपर्क साधा"
    }
  },
  gu: {
    leadScore: "લીડ સ્કોર",
    engagement: "એંગેજમેન્ટ",
    interest: "રુચિ",
    fit: "ફિટ",
    dealPrediction: "ડીલ પ્રેડિક્શન",
    estimated: "અંદાજિત મૂલ્ય",
    time: "સમય મર્યાદા",
    leadInfo: "લીડ માહિતી",
    name: "નામ",
    email: "ઇમેઇલ",
    phone: "ફોન",
    industry: "ઉદ્યોગ",
    budget: "બજેટ",
    service: "જરૂરી સેવા",
    source: "લીડ સ્રોત",
    status: "સ્થિતિ",
    welcomeTitle: "અમારા AI લીડ સહાયકમાં આપનું સ્વાગત છે",
    welcomeDescription: "અમારું બુદ્ધિશાળી ચેટબોટ તમારી જરૂરિયાતોને સમજવા અને વ્યક્તિગત ઉકેલો પ્રદાન કરવા માટે તૈયાર છે. ચાલો એક વાતચીત શરૂ કરીએ જેથી અમે તમારા પ્રોજેક્ટ્સમાં કેવી રીતે મદદ કરી શકીએ તે શોધી શકીએ.",
    startChat: "ચેટ શરૂ કરો",
    typePlaceholder: "તમારો સંદેશો ટાઇપ કરો...",
    greeting: "નમસ્તે! હું તમારો AI સહાયક છું. આજે હું તમને કેવી રીતે મદદ કરી શકું?",
    nameQuestion: "તમારું નામ શું છે?",
    emailQuestion: "શું તમે તમારું ઇમેઇલ સરનામું શેર કરી શકો છો?",
    phoneQuestion: "તમારો ફોન નંબર શું છે?",
    industryQuestion: "તમે કયા ઉદ્યોગમાં છો?",
    budgetQuestion: "આ પ્રોજેક્ટ માટે તમારું અંદાજિત બજેટ શું છે?",
    serviceQuestion: "તમે કઈ સેવાઓ શોધી રહ્યાં છો?",
    thanksResponse: "તમારી માહિતી પ્રદાન કરવા બદલ આભાર! તમારી જરૂરિયાતોના આધારે, અમે {{industry}} ઉદ્યોગ માટે {{service}}માં કસ્ટમ સોલ્યુશન્સ ઓફર કરીએ છીએ. અમારી ટીમને {{budget}} રેન્જના પ્રોજેક્ટ્સ સાથે વિશાળ અનુભવ છે. શું તમે અમારી ચોક્કસ ક્ષમતાઓ વિશે વધુ જાણવા માંગો છો?",
    options: {
      yes: "હા, મને વધુ કહો",
      no: "ના, આભાર",
      services: "ઓફર કરેલી સેવાઓ",
      pricing: "કિંમત માહિતી",
      contact: "માનવ એજન્ટનો સંપર્ક કરો"
    }
  },
    kn: {
    leadScore: "ಲೀಡ್ ಸ್ಕೋರ್",
    engagement: "ಒಳಗೊಳ್ಳುವಿಕೆ",
    interest: "ಆಸಕ್ತಿ",
    fit: "ಹೊಂದಾಣಿಕೆ",
    dealPrediction: "ಡೀಲ್ ಭವಿಷ್ಯವಾಣಿ",
    estimated: "ಅಂದಾಜು ಮೌಲ್ಯ",
    time: "ಸಮಯ ಸೀಮೆ",
    leadInfo: "ಲೀಡ್ ಮಾಹಿತಿ",
    name: "ಹೆಸರು",
    email: "ಇಮೇಲ್",
    phone: "ಫೋನ್",
    industry: "ಉದ್ಯೋಗ",
    budget: "ಬಜೆಟ್",
    service: "ಅಗತ್ಯ ಸೇವೆ",
    source: "ಲೀಡ್ ಮೂಲ",
    status: "ಸ್ಥಿತಿ",
    welcomeTitle: "ನಮ್ಮ AI ಲೀಡ್ ಸಹಾಯಕಕ್ಕೆ ಸ್ವಾಗತ",
    welcomeDescription: "ನಮ್ಮ ಬುದ್ಧಿವಂತ ಚಾಟ್‌ಬಾಟ್ ನಿಮ್ಮ ಅಗತ್ಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಪರಿಹಾರಗಳನ್ನು ನೀಡಲು ಸಿದ್ಧವಾಗಿದೆ. ನಿಮ್ಮ ಯೋಜನೆಗಳಿಗೆ ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು ಎಂಬುದನ್ನು ಕಂಡುಹಿಡಿಯಲು ಒಂದು ಸಂಭಾಷಣೆಯನ್ನು ಪ್ರಾರಂಭಿಸೋಣ.",
    startChat: "ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ",
    typePlaceholder: "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...",
    greeting: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    nameQuestion: "ನಿಮ್ಮ ಹೆಸರೇನು?",
    emailQuestion: "ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ಹಂಚಿಕೊಳ್ಳಬಹುದಾಗಿದೆಯೇ?",
    phoneQuestion: "ನಿಮ್ಮ ಫೋನ್ ನಂಬರ್ ಏನು?",
    industryQuestion: "ನೀವು ಯಾವ ಉದ್ಯೋಗದಲ್ಲಿದ್ದೀರಿ?",
    budgetQuestion: "ಈ ಯೋಜನೆಗೆ ನಿಮ್ಮ ಅಂದಾಜು ಬಜೆಟ್ ಏನು?",
    serviceQuestion: "ನೀವು ಯಾವ ಸೇವೆಗಳನ್ನು ಹುಡುಕುತ್ತಿದ್ದೀರಿ?",
    thanksResponse: "ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ನೀಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಅಗತ್ಯಗಳ ಆಧಾರದ ಮೇಲೆ, ನಾವು {{industry}} ಉದ್ಯೋಗಕ್ಕಾಗಿ {{service}} ನಲ್ಲಿ ಕಸ್ಟಮ್ ಪರಿಹಾರಗಳನ್ನು ನೀಡುತ್ತೇವೆ. ನಮ್ಮ ತಂಡವು {{budget}} ವ್ಯಾಪ್ತಿಯ ಯೋಜನೆಗಳಲ್ಲಿ ವ್ಯಾಪಕ ಅನುಭವವನ್ನು ಹೊಂದಿದೆ. ನಮ್ಮ ನಿರ್ದಿಷ್ಟ ಸಾಮರ್ಥ್ಯಗಳ ಬಗ್ಗೆ ಹೆಚ್ಚು ತಿಳಿಯಲು ನೀವು ಬಯಸುವಿರಾ?",
    options: {
      yes: "ಹೌದು, ಇನ್ನಷ್ಟು ಹೇಳಿ",
      no: "ಇಲ್ಲ, ಧನ್ಯವಾದಗಳು",
      services: "ಒದಗಿಸಲಾದ ಸೇವೆಗಳು",
      pricing: "ಬೆಲೆ ನಿರ್ಣಯ ಮಾಹಿತಿ",
      contact: "ಮಾನವ ಏಜೆಂಟ್‌ನನ್ನು ಸಂಪರ್ಕಿಸಿ"
    }
  },
};

// Initialize i18next
i18next
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Chatbot component
const uselIframeChatBot = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  interface ChatMessage {
    text: string;
    sender: 'user' | 'bot';
  }
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  interface UserData {
    name?: string;
    email?: string;
    phone?: string;
    industry?: string;
    budget?: string;
    service?: string;
  }
  const [userData, setUserData] = useState<UserData>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const steps = [
    { question: t('greeting') },
    { question: t('nameQuestion'), field: 'name' },
    { question: t('emailQuestion'), field: 'email' },
    { question: t('phoneQuestion'), field: 'phone' },
    { question: t('industryQuestion'), field: 'industry' },
    { question: t('budgetQuestion'), field: 'budget' },
    { question: t('serviceQuestion'), field: 'service' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    setMessages([...messages, { text: input, sender: 'user' }]);

    // Update user data based on current step
    if (steps[currentStep].field) {
      setUserData({ ...userData, [steps[currentStep].field]: input });
    }

    // Add bot response
    setTimeout(() => {
      let botResponse;
      if (currentStep < steps.length - 1) {
        botResponse = steps[currentStep + 1].question;
      } else {
        botResponse = t('thanksResponse', {
          service: userData.service,
          industry: userData.industry,
          budget: userData.budget
        });
      }
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      setCurrentStep(current => current < steps.length ? current + 1 : current);
    }, 500);

    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 max-w-md">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
        >
          {t('startChat')}
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t('welcomeTitle')}</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="h-96 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('typePlaceholder')}
                className="flex-1 p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                →
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
export default uselIframeChatBot;