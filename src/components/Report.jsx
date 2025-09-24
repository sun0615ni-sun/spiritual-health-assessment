import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  BarChart3, 
  TrendingUp, 
  Heart, 
  Users, 
  Leaf, 
  Star,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react'
import { calculateScores } from '../scoring'

const Report = ({ answers, profileData, isReligious, onBack, onRestart }) => {
  const [activeTab, setActiveTab] = useState('overview')
  
  const scores = calculateScores(answers, isReligious)

  // 領域圖示映射
  const domainIcons = {
    '與自己的關係': Heart,
    '與他人的關係': Users,
    '與自然的關係': Leaf,
    '與超越者的關係': Star
  }

  // 分數等級判定
  const getScoreLevel = (score) => {
    if (score >= 5.0) return { level: '優秀', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50' }
    if (score >= 4.0) return { level: '良好', color: 'bg-teal-500', textColor: 'text-teal-700', bgColor: 'bg-teal-50' }
    if (score >= 3.0) return { level: '普通', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' }
    if (score >= 2.0) return { level: '待改善', color: 'bg-orange-500', textColor: 'text-orange-700', bgColor: 'bg-orange-50' }
    return { level: '需關注', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' }
  }

  // 建議內容
  const getRecommendations = (domainScores) => {
    const recommendations = []
    
    Object.entries(domainScores).forEach(([domain, score]) => {
      if (score < 3.0) {
        switch (domain) {
          case '與自己的關係':
            recommendations.push({
              domain,
              title: '自我覺察與成長',
              suggestions: [
                '每日進行10-15分鐘的冥想或正念練習',
                '寫日記記錄內心感受和想法',
                '設定個人成長目標並定期檢視',
                '學習情緒管理技巧'
              ]
            })
            break
          case '與他人的關係':
            recommendations.push({
              domain,
              title: '人際關係建立',
              suggestions: [
                '主動關心身邊的家人朋友',
                '參與社區活動或志工服務',
                '練習同理心和傾聽技巧',
                '建立支持性的社交網絡'
              ]
            })
            break
          case '與自然的關係':
            recommendations.push({
              domain,
              title: '自然連結體驗',
              suggestions: [
                '每週安排戶外活動時間',
                '觀察和欣賞自然美景',
                '參與環保行動或生態保護',
                '在生活中融入自然元素'
              ]
            })
            break
          case '與超越者的關係':
            if (isReligious) {
              recommendations.push({
                domain,
                title: '靈性修養深化',
                suggestions: [
                  '定期參與宗教活動或靈修',
                  '閱讀靈性成長相關書籍',
                  '與靈性導師或同修交流',
                  '在日常生活中實踐信仰價值'
                ]
              })
            } else {
              recommendations.push({
                domain,
                title: '生命意義探索',
                suggestions: [
                  '思考人生目標和價值觀',
                  '參與有意義的公益活動',
                  '探索哲學或人文思想',
                  '培養感恩和敬畏之心'
                ]
              })
            }
            break
        }
      }
    })
    
    return recommendations
  }

  const recommendations = getRecommendations(scores.domainScores)

  // 標籤頁內容
  const tabs = [
    { id: 'overview', label: '總覽', icon: BarChart3 },
    { id: 'details', label: '詳細分析', icon: TrendingUp },
    { id: 'recommendations', label: '改善建議', icon: Info }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        
        {/* 頁面標題和操作按鈕 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text text-transparent">
                靈性健康檢測報告
              </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {profileData?.name && `${profileData.name}，`}您的個人化靈性健康分析結果
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回修改
            </Button>
            
            <Button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              下載報告
            </Button>
          </div>
        </div>

        {/* 標籤頁導航 - 響應式 */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 mb-6 sm:mb-8 bg-white rounded-lg p-1 shadow-md">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split('')[0]}</span>
              </Button>
            )
          })}
        </div>

        {/* 總覽標籤頁 */}
        {activeTab === 'overview' && (
          <div className="space-y-4 sm:space-y-6">
            
            {/* 整體分數卡片 */}
            <Card className="border-2 border-orange-200 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader className="text-center pb-4 sm:pb-6">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
                  整體靈性健康分數
                </CardTitle>
                <div className="mt-4 sm:mt-6">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4">
                    <span className={`${getScoreLevel(scores.overallScore).textColor}`}>
                      {scores.overallScore.toFixed(1)}
                    </span>
                    <span className="text-lg sm:text-xl text-gray-500 ml-2">/6.0</span>
                  </div>
                  <Badge 
                    className={`px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base font-bold ${getScoreLevel(scores.overallScore).bgColor} ${getScoreLevel(scores.overallScore).textColor} border-0`}
                  >
                    {getScoreLevel(scores.overallScore).level}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* 四領域分數 - 響應式網格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {Object.entries(scores.domainScores).map(([domain, score]) => {
                const IconComponent = domainIcons[domain]
                const scoreLevel = getScoreLevel(score)
                
                return (
                  <Card key={domain} className="border-2 border-orange-200 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-2 sm:pb-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0" />
                        <CardTitle className="text-sm sm:text-base font-bold text-gray-800 leading-tight">
                          {domain}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
                          <span className={scoreLevel.textColor}>
                            {score.toFixed(1)}
                          </span>
                        </div>
                        <Progress 
                          value={(score / 6) * 100} 
                          className="w-full h-2 sm:h-3 mb-2 sm:mb-3"
                        />
                        <Badge 
                          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold ${scoreLevel.bgColor} ${scoreLevel.textColor} border-0`}
                        >
                          {scoreLevel.level}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* 快速洞察 */}
            <Card className="border-2 border-teal-200 bg-teal-50/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-bold text-teal-800 flex items-center gap-2 sm:gap-3">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  快速洞察
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <TrendingUp className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span className="text-teal-700">
                      最強領域：{Object.entries(scores.domainScores).reduce((a, b) => scores.domainScores[a[0]] > scores.domainScores[b[0]] ? a : b)[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <span className="text-orange-700">
                      改善空間：{Object.entries(scores.domainScores).reduce((a, b) => scores.domainScores[a[0]] < scores.domainScores[b[0]] ? a : b)[0]}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 詳細分析標籤頁 */}
        {activeTab === 'details' && (
          <div className="space-y-4 sm:space-y-6">
            {Object.entries(scores.aspectScores).map(([domain, aspects]) => {
              const IconComponent = domainIcons[domain]
              
              return (
                <Card key={domain} className="border-2 border-orange-200 bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                      {domain}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      領域總分：{scores.domainScores[domain].toFixed(1)} / 6.0
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      {Object.entries(aspects).map(([aspect, score]) => {
                        const scoreLevel = getScoreLevel(score)
                        
                        return (
                          <div key={aspect} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">
                                {aspect}
                              </h4>
                              <Progress 
                                value={(score / 6) * 100} 
                                className="w-full h-2 sm:h-3"
                              />
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                              <span className="text-lg sm:text-xl font-bold text-gray-800">
                                {score.toFixed(1)}
                              </span>
                              <Badge 
                                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold ${scoreLevel.bgColor} ${scoreLevel.textColor} border-0`}
                              >
                                {scoreLevel.level}
                              </Badge>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* 改善建議標籤頁 */}
        {activeTab === 'recommendations' && (
          <div className="space-y-4 sm:space-y-6">
            {recommendations.length > 0 ? (
              recommendations.map((rec, index) => (
                <Card key={index} className="border-2 border-blue-200 bg-blue-50/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl font-bold text-blue-800 flex items-center gap-2 sm:gap-3">
                      <Info className="w-5 h-5 sm:w-6 sm:h-6" />
                      {rec.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-blue-700">
                      針對「{rec.domain}」的改善建議
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 sm:space-y-3">
                      {rec.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-blue-800">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-2 border-green-200 bg-green-50/80 backdrop-blur-sm shadow-lg">
                <CardContent className="text-center py-8 sm:py-12">
                  <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-4 sm:mb-6" />
                  <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2 sm:mb-4">
                    恭喜！您的靈性健康狀況良好
                  </h3>
                  <p className="text-sm sm:text-base text-green-700 px-4">
                    您在各個領域都表現優秀，請繼續保持目前的生活方式和靈性修養。
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* 底部操作區域 */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
          <Button
            onClick={onRestart}
            variant="outline"
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          >
            重新檢測
          </Button>
          
          <Button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: '靈性健康檢測報告',
                  text: `我的靈性健康總分是 ${scores.overallScore.toFixed(1)}/6.0`,
                  url: window.location.href
                })
              }
            }}
            className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Share2 className="w-4 h-4 mr-2" />
            分享結果
          </Button>
        </div>

        {/* 免責聲明 */}
        <div className="text-center mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-100 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            <strong>免責聲明：</strong>本檢測結果僅供參考，不能替代專業的心理健康評估或醫療建議。
            如有嚴重的心理健康問題，請尋求專業協助。
          </p>
        </div>
      </div>
    </div>
  )
}

export default Report
