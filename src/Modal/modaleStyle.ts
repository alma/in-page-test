export const style = `
#modal-element {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

#in-page-modal-background {
  position: absolute;
  background: #2A2A2A;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

#in-page-modal-body {
  border-radius: 0;
    background: #fff;
    position: absolute;
    padding: 30px;
    width: 100vw;
    height: 100vh;
    bottom: 0px;
}

#in-page-modal-close {
  position: absolute;
  right: 15px;
  top: 15px;
  outline: none;
  appearance: none;
  color: red;
  background: none;
  border: 0px;
  font-weight: bold;
  cursor: pointer;
}

#in-page-modal-logo {
  position: absolute;
  left: 15px;
  top: 15px;
  outline: none;
  appearance: none;
  color: red;
  background: none;
  border: 0px;
}

@media (min-width: 768px) {
  #in-page-modal-body {
    border-radius: 10px;
      background: #fff;
      position: relative;
      padding: 30px;
      width: 80vw;
      height: 80vh;
  }
}
`;
