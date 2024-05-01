import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import EditorPage from './Pages/EditorPage';
import { Toaster } from 'react-hot-toast';
import AccessibilityBar from './Components/AccessibilityBar';// Import your AccessibilityTab component

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: '#65A0FB;',
              },
            },
          }}
        ></Toaster>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor/:roomId' element={<EditorPageWithAccessibilityTab />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

// Define a new component that includes EditorPage and AccessibilityTab
const EditorPageWithAccessibilityTab = () => {
  return (
    <>
      <EditorPage />
      <AccessibilityBar  />
    </>
  );
};

export default App;
