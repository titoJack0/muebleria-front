import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import type { Product } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

// Vista de gestión de inventario para Administradores
export const Inventory: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Hook para react-dropzone (arrastrar y soltar imágenes)
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-wood-dark">Inventory</h1>
          <p className="text-earth">Manage your products and stock.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Tabla de Productos Simulada */}
      <div className="overflow-hidden rounded-sm border border-wood/10 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-earth">
          <thead className="bg-offWhite font-serif text-wood-dark">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Wood Type</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-wood/10">
            <tr>
              <td className="px-6 py-4 font-medium text-wood-dark">Premium Oak Table</td>
              <td className="px-6 py-4">Oak</td>
              <td className="px-6 py-4">$850.00</td>
              <td className="px-6 py-4">5</td>
              <td className="px-6 py-4"><span className="rounded-full bg-olive/10 px-2.5 py-0.5 text-xs font-medium text-olive">Active</span></td>
              <td className="px-6 py-4 text-right">
                <button className="mr-3 text-wood hover:text-gold"><Edit2 className="h-4 w-4" /></button>
                <button className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal para Crear/Editar Producto */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-deepBlack/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-2xl rounded-sm bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="mb-6 flex items-center justify-between border-b border-wood/10 pb-4">
                <h2 className="font-serif text-2xl font-bold text-wood-dark">Add New Product</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-wood hover:text-gold">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Product Name" placeholder="e.g. Classic Walnut Chair" />
                  <Input label="Price" type="number" placeholder="0.00" />
                  <Input label="Stock" type="number" placeholder="0" />
                  <Input label="Wood Type" placeholder="e.g. Walnut" />
                </div>
                
                {/* Zona de Dropzone para Imagen */}
                <div>
                  <label className="text-sm font-medium text-wood-dark mb-1.5 block">Product Image</label>
                  <div 
                    {...getRootProps()} 
                    className={`flex h-32 cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed transition-colors ${
                      isDragActive ? 'border-gold bg-gold/5' : 'border-wood/30 bg-offWhite hover:bg-wood/5'
                    }`}
                  >
                    <input {...getInputProps()} />
                    {selectedFile ? (
                      <p className="text-sm font-medium text-wood">{selectedFile.name}</p>
                    ) : (
                      <p className="text-sm text-earth">Drag & drop an image here, or click to select</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-wood/10">
                  <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button>Save Product</Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
