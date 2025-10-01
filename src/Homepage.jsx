import React from "react";
import Encoder from "./Encoder.jsx";
import Decoder from "./Decoder.jsx";


function Homepage () {
    return(
        <>
        <h1 className="header px-2 text-center">Custom Tokenizer</h1>
        <div className="d-flex">
        <Encoder />
        <Decoder />
        </div>
        </>
    )
};

export default Homepage;