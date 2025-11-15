import { BarChart3, TrendingUp, TrendingDown, Users, AlertTriangle, Shield, Phone, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const StatsPage = () => {
  const monthlyData = [
    { month: "Қаң", reports: 450, blocked: 380 },
    { month: "Ақп", reports: 520, blocked: 440 },
    { month: "Нау", reports: 680, blocked: 590 },
    { month: "Сәу", reports: 590, blocked: 510 },
    { month: "Мам", reports: 720, blocked: 640 },
    { month: "Мау", reports: 810, blocked: 720 },
  ];

  const categoryData = [
    { name: "Телефон", value: 35, color: "hsl(217, 91%, 45%)" },
    { name: "SMS", value: 25, color: "hsl(217, 91%, 60%)" },
    { name: "Әлеуметтік желі", value: 20, color: "hsl(142, 71%, 45%)" },
    { name: "Email", value: 12, color: "hsl(38, 92%, 50%)" },
    { name: "Басқа", value: 8, color: "hsl(0, 84%, 60%)" },
  ];

  const trendData = [
    { month: "Қаң", value: 100 },
    { month: "Ақп", value: 115 },
    { month: "Нау", value: 151 },
    { month: "Сәу", value: 131 },
    { month: "Мам", value: 160 },
    { month: "Мау", value: 180 },
  ];

  const stats = [
    {
      title: "Жалпы хабарламалар",
      value: "12,450",
      change: "+15%",
      trend: "up",
      icon: AlertTriangle,
      color: "text-primary"
    },
    {
      title: "Блокталған нөмірлер",
      value: "8,920",
      change: "+22%",
      trend: "up",
      icon: Phone,
      color: "text-destructive"
    },
    {
      title: "Қорғалған азаматтар",
      value: "95,340",
      change: "+18%",
      trend: "up",
      icon: Shield,
      color: "text-success"
    },
    {
      title: "Тексерілген сілтемелер",
      value: "45,230",
      change: "-5%",
      trend: "down",
      icon: LinkIcon,
      color: "text-accent"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-6 md:py-12">
        <div className="container max-w-7xl px-4">
          <div className="text-center mb-6 md:mb-8 space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Статистика</h1>
            <p className="text-sm md:text-lg text-muted-foreground">
              Алаяқтыққа қарсы күрес туралы деректер мен аналитика
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 md:p-6">
                  <CardTitle className="text-xs sm:text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color} shrink-0`} />
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs flex items-center gap-1 ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {stat.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span className="truncate">{stat.change} өткен айға қарағанда</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 md:mb-6 h-auto">
              <TabsTrigger value="monthly" className="text-xs sm:text-sm px-2 py-2">
                <span className="hidden sm:inline">Айлық статистика</span>
                <span className="sm:hidden">Айлық</span>
              </TabsTrigger>
              <TabsTrigger value="categories" className="text-xs sm:text-sm px-2 py-2">
                <span className="hidden sm:inline">Категориялар</span>
                <span className="sm:hidden">Категор.</span>
              </TabsTrigger>
              <TabsTrigger value="trends" className="text-xs sm:text-sm px-2 py-2">
                <span className="hidden sm:inline">Тенденциялар</span>
                <span className="sm:hidden">Тенден.</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="monthly">
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Хабарламалар мен блокталған нөмірлер</CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Соңғы 6 айдағы статистика
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <ResponsiveContainer width="100%" height={300} className="md:h-[400px]">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Bar dataKey="reports" name="Хабарламалар" fill="hsl(217, 91%, 45%)" />
                      <Bar dataKey="blocked" name="Блокталды" fill="hsl(142, 71%, 45%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <Card>
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl">Алаяқтық түрлері</CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                      Категориялар бойынша бөлу
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl">Категориялар туралы</CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                      Әр түрдің сипаттамасы
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <div className="space-y-3 md:space-y-4">
                      {categoryData.map((cat, index) => (
                        <div key={index} className="flex items-center gap-2 md:gap-3">
                          <div 
                            className="w-3 h-3 md:w-4 md:h-4 rounded-full shrink-0" 
                            style={{ backgroundColor: cat.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm md:text-base truncate">{cat.name}</p>
                            <p className="text-xs md:text-sm text-muted-foreground">{cat.value}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends">
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Өсу тенденциясы</CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Хабарламалар санының өзгеруі (базалық 100%)
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <ResponsiveContainer width="100%" height={300} className="md:h-[400px]">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Индекс" 
                        stroke="hsl(217, 91%, 45%)" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Regional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base md:text-lg">Қалалар бойынша</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm">Алматы</span>
                    <span className="font-semibold text-sm md:text-base">3,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm">Астана</span>
                    <span className="font-semibold text-sm md:text-base">2,890</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm">Шымкент</span>
                    <span className="font-semibold text-sm md:text-base">1,760</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm">Қарағанды</span>
                    <span className="font-semibold text-sm md:text-base">1,420</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base md:text-lg">Жас топтары</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm">18-25</span>
                    <span className="font-semibold text-sm md:text-base">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm">26-35</span>
                    <span className="font-semibold text-sm md:text-base">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm">36-50</span>
                    <span className="font-semibold text-sm md:text-base">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm">50+</span>
                    <span className="font-semibold text-sm md:text-base">22%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base md:text-lg">Орташа зиян</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm">Телефон</span>
                    <span className="font-semibold text-destructive text-sm md:text-base">~85,000 ₸</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm">SMS</span>
                    <span className="font-semibold text-destructive text-sm md:text-base">~45,000 ₸</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm">Әлеуметтік</span>
                    <span className="font-semibold text-destructive text-sm md:text-base">~120,000 ₸</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm">Инвестиция</span>
                    <span className="font-semibold text-destructive text-sm md:text-base">~500,000 ₸</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StatsPage;
