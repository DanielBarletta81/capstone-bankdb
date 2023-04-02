import ReactDOM from "react-dom";
import { CloseButton } from "react-bootstrap";

const ModalReg = ({ user, setUser,  title, children }) => {
  
    const content = user && (
 <div className = "overlay">
        <div className="modal" >
          <header className="modal_header">
            <h2 className="modal_header-title"> {title} </h2>
            <button className="close" type= "button" onClick = {() => setUser(false)}>
              <img src={CloseButton} alt="close" />
            </button>
          </header>
          <main className="modal_content">
          {children}
          </main>
          <footer className="modal_footer">
          

            <button className="submit">Submit</button>
          </footer>
        </div>
      </div>
      )
      
        return ReactDOM.createPortal (content, document.body)
    }



export default ModalReg;