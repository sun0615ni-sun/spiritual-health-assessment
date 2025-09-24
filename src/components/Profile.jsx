import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon, Building2, GraduationCap, Mail, MapPin, User, Globe, Briefcase } from 'lucide-react'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { cn } from '../lib/utils'

// 國籍選項
const NATIONALITIES = [
  '中華民國',
  '中華人民共和國',
  '美國',
  '日本',
  '韓國',
  '新加坡',
  '馬來西亞',
  '泰國',
  '印尼',
  '菲律賓',
  '越南',
  '印度',
  '澳洲',
  '紐西蘭',
  '加拿大',
  '英國',
  '德國',
  '法國',
  '義大利',
  '西班牙',
  '荷蘭',
  '瑞士',
  '瑞典',
  '挪威',
  '丹麥',
  '芬蘭',
  '俄羅斯',
  '巴西',
  '阿根廷',
  '墨西哥',
  '南非',
  '其他'
]

// 台灣城市選項
const TAIWAN_CITIES = [
  '台北市',
  '新北市',
  '桃園市',
  '台中市',
  '台南市',
  '高雄市',
  '基隆市',
  '新竹市',
  '嘉義市',
  '新竹縣',
  '苗栗縣',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義縣',
  '屏東縣',
  '宜蘭縣',
  '花蓮縣',
  '台東縣',
  '澎湖縣',
  '金門縣',
  '連江縣',
  '其他'
]

// 職業選項
const OCCUPATIONS = [
  '學生',
  '教師/教授',
  '工程師',
  '醫師',
  '護理師',
  '律師',
  '會計師',
  '公務員',
  '軍人',
  '警察',
  '消防員',
  '業務/銷售',
  '行銷/企劃',
  '人力資源',
  '財務/金融',
  '設計師',
  '藝術家',
  '記者/編輯',
  '翻譯',
  '諮商師/心理師',
  '社工師',
  '牧師/神父/法師',
  '企業主管',
  '創業家',
  '自由工作者',
  '家庭主婦/主夫',
  '退休',
  '待業中',
  '服務業',
  '製造業',
  '農林漁牧業',
  '建築/營造業',
  '運輸業',
  '餐飲業',
  '零售業',
  '其他'
]

// 教育程度選項
const EDUCATION_LEVELS = [
  '國小',
  '國中',
  '高中職',
  '專科',
  '大學',
  '碩士',
  '博士',
  '其他'
]

// 婚姻狀況選項
const MARITAL_STATUS = [
  '未婚',
  '已婚',
  '離婚',
  '喪偶',
  '分居',
  '其他'
]

// 宗教信仰選項
const RELIGIONS = [
  '佛教',
  '道教',
  '基督教',
  '天主教',
  '伊斯蘭教',
  '猶太教',
  '印度教',
  '民間信仰',
  '無宗教信仰',
  '其他'
]

// 居住狀況選項
const LIVING_SITUATIONS = [
  '與父母同住',
  '與配偶同住',
  '與子女同住',
  '與室友同住',
  '獨居',
  '其他'
]

const Profile = ({ onComplete, answers, isReligious }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthDate: null,
    email: '',
    nationality: '中華民國',
    city: '',
    occupation: '',
    education: '',
    maritalStatus: '',
    religion: '',
    livingSituation: '',
    testDate: new Date()
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 表單驗證
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = '請輸入姓名'
    }

    if (!formData.gender) {
      newErrors.gender = '請選擇生理性別'
    }

    if (!formData.birthDate) {
      newErrors.birthDate = '請選擇出生日期'
    }

    if (!formData.email.trim()) {
      newErrors.email = '請輸入電子信箱'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請輸入有效的電子信箱格式'
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

    if (!formData.education) {
      newErrors.education = '請選擇教育程度'
    }

    if (!formData.maritalStatus) {
      newErrors.maritalStatus = '請選擇婚姻狀況'
    }

    if (!formData.religion) {
      newErrors.religion = '請選擇宗教信仰'
    }

    if (!formData.livingSituation) {
      newErrors.livingSituation = '請選擇居住狀況'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // 模擬提交延遲
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onComplete({
        answers,
        profile: formData,
        isReligious
      })
    } catch (error) {
      console.error('提交失敗:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (field, value) => {
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 頁面標題 */}
        <Card className="mb-8 bg-white border-orange-100 shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
              基本資料填寫
            </CardTitle>
            <p className="text-gray-600 mt-2">
              為愛前行基金會 × 台大生命教育研發育成中心
            </p>
            <p className="text-sm text-gray-500 mt-1">
              請填寫以下資訊以完成您的靈性健康檢測
            </p>
          </CardHeader>
        </Card>

        {/* 表單內容 */}
        <Card className="bg-white border-orange-100 shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 個人基本資訊 */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-800">個人基本資訊</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 姓名 */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      姓名 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="請輸入您的姓名"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className={cn(
                        "border-gray-200 focus:border-orange-400",
                        errors.name && "border-red-300 focus:border-red-400"
                      )}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* 生理性別 */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      生理性別 <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => updateFormData('gender', value)}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="男性" id="male" className="text-orange-600" />
                        <Label htmlFor="male" className="text-sm text-gray-700">男性</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="女性" id="female" className="text-orange-600" />
                        <Label htmlFor="female" className="text-sm text-gray-700">女性</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="其他" id="other" className="text-orange-600" />
                        <Label htmlFor="other" className="text-sm text-gray-700">其他</Label>
                      </div>
                    </RadioGroup>
                    {errors.gender && (
                      <p className="text-sm text-red-600">{errors.gender}</p>
                    )}
                  </div>

                  {/* 出生日期 */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      出生日期 <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal border-gray-200 focus:border-orange-400",
                            !formData.birthDate && "text-muted-foreground",
                            errors.birthDate && "border-red-300"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.birthDate ? (
                            format(formData.birthDate, "yyyy年MM月dd日", { locale: zhTW })
                          ) : (
                            <span>請選擇出生日期</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.birthDate}
                          onSelect={(date) => updateFormData('birthDate', date)}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          locale={zhTW}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.birthDate && (
                      <p className="text-sm text-red-600">{errors.birthDate}</p>
                    )}
                  </div>

                  {/* 電子信箱 */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      電子信箱 <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className={cn(
                          "pl-10 border-gray-200 focus:border-orange-400",
                          errors.email && "border-red-300 focus:border-red-400"
                        )}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 地理資訊 */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-teal-600" />
                  <h3 className="text-lg font-semibold text-gray-800">地理資訊</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 國籍 */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      國籍 <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.nationality}
                      onValueChange={(value) => updateFormData('nationality', value)}
                    >
                      <SelectTrigger className={cn(
                        "border-gray-200 focus:border-orange-400",
                        errors.nationality && "border-red-300"
                      )}>
                        <SelectValue placeholder="請選擇國籍" />
                      </SelectTrigger>
                      <SelectContent>
                        {NATIONALITIES.map((nationality) => (
                          <SelectItem key={nationality} value={nationality}>
                            {nationality}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.nationality && (
                      <p className="text-sm text-red-600">{errors.nationality}</p>
                    )}
                  </div>

                  {/* 目前居住城市 */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      目前居住城市 <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                      <Select
                        value={formData.city}
                        onValueChange={(value) => updateFormData('city', value)}
                      >
                        <SelectTrigger className={cn(
                          "pl-10 border-gray-200 focus:border-orange-400",
                          errors.city && "border-red-300"
                        )}>
                          <SelectValue placeholder="請選擇居住城市" />
                        </SelectTrigger>
                        <SelectContent>
                          {TAIWAN_CITIES.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.city && (
                      <p className="text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 職業與教育 */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-800">職業與教育</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 職業 */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      職業 <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.occupation}
                      onValueChange={(value) => updateFormData('occupation', value)}
                    >
                      <SelectTrigger className={cn(
                        "border-gray-200 focus:border-orange-400",
                        errors.occupation && "border-red-300"
                      )}>
                        <SelectValue placeholder="請選擇職業" />
                      </SelectTrigger>
                      <SelectContent>
                        {OCCUPATIONS.map((occupation) => (
                          <SelectItem key={occupation} value={occupation}>
                            {occupation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.occupation && (
                      <p className="text-sm text-red-600">{errors.occupation}</p>
                    )}
                  </div>

                  {/* 教育程度 */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      教育程度 <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.education}
                      onValueChange={(value) => updateFormData('education', value)}
                    >
                      <SelectTrigger className={cn(
                        "border-gray-200 focus:border-orange-400",
                        errors.education && "border-red-300"
                      )}>
                        <SelectValue placeholder="請選擇教育程度" />
                      </SelectTrigger>
                      <SelectContent>
                        {EDUCATION_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.education && (
                      <p className="text-sm text-red-600">{errors.education}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 個人狀況 */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-teal-600" />
                  <h3 className="text-lg font-semibold text-gray-800">個人狀況</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 婚姻狀況 */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      婚姻狀況 <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.maritalStatus}
                      onValueChange={(value) => updateFormData('maritalStatus', value)}
                    >
                      <SelectTrigger className={cn(
                        "border-gray-200 focus:border-orange-400",
                        errors.maritalStatus && "border-red-300"
                      )}>
                        <SelectValue placeholder="請選擇婚姻狀況" />
                      </SelectTrigger>
                      <SelectContent>
                        {MARITAL_STATUS.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.maritalStatus && (
                      <p className="text-sm text-red-600">{errors.maritalStatus}</p>
                    )}
                  </div>

                  {/* 宗教信仰 */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      宗教信仰 <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.religion}
                      onValueChange={(value) => updateFormData('religion', value)}
                    >
                      <SelectTrigger className={cn(
                        "border-gray-200 focus:border-orange-400",
                        errors.religion && "border-red-300"
                      )}>
                        <SelectValue placeholder="請選擇宗教信仰" />
                      </SelectTrigger>
                      <SelectContent>
                        {RELIGIONS.map((religion) => (
                          <SelectItem key={religion} value={religion}>
                            {religion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.religion && (
                      <p className="text-sm text-red-600">{errors.religion}</p>
                    )}
                  </div>

                  {/* 居住狀況 */}
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-medium text-gray-700">
                      居住狀況 <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.livingSituation}
                      onValueChange={(value) => updateFormData('livingSituation', value)}
                    >
                      <SelectTrigger className={cn(
                        "border-gray-200 focus:border-orange-400",
                        errors.livingSituation && "border-red-300"
                      )}>
                        <SelectValue placeholder="請選擇居住狀況" />
                      </SelectTrigger>
                      <SelectContent>
                        {LIVING_SITUATIONS.map((situation) => (
                          <SelectItem key={situation} value={situation}>
                            {situation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.livingSituation && (
                      <p className="text-sm text-red-600">{errors.livingSituation}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 提交按鈕 */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      處理中...
                    </div>
                  ) : (
                    '查看檢測報告'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 隱私說明 */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            您的個人資料將以匿名方式保存，僅供研究與教學使用，不對外揭露
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
