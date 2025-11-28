
import React, { useState } from 'react';
import { UserContactInfo } from '../types';
import { Lock, Send } from 'lucide-react';

interface Props {
  // We receive the partial info (address) already collected
  initialData: Partial<UserContactInfo>;
  onSubmit: (info: UserContactInfo) => void;
  onBack: () => void;
}

export const ContactForm: React.FC<Props> = ({ initialData, onSubmit, onBack }) => {
  const [formData, setFormData] = useState<UserContactInfo>({
    name: '',
    email: '',
    // Spread existing address data
    street: initialData.street || '',
    houseNumber: initialData.houseNumber || '',
    zipcode: initialData.zipcode || '',
    city: initialData.city || '',
    constructionYear: initialData.constructionYear
  });

  const [errors, setErrors] = useState<Partial<UserContactInfo>>({});

  const validate = (): boolean => {
    const newErrors: Partial<UserContactInfo> = {};
    let isValid = true;

    if (!formData.name.trim()) { newErrors.name = 'Naam is verplicht'; isValid = false; }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) { newErrors.email = 'Ongeldig e-mailadres'; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof UserContactInfo]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-slate-50 p-6 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">Analyse gereed</h2>
        <p className="text-slate-600 mt-1">Vul uw gegevens in om het rapport te ontvangen.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
        
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-sm text-slate-600 mb-4">
            <p className="font-semibold text-blue-900 mb-1">Geselecteerde woning:</p>
            <p>{formData.street} {formData.houseNumber}, {formData.city}</p>
            {formData.constructionYear && <p>Bouwjaar: {formData.constructionYear}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Volledige naam</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${errors.name ? 'border-red-500' : 'border-slate-200'}`}
            placeholder="Uw naam"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">E-mailadres</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
            placeholder="uw@email.nl"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
          <Lock className="w-3 h-3" />
          <span>Uw rapport wordt direct gegenereerd en per e-mail verstuurd.</span>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 rounded-lg font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Terug
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2"
          >
            Rapport Tonen
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};