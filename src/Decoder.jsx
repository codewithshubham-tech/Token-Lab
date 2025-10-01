import React, { useState } from "react";
import { decodeString, copyToClipboard } from "./utils/util.js";

function Decoder() {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState("");
  const [copyStatus, setCopyStatus] = useState();

  const handleDecode = () => {
    let numberArr = [];
    try {
      const trimmed = input.trim();
      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        numberArr = JSON.parse(trimmed);
      } else if (trimmed) {
        numberArr = trimmed
          .split(",")
          .map((str) => parseInt(str.trim(), 10))
          .filter((num) => !isNaN(num));
      }
      setDecoded(decodeString(numberArr));
    } catch (e) {
      console.error("Decoding error", e);
      setDecoded("Invalid Input");
    }
    setInput("");
  };

  const handleCopy = async () => {
    if (!decoded.length) return;
    const { message } = await copyToClipboard(decoded);
    setCopyStatus(message);
    setTimeout(() => setCopyStatus(""), 1500);
  };
  return (
    <div className="container m-2 mx-4 p-1">
      <div className="row">
        <div className="col-12">
          <h2>Decoder</h2>
          <label className="fs-3 p-2 text-start" id="decoderInput">
            Number to
            <span className="p-2 arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
            Text
          </label>
          <textarea
            className=" w-100 input bg-white text-black p-4 m-3 form-control"
            style={{
              minHeight: "120px",
              maxHeight: "250px",
              resize: "none",
              overFlowY: "none",
            }}
            placeholder="Enter Token array eg : [46,15,11,5,14,63,74,63,38,1,2]"
            htmlFor="DecoderInput"
            rows="5"
            required
            value={input}
            type="number"
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => {
              setDecoded("");
              setCopyStatus("");
            }}
          ></textarea>
          <div className="ms-2 buttons py-2 w-100">
            <button className="m-2 col-4 w-100" onClick={handleDecode}>
              Decode
            </button>
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between">
            <label className="fs-3 ms-3" id="decoderInput">
              Decoded Text
            </label>
            <span
              className="d-inline-block align-items-center text-end"
              style={{ minWidth: "9rem" }}
            >
              <h4 className="mb-0">
                {decoded.length ? `Token Count : ${decoded.length}` : "\u00A0"}
              </h4>
            </span>
          </div>

          <textarea
            readOnly
            className="bg-white text-black decodedOutput w-100 p-4 m-3"
            style={{
              minHeight: "120px",
              maxHeight: "250px",
              resize: "none",
              overFlowY: "none",
            }}
            htmlFor="decoderInput"
            placeholder="Decoded text will appear here..."
            value={decoded}
          ></textarea>

          <div className="ms-2 buttons py-2 w-100">
            <button
              className="m-2 w-100 mb-0"
              onClick={handleCopy}
              disabled={!decoded.length}
            >
              Copy Text
            </button>
          </div>

          <div
            className="popUp"
            style={{ minHeight: "2rem", minWidth: "10rem" }}
          >
            {copyStatus && <p style={{ color: "green" }}>{copyStatus}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Decoder;
