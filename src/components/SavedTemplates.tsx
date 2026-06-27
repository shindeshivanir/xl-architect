import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Trash2, 
  Calendar, 
  ExternalLink, 
  Layers,
  Search,
  FileSpreadsheet,
  Lightbulb,
  Download,
  X
} from 'lucide-react';
import { getTemplates, deleteTemplate, type ChartTemplate } from '../data/templates';
import { ClearButton } from './Common';
import { exportFormulaToExcel } from '../lib/excelExport';

interface SavedTemplatesProps {
  onClose?: () => void;
}

export default function SavedTemplates({ onClose }: SavedTemplatesProps) {
  const [templates, setTemplates] = useState<ChartTemplate[]>([]);
  const [search, setSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTemplates(getTemplates());
  }, []);

  const handleDelete = (id: string) => {
    deleteTemplate(id);
    setTemplates(getTemplates());
  };

  const filtered = templates.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.suggestedType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[60vh] flex flex-col transition-colors">
        {/* Header */}
        <div className="bg-[#217346] dark:bg-[#1a5c38] p-6 md:p-12 text-white relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none hidden md:block">
            <Layers className="w-64 h-64" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="bg-white/20 p-2 md:p-3 rounded-2xl backdrop-blur-md">
                  <Layers className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-3xl font-black tracking-tight">Visual Templates</h2>
                  <p className="text-green-100/80 text-xs md:text-sm font-medium tracking-wide">Your library of pre-engineered data structures.</p>
                </div>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
                  aria-label="Close Templates"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              )}
            </div>

            <div className="mt-4 md:mt-8 relative max-w-2xl group">
              <div className="absolute inset-y-0 left-0 pl-4 md:pl-6 flex items-center pointer-events-none">
                <Search className="w-4 h-4 md:w-5 md:h-5 text-green-200" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="w-full bg-green-900/40 backdrop-blur-md border-2 border-white/20 rounded-2xl py-4 md:py-5 pl-12 md:pl-14 pr-12 md:pr-14 text-sm md:text-lg text-white placeholder:text-green-200/50 focus:border-white transition-all outline-none"
              />
              <div className="absolute right-4 inset-y-0 flex items-center">
                <ClearButton 
                  isVisible={search.length > 0} 
                  onClick={() => {
                    setSearch('');
                    searchInputRef.current?.focus();
                  }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 p-6 md:p-12 bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((t, idx) => (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group overflow-hidden"
                  >
                    <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#217346]/10 dark:bg-[#217346]/20 rounded-xl flex items-center justify-center text-[#217346] dark:text-green-500">
                          <BarChart3 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-800 dark:text-white leading-none mb-1">{t.name}</h4>
                          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-widest">{t.suggestedType}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => exportFormulaToExcel(t.setupGuidance, `${t.name}-Setup.xlsx`)}
                          className="text-[#217346] hover:bg-[#217346] hover:text-white transition-all p-2 rounded-lg bg-[#217346]/5"
                          title="Export Setup to Excel"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(t.id)}
                          className="text-slate-300 dark:text-slate-600 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#217346] dark:text-green-500 font-bold text-[9px] uppercase tracking-widest">
                          <FileSpreadsheet className="w-3 h-3" />
                          Data Configuration
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-xs font-medium leading-relaxed bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                          {t.setupGuidance}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500 font-bold text-[9px] uppercase tracking-widest">
                          <Lightbulb className="w-3 h-3" />
                          Design Standard
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed italic">
                          "{t.designTip}"
                        </p>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(t.savedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        Stored
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-6 py-20">
              <div className="bg-white p-8 rounded-full shadow-inner border-2 border-dashed border-slate-200">
                <Layers className="w-16 h-16 opacity-10" />
              </div>
              <div className="text-center max-w-sm">
                <p className="text-xl font-bold text-slate-800 mb-2">Template Vault Empty</p>
                <p className="text-sm italic">Generate a solution in the Architect and look for the "Save as Template" button in the visualization section.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
