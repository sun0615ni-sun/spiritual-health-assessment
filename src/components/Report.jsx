import React, { useState, useMemo } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import { 
  ChevronLeft, Download, Share2, Heart, Users, Leaf, Star, 
  TrendingUp, Award, Target, Lightbulb, Sun, Moon, Calendar, Clock
} from 'lucide-react'
import { calculateScores } from '../scoring'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'

const Report = ({ data, onBack, onRestart }) => {
  const [activeTab, setActiveTab] = useState('overview')
  
  const scores = useMemo(() => {
    if (!data?.answers) return null
    return calculateScores(data.answers)
  }, [data])

  if (!scores || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 flex items-center justify-center">
        <Card className="max-w-md bg-white border-orange-100 shadow-xl">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 mb-4">載入報告中...</p>
            <Button 
              onClick={onBack}
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              返回
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getScoreColor = (score) => {
    if (score >= 4.5) return 'text-teal-600 bg-teal-100'
    if (score >= 3.5) return 'text-orange-500 bg-orange-100'
    return 'text-red-500 bg-red-100'
  }

  const getScoreLevel = (score) => {
    if (score >= 4.5) return '優秀'
    if (score >= 3.5) return '良好'
    return '待加強'
  }

  const domainData = [
    { name: '與自己', score: scores.domains.self, icon: Heart, color: 'from-orange-500 to-red-500' },
    { name: '與他人', score: scores.domains.others, icon: Users, color: 'from-teal-500 to-cyan-500' },
    { name: '與自然', score: scores.domains.nature, icon: Leaf, color: 'from-orange-500 to-red-500' },
    { name: '與超越者', score: scores.domains.transcendent, icon: Star, color: 'from-teal-500 to-cyan-500' }
  ]

  const aspectData = [
    { aspect: '自我覺察', score: scores.aspects.selfAwareness },
    { aspect: '生命意義', score: scores.aspects.lifeMeaning },
    { aspect: '內在平靜', score: scores.aspects.innerPeace },
    { aspect: '感恩寬恕', score: scores.aspects.gratitudeForgiveness },
    { aspect: '愛與同理', score: scores.aspects.loveEmpathy },
    { aspect: '謙卑敬畏', score: scores.aspects.humilityAwe },
    { aspect: '盼望信心', score: scores.aspects.hopeFaith }
  ]

  const practiceRecommendations = [
    {
      time: '晨間實踐',
      icon: Sun,
      color: 'from-orange-400 to-yellow-400',
      practices: [
        '每日10分鐘靜心冥想',
        '感恩日記書寫',
        '正念呼吸練習',
        '設定當日意圖'
      ]
    },
    {
      time: '日間實踐', 
      icon: Clock,
      color: 'from-teal-400 to-cyan-400',
      practices: [
        '工作中的正念時刻',
        '與他人的真誠連結',
        '欣賞自然美景',
        '實踐同理心傾聽'
      ]
    },
    {
      time: '晚間實踐',
      icon: Moon,
      color: 'from-purple-400 to-indigo-400',
      practices: [
        '反思今日學習',
        '寬恕練習',
        '感謝禱告或冥想',
        '規劃明日成長'
      ]
    },
    {
      time: '週間實踐',
      icon: Calendar,
      color: 'from-green-400 to-emerald-400',
      practices: [
        '參與志工服務',
        '親近大自然',
        '深度靈性閱讀',
        '參加靈性成長課程'
      ]
    }
  ]

  const spiritualPrinciples = [
    { principle: '覺察當下', description: '培養對當下時刻的敏銳覺察力' },
    { principle: '感恩之心', description: '在日常生活中培養感恩的態度' },
    { principle: '慈悲寬恕', description: '對自己和他人展現慈悲與寬恕' },
    { principle: '謙卑學習', description: '保持謙卑的心態持續學習成長' },
    { principle: '服務奉獻', description: '透過服務他人找到生命的意義' },
    { principle: '內在平靜', description: '在忙碌中保持內心的寧靜' },
    { principle: '信心希望', description: '對未來保持積極的信心與希望' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 報告標題 */}
        <Card className="mb-8 bg-white border-orange-100 shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
                靈性健康檢測報告
              </CardTitle>
            </div>
            
            {data.profile && (
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <Badge variant="outline" className="border-orange-200 text-orange-700">
                  {data.profile.name}
                </Badge>
                <Badge variant="outline" className="border-teal-200 text-teal-700">
                  {data.profile.gender === 'male' ? '男性' : data.profile.gender === 'female' ? '女性' : '其他'}
                </Badge>
                {data.profile.birthDate && (
                  <Badge variant="outline" className="border-gray-200 text-gray-700">
                    {format(data.profile.birthDate, 'yyyy年MM月dd日', { locale: zhTW })}
                  </Badge>
                )}
                <Badge variant="outline" className="border-gray-200 text-gray-700">
                  檢測日期：{format(data.profile.testDate, 'yyyy年MM月dd日', { locale: zhTW })}
                </Badge>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* 標籤頁導航 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-orange-100 shadow-sm">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              總覽
            </TabsTrigger>
            <TabsTrigger 
              value="domains"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              四領域
            </TabsTrigger>
            <TabsTrigger 
              value="aspects"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
            >
              七面向
            </TabsTrigger>
            <TabsTrigger 
              value="recommendations"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              建議
            </TabsTrigger>
          </TabsList>

          {/* 總覽標籤 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* 總分卡片 */}
              <Card className="bg-gradient-to-br from-orange-100 to-red-100 border-orange-200">
                <CardHeader className="text-center">
                  <CardTitle className="text-orange-700">總體靈性健康分數</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    {scores.total.toFixed(1)}
                  </div>
                  <div className="text-lg text-orange-700 mb-4">
                    {getScoreLevel(scores.total)}
                  </div>
                  <Progress 
                    value={(scores.total / 6) * 100} 
                    className="h-3 bg-orange-200"
                  />
                </CardContent>
              </Card>

              {/* 平均分卡片 */}
              <Card className="bg-gradient-to-br from-teal-100 to-cyan-100 border-teal-200">
                <CardHeader className="text-center">
                  <CardTitle className="text-teal-700">平均分數</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-teal-600 mb-2">
                    {scores.average.toFixed(1)}
                  </div>
                  <div className="text-lg text-teal-700 mb-4">
                    滿分 6.0 分
                  </div>
                  <Progress 
                    value={(scores.average / 6) * 100} 
                    className="h-3 bg-teal-200"
                  />
                </CardContent>
              </Card>
            </div>

            {/* 四領域快速概覽 */}
            <Card className="bg-white border-orange-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  四領域概覽
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {domainData.map((domain, index) => {
                    const IconComponent = domain.icon
                    return (
                      <div key={index} className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${domain.color} rounded-xl flex items-center justify-center`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          {domain.name}
                        </div>
                        <div className="text-lg font-bold text-gray-800">
                          {domain.score.toFixed(1)}
                        </div>
                        <Badge className={`text-xs ${getScoreColor(domain.score)}`}>
                          {getScoreLevel(domain.score)}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 四領域標籤 */}
          <TabsContent value="domains" className="space-y-6">
            <Card className="bg-white border-orange-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <BarChart className="w-5 h-5 text-orange-600" />
                  四領域詳細分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={domainData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 6]} tick={{ fontSize: 12 }} />
                      <Tooltip 
                        formatter={(value) => [value.toFixed(2), '分數']}
                        labelStyle={{ color: '#374151' }}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #fed7aa',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="score" 
                        fill="url(#gradient)"
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#dc2626" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {domainData.map((domain, index) => {
                    const IconComponent = domain.icon
                    return (
                      <Card key={index} className="border-gray-100">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-8 h-8 bg-gradient-to-br ${domain.color} rounded-lg flex items-center justify-center`}>
                              <IconComponent className="w-4 h-4 text-white" />
                            </div>
                            <div className="font-semibold text-gray-800">
                              {domain.name}的關係
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-gray-800">
                              {domain.score.toFixed(1)}
                            </span>
                            <Badge className={getScoreColor(domain.score)}>
                              {getScoreLevel(domain.score)}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 七面向標籤 */}
          <TabsContent value="aspects" className="space-y-6">
            <Card className="bg-white border-orange-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Target className="w-5 h-5 text-teal-600" />
                  七面向雷達圖分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={aspectData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis 
                        dataKey="aspect" 
                        tick={{ fontSize: 12, fill: '#374151' }}
                      />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 6]} 
                        tick={{ fontSize: 10, fill: '#6b7280' }}
                      />
                      <Radar
                        name="分數"
                        dataKey="score"
                        stroke="#0d9488"
                        fill="#0d9488"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Tooltip 
                        formatter={(value) => [value.toFixed(2), '分數']}
                        labelStyle={{ color: '#374151' }}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #5eead4',
                          borderRadius: '8px'
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aspectData.map((aspect, index) => (
                    <Card key={index} className="border-gray-100">
                      <CardContent className="p-4">
                        <div className="font-medium text-gray-800 mb-2">
                          {aspect.aspect}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-gray-800">
                            {aspect.score.toFixed(1)}
                          </span>
                          <Badge className={getScoreColor(aspect.score)}>
                            {getScoreLevel(aspect.score)}
                          </Badge>
                        </div>
                        <Progress 
                          value={(aspect.score / 6) * 100} 
                          className="h-2 mt-2"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 建議標籤 */}
          <TabsContent value="recommendations" className="space-y-6">
            {/* 日常實踐建議 */}
            <Card className="bg-white border-orange-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                  日常實踐建議
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {practiceRecommendations.map((practice, index) => {
                    const IconComponent = practice.icon
                    return (
                      <Card key={index} className="border-gray-100">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${practice.color} rounded-lg flex items-center justify-center`}>
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <CardTitle className="text-lg text-gray-800">
                              {practice.time}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {practice.practices.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* 靈修七原則 */}
            <Card className="bg-white border-teal-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Star className="w-5 h-5 text-teal-600" />
                  靈修七原則
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {spiritualPrinciples.map((principle, index) => (
                    <div key={index} className="flex gap-3 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-teal-700 mb-1">
                          {principle.principle}
                        </div>
                        <div className="text-sm text-gray-600">
                          {principle.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 底部操作按鈕 */}
        <div className="flex flex-wrap justify-between items-center gap-4 mt-8">
          <div className="flex gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              返回資料填寫
            </Button>
            
            <Button
              onClick={onRestart}
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              重新檢測
            </Button>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-teal-200 text-teal-600 hover:bg-teal-50"
            >
              <Share2 className="w-4 h-4 mr-2" />
              分享報告
            </Button>
            
            <Button
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              下載 PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report
