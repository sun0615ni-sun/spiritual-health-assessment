import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { ArrowLeft, ArrowRight, User, Mail, Globe, MapPin, Briefcase, CheckCircle } from 'lucide-react'

const Profile = ({ onComplete, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    biologicalGender: '',
    email: '',
    nationality: 'ROC',
    city: '',
    occupation: ''
  })

  const [errors, setErrors] = useState({})

  // 國籍選項
  const nationalities = [
    { value: 'ROC', label: '中華民國' },
    { value: 'PRC', label: '中華人民共和國' },
    { value: 'USA', label: '美國' },
    { value: 'JPN', label: '日本' },
    { value: 'KOR', label: '韓國' },
    { value: 'SGP', label: '新加坡' },
    { value: 'MYS', label: '馬來西亞' },
    { value: 'THA', label: '泰國' },
    { value: 'VNM', label: '越南' },
    { value: 'PHL', label: '菲律賓' },
    { value: 'IDN', label: '印尼' },
    { value: 'IND', label: '印度' },
    { value: 'AUS', label: '澳洲' },
    { value: 'CAN', label: '加拿大' },
    { value: 'GBR', label: '英國' },
    { value: 'FRA', label: '法國' },
    { value: 'DEU', label: '德國' },
    { value: 'OTHER', label: '其他' }
  ]

  // 台灣城市選項
  const cities = [
    '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市',
    '基隆市', '新竹市', '嘉義市',
    '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣',
    '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣', '金門縣', '連江縣'
  ]

  // 職業選項
  const occupations = [
    '學生', '教師', '公務員', '軍人', '警察', '醫師', '護理師', '律師',
    '工程師', '程式設計師', '會計師', '銀行員', '保險業', '房仲業',
    '服務業', '餐飲業', '零售業', '製造業', '建築業', '運輸業',
    '媒體業', '藝術工作者', '自由業', '家管', '退休', '待業中', '其他'
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = '請輸入姓名'
    }

    if (!formData.age) {
      newErrors.age = '請輸入年齡'
    } else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      newErrors.age = '請輸入有效的年齡 (1-120)'
    }

    if (!formData.biologicalGender) {
      newErrors.biologicalGender = '請選擇生理性別'
    }

    if (!formData.email.trim()) {
      newErrors.email = '請輸入電子信箱'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = '請輸入有效的電子信箱格式'
      }
    }

    if (!formData.nationality) {
      newErrors.nationality = '請選擇國籍'
    }

    if (!formData.city) {
      newErrors.city = '請選擇居住城市'
    }

    if (!formData.occupation) {
      newErrors.occupation = '請選擇職業'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete(formData)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // 清除該欄位的錯誤
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50">
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        
        {/* 頁面標題 */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text text-transparent">
              基本資料填寫
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            請填寫您的基本資料，這些資訊將用於生成個人化的靈性健康報告
          </p>
        </div>

        {/* 表單卡片 */}
        <Card className="border-2 border-orange-200 bg-white/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0" />
              <span>個人基本資料</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-600">
              請確實填寫以下資訊，所有資料將嚴格保密
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              
              {/* 姓名和年齡 - 響應式網格 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base font-medium text-gray-700">
                    姓名 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="請輸入您的姓名"
                  />
                  {errors.name && (
                    <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm sm:text-base font-medium text-gray-700">
                    年齡 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className={`w-full px-3 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.age ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="請輸入您的年齡"
                  />
                  {errors.age && (
                    <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.age}</p>
                  )}
                </div>
              </div>

              {/* 生理性別 */}
              <div className="space-y-3 sm:space-y-4">
                <Label className="text-sm sm:text-base font-medium text-gray-700">
                  生理性別 <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={formData.biologicalGender}
                  onValueChange={(value) => handleInputChange('biologicalGender', value)}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" className="text-orange-600" />
                    <Label htmlFor="male" className="text-sm sm:text-base cursor-pointer">男性</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" className="text-orange-600" />
                    <Label htmlFor="female" className="text-sm sm:text-base cursor-pointer">女性</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" className="text-orange-600" />
                    <Label htmlFor="other" className="text-sm sm:text-base cursor-pointer">其他</Label>
                  </div>
                </RadioGroup>
                {errors.biologicalGender && (
                  <p className="text-xs sm:text-sm text-red-600">{errors.biologicalGender}</p>
                )}
              </div>

              {/* 電子信箱 */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-600" />
                  電子信箱 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              {/* 國籍和居住城市 - 響應式網格 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base font-medium text-gray-700 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-orange-600" />
                    國籍 <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                    <SelectTrigger className={`w-full px-3 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.nationality ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}>
                      <SelectValue placeholder="請選擇國籍" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {nationalities.map((nationality) => (
                        <SelectItem key={nationality.value} value={nationality.value} className="text-sm sm:text-base">
                          {nationality.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.nationality && (
                    <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.nationality}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm sm:text-base font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    目前居住城市 <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                    <SelectTrigger className={`w-full px-3 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}>
                      <SelectValue placeholder="請選擇居住城市" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {cities.map((city) => (
                        <SelectItem key={city} value={city} className="text-sm sm:text-base">
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.city && (
                    <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.city}</p>
                  )}
                </div>
              </div>

              {/* 職業 */}
              <div className="space-y-2">
                <Label className="text-sm sm:text-base font-medium text-gray-700 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-orange-600" />
                  職業 <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.occupation} onValueChange={(value) => handleInputChange('occupation', value)}>
                  <SelectTrigger className={`w-full px-3 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                    errors.occupation ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}>
                    <SelectValue placeholder="請選擇職業" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {occupations.map((occupation) => (
                      <SelectItem key={occupation} value={occupation} className="text-sm sm:text-base">
                        {occupation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.occupation && (
                  <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.occupation}</p>
                )}
              </div>

              {/* 提交按鈕區域 - 響應式布局 */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                <Button
                  type="button"
                  onClick={onBack}
                  variant="outline"
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 order-2 sm:order-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回問卷
                </Button>
                
                <Button
                  type="submit"
                  className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 order-1 sm:order-2"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  完成填寫，查看報告
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 隱私提醒 */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-gray-500 px-2">
            您的個人資料將嚴格保密，僅用於生成個人化報告和學術研究統計分析
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
