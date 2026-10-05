import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Zap, Globe, ChevronDown, X } from "lucide-react";
import { Layout } from "./components/Layout";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 min-h-[calc(100vh-100px)] relative pb-20 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.05)_30%,transparent_60%)] rounded-full blur-[60px] pointer-events-none" />
          <div className="text-center max-w-2xl mx-auto relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl md:text-4xl lg:text-[42px] font-normal tracking-tight mb-6 leading-tight font-unbounded"
            >
              максимальная скорость. <br/> <span className="italic font-light">свободный интернет.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-neutral-400 text-base md:text-lg font-normal leading-relaxed max-w-xl mx-auto"
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
              <h4 className="text-base font-medium mb-2 text-neutral-200">удобный кабинет</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">простое управление подписками и устройствами в один клик.</p>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="w-6 h-6 text-neutral-600 mb-4" />
              <h4 className="text-base font-medium mb-2 text-neutral-200">разные протоколы</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">поддержка современных протоколов для надежного и стабильного соединения.</p>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="w-6 h-6 text-neutral-600 mb-4" />
              <h4 className="text-base font-medium mb-2 text-neutral-200">быстрые сервера</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">оптимизированные серверы для стабильного подключения без потери скорости.</p>
            </div>
          </motion.div>
        </div>

        {/* Steps Section */}
        <div id="steps" className="max-w-5xl mx-auto px-6 py-24 w-full">
          <div className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-normal tracking-tight mb-3 font-unbounded">
              как начать <span className="text-neutral-500">за пару шагов</span>
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-normal max-w-xl mx-auto leading-relaxed">
              подключение занимает минимум действий и не требует лишней ручной настройки.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="p-8 rounded-3xl bg-neutral-900 flex flex-col border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-200 text-sm font-medium mb-5">
                1
              </div>
              <h3 className="text-lg font-medium mb-3 text-neutral-100">открой telegram-бота</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                перейди в telegram бота <a href="https://t.me/q1vpn_bot" target="_blank" rel="noopener noreferrer" className="text-neutral-200 hover:text-white transition-colors font-medium"><code className="bg-neutral-800 px-1.5 py-0.5 rounded text-xs">@q1vpn_bot</code></a>, где начинается оформление доступа.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="p-8 rounded-3xl bg-neutral-900 flex flex-col border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-200 text-sm font-medium mb-5">
                2
              </div>
              <h3 className="text-lg font-medium mb-3 text-neutral-100">получи подписку</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                получи пробную подписку бесплатно на 4 дня.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="p-8 rounded-3xl bg-neutral-900 flex flex-col border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-200 text-sm font-medium mb-5">
                3
              </div>
              <h3 className="text-lg font-medium mb-3 text-neutral-100">подключайся и пользуйся</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                после активации можно сразу пользоваться vpn, а управление доступом и подпиской остается в telegram.
              </p>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto px-6 py-24 w-full">
          <h2 className="text-2xl md:text-3xl font-normal mb-10 text-center tracking-tight font-unbounded">часто задаваемые вопросы</h2>
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
                  className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-neutral-900/50"
                >
                  <span className="font-normal text-sm md:text-base text-neutral-200">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? "auto" : 0, opacity: openFaq === index ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-neutral-400 text-sm leading-relaxed">
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
            <h2 className="text-2xl md:text-3xl font-normal tracking-tight mb-4 font-unbounded">готовы попробовать?</h2>
            <p className="text-neutral-400 text-sm md:text-base font-normal mb-8 max-w-md mx-auto leading-relaxed">
              присоединяйтесь к быстрому интернету уже сегодня. настройка займет меньше минуты.
              <span className="text-neutral-200 font-medium block mt-2">пробный период 4 дня</span>
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3.5 bg-white text-neutral-950 text-sm font-medium rounded-xl hover:bg-neutral-200 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              перейти
            </button>
          </motion.div>
        </div>
      </main>

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
              <h3 className="text-base md:text-lg font-normal tracking-tight mb-6 text-center text-neutral-100">выберите платформу</h3>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://t.me/q1vpn_bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#2AABEE] text-white text-xs md:text-sm font-medium rounded-xl hover:bg-[#2298D6] transition-colors text-center cursor-pointer"
                >
                  telegram бот
                </a>
                <a 
                  href="https://my.qone.su" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-neutral-100 text-neutral-950 text-xs md:text-sm font-medium rounded-xl hover:bg-white transition-colors text-center cursor-pointer"
                >
                  кабинет
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
