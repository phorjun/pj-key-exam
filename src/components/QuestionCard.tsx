import React from 'react';

interface Choice {
  value: number;
  label: string;
}

interface QuestionProps {
  id: number;
  question: string;
  choices: Choice[];
  answer: number;
  is_image?: boolean;
  url?: string;
  similarity?: number;
}

const QuestionCard: React.FC<QuestionProps> = ({
  id,
  question,
  choices,
  answer,
  is_image,
  url,
  similarity
}) => {
  const correctAnswer = choices.find(choice => choice.value === answer);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg border border-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">ข้อที่ {id}</h3>
          {/* {similarity !== undefined && (
            <span className="text-white text-sm bg-blue-800 px-3 py-1 rounded-full">
              ความคล้ายคลึง {Math.round(similarity * 100)}%
            </span>
          )} */}
        </div>
      </div>

      <div className="px-6 py-4">
        <p className="text-gray-800 text-lg mb-4">{question}</p>

        {is_image && url && (
          <div className="mb-4 flex justify-center">
            <img
              src={url}
              alt={`รูปภาพประกอบข้อ ${id}`}
              className="max-h-60 object-contain rounded border border-gray-200"
            />
          </div>
        )}

        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">ตัวเลือก:</h4>
          <ul className="space-y-2">
            {choices.map((choice) => (
              <li
                key={choice.value}
                className={`p-3 rounded-md ${choice.value === answer
                  ? 'bg-green-50 border-l-4 border-green-500'
                  : 'bg-gray-50 border-l-4 border-transparent'}`}
              >
                <div className="flex items-start">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${choice.value === answer
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                    }`}>
                    {choice.value}
                  </span>
                  <span className={choice.value === answer ? 'font-medium text-green-800' : 'text-gray-700'}>
                    {choice.label}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
          <h4 className="font-medium text-blue-800 mb-1">เฉลย:</h4>
          <p className="text-blue-800">
            ข้อ {answer} - {correctAnswer?.label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;