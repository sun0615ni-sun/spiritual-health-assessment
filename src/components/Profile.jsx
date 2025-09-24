import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx';
import { Calendar } from '@/components/ui/calendar.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { CalendarIcon, User, FileText, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

const Profile = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: null,
    biologicalGender: '',
    nationality: '中華民國',
    city: '',
    occupation: '',
    education: '',
    maritalStatus: '',
    religion: '',
    livingStatus: '',
    testDate: new Date()
  });

  const [errors, setErrors] = useState({});
  const [showBirthCalendar, setShowBirthCalendar] = useState(false);
  const [showTestCalendar, setShowTestCalendar] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 清除該欄位的錯誤
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'name', 'email', 'birthDate', 'biologicalGender', 'nationality', 'city', 
      'occupation', 'education', 'maritalStatus', 'religion', 'livingStatus'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = '此欄位為必填';
      }
    });

    // Email格式驗證
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請輸入有效的電子郵件地址';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const biologicalGenderOptions = [
    { value: 'male', label: '男性' },
    { value: 'female', label: '女性' },
    { value: 'other', label: '其他' }
  ];

  const nationalityOptions = [
    '中華民國', '美國', '日本', '韓國', '新加坡', '馬來西亞', '泰國', 
    '菲律賓', '印尼', '越南', '印度', '澳洲', '加拿大', 
    '英國', '德國', '法國', '其他'
  ];

  const cityOptions = [
    '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市', '基隆市', '新竹市',
    '嘉義市', '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣',
    '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣', '金門縣', '連江縣', '其他'
  ];

  const occupationOptions = [
    '學生', '教師', '醫護人員', '工程師', '公務員', '企業主管', '服務業', '製造業',
    '金融業', '媒體業', '藝術工作者', '自由業', '退休', '家管', '其他'
  ];

  const educationOptions = [
    '國小', '國中', '高中職', '專科', '大學', '碩士', '博士'
  ];

  const maritalOptions = [
    '未婚', '已婚', '離婚', '喪偶', '其他'
  ];

  const religionOptions = [
    '無宗教信仰', '基督教', '天主教', '佛教', '道教', '伊斯蘭教', '其他'
  ];

  const livingOptions = [
    '獨居', '與家人同住', '與朋友同住', '與伴侶同住', '其他'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <User className="h-8 w-8 text-orange-600" />
              <h1 className="text-3xl font-bold text-gray-800">基本資料</h1>
            </div>
            <p className="text-gray-600">請填寫您的基本資料以完成檢測</p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-700">
                  <FileText className="h-5 w-5" />
                  <span>個人資訊</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 姓名 */}
                <div className="space-y-2">
                  <Label htmlFor="name">姓名 <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="請輸入您的姓名"
                    className={errors.name ? 'border-red-500' : 'focus:border-orange-500'}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>電子信箱 <span className="text-red-500">*</span></span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="請輸入您的電子信箱地址"
                    className={errors.email ? 'border-red-500' : 'focus:border-orange-500'}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* 生日 */}
                <div className="space-y-2">
                  <Label>生日 <span className="text-red-500">*</span></Label>
                  <Popover open={showBirthCalendar} onOpenChange={setShowBirthCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          !formData.birthDate ? 'text-muted-foreground' : ''
                        } ${errors.birthDate ? 'border-red-500' : 'hover:border-orange-500'}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.birthDate ? (
                          format(formData.birthDate, 'yyyy年MM月dd日', { locale: zhTW })
                        ) : (
                          '請選擇生日'
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="p-4 space-y-4">
                        {/* 年份和月份選擇器 */}
                        <div className="flex space-x-2">
                          <Select 
                            value={formData.birthDate ? formData.birthDate.getFullYear().toString() : ''}
                            onValueChange={(year) => {
                              const currentDate = formData.birthDate || new Date();
                              const newDate = new Date(parseInt(year), currentDate.getMonth(), currentDate.getDate());
                              handleInputChange('birthDate', newDate);
                            }}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue placeholder="年" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Select 
                            value={formData.birthDate ? (formData.birthDate.getMonth() + 1).toString() : ''}
                            onValueChange={(month) => {
                              const currentDate = formData.birthDate || new Date();
                              const newDate = new Date(currentDate.getFullYear(), parseInt(month) - 1, currentDate.getDate());
                              handleInputChange('birthDate', newDate);
                            }}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="月" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                <SelectItem key={month} value={month.toString()}>{month}月</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Select 
                            value={formData.birthDate ? formData.birthDate.getDate().toString() : ''}
                            onValueChange={(day) => {
                              const currentDate = formData.birthDate || new Date();
                              const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(day));
                              handleInputChange('birthDate', newDate);
                              setShowBirthCalendar(false);
                            }}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="日" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <SelectItem key={day} value={day.toString()}>{day}日</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* 日曆顯示 */}
                        <Calendar
                          mode="single"
                          selected={formData.birthDate}
                          onSelect={(date) => {
                            handleInputChange('birthDate', date);
                            setShowBirthCalendar(false);
                          }}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                          className="rounded-md border"
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
                </div>

                {/* 生理性別 */}
                <div className="space-y-3">
                  <Label>生理性別 <span className="text-red-500">*</span></Label>
                  <RadioGroup 
                    value={formData.biologicalGender} 
                    onValueChange={(value) => handleInputChange('biologicalGender', value)}
                    className="flex space-x-6"
                  >
                    {biologicalGenderOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.value} className="text-orange-600" />
                        <Label htmlFor={option.value}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.biologicalGender && <p className="text-red-500 text-sm">{errors.biologicalGender}</p>}
                </div>

                {/* 國籍 */}
                <div className="space-y-2">
                  <Label>國籍 <span className="text-red-500">*</span></Label>
                  <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                    <SelectTrigger className={errors.nationality ? 'border-red-500' : 'focus:border-orange-500'}>
                      <SelectValue placeholder="請選擇國籍" />
                    </SelectTrigger>
                    <SelectContent>
                      {nationalityOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}
                </div>

                {/* 目前居住城市 */}
                <div className="space-y-2">
                  <Label>目前居住城市 <span className="text-red-500">*</span></Label>
                  <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                    <SelectTrigger className={errors.city ? 'border-red-500' : 'focus:border-orange-500'}>
                      <SelectValue placeholder="請選擇居住城市" />
                    </SelectTrigger>
                    <SelectContent>
                      {cityOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>

                {/* 職業 */}
                <div className="space-y-2">
                  <Label>職業 <span className="text-red-500">*</span></Label>
                  <Select value={formData.occupation} onValueChange={(value) => handleInputChange('occupation', value)}>
                    <SelectTrigger className={errors.occupation ? 'border-red-500' : 'focus:border-orange-500'}>
                      <SelectValue placeholder="請選擇職業" />
                    </SelectTrigger>
                    <SelectContent>
                      {occupationOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation}</p>}
                </div>

                {/* 教育程度 */}
                <div className="space-y-2">
                  <Label>教育程度 <span className="text-red-500">*</span></Label>
                  <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                    <SelectTrigger className={errors.education ? 'border-red-500' : 'focus:border-orange-500'}>
                      <SelectValue placeholder="請選擇教育程度" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.education && <p className="text-red-500 text-sm">{errors.education}</p>}
                </div>

                {/* 婚姻狀況 */}
                <div className="space-y-2">
                  <Label>婚姻狀況 <span className="text-red-500">*</span></Label>
                  <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                    <SelectTrigger className={errors.maritalStatus ? 'border-red-500' : 'focus:border-orange-500'}>
                      <SelectValue placeholder="請選擇婚姻狀況" />
                    </SelectTrigger>
                    <SelectContent>
                      {maritalOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.maritalStatus && <p className="text-red-500 text-sm">{errors.maritalStatus}</p>}
                </div>

                {/* 宗教信仰 */}
                <div className="space-y-2">
                  <Label>宗教信仰 <span className="text-red-500">*</span></Label>
                  <Select value={formData.religion} onValueChange={(value) => handleInputChange('religion', value)}>
                    <SelectTrigger className={errors.religion ? 'border-red-500' : 'focus:border-orange-500'}>
                      <SelectValue placeholder="請選擇宗教信仰" />
                    </SelectTrigger>
                    <SelectContent>
                      {religionOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.religion && <p className="text-red-500 text-sm">{errors.religion}</p>}
                </div>

                {/* 居住狀況 */}
                <div className="space-y-2">
                  <Label>居住狀況 <span className="text-red-500">*</span></Label>
                  <Select value={formData.livingStatus} onValueChange={(value) => handleInputChange('livingStatus', value)}>
                    <SelectTrigger className={errors.livingStatus ? 'border-red-500' : 'focus:border-orange-500'}>
                      <SelectValue placeholder="請選擇居住狀況" />
                    </SelectTrigger>
                    <SelectContent>
                      {livingOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.livingStatus && <p className="text-red-500 text-sm">{errors.livingStatus}</p>}
                </div>

                {/* 檢測日期 */}
                <div className="space-y-2">
                  <Label>檢測日期</Label>
                  <Popover open={showTestCalendar} onOpenChange={setShowTestCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal hover:border-orange-500"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(formData.testDate, 'yyyy年MM月dd日', { locale: zhTW })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.testDate}
                        onSelect={(date) => {
                          handleInputChange('testDate', date || new Date());
                          setShowTestCalendar(false);
                        }}
                        disabled={(date) => date > new Date() || date < new Date('2020-01-01')}
                        initialFocus
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* 提交按鈕 */}
                <div className="pt-6">
                  <Button 
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    完成資料填寫
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
