import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { ContactForm } from './ContactForm';
import { AddressStep } from './AddressStep';
import { ResultsView } from './ResultsView';
import { QUESTIONS } from './constants';
import { UserContactInfo, AnalysisResult } from './types';
import { submitAnalysisToBackend } fro './backendSimulation';
import { ArrowRight, Home, ShieldCheck, Clock } from 'lucide-react';

enum Step {
  INTRO = 'INTRO',
  ADDRESS_CHECK = 'ADDRESS_CHECK',
  QUESTIONS = 'QUESTIONS',
  CONTACT_DETAILS = 'CONTACT_DETAILS',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS'
}

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.INTRO);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  // We collect partial data first (address), then the rest (name/email)
  const [partialContact, setPartialContact] = useState<Partial<UserContactInfo>>({});
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, currentQuestionIndex]);

  const handleStart = () => {
    setCurrentStep(Step.ADDRESS_CHECK);
  };

  const handleAddressComplete = (addressData: Partial<UserContactInfo>) => {
    setPartialContact(addressData);
    setCurrentStep(Step.QUESTIONS);
  };

  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    
    // Slight delay for better UX
    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setCurrentStep(Step.CONTACT_DETAILS);
      }
    }, 300);
  };

  const handleFinalSubmit = async (fullInfo: UserContactInfo) => {
    // Merge the address data with the name/email data
    const completeContact = { ...partialContact, ...fullInfo } as UserContactInfo;
    
    setCurrentStep(Step.ANALYZING);

    try {
      const result = await submitAnalysisToBackend(answers, completeContact);
      setAnalysisResult(result);
      // Pass the complete user info to the results view
      setPartialContact(completeContact); 
      setCurrentStep(Step.RESULTS);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Er is iets misgegaan bij het berekenen. Probeer het opnieuw.");
      setCurrentStep(Step.CONTACT_DETAILS);
    }
  };

  const renderIntro = () => (
    <div className="max-w-4xl mx-auto text-center pt-8 md:pt-16 pb-12">
      <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
        Online Bouwkundige Analyse
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
        Achterhaal de bouwkundige oorzaak van <span className="text-blue-600">vochtproblemen</span>
      </h1>
      <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
        Combineer uw woningdata uit het Kadaster met een specialistische analyse voor een betrouwbaar indicatierapport.
      </p>
      
      <button 
        onClick={handleStart}
        className="group bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 px-10 rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 flex items-center gap-3 mx-auto"
      >
        Start Diagnose
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-left px-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <Clock className="w-8 h-8 text-blue-500 mb-4" />
          <h3 className="font-bold text-slate-800 text-lg mb-2">Direct Resultaat</h3>
          <p className="text-slate-500">Ontvang binnen 2 minuten een uitgebreide indicatie van de waarschijnlijke oorzaak.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <ShieldCheck className="w-8 h-8 text-blue-500 mb-4" />
          <h3 className="font-bold text-slate-800 text-lg mb-2">BAG Woningdata</h3>
          <p className="text-slate-500">Wij valideren uw bouwjaar automatisch via het Kadaster voor een nauwkeurigere weging.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <Home className="w-8 h-8 text-blue-500 mb-4" />
          <h3 className="font-bold text-slate-800 text-lg mb-2">Voor de Expert</h3>
          <p className="text-slate-500">U ontvangt een technisch actieplan dat u direct kunt overhandigen aan een specialist.</p>
        </div>
      </div>
    </div>
  );

  const renderAnalyzing = () => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-bold text-slate-800">Gegevens analyseren...</h2>
      <p className="text-slate-500 mt-2">We combineren uw woningdata met de gegeven antwoorden.</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        
        {currentStep === Step.INTRO && renderIntro()}

        {currentStep === Step.ADDRESS_CHECK && (
            <AddressStep onComplete={handleAddressComplete} />
        )}

        {currentStep === Step.QUESTIONS && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex items-center justify-between text-sm text-slate-500 font-medium">
              <span>Vraag {currentQuestionIndex + 1} van {QUESTIONS.length}</span>
              <span>{Math.round(((currentQuestionIndex) / QUESTIONS.length) * 100)}% voltooid</span>
            </div>
            <ProgressBar current={currentQuestionIndex + 1} total={QUESTIONS.length} />
            
            <QuestionCard 
              question={QUESTIONS[currentQuestionIndex]}
              onAnswer={handleAnswer}
              selectedOptionId={answers[QUESTIONS[currentQuestionIndex].id]}
            />

            <div className="mt-8 flex justify-between">
              <button 
                onClick={() => currentQuestionIndex > 0 ? setCurrentQuestionIndex(curr => curr - 1) : setCurrentStep(Step.ADDRESS_CHECK)}
                className="text-slate-400 hover:text-slate-600 font-medium px-4 py-2"
              >
                Vorige
              </button>
            </div>
          </div>
        )}

        {currentStep === Step.CONTACT_DETAILS && (
          <ContactForm 
            initialData={partialContact}
            onSubmit={handleFinalSubmit} 
            onBack={() => setCurrentStep(Step.QUESTIONS)}
          />
        )}

        {currentStep === Step.ANALYZING && renderAnalyzing()}

        {currentStep === Step.RESULTS && analysisResult && partialContact && (
          <div className="max-w-4xl mx-auto">
             <button 
                onClick={() => window.location.reload()}
                className="mb-6 text-slate-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
              >
                ← Nieuwe diagnose starten
              </button>
            <ResultsView result={analysisResult} user={partialContact as UserContactInfo} />
          </div>
        )}

      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} VochtExpert Diagnose Tool. Alle rechten voorbehouden.</p>
          <p className="mt-2">Disclaimer: Dit rapport is een indicatie en vervangt geen professionele inspectie op locatie.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
