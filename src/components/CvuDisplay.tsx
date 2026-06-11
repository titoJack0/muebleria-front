import React from 'react';

export const CvuDisplay: React.FC = () => {
  // Placeholder CVU – replace with dynamic value from API if needed
  const cvu = '1234-5678-9012-3456';
  return (
    <div className="cvu-container bg-white p-4 rounded shadow-md mt-4 mx-auto max-w-xs">
      <h3 className="text-lg font-semibold mb-2">CVU para depósito</h3>
      <p className="font-mono text-xl text-center" style={{ letterSpacing: '0.1rem' }}>{cvu}</p>
      <p className="text-sm text-gray-600 mt-2 text-center">
        Realiza el depósito y luego el administrador aprobará tu pago.
      </p>
    </div>
  );
};
