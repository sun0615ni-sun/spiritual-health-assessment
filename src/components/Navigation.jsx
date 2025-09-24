import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Home, FileText, User, BarChart3, Settings, Heart, GraduationCap } from 'lucide-react'

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
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-teal-600 bg-clip-text text-transparent">
                靈性健康檢測系統
              </h1>
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
                  className={`relative transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
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

          {/* 機構標識 */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-gray-500">
            <span>為愛前行基金會</span>
            <span>×</span>
            <span>台大生命教育中心</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation
