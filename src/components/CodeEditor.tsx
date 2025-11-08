import { useState, useRef } from 'react';
import { CodePreview } from './CodePreview';
import { ControlPanel } from './ControlPanel';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

export type Theme = 'dracula' | 'monokai' | 'github-dark' | 'nord' | 'tokyo-night';
export type Language = 'javascript' | 'typescript' | 'python' | 'rust' | 'go' | 'html' | 'css' | 'java' | 'cpp';
export type BackgroundType = 'gradient' | 'solid' | 'transparent';

export interface EditorSettings {
  theme: Theme;
  language: Language;
  background: BackgroundType;
  showLineNumbers: boolean;
  showWindowControls: boolean;
  padding: number;
  fontFamily: string;
  customBackground: string;
  windowTitle: string;
  transparentEditor: boolean;
}

const defaultCode = `// Paste or write your code here
const multiply = (x,y) => {
  return x * y;
}

multiply(2,3);`;

export function CodeEditor() {
  const [code, setCode] = useState(defaultCode);
  const [settings, setSettings] = useState<EditorSettings>({
    theme: 'dracula',
    language: 'javascript',
    background: 'transparent',
    showLineNumbers: true,
    showWindowControls: true,
    padding: 64,
    fontFamily: 'mono',
    customBackground: '',
    windowTitle: '',
    transparentEditor: false,
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!previewRef.current) return;

    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = 'code-screenshot.png';
      link.href = dataUrl;
      link.click();
      
      toast.success('Image exported successfully!');
    } catch (err) {
      console.error('Failed to export image:', err);
      toast.error('Failed to export image');
    }
  };

  return (
    <div className="space-y-8">
      {/* Preview Area */}
      <div className="flex flex-col items-center">
        <CodePreview
          ref={previewRef}
          code={code}
          settings={settings}
          onCodeChange={setCode}
        />
        
        <Button 
          onClick={handleExport} 
          className="mt-8 gap-2 bg-transparent border-2 border-gray-600 hover:border-gray-400 text-white px-8 py-6 transition-all"
        >
          <Download className="w-5 h-5" />
          EXPORT PNG
        </Button>
      </div>

      {/* Control Panel */}
      <ControlPanel settings={settings} setSettings={setSettings} />
    </div>
  );
}
