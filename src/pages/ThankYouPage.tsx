import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const ThankYouPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Автоматический редирект на главную через 10 секунд
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-12 pb-12 text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Рахмет!</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Сіздің хабарламаңыз сәтті жіберілді. Біз мүмкіндігінше тезірек қарастырамыз.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Сіздің хабарламаңыз алаяқтықпен күреске үлкен үлес қосады және басқа адамдарды қорғауға көмектеседі.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/")} size="lg">
                Басты бетке оралу
              </Button>
              <Button onClick={() => navigate("/report")} variant="outline" size="lg">
                Тағы хабарлау жіберу
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              10 секундтан кейін автоматты түрде басты бетке өтесіз
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;
