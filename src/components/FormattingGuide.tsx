import { useState, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Search, 
  ArrowRight, 
  Loader2, 
  MousePointer2, 
  Lightbulb, 
  Zap,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  X
} from 'lucide-react';
import { getConditionalFormattingGuidance, type ConditionalFormattingSolution } from '../services/gemini';
import { ClearButton, CopyButton } from './Common';

interface FormattingGuideProps {
  onDebug?: (formula: string) => void;
  onClose?: () => void;
}

export default function FormattingGuide({ onDebug, onClose }: FormattingGuideProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ConditionalFormattingSolution | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    try {
      const data = await getConditionalFormattingGuidance(input);
      setResult(data);
    } catch (error) {
      console.error('Error getting formatting guidance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl">
       <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[60vh] flex flex-col transition-colors">
        {/* Header Section */}
        <div className="bg-indigo-900 dark:bg-indigo-950 p-8 md:p-12 text-white relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Palette className="w-64 h-64" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-[#217346] p-3 rounded-2xl shadow-lg shadow-[#217346]/20">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight">Logic & Style</h2>
                  <p className="text-indigo-200 font-medium tracking-wide">Dynamic conditioning for intelligent spreadsheets.</p>
                </div>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
                  aria-label="Close Conditioning"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="mt-8 relative max-w-3xl">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-indigo-300" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., Highlight rows where Profit is less than 10% of Sales..."
                className="w-full bg-indigo-950/40 backdrop-blur-md border-2 border-indigo-200/20 rounded-2xl py-5 pl-14 pr-48 text-lg text-white placeholder:text-indigo-300/50 focus:border-white transition-all outline-none shadow-xl"
              />
              <div className="absolute right-[8.5rem] inset-y-0 flex items-center">
                <ClearButton 
                  isVisible={input.length > 0} 
                  onClick={() => {
                    setInput('');
                    inputRef.current?.focus();
                  }} 
                />
              </div>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-3 inset-y-3 px-6 bg-[#217346] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#1a5c38] transition-all disabled:opacity-50 min-w-[120px] justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="hidden sm:inline">PROCESSING...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5" />
                    <span className="hidden sm:inline">PROCESS</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 md:p-12 bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="format-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-[1.2fr_1fr] gap-8">
                  <div className="space-y-8">
                    {/* Primary Objective */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2 text-[#217346] dark:text-green-500 font-bold text-[10px] uppercase tracking-widest mb-4">
                        <CheckCircle2 className="w-4 h-4" />
                        Objective Defined
                      </div>
                      <h3 className="text-3xl font-bold text-slate-800 dark:text-white leading-tight">
                        {result.goal}
                      </h3>
                    </div>

                    {/* Navigation */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-2 text-[#217346] dark:text-green-500 font-bold text-[10px] uppercase tracking-widest mb-6">
                            <MousePointer2 className="w-4 h-4" />
                            Application Path
                        </div>
                        <ul className="space-y-4">
                            {result.navigationSteps.map((step, i) => (
                                <li key={i} className="flex gap-4 items-center group">
                                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 dark:text-slate-500 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-colors uppercase">
                                        Step {i + 1}
                                    </span>
                                    <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* Rule Type & Formula */}
                    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <Palette className="w-24 h-24" />
                        </div>
                        <div className="relative z-10">
                            <div className="mb-6">
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Standard Rule Type</p>
                                <p className="text-xl font-bold text-indigo-400">{result.ruleType}</p>
                            </div>
                            
                            {result.formula && (
                                <div className="space-y-2">
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Logic String</p>
                                    <div className="relative group/formula">
                                        <div className="bg-indigo-900/40 border border-indigo-800 p-4 pr-16 rounded-xl font-mono text-lg text-white break-all shadow-inner">
                                            {result.formula}
                                        </div>
                                        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 group-hover/formula:opacity-100 transition-opacity">
                                            <CopyButton 
                                              text={result.formula!} 
                                              className="p-2 bg-indigo-800 hover:bg-indigo-700 text-indigo-200 rounded-lg transition-colors border border-indigo-700 shadow-lg"
                                            />
                                            {onDebug && (
                                                <button
                                                    onClick={() => onDebug(result.formula!)}
                                                    className="p-2 bg-[#217346] hover:bg-[#1a5c38] text-white rounded-lg transition-colors border border-[#1a5c38] shadow-lg"
                                                    title="Analyze in Debugger"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="bg-[#217346]/5 dark:bg-[#217346]/10 border border-[#217346]/10 dark:border-[#217346]/20 rounded-3xl p-8">
                        <div className="flex items-center gap-2 text-[#217346] dark:text-green-500 font-bold text-[10px] uppercase tracking-widest mb-4">
                            <Zap className="w-4 h-4" />
                            Optimization Node
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 text-sm font-semibold italic leading-relaxed">
                            "{result.proTip}"
                        </p>
                    </div>

                    {/* Design Tip */}
                    <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 rounded-3xl p-8">
                        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-[10px] uppercase tracking-widest mb-4">
                            <Lightbulb className="w-4 h-4" />
                            Visual UX Standard
                        </div>
                        <p className="text-indigo-900 dark:text-indigo-200 text-sm font-medium leading-relaxed">
                            {result.designAdvice}
                        </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-6 py-20">
                <div className="bg-white p-8 rounded-full shadow-inner border-2 border-dashed border-slate-200">
                  <Palette className="w-16 h-16 opacity-10" />
                </div>
                <div className="text-center max-w-sm">
                  <p className="text-xl font-bold text-slate-800 mb-2">Ready to Stylesheet</p>
                  <p className="text-sm">Describe how your data should react visually to data changes. I'll provide the conditional logic architecture.</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
