import React, { useState } from 'react';
import { AnalysisResult, CauseType, UserContactInfo } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle, AlertTriangle, ClipboardList, Printer, ShieldCheck, ArrowRight, Download, Loader2, Info, Link as LinkIcon, FileText, Mail, Share2 } from 'lucide-react';

interface Props {
  result: AnalysisResult;
  user: UserContactInfo;
}

export const ResultsView: React.FC<Props> = ({ result, user }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const chartData = result.scores.map(s => ({
    name: s.cause,
    value: s.percentage
  })).slice(0, 4);

  const getColor = (index: number) => {
    if (index === 0) return '#2563eb';
    if (index === 1) return '#60a5fa';
    return '#94a3b8';
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    const element = document.getElementById('report-container');
    
    const opt = {
      margin:       [10, 10], 
      filename:     `Vochtanalyse-${user.name.replace(/\s+/g, '-') || 'Rapport'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      if ((window as any).html2pdf) {
        await (window as any).html2pdf().set(opt).from(element).save();
      } else {
        console.warn('html2pdf library not found, falling back to window.print');
        window.print();
      }
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Er ging iets mis bij het maken van de PDF. We openen het printscherm als alternatief.');
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleMailTo = () => {
    const subject = encodeURIComponent(`Vochtanalyse Rapport: ${user.street} ${user.houseNumber}`);
    const body = encodeURIComponent(
      `Beste,\n\n` +
      `Hierbij de resultaten van de online vochtdiagnose voor ${user.street} ${user.houseNumber}.\n\n` +
      `HOOFDOORZAAK (INDICATIE): ${result.topCause} (${result.scores[0].percentage}%)\n\n` +
      `SAMENVATTING:\n${result.summary}\n\n` +
      `ACTIEPLAN:\n${result.recommendations.map(r => `- ${r}`).join('\n')}\n\n` +
      `Dit rapport is gegenereerd via VochtExpert.`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="animate-fade-in-up pb-12">
      
      {/* Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 shadow-sm no-print">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-600">
             <CheckCircle className="w-5 h-5 text-green-500" />
             <span className="text-sm font-medium">Rapport ook verzonden naar {user.email}</span>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
             <button 
              type="button"
              onClick={handleMailTo}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              Mail Rapport
            </button>
            <button 
              type="button"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all disabled:opacity-50"
            >
              {isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isGeneratingPdf ? 'Bezig...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Report Container */}
      <div id="report-container" className="space-y-6">
        
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden print:shadow-none print:border break-inside-avoid">
          <div className="bg-blue-600 p-8 text-white text-center print:bg-white print:text-black print:border-b">
            <h2 className="text-3xl font-bold mb-2">Bouwkundige Vochtanalyse</h2>
            <p className="opacity-90">
              Locatie: {user.street} {user.houseNumber}, {user.city}
              {user.constructionYear && <span> (Bouwjaar: {user.constructionYear})</span>}
            </p>
            <p className="opacity-90 text-sm mt-1">
              Datum: {new Date().toLocaleDateString('nl-NL')} | Cliënt: {user.name}
            </p>
          </div>
          
          <div className="p-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex gap-3 text-amber-900 break-inside-avoid">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                    <strong>Belangrijke indicatie:</strong> Dit rapport is gebaseerd op uw invoer en woningdata. 
                    Voor een definitief hersteladvies is een fysieke inspectie door een expert vereist.
                </p>
            </div>

            <div className="flex flex-col gap-8">
              
              <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Waarschijnlijkheids-index</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                          <XAxis type="number" domain={[0, 100]} hide />
                          <YAxis dataKey="name" type="category" width={130} tick={{fontSize: 11, fontWeight: 500}} />
                          <Tooltip cursor={{fill: '#f1f5f9'}} />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={getColor(index)} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-blue-50/50 p-6 rounded-xl border border-blue-100 break-inside-avoid">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-slate-800 uppercase tracking-wide text-xs mb-1">Primaire Diagnose</h4>
                        <p className="text-blue-700 font-bold text-2xl">{result.topCause} ({result.scores[0].percentage}%)</p>
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {result.summary}
                    </p>
                  </div>
              </div>

              {/* Interaction Analysis */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 break-inside-avoid">
                  <div className="flex items-center gap-2 mb-3 text-indigo-800">
                      <LinkIcon className="w-5 h-5" />
                      <h3 className="font-bold text-lg">Samenhang & Risico-analyse</h3>
                  </div>
                  <p className="text-indigo-900/80 text-sm md:text-base leading-relaxed">
                      {result.interactionAnalysis}
                  </p>
              </div>

              {/* Detailed Findings */}
              <div className="mt-4 break-inside-avoid">
                  <h3 className="font-bold text-slate-800 text-xl mb-4 border-b pb-2 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-500" />
                      Gedetailleerde Analyse
                  </h3>
                  <div className="space-y-4">
                      {result.scores.map((score, idx) => (
                          <div key={idx} className="bg-slate-50 rounded-lg p-5 border border-slate-100 break-inside-avoid">
                              <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-bold text-slate-700">{score.cause}</h4>
                                  <span className={`text-xs font-bold px-2 py-1 rounded ${idx === 0 ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'}`}>
                                      {score.percentage}% Score
                                  </span>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                  {score.description}
                              </p>
                          </div>
                      ))}
                  </div>
              </div>

            </div>
          </div>
        </div>

        {/* Expert CTA */}
        <div className="bg-slate-800 text-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10 break-inside-avoid">
          <div className="bg-white/10 p-4 rounded-full">
            <ShieldCheck className="w-10 h-10 text-green-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Fysieke inspectie noodzakelijk</h3>
            <p className="text-slate-300 mb-0">
              Professionele meetapparatuur is nodig om de exacte bron en vochtigheidsgraad te bepalen. Wij adviseren een inspectie door een <strong>erkend vochtexpert</strong>.
            </p>
          </div>
          <div className="flex-shrink-0 no-print">
              <a 
                href="https://www.erkendevochtbestrijders.nl/offerte/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105"
              >
                Inspectie Aanvragen
                <ArrowRight className="w-5 h-5" />
              </a>
          </div>
        </div>

        {/* Action Plan */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 break-inside-avoid">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <ClipboardList className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-slate-800">Technisch Actieplan</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {result.recommendations.map((rec, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-slate-700 font-medium leading-snug pt-1">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};