import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Zap, Globe, Check, ChevronDown, MonitorSmartphone, Ban, Infinity, ListChecks, Database, X } from "lucide-react";

export default function App() {
  const [currency, setCurrency] = useState<"RUB" | "USD">("RUB");
  const [usdRate, setUsdRate] = useState<number>(0.011);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/RUB')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates && data.rates.USD) {
          setUsdRate(data.rates.USD);
        }
      })
      .catch(console.error);
  }, []);

  const faqs = [
    {
      question: "могу ли я увеличить лимит устройств?",
      answer: "да, вы можете увеличить лимит, докупив дополнительные устройства через telegram-бота или в личном кабинете."
    },
    {
      question: "есть ли пробный период?",
      answer: "да, мы предоставляем бесплатный пробный период на 4 дня для тестирования сервиса перед покупкой."
    },
    {
      question: "работает ли на мобильном интернете?",
      answer: "да, сервис стабильно работает и обеспечивает высокую скорость как при подключении через wi-fi, так и в сетях мобильных операторов."
    },
    {
      question: "как оплатить подписку?",
      answer: "оплатить подписку можно в личном кабинете или через telegram-бота. мы принимаем оплату по сбп и криптовалютой."
    }
  ];

  const plans = [
    {
      name: "базовый",
      priceRub: 49,
      period: "/мес",
      features: [
        { text: "3 устройства", icon: MonitorSmartphone },
        { text: "без белых списков", icon: Ban },
        { text: "безлимитный трафик", icon: Infinity },
      ],
      link: "https://cabinet.q1se.ru/buy/basic",
    },
    {
      name: "стандарт",
      priceRub: 99,
      period: "/мес",
      features: [
        { text: "3 устройства", icon: MonitorSmartphone },
        { text: "140 гб на белые списки", icon: Database },
        { text: "безлимитный трафик", icon: Infinity },
      ],
      popular: true,
      link: "https://cabinet.q1se.ru/buy/standart",
    },
    {
      name: "премиум",
      priceRub: 169,
      period: "/мес",
      features: [
        { text: "5 устройств", icon: MonitorSmartphone },
        { text: "200 гб на белые списки", icon: Database },
        { text: "безлимитный трафик", icon: Infinity },
      ],
      link: "https://cabinet.q1se.ru/buy/premium",
    }
  ];

  const formatPrice = (priceRub: number, curr: "RUB" | "USD") => {
    if (curr === "RUB") return `${priceRub} ₽`;
    return `$${(priceRub * usdRate).toFixed(2)}`;
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-neutral-800 flex flex-col">
      <nav className="max-w-5xl w-full mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
          <div className="text-xl font-medium tracking-tight">q1 vpn</div>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://cabinet.q1se.ru" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer">кабинет</a>
        </div>
      </nav>

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 min-h-[calc(100vh-100px)] relative pb-20 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.05)_30%,transparent_60%)] rounded-full blur-[60px] pointer-events-none" />
          <div className="text-center max-w-2xl mx-auto relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-tight"
            >
              максимальная скорость. <br/> <span className="italic">свободный интернет.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-neutral-400 text-lg"
            >
              стабильное соединение без задержек. <br/>
              безопасный доступ к любым ресурсам.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mt-8 flex justify-center gap-4 text-sm"
            >
              <button 
                onClick={() => scrollToSection('cta')}
                className="px-6 py-3 bg-neutral-100 text-neutral-950 font-medium rounded-xl hover:bg-white transition-colors cursor-pointer"
              >
                попробовать
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-neutral-100 font-medium rounded-xl hover:bg-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer"
              >
                наши тарифы
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-12 flex flex-col items-center gap-2 cursor-pointer text-neutral-500 hover:text-neutral-300 transition-colors"
            onClick={() => scrollToSection('why-us')}
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>

        {/* Why Us Section */}
        <div id="why-us" className="max-w-5xl mx-auto px-6 py-24 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          >
            <div className="flex flex-col items-center">
              <Shield className="w-6 h-6 text-neutral-600 mb-4" />
              <h4 className="font-medium mb-2">удобный кабинет</h4>
              <p className="text-sm text-neutral-500">простое управление подписками и устройствами в один клик.</p>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="w-6 h-6 text-neutral-600 mb-4" />
              <h4 className="font-medium mb-2">разные протоколы</h4>
              <p className="text-sm text-neutral-500">поддержка современных протоколов для надежного и стабильного соединения.</p>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="w-6 h-6 text-neutral-600 mb-4" />
              <h4 className="font-medium mb-2">быстрые сервера</h4>
              <p className="text-sm text-neutral-500">оптимизированные серверы для стабильного подключения без потери скорости.</p>
            </div>
          </motion.div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="max-w-5xl mx-auto px-6 py-24 w-full">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className={`p-8 rounded-2xl border ${plan.popular ? 'border-neutral-600 bg-neutral-900' : 'border-neutral-800 bg-neutral-950'} flex flex-col group cursor-pointer transition-colors hover:border-neutral-600`}
              >
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-neutral-400">{plan.name}</h3>
                    <div className="text-xs font-medium">
                      <button 
                        onClick={() => setCurrency("RUB")}
                        className={`transition-colors ${currency === "RUB" ? "text-neutral-200" : "text-neutral-600 hover:text-neutral-400"}`}
                      >
                        RUB
                      </button>
                      <span className="text-neutral-700 mx-1">/</span>
                      <button 
                        onClick={() => setCurrency("USD")}
                        className={`transition-colors ${currency === "USD" ? "text-neutral-200" : "text-neutral-600 hover:text-neutral-400"}`}
                      >
                        USD
                      </button>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-neutral-500 text-lg mr-1">от</span>
                    <span className="text-4xl font-medium">{formatPrice(plan.priceRub, currency)}</span>
                    <span className="text-neutral-500">{plan.period}</span>
                  </div>
                </div>

                <ul className="flex-1 space-y-4 mb-8 text-sm text-neutral-300">
                  {plan.features.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                    <li key={i} className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-neutral-500" />
                      <span>{feature.text}</span>
                    </li>
                    )
                  })}
                </ul>

                <a 
                  href={plan.link}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 block text-center ${
                  plan.popular 
                    ? 'bg-neutral-100 text-neutral-950 hover:bg-white hover:scale-[1.02]' 
                    : 'bg-neutral-800 text-neutral-100 hover:bg-neutral-700 hover:scale-[1.02]'
                }`}>
                  выбрать {plan.name}
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto px-6 py-24 w-full">
          <h2 className="text-3xl font-medium mb-12 text-center tracking-tight">часто задаваемые вопросы</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border border-neutral-800 rounded-2xl bg-neutral-950 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-neutral-900/50"
                >
                  <span className="font-medium text-neutral-200">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? "auto" : 0, opacity: openFaq === index ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-neutral-400 text-sm">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div id="cta" className="max-w-5xl mx-auto px-6 py-32 w-full text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_60%)] rounded-full blur-[40px] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <h2 className="text-4xl font-medium tracking-tight mb-6">готовы попробовать?</h2>
            <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
              присоединяйтесь к быстрому интернету уже сегодня. настройка займет меньше минуты.<br/><span className="text-white">пробный период 4 дня</span>
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-white text-neutral-950 font-medium rounded-xl hover:bg-neutral-200 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              перейти
            </button>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-neutral-900 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-sm">
            <div className="flex flex-col gap-3">
              <h4 className="font-medium text-neutral-300">Контакты</h4>
              <a href="https://t.me/q1_vpn" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-300 transition-colors">телеграм канал</a>
              <a href="https://t.me/q1vpn_bot" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-300 transition-colors">телеграм бот</a>
              <a href="https://t.me/q1support_bot" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-300 transition-colors">поддержка</a>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <h4 className="font-medium text-neutral-300">Документы</h4>
              <a href="https://qone.su/terms" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-300 transition-colors">публичная оферта</a>
              <a href="https://qone.su/privacy" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-300 transition-colors">политика конфиденциальности</a>
            </div>
          </div>
          <div className="text-center text-sm text-neutral-600">
            <p>&copy; {new Date().getFullYear()} q1 vpn. все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 max-w-sm w-full relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-medium tracking-tight mb-6 text-center text-neutral-100">выберите платформу</h3>
              <div className="flex flex-col gap-4">
                <a 
                  href="https://t.me/q1vpn_bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 bg-[#2AABEE] text-white font-medium rounded-xl hover:bg-[#2298D6] transition-colors text-center cursor-pointer"
                >
                  telegram бот
                </a>
                <a 
                  href="https://cabinet.q1se.ru" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 bg-neutral-100 text-neutral-950 font-medium rounded-xl hover:bg-white transition-colors text-center cursor-pointer"
                >
                  кабинет
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
