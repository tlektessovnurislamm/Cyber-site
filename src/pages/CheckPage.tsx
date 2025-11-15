import { useState } from "react";
import { Search, AlertTriangle, CheckCircle2, Link as LinkIcon, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const CheckPage = () => {
  const [checkType, setCheckType] = useState<"phone" | "link">("phone");
  const [checkValue, setCheckValue] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ status: "safe" | "danger" | "warning"; title: string; description: string } | null>(null);
  const { toast } = useToast();

  const handleCheck = async () => {
    if (!checkValue.trim()) {
      toast({
        title: "Қате",
        description: "Тексеру үшін мән енгізіңіз",
        variant: "destructive",
      });
      return;
    }

    setChecking(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/check-fraud`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            type: checkType,
            value: checkValue,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Тексеру сәтсіз аяқталды');
      }

      const data = await response.json();
      
      let status: "safe" | "danger" | "warning";
      let title: string;

      if (data.status === 'dangerous') {
        status = "danger";
        title = "⚠️ Қауіп анықталды!";
      } else if (data.status === 'suspicious') {
        status = "warning";
        title = "⚡ Күдікті";
      } else {
        status = "safe";
        title = "✅ Қауіпсіз";
      }

      setResult({ status, title, description: data.result });
    } catch (error) {
      toast({
        title: "Қате",
        description: "AI тексеруде қате орын алды",
        variant: "destructive",
      });
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-4xl font-bold">Алаяқтықты тексеру</h1>
            <p className="text-lg text-muted-foreground">
              AI технологиясымен күдікті нөмірлер мен сілтемелерді тексеріңіз
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Тексеру құралы
              </CardTitle>
              <CardDescription>
                Телефон нөміріңді немесе сілтемені енгізіп, алаяқтық белгілерін тексеріңіз
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="phone" className="w-full" onValueChange={(v) => setCheckType(v as "phone" | "link")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Телефон нөмірі
                  </TabsTrigger>
                  <TabsTrigger value="link" className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    Сілтеме
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="phone" className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="+7 (___) ___ __ __"
                      value={checkValue}
                      onChange={(e) => setCheckValue(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleCheck} disabled={checking}>
                      {checking ? "Тексерілуде..." : "Тексеру"}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="link" className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://example.com"
                      value={checkValue}
                      onChange={(e) => setCheckValue(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleCheck} disabled={checking}>
                      {checking ? "Тексерілуде..." : "Тексеру"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              {result && (
                <Card className={`mt-6 ${result.status === 'danger' ? 'border-destructive' : result.status === 'warning' ? 'border-warning' : 'border-success'}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      {result.status === 'danger' ? (
                        <AlertTriangle className="h-8 w-8 text-destructive shrink-0" />
                      ) : result.status === 'warning' ? (
                        <AlertTriangle className="h-8 w-8 text-warning shrink-0" />
                      ) : (
                        <CheckCircle2 className="h-8 w-8 text-success shrink-0" />
                      )}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={result.status === 'danger' ? 'destructive' : result.status === 'warning' ? 'outline' : 'default'}>
                            {result.status === 'danger' ? 'Қауіпті' : result.status === 'warning' ? 'Күдікті' : 'Қауіпсіз'}
                          </Badge>
                        </div>
                        <h4 className="font-semibold">{result.title}</h4>
                        <p className="text-sm">{result.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  Ескертпе
                </h3>
                <p className="text-sm text-muted-foreground">
                  Тексеру нәтижесі AI технологиясы негізінде берілген. Күдікті жағдайда 
                  полицияға хабарласыңыз. Телефон: 102
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Алаяқтық белгілері</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span>Ақша сұрау немесе төлем талабы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span>Жеке деректер сұрау</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span>Шұғыл әрекет талап ету</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    <span>Күдікті сілтемелер жіберу</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Қауіпсіздік кеңестері</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-success">•</span>
                    <span>Белгісіз нөмірлерге сенбеңіз</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success">•</span>
                    <span>Жеке деректерді бермеңіз</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success">•</span>
                    <span>Күдікті сілтемелерді ашпаңыз</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success">•</span>
                    <span>Алдымен тексеріңіз</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckPage;
