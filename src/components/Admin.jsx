import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { 
  Download, Search, Filter, Users, BarChart3, 
  Calendar, Eye, Trash2, Settings
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

const Admin = () => {
  const [responses, setResponses] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [filterReligion, setFilterReligion] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // 模擬資料 - 實際應用中會從後端API獲取
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: '張小明',
        gender: 'male',
        age: 28,
        religion: '基督教',
        testDate: new Date('2024-01-15'),
        overallScore: 4.2,
        isReligious: true,
        answers: { q1_r: 4, q2_r: 5, q3_r: 3, q4_r: 4, q5_r: 5, q6_r: 4, q7_r: 5 }
      },
      {
        id: 2,
        name: '李美華',
        gender: 'female',
        age: 35,
        religion: '無宗教信仰',
        testDate: new Date('2024-01-14'),
        overallScore: 3.8,
        isReligious: false,
        answers: { q1: 4, q2: 3, q3: 4, q4: 4, q5: 4, q6: 3, q7: 4 }
      },
      {
        id: 3,
        name: '王大偉',
        gender: 'male',
        age: 42,
        religion: '佛教',
        testDate: new Date('2024-01-13'),
        overallScore: 4.5,
        isReligious: true,
        answers: { q1_r: 5, q2_r: 4, q3_r: 5, q4_r: 4, q5_r: 5, q6_r: 4, q7_r: 4 }
      },
      {
        id: 4,
        name: '陳雅婷',
        gender: 'female',
        age: 26,
        religion: '天主教',
        testDate: new Date('2024-01-12'),
        overallScore: 3.9,
        isReligious: true,
        answers: { q1_r: 4, q2_r: 4, q3_r: 3, q4_r: 4, q5_r: 4, q6_r: 4, q7_r: 4 }
      },
      {
        id: 5,
        name: '林志強',
        gender: 'male',
        age: 31,
        religion: '無宗教信仰',
        testDate: new Date('2024-01-11'),
        overallScore: 3.6,
        isReligious: false,
        answers: { q1: 3, q2: 4, q3: 3, q4: 4, q5: 3, q6: 4, q7: 4 }
      }
    ];
    setResponses(mockData);
    setFilteredResponses(mockData);
  }, []);

  // 搜尋和篩選
  useEffect(() => {
    let filtered = responses.filter(response => {
      const matchesSearch = response.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = filterGender === 'all' || response.gender === filterGender;
      const matchesReligion = filterReligion === 'all' || response.religion === filterReligion;
      
      return matchesSearch && matchesGender && matchesReligion;
    });

    // 排序
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'score':
          aValue = a.overallScore;
          bValue = b.overallScore;
          break;
        case 'age':
          aValue = a.age;
          bValue = b.age;
          break;
        case 'date':
        default:
          aValue = a.testDate;
          bValue = b.testDate;
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredResponses(filtered);
  }, [responses, searchTerm, filterGender, filterReligion, sortBy, sortOrder]);

  const handleExportCSV = () => {
    const headers = [
      'ID', '姓名', '性別', '年齡', '宗教信仰', '檢測日期', '整體分數', '是否宗教信仰者',
      'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'
    ];

    const csvData = filteredResponses.map(response => [
      response.id,
      response.name,
      response.gender === 'male' ? '男性' : '女性',
      response.age,
      response.religion,
      format(response.testDate, 'yyyy-MM-dd'),
      response.overallScore,
      response.isReligious ? '是' : '否',
      ...Object.values(response.answers)
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `靈性健康檢測資料_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteResponse = (id) => {
    if (confirm('確定要刪除這筆資料嗎？')) {
      setResponses(prev => prev.filter(response => response.id !== id));
    }
  };

  const getScoreColor = (score) => {
    if (score >= 4.5) return 'text-green-600 bg-green-100';
    if (score >= 3.5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const stats = {
    total: responses.length,
    avgScore: responses.length > 0 ? (responses.reduce((sum, r) => sum + r.overallScore, 0) / responses.length).toFixed(2) : 0,
    religious: responses.filter(r => r.isReligious).length,
    nonReligious: responses.filter(r => !r.isReligious).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Settings className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">後台管理</h1>
            </div>
            <p className="text-gray-600">管理問卷回應資料</p>
          </motion.div>

          {/* 統計卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-4 gap-6 mb-8"
          >
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">總回應數</p>
                    <p className="text-2xl font-bold text-indigo-600">{stats.total}</p>
                  </div>
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">平均分數</p>
                    <p className="text-2xl font-bold text-green-600">{stats.avgScore}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">宗教信仰者</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.religious}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">非宗教信仰者</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.nonReligious}</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 控制面板 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>篩選與搜尋</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-6 gap-4">
                  {/* 搜尋 */}
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="搜尋姓名..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* 性別篩選 */}
                  <Select value={filterGender} onValueChange={setFilterGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="性別" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有性別</SelectItem>
                      <SelectItem value="male">男性</SelectItem>
                      <SelectItem value="female">女性</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* 宗教篩選 */}
                  <Select value={filterReligion} onValueChange={setFilterReligion}>
                    <SelectTrigger>
                      <SelectValue placeholder="宗教信仰" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有宗教</SelectItem>
                      <SelectItem value="無宗教信仰">無宗教信仰</SelectItem>
                      <SelectItem value="基督教">基督教</SelectItem>
                      <SelectItem value="天主教">天主教</SelectItem>
                      <SelectItem value="佛教">佛教</SelectItem>
                      <SelectItem value="道教">道教</SelectItem>
                      <SelectItem value="伊斯蘭教">伊斯蘭教</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* 排序方式 */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="排序方式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">檢測日期</SelectItem>
                      <SelectItem value="name">姓名</SelectItem>
                      <SelectItem value="score">分數</SelectItem>
                      <SelectItem value="age">年齡</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* 匯出按鈕 */}
                  <Button
                    onClick={handleExportCSV}
                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Download className="h-4 w-4" />
                    <span>匯出 CSV</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 資料表格 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>問卷回應資料 ({filteredResponses.length} 筆)</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortOrder === 'asc' ? '升序' : '降序'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>姓名</TableHead>
                        <TableHead>性別</TableHead>
                        <TableHead>年齡</TableHead>
                        <TableHead>宗教信仰</TableHead>
                        <TableHead>檢測日期</TableHead>
                        <TableHead>整體分數</TableHead>
                        <TableHead>類型</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredResponses.map((response) => (
                        <TableRow key={response.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{response.id}</TableCell>
                          <TableCell>{response.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {response.gender === 'male' ? '男性' : '女性'}
                            </Badge>
                          </TableCell>
                          <TableCell>{response.age}</TableCell>
                          <TableCell>{response.religion}</TableCell>
                          <TableCell>
                            {format(response.testDate, 'yyyy-MM-dd', { locale: zhTW })}
                          </TableCell>
                          <TableCell>
                            <Badge className={getScoreColor(response.overallScore)}>
                              {response.overallScore.toFixed(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={response.isReligious ? "default" : "secondary"}>
                              {response.isReligious ? '宗教' : '非宗教'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-1"
                              >
                                <Eye className="h-3 w-3" />
                                <span>查看</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteResponse(response.id)}
                                className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                                <span>刪除</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredResponses.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    沒有找到符合條件的資料
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
