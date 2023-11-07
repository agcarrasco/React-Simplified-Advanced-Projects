import { useState } from "react";
import { CustomModal } from "./components/CustomModal";
import { DialogModal } from "../../after/src/DialogModal";

function App() {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showDialogModal, setShowDialogModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowCustomModal(true)}>
        Show Custom Modal
      </button>
      <br />
      <button onClick={() => setShowDialogModal(true)}>
        Show Dialog Modal
      </button>
      <CustomModal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
      >
        <p>
          This is a <strong>CUSTOM</strong> modal
        </p>
        <button onClick={() => setShowCustomModal(false)}>Close</button>
      </CustomModal>

      <DialogModal
        isOpen={showDialogModal}
        onClose={() => setShowDialogModal(false)}
      >
        <p>
          This is a <strong>DIALOG</strong> modal
        </p>
        <button onClick={() => setShowDialogModal(false)}>Close</button>
      </DialogModal>
    </>
  );
}

export default App;
