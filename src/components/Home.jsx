import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Badge } from './ui/badge'
import { Heart, Users, Leaf, Star, Building2, GraduationCap } from 'lucide-react'

const Home = ({ onStartQuestionnaire }) => {
  const [agreed, setAgreed] = useState(false)

  const domains = [
    {
      icon: Heart,
      title: '與自己的關係',
      description: '自我覺察、生命意義、內在平靜',
      color: 'bg-gradient-to-br from-orange-100 to-red-100 border-orange-200'
    },
    {
      icon: Users,
      title: '與他人的關係', 
      description: '感恩寬恕、愛與同理',
      color: 'bg-gradient-to-br from-teal-100 to-cyan-100 border-teal-200'
    },
    {
      icon: Leaf,
      title: '與自然的關係',
      description: '謙卑敬畏',
      color: 'bg-gradient-to-br from-orange-100 to-red-100 border-orange-200'
    },
    {
      icon: Star,
      title: '與超越者的關係',
      description: '盼望信心',
      color: 'bg-gradient-to-br from-teal-100 to-cyan-100 border-teal-200'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 機構 LOGO 區域 */}
        <div className="text-center mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
            {/* 為愛前行基金會 */}
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-md border border-orange-100">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-600">財團法人新北市</div>
                <div className="font-bold text-orange-600">為愛前行基金會</div>
              </div>
            </div>

            {/* 連接線 */}
            <div className="hidden md:block w-8 h-px bg-gradient-to-r from-orange-300 to-teal-300"></div>

            {/* 台大生命教育中心 */}
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-md border border-teal-100">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-600">國立台灣大學</div>
                <div className="font-bold text-teal-600">生命教育研發育成中心</div>
              </div>
            </div>
          </div>

          {/* 編制者資訊 */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-teal-100 px-4 py-2 rounded-full border border-orange-200">
            <Building2 className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-gray-700">編制者：孫效智教授</span>
          </div>
        </div>

        {/* 主標題 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-500 to-teal-600 bg-clip-text text-transparent">
            發現你的靈性力量
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            開啟更平安喜樂的人生
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-base text-gray-600 leading-normal mb-6">
              您是否曾想過：行程滿檔，為什麼心裡仍有空虛與不安？在人生的十字路口，總是不太確定方向？或是在關係裡，常被情緒牽動、與人誤解？——也許，是時候照顧自己的靈性健康了。
            </p>
            
            <div className="bg-gradient-to-r from-orange-50 to-teal-50 p-6 rounded-xl border border-orange-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">什麼是靈性健康？</h3>
              <p className="text-base text-gray-600 leading-normal">
                能與自己、他人、自然、超越者建立和諧關係，於日常中活出意義與平安。本系統根據四領域七面向十核心指標靈修七原則建構，協助你看見現況、辨識優勢與待加強處，並給出具體可行的成長建議。
              </p>
            </div>
          </div>
        </div>

        {/* 四領域卡片 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {domains.map((domain, index) => {
            const IconComponent = domain.icon
            return (
              <Card key={index} className={`${domain.color} hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      index % 2 === 0 
                        ? 'bg-gradient-to-br from-orange-500 to-red-500' 
                        : 'bg-gradient-to-br from-teal-500 to-cyan-500'
                    }`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className={`text-lg ${
                      index % 2 === 0 ? 'text-orange-700' : 'text-teal-700'
                    }`}>
                      {domain.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-sm">
                    {domain.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 同意條款 */}
        <Card className="mb-8 bg-white border-orange-100 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="agreement" 
                checked={agreed}
                onCheckedChange={setAgreed}
                className="mt-1 border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <div className="flex-1">
                <label htmlFor="agreement" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                  我已閱讀並同意
                  <Badge variant="outline" className="mx-1 border-teal-300 text-teal-700">
                    資料使用與保密說明
                  </Badge>
                  ：本問卷僅供研究與教學，所有個資將以匿名方式保存，僅限統計分析，不對外揭露。
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 開始按鈕 */}
        <div className="text-center">
          <Button 
            onClick={onStartQuestionnaire}
            disabled={!agreed}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            開始檢測
          </Button>
          
          {!agreed && (
            <p className="text-sm text-gray-500 mt-3">
              請先閱讀並同意資料使用說明
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
