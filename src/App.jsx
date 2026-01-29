import { Sidebar } from './components/Sidebar';
import { Transcripcion } from './pages/Transcripcion';

function App() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Transcripcion />
      </main>
    </div>
  );
}

export default App;