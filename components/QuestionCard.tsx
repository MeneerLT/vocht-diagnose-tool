import React from 'react';
import { Question } from '../types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  question: Question;
  onAnswer: (questionId: number, optionId: string) => void;
  selectedOptionId?: string;
}

export const QuestionCard: React.FC<Props> = ({ question, onAnswer, selectedOptionId }) => {
  return (
    <div className="animate-fade-in bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6 leading-tight">
        {question.text}
      </h2>
      
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onAnswer(question.id, option.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                ${isSelected 
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                  : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                }`}
            >
              <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-slate-600'}`}>
                {option.label}
              </span>
              
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors
                ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-400'}`}>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};