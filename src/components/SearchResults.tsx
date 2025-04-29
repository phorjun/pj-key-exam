import React from 'react';
import QuestionCard from './QuestionCard';

interface Choice {
  value: number;
  label: string;
}

interface Question {
  id: number;
  question: string;
  choices: Choice[];
  answer: number;
  is_image?: boolean;
  url?: string;
  similarity?: number;
}

interface SearchResultsProps {
  results: Question[];
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, query }) => {
  if (!query) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl text-gray-600 mb-2">เริ่มค้นหาข้อสอบ</h2>
        <p className="text-gray-500">พิมพ์คำหรือประโยคที่ต้องการค้นหา</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl text-gray-600 mb-2">ไม่พบข้อสอบที่ตรงกับการค้นหา</h2>
        <p className="text-gray-500">ลองใช้คำค้นหาอื่น หรือข้อความที่สั้นกว่า</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <h2 className="text-xl font-medium text-gray-800 mb-4">ผลการค้นหา {results.length} รายการ</h2>
      <div className="grid gap-6">
        {results.map(question => (
          <QuestionCard 
            key={question.id} 
            id={question.id}
            question={question.question}
            choices={question.choices}
            answer={question.answer}
            is_image={question.is_image}
            url={question.url}
            similarity={question.similarity}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;