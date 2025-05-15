// src/pages/Premium.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Premium = () => {
  const { theme } = useContext(ThemeContext);

  const subscriptionPlans = [
    {
      id: 1,
      name: "Individual",
      price: "$11.99/month",
      description: "Ad-free music, offline listening, and background play",
      features: [
        "Ad-free YouTube videos",
        "Background play",
        "Downloads for offline viewing",
        "YouTube Music Premium included"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Student",
      price: "$6.99/month",
      description: "All Premium benefits at a discounted price for eligible students",
      features: [
        "All Individual plan features",
        "Special student discount",
        "Requires annual verification"
      ],
      popular: false
    },
    {
      id: 3,
      name: "Family",
      price: "$22.99/month",
      description: "Share with up to 5 family members (ages 13+) living in the same household",
      features: [
        "All Individual plan features",
        "Up to 5 additional accounts",
        "Personalized recommendations for each member",
        "Family mix playlist"
      ],
      popular: true
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">YouTube Premium</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Enjoy ad-free videos, background play, downloads, and YouTube Music Premium — all in one plan
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold text-lg transition transform hover:scale-105">
              Try it free for 1 month
            </button>
            <button className={`px-8 py-3 rounded-full font-bold text-lg border-2 ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'} transition`}>
              Learn more
            </button>
          </div>
          <p className="text-sm text-gray-500">*Cancel anytime before the trial ends. Offer available for new subscribers only.</p>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Why go Premium?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Ad-free</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Watch videos without interruptions by ads</p>
            </div>
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Background play</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Listen to videos when your screen is off</p>
            </div>
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Downloads</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Save videos for offline viewing</p>
            </div>
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">YouTube Music</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Included with your membership</p>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Choose your plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative rounded-2xl overflow-hidden border-2 ${plan.popular ? 'border-red-500' : theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-12">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold mb-4">{plan.price}</p>
                  <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 px-6 rounded-full font-bold ${plan.popular ? 'bg-red-600 hover:bg-red-700' : theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} text-white transition`}>
                    {plan.popular ? 'Get Premium' : 'Select'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently asked questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "What's included with YouTube Premium?",
                answer: "YouTube Premium includes ad-free videos, background play, downloads, and access to YouTube Music Premium."
              },
              {
                question: "How does the free trial work?",
                answer: "New members can try YouTube Premium free for 1 month. Cancel anytime before the trial ends to avoid being charged."
              },
              {
                question: "Can I share my Premium membership?",
                answer: "With the Family plan, you can share your membership with up to 5 family members (ages 13+) living in the same household."
              },
              {
                question: "What happens if I cancel my membership?",
                answer: "If you cancel, you'll lose access to Premium benefits at the end of your billing period. You can re-subscribe anytime."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`border rounded-lg overflow-hidden ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <button className={`w-full text-left p-4 ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} flex justify-between items-center`}>
                  <span className="font-medium">{item.question}</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;