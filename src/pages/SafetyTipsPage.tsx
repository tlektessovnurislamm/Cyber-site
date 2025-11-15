import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Phone, Link as LinkIcon, CreditCard, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SafetyTipsPage = () => {
  const tips = [
    {
      icon: Phone,
      title: "Телефон нөмірлері",
      description: "Белгісіз нөмірлерден келген қоңыраулар мен SMS-терге сақ болыңыз",
      tips: [
        "Банк қызметкері деп таныстырған адамдарға пин-код немесе CVV бермеңіз",
        "Жақындарыңыздан ақша сұрап хабарласқан жағдайда, оларға тікелей қоңырау шалып тексеріңіз",
        "Белгісіз нөмірлерден келген сілтемелерді ашпаңыз",
        "Ешқашан телефон арқылы банк карта деректерін бермеңіз"
      ]
    },
    {
      icon: LinkIcon,
      title: "Интернет сілтемелері",
      description: "Күдікті сілтемелерді ашудан бұрын екі рет ойланыңыз",
      tips: [
        "Сілтемені ашпас бұрын оның мекенжайын мұқият тексеріңіз",
        "Жеке ақпаратыңызды енгізер алдында сайттың қауіпсіздігін (https://) тексеріңіз",
        "Ресми емес көздерден келген сілтемелерге сенбеңіз",
        "Антивирустық бағдарламаны үнемі жаңартып отырыңыз"
      ]
    },
    {
      icon: CreditCard,
      title: "Банк карталары",
      description: "Карта деректерін қорғау бойынша ережелер",
      tips: [
        "Карта нөмірі, CVV коды мен пин-кодты ешкімге айтпаңыз",
        "Күдікті сайттарда карта деректерін енгізбеңіз",
        "SMS-хабарламаларды үнемі тексеріп отырыңыз",
        "Карта жоғалған жағдайда бірден банкке хабарласыңыз"
      ]
    },
    {
      icon: Mail,
      title: "Email қауіпсіздігі",
      description: "Электрондық пошта арқылы келетін алаяқтықтардан сақ болыңыз",
      tips: [
        "Белгісіз жіберушілерден келген хаттардағы файлдарды ашпаңыз",
        "Күшті құпия сөздер қолданыңыз және оларды жиі өзгертіп отырыңыз",
        "Екі факторлы аутентификацияны қосыңыз",
        "Фишинг хаттарды анықтауды үйреніңіз"
      ]
    },
    {
      icon: Lock,
      title: "Парольдер мен қолжетім",
      description: "Есептік жазбаларыңызды қорғау",
      tips: [
        "Әр сайтқа әртүрлі құпия сөз қолданыңыз",
        "Пароль менеджерін пайдаланыңыз",
        "Парольдарды басқалармен бөліспеңіз",
        "Мерзімді түрде парольдарды өзгертіп отырыңыз"
      ]
    },
    {
      icon: Eye,
      title: "Жеке деректер",
      description: "Жеке ақпаратыңызды қалай қорғау керек",
      tips: [
        "Әлеуметтік желілерде артық ақпарат жарияламаңыз",
        "Жеке деректерді тек сенімді сайттарда ғана енгізіңіз",
        "Құжаттарыңыздың көшірмелерін интернетке жүктемеңіз",
        "Ашық Wi-Fi желілерінде банк операцияларын жасамаңыз"
      ]
    }
  ];

  const redFlags = [
    "Жедел ақша аударуды талап етеді",
    "Құпия деректерді сұрайды (пин-код, CVV)",
    "Қорқытып, асығыстырады",
    "Ресми емес байланыс арналарын пайдаланады",
    "Жеңіс, ұтыс немесе сыйлық туралы хабарлайды",
    "Грамматикалық қателері көп"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Shield className="h-16 w-16 mx-auto text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Қауіпсіздік кеңестері
              </h1>
              <p className="text-lg text-muted-foreground">
                Интернетте қауіпсіз болу үшін маңызды ережелер мен кеңестер
              </p>
            </div>
          </div>
        </section>

        {/* Warning Signs */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <Alert className="max-w-4xl mx-auto border-warning/50 bg-warning/10">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <AlertDescription>
                <h3 className="font-semibold mb-3 text-lg">Алаяқтықтың белгілері:</h3>
                <ul className="space-y-2">
                  {redFlags.map((flag, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-warning mt-1">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Safety Tips Grid */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <tip.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>{tip.title}</CardTitle>
                    <CardDescription>{tip.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tip.tips.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-12 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
          <div className="container">
            <Card className="max-w-2xl mx-auto border-2 border-primary/20">
              <CardContent className="p-8 text-center space-y-4">
                <AlertTriangle className="h-12 w-12 mx-auto text-warning" />
                <h2 className="text-2xl font-bold">Алаяқтыққа ұшырасаңыз</h2>
                <p className="text-muted-foreground">
                  Егер сіз алаяқтыққа ұшырасаңыз, бірден полицияға немесе банкіңізге хабарласыңыз
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Полиция</div>
                    <div className="text-2xl font-bold text-primary">102</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Киберполиция</div>
                    <div className="text-2xl font-bold text-primary">1477</div>
                  </div>
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

export default SafetyTipsPage;
