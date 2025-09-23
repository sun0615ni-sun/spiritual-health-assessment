import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';
import { 
  FileText, Download, BarChart3, Target, Lightbulb, 
  Heart, Users, Leaf, Sparkles, User, Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { 
  calculateDomainScores, 
  calculateAspectScores, 
  calculateOverallScore,
  getScoreLevel,
  getRecommendations,
  spiritualPrinciples,
  dailyPractices
} from '../scoring.js';
import { domains, aspects } from '../questions.js';

const Report = ({ assessmentData, onRestart }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const { answers, isReligious, profile } = assessmentData;
  
  const domainScores = calculateDomainScores(answers, isReligious);
  const aspectScores = calculateAspectScores(answers, isReligious);
  const overallScore = calculateOverallScore(answers, isReligious);
  const recommendations = getRecommendations(domainScores, aspectScores);

  // 準備圖表資料
  const domainChartData = Object.entries(domainScores).map(([key, data]) => ({
    name: domains[key],
    score: data.average,
    percentage: data.percentage,
    level: getScoreLevel(data.percentage)
  }));

  const aspectChartData = Object.entries(aspectScores).map(([key, data]) => ({
    name: aspects[key],
    score: data.average,
    percentage: data.percentage,
    level: getScoreLevel(data.percentage)
  }));

  const radarData = aspectChartData.map(item => ({
    aspect: item.name,
    score: item.score
  }));

  const domainIcons = {
    self: Heart,
    others: Users,
    nature: Leaf,
    transcendent: Sparkles
  };

  const handleExportReport = () => {
    // 這裡可以實現報告匯出功能
    console.log('匯出報告功能待實現');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FileText className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">靈性健康檢測報告</h1>
            </div>
            
            {/* 基本資訊 */}
            <Card className="mb-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span><strong>姓名：</strong>{profile.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span><strong>性別：</strong>{profile.gender === 'male' ? '男性' : profile.gender === 'female' ? '女性' : '其他'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span><strong>生日：</strong>{profile.birthDate ? format(new Date(profile.birthDate), 'yyyy年MM月dd日', { locale: zhTW }) : ''}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span><strong>檢測日期：</strong>{format(new Date(profile.testDate), 'yyyy年MM月dd日', { locale: zhTW })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>總覽</span>
              </TabsTrigger>
              <TabsTrigger value="domains" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>四領域</span>
              </TabsTrigger>
              <TabsTrigger value="aspects" className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>七面向</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center space-x-2">
                <Lightbulb className="h-4 w-4" />
                <span>建議</span>
              </TabsTrigger>
            </TabsList>

            {/* 總覽 */}
            <TabsContent value="overview" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {/* 整體分數 */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>整體靈性健康分數</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="text-4xl font-bold text-indigo-600">
                        {overallScore.average.toFixed(1)}
                      </div>
                      <div className="text-lg text-gray-600">
                        總分 {overallScore.score} / {overallScore.maxScore}
                      </div>
                      <Progress value={overallScore.percentage} className="h-3" />
                      <Badge className={`${getScoreLevel(overallScore.percentage).bgColor} ${getScoreLevel(overallScore.percentage).color}`}>
                        {getScoreLevel(overallScore.percentage).level}分群組
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* 四領域快覽 */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>四領域分數</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(domainScores).map(([key, data]) => {
                      const Icon = domainIcons[key];
                      const level = getScoreLevel(data.percentage);
                      return (
                        <div key={key} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Icon className="h-5 w-5 text-indigo-600" />
                            <span className="font-medium">{domains[key]}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{data.average.toFixed(1)}</span>
                            <Badge className={`${level.bgColor} ${level.color} text-xs`}>
                              {level.level}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>

              {/* 長條圖 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>四領域詳細分數</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={domainChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 6]} />
                        <Tooltip 
                          formatter={(value, name) => [value.toFixed(2), '平均分數']}
                          labelFormatter={(label) => `領域: ${label}`}
                        />
                        <Bar 
                          dataKey="score" 
                          fill="#4f46e5"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* 四領域 */}
            <TabsContent value="domains" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {Object.entries(domainScores).map(([key, data]) => {
                  const Icon = domainIcons[key];
                  const level = getScoreLevel(data.percentage);
                  return (
                    <Card key={key} className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Icon className="h-6 w-6 text-indigo-600" />
                          <span>{domains[key]}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-indigo-600 mb-2">
                            {data.average.toFixed(1)}
                          </div>
                          <Progress value={data.percentage} className="h-2 mb-2" />
                          <Badge className={`${level.bgColor} ${level.color}`}>
                            {level.level}分群組 ({data.percentage.toFixed(1)}%)
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 text-center">
                          總分 {data.score} / {data.maxScore}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </motion.div>
            </TabsContent>

            {/* 七面向 */}
            <TabsContent value="aspects" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-2 gap-6"
              >
                {/* 雷達圖 */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>七面向雷達圖</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="aspect" tick={{ fontSize: 12 }} />
                        <PolarRadiusAxis domain={[0, 6]} tick={{ fontSize: 10 }} />
                        <Radar
                          name="分數"
                          dataKey="score"
                          stroke="#4f46e5"
                          fill="#4f46e5"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Tooltip formatter={(value) => [value.toFixed(2), '分數']} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* 七面向詳細分數 */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>七面向詳細分數</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(aspectScores).map(([key, data]) => {
                      const level = getScoreLevel(data.percentage);
                      return (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">{aspects[key]}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{data.average.toFixed(1)}</span>
                              <Badge className={`${level.bgColor} ${level.color} text-xs`}>
                                {level.level}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={data.percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* 建議 */}
            <TabsContent value="recommendations" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* 個人化建議 */}
                {recommendations.length > 0 && (
                  <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="h-6 w-6 text-indigo-600" />
                        <span>個人化成長建議</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recommendations.map((rec, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-indigo-800 mb-2">{rec.title}</h4>
                          <ul className="space-y-1">
                            {rec.suggestions.map((suggestion, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                                <span className="text-indigo-600 mt-1">•</span>
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* 靈修七原則 */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="h-6 w-6 text-indigo-600" />
                      <span>靈修七原則</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {spiritualPrinciples.map((principle, index) => (
                        <div key={index} className="p-4 bg-purple-50 rounded-lg">
                          <h4 className="font-semibold text-purple-800 mb-2">{principle.title}</h4>
                          <p className="text-sm text-gray-700">{principle.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 日常實踐 */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="h-6 w-6 text-indigo-600" />
                      <span>日常實踐建議</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {dailyPractices.map((category, index) => (
                        <div key={index} className="space-y-3">
                          <h4 className="font-semibold text-indigo-800">{category.category}</h4>
                          <ul className="space-y-2">
                            {category.practices.map((practice, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                                <span className="text-indigo-600 mt-1">•</span>
                                <span>{practice}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* 操作按鈕 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center space-x-4 mt-8"
          >
            <Button
              onClick={handleExportReport}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>匯出報告</span>
            </Button>
            <Button
              onClick={onRestart}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700"
            >
              <FileText className="h-4 w-4" />
              <span>重新檢測</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Report;
