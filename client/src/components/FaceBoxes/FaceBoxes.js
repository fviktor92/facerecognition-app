import React from 'react';
import FaceBox from "./FaceBox";

const FaceBoxes = (boxes) => {

    return (
        <div>
            {
                boxes.boxes.map((box) => {
                        return (<FaceBox topRow={box.topRow} rightCol={box.rightCol} bottomRow={box.bottomRow} leftCol={box.leftCol}/>)
                    }
                )
            }
        </div>);
};

export default FaceBoxes;