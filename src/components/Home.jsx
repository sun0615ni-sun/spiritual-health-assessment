import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Heart, Sparkles, Users, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = ({ onStartAssessment }) => {
  const [agreed, setAgreed] = useState(false);

  const features = [
    {
      icon: Heart,
      title: "與自己的關係",
      description: "探索內在的自我覺察、生命意義與內在平靜"
    },
    {
      icon: Users,
      title: "與他人的關係",
      description: "培養感恩寬恕的心，以及愛與同理的能力"
    },
    {
      icon: Leaf,
      title: "與自然的關係",
      description: "感受大自然的美好，培養謙卑與敬畏之心"
    },
    {
      icon: Sparkles,
      title: "與超越者的關係",
      description: "建立盼望與信心，連結更高的靈性力量"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            發現你的靈性力量
            <br />
            <span className="text-indigo-600">開啟更平安喜樂的人生</span>
          </h1>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">關於靈性健康</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base text-gray-700 leading-normal mb-3">
                  您是否曾想過：行程滿檔，為什麼心裡仍有空虛與不安？在人生的十字路口，總是不太確定方向？或是在關係裡，常被情緒牽動、與人誤解？——也許，是時候照顧自己的靈性健康了。
                </p>
                <p className="text-base text-gray-700 leading-normal">
                  靈性健康是指能與自己、他人、自然、超越者建立和諧關係，於日常中活出意義與平安。本系統根據<strong>四領域七面向十核心指標靈修七原則</strong>建構，協助你看見現況、辨識優勢與待加強處，並給出具體可行的成長建議。
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <feature.icon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Agreement and Start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="agreement" 
                      checked={agreed}
                      onCheckedChange={setAgreed}
                      className="mt-1"
                    />
                    <label htmlFor="agreement" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                      我已閱讀並同意資料使用與保密說明：本問卷僅供研究與教學，所有個資將以匿名方式保存，
                      僅限統計分析，不對外揭露。
                    </label>
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      onClick={onStartAssessment}
                      disabled={!agreed}
                      size="lg"
                      className="px-8 py-3 text-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      開始檢測
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mt-8 text-gray-600"
          >
            <p className="mb-2">
              <strong>編制者：</strong>孫效智教授
            </p>
            <p>
              <strong>編制單位：</strong>臺大生命教育研發育成中心暨為愛前行基金會
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
