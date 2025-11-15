import { AlertTriangle, Calendar, MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CasesPage = () => {
  const cases = [
    {
      id: 1,
      title: "Жалған банк SMS-тері",
      category: "Фишинг",
      date: "2024-03-15",
      location: "Алматы",
      severity: "high",
      description: "Алаяқтар банк атынан SMS жіберіп, азаматтардың карта деректерін ұрлады. 150+ адам зардап шекті.",
      amount: "~5,000,000 ₸",
      prevention: "Ешқашан SMS-те келген сілтемелерге кірмеңіз. Банктің ресми нөміріне хабарласыңыз."
    },
    {
      id: 2,
      title: "Әлеуметтік желідегі \"достар\"",
      category: "Әлеуметтік инженерия",
      date: "2024-03-10",
      location: "Астана",
      severity: "high",
      description: "Хакерлер әлеуметтік желі аккаунттарын бұзып, достар атынан ақша сұрады.",
      amount: "~2,500,000 ₸",
      prevention: "Ақша сұрауға келгенде, әрқашан телефон арқылы тексеріңіз."
    },
    {
      id: 3,
      title: "Жалған онлайн дүкен",
      category: "Интернет алаяқтық",
      date: "2024-03-05",
      location: "Шымкент",
      severity: "medium",
      description: "Алаяқтар жалған интернет-дүкен ашып, төлем алғаннан кейін тауарды жібермеді.",
      amount: "~1,800,000 ₸",
      prevention: "Тек танымал және сенімді платформалардан сатып алыңыз. Пікірлерді оқыңыз."
    },
    {
      id: 4,
      title: "\"Налоговая\" алаяқтығы",
      category: "Телефон алаяқтық",
      date: "2024-02-28",
      location: "Қарағанды",
      severity: "high",
      description: "Салық қызметі атынан қоңырау шалып, жазалық айыппұл төлеуді талап етті.",
      amount: "~3,200,000 ₸",
      prevention: "Мемлекеттік органдар ешқашан телефон арқылы ақша талап етпейді."
    },
    {
      id: 5,
      title: "Криптовалюта алаяқтығы",
      category: "Инвестициялық алаяқтық",
      date: "2024-02-20",
      location: "Алматы",
      severity: "critical",
      description: "Жалған инвестициялық платформа арқылы криптовалюта алаяқтығы жасалды.",
      amount: "~15,000,000 ₸",
      prevention: "Лицензиясыз және белгісіз платформаларға сенбеңіз."
    },
    {
      id: 6,
      title: "Жұмыс орны алаяқтығы",
      category: "Жұмыс алаяқтығы",
      date: "2024-02-15",
      location: "Астана",
      severity: "medium",
      description: "Жалған жұмыс орнына қабылдау үшін алдын ала төлем сұрады.",
      amount: "~800,000 ₸",
      prevention: "Заңды компаниялар жұмысқа қабылдау үшін ақша сұрамайды."
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "warning";
      default: return "default";
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "critical": return "Өте қауіпті";
      case "high": return "Қауіпті";
      case "medium": return "Орташа";
      default: return "Төмен";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-6 md:py-12">
        <div className="container max-w-6xl px-4">
          <div className="text-center mb-6 md:mb-8 space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Нақты жағдайлар</h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Алаяқтық мысалдарымен танысып, қорғана білуді үйреніңіз
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 md:mb-8">
              <TabsTrigger value="all">Барлығы</TabsTrigger>
              <TabsTrigger value="phishing">Фишинг</TabsTrigger>
              <TabsTrigger value="social">Әлеуметтік</TabsTrigger>
              <TabsTrigger value="financial">Қаржылық</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 md:space-y-6">
              {cases.map((case_) => (
                <Card key={case_.id} className="border-2 hover:shadow-lg transition-all">
                  <CardHeader className="p-4 md:p-6">
                    <div className="flex items-start justify-between gap-3 md:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant={getSeverityColor(case_.severity) as any} className="text-xs">
                            {getSeverityLabel(case_.severity)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">{case_.category}</Badge>
                        </div>
                        <CardTitle className="text-lg md:text-xl mb-2">{case_.title}</CardTitle>
                        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 shrink-0" />
                            <span className="truncate">{case_.date}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="truncate">{case_.location}</span>
                          </span>
                          <span className="flex items-center gap-1 text-destructive font-medium">
                            <TrendingUp className="h-3 w-3 shrink-0" />
                            <span className="truncate">{case_.amount}</span>
                          </span>
                        </CardDescription>
                      </div>
                      <AlertTriangle className="h-6 w-6 md:h-8 md:w-8 text-destructive shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm md:text-base">Не болды?</h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{case_.description}</p>
                    </div>
                    
                    <div className="p-3 md:p-4 bg-success/10 border border-success/20 rounded-lg">
                      <h4 className="font-semibold mb-2 text-success flex items-center gap-2 text-sm md:text-base">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        Қалай қорғану керек?
                      </h4>
                      <p className="text-xs md:text-sm leading-relaxed">{case_.prevention}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="phishing">
              <p className="text-center text-muted-foreground">Фишинг жағдайлары жақында қосылады...</p>
            </TabsContent>

            <TabsContent value="social">
              <p className="text-center text-muted-foreground">Әлеуметтік алаяқтық жағдайлары жақында қосылады...</p>
            </TabsContent>

            <TabsContent value="financial">
              <p className="text-center text-muted-foreground">Қаржылық алаяқтық жағдайлары жақында қосылады...</p>
            </TabsContent>
          </Tabs>

          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Алаяқтықты анықтадыңыз ба?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Егер сіз осындай жағдайға ұшырасаңыз немесе білсеңіз, дереу хабарлаңыз. 
                    Сіздің хабарламаңыз басқа адамдарды қорғауға көмектеседі.
                  </p>
                  <div className="flex gap-2">
                    <a href="/report" className="text-sm font-medium text-primary hover:underline">
                      Хабарлау жіберу →
                    </a>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-sm">Телефон: 102</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CasesPage;
