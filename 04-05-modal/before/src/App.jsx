import { useState } from "react";
import { CustomModal } from "./components/CustomModal";

function App() {
  const [showCustomModal, setShowCustomModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowCustomModal(true)}>Show Custom Modal</button>
      <br />
      <button>Show Dialog Modal</button>
      <CustomModal isOpen={showCustomModal} onClose={() => setShowCustomModal(false)}>
        <p>
          This is a <strong>CUSTOM</strong> modal
        </p>
        <button onClick={() => setShowCustomModal(false)}>Close</button>
      </CustomModal>
    </>
  );
}

export default App;
