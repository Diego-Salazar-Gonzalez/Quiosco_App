import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import { ToastContainer } from 'react-toastify'
import Modal from 'react-modal'
import useKiosko from "@/hooks/useKiosko";
import ModalProducto from "@/components/ModalProducto";
import "react-toastify/dist/ReactToastify.css"
import Pasos from "@/components/Pasos";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');


export default function Layout({ children, pagina }) {

  const { modal } = useKiosko()
  const titulo = `Cafe - ${pagina}`
  return (
    <>
      <Head>
        <title>{titulo}</title>
        <meta name="description" content="Kiosko Cafeteria"></meta>
      </Head>

      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 h-screen overflow-y-scroll">
          <Sidebar />
        </aside>

        <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <div className="p-10 mt-5 ">
            <Pasos/>
            {children}</div>
        </main>
      </div>

      {
        modal && (
          <Modal
            isOpen={modal}
            style={customStyles}
          >
            <ModalProducto/>
          </Modal>
        )
      }
      <ToastContainer/>
    </>
  );
}
