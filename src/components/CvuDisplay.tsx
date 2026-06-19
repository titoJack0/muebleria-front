import React from 'react';

interface CvuDisplayProps {
  cvu: string;
  alias: string;
  holderName: string;
}

export const CvuDisplay: React.FC<CvuDisplayProps> = ({ cvu, alias, holderName }) => {
  return (
    <div className="cvu-container bg-surface p-5 rounded-md border border-border mt-4 max-w-md shadow-sm">
      <h3 className="text-base font-serif font-bold text-wood-dark mb-3">Datos para el Depósito / Transferencia</h3>

      <div className="space-y-2 text-sm text-earth">
        <p>
          <strong className="text-wood-dark">Titular:</strong> {holderName}
        </p>
        <p className="flex flex-col sm:flex-row sm:justify-between items-start gap-1">
          <span><strong className="text-wood-dark">CVU:</strong> <code className="font-mono bg-white px-2 py-0.5 border rounded-sm text-sm">{cvu}</code></span>
          <button
            onClick={() => { navigator.clipboard.writeText(cvu); alert('CVU copiado'); }}
            className="text-xs text-accent underline hover:text-accentHover"
          >
            Copiar
          </button>
        </p>
        <p className="flex flex-col sm:flex-row sm:justify-between items-start gap-1">
          <span><strong className="text-wood-dark">Alias:</strong> <code className="font-mono bg-white px-2 py-0.5 border rounded-sm text-sm">{alias}</code></span>
          <button
            onClick={() => { navigator.clipboard.writeText(alias); alert('Alias copiado'); }}
            className="text-xs text-accent underline hover:text-accentHover"
          >
            Copiar
          </button>
        </p>
      </div>

      <p className="text-xs text-earth/70 mt-4 border-t border-wood/10 pt-3 italic">
        Realiza el depósito por el total indicado y luego el administrador validará tu pago para procesar el envío.
      </p>
    </div>
  );
};