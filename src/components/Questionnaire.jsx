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
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { questions } from '../questions'

const Questionnaire = ({ onComplete, onBack }) => {
  const [isReligious, setIsReligious] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const currentQuestions = isReligious === null ? [] : 
    isReligious ? questions.religious : questions.nonReligious

  const totalQuestions = currentQuestions.length
  const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0

  const handleReligiousChoice = (choice) => {
    setIsReligious(choice)
    setCurrentQuestion(0)
    setAnswers({})
  }

  const handleAnswer = (score) => {
    const questionId = currentQuestions[currentQuestion]?.id
    if (questionId) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: score
      }))
    }
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setCurrentQuestion(prev => prev + 1)
    } else {
      // 完成問卷
      onComplete(answers, isReligious);
      const results = currentQuestions.map(q => ({
        questionId: q.id,
        question: q.text,
        answer: answers[q.id] || 1,
        domain: q.domain,
        aspect: q.aspect,
        category: q.category
      }))
      
      onComplete({
        isReligious,
        answers: results,
        totalScore: Object.values(answers).reduce((sum, score) => sum + score, 0)
      })
    }
  };
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setCurrentQuestion(prev => prev - 1)
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
  }

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
  const handleRestart = () => {
    setIsReligious(null)
    setCurrentQuestion(0)
    setAnswers({})
  }

  const currentAnswer = currentQuestions[currentQuestion]?.id ? 
    answers[currentQuestions[currentQuestion].id] : null

  if (isReligious === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="bg-white border-orange-100 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                問卷設定
              </CardTitle>
              <p className="text-gray-600 mt-2">
                請選擇您的宗教信仰狀態，系統將為您提供相應的題目
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => handleReligiousChoice(true)}
                className="w-full h-16 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                我有宗教信仰
              </Button>
              
              <Button
                onClick={() => handleReligiousChoice(false)}
                className="w-full h-16 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                我沒有宗教信仰
              </Button>

              <div className="text-center pt-4">
                <Button
                  onClick={handleReligiousToggle}
                  variant={isReligious ? "default" : "outline"}
                  className="flex items-center space-x-2"
                  onClick={onBack}
                  variant="outline"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  {isReligious ? <UserCheck className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  <span>{isReligious ? "我有宗教信仰" : "我沒有宗教信仰"}</span>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  返回首頁
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
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (totalQuestions === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 flex items-center justify-center">
        <Card className="max-w-md bg-white border-orange-100 shadow-xl">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 mb-4">載入問卷題目中...</p>
            <Button 
              onClick={onBack}
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
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
              返回首頁
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = currentQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* 頂部控制欄 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Badge 
              variant="outline" 
              className={`px-3 py-1 ${
                isReligious 
                  ? 'border-orange-300 text-orange-700 bg-orange-50' 
                  : 'border-teal-300 text-teal-700 bg-teal-50'
              }`}
            >
              {isReligious ? '有宗教信仰' : '沒有宗教信仰'}
            </Badge>
            
            <Button
              onClick={handleRestart}
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              重新選擇
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            {currentQuestion + 1} / {totalQuestions}
          </div>
        </div>

        {/* 進度條 */}
        <div className="mb-8">
          <Progress 
            value={progress} 
            className="h-3 bg-gray-100"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>開始</span>
            <span>{Math.round(progress)}% 完成</span>
            <span>完成</span>
          </div>
        </div>

        {/* 問題卡片 */}
        <Card className="mb-8 bg-white border-orange-100 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                isReligious 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                  : 'bg-gradient-to-r from-teal-500 to-cyan-500'
              }`}>
                {currentQuestion + 1}
              </div>
              <Badge variant="secondary" className="text-xs">
                {question?.domain}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed text-gray-800">
              {question?.text}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-gray-600 mb-4">
                請選擇最符合您情況的選項：
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((score) => (
                  <Button
                    key={score}
                    onClick={() => handleAnswer(score)}
                    variant={currentAnswer === score ? "default" : "outline"}
                    className={`h-16 flex flex-col items-center justify-center transition-all duration-200 ${
                      currentAnswer === score
                        ? isReligious
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500 shadow-lg'
                          : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-teal-500 shadow-lg'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                    }`}
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
                    <span className="text-lg font-bold">{score}</span>
                    <span className="text-xs">
                      {score === 1 && '完全不符合'}
                      {score === 2 && '不太符合'}
                      {score === 3 && '有點不符合'}
                      {score === 4 && '有點符合'}
                      {score === 5 && '很符合'}
                      {score === 6 && '完全符合'}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 導航按鈕 */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            <p className="text-gray-500">請根據您的真實感受選擇最符合的選項</p>
            <p className="text-xs text-gray-400">
              * 題目內容會根據您的宗教信仰狀態而有所差異
            </p>
          </motion.div>
            <ChevronLeft className="w-4 h-4 mr-2" />
            上一題
          </Button>

          <Button
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`px-8 ${
              isReligious
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600'
            } text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50`}
          >
            {currentQuestion === totalQuestions - 1 ? '完成問卷' : '下一題'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            題目內容會根據您的宗教信仰狀態而有所差異
          </p>
        </div>
      </div>
    </div>
  );
};
  )
}

export default Questionnaire;
export default Questionnaire
