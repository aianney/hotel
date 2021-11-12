import React from 'react'
import Modal from '../modal/modal.component'
import './mods.styles.css'

const Mods = () => {
  const [modalOpen, setModalOpen] = React.useState(false)
  return (
    <div>
      <div className="App">
        <h1>Hey, click on the button to open the modal.</h1>
        <button
          className="openModalBtn"
          onClick={() => {
            setModalOpen(true)
          }}
        >
          Open
        </button>

        {modalOpen && <Modal setOpenModal={setModalOpen} />}
      </div>
    </div>
  )
}

export default Mods
