import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx';
import { Label } from '@/components/ui/label.jsx';
import { ChevronLeft, ChevronRight, User, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../questions.js';

const Questionnaire = ({ onComplete }) => {
  const [isReligious, setIsReligious] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showReligiousToggle, setShowReligiousToggle] = useState(true);

  const currentQuestions = isReligious ? questions.religious : questions.non_religious;
  const totalQuestions = currentQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestions[currentQuestion].id]: parseInt(value)
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // 完成問卷
      onComplete(answers, isReligious);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleReligiousToggle = () => {
    setIsReligious(!isReligious);
    setCurrentQuestion(0);
    setAnswers({});
    setShowReligiousToggle(false);
  };

  const currentAnswer = answers[currentQuestions[currentQuestion]?.id];
  const canProceed = currentAnswer !== undefined;

  const scaleLabels = [
    "完全不符合",
    "大部分不符合", 
    "有點不符合",
    "有點符合",
    "大部分符合",
    "完全符合"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">靈性健康檢測</h1>
            
            {/* Religious Toggle */}
            {showReligiousToggle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6"
              >
                <Button
                  onClick={handleReligiousToggle}
                  variant={isReligious ? "default" : "outline"}
                  className="flex items-center space-x-2"
                >
                  {isReligious ? <UserCheck className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  <span>{isReligious ? "我有宗教信仰" : "我沒有宗教信仰"}</span>
                </Button>
              </motion.div>
            )}

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>第 {currentQuestion + 1} 題</span>
                <span>{totalQuestions} 題</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="text-sm text-gray-500">{Math.round(progress)}% 完成</div>
            </div>
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 leading-relaxed">
                    {currentQuestions[currentQuestion]?.text}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup 
                    value={currentAnswer?.toString()} 
                    onValueChange={handleAnswer}
                    className="space-y-3"
                  >
                    {scaleLabels.map((label, index) => (
                      <motion.div
                        key={index + 1}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <RadioGroupItem 
                          value={(index + 1).toString()} 
                          id={`option-${index + 1}`}
                        />
                        <Label 
                          htmlFor={`option-${index + 1}`}
                          className="flex-1 cursor-pointer text-gray-700"
                        >
                          <span className="font-medium text-indigo-600 mr-2">
                            {index + 1}.
                          </span>
                          {label}
                        </Label>
                      </motion.div>
                    ))}
                  </RadioGroup>

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>上一題</span>
                    </Button>

                    <Button
                      onClick={handleNext}
                      disabled={!canProceed}
                      className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700"
                    >
                      <span>
                        {currentQuestion === totalQuestions - 1 ? '完成檢測' : '下一題'}
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Question Counter and Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6 space-y-2"
          >
            <p className="text-gray-500">請根據您的真實感受選擇最符合的選項</p>
            <p className="text-xs text-gray-400">
              * 題目內容會根據您的宗教信仰狀態而有所差異
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
