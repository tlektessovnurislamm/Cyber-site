import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Send, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ReportPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    phone: "",
    link: "",
    description: "",
    name: "",
    contact: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("fraud_reports").insert({
        type: formData.type,
        description: formData.description,
        phone: formData.phone || null,
        link: formData.link || null,
        name: formData.name || null,
        contact: formData.contact || null,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Отчет отправлен", {
        description: "Спасибо за помощь в борьбе с мошенничеством",
      });
      
      navigate("/thank-you");
    } catch (error: any) {
      toast.error("Ошибка отправки", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-4xl font-bold">Хабарлау жіберу</h1>
            <p className="text-lg text-muted-foreground">
              Алаяқтық туралы арыз жазып, басқа азаматтарды қорғауға көмектесіңіз
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Хабарлау формасы
              </CardTitle>
              <CardDescription>
                Алаяқтық туралы барлық мәліметтерді мұқият толтырыңыз
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Алаяқтық түрі *</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => setFormData({...formData, type: value})}
                    required
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Таңдаңыз" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">Телефон арқылы алаяқтық</SelectItem>
                      <SelectItem value="sms">SMS арқылы алаяқтық</SelectItem>
                      <SelectItem value="social">Әлеуметтік желі</SelectItem>
                      <SelectItem value="phishing">Фишинг сілтеме</SelectItem>
                      <SelectItem value="financial">Қаржылық алаяқтық</SelectItem>
                      <SelectItem value="other">Басқа</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Күдікті телефон нөмірі</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (___) ___ __ __"
                    pattern="^\+?[0-9\s\-\(\)]{10,}$"
                    title="Дұрыс телефон нөмірін енгізіңіз (кемінде 10 цифра)"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Күдікті сілтеме</Label>
                  <Input
                    id="link"
                    type="url"
                    placeholder="https://example.com"
                    pattern="https?://.*"
                    title="Дұрыс URL енгізіңіз (http:// немесе https://)"
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Сипаттама *</Label>
                  <Textarea
                    id="description"
                    placeholder="Не болғанын егжей-тегжейлі жазыңыз..."
                    className="min-h-[150px]"
                    minLength={20}
                    maxLength={2000}
                    title="Кемінде 20 таңба енгізіңіз (максимум 2000)"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.description.length}/2000 таңба
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Сіздің атыңыз</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Аты-жөніңіз"
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Байланыс нөміріңіз</Label>
                    <Input
                      id="contact"
                      type="tel"
                      placeholder="+7 (___) ___ __ __"
                      maxLength={100}
                      value={formData.contact}
                      onChange={(e) => setFormData({...formData, contact: e.target.value})}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Маңызды ескертпе</p>
                    <p className="text-muted-foreground">
                      Жалған хабарлама жіберу заң бойынша жауапкершілікке әкелуі мүмкін. 
                      Тек шын мәліметтерді ғана жазыңыз.
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  <Send className="mr-2 h-4 w-4" />
                  {loading ? "Жіберілуде..." : "Хабарлау жіберу"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Шұғыл жағдайда</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Егер сіз қазір алаяқтықтың құрбаны болып жатсаңыз немесе қауіпті жағдайда болсаңыз, 
                дереу полицияға хабарласыңыз.
              </p>
              <div className="flex gap-4">
                <Button variant="destructive" size="sm">
                  102 - Полиция
                </Button>
                <Button variant="outline" size="sm">
                  103 - Жедел жәрдем
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportPage;