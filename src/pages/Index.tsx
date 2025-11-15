import { Link } from "react-router-dom";
import { Shield, Search, FileText, Brain, Database, BarChart3, ArrowRight, AlertTriangle, CheckCircle2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const features = [
    {
      icon: Search,
      title: "Тексеру",
      description: "Күдікті нөмірлерді және сілтемелерді AI арқылы тексеріңіз",
      link: "/check",
      color: "text-primary",
    },
    {
      icon: FileText,
      title: "Хабарлау",
      description: "Алаяқтық туралы арыз жазып, дерекқорға сақтаңыз",
      link: "/report",
      color: "text-accent",
    },
    {
      icon: Shield,
      title: "Қауіпсіздік кеңестері",
      description: "Интернетте қауіпсіз болу үшін пайдалы кеңестер мен нұсқаулар",
      link: "/safety-tips",
      color: "text-success",
    },
    {
      icon: Database,
      title: "Жағдайлар базасы",
      description: "Нақты алаяқтық мысалдарымен танысыңыз",
      link: "/cases",
      color: "text-warning",
    },
    {
      icon: BarChart3,
      title: "Статистика",
      description: "Алаяқтық туралы графиктер мен деректерді қараңыз",
      link: "/stats",
      color: "text-destructive",
    },
    {
      icon: Brain,
      title: "Білім тесті",
      description: "Қауіпсіздік туралы білімді тексеріңіз",
      link: "/test",
      color: "text-primary",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Тексерілген нөмірлер", icon: CheckCircle2 },
    { number: "12,000+", label: "Хабарламалар", icon: AlertTriangle },
    { number: "95%", label: "Сәттілік деңгейі", icon: Shield },
    { number: "100,000+", label: "Қорғалған азаматтар", icon: Users },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Shield className="h-4 w-4" />
                <span>Қазақстан Киберполициясы</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Интернеттегі{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Қауіпсіздігіңіз
                </span>
                {" "}біздің қамқорлығымызда
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground">
                AI технологиясымен алаяқтықты анықтап, азаматтарды қорғаймыз. 
                Күдікті нөмірлерді тексеріп, хабарлама жібере аласыз.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="group">
                  <Link to="/check">
                    Қазір тексеру
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/report">
                    Хабарлау жіберу
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <stat.icon className="h-8 w-8 mx-auto text-primary" />
                  <div className="text-3xl md:text-4xl font-bold">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Біздің мүмкіндіктеріміз
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Алаяқтықпен күресуге көмектесетін заманауи құралдар мен технологиялар
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Link key={index} to={feature.link}>
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                    <CardHeader>
                      <feature.icon className={`h-10 w-10 ${feature.color} mb-2`} />
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-primary font-medium">
                        Толығырақ
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
          <div className="container">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <AlertTriangle className="h-16 w-16 mx-auto text-warning" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Алаяқтықты анықтадыңыз ба?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Бірден хабарлама жіберіп, басқа азаматтарды қорғауға көмектесіңіз. 
                  Сіздің хабарламаңыз аса маңызды!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="default">
                    <Link to="/report">
                      Хабарлау жіберу
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/cases">
                      Мысалдарды қарау
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
