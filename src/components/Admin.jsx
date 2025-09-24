import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { 
  ArrowLeft, 
  Download, 
  Trash2, 
  Search, 
  Filter, 
  BarChart3, 
  Users, 
  Calendar,
  Eye,
  FileText,
  TrendingUp,
  AlertCircle
} from 'lucide-react'

const Admin = ({ onBack }) => {
  const [responses, setResponses] = useState([])
  const [filteredResponses, setFilteredResponses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGender, setFilterGender] = useState('all')
  const [filterAge, setFilterAge] = useState('all')
  const [selectedResponse, setSelectedResponse] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  // 模擬數據載入
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        timestamp: '2024-01-15 14:30:00',
        profile: {
          name: '張小明',
          age: 25,
          biologicalGender: 'male',
          email: 'zhang@example.com',
          nationality: 'ROC',
          city: '台北市',
          occupation: '工程師'
        },
        scores: {
          overallScore: 4.2,
          domainScores: {
            '與自己的關係': 4.5,
            '與他人的關係': 4.0,
            '與自然的關係': 3.8,
            '與超越者的關係': 4.5
          }
        },
        isReligious: true
      },
      {
        id: 2,
        timestamp: '2024-01-16 09:15:00',
        profile: {
          name: '李小華',
          age: 32,
          biologicalGender: 'female',
          email: 'li@example.com',
          nationality: 'ROC',
          city: '新北市',
          occupation: '教師'
        },
        scores: {
          overallScore: 3.8,
          domainScores: {
            '與自己的關係': 3.5,
            '與他人的關係': 4.2,
            '與自然的關係': 3.6,
            '與超越者的關係': 3.8
          }
        },
        isReligious: false
      }
    ]
    
    setResponses(mockData)
    setFilteredResponses(mockData)
  }, [])

  // 搜尋和篩選
  useEffect(() => {
    let filtered = responses.filter(response => {
      const matchesSearch = response.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           response.profile.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesGender = filterGender === 'all' || response.profile.biologicalGender === filterGender
      
      const matchesAge = filterAge === 'all' || 
                        (filterAge === 'young' && response.profile.age < 30) ||
                        (filterAge === 'middle' && response.profile.age >= 30 && response.profile.age < 50) ||
                        (filterAge === 'senior' && response.profile.age >= 50)
      
      return matchesSearch && matchesGender && matchesAge
    })
    
    setFilteredResponses(filtered)
  }, [responses, searchTerm, filterGender, filterAge])

  // 統計數據
  const stats = {
    total: responses.length,
    avgScore: responses.length > 0 ? (responses.reduce((sum, r) => sum + r.scores.overallScore, 0) / responses.length).toFixed(1) : 0,
    religious: responses.filter(r => r.isReligious).length,
    genderDistribution: {
      male: responses.filter(r => r.profile.biologicalGender === 'male').length,
      female: responses.filter(r => r.profile.biologicalGender === 'female').length,
      other: responses.filter(r => r.profile.biologicalGender === 'other').length
    }
  }

  const handleDeleteResponse = (id) => {
    if (window.confirm('確定要刪除這筆回應嗎？')) {
      setResponses(prev => prev.filter(r => r.id !== id))
    }
  }

  const handleExportData = () => {
    const dataStr = JSON.stringify(filteredResponses, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `spiritual-health-data-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  const getScoreColor = (score) => {
    if (score >= 5.0) return 'text-green-600 bg-green-50'
    if (score >= 4.0) return 'text-teal-600 bg-teal-50'
    if (score >= 3.0) return 'text-yellow-600 bg-yellow-50'
    if (score >= 2.0) return 'text-orange-600 bg-orange-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        
        {/* 頁面標題和操作按鈕 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text text-transparent">
                後台管理系統
              </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              檢測回應數據管理與統計分析
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首頁
            </Button>
            
            <Button
              onClick={handleExportData}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              匯出數據
            </Button>
          </div>
        </div>

        {/* 統計卡片 - 響應式網格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border-2 border-blue-200 bg-blue-50/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                <div>
                  <p className="text-xs sm:text-sm text-blue-600 font-medium">總回應數</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-800">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-green-50/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                <div>
                  <p className="text-xs sm:text-sm text-green-600 font-medium">平均分數</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-800">{stats.avgScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-purple-50/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
                <div>
                  <p className="text-xs sm:text-sm text-purple-600 font-medium">有宗教信仰</p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-800">{stats.religious}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-orange-50/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
                <div>
                  <p className="text-xs sm:text-sm text-orange-600 font-medium">本月新增</p>
                  <p className="text-xl sm:text-2xl font-bold text-orange-800">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 搜尋和篩選區域 */}
        <Card className="border-2 border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
              <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              搜尋與篩選
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-medium text-gray-700">
                  搜尋姓名或信箱
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-sm"
                    placeholder="輸入關鍵字..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender-filter" className="text-sm font-medium text-gray-700">
                  性別篩選
                </Label>
                <select
                  id="gender-filter"
                  value={filterGender}
                  onChange={(e) => setFilterGender(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">全部</option>
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                  <option value="other">其他</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age-filter" className="text-sm font-medium text-gray-700">
                  年齡篩選
                </Label>
                <select
                  id="age-filter"
                  value={filterAge}
                  onChange={(e) => setFilterAge(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">全部</option>
                  <option value="young">30歲以下</option>
                  <option value="middle">30-50歲</option>
                  <option value="senior">50歲以上</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  篩選結果
                </Label>
                <div className="flex items-center h-10 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
                  <span className="text-sm text-gray-600">
                    共 {filteredResponses.length} 筆記錄
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 回應列表 */}
        <Card className="border-2 border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              檢測回應列表
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              點擊查看詳細資料，或進行管理操作
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredResponses.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-sm sm:text-base text-gray-500">
                  {responses.length === 0 ? '尚無檢測回應' : '沒有符合條件的記錄'}
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filteredResponses.map((response) => (
                  <div
                    key={response.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {/* 基本資訊 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                          {response.profile.name}
                        </h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <Badge variant="outline" className="text-xs">
                            {response.profile.biologicalGender === 'male' ? '男性' : 
                             response.profile.biologicalGender === 'female' ? '女性' : '其他'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {response.profile.age}歲
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {response.profile.city}
                          </Badge>
                          {response.isReligious && (
                            <Badge className="bg-purple-100 text-purple-700 text-xs">
                              有宗教信仰
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">
                        {response.profile.email} | {response.profile.occupation}
                      </p>
                      <p className="text-xs text-gray-500">
                        檢測時間：{response.timestamp}
                      </p>
                    </div>

                    {/* 分數顯示 */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">總分</p>
                        <Badge className={`px-2 py-1 text-sm font-bold ${getScoreColor(response.scores.overallScore)}`}>
                          {response.scores.overallScore.toFixed(1)}
                        </Badge>
                      </div>
                    </div>

                    {/* 操作按鈕 */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        onClick={() => {
                          setSelectedResponse(response)
                          setShowDetails(true)
                        }}
                        size="sm"
                        variant="outline"
                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        查看
                      </Button>
                      <Button
                        onClick={() => handleDeleteResponse(response.id)}
                        size="sm"
                        variant="outline"
                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 詳細資料彈窗 */}
        {showDetails && selectedResponse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    詳細檢測結果
                  </h3>
                  <Button
                    onClick={() => setShowDetails(false)}
                    variant="outline"
                    size="sm"
                    className="px-3 py-1"
                  >
                    關閉
                  </Button>
                </div>

                {/* 個人資料 */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">個人資料</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
                    <p><strong>姓名：</strong>{selectedResponse.profile.name}</p>
                    <p><strong>年齡：</strong>{selectedResponse.profile.age}歲</p>
                    <p><strong>性別：</strong>{selectedResponse.profile.biologicalGender === 'male' ? '男性' : 
                                                selectedResponse.profile.biologicalGender === 'female' ? '女性' : '其他'}</p>
                    <p><strong>國籍：</strong>{selectedResponse.profile.nationality}</p>
                    <p><strong>居住城市：</strong>{selectedResponse.profile.city}</p>
                    <p><strong>職業：</strong>{selectedResponse.profile.occupation}</p>
                    <p className="sm:col-span-2"><strong>信箱：</strong>{selectedResponse.profile.email}</p>
                  </div>
                </div>

                {/* 分數詳情 */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">檢測分數</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">整體分數</span>
                      <Badge className={`px-3 py-1 font-bold ${getScoreColor(selectedResponse.scores.overallScore)}`}>
                        {selectedResponse.scores.overallScore.toFixed(1)} / 6.0
                      </Badge>
                    </div>
                    {Object.entries(selectedResponse.scores.domainScores).map(([domain, score]) => (
                      <div key={domain} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">{domain}</span>
                        <Badge className={`px-2 py-1 text-sm ${getScoreColor(score)}`}>
                          {score.toFixed(1)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
