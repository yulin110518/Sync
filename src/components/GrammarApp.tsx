import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  BookOpen, 
  Trophy,
  Filter,
  Info,
  ArrowRight
} from 'lucide-react';
import { questions, Question, Difficulty } from '../data/questions';
import { cn } from '../lib/utils';

export default function GrammarApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | '全部'>('全部');
  const [history, setHistory] = useState<{ id: string; correct: boolean }[]>([]);

  const filteredQuestions = useMemo(() => {
    return filterDifficulty === '全部' 
      ? questions 
      : questions.filter(q => q.difficulty === filterDifficulty);
  }, [filterDifficulty]);

  const currentQuestion = filteredQuestions[currentIndex];

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setHistory(prev => [...prev, { id: currentQuestion.id, correct: isCorrect }]);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
    setHistory([]);
  };

  const renderSentence = (sentence: string, selected: string | null) => {
    const parts = sentence.split('______');
    return (
      <div className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-800">
        {parts[0]}
        <span className={cn(
          "inline-block min-w-[120px] border-b-2 mx-2 px-2 text-center transition-all",
          !selected && "border-slate-300 text-transparent",
          selected && !isSubmitted && "border-secondary text-secondary",
          isSubmitted && selected === currentQuestion.correctAnswer && "border-primary text-primary",
          isSubmitted && selected !== currentQuestion.correctAnswer && "border-red-500 text-red-500"
        )}>
          {selected || "______"}
        </span>
        {parts[1]}
      </div>
    );
  };

  if (showResults) {
    const percentage = Math.round((score / filteredQuestions.length) * 100);
    let message = "继续努力！";
    if (percentage >= 90) message = "太棒了！你是语法大师！";
    else if (percentage >= 70) message = "做得好！再接再厉！";

    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 text-center"
        >
          <Trophy className="w-20 h-20 text-accent mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-2">练习完成!</h2>
          <p className="text-slate-500 mb-8">{message}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="text-sm text-slate-500 uppercase tracking-wider mb-1">得分</div>
              <div className="text-4xl font-bold text-primary">{score} / {filteredQuestions.length}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="text-sm text-slate-500 uppercase tracking-wider mb-1">正确率</div>
              <div className="text-4xl font-bold text-secondary">{percentage}%</div>
            </div>
          </div>

          <div className="space-y-4">
            <button onClick={handleReset} className="btn-primary w-full flex items-center justify-center gap-2">
              <RotateCcw size={20} /> 重新开始
            </button>
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase">推荐复习</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from(new Set(filteredQuestions.map(q => q.grammarPoint))).slice(0, 3).map(point => (
                  <a key={point} href="#" className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full hover:bg-secondary hover:text-white transition-colors">
                    {point} 专题
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="text-primary" /> GrammarMaster
          </h1>
          <p className="text-slate-500 text-sm">初中英语语法专项练习</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-sm">
            <Filter size={16} className="text-slate-400" />
            <select 
              value={filterDifficulty} 
              onChange={(e) => {
                setFilterDifficulty(e.target.value as Difficulty | '全部');
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setIsSubmitted(false);
              }}
              className="bg-transparent outline-none cursor-pointer font-medium"
            >
              <option value="全部">全部难度</option>
              <option value="初级">初级</option>
              <option value="中级">中级</option>
              <option value="高级">高级</option>
            </select>
          </div>
          <div className="text-sm font-medium text-slate-400">
            {currentIndex + 1} / {filteredQuestions.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          {/* Question Card */}
          <div className="glass-card p-8 md:p-12">
            <div className="flex items-center gap-2 mb-6">
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                currentQuestion.difficulty === '初级' ? "bg-green-100 text-green-700" :
                currentQuestion.difficulty === '中级' ? "bg-blue-100 text-blue-700" :
                "bg-purple-100 text-purple-700"
              )}>
                {currentQuestion.difficulty}
              </span>
              <span className="text-xs font-medium text-slate-400">
                {currentQuestion.grammarPoint}
              </span>
            </div>

            <div className="mb-12">
              {renderSentence(currentQuestion.sentence, selectedAnswer)}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  disabled={isSubmitted}
                  onClick={() => setSelectedAnswer(option)}
                  className={cn(
                    "option-btn text-lg py-3",
                    selectedAnswer === option && "option-btn-selected",
                    isSubmitted && option === currentQuestion.correctAnswer && "bg-primary text-white border-primary",
                    isSubmitted && selectedAnswer === option && option !== currentQuestion.correctAnswer && "bg-red-500 text-white border-red-500"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Action Area */}
          <div className="flex justify-center">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="btn-primary min-w-[200px] flex items-center justify-center gap-2"
              >
                提交答案 <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-primary min-w-[200px] flex items-center justify-center gap-2 bg-secondary hover:bg-indigo-600"
              >
                {currentIndex === filteredQuestions.length - 1 ? "查看结果" : "下一题"} <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* Explanation Card */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "glass-card p-6 border-l-4",
                  selectedAnswer === currentQuestion.correctAnswer 
                    ? "border-l-primary bg-green-50/30" 
                    : "border-l-red-500 bg-red-50/30"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-2 rounded-full",
                    selectedAnswer === currentQuestion.correctAnswer ? "bg-green-100 text-primary" : "bg-red-100 text-red-500"
                  )}>
                    {selectedAnswer === currentQuestion.correctAnswer ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-4">
                      {selectedAnswer === currentQuestion.correctAnswer ? "回答正确！" : `回答错误。正确答案是: ${currentQuestion.correctAnswer}`}
                    </h3>
                    
                    <div className="space-y-4 text-sm">
                      <div>
                        <div className="flex items-center gap-1 font-bold text-slate-700 mb-1">
                          <Info size={14} /> 语法规则
                        </div>
                        <p className="text-slate-600 leading-relaxed">{currentQuestion.explanation.rule}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-1 font-bold text-slate-700 mb-1">
                          <BookOpen size={14} /> 例句
                        </div>
                        <p className="text-slate-600 italic">"{currentQuestion.explanation.example}"</p>
                      </div>

                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <div className="font-bold text-amber-800 mb-1">常见错误辨析</div>
                        <p className="text-amber-700">{currentQuestion.explanation.commonMistake}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
