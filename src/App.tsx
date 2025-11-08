import { CodeEditor } from './components/CodeEditor';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="text-center mb-12">
          <h1 
            className="mb-4 text-6xl tracking-tight"
            style={{
              background: 'linear-gradient(to bottom, #ffffff 0%, #a0a0a0 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: `
                0 1px 0 #ccc,
                0 2px 0 #c9c9c9,
                0 3px 0 #bbb,
                0 4px 0 #b9b9b9,
                0 5px 0 #aaa,
                0 6px 1px rgba(0,0,0,.1),
                0 0 5px rgba(0,0,0,.1),
                0 1px 3px rgba(0,0,0,.3),
                0 3px 5px rgba(0,0,0,.2),
                0 5px 10px rgba(0,0,0,.25),
                0 10px 10px rgba(0,0,0,.2),
                0 20px 20px rgba(0,0,0,.15)
              `,
              filter: 'drop-shadow(0 0 20px rgba(100, 150, 255, 0.3))',
            }}
          >
            code2image
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Transform your code into art. Make every snippet worth a thousand words.
          </p>
        </header>
        <CodeEditor />
      </div>
      <footer className="w-full py-6 text-center text-gray-400 text-sm">
        © caporalCoder
      </footer>
    </div>
  );
}
