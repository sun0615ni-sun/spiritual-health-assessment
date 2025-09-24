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
      setCurrentQuestion(prev => prev + 1)
    } else {
      // 完成問卷
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
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

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
                  onClick={onBack}
                  variant="outline"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  返回首頁
                </Button>
              </div>
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
  )
}

export default Questionnaire
