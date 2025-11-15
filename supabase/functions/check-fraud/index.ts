import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, value } = await req.json();

    // Қазақстандық операторлардың тізімі
    const kazakhOperators = ['700', '701', '702', '705', '707', '708', '747', '750', '751', '760', '761', '762', '771', '775', '776', '777', '778'];
    
    // Телефон нөмірін тексеру
    if (type === 'phone') {
      const cleanNumber = value.replace(/[^\d]/g, '');
      
      // 1. Цифрлар санын тексеру (11 цифр үшін 8, 10 цифр үшін 7)
      const isValidLength = cleanNumber.length === 11 || cleanNumber.length === 10;
      
      // 2. Қазақстандық нөмір ме тексеру
      const isKazakhNumber = cleanNumber.startsWith('87') || cleanNumber.startsWith('77') || cleanNumber.startsWith('7');
      
      // 3. Оператор кодын тексеру
      let operatorCode = '';
      if (cleanNumber.startsWith('87') && cleanNumber.length === 11) {
        operatorCode = cleanNumber.substring(1, 4);
      } else if (cleanNumber.startsWith('7') && cleanNumber.length === 10) {
        operatorCode = cleanNumber.substring(1, 4);
      }
      
      const isValidOperator = kazakhOperators.includes(operatorCode);
      
      // Барлық критерийлер орындалса - қауіпсіз
      if (isKazakhNumber && isValidLength && isValidOperator) {
        return new Response(
          JSON.stringify({
            result: `Статус: қауіпсіз. Себебі: Қазақстандық ${operatorCode} операторының дұрыс форматтағы нөмірі (${cleanNumber.length} цифр). Ешқандай алаяқтық белгілері жоқ.`,
            status: 'safe'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      // Қате формат немесе оператор
      if (isKazakhNumber && (!isValidLength || !isValidOperator)) {
        let reason = '';
        if (!isValidLength) {
          reason = `Қате цифрлар саны: ${cleanNumber.length} (болуы керек: 10 немесе 11)`;
        } else if (!isValidOperator) {
          reason = `Белгісіз оператор коды: ${operatorCode}. Бұл Қазақстандағы тіркелген оператор емес`;
        }
        return new Response(
          JSON.stringify({
            result: `Статус: күмәнді. Себебі: ${reason}. Нөмір форматын тексеріңіз немесе оператормен байланысыңыз.`,
            status: 'suspicious'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      // Қазақстандық емес нөмір
      if (!isKazakhNumber) {
        return new Response(
          JSON.stringify({
            result: `Статус: күмәнді. Себебі: Бұл қазақстандық нөмір емес. Халықаралық нөмірлерден сақ болыңыз, алаяқтар жиі шетелдік нөмірлерді пайдаланады.`,
            status: 'suspicious'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Сілтемелерді тексеру үшін AI API қажет
    // Қазіргі уақытта тек телефон нөмірлерін тексеру қолдауда
    if (type !== 'phone') {
      return new Response(
        JSON.stringify({
          error: 'Сілтемелерді тексеру қазіргі уақытта қолжетімсіз. AI API баптау қажет.'
        }),
        {
          status: 501,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('Check fraud error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Белгісіз қате' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
