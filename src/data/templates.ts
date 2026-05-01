export interface ChartTemplate {
  id: string;
  name: string;
  suggestedType: string;
  setupGuidance: string;
  designTip: string;
  savedAt: number;
}

export const saveTemplate = (template: Omit<ChartTemplate, 'id' | 'savedAt'>) => {
  const templates = getTemplates();
  const newTemplate: ChartTemplate = {
    ...template,
    id: Math.random().toString(36).substring(2, 9),
    savedAt: Date.now(),
  };
  localStorage.setItem('xl_chart_templates', JSON.stringify([newTemplate, ...templates]));
  return newTemplate;
};

export const getTemplates = (): ChartTemplate[] => {
  const stored = localStorage.getItem('xl_chart_templates');
  return stored ? JSON.parse(stored) : [];
};

export const deleteTemplate = (id: string) => {
  const templates = getTemplates().filter(t => t.id !== id);
  localStorage.setItem('xl_chart_templates', JSON.stringify(templates));
};
