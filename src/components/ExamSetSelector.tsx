import React from 'react';
import { ExamSet } from '../data/examSets';

interface ExamSetSelectorProps {
  examSets: ExamSet[];
  selectedSet: string;
  onSelect: (setId: string) => void;
}

const ExamSetSelector: React.FC<ExamSetSelectorProps> = ({
  examSets,
  selectedSet,
  onSelect
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">เลือกชุดข้อสอบ</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {examSets.map((set) => (
            <button
              key={set.id}
              onClick={() => onSelect(set.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedSet === set.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h3 className="font-medium text-lg text-gray-900">{set.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{set.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamSetSelector;