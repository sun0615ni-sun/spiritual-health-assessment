import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { ArrowLeft, ArrowRight, CheckCircle, RotateCcw } from 'lucide-react'
import { questions } from '../questions'

const Questionnaire = ({ onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isReligious, setIsReligious] = useState(null)
  const [showReligiousPrompt, setShowReligiousPrompt] = useState(true)

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  // 檢查是否為宗教相關問題
  const isReligiousQuestion = currentQuestion?.category === 'religious'

  // 如果不是宗教信仰者且遇到宗教問題，自動跳過
  useEffect(() => {
    if (isReligious === false && isReligiousQuestion) {
      // 自動設為中性答案並跳到下一題
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: 4 // 中性答案
      }))
      
      if (currentQuestionIndex < totalQuestions - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1)
        }, 300)
      }
    }
  }, [currentQuestionIndex, isReligious, isReligiousQuestion, currentQuestion, totalQuestions])

  const handleReligiousChoice = (choice) => {
    setIsReligious(choice)
    setShowReligiousPrompt(false)
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // 完成問卷
      onComplete(answers, isReligious)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setIsReligious(null)
    setShowReligiousPrompt(true)
  }

  const isCurrentAnswered = answers[currentQuestion?.id] !== undefined

  // 宗教信仰選擇畫面
  if (showReligiousPrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50">
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          
          {/* 返回按鈕 */}
          <div className="mb-4 sm:mb-6">
            <Button
              onClick={onBack}
              variant="outline"
              className="px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首頁
            </Button>
          </div>

          {/* 宗教信仰選擇卡片 */}
          <Card className="border-2 border-orange-200 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
                <span className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text text-transparent">
                  開始靈性健康檢測
                </span>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600 px-2">
                為了提供更準確的評估，請先告訴我們您的宗教信仰狀況
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 sm:space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 px-2">
                  您是否有宗教信仰？
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 px-2">
                  這將幫助我們為您提供更個人化的評估內容
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
                <Button
                  onClick={() => handleReligiousChoice(true)}
                  className="flex-1 px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-bold bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  是，我有宗教信仰
                </Button>
                
                <Button
                  onClick={() => handleReligiousChoice(false)}
                  className="flex-1 px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  我沒有宗教信仰
                </Button>
              </div>

              <div className="text-center mt-6 sm:mt-8">
                <p className="text-xs sm:text-sm text-gray-500 px-2">
                  無論您的選擇如何，我們都會為您提供專業的靈性健康評估
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // 問卷主體
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50">
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        
        {/* 頂部導航和進度 */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
            <Button
              onClick={handleRestart}
              variant="outline"
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              重新開始
            </Button>
            
            <div className="text-center sm:text-right">
              <p className="text-xs sm:text-sm text-gray-600">
                第 {currentQuestionIndex + 1} 題，共 {totalQuestions} 題
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(progress)}% 完成
              </p>
            </div>
          </div>

          {/* 進度條 */}
          <Progress 
            value={progress} 
            className="w-full h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden"
          />
        </div>

        {/* 問題卡片 */}
        <Card className="border-2 border-orange-200 bg-white/80 backdrop-blur-sm shadow-xl mb-4 sm:mb-6">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <CardTitle className="text-base sm:text-lg font-bold text-gray-800">
                {currentQuestion?.domain} - {currentQuestion?.aspect}
              </CardTitle>
              {isReligious === false && isReligiousQuestion && (
                <span className="text-xs sm:text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  自動跳過宗教相關題目
                </span>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed mb-4 px-2">
                {currentQuestion?.text}
              </h3>
              
              {currentQuestion?.description && (
                <p className="text-xs sm:text-sm text-gray-600 px-2">
                  {currentQuestion.description}
                </p>
              )}
            </div>

            {/* 答案選項 - 響應式布局 */}
            <RadioGroup
              value={answers[currentQuestion?.id]?.toString()}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              className="space-y-3 sm:space-y-4"
            >
              {[
                { value: 1, label: '完全不符合', color: 'bg-red-50 border-red-200 text-red-800' },
                { value: 2, label: '大部分不符合', color: 'bg-orange-50 border-orange-200 text-orange-800' },
                { value: 3, label: '有點不符合', color: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
                { value: 4, label: '有點符合', color: 'bg-blue-50 border-blue-200 text-blue-800' },
                { value: 5, label: '大部分符合', color: 'bg-teal-50 border-teal-200 text-teal-800' },
                { value: 6, label: '完全符合', color: 'bg-green-50 border-green-200 text-green-800' }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-3 sm:space-x-4">
                  <RadioGroupItem 
                    value={option.value.toString()} 
                    id={`option-${option.value}`}
                    className="text-orange-600 flex-shrink-0"
                  />
                  <Label 
                    htmlFor={`option-${option.value}`}
                    className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 cursor-pointer transition-all duration-200 text-sm sm:text-base font-medium ${
                      answers[currentQuestion?.id] === option.value 
                        ? option.color + ' shadow-md transform scale-105' 
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-bold mr-2">{option.value}.</span>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* 提示文字 */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-xs sm:text-sm text-gray-500 px-2">
                請根據您的真實感受選擇最符合的選項
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 導航按鈕 - 響應式布局 */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            上一題
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!isCurrentAnswered}
            className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none order-1 sm:order-2"
          >
            {currentQuestionIndex === totalQuestions - 1 ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                完成問卷
              </>
            ) : (
              <>
                下一題
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-gray-500 px-2">
            您可以隨時返回修改之前的答案
          </p>
        </div>
      </div>
    </div>
  )
}

export default Questionnaire
