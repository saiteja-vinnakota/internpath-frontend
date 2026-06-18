import {
  Download,
  X,
} from "lucide-react";

import Modal
from "./Modal";

import Button
from "../ui/Button";

function ResumePreviewModal({

  open,

  resumeUrl,

  onClose,

}) {

  if (!resumeUrl) {

    return null;
  }

  return (

    <Modal
      open={open}
      onClose={onClose}
      maxWidth="max-w-5xl"
    >

      <div
        className="
          flex
          items-center
          justify-between

          p-6

          border-b
          border-border
        "
      >

        <h2
          className="
            text-xl
            font-semibold
            text-primary
          "
        >

          Resume Preview

        </h2>

        <button
          onClick={onClose}
        >

          <X size={22} />

        </button>

      </div>

      <div
        className="
          h-[75vh]
        "
      >

        <iframe
          src={resumeUrl}
          title="Resume Preview"
          className="
            w-full
            h-full
          "
        />

      </div>

      <div
        className="
          p-6

          border-t
          border-border

          flex
          justify-end
        "
      >

        <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
        >

          <Button>

            <Download
              size={18}
            />

            Download

          </Button>

        </a>

      </div>

    </Modal>

  );
}

export default ResumePreviewModal;