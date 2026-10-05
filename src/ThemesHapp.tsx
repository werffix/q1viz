import { useState, useMemo, CSSProperties } from "react";
import { 
  Check, 
  Copy, 
  RotateCcw, 
  Search, 
  Plus, 
  Minus, 
  Code 
} from "lucide-react";
import { Layout } from "./components/Layout";
import { PRESET_THEMES, EMPTY_THEME, HappThemeConfig, PresetTheme } from "./themesData";
import "./happ-phone.css";

function toHex6(hex8: string): string {
  if (!hex8) return "#000000";
  return hex8.slice(0, 7);
}

function updateHex6(originalHex8: string, newHex6: string): string {
  const alpha = originalHex8.length === 9 ? originalHex8.slice(7, 9) : "FF";
  return `${newHex6.toUpperCase()}${alpha}`;
}

export default function ThemesHapp() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("qone-black");
  const [theme, setTheme] = useState<HappThemeConfig>(PRESET_THEMES[0].config);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllPresets, setShowAllPresets] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activePresetName = useMemo(() => {
    const found = PRESET_THEMES.find((p) => p.id === selectedPresetId);
    return found ? found.name : "Пользовательская тема";
  }, [selectedPresetId]);

  const filteredPresets = useMemo(() => {
    if (!searchQuery.trim()) return PRESET_THEMES;
    return PRESET_THEMES.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const displayedPresets = useMemo(() => {
    if (searchQuery.trim() || showAllPresets) {
      return filteredPresets;
    }
    return filteredPresets.slice(0, 8);
  }, [filteredPresets, showAllPresets, searchQuery]);

  const handleSelectPreset = (preset: PresetTheme) => {
    setSelectedPresetId(preset.id);
    setTheme({ ...preset.config });
  };

  const handleResetToEmpty = () => {
    setSelectedPresetId("custom");
    setTheme({ ...EMPTY_THEME });
  };

  const updateColorField = (field: keyof HappThemeConfig, hex6: string) => {
    setTheme((prev) => {
      const current = prev[field] as string;
      const updated = updateHex6(current, hex6);
      return {
        ...prev,
        [field]: updated
      };
    });
    setSelectedPresetId("custom");
  };

  const updateBgColor = (index: 0 | 1 | 2, hex6: string) => {
    setTheme((prev) => {
      const newBg = [...prev.backgroundColors] as [string, string, string];
      newBg[index] = updateHex6(newBg[index], hex6);
      return {
        ...prev,
        backgroundColors: newBg
      };
    });
    setSelectedPresetId("custom");
  };

  const updateEllipseColor = (index: 0 | 1 | 2, hex6: string) => {
    setTheme((prev) => {
      const newEllipses = [...prev.elipseColors] as [string, string, string];
      newEllipses[index] = updateHex6(newEllipses[index], hex6);
      return {
        ...prev,
        elipseColors: newEllipses
      };
    });
    setSelectedPresetId("custom");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleCopyJson = () => {
    const jsonStr = JSON.stringify(theme);
    navigator.clipboard.writeText(jsonStr).then(() => {
      setCopied(true);
      showToast("Код темы скопирован в буфер обмена!");
      setTimeout(() => setCopied(false), 2200);
    });
  };

  // Convert theme state to CSS variables for live phone preview
  const previewStyles = {
    "--happ-angle": `${theme.backgroundGradientRotationAngle}deg`,
    "--happ-intensity": theme.backgroundGradientColorIntensity,
    "--happ-bg-1": theme.backgroundColors[0],
    "--happ-bg-2": theme.backgroundColors[1],
    "--happ-bg-3": theme.backgroundColors[2],
    "--happ-accent": theme.buttonColor,
    "--happ-power-icon": theme.powerIconColor,
    "--happ-top-icon": theme.topBarButtonsColor,
    "--happ-sub-header": theme.subsHeaderColor,
    "--happ-sub-button": theme.subHeaderButtonColor,
    "--happ-info": theme.subscriptionInfoBackgroundColor,
    "--happ-info-text": theme.subscriptionInfoTextColor,
    "--happ-traffic": theme.subscriptionTrafficBackgroundColor,
    "--happ-row": theme.serverRowBackgroundColor,
    "--happ-row-active": theme.selectedServerRowColor,
    "--happ-row-title": theme.serverRowTitleTextColor,
    "--happ-row-subtitle": theme.serverRowSubTitleTextColor,
    "--happ-chevron": theme.serverRowChevronColor,
    "--happ-section-title": theme.disclosureHeaderTextColor,
    "--happ-section-subtitle": theme.disclosureSubHeaderTextColor,
    "--happ-options": theme.additionalOptionsButtonColor,
    "--happ-ellipse-1": theme.elipseColors[0],
    "--happ-ellipse-2": theme.elipseColors[1],
    "--happ-ellipse-3": theme.elipseColors[2],
    "--happ-phone-scale": 1
  } as CSSProperties;

  const colorInputClass = "w-8 h-8 rounded-full overflow-hidden border border-neutral-700/80 cursor-pointer shrink-0 p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full [&::-moz-color-swatch]:rounded-full shadow-sm hover:scale-105 transition-transform";

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-neutral-900 border border-neutral-700/80 px-4 py-3 rounded-xl shadow-2xl text-neutral-100 text-sm animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">
            темы happ для iphone.
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg">
            выбирай готовую или меняй цвета под себя. сразу увидишь, что получится.
          </p>
        </div>

        {/* Presets Section */}
        <div className="bg-neutral-900/40 border border-neutral-900 rounded-3xl p-6 sm:p-8 mb-16 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-neutral-100 mb-1">
                выбери тему
              </h2>
              <p className="text-neutral-400 text-sm">
                начни с готовой или собери свою.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  placeholder="найти тему"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
                />
              </div>

              <button
                type="button"
                onClick={handleResetToEmpty}
                className="inline-flex items-center gap-2 bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white px-3.5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                с нуля
              </button>
            </div>
          </div>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {displayedPresets.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-neutral-800/80 border-neutral-600 text-neutral-100 shadow-sm"
                      : "bg-neutral-950/60 border-neutral-800/70 hover:border-neutral-700 text-neutral-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate mr-2">
                    <span className="flex items-center -space-x-1.5 shrink-0">
                      <span
                        className="w-4 h-4 rounded-full border border-neutral-800"
                        style={{ backgroundColor: preset.swatches[0] }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-neutral-800"
                        style={{ backgroundColor: preset.swatches[1] }}
                      />
                    </span>
                    <span className="text-sm font-medium truncate">
                      {preset.name}
                    </span>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-neutral-200 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {!searchQuery.trim() && PRESET_THEMES.length > 8 && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShowAllPresets(!showAllPresets)}
                className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors font-medium px-4 py-2 rounded-xl hover:bg-neutral-800/50 cursor-pointer"
              >
                {showAllPresets ? "Свернуть темы" : `Показать все ${PRESET_THEMES.length}`}
              </button>
            </div>
          )}
        </div>

        {/* Workbench: Live Phone Mockup + Controls Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-6">
          {/* Left Column: Phone Mockup */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Phone Container */}
            <div className="happ-theme-preview" aria-hidden="true" style={previewStyles}>
              <div className="happ-theme-preview__glow"></div>
              <div className="happ-theme-phone">
                <div className="happ-theme-phone__screen">
                  <div className="happ-theme-phone__status">
                    <span className="happ-theme-phone__time">9:41</span>
                    <span className="happ-theme-phone__status-icons">
                      <span className="happ-theme-phone__signal">
                        <i></i><i></i><i></i><i></i>
                      </span>
                      <span className="happ-theme-phone__network">LTE</span>
                      <span className="happ-theme-phone__battery"><span>83</span></span>
                    </span>
                  </div>
                  <div className="happ-theme-phone__top">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </div>
                  <div className="happ-theme-phone__power-area">
                    <div className="happ-theme-phone__power-ring"></div>
                    <div className="happ-theme-phone__power">
                      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-power">
                        <path d="M12 2v10"></path>
                        <path d="M18.4 6.6a9 9 0 1 1-12.77.04"></path>
                      </svg>
                    </div>
                  </div>

                  {/* Connected Unified Group: Subscription Card + Thin Divider + Connected Servers */}
                  <div className="happ-theme-phone__unified-group">
                    <div className="happ-theme-phone__subscription">
                      <div className="happ-theme-phone__subscription-head">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down">
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                        <div>
                          <strong>q1 vpn</strong>
                          <small>Автообновление · 1 ч.</small>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw">
                          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                          <path d="M21 3v5h-5"></path>
                          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                          <path d="M8 16H3v5"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gauge">
                          <path d="m12 14 4-4"></path>
                          <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis">
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="19" cy="12" r="1"></circle>
                          <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                      </div>

                      <div className="happ-theme-phone__subscription-info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 16v-4"></path>
                          <path d="M12 8h.01"></path>
                        </svg>
                        <div className="happ-theme-phone__traffic">
                          <span>253 ГБ / 426 ГБ</span>
                        </div>
                        <span className="happ-theme-phone__date">До 09.10.2026</span>
                      </div>

                      <div className="happ-theme-phone__subscription-note">
                        📈 Расход трафика учитывается только на серверах из белого списка
                      </div>
                    </div>

                    {/* Thin divider line */}
                    <div className="happ-theme-phone__group-divider"></div>

                    {/* Connected Servers List */}
                    <div className="happ-theme-phone__servers">
                      <div className="happ-theme-phone__server is-selected">
                        <span className="happ-theme-phone__flag">🇪🇺</span>
                        <div>
                          <strong>Автовыбор ⚡️</strong>
                          <small>VLESS | TCP | Reality | JSON</small>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </div>

                      <div className="happ-theme-phone__server">
                        <span className="happ-theme-phone__flag">🇳🇱</span>
                        <div>
                          <strong>Нидерланды</strong>
                          <small>VLESS | TCP | Reality | JSON</small>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </div>

                      <div className="happ-theme-phone__server">
                        <span className="happ-theme-phone__flag">🇩🇪</span>
                        <div>
                          <strong>Германия</strong>
                          <small>VLESS | TCP | Reality | JSON</small>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </div>

                      <div className="happ-theme-phone__server">
                        <span className="happ-theme-phone__flag">🇫🇮</span>
                        <div>
                          <strong>Финляндия</strong>
                          <small>VLESS | TCP | Reality | JSON</small>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </div>

                      <div className="happ-theme-phone__server">
                        <span className="happ-theme-phone__flag">🇵🇱</span>
                        <div>
                          <strong>Польша</strong>
                          <small>VLESS | TCP | Reality | JSON</small>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </div>

                      <div className="happ-theme-phone__server">
                        <span className="happ-theme-phone__flag">🇪🇪</span>
                        <div>
                          <strong>Эстония</strong>
                          <small>VLESS | TCP | Reality | JSON</small>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="happ-theme-phone__home-indicator"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls ("Под себя") */}
          <div className="lg:col-span-6 bg-neutral-900/40 border border-neutral-900 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
              <div>
                <h2 className="text-2xl font-medium tracking-tight text-neutral-100">
                  под себя
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  текущий пресет: <span className="text-neutral-200 font-medium">{activePresetName}</span>
                </p>
              </div>
            </div>

            {/* Group 1: Фон */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-1">
                фон
              </h3>
              <p className="text-xs text-neutral-500 mb-3">
                три цвета плавно переходят друг в друга.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[0, 1, 2].map((idx) => {
                  const val = theme.backgroundColors[idx as 0 | 1 | 2];
                  return (
                    <label
                      key={`bg-${idx}`}
                      className="flex items-center justify-between p-3 bg-neutral-950/80 border border-neutral-800/80 rounded-2xl hover:border-neutral-700 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-neutral-300">
                          Цвет {idx + 1}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-500">
                          {val}
                        </span>
                      </div>
                      <input
                        type="color"
                        value={toHex6(val)}
                        onChange={(e) => updateBgColor(idx as 0 | 1 | 2, e.target.value)}
                        className={colorInputClass}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Group 2: Главное */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-1">
                главное
              </h3>
              <p className="text-xs text-neutral-500 mb-3">
                акцент меняет кнопку и основные иконки.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Accent */}
                <label className="flex items-center justify-between p-3 bg-neutral-950/80 border border-neutral-800/80 rounded-2xl hover:border-neutral-700 transition-colors cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-neutral-300">
                      Акцент
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {theme.buttonColor}
                    </span>
                  </div>
                  <input
                    type="color"
                    value={toHex6(theme.buttonColor)}
                    onChange={(e) => updateColorField("buttonColor", e.target.value)}
                    className={colorInputClass}
                  />
                </label>

                {/* Server Row Card */}
                <label className="flex items-center justify-between p-3 bg-neutral-950/80 border border-neutral-800/80 rounded-2xl hover:border-neutral-700 transition-colors cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-neutral-300 truncate">
                      Карточки
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {theme.serverRowBackgroundColor}
                    </span>
                  </div>
                  <input
                    type="color"
                    value={toHex6(theme.serverRowBackgroundColor)}
                    onChange={(e) => updateColorField("serverRowBackgroundColor", e.target.value)}
                    className={colorInputClass}
                  />
                </label>

                {/* Server Row Title */}
                <label className="flex items-center justify-between p-3 bg-neutral-950/80 border border-neutral-800/80 rounded-2xl hover:border-neutral-700 transition-colors cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-neutral-300 truncate">
                      Названия
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {theme.serverRowTitleTextColor}
                    </span>
                  </div>
                  <input
                    type="color"
                    value={toHex6(theme.serverRowTitleTextColor)}
                    onChange={(e) => updateColorField("serverRowTitleTextColor", e.target.value)}
                    className={colorInputClass}
                  />
                </label>
              </div>
            </div>

            {/* Group 3: Тонкая настройка (Accordion) */}
            <div className="border border-neutral-800/80 rounded-2xl overflow-hidden mb-6">
              <button
                type="button"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="w-full flex items-center justify-between p-4 bg-neutral-950/60 hover:bg-neutral-950 text-neutral-200 text-sm font-medium transition-colors cursor-pointer"
              >
                <span>тонкая настройка</span>
                {isAdvancedOpen ? (
                  <Minus className="w-4 h-4 text-neutral-400" />
                ) : (
                  <Plus className="w-4 h-4 text-neutral-400" />
                )}
              </button>

              {isAdvancedOpen && (
                <div className="p-4 bg-neutral-950/30 border-t border-neutral-800/80 space-y-4">
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    текст подключения меняет надпись и время. цвет таймера можно выбрать отдельно.
                  </p>

                  {/* Detailed Color Pickers Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
                    {[
                      { key: "selectedServerRowColor", label: "Выбранный сервер" },
                      { key: "subsHeaderColor", label: "Шапка подписки" },
                      { key: "buttonTextColor", label: "Текст подключения" },
                      { key: "powerIconColor", label: "Значок подключения" },
                      { key: "serverRowSubTitleTextColor", label: "Подпись сервера" },
                      { key: "topBarButtonsColor", label: "Кнопки сверху" },
                      { key: "supportIconColor", label: "Поддержка" },
                      { key: "profileWebPageIconColor", label: "Сайт профиля" },
                      { key: "subHeaderButtonColor", label: "Кнопка подписки" },
                      { key: "settingsControlsTintColor", label: "Переключатели" },
                      { key: "subscriptionInfoBackgroundColor", label: "Инфо о подписке" },
                      { key: "subscriptionTrafficBackgroundColor", label: "Блок трафика" },
                      { key: "subscriptionInfoTextColor", label: "Текст подписки" },
                      { key: "disclosureHeaderTextColor", label: "Заголовок блока" },
                      { key: "disclosureSubHeaderTextColor", label: "Подзаголовок блока" },
                      { key: "serverRowChevronColor", label: "Стрелка сервера" },
                      { key: "additionalOptionsButtonColor", label: "Доп. действия" },
                      { key: "buttonTimerColor", label: "Таймер подключения" }
                    ].map(({ key, label }) => {
                      const val = (theme as unknown as Record<string, string>)[key];
                      return (
                        <label
                          key={key}
                          className="flex items-center justify-between p-2.5 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl hover:border-neutral-700 transition-colors cursor-pointer"
                        >
                          <div className="flex flex-col truncate mr-2">
                            <span className="text-xs text-neutral-300 truncate">
                              {label}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-500">
                              {val}
                            </span>
                          </div>
                          <input
                            type="color"
                            value={toHex6(val)}
                            onChange={(e) =>
                              updateColorField(key as keyof HappThemeConfig, e.target.value)
                            }
                            className={colorInputClass}
                          />
                        </label>
                      );
                    })}

                    {/* 3 Ellipse Glow colors */}
                    {[0, 1, 2].map((idx) => {
                      const val = theme.elipseColors[idx as 0 | 1 | 2];
                      return (
                        <label
                          key={`ellipse-${idx}`}
                          className="flex items-center justify-between p-2.5 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl hover:border-neutral-700 transition-colors cursor-pointer"
                        >
                          <div className="flex flex-col truncate mr-2">
                            <span className="text-xs text-neutral-300 truncate">
                              Свечение {idx + 1}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-500">
                              {val}
                            </span>
                          </div>
                          <input
                            type="color"
                            value={toHex6(val)}
                            onChange={(e) =>
                              updateEllipseColor(idx as 0 | 1 | 2, e.target.value)
                            }
                            className={colorInputClass}
                          />
                        </label>
                      );
                    })}
                  </div>

                  {/* Sliders: Gradient angle & intensity */}
                  <div className="space-y-3 pt-2 border-t border-neutral-800">
                    <div>
                      <div className="flex justify-between text-xs text-neutral-400 mb-1">
                        <span>Поворот фона</span>
                        <span className="font-mono text-neutral-200">
                          {theme.backgroundGradientRotationAngle}°
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={theme.backgroundGradientRotationAngle}
                        onChange={(e) =>
                          setTheme((prev) => ({
                            ...prev,
                            backgroundGradientRotationAngle: Number(e.target.value)
                          }))
                        }
                        className="w-full accent-neutral-200 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-neutral-400 mb-1">
                        <span>Яркость перехода</span>
                        <span className="font-mono text-neutral-200">
                          {Math.round(theme.backgroundGradientColorIntensity * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={theme.backgroundGradientColorIntensity}
                        onChange={(e) =>
                          setTheme((prev) => ({
                            ...prev,
                            backgroundGradientColorIntensity: Number(e.target.value)
                          }))
                        }
                        className="w-full accent-neutral-200 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Style Selectors */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        Стиль фона
                      </label>
                      <select
                        value={theme.backgroundImageType}
                        onChange={(e) =>
                          setTheme((prev) => ({
                            ...prev,
                            backgroundImageType: e.target.value as "light" | "dark" | "system"
                          }))
                        }
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none"
                      >
                        <option value="light">Светлый</option>
                        <option value="dark">Тёмный</option>
                        <option value="system">Системный</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        Стиль кнопки
                      </label>
                      <select
                        value={theme.buttonImageType}
                        onChange={(e) =>
                          setTheme((prev) => ({
                            ...prev,
                            buttonImageType: e.target.value as "light" | "dark"
                          }))
                        }
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none"
                      >
                        <option value="light">Светлый</option>
                        <option value="dark">Тёмный</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Export Section */}
            <div className="border-t border-neutral-800 pt-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-neutral-100">
                  готово! забирай тему
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  скопируй код и импортируй его в Happ из буфера обмена.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-white text-neutral-950 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 active:scale-[0.98] shadow-lg shadow-white/5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>код скопирован!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>скопировать код</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsJsonOpen(!isJsonOpen)}
                  className="inline-flex items-center justify-center gap-2 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white px-4 py-3 rounded-xl font-medium text-sm transition-colors cursor-pointer"
                >
                  <Code className="w-4 h-4" />
                  <span>посмотреть JSON</span>
                </button>
              </div>

              {/* JSON code viewer */}
              {isJsonOpen && (
                <div className="mt-4 p-3 bg-neutral-950 border border-neutral-800 rounded-2xl">
                  <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-[11px] text-neutral-500 font-mono">
                      Happ Theme JSON
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyJson}
                      className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
                    >
                      копировать
                    </button>
                  </div>
                  <textarea
                    readOnly
                    rows={8}
                    value={JSON.stringify(theme, null, 2)}
                    className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-3 text-xs font-mono text-neutral-300 focus:outline-none resize-none leading-relaxed select-all"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How to install help section */}
        <div className="max-w-2xl mx-auto bg-neutral-900/40 border border-neutral-900 rounded-2xl p-6 text-center">
          <h2 className="text-lg font-medium text-neutral-100 mb-2">
            как поставить?
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            скопируй код темы. в приложении Happ нажми «+» сверху справа и выбери «Вставить из буфера обмена».
          </p>
        </div>
      </div>
    </Layout>
  );
}
