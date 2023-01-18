/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Mail from "./components/mail";
import { ToastContainer ,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const uploadNotify = () => {
    toast.success("File uploaded successfully")
  toast.info("")};
  const copyNotify = () => toast.success("successfully copied");
  const copyErrorNotify = () => toast.error("something went wrong");
  const fileNotify = () => toast.error("Upload your file first");
  const dropRef = useRef(null);
  const [file, setFile] = useState("");
  const [text, setText] = useState("");
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return fileNotify();
    }
    const formData = new FormData();
    formData.append("myfile", file);
    try {
      const data = await axios.post(
        "http://localhost:3000/api/files",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setText(data.data.file);
      setFile("");
      uploadNotify();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);

      copyNotify();
    } catch (err) {
      copyErrorNotify();
    }
  };
  useEffect(() => {
    let div = dropRef.current;
    div.addEventListener("dragenter", handleDrag);
    div.addEventListener("dragleave", handleDrag);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);
    div.addEventListener("submit", onSubmit);

    return () => {
      div.removeEventListener("dragenter", handleDrag);
      div.removeEventListener("dragleave", handleDrag);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
      div.removeEventListener("submit", onSubmit);
    };
  }, [onSubmit]);
  return (
    <div className="App">
      <form id="form-file-upload" ref={dropRef}>
        <input
          type="file"
          id="input-file-upload"
          onChange={handleFileChange}
        ></input>
        <label id="label-file-upload" htmlFor="input-file-upload">
          <div>
            <p>Drag and drop your file here</p>
            <button className="upload-button" onSubmit={onSubmit}>
              Upload a file
            </button>
          </div>
        </label>
        <div> {file && `${file.name}`}</div>
      </form>
      {text && (
        <>
          <p>You can copy this link and view on another page</p>
        <div className="copy">
          <p>{text}</p>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleCopy}
          >
            <path
              fillRule="evenodd"
              d="M5.962 2.513a.75.75 0 01-.475.949l-.816.272a.25.25 0 00-.171.237V21.25c0 .138.112.25.25.25h14.5a.25.25 0 00.25-.25V3.97a.25.25 0 00-.17-.236l-.817-.272a.75.75 0 01.474-1.424l.816.273A1.75 1.75 0 0121 3.97v17.28A1.75 1.75 0 0119.25 23H4.75A1.75 1.75 0 013 21.25V3.97a1.75 1.75 0 011.197-1.66l.816-.272a.75.75 0 01.949.475z"
            />
            <path
              fillRule="evenodd"
              d="M7 1.75C7 .784 7.784 0 8.75 0h6.5C16.216 0 17 .784 17 1.75v1.5A1.75 1.75 0 0115.25 5h-6.5A1.75 1.75 0 017 3.25v-1.5zm1.75-.25a.25.25 0 00-.25.25v1.5c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25v-1.5a.25.25 0 00-.25-.25h-6.5z"
            />
          </svg>
        </div>
        </>
      )}
      <Mail />
      <ToastContainer/>
    </div>
  );
}

export default App;
