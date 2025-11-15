import { useState } from "react";
import { Brain, CheckCircle2, XCircle, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const TestPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const { toast } = useToast();

  const questions = [
    {
      question: "Белгісіз нөмірден SMS келді: \"Сіздің картаңыз блокталды. Құпия сөзді енгізіңіз\". Не істеу керек?",
      options: [
        "SMS-те көрсетілген сілтемені басып, құпия сөзді енгізу",
        "Банкке тікелей хабарласу",
        "SMS-ті жою және ештеңе істемеу",
        "Достарыңызға жіберу"
      ],
      correct: 1,
      explanation: "Ешқашан SMS арқылы келген сілтемелерге кірмеңіз. Банктің ресми нөміріне хабарласыңыз."
    },
    {
      question: "Әлеуметтік желіде жаңа достан хабар келді: \"Шұғыл ақша керек, қайтарамын\". Не істейсіз?",
      options: [
        "Дереу ақша жіберу",
        "Телефон арқылы хабарласып, тексеру",
        "Достарға айтып, кеңес сұрау",
        "Хабарды елемеу"
      ],
      correct: 1,
      explanation: "Бұл классикалық алаяқтық әдісі. Әрқашан басқа байланыс арқылы тексеріңіз."
    },
    {
      question: "Email келді: \"Сіз 1 млн теңге ұттыңыз! Жеке деректеріңізді жіберіңіз\". Сіздің әрекетіңіз?",
      options: [
        "Деректерді жіберіп, ұтысты алу",
        "Email-ді spam деп белгілеу және жою",
        "Достарға хабарлау",
        "Сілтемені басу"
      ],
      correct: 1,
      explanation: "Ешқашан белгісіз көздерге жеке деректеріңізді жібермеңіз. Бұл фишинг әдісі."
    },
    {
      question: "Қауіпсіз құпия сөз қандай болу керек?",
      options: [
        "Туған күніңіз",
        "123456",
        "Әріптер, сандар және белгілер қоспасы",
        "Атыңыз"
      ],
      correct: 2,
      explanation: "Күшті құпия сөзде әріптер (үлкен және кіші), сандар және арнайы белгілер болуы керек."
    },
    {
      question: "Интернет-дүкенде сатып алу үшін не қажет?",
      options: [
        "Барлық карта деректерін сайтта сақтау",
        "Тек қауіпсіз сайттардан (https://) сатып алу",
        "Ашық WiFi арқылы төлем жасау",
        "Біреудің картасын пайдалану"
      ],
      correct: 1,
      explanation: "Әрқашан қауіпсіз байланысы бар (https://) және сенімді сайттардан ғана сатып алыңыз."
    }
  ];

  const handleAnswer = () => {
    if (!selectedAnswer) {
      toast({
        title: "Қате",
        description: "Жауап таңдаңыз",
        variant: "destructive",
      });
      return;
    }

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return answers.filter((answer, index) => 
      parseInt(answer) === questions[index].correct
    ).length;
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedAnswer("");
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const score = calculateScore();
  const percentage = (score / questions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 py-12">
          <div className="container max-w-3xl">
            <Card>
              <CardHeader className="text-center">
                <Trophy className="h-16 w-16 mx-auto mb-4 text-primary" />
                <CardTitle className="text-3xl">Тест аяқталды!</CardTitle>
                <CardDescription>
                  Сіздің нәтижеңіз: {score} / {questions.length}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">
                    {percentage.toFixed(0)}%
                  </div>
                  <p className="text-muted-foreground">
                    {percentage >= 80 ? "Өте жақсы! Қауіпсіздік ережелерін жақсы білесіз." :
                     percentage >= 60 ? "Жақсы нәтиже! Бірақ тағы да үйреніңіз." :
                     "Қауіпсіздік туралы көбірек білім алуыңыз керек."}
                  </p>
                </div>

                <div className="space-y-4">
                  {questions.map((q, index) => {
                    const userAnswer = parseInt(answers[index]);
                    const isCorrect = userAnswer === q.correct;
                    
                    return (
                      <Card key={index} className={`border-2 ${isCorrect ? 'border-success' : 'border-destructive'}`}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3 mb-3">
                            {isCorrect ? (
                              <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-1" />
                            ) : (
                              <XCircle className="h-5 w-5 text-destructive shrink-0 mt-1" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium mb-2">{q.question}</p>
                              <p className="text-sm text-muted-foreground mb-2">
                                Сіздің жауабыңыз: {q.options[userAnswer]}
                              </p>
                              {!isCorrect && (
                                <p className="text-sm text-success mb-2">
                                  Дұрыс жауап: {q.options[q.correct]}
                                </p>
                              )}
                              <p className="text-sm text-muted-foreground italic">
                                {q.explanation}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <Button onClick={resetTest} className="w-full" size="lg">
                  Тестті қайта өту
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-4xl font-bold">Қауіпсіздік тесті</h1>
            <p className="text-lg text-muted-foreground">
              Интернет қауіпсіздігі туралы білімді тексеріңіз
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Сұрақ {currentQuestion + 1} / {questions.length}
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {progress.toFixed(0)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {questions[currentQuestion].question}
                </h3>

                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <Button onClick={handleAnswer} className="w-full" size="lg">
                {currentQuestion < questions.length - 1 ? (
                  <>
                    Келесі сұрақ
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Тестті аяқтау"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TestPage;
