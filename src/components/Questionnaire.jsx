import React, { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { ArrowLeft, CheckCircle, RotateCcw, ChevronRight } from 'lucide-react'
import { questions, scoreOptions } from '../questions'

const Questionnaire = ({ onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isReligious, setIsReligious] = useState(null)
  const [showReligiousPrompt, setShowReligiousPrompt] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const cardRef = useRef(null)

  // 根據宗教信仰選擇對應的題目集
  const questionSet = isReligious ? questions.religious : questions.non_religious
  const currentQuestion = questionSet?.[currentQuestionIndex]
  const totalQuestions = questionSet?.length || 0
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0

  const handleReligiousChoice = (choice) => {
    setIsReligious(choice)
    setShowReligiousPrompt(false)
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  const handleAnswerChange = (questionId, value) => {
    // 先保存答案
    const newAnswers = {
      ...answers,
      [questionId]: parseInt(value)
    }
    setAnswers(newAnswers)

    // 延遲一點時間讓使用者看到選擇效果，然後自動跳到下一題
    setTimeout(() => {
      slideToNext(newAnswers)
    }, 1000) // 1秒延遲，讓使用者看到選擇效果
  }

  const slideToNext = (currentAnswers = answers) => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    
    // 添加滑動動畫
    if (cardRef.current) {
      cardRef.current.style.transform = 'translateX(-100%)'
      cardRef.current.style.opacity = '0'
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
      } else {
        // 完成問卷
        onComplete(currentAnswers, isReligious)
        return
      }
      
      // 重置動畫
      if (cardRef.current) {
        cardRef.current.style.transform = 'translateX(100%)'
        setTimeout(() => {
          if (cardRef.current) {
            cardRef.current.style.transform = 'translateX(0)'
            cardRef.current.style.opacity = '1'
          }
          setIsTransitioning(false)
        }, 50)
      }
    }, 300)
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setIsReligious(null)
    setShowReligiousPrompt(true)
  }

  // 鍵盤導航支援（僅支援數字鍵選擇答案）
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showReligiousPrompt || isTransitioning) return
      
      if (e.key >= '1' && e.key <= '6' && currentQuestion) {
        handleAnswerChange(currentQuestion.id, parseInt(e.key))
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentQuestionIndex, showReligiousPrompt, currentQuestion, isTransitioning])

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

  // 如果沒有題目，顯示錯誤
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 flex items-center justify-center">
        <Card className="border-2 border-red-200 bg-white/80 backdrop-blur-sm shadow-xl max-w-md mx-auto">
          <CardContent className="text-center p-6">
            <p className="text-red-600 mb-4">題目載入失敗，請重新開始</p>
            <Button onClick={handleRestart} className="bg-orange-500 hover:bg-orange-600 text-white">
              重新開始
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 問卷主體 - 完全自動跳轉設計
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 overflow-hidden">
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
              <p className="text-sm sm:text-base font-semibold text-gray-800">
                第 {currentQuestionIndex + 1} 題 / 共 {totalQuestions} 題
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(progress)}% 完成
              </p>
            </div>
          </div>

          {/* 進度條 */}
          <div className="relative">
            <Progress 
              value={progress} 
              className="w-full h-3 sm:h-4 bg-gray-200 rounded-full overflow-hidden"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white drop-shadow-md">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        {/* 問題卡片容器 */}
        <div className="relative perspective-1000">
          <Card 
            ref={cardRef}
            className="border-2 border-orange-200 bg-white/90 backdrop-blur-sm shadow-2xl mb-4 sm:mb-6 transition-all duration-300 ease-in-out transform-gpu"
            style={{
              minHeight: '550px',
              transform: 'translateX(0)',
              opacity: 1
            }}
          >
            <CardHeader className="pb-3 sm:pb-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-800">
                  第 {currentQuestionIndex + 1} 題
                </CardTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>選擇後自動跳轉</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              <div className="mb-8 sm:mb-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed mb-6 text-center">
                  {currentQuestion.text}
                </h3>
                
                <div className="text-center">
                  <p className="text-sm sm:text-base text-gray-600 mb-2">
                    請選擇最符合您情況的選項
                  </p>
                  <p className="text-xs text-gray-500">
                    選擇後將自動跳轉到下一題 • 鍵盤快捷鍵：1-6 數字鍵
                  </p>
                </div>
              </div>

              {/* 答案選項 - 卡片式設計 */}
              <RadioGroup
                value={answers[currentQuestion.id]?.toString()}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                className="space-y-3 sm:space-y-4"
              >
                {scoreOptions.map((option, index) => {
                  const isSelected = answers[currentQuestion.id] === option.value
                  const colors = [
                    'from-red-100 to-red-200 border-red-300 text-red-800',
                    'from-orange-100 to-orange-200 border-orange-300 text-orange-800',
                    'from-yellow-100 to-yellow-200 border-yellow-300 text-yellow-800',
                    'from-blue-100 to-blue-200 border-blue-300 text-blue-800',
                    'from-teal-100 to-teal-200 border-teal-300 text-teal-800',
                    'from-green-100 to-green-200 border-green-300 text-green-800'
                  ]
                  
                  return (
                    <div key={option.value} className="flex items-center space-x-3 sm:space-x-4">
                      <RadioGroupItem 
                        value={option.value.toString()} 
                        id={`option-${option.value}`}
                        className="text-orange-600 flex-shrink-0 w-5 h-5"
                      />
                      <Label 
                        htmlFor={`option-${option.value}`}
                        className={`flex-1 px-4 sm:px-6 py-4 sm:py-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-102 ${
                          isSelected 
                            ? `bg-gradient-to-r ${colors[index]} shadow-xl scale-105 ring-2 ring-orange-300` 
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="font-bold text-orange-600 mr-3 text-lg">
                              {option.value}
                            </span>
                            <span className={isSelected ? 'font-semibold' : ''}>
                              {option.label}
                            </span>
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 animate-pulse" />
                          )}
                        </div>
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup>

              {/* 提示文字 */}
              <div className="mt-8 sm:mt-10 text-center">
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  請根據您的真實感受選擇最符合的選項
                </p>
                <p className="text-xs text-gray-400">
                  選擇答案後將在 1 秒內自動進入下一題
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 底部提示 - 強調自動跳轉功能 */}
        <div className="text-center mt-4 sm:mt-6">
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-4 sm:p-6 border border-orange-200">
            <p className="text-sm sm:text-base text-gray-700 font-medium mb-2">
              ✨ 全自動問卷體驗
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              選擇答案後會自動跳轉到下一題，無需手動點擊任何按鈕
            </p>
            <p className="text-xs text-gray-500 mt-2">
              鍵盤用戶：使用 1-6 數字鍵快速選擇答案
            </p>
          </div>
        </div>

        {/* 進度指示器 */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <div className="flex space-x-2">
            {Array.from({ length: totalQuestions }, (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index < currentQuestionIndex 
                    ? 'bg-green-500' 
                    : index === currentQuestionIndex 
                    ? 'bg-orange-500 animate-pulse' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questionnaire
