import { Camera, Save, RefreshCcw, ShieldCheck } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { useState } from 'react';

export const Transcripcion = () => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handlePhoto = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;
    
    // Mostramos la previsualización local
    setImagePreview(URL.createObjectURL(imageFile));

    const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1200, useWebWorker: true };
    try {
      setLoading(true);
      // Comprimir la imagen antes de subirla
      const compressed = await imageCompression(imageFile, options);
      console.log('Imagen comprimida lista:', (compressed.size / 1024).toFixed(2), 'KB');
    } catch (error) {
      console.error("Error al comprimir:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Digitalización de Actas</h1>
        <p className="text-slate-500 font-medium">Elecciones Subnacionales 2026 - Cochabamba</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl pb-10">
        {/* Panel Izquierdo: Foto */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2 italic text-red-600">
              <Camera size={20} /> Captura de Papeleta
            </h2>
            {loading && <div className="flex items-center gap-2 text-sm text-blue-600"><RefreshCcw className="animate-spin" size={16}/> Procesando...</div>}
          </div>
          
          <div className="flex-1 aspect-[3/4] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-4 text-center overflow-hidden relative">
            {imagePreview ? (
              <img src={imagePreview} alt="Acta" className="absolute inset-0 w-full h-full object-contain" />
            ) : (
              <label className="cursor-pointer group flex flex-col items-center">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Camera size={32} />
                </div>
                <span className="text-slate-600 font-bold block mb-1">Subir o Tomar Foto</span>
                <span className="text-slate-400 text-xs px-4">La imagen se optimizará automáticamente para la UMSS</span>
                <input type="file" className="hidden" onChange={handlePhoto} accept="image/*" capture="environment" />
              </label>
            )}
          </div>
        </div>

        {/* Panel Derecho: Formulario */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 h-fit">
          <h2 className="text-lg font-bold mb-8 flex items-center gap-2 border-b border-slate-100 pb-4">
            <ShieldCheck size={20} className="text-green-600" /> Transcripción de Votos
          </h2>
          <div className="space-y-5">
            <VoteField color="bg-blue-600" party="MAS - IPSP" />
            <VoteField color="bg-yellow-400" party="Comunidad Ciudadana" textColor="text-slate-900" />
            <VoteField color="bg-red-700" party="CREEMOS" />
            
            <div className="pt-8 mt-4 border-t border-slate-100">
               <div className="flex justify-between items-center mb-4 px-2">
                  <span className="font-bold text-slate-500 text-sm uppercase">Total Calculado</span>
                  <span className="font-black text-2xl text-slate-900">0</span>
               </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-100 transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer">
                <Save size={22} /> Guardar Acta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VoteField = ({ color, party, textColor = "text-white" }) => (
  <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors">
    <div className={`w-12 h-12 ${color} ${textColor} rounded-xl flex items-center justify-center font-black text-[10px] shadow-sm tracking-tighter leading-tight text-center p-1`}>
      {party}
    </div>
    <span className="flex-1 font-bold text-slate-700 text-sm">{party}</span>
    <input type="number" placeholder="0" className="w-24 bg-white border-2 border-slate-200 rounded-xl py-2 px-2 text-center font-bold text-xl text-slate-800 focus:border-red-500 outline-none transition-all shadow-sm" />
  </div>
);