
import React, { useState, useEffect } from 'react';
import { Search, Loader2, CheckCircle2, MapPin, Building2, AlertCircle } from 'lucide-react';
import { fetchBagData } from '../services/bagService';
import { UserContactInfo } from '../types';

interface Props {
  onComplete: (addressData: Partial<UserContactInfo>) => void;
}

export const AddressStep: React.FC<Props> = ({ onComplete }) => {
  const [zipcode, setZipcode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [fetchedData, setFetchedData] = useState<{
    street: string; 
    city: string; 
    year: number | null;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isValidZip(zipcode) && houseNumber.length > 0) {
        handleFetch();
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [zipcode, houseNumber]);

  const isValidZip = (zip: string) => /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/.test(zip);

  const handleFetch = async () => {
    setStatus('LOADING');
    setErrorMsg(null);
    setFetchedData(null);

    try {
      const data = await fetchBagData(zipcode, houseNumber);
      
      setFetchedData({
        street: data.street,
        city: data.city,
        year: data.constructionYear
      });
      setStatus('SUCCESS');
    } catch (err) {
      console.error(err);
      setErrorMsg("Adres niet gevonden. Controleer postcode en huisnummer.");
      setStatus('ERROR');
    }
  };

  const handleNext = () => {
    if (fetchedData) {
      onComplete({
        street: fetchedData.street,
        houseNumber: houseNumber,
        zipcode: zipcode,
        city: fetchedData.city,
        constructionYear: fetchedData.year || undefined
      });
    } else {
        setErrorMsg("Vul een geldig adres in om de analyse te starten.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
        <div className="bg-blue-600 p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Woningcheck
            </h2>
            <p className="opacity-90 mt-2 text-sm max-w-lg">
              Vul uw postcode en huisnummer in. Wij halen direct de bouwtechnische gegevens op voor een nauwkeurige diagnose.
            </p>
          </div>
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Postcode</label>
              <input
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value.toUpperCase())}
                placeholder="1234 AB"
                maxLength={7}
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 uppercase transition-all font-medium text-lg placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Huisnummer</label>
              <input
                type="text"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                placeholder="10a"
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-lg placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className={`rounded-xl border transition-all duration-300 overflow-hidden
            ${status === 'SUCCESS' ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-50 border-slate-100'}
            min-h-[160px] flex flex-col justify-center
          `}>
             
             {status === 'LOADING' && (
               <div className="flex flex-col items-center justify-center gap-3 text-blue-600 py-8">
                 <Loader2 className="w-8 h-8 animate-spin" />
                 <span className="font-medium text-sm animate-pulse">Woninggegevens ophalen...</span>
               </div>
             )}

             {status === 'ERROR' && (
               <div className="text-center py-8 px-4">
                 <div className="bg-red-100 text-red-600 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="w-6 h-6" />
                 </div>
                 <p className="text-slate-800 font-medium mb-1">{errorMsg}</p>
                 <p className="text-slate-500 text-sm">Controleer de invoer en probeer het opnieuw.</p>
               </div>
             )}

             {status === 'IDLE' && (
               <div className="text-center py-8 px-4 opacity-60">
                 <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                 <p className="text-slate-500 font-medium">Wachtend op invoer...</p>
               </div>
             )}

             {status === 'SUCCESS' && fetchedData && (
               <div className="p-6 animate-fade-in">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 rounded-full p-1.5 mt-1">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-slate-800 leading-tight mb-1">{fetchedData.street} {houseNumber}</h3>
                      <p className="text-slate-500 font-medium mb-4">{fetchedData.city}</p>
                      
                      <div className="inline-flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-blue-100 shadow-sm">
                          <div className="bg-blue-100 p-2 rounded-md">
                             <Building2 className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                             <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Bouwjaar</p>
                             <p className={`font-bold text-lg ${fetchedData.year ? 'text-slate-800' : 'text-slate-400 italic text-sm'}`}>
                                {fetchedData.year || 'Onbekend'}
                             </p>
                          </div>
                      </div>
                    </div>
                  </div>
               </div>
             )}
          </div>

          <button
            onClick={handleNext}
            disabled={status !== 'SUCCESS'}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform duration-200
              ${status === 'SUCCESS'
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 hover:-translate-y-1 cursor-pointer' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
          >
            Start Analyse
            {status === 'SUCCESS' ? <Search className="w-5 h-5" /> : null}
          </button>
        </div>
      </div>
    </div>
  );
};