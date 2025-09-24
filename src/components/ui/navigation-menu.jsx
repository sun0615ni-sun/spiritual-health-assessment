import React, { useState } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Home, FileText, User, BarChart3, Settings, Menu, X } from 'lucide-react'

const Navigation = ({ currentPage, onNavigate, totalResponses = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: '首頁', icon: Home },
    { id: 'questionnaire', label: '問卷', icon: FileText },
    { id: 'profile', label: '基本資料', icon: User },
    { id: 'report', label: '檢測報告', icon: BarChart3 },
    { id: 'admin', label: '後台管理', icon: Settings }
  ]

  const handleNavigation = (pageId) => {
    if (onNavigate) {
      onNavigate(pageId)
    }
    setIsMobileMenuOpen(false) // 關閉手機選單
  }

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3 min-h-[60px] sm:min-h-[70px]">
          
          {/* Logo 區域 - 響應式調整 */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <img 
                src="/spiritual-health-assessment/afl-logo.png" 
                alt="財團法人新北市為愛前行基金會" 
                className="h-6 sm:h-8 md:h-10 w-auto object-contain"
                onError={(e) => {
                  console.log('AFL logo failed to load');
                  e.target.style.display = 'none';
                }}
              />
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <img 
                src="/spiritual-health-assessment/ntu-logo.png" 
                alt="國立台灣大學生命教育研發育成中心" 
                className="h-6 sm:h-8 md:h-10 w-auto object-contain"
                onError={(e) => {
                  console.log('NTU logo failed to load');
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* 系統標題和機構名稱 - 響應式調整 */}
          <div className="flex-1 text-center px-2 sm:px-4 min-w-0">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent leading-tight truncate">
              靈性健康檢測系統
            </h1>
            <div className="text-xs text-gray-500 mt-0.5 sm:mt-1 hidden sm:block">
              <div className="truncate">財團法人新北市為愛前行基金會</div>
              <div className="truncate">國立台灣大學生命教育研發育成中心</div>
            </div>
          </div>

          {/* 桌面版導航按鈕 */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-shrink-0">
            {navItems.map((item) => {
              const IconComponent = item.icon
              const isActive = currentPage === item.id
              
              return (
                <Button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`
                    px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-all duration-200 relative
                    ${isActive
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                    }
                  `}
                >
                  <IconComponent className="w-3 h-3 xl:w-4 xl:h-4 mr-1 xl:mr-2 flex-shrink-0" />
                  <span className="hidden xl:inline truncate">{item.label}</span>
                  
                  {/* 後台管理的回應數量徽章 */}
                  {item.id === 'admin' && totalResponses > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1 xl:ml-2 bg-teal-100 text-teal-700 text-xs px-1 py-0 min-w-[16px] h-4"
                    >
                      {totalResponses}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </div>

          {/* 平板版導航按鈕（簡化版） */}
          <div className="hidden md:flex lg:hidden items-center gap-1 flex-shrink-0">
            {navItems.map((item) => {
              const IconComponent = item.icon
              const isActive = currentPage === item.id
              
              return (
                <Button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`
                    px-2 py-2 transition-all duration-200 relative
                    ${isActive
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                    }
                  `}
                  title={item.label}
                >
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                  
                  {/* 後台管理的回應數量徽章 */}
                  {item.id === 'admin' && totalResponses > 0 && (
                    <Badge
                      variant="secondary"
                      className="absolute -top-1 -right-1 bg-teal-100 text-teal-700 text-xs px-1 py-0 min-w-[16px] h-4"
                    >
                      {totalResponses}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </div>

          {/* 手機版選單按鈕 */}
          <div className="md:hidden flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-orange-600 hover:bg-orange-50 p-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* 手機版下拉選單 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-orange-100 py-2 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const IconComponent = item.icon
                const isActive = currentPage === item.id
                
                return (
                  <Button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`
                      justify-start w-full px-3 py-2 text-sm font-medium transition-all duration-200
                      ${isActive
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                      }
                    `}
                  >
                    <IconComponent className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    
                    {/* 後台管理的回應數量徽章 */}
                    {item.id === 'admin' && totalResponses > 0 && (
                      <Badge
                        variant="secondary"
                        className="bg-teal-100 text-teal-700 text-xs px-2 py-0 min-w-[20px] h-5"
                      >
                        {totalResponses}
                      </Badge>
                    )}
                  </Button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navigation
