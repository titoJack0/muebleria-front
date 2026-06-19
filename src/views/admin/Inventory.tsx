import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

export const Inventory: React.FC = () => {
  // Estado de los productos y la carga
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Estados del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Estados para el formulario
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [woodType, setWoodType] = useState('');

  // Estado para la petición de guardado
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los productos del Backend (Laravel)
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await api.get('/products');
      // Si usas Resource en Laravel, los datos suelen venir dentro de "data"
      const data = response.data.data || response.data;
      setProducts(data);
    } catch (error) {
      console.error('Error cargando los productos:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Cargar productos al iniciar la vista
  useEffect(() => {
    fetchProducts();
  }, []);

  // Hook para react-dropzone
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

  const resetForm = () => {
    setEditingId(null); // <-- LIMPIAR EL ID
    setName('');
    setPrice('');
    setStock('');
    setWoodType('');
    setSelectedFile(null);
    setError(null);
    setIsModalOpen(false);
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
    setWoodType(product.wood_type || '');
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async () => {
    if (!name || !price || !stock) {
      setError('Por favor, completa los campos obligatorios (Nombre, Precio, Stock).');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('slug', name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
      formData.append('price', price);
      formData.append('stock', stock);
      if (woodType) formData.append('wood_type', woodType);

      formData.append('status', 'active');
      formData.append('category_id', '1');

      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      if (editingId) {
        // MODO EDICIÓN
        // Truco de Laravel: Enviamos como POST pero le decimos que actúe como PUT
        formData.append('_method', 'PUT');

        await api.post(`/products/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Producto actualizado con éxito');
      } else {
        // MODO CREACIÓN
        await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Producto guardado con éxito');
      }

      resetForm();
      fetchProducts();

    } catch (e: any) {
      console.error(e);
      setError(e.response?.data?.message || 'Error al guardar el producto.');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para eliminar un producto
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await api.delete(`/products/${id}`);
        // Filtramos el producto eliminado del estado para no hacer otra petición a la API
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Hubo un error al eliminar el producto.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-wood-dark">Inventory</h1>
          <p className="text-earth">Manage your products and stock.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* TABLA DE PRODUCTOS */}
      <div className="overflow-x-auto rounded-sm border border-wood/10 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-offWhite border-b border-wood/10 text-wood-dark">
            <tr>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadingProducts ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-earth">
                  <Loader2 className="animate-spin h-6 w-6 mx-auto mb-2" />
                  Cargando productos...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-earth">
                  No hay productos registrados en la base de datos.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-wood/5 hover:bg-offWhite/50 transition-colors">

                  {/* COLUMNA 1: PRODUCTO */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-sm bg-wood/10 overflow-hidden flex-shrink-0">
                        {/* Buscamos la primera imagen en el arreglo 'images' */}
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={`http://127.0.0.1:8000${product.images[0].url}`}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-wood/30 text-xs">No img</div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-wood-dark">{product.name}</p>
                        <p className="text-xs text-earth">{product.wood_type || 'N/A'}</p>
                      </div>
                    </div>
                  </td>

                  {/* COLUMNA 2: PRECIO */}
                  <td className="p-4 text-wood-dark">${Number(product.price).toFixed(2)}</td>

                  {/* COLUMNA 3: STOCK */}
                  <td className="p-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${product.stock > 10 ? 'bg-green-100 text-green-700' :
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                      {product.stock} in stock
                    </span>
                  </td>

                  {/* COLUMNA 4: ESTADO */}
                  <td className="p-4">
                    <span className="capitalize text-earth">{product.status}</span>
                  </td>

                  {/* COLUMNA 5: ACCIONES (AQUÍ VAN LOS BOTONES) */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">

                      {/* Botón Editar */}
                      <button
                        onClick={() => handleEdit(product)}
                        className="rounded p-2 text-wood hover:bg-wood/10 hover:text-wood-dark transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>

                      {/* Botón Eliminar */}
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded p-2 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para Crear Producto */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={resetForm}
              className="absolute inset-0 bg-deepBlack/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-2xl rounded-sm bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="mb-6 flex items-center justify-between border-b border-wood/10 pb-4">
                {/* Título del Modal Dinámico */}
                <h2 className="font-serif text-2xl font-bold text-wood-dark">
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={resetForm} className="text-wood hover:text-gold transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded text-sm border border-red-200">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Product Name *"
                    placeholder="e.g. Classic Walnut Chair"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    label="Price *"
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <Input
                    label="Stock *"
                    type="number"
                    placeholder="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                  <Input
                    label="Wood Type"
                    placeholder="e.g. Walnut"
                    value={woodType}
                    onChange={(e) => setWoodType(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-wood-dark mb-1.5 block">Product Image</label>
                  <div
                    {...getRootProps()}
                    className={`flex h-32 cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed transition-colors ${isDragActive ? 'border-gold bg-gold/5' : 'border-wood/30 bg-offWhite hover:bg-wood/5'
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
                  <Button variant="ghost" onClick={resetForm} disabled={isLoading}>Cancel</Button>
                  <Button onClick={handleSaveProduct} disabled={isLoading}>
                    {isLoading ? <span className="flex gap-2 items-center"><Loader2 className="animate-spin w-4 h-4" /> Guardando...</span> : 'Save Product'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};