import React, { useState } from 'react';
import { UserContactInfo } from '../types';
import { Lock, Send, Phone, MessageSquare } from 'lucide-react';

interface Props {
  initialData: Partial<UserContactInfo>;
  onSubmit: (info: UserContactInfo) => void;
  onBack: () => void;
}

export const ContactForm: React.FC<Props> = ({ initialData, onSubmit, onBack }) => {
  const [formData, setFormData] = useState<UserContactInfo>({
    name: '',
    email: '',
    phone: '',
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

    const phoneRegex = /^((\+|00)31|0)6[1-9][0-9]{7}$|^0[1-9][0-9]{8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Voer een geldig telefoonnummer in';
      isValid = false;
    }

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
        <p className="text-slate-600 mt-1 text-sm">Vul uw gegevens aan om uw persoonlijke rapport in te zien.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
        
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-xs text-slate-600 mb-4">
            <p className="font-semibold text-blue-900 mb-1">Analyse-locatie:</p>
            <p>{formData.street} {formData.houseNumber}, {formData.city}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Uw volledige naam</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${errors.name ? 'border-red-500' : 'border-slate-200'}`}
            placeholder="Bijv. Jan de Vries"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">E-mailadres</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
              placeholder="uw@email.nl"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Telefoonnummer</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full rounded-lg border pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${errors.phone ? 'border-red-500' : 'border-slate-200'}`}
                placeholder="06 12345678"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
          </div>
        </div>

        <div className="flex gap-2 bg-amber-50 p-3 rounded-lg border border-amber-100">
          <MessageSquare className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] leading-snug text-amber-900 font-medium">
            <strong>Gratis service:</strong> Erkende vochtexperts kunnen telefonisch contact met u opnemen om deze diagnose te bespreken of een gratis inspectie op locatie in te plannen.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-2 uppercase tracking-wide">
          <Lock className="w-3 h-3" />
          <span>Veilige verwerking conform AVG</span>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 rounded-lg font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
          >
            Terug
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
          >
            Bekijk Rapport
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};