import { EditorSettings, Theme, Language, BackgroundType } from './CodeEditor';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';

interface ControlPanelProps {
  settings: EditorSettings;
  setSettings: (settings: EditorSettings) => void;
}

export function ControlPanel({ settings, setSettings }: ControlPanelProps) {
  const updateSetting = <K extends keyof EditorSettings>(
    key: K,
    value: EditorSettings[K]
  ) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="bg-[#0f1419] border border-gray-800 rounded-lg p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {/* Theme */}
        <div className="space-y-2">
          <Label className="text-gray-400 text-sm">Theme</Label>
          <Select
            value={settings.theme}
            onValueChange={(value) => updateSetting('theme', value as Theme)}
          >
            <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dracula">Dracula</SelectItem>
              <SelectItem value="monokai">Monokai</SelectItem>
              <SelectItem value="github-dark">GitHub Dark</SelectItem>
              <SelectItem value="nord">Nord</SelectItem>
              <SelectItem value="tokyo-night">Tokyo Night</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <Label className="text-gray-400 text-sm">Language</Label>
          <Select
            value={settings.language}
            onValueChange={(value) => updateSetting('language', value as Language)}
          >
            <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="rust">Rust</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="go">Go</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Window Title */}
        <div className="space-y-2">
          <Label className="text-gray-400 text-sm">Window Title</Label>
          <input
            type="text"
            placeholder="index.js"
            value={settings.windowTitle}
            onChange={(e) => updateSetting('windowTitle', e.target.value)}
            className="w-full h-10 bg-[#1a1f2e] border border-gray-700 rounded px-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gray-500"
          />
        </div>

        {/* Window Controls */}
        <div className="space-y-2">
          <Label className="text-gray-400 text-sm">Window Controls</Label>
          <Select
            value={settings.showWindowControls ? 'color' : 'none'}
            onValueChange={(value) => updateSetting('showWindowControls', value === 'color')}
          >
            <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="color">Color</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Line Numbers */}
        <div className="space-y-2">
          <Label className="text-gray-400 text-sm">Line Numbers</Label>
          <div className="flex items-center h-10">
            <Switch
              checked={settings.showLineNumbers}
              onCheckedChange={(checked) => updateSetting('showLineNumbers', checked)}
            />
          </div>
        </div>

        {/* Transparent Editor */}
        <div className="space-y-2">
          <Label className="text-gray-400 text-sm">Transparent Editor</Label>
          <div className="flex items-center h-10">
            <Switch
              checked={settings.transparentEditor}
              onCheckedChange={(checked) => updateSetting('transparentEditor', checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
