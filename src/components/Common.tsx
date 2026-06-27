import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, CheckCircle2, X } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
  iconSize?: number;
}

export function CopyButton({ text, className = '', iconSize = 16 }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`relative p-2 rounded-lg transition-all flex items-center gap-2 group ${className}`}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <CheckCircle2 className="text-green-500" size={iconSize} />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <Copy size={iconSize} />
          </motion.div>
        )}
      </AnimatePresence>
      {copied && (
        <motion.span
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 5 }}
          className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded pointer-events-none whitespace-nowrap"
        >
          Copied!
        </motion.span>
      )}
    </button>
  );
}

interface ModalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function ModalOverlay({ isOpen, onClose, children }: ModalOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl h-full sm:h-auto max-h-screen sm:max-h-[90vh] overflow-y-auto no-scrollbar sm:rounded-[2.5rem] shadow-2xl bg-white dark:bg-slate-900"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface ClearButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

export function ClearButton({ onClick, isVisible }: ClearButtonProps) {
  if (!isVisible) return null;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="absolute right-3 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-white/10 rounded-lg backdrop-blur-sm"
    >
      <X size={16} />
    </button>
  );
}
