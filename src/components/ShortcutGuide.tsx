import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Keyboard, 
  X, 
  Filter, 
  Laptop, 
  Apple,
  ArrowRight,
} from 'lucide-react';
import { EXCEL_SHORTCUTS, SHORTCUT_CATEGORIES, type ShortcutCategory } from '../data/shortcuts';
import { ClearButton, CopyButton } from './Common';

interface ShortcutGuideProps {
  onClose?: () => void;
}

export default function ShortcutGuide({ onClose }: ShortcutGuideProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ShortcutCategory | 'All'>('All');
  const [isMac, setIsMac] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredShortcuts = useMemo(() => {
    return EXCEL_SHORTCUTS.filter(s => {
      const matchesSearch = s.description.toLowerCase().includes(search.toLowerCase()) || 
                           s.key.toLowerCase().includes(search.toLowerCase()) ||
                           s.macKey.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-5xl mx-auto w-full"
    >
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[70vh] flex flex-col transition-colors">
        {/* Top Header Section */}
        <div className="bg-[#217346] dark:bg-[#1a5c38] p-6 md:p-12 text-white relative transition-colors">
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <Keyboard className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Shortcut Repository</h2>
                <p className="text-green-100/80 text-sm font-medium tracking-wide">Accelerate your workflow with precision commands.</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-2">
              <button 
                onClick={() => setIsMac(!isMac)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition-all border border-white/10"
              >
                {isMac ? <Apple className="w-3.5 h-3.5" /> : <Laptop className="w-3.5 h-3.5" />}
                <span className="text-[10px] font-bold uppercase tracking-wider">{isMac ? 'To Windows' : 'To Mac'}</span>
              </button>
              {onClose && (
                <button 
                  onClick={onClose}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Search Input Container */}
          <div className="relative max-w-2xl group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-green-200" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by action or keys..."
              className="w-full bg-green-900/40 backdrop-blur-md border-2 border-white/20 rounded-2xl py-4 md:py-5 pl-14 pr-14 text-base md:text-lg text-white placeholder:text-green-200/50 focus:border-white focus:bg-green-900/60 transition-all outline-none shadow-xl"
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

        {/* Categories Bar */}
        <div className="px-6 md:px-8 py-3 md:py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 overflow-hidden">
          <div className="flex items-center gap-2 text-[#217346] dark:text-green-500 font-bold text-[10px] uppercase tracking-[0.2em] shrink-0">
            <Filter className="w-4 h-4" />
            Categories
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-2 px-2 md:mx-0 md:px-0">
            {['All', ...SHORTCUT_CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-[#217346] dark:bg-[#28a162] text-white shadow-lg shadow-[#217346]/20' 
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-[#217346] dark:hover:border-green-500 hover:text-[#217346] dark:hover:text-green-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12">
          {filteredShortcuts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredShortcuts.map((shortcut, idx) => (
                  <motion.div
                    key={shortcut.description}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.02 }}
                    className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[#217346]/30 dark:hover:border-green-500/30 transition-all cursor-default relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-5 transition-opacity">
                      <Keyboard className="w-12 h-12" />
                    </div>
                    
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <span className="inline-block px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                          {shortcut.category}
                        </span>
                        <h4 className="text-slate-800 dark:text-slate-100 font-bold leading-tight group-hover:text-[#217346] dark:group-hover:text-green-500 transition-colors">
                          {shortcut.description}
                        </h4>
                      </div>

                      <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-slate-900 dark:bg-slate-800 px-3 py-2 rounded-lg shadow-inner group-hover:bg-[#217346] dark:group-hover:bg-[#28a162] transition-colors">
                            <code className="text-green-400 font-mono text-sm font-bold tracking-wider">
                              {isMac ? shortcut.macKey : shortcut.key}
                            </code>
                          </div>
                          <CopyButton 
                            text={isMac ? shortcut.macKey : shortcut.key}
                            className="p-2 text-slate-300 dark:text-slate-600 hover:text-[#217346] dark:hover:text-green-500 transition-colors opacity-0 group-hover:opacity-100"
                          />
                        </div>
                        <div className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest flex items-center gap-1 group-hover:text-slate-400 dark:group-hover:text-slate-500">
                          {isMac ? <Apple className="w-3 h-3" /> : <Laptop className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 space-y-4 py-20">
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-full border-2 border-dashed border-slate-200 dark:border-slate-800">
                <Search className="w-12 h-12 opacity-20" />
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-slate-800 dark:text-white">No shortcuts found</p>
                <p className="text-sm">Try adjusting your search or category filter.</p>
              </div>
              <button 
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="text-[#217346] dark:text-green-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:underline"
              >
                Clear all filters <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Banner */}
        <div className="bg-slate-900 border-t border-white/5 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <Filter className="w-5 h-5 text-green-400" />
             </div>
             <div>
                <p className="text-white font-bold text-sm leading-none">Smart Filtering Enabled</p>
                <p className="text-slate-500 text-xs">Instantly narrowing down {EXCEL_SHORTCUTS.length} commands.</p>
             </div>
           </div>
           <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">
             Repository V.1.0 &bull; 2024 Stable
           </div>
        </div>
      </div>
    </motion.div>
  );
}
