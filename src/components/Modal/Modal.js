// import React, { Component } from "react";
import { useState, useEffect } from "react";

import s from "./Modal.module.css";

export default function Modal({ closeModal }) {
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  // componentDidMount() {
  //   window.addEventListener("keydown", this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("keydown", this.handleKeyDown);
  // }

  return (
    <div
      className={s.Overlay}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          closeModal();
        }
      }}
    >
      <div className={s.Modal}>{this.props.children}</div>
    </div>
  );
}

//////////////////////////////////////////////////////////////////////////////////

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === "Escape") {
//       this.props.closeModal();
//     }
//   };

//   render() {
//     return (
//       <div
//         className={s.Overlay}
//         onClick={e => {
//           if (e.currentTarget === e.target) {
//             this.props.closeModal();
//           }
//         }}
//       >
//         <div className={s.Modal}>{this.props.children}</div>
//       </div>
//     );
//   }
// }
