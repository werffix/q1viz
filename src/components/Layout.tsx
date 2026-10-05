import { ReactNode } from "react";
import { Link } from "react-router-dom";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-neutral-800 flex flex-col">
      <nav className="max-w-5xl w-full mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
          <div className="text-xl font-medium tracking-tight font-unbounded">q1 vpn</div>
        </Link>
        <div className="flex items-center gap-6">
          <a href="https://my.qone.su" className="text-sm font-normal text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer">кабинет</a>
        </div>
      </nav>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="border-t border-neutral-900 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-sm">
            <div className="flex flex-col gap-3">
              <h4 className="font-medium text-neutral-300">Контакты</h4>
              <a href="https://t.me/q1_vpn" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-200 transition-colors">телеграм канал</a>
              <a href="https://t.me/q1vpn_bot" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-200 transition-colors">телеграм бот</a>
              <a href="https://t.me/q1support_bot" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-200 transition-colors">поддержка</a>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <h4 className="font-medium text-neutral-300">Документы</h4>
              <Link to="/terms" className="text-neutral-400 hover:text-neutral-200 transition-colors">публичная оферта</Link>
              <Link to="/privacy" className="text-neutral-400 hover:text-neutral-200 transition-colors">политика конфиденциальности</Link>
            </div>
          </div>
          <div className="text-center text-sm text-neutral-500">
            <p>&copy; {new Date().getFullYear()} q1 vpn. все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
