import { ClassAttributes } from 'react';
import styled from 'styled-components';

// styled-component
const DropOverlayInternal = styled.div`
  background-color: rgba(77, 144, 142, 1);
  opacity: 0.7;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 10;
  border: dashed 5px #ccc;
  border-radius: 3vmin;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
`;
interface IDropOverlayProp extends ClassAttributes<any> {
  dragging: boolean;
}
const DropOverlay = ({dragging}: IDropOverlayProp) => {
  if (dragging) {
    return <DropOverlayInternal>Drop file here</DropOverlayInternal>
  }
  else {
    return "";
  }
    // return <>
    //     <DropOverlayInternal>Drop file here</DropOverlayInternal>
    // </>
}


// function DropOverlay() {

//   return (
//     <div className='drop-overlay'>
//       Drop the file here
//     </div>
//   );
// }

export default DropOverlay;
