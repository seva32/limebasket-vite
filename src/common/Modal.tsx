/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React, { ReactNode, useRef } from "react";
import ReactDom from "react-dom";
import useScape from "../utils/hooks/useScape";

const modalRoot: any = document.getElementById("modal-root");

interface ModalProps {
  id?: string;
  onClose?: () => void;
  isOpen?: boolean;
  children?: ReactNode;
  title?: string;
}

function Modal({
  isOpen,
  onClose,
  id,
  children,
  title = "Heads up!",
}: ModalProps): JSX.Element {
  const [fadeType, setFadeType] = React.useState<string | null>(null);

  const background = useRef<HTMLDivElement>(null);

  useScape(() => setFadeType("fade-out"));

  React.useEffect(() => {
    setFadeType("fade-in");
    if (!isOpen) {
      setFadeType("fade-out");
    }
  }, [setFadeType, isOpen]);

  const transitionEnd = (e: any) => {
    if (e.propertyName !== "opacity" || fadeType === "fade-in") return;

    if (fadeType === "fade-out") {
      onClose?.();
    }
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    setFadeType("fade-out");
  };

  return ReactDom.createPortal(
    <div
      id={id}
      onTransitionEnd={transitionEnd}
      className={`modal-wrapper absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity duration-200 ease-linear z-50 w-256p md:w-350p my-auto mx-auto ${fadeType} w-full`}
    >
      <div className="box-dialog z-999 md:w-full bg-space rounded-lg w-full">
        <div className="box-header p-10p md:p-20p flex justify-between items-center border-b-white w-full">
          <span className="box-title font-body m-0 text-white">
            <b>{title}</b>
          </span>
          <button
            onClick={handleClick}
            className="box-close px-2 font-body text-white hover:bg-white hover:text-space border-white border-solid border-2 align-middle rounded"
            type="button"
          >
            X
          </button>
        </div>
        <div className="box-content py-6 text-white text-center font-body">
          {children}
        </div>
        <div className="box-footer py-6 px-5 flex items-center justify-end border-t-white">
          <button
            onClick={handleClick}
            className="box-close font-small cursor-pointer text-white hover:bg-white hover:text-space border-solid border-2 border-white px-2 md:px-4 hover:border-white rounded"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
      <div
        className="background bg-lime opacity-50 fixed z-998 block top-0 left-0 bottom-0 right-0 outline-none"
        onMouseDown={handleClick}
        ref={background}
        role="button"
        tabIndex={0}
      />
    </div>,
    modalRoot
  );
}

Modal.defaultProps = {
  modalClass: "",
  modalSize: "md",
  title: "Heads up!",
};

export default Modal;

// class Modal extends Component {
//   state = { fadeType: null }; // eslint-disable-line

//   background = React.createRef();

//   componentDidMount() {
//     window.addEventListener('keydown', this.onEscKeyDown, false);
//     setTimeout(() => this.setState({ fadeType: 'in' }), 0);
//   }

//   componentDidUpdate(prevProps, _prevState) {
//     if (!this.props.isOpen && prevProps.isOpen) {
//       this.setState({ fadeType: 'out' }); // eslint-disable-line
//     }
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.onEscKeyDown, false);
//   }

//   transitionEnd = (e) => {
//     if (e.propertyName !== 'opacity' || this.state.fadeType === 'in') return;

//     if (this.state.fadeType === 'out') {
//       this.props.onClose();
//     }
//   };

//   onEscKeyDown = (e) => {
//     if (e.key !== 'Escape') return;
//     this.setState({ fadeType: 'out' });
//   };

//   handleClick = (e) => {
//     e.preventDefault();
//     this.setState({ fadeType: 'out' });
//   };

//   render() {
//     return ReactDom.createPortal(
//       <StyledModal
//         id={this.props.id}
//         className={`wrapper ${`size-${this.props.modalSize}`} fade-${
//           this.state.fadeType
//         } ${this.props.modalClass}`}
//         role="dialog"
//         modalSize={this.props.modalSize}
//         onTransitionEnd={this.transitionEnd}
//       >
//         <div className="box-dialog">
//           <div className="box-header">
//             <h4 className="box-title">{this.props.title}</h4>
//             <button onClick={this.handleClick} className="close" type="button">
//               ×
//             </button>
//           </div>
//           <div className="box-content">{this.props.children}</div>
//           <div className="box-footer">
//             <button onClick={this.handleClick} className="close" type="button">
//               Close
//             </button>
//           </div>
//         </div>
//         <div
//           className="background"
//           onMouseDown={this.handleClick}
//           ref={this.background}
//           role="button"
//           tabIndex="0"
//         />
//       </StyledModal>,
//       modalRoot,
//     );
//   }
// }
