import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bug, 
  Search, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Hash,
  Database,
  SquareCode,
  Zap,
  X
} from 'lucide-react';
import { debugFormula, type FormulaDebugResult } from '../services/gemini';
import { ClearButton, CopyButton } from './Common';

interface FormulaDebuggerProps {
  initialFormula?: string;
  onClearInitial?: () => void;
  onClose?: () => void;
}

export default function FormulaDebugger({ initialFormula, onClearInitial, onClose }: FormulaDebuggerProps) {
  const [input, setInput] = useState(initialFormula || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FormulaDebugResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialFormula && !loading) {
      setInput(initialFormula);
      // Auto-trigger analysis
      const triggerAnalysis = async () => {
        setLoading(true);
        try {
          const data = await debugFormula(initialFormula);
          setResult(data);
        } catch (error) {
          console.error('Error debugging formula:', error);
        } finally {
          setLoading(false);
        }
      };
      triggerAnalysis();
      
      // Cleanup to prevent infinite loops if view switching
      if (onClearInitial) onClearInitial();
    }
  }, [initialFormula]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    try {
      const data = await debugFormula(input);
      setResult(data);
    } catch (error) {
      console.error('Error debugging formula:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'function': return <SquareCode className="w-4 h-4 text-purple-500" />;
      case 'parameter': return <Info className="w-4 h-4 text-blue-500" />;
      case 'operator': return <Hash className="w-4 h-4 text-orange-500" />;
      case 'reference': return <Database className="w-4 h-4 text-[#217346]" />;
      case 'constant': return <Zap className="w-4 h-4 text-yellow-500" />;
      default: return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[60vh] flex flex-col transition-colors">
        {/* Header Section */}
        <div className="bg-slate-900 dark:bg-slate-950 p-8 md:p-12 text-white relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Bug className="w-64 h-64" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-[#217346] p-3 rounded-2xl shadow-lg shadow-[#217346]/20">
                  <Bug className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight">Formula Debugger</h2>
                  <p className="text-slate-400 font-medium tracking-wide italic">Deconstruct complexity. Grasp the logic.</p>
                </div>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
                  aria-label="Close Debugger"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="mt-8 relative max-w-3xl">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-500" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste a complex formula (e.g., =VLOOKUP(A1, B2:C10, 2, FALSE))..."
                className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl py-5 pl-14 pr-48 text-lg text-white placeholder:text-slate-500 focus:border-[#217346] transition-all outline-none shadow-xl"
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
                    <span className="hidden sm:inline">PROCESS...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5" />
                    <span className="hidden sm:inline">DEBUG</span>
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
                key="debug-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-12"
              >
                {/* Overall Logic */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-[#217346] dark:text-green-500 font-bold text-[10px] uppercase tracking-widest mb-4">
                    <CheckCircle2 className="w-4 h-4" />
                    Core Architecture Analysis
                  </div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white leading-tight">
                    {result.overallLogic}
                  </p>
                </div>

                {/* Step by Step Breakdown */}
                <div className="grid md:grid-cols-[1fr_350px] gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="text-slate-800 dark:text-white font-black text-xl flex items-center gap-2">
                         <SquareCode className="w-5 h-5 text-[#217346]" />
                         Component Breakdown
                       </h3>
                    </div>
                    <div className="space-y-4">
                      {result.parts.map((part, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group"
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                               {getRoleIcon(part.role)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <code className="bg-slate-900 dark:bg-slate-800 text-green-400 px-2 py-0.5 rounded text-sm font-mono font-bold border border-white/5 flex items-center gap-2 group/code">
                                  {part.segment}
                                  <CopyButton 
                                    text={part.segment} 
                                    className="opacity-0 group-hover/code:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                                    iconSize={12}
                                  />
                                </code>
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                  {part.role}
                                </span>
                              </div>
                              <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">
                                {part.explanation}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Sidebar stats/tips */}
                  <div className="space-y-8">
                    {/* Pitfalls */}
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 rounded-3xl p-6">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold text-[10px] uppercase tracking-widest mb-4">
                        <AlertCircle className="w-4 h-4" />
                        Common Vulnerabilities
                      </div>
                      <ul className="space-y-3">
                        {result.commonPitfalls.map((pitfall, i) => (
                          <li key={i} className="text-red-900 dark:text-red-200 text-sm font-medium flex gap-2">
                            <span className="shrink-0">•</span>
                            {pitfall}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Optimization */}
                    {result.optimizationSuggestion && (
                      <div className="bg-[#217346]/5 dark:bg-[#217346]/10 border border-[#217346]/10 dark:border-[#217346]/20 rounded-3xl p-6">
                        <div className="flex items-center gap-2 text-[#217346] dark:text-green-500 font-bold text-[10px] uppercase tracking-widest mb-4">
                          <Zap className="w-4 h-4" />
                          Architect's Suggestion
                        </div>
                        <p className="text-[#1a5c38] dark:text-slate-200 text-sm font-semibold italic">
                          "{result.optimizationSuggestion}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-6 py-20">
                <div className="bg-white p-8 rounded-full shadow-inner border-2 border-dashed border-slate-200">
                  <SquareCode className="w-16 h-16 opacity-10" />
                </div>
                <div className="text-center max-w-sm">
                  <p className="text-xl font-bold text-slate-800 mb-2">Ready for Diagnosis</p>
                  <p className="text-sm">Input any formula above. I'll translate the syntax into a logical blueprint for your understanding.</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
