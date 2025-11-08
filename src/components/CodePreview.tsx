import { forwardRef, useRef, useEffect } from 'react';
import { EditorSettings } from './CodeEditor';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  dracula,
  atomDark,
  nord,
  oneDark,
  vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

const themeMap = {
  dracula: dracula,
  monokai: atomDark,
  'github-dark': vscDarkPlus,
  nord: nord,
  'tokyo-night': oneDark,
};

interface CodePreviewProps {
  code: string;
  settings: EditorSettings;
  onCodeChange: (code: string) => void;
}

export const CodePreview = forwardRef<HTMLDivElement, CodePreviewProps>(
  ({ code, settings, onCodeChange }, ref) => {
    const selectedTheme = themeMap[settings.theme];
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    const backgroundStyle = settings.background === 'transparent'
      ? { backgroundColor: 'transparent' }
      : settings.background === 'gradient' 
      ? { background: settings.customBackground }
      : { backgroundColor: settings.customBackground || '#1a1a2e' };

    const fontFamilyStyle = settings.fontFamily === 'mono' 
      ? 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
      : settings.fontFamily === 'jetbrains' 
      ? 'JetBrains Mono, monospace'
      : 'Fira Code, monospace';

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    }, [code]);

    const editorBackgroundStyle = settings.transparentEditor 
      ? { backgroundColor: 'transparent' }
      : {};

    return (
      <div 
        ref={ref}
        className="inline-block"
        style={{
          ...backgroundStyle,
          padding: `${settings.padding}px`,
          minWidth: '600px',
        }}
      >
        <div 
          className="rounded-xl overflow-hidden shadow-2xl"
          style={{
            ...editorBackgroundStyle,
          }}
        >
          {settings.showWindowControls && (
            <div 
              className="px-4 py-3 flex items-center gap-2"
              style={{
                backgroundColor: settings.transparentEditor ? 'rgba(0,0,0,0.3)' : selectedTheme.hljs?.background || '#282a36',
                backdropFilter: settings.transparentEditor ? 'blur(10px)' : 'none',
              }}
            >
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              {settings.windowTitle && (
                <span className="ml-2 text-gray-400 text-xs font-mono">{settings.windowTitle}</span>
              )}
            </div>
          )}
          <div 
            className="relative"
            style={{
              backgroundColor: settings.transparentEditor ? 'rgba(0,0,0,0.2)' : selectedTheme.hljs?.background || '#282a36',
            }}
          >
            {/* Syntax highlighted overlay */}
            <div className="pointer-events-none">
              <SyntaxHighlighter
                language={settings.language}
                style={selectedTheme}
                showLineNumbers={settings.showLineNumbers}
                customStyle={{
                  margin: 0,
                  background: 'transparent',
                  fontFamily: fontFamilyStyle,
                  fontSize: '14px',
                  lineHeight: '1.6',
                  padding: '20px',
                }}
                codeTagProps={{
                  style: {
                    fontFamily: fontFamilyStyle,
                  }
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
            
            {/* Editable textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white resize-none focus:outline-none font-mono p-5"
              style={{
                fontFamily: fontFamilyStyle,
                fontSize: '14px',
                lineHeight: '1.6',
                caretColor: 'white',
                padding: settings.showLineNumbers ? '20px 20px 20px 50px' : '20px',
              }}
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    );
  }
);

CodePreview.displayName = 'CodePreview';
