import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ExcelSolution {
  goal: string;
  solution: string;
  navigationSteps: string[];
  shortcuts: {
    windows: string;
    mac: string;
  };
  humanReadableLogic: string;
  dataRequirement?: string;
  errorAnalysis?: {
    errorCode: string;
    explanation: string;
  };
  visualization?: {
    suggestedType: string;
    why: string;
    designTip: string;
    setupGuidance: string;
  };
  proTip: string;
}

export interface ConditionalFormattingSolution {
  goal: string;
  ruleType: string;
  formula: string | null;
  navigationSteps: string[];
  designAdvice: string;
  proTip: string;
}

export interface FormulaDebugResult {
  originalFormula: string;
  parts: {
    segment: string;
    explanation: string;
    role: "function" | "parameter" | "operator" | "reference" | "constant";
  }[];
  overallLogic: string;
  commonPitfalls: string[];
  optimizationSuggestion?: string;
}

export async function getExcelGuidance(prompt: string): Promise<ExcelSolution> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Transform this Excel request into a structured architectural guide. Target: Office 365 / Latest Excel.
    
    User Request: ${prompt}`,
    config: {
      systemInstruction: `You are "XL-Architect," the world's most intelligent Excel AI Companion. 
      Your goal is to guide users through Excel—formulas, shortcuts, data visualization, and management.
      
      ADVANCED REASONING DIRECTIVES:
      1. Analyze for Errors: If the user describes a formula that isn't working, identify the EXACT Excel error code (e.g., #VALUE!, #REF!, #N/A) and explain why.
      2. Visual Mapping: In navigation steps, describe icons clearly (e.g., "The icon looks like a small blue grid with a gear").
      3. Data-Specific Logic: For complex formulas, explicitly ask: "What are your column headers?" in the dataRequirement field.
      4. Interactive Formatting: Use bold text for shortcuts and code blocks (backticks) for formulas.
      5. Simplicity First: Prefer 'New Excel' features (Power Query, Dynamic Arrays like XLOOKUP, FILTER, UNIQUE) over nested legacy functions.
      6. Visualization Priority: If the user mentions "chart", "graph", "trend", "visual", "dashboard", or "pivot", you MUST provide a detailed "visualization" object.
      
      Schema:
      - goal: The user's intent.
      - solution: Direct formula or feature name. Use backticks for formulas.
      - navigationSteps: List of steps in UI. Describe the visual icons (e.g. "small green chart icon").
      - shortcuts: Windows and Mac shortcut keys. Use bold text.
      - humanReadableLogic: Explanation in plain English.
      - dataRequirement: (Optional) If complex, ask for headers here.
      - errorAnalysis: (Optional) Identify specific error codes if troubleshooting.
      - visualization: (Optional) Chart type, reasoning, setup guidance (how to prep data), and design tip.
      - proTip: A clever "secret" or optimization.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["goal", "solution", "navigationSteps", "shortcuts", "humanReadableLogic", "proTip"],
        properties: {
          goal: { type: Type.STRING },
          solution: { type: Type.STRING },
          navigationSteps: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          shortcuts: {
            type: Type.OBJECT,
            properties: {
              windows: { type: Type.STRING },
              mac: { type: Type.STRING }
            }
          },
          humanReadableLogic: { type: Type.STRING },
          dataRequirement: { type: Type.STRING },
          errorAnalysis: {
            type: Type.OBJECT,
            properties: {
              errorCode: { type: Type.STRING },
              explanation: { type: Type.STRING }
            }
          },
          visualization: {
            type: Type.OBJECT,
            properties: {
              suggestedType: { type: Type.STRING },
              why: { type: Type.STRING },
              designTip: { type: Type.STRING },
              setupGuidance: { type: Type.STRING }
            }
          },
          proTip: { type: Type.STRING }
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from XL-Architect");
  return JSON.parse(text);
}

export async function getConditionalFormattingGuidance(prompt: string): Promise<ConditionalFormattingSolution> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Provide step-by-step guidance for this Excel conditional formatting requirement.
    
    Requirement: ${prompt}`,
    config: {
      systemInstruction: `You are the "XL-Formatter," an expert in Excel conditional formatting and logical styling.
      Provide the exact rule type, any necessary custom formulas, and the navigation path to apply it.
      
      Schema:
      - goal: Summary of formatting intent.
      - ruleType: The specific rule category (e.g., "Highlight Cell Rules", "Use a formula to determine...").
      - formula: (Optional) The custom formula used if applicable.
      - navigationSteps: List of clicks required.
      - designAdvice: Tips on color choices and readability.
      - proTip: Performance or advanced usage trick.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["goal", "ruleType", "navigationSteps", "designAdvice", "proTip"],
        properties: {
          goal: { type: Type.STRING },
          ruleType: { type: Type.STRING },
          formula: { type: Type.STRING, nullable: true },
          navigationSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          designAdvice: { type: Type.STRING },
          proTip: { type: Type.STRING }
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No formatting response from XL-Architect");
  return JSON.parse(text);
}

export async function debugFormula(formula: string): Promise<FormulaDebugResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Deconstruct this Excel formula into its constituent parts and explain each.
    
    Formula: ${formula}`,
    config: {
      systemInstruction: `You are the "XL-Debugger," specialized in decompressing complex Excel formulas.
      Break the formula down into logical segments. For each segment, identify its role and explain exactly what it does in context.
      
      Definitions of Roles:
      - function: A built-in Excel function (e.g., VLOOKUP, SUM).
      - parameter: An argument passed to a function.
      - operator: Symbols like +, -, *, /, &, or comparisons.
      - reference: Cell or range references (e.g., A1, $B$10:C20).
      - constant: Set values like "Paid" or 100.
      
      Output MUST strictly follow the JSON schema.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["originalFormula", "parts", "overallLogic", "commonPitfalls"],
        properties: {
          originalFormula: { type: Type.STRING },
          parts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["segment", "explanation", "role"],
              properties: {
                segment: { type: Type.STRING },
                explanation: { type: Type.STRING },
                role: { 
                  type: Type.STRING,
                  enum: ["function", "parameter", "operator", "reference", "constant"]
                }
              }
            }
          },
          overallLogic: { type: Type.STRING },
          commonPitfalls: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          optimizationSuggestion: { type: Type.STRING }
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No debugger response from XL-Architect");
  return JSON.parse(text);
}
