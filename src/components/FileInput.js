import { useEffect, useRef, useState } from "react";

const FileInput = ({ name, value, onChange }) => {
  const [preview, setPreview] = useState();

  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
  }, [value]);

  return (
    <>
      <img src={preview} alt="이미지 미리보기" />
      <input ref={inputRef} type="file" onChange={handleChange} />
      {value && <button onClick={handleClearClick}>X</button>}
    </>
  );
};

export default FileInput;
