export interface Shortcut {
  key: string;
  macKey: string;
  description: string;
  category: ShortcutCategory;
}

export type ShortcutCategory = 
  | 'General'
  | 'Editing'
  | 'Formatting'
  | 'Navigation'
  | 'Formulas'
  | 'Data'
  | 'Selection';

export const SHORTCUT_CATEGORIES: ShortcutCategory[] = [
  'General',
  'Editing',
  'Formatting',
  'Navigation',
  'Formulas',
  'Data',
  'Selection'
];

export const EXCEL_SHORTCUTS: Shortcut[] = [
  // General
  { key: 'Ctrl + N', macKey: 'Cmd + N', description: 'Create a new workbook', category: 'General' },
  { key: 'Ctrl + O', macKey: 'Cmd + O', description: 'Open an existing workbook', category: 'General' },
  { key: 'Ctrl + S', macKey: 'Cmd + S', description: 'Save the workbook', category: 'General' },
  { key: 'F12', macKey: 'Cmd + Shift + S', description: 'Save as', category: 'General' },
  { key: 'Ctrl + P', macKey: 'Cmd + P', description: 'Print the current sheet', category: 'General' },
  { key: 'Ctrl + Z', macKey: 'Cmd + Z', description: 'Undo the last action', category: 'General' },
  { key: 'Ctrl + Y', macKey: 'Cmd + Y', description: 'Redo the last action', category: 'General' },
  { key: 'Alt + F4', macKey: 'Cmd + Q', description: 'Close Excel', category: 'General' },
  
  // Selection
  { key: 'Ctrl + A', macKey: 'Cmd + A', description: 'Select the entire worksheet', category: 'Selection' },
  { key: 'Shift + Space', macKey: 'Shift + Space', description: 'Select the entire row', category: 'Selection' },
  { key: 'Ctrl + Space', macKey: 'Ctrl + Space', description: 'Select the entire column', category: 'Selection' },
  { key: 'Shift + Arrow', macKey: 'Shift + Arrow', description: 'Extend the selection by one cell', category: 'Selection' },
  { key: 'Ctrl + Shift + Arrow', macKey: 'Cmd + Shift + Arrow', description: 'Extend selection to the last non-empty cell', category: 'Selection' },
  
  // Editing
  { key: 'F2', macKey: 'Ctrl + U', description: 'Edit the active cell', category: 'Editing' },
  { key: 'Ctrl + C', macKey: 'Cmd + C', description: 'Copy selected cells', category: 'Editing' },
  { key: 'Ctrl + X', macKey: 'Cmd + X', description: 'Cut selected cells', category: 'Editing' },
  { key: 'Ctrl + V', macKey: 'Cmd + V', description: 'Paste copied or cut cells', category: 'Editing' },
  { key: 'Ctrl + Alt + V', macKey: 'Cmd + Ctrl + V', description: 'Open Paste Special dialog', category: 'Editing' },
  { key: 'Delete', macKey: 'Delete', description: 'Clear cell contents', category: 'Editing' },
  { key: 'Ctrl + D', macKey: 'Cmd + D', description: 'Fill down (copy from cell above)', category: 'Editing' },
  { key: 'Ctrl + R', macKey: 'Cmd + R', description: 'Fill right (copy from cell to the left)', category: 'Editing' },
  { key: 'Ctrl + F', macKey: 'Cmd + F', description: 'Find', category: 'Editing' },
  { key: 'Ctrl + H', macKey: 'Cmd + H', description: 'Find and Replace', category: 'Editing' },
  
  // Formatting
  { key: 'Ctrl + B', macKey: 'Cmd + B', description: 'Apply or remove bold formatting', category: 'Formatting' },
  { key: 'Ctrl + I', macKey: 'Cmd + I', description: 'Apply or remove italic formatting', category: 'Formatting' },
  { key: 'Ctrl + U', macKey: 'Cmd + U', description: 'Apply or remove underlining', category: 'Formatting' },
  { key: 'Ctrl + 1', macKey: 'Cmd + 1', description: 'Open Format Cells dialog', category: 'Formatting' },
  { key: 'Ctrl + Shift + ~', macKey: 'Ctrl + Shift + ~', description: 'Apply General number format', category: 'Formatting' },
  { key: 'Ctrl + Shift + $', macKey: 'Ctrl + Shift + $', description: 'Apply Currency format', category: 'Formatting' },
  { key: 'Ctrl + Shift + %', macKey: 'Ctrl + Shift + %', description: 'Apply Percentage format', category: 'Formatting' },
  { key: 'Alt + H, B', macKey: 'Cmd + Option + 0', description: 'Add borders', category: 'Formatting' },

  // Navigation
  { key: 'Ctrl + Home', macKey: 'Cmd + Home', description: 'Move to the beginning of the worksheet (A1)', category: 'Navigation' },
  { key: 'Ctrl + End', macKey: 'Cmd + End', description: 'Move to the last used cell on the worksheet', category: 'Navigation' },
  { key: 'Ctrl + Page Up', macKey: 'Cmd + Page Up', description: 'Move to the previous sheet', category: 'Navigation' },
  { key: 'Ctrl + Page Down', macKey: 'Cmd + Page Down', description: 'Move to the next sheet', category: 'Navigation' },
  { key: 'Alt + Page Up', macKey: 'Option + Page Up', description: 'Move one screen to the left', category: 'Navigation' },
  { key: 'Alt + Page Down', macKey: 'Option + Page Down', description: 'Move one screen to the right', category: 'Navigation' },
  { key: 'Tab', macKey: 'Tab', description: 'Move to the next cell in a row', category: 'Navigation' },
  { key: 'Shift + Tab', macKey: 'Shift + Tab', description: 'Move to the previous cell in a row', category: 'Navigation' },

  // Formulas
  { key: '=', macKey: '=', description: 'Start a formula', category: 'Formulas' },
  { key: 'Alt + =', macKey: 'Cmd + Shift + T', description: 'Insert AutoSum formula', category: 'Formulas' },
  { key: 'Ctrl + `', macKey: 'Ctrl + `', description: 'Toggle between cell values and formulas', category: 'Formulas' },
  { key: 'F4', macKey: 'Cmd + T', description: 'Cycle through absolute/relative references', category: 'Formulas' },
  { key: 'Ctrl + Shift + Enter', macKey: 'Cmd + Shift + Enter', description: 'Enter an array formula', category: 'Formulas' },
  { key: 'Ctrl + A (in formula)', macKey: 'Cmd + A', description: 'Display Function Arguments dialog', category: 'Formulas' },

  // Data
  { key: 'Alt + A + T', macKey: 'Cmd + Shift + F', description: 'Toggle filtering', category: 'Data' },
  { key: 'Alt + A + S', macKey: 'Cmd + Shift + R', description: 'Sort Data (Custom)', category: 'Data' },
  { key: 'Alt + G + G', macKey: 'Cmd + Option + G', description: 'Group rows or columns', category: 'Data' },
  { key: 'Alt + G + U', macKey: 'Cmd + Option + U', description: 'Ungroup rows or columns', category: 'Data' }
];
