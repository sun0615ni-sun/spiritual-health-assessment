import { Badge } from './ui/badge'
import { Heart, Users, Leaf, Star, Building2, GraduationCap, CheckCircle, ArrowRight } from 'lucide-react'

const Home = ({ onStartQuestionnaire }) => {
const Home = ({ onStartAssessment }) => {
  const [agreed, setAgreed] = useState(false)

  const domains = [
@@ -40,93 +40,87 @@ const Home = ({ onStartQuestionnaire }) => {
  ]

  const handleStartQuestionnaire = () => {
    if (agreed && onStartQuestionnaire) {
      onStartQuestionnaire()
    if (agreed && onStartAssessment) {
      onStartAssessment()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50">
      {/* 主要內容區域 - 完全響應式容器 */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12 max-w-6xl">

        {/* 機構標誌區域 - 響應式布局 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-orange-100 w-full sm:w-auto justify-center sm:justify-start">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
              <Heart className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
        {/* 機構標誌區域 - 響應式設計 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8 sm:mb-12">
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg border border-orange-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-center sm:text-left min-w-0">
              <div className="text-xs sm:text-sm font-medium text-gray-800 leading-tight">財團法人新北市</div>
              <div className="text-xs sm:text-sm font-bold text-orange-600 leading-tight">為愛前行社會福利基金會</div>
            <div className="text-center sm:text-left">
              <div className="text-xs sm:text-sm font-medium text-orange-600">財團法人新北市</div>
              <div className="text-sm sm:text-base font-bold text-orange-700">為愛前行社會福利基金會</div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm border border-teal-100 w-full sm:w-auto justify-center sm:justify-start">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg border border-teal-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-center sm:text-left min-w-0">
              <div className="text-xs sm:text-sm font-medium text-gray-800 leading-tight">國立台灣大學</div>
              <div className="text-xs sm:text-sm font-bold text-teal-600 leading-tight">生命教育研發育成中心</div>
            <div className="text-center sm:text-left">
              <div className="text-xs sm:text-sm font-medium text-teal-600">國立台灣大學</div>
              <div className="text-sm sm:text-base font-bold text-teal-700">生命教育研發育成中心</div>
            </div>
          </div>
        </div>

        {/* 編制者資訊 */}
        <div className="text-center mb-6 sm:mb-8">
          <Badge variant="secondary" className="bg-orange-100 text-orange-700 px-2 sm:px-3 py-1 text-xs sm:text-sm">
            <Building2 className="w-3 h-3 mr-1" />
            編制者：孫效智教授
          </Badge>
        </div>

        {/* 主標題區域 - 響應式字體 */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight px-2">
            <span className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text text-transparent">
              發現你的靈性力量
            </span>
        {/* 標題區域 - 響應式字體 */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            權威者：權威研發
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-orange-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
            發現你的靈性力量
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 mb-4 sm:mb-6 leading-relaxed px-2">
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 mb-6 sm:mb-8">
            開啟更平安喜樂的人生
          </h2>

          <div className="max-w-4xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed space-y-3 sm:space-y-4 px-2">
            <p>
              您是否曾想過：行走滾燙，為什麼心裡仍有空虛與不安？在人生的十字路口，總是不太確定方向？或是在關係裡，常感情緒激動，與人疏離？——也許，是時候照顧自己的靈性健康了。
            </p>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            您是否曾想過：行走浪漫，為什麼心裡仍有空虛與不安？在人生的十字路口，總是不太確定方向？或是在關係裡，常感情緒激動，與人疏離？——也許，是時候照顧自己的靈性健康了。
          </p>
        </div>

        {/* 什麼是靈性健康 */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">什麼是靈性健康？</h3>
          <div className="max-w-4xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-2">
            <p>
              能與自己、他人、自然、超越者建立和諧關係，於日常中活出意義與平安。本系統根據四領域七面向十核心指標量修七原則建構，協助你看見現況，解讀優勢與待加強處，並給出具體可行的成長建議。
            </p>
          </div>
        {/* 什麼是靈性健康 - 響應式區塊 */}
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
            什麼是靈性健康？
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            能與自己、他人、自然、超越者建立和諧關係，於日常中活出意義與平安。本系統根據四領域七面向十核心指標量化七原則建構，協助你看見現況，解讀優勢與待加強處，並給出具體可行的成長建議。
          </p>
        </div>

        {/* 四領域卡片 - 完全響應式網格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {domains.map((domain, index) => {
            const IconComponent = domain.icon
            return (
              <Card key={index} className={`${domain.color} hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 h-full`}>
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/80 flex items-center justify-center ${domain.iconColor} flex-shrink-0`}>
                      <IconComponent className="w-4 h-4 sm:w-6 sm:h-6" />
              <Card key={index} className={`${domain.color} border-2 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}>
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 flex items-center justify-center shadow-md`}>
                      <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${domain.iconColor}`} />
                    </div>
                    <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-800 leading-tight">
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                      {domain.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs sm:text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                  <CardDescription className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium">
                    {domain.description}
                  </CardDescription>
                </CardContent>
@@ -135,49 +129,72 @@ const Home = ({ onStartQuestionnaire }) => {
          })}
        </div>

        {/* 隱私聲明和同意區域 - 響應式卡片 */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <Card className="border-2 border-orange-200 bg-orange-50/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
                <span>資料使用與隱私保護聲明</span>
              </CardTitle>
        {/* 隱私聲明區域 - 響應式設計 */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-lg">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-700">
                  資料使用與隱私保護聲明
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2 sm:space-y-3">
                <p><strong>資料收集目的：</strong>本檢測系統僅用於學術研究與個人靈性健康評估，所收集的資料將用於產生個人化報告和改善系統功能。</p>
                
                <p><strong>資料使用範圍：</strong>您的個人資料和檢測結果將被嚴格保密，僅用於：</p>
                <ul className="list-disc list-inside ml-2 sm:ml-4 space-y-1 text-xs sm:text-sm">
            <CardContent className="space-y-4 sm:space-y-6 text-sm sm:text-base">
              <div>
                <p className="text-gray-700 leading-relaxed">
                  <strong>資料收集目的：</strong>本檢測系統僅用於學術研究與個人靈性健康評估，所收集的資料用於產生個人化報告和改善系統功能。
                </p>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2 sm:mb-3"><strong>資料使用範圍：</strong>您的個人資料將被測試結果將被保密，僅用於：</p>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-gray-700 ml-4 sm:ml-6">
                  <li>生成您的個人靈性健康報告</li>
                  <li>學術研究統計分析（去識別化處理）</li>
                  <li>系統功能改善和優化</li>
                </ul>
                
                <p><strong>資料保護措施：</strong>我們採用業界標準的安全措施保護您的資料，包括加密傳輸、安全儲存和存取控制。</p>
                
                <p><strong>資料保存期限：</strong>個人識別資料將在檢測完成後6個月內刪除，統計資料將去識別化後用於學術研究。</p>
                
                <p><strong>您的權利：</strong>您有權要求查看、修正或刪除您的個人資料。如有任何疑問，請聯繫研究團隊。</p>
                
                <p className="text-orange-700 font-medium text-xs sm:text-sm">
                  <strong>聯絡資訊：</strong>國立台灣大學生命教育研發育成中心 | 財團法人新北市為愛前行社會福利基金會
              </div>
              
              <div>
                <p className="text-gray-700 leading-relaxed">
                  <strong>資料保護措施：</strong>我們採用業界標準的安全措施保護您的資料，包括加密儲存、安全傳輸和存取控制。
                </p>
              </div>
              
              <div>
                <p className="text-gray-700 leading-relaxed">
                  <strong>資料保存期限：</strong>個人測試資料將在測定完成後6個月內刪除，統計資料將去識別化後用於學術研究。
                </p>
              </div>
              
              <div>
                <p className="text-gray-700 leading-relaxed">
                  <strong>您的權利：</strong>您有權要求查看、修正或刪除您的個人資料。如有任何疑問，請聯繫我們究團隊。
                </p>
              </div>
              
              <div className="pt-2 sm:pt-4 border-t border-orange-200">
                <p className="text-orange-700 font-semibold text-sm sm:text-base">
                  <strong>聯絡資訊：</strong>國立台灣大學生命教育研發育成中心｜財團法人新北市為愛前行社會福利基金會
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 sm:p-4 bg-white rounded-lg border border-orange-200">
                <Checkbox 
                  id="privacy-agreement" 
                  checked={agreed} 
              {/* 同意複選框 - 響應式設計 */}
              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white/60 rounded-xl border border-orange-200">
                <Checkbox
                  id="privacy-agreement"
                  checked={agreed}
                  onCheckedChange={setAgreed}
                  className="mt-0.5 sm:mt-1 flex-shrink-0"
                  className="mt-1 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <label 
                  htmlFor="privacy-agreement" 
                  className="text-xs sm:text-sm text-gray-700 leading-relaxed cursor-pointer"
                  className="text-sm sm:text-base text-gray-700 leading-relaxed cursor-pointer flex-1"
                >
                  我已詳細閱讀並完全理解上述資料使用與隱私保護聲明，同意提供個人資料進行靈性健康檢測，並了解相關權利與義務。我確認此同意為自願性質，可隨時撤回。
                  我已詳細閱讀並完全理解上述資料使用與隱私保護聲明，同意提供個人資料進行靈性健康檢測，並了解相關權利與義務。我同意此問卷為自願填寫，可隨時停止。
                </label>
              </div>
            </CardContent>
@@ -189,11 +206,13 @@ const Home = ({ onStartQuestionnaire }) => {
          <Button
            onClick={handleStartQuestionnaire}
            disabled={!agreed}
            size="lg"
            className={`
              px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-xl transition-all duration-300 transform w-full sm:w-auto min-w-[200px]
              px-8 sm:px-12 lg:px-16 py-4 sm:py-6 lg:py-8 
              text-base sm:text-lg lg:text-xl font-bold 
              rounded-2xl shadow-2xl transition-all duration-300 
              transform hover:scale-105 active:scale-95
              ${agreed 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105' 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-orange-200' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
