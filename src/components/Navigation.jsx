import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Home, FileText, User, BarChart3, Settings } from 'lucide-react'

const Navigation = ({ currentPage, onNavigate, totalResponses = 0 }) => {
  const navItems = [
    { id: 'home', label: '首頁', icon: Home },
    { id: 'questionnaire', label: '問卷', icon: FileText },
    { id: 'profile', label: '基本資料', icon: User },
    { id: 'report', label: '檢測報告', icon: BarChart3 },
    { id: 'admin', label: '後台管理', icon: Settings }
  ]

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo 區域 */}
          <div className="flex items-center gap-4">
            {/* 為愛前行基金會 LOGO */}
            <div className="flex items-center gap-2">
              <img 
                src="/afl-logo.png" 
                alt="財團法人新北市為愛前行基金會" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  console.log('AFL logo failed to load');
                  e.target.style.display = 'none';
                }}
              />
            </div>
            
            {/* 台大生命教育中心 LOGO */}
            <div className="flex items-center gap-2">
              <img 
                src="/ntu-logo.png" 
                alt="國立台灣大學生命教育研發育成中心" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  console.log('NTU logo failed to load');
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
          
          {/* 系統標題和機構名稱 */}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
              靈性健康檢測系統
            </h1>
            <div className="text-xs text-gray-500 mt-1">
              <div>財團法人新北市為愛前行基金會</div>
              <div>國立台灣大學生命教育研發育成中心</div>
            </div>
          </div>

          {/* 導航按鈕 */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const IconComponent = item.icon
              const isActive = currentPage === item.id
              
              return (
                <Button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{item.label}</span>
                  
                  {/* 後台管理的回應數量徽章 */}
                  {item.id === 'admin' && totalResponses > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-teal-100 text-teal-700 text-xs"
                    >
                      {totalResponses}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation
