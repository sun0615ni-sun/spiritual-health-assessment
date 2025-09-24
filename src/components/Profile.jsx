import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, User, FileText, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

const Profile = ({ data, onSave, onNext }) => {
  const [formData, setFormData] = useState({
    name: data?.name || '',
    biologicalGender: data?.biologicalGender || '',
    birthDate: data?.birthDate || null,
    email: data?.email || '',
    nationality: data?.nationality || 'ROC',
    city: data?.city || '',
    occupation: data?.occupation || '',
    isReligious: data?.isReligious || false
  });

  const [errors, setErrors] = useState({});
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // 國籍選項
  const nationalityOptions = [
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
  ];

  // 台灣縣市選項
  const cityOptions = [
    '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市',
    '基隆市', '新竹市', '嘉義市',
    '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣',
    '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣', '金門縣', '連江縣'
  ];

  // 職業選項
  const occupationOptions = [
    '學生', '教師', '公務員', '軍人', '警察', '醫師', '護理師', '律師',
    '工程師', '程式設計師', '會計師', '銀行員', '保險業', '房仲業',
    '銷售員', '客服人員', '餐飲業', '零售業', '製造業', '建築業',
    '藝術家', '設計師', '媒體業', '記者', '作家', '翻譯',
    '農夫', '漁民', '司機', '清潔工', '保全', '家管',
    '退休', '待業', '自由業', '創業家', '其他'
  ];

  const validateForm = () => {
    const newErrors = {};

    // 必填欄位驗證
    if (!formData.name.trim()) {
      newErrors.name = '請輸入姓名';
    }

    if (!formData.biologicalGender) {
      newErrors.biologicalGender = '請選擇生理性別';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = '請選擇出生日期';
    }

    if (!formData.email.trim()) {
      newErrors.email = '請輸入電子信箱';
    } else {
      // Email格式驗證 - 修復正則表達式語法
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = '請輸入有效的電子信箱地址';
      }
    }

    if (!formData.nationality) {
      newErrors.nationality = '請選擇國籍';
    }

    if (!formData.city) {
      newErrors.city = '請選擇居住城市';
    }

    if (!formData.occupation) {
      newErrors.occupation = '請選擇職業';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      onNext();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 清除該欄位的錯誤訊息
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="bg-white border-orange-100 shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <User className="w-6 h-6" />
              <CardTitle className="text-2xl font-bold">基本資料</CardTitle>
            </div>
            <p className="text-orange-100">請填寫您的基本資料，以便提供更準確的分析結果</p>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 姓名 */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  姓名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="請輸入您的姓名"
                  className={`border-2 transition-colors ${
                    errors.name 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-orange-200 focus:border-orange-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* 生理性別 */}
              <div className="space-y-3">
                <Label className="text-gray-700 font-medium">
                  生理性別 <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={formData.biologicalGender}
                  onValueChange={(value) => handleInputChange('biologicalGender', value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">男性</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">女性</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">其他</Label>
                  </div>
                </RadioGroup>
                {errors.biologicalGender && (
                  <p className="text-red-500 text-sm">{errors.biologicalGender}</p>
                )}
              </div>

              {/* 出生日期 */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  出生日期 <span className="text-red-500">*</span>
                </Label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal border-2 ${
                        errors.birthDate 
                          ? 'border-red-300 hover:border-red-400' 
                          : 'border-orange-200 hover:border-orange-300'
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.birthDate ? (
                        format(formData.birthDate, "yyyy年MM月dd日", { locale: zhTW })
                      ) : (
                        <span className="text-gray-500">選擇出生日期</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.birthDate}
                      onSelect={(date) => {
                        handleInputChange('birthDate', date);
                        setIsCalendarOpen(false);
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.birthDate && (
                  <p className="text-red-500 text-sm">{errors.birthDate}</p>
                )}
              </div>

              {/* 電子信箱 */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  電子信箱 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="請輸入您的電子信箱"
                  className={`border-2 transition-colors ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-orange-200 focus:border-orange-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* 國籍 */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  國籍 <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.nationality}
                  onValueChange={(value) => handleInputChange('nationality', value)}
                >
                  <SelectTrigger className={`border-2 ${
                    errors.nationality 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-orange-200 focus:border-orange-500'
                  }`}>
                    <SelectValue placeholder="請選擇國籍" />
                  </SelectTrigger>
                  <SelectContent>
                    {nationalityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.nationality && (
                  <p className="text-red-500 text-sm">{errors.nationality}</p>
                )}
              </div>

              {/* 居住城市 */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  目前居住城市 <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => handleInputChange('city', value)}
                >
                  <SelectTrigger className={`border-2 ${
                    errors.city 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-orange-200 focus:border-orange-500'
                  }`}>
                    <SelectValue placeholder="請選擇居住城市" />
                  </SelectTrigger>
                  <SelectContent>
                    {cityOptions.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city}</p>
                )}
              </div>

              {/* 職業 */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  職業 <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.occupation}
                  onValueChange={(value) => handleInputChange('occupation', value)}
                >
                  <SelectTrigger className={`border-2 ${
                    errors.occupation 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-orange-200 focus:border-orange-500'
                  }`}>
                    <SelectValue placeholder="請選擇職業" />
                  </SelectTrigger>
                  <SelectContent>
                    {occupationOptions.map((occupation) => (
                      <SelectItem key={occupation} value={occupation}>
                        {occupation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.occupation && (
                  <p className="text-red-500 text-sm">{errors.occupation}</p>
                )}
              </div>

              {/* 宗教信仰 */}
              <div className="space-y-3">
                <Label className="text-gray-700 font-medium">您是否有宗教信仰？</Label>
                <RadioGroup
                  value={formData.isReligious.toString()}
                  onValueChange={(value) => handleInputChange('isReligious', value === 'true')}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="religious-yes" />
                    <Label htmlFor="religious-yes" className="cursor-pointer">是</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="religious-no" />
                    <Label htmlFor="religious-no" className="cursor-pointer">否</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* 提交按鈕 */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  開始問卷調查
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
