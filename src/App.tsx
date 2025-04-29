import { BookOpen, GraduationCap } from 'lucide-react';
import { useCallback, useState } from 'react';
import ExamSetSelector from './components/ExamSetSelector';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import questionsContinuteCard from './data/continute-card';
import { examSets } from './data/examSets';
import questionsNewCard from './data/new-card';
import { searchQuestions } from './utils/searchUtils';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedExamSet, setSelectedExamSet] = useState('new-card');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Filter questions based on selected exam set
    const filteredQuestions = selectedExamSet === 'new-card'
      ? questionsNewCard  // new-card card questions
      : questionsContinuteCard  // continute card questions

    const results = searchQuestions(filteredQuestions, query);
    setSearchResults(results);
  }, [selectedExamSet]);

  const handleExamSetSelect = (setId: string) => {
    setSelectedExamSet(setId);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-2">
            <GraduationCap className="w-10 h-10 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">ค้นหาข้อสอบ</h1>
          </div>
          <p className="text-center text-blue-100 mb-6">
            ระบบค้นหาข้อสอบและเฉลยอัจฉริยะ - ค้นหาข้อสอบที่คล้ายกันได้ง่ายๆ
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <ExamSetSelector
          examSets={examSets}
          selectedSet={selectedExamSet}
          onSelect={handleExamSetSelect}
        />

        <div className="max-w-3xl mx-auto mt-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {searchQuery === '' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 mt-8">
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">วิธีใช้งาน</h2>
            </div>
            <div className="pl-9">
              <ol className="list-decimal text-gray-700 space-y-2">
                <li>เลือกชุดข้อสอบที่ต้องการค้นหา</li>
                <li>พิมพ์คำหรือประโยคที่ต้องการค้นหาในช่องค้นหาด้านบน</li>
                <li>ระบบจะแสดงข้อสอบที่เกี่ยวข้องกับคำค้นของคุณ</li>
                <li>ข้อสอบที่มีความคล้ายคลึงมากที่สุดจะแสดงอยู่ด้านบน</li>
                <li>หากต้องการค้นหาคำใหม่ เพียงพิมพ์คำนั้นลงในช่องค้นหา</li>
              </ol>
            </div>
          </div>
        )}

        <SearchResults results={searchResults} query={searchQuery} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 px-4">
        <div className="container mx-auto text-center">
          <p className="mb-2">ระบบค้นหาข้อสอบและเฉลย</p>
          <p className="text-sm">© {new Date().getFullYear()} ระบบค้นหาข้อสอบอัจฉริยะ - ทุกสิทธิ์ได้รับการคุ้มครอง</p>
        </div>
      </footer>
    </div>
  );
}

export default App;