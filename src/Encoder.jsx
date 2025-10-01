import React, { useState } from "react";
import { encodeString, copyToClipboard } from "./utils/util.js";

function Encoder() {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState([]);
  const [copyStatus, setCopyStatus] = useState();

  const handleEncoded = () => {
    const result = encodeString(input);
    setEncoded(result);
    setInput("");
  };

  const handleCopy = async () => {
    if (!encoded.length) return;
    const { message } = await copyToClipboard(JSON.stringify(encoded));
    console.log(encoded);
    console.log(message);
    setCopyStatus(message);
    setTimeout(() => setCopyStatus(""), 1500);
  };

  return (
    <div className="container mx-4 p-1 m-2">
      <div className="row">
        <div className="col-12">
          <h2>Encoder</h2>
          <label className="fs-3 p-2 text-start" id="encodedInput">
            Text to
            <span className="p-2 arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
            Number
          </label>
          <textarea
            className=" w-100 input bg-white text-black p-4 m-3 form-control"
            style={{
              minHeight: "120px",
              maxHeight: "250px",
              resize: "none",
              overFlowY: "none",
            }}
            placeholder="Enter your Query here...."
            htmlFor="encodedInput"
            rows="5"
            value={input}
            required
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onFocus={() => {
              setEncoded([]);
              setCopyStatus("");
            }}
          ></textarea>

          <div className="ms-2 buttons py-2 w-100 ">
            <button
              className="m-2 col-4 w-100"
              type="button"
              onClick={handleEncoded}
            >
              Encode
            </button>
          </div>
        </div>

        <div className="col-12 ">
          <div className="d-flex align-items-center justify-content-between">
            <label className="fs-3 ms-3" id="encoderInput">
              Encoded Tokens
            </label>

            <span
              className="d-inline-block align-items-center text-end"
              style={{ minWidth: "9rem" }}
            >
              <h4 className="mb-0">
                {encoded.length ? `Token Count : ${encoded.length}` : "\u00A0"}
              </h4>
            </span>
          </div>

          <textarea
            readOnly
            className="bg-white text-black encodedOutput w-100 p-4 m-3"
            style={{
              minHeight: "120px",
              maxHeight: "250px",
              resize: "none",
              overFlowY: "none",
            }}
            placeholder="Encoded Token will appear here..."
            value={encoded.length > 0 ? JSON.stringify(encoded) : ""}
          ></textarea>

          {/* <div className="ms-2 buttons py-2 w-100 ">
            <button
              className="m-2 col-4 w-100" */}

          <div className="ms-2 buttons py-2 w-100">
            <button
              className=" m-2 w-100 mb-0"
              onClick={handleCopy}
              disabled={!encoded.length}
            >
              Copy Token
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

export default Encoder;
