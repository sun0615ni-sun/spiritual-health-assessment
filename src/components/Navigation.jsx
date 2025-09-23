import { Button } from '@/components/ui/button.jsx';
import { Home, FileText, User, BarChart3, Settings } from 'lucide-react';

const Navigation = ({ currentStep, onNavigate }) => {
  const navItems = [
    { id: 'home', label: '首頁', icon: Home },
    { id: 'questionnaire', label: '問卷', icon: FileText },
    { id: 'profile', label: '基本資料', icon: User },
    { id: 'report', label: '檢測報告', icon: BarChart3 },
    { id: 'admin', label: '後台管理', icon: Settings }
  ];

  return (
    <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 mb-4">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentStep === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-2 ${
                  isActive 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
