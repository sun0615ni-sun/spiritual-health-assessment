import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'

const Profile = ({ questionnaireData, onComplete, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthDate: null,
    nationality: '',
    city: '',
    occupation: '',
    education: '',
    maritalStatus: '',
    religion: '',
    livingStatus: '',
    testDate: new Date()
  })

  const [errors, setErrors] = useState({})
  const [birthYear, setBirthYear] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthDay, setBirthDay] = useState('')

  // 生成年份選項（最近100年）
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleBirthDateChange = () => {
    if (birthYear && birthMonth && birthDay) {
      const date = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay))
      setFormData(prev => ({ ...prev, birthDate: date }))
      if (errors.birthDate) {
        setErrors(prev => ({ ...prev, birthDate: '' }))
      }
    }
  }

  React.useEffect(() => {
    handleBirthDateChange()
  }, [birthYear, birthMonth, birthDay])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = '請輸入姓名'
    if (!formData.gender) newErrors.gender = '請選擇性別'
    if (!formData.birthDate) newErrors.birthDate = '請選擇生日'
    if (!formData.nationality.trim()) newErrors.nationality = '請輸入國籍'
    if (!formData.city.trim()) newErrors.city = '請輸入居住城市'
    if (!formData.occupation.trim()) newErrors.occupation = '請輸入職業'
    if (!formData.education) newErrors.education = '請選擇教育程度'
    if (!formData.maritalStatus) newErrors.maritalStatus = '請選擇婚姻狀況'
    if (!formData.religion) newErrors.religion = '請選擇宗教信仰'
    if (!formData.livingStatus) newErrors.livingStatus = '請選擇居住狀況'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onComplete({
        ...questionnaireData,
        profile: formData
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="bg-white border-orange-100 shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
              基本資料填寫
            </CardTitle>
            <p className="text-gray-600 mt-2">
              請完整填寫以下資訊，這將有助於產生更準確的檢測報告
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 個人基本資訊 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  姓名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="請輸入您的姓名"
                  className={`border-gray-200 focus:border-orange-400 focus:ring-orange-400 ${
                    errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : ''
                  }`}
                />
                {errors.name && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  性別 <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="male" 
                      id="male"
                      className="border-orange-300 text-orange-500"
                    />
                    <Label htmlFor="male" className="text-gray-700">男性</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="female" 
                      id="female"
                      className="border-orange-300 text-orange-500"
                    />
                    <Label htmlFor="female" className="text-gray-700">女性</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="other" 
                      id="other"
                      className="border-orange-300 text-orange-500"
                    />
                    <Label htmlFor="other" className="text-gray-700">其他</Label>
                  </div>
                </RadioGroup>
                {errors.gender && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="w-3 h-3" />
                    {errors.gender}
                  </div>
                )}
              </div>
            </div>

            {/* 生日選擇 */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">
                生日 <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-3 gap-3">
                <Select value={birthYear} onValueChange={setBirthYear}>
                  <SelectTrigger className="border-gray-200 focus:border-orange-400">
                    <SelectValue placeholder="年份" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}年
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={birthMonth} onValueChange={setBirthMonth}>
                  <SelectTrigger className="border-gray-200 focus:border-orange-400">
                    <SelectValue placeholder="月份" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month} value={month.toString()}>
                        {month}月
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={birthDay} onValueChange={setBirthDay}>
                  <SelectTrigger className="border-gray-200 focus:border-orange-400">
                    <SelectValue placeholder="日期" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}日
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* 日曆選擇器（備用） */}
              <div className="mt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-gray-200 hover:border-orange-300"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.birthDate ? (
                        format(formData.birthDate, 'yyyy年MM月dd日', { locale: zhTW })
                      ) : (
                        <span className="text-gray-500">或點擊此處使用日曆選擇</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.birthDate}
                      onSelect={(date) => {
                        handleInputChange('birthDate', date)
                        if (date) {
                          setBirthYear(date.getFullYear().toString())
                          setBirthMonth((date.getMonth() + 1).toString())
                          setBirthDay(date.getDate().toString())
                        }
                      }}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {errors.birthDate && (
                <div className="flex items-center gap-1 text-red-500 text-sm">
                  <AlertCircle className="w-3 h-3" />
                  {errors.birthDate}
                </div>
              )}
            </div>

            {/* 其他資訊 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-gray-700 font-medium">
                  國籍 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  placeholder="例：中華民國"
                  className={`border-gray-200 focus:border-orange-400 focus:ring-orange-400 ${
                    errors.nationality ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : ''
                  }`}
                />
                {errors.nationality && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="w-3 h-3" />
                    {errors.nationality}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-700 font-medium">
                  居住城市 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="例：台北市"
                  className={`border-gray-200 focus:border-orange-400 focus:ring-orange-400 ${
                    errors.city ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : ''
                  }`}
                />
                {errors.city && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="w-3 h-3" />
                    {errors.city}
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="occupation" className="text-gray-700 font-medium">
                  職業 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  placeholder="例：教師、工程師、學生"
                  className={`border-gray-200 focus:border-orange-400 focus:ring-orange-400 ${
                    errors.occupation ? 'border-red-300 focus:border-red-400 focus:ring-red-400' : ''
                  }`}
                />
                {errors.occupation && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="w-3 h-3" />
                    {errors.occupation}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  教育程度 <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                  <SelectTrigger className={`border-gray-200 focus:border-orange-400 ${
                    errors.education ? 'border-red-300 focus:border-red-400' : ''
                  }`}>
                    <SelectValue placeholder="請選擇教育程度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elementary">國小</SelectItem>
                    <SelectItem value="junior">國中</SelectItem>
                    <SelectItem value="senior">高中職</SelectItem>
                    <SelectItem value="college">大學</SelectItem>
                    <SelectItem value="master">碩士</SelectItem>
                    <SelectItem value="doctor">博士</SelectItem>
                  </SelectContent>
                </Select>
                {errors.education && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="w-3 h-3" />
                    {errors.education}
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  婚姻狀況 <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                  <SelectTrigger className={`border-gray-200 focus:border-orange-400 ${
                    errors.maritalStatus ? 'border-red-300 focus:border-red-400' : ''
                  }`}>
                    <SelectValue placeholder="請選擇婚姻狀況" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">未婚</SelectItem>
                    <SelectItem value="married">已婚</SelectItem>
                    <SelectItem value="divorced">離婚</SelectItem>
                    <SelectItem value="widowed">喪偶</SelectItem>
                  </SelectContent>
                </Select>
                {errors.maritalStatus && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="w-3 h-3" />
                    {errors.maritalStatus}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  宗教信仰 <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={formData.religion}
                  onValueChange={(value) => handleInputChange('religion', value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="yes" 
                      id="religion-yes"
                      className="border-orange-300 text-orange-500"
                    />
                    <Label htmlFor="religion-yes" className="text-gray-700">有宗教信仰</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="no" 
                      id="religion-no"
                      className="border-orange-300 text-orange-500"
                    />
                    <Label htmlFor="religion-no" className="text-gray-700">沒有宗教信仰</Label>
                  </div>
                </RadioGroup>
                {errors.religion && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="w-3 h-3" />
                    {errors.religion}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">
                居住狀況 <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.livingStatus} onValueChange={(value) => handleInputChange('livingStatus', value)}>
                <SelectTrigger className={`border-gray-200 focus:border-orange-400 ${
                  errors.livingStatus ? 'border-red-300 focus:border-red-400' : ''
                }`}>
                  <SelectValue placeholder="請選擇居住狀況" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alone">獨居</SelectItem>
                  <SelectItem value="family">與家人同住</SelectItem>
                  <SelectItem value="roommate">與室友同住</SelectItem>
                  <SelectItem value="partner">與伴侶同住</SelectItem>
                  <SelectItem value="dormitory">宿舍</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
              {errors.livingStatus && (
                <div className="flex items-center gap-1 text-red-500 text-sm">
                  <AlertCircle className="w-3 h-3" />
                  {errors.livingStatus}
                </div>
              )}
            </div>

            {/* 檢測日期 */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">檢測日期</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-gray-200 hover:border-orange-300"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.testDate, 'yyyy年MM月dd日', { locale: zhTW })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.testDate}
                    onSelect={(date) => handleInputChange('testDate', date || new Date())}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* 按鈕區域 */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
              <Button
                onClick={onBack}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                返回問卷
              </Button>

              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                查看檢測報告
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Profile
