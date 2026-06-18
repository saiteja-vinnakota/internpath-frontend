import Modal
from "./Modal";

import ApplicationForm
from "../forms/ApplicationForm";

function ApplyModal({

  open,

  onClose,

  job,

  onSubmit,

}) {

  return (

    <Modal
      open={open}
      onClose={onClose}
    >

      <div className="p-8">

        <h2
          className="
            text-2xl
            font-semibold
            text-primary
          "
        >

          Apply for Internship

        </h2>

        <p
          className="
            mt-2
            text-muted
          "
        >

          {job?.title}

        </p>

        <div className="mt-8">

          <ApplicationForm
            job={job}
            onSubmit={onSubmit}
          />

        </div>

      </div>

    </Modal>

  );
}

export default ApplyModal;