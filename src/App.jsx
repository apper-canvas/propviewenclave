import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import Home from '@/components/pages/Home';
import PropertyDetail from '@/components/pages/PropertyDetail';
import SavedProperties from '@/components/pages/SavedProperties';
import MapView from '@/components/pages/MapView';

function App() {
  return (
    <div className="App min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="property/:id" element={<PropertyDetail />} />
          <Route path="saved" element={<SavedProperties />} />
          <Route path="map" element={<MapView />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;