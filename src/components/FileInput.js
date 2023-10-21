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

    const nextPreview = URL.createObjectURL(value); // 브라우저에 메모리 할당
    setPreview(nextPreview);

    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview); // 메모리 할당 해제
    };
  }, [value]);

  return (
    <>
      <img src={preview} alt="이미지 미리보기" />
      <input
        ref={inputRef}
        accept="image/png, image/jpeg"
        type="file"
        onChange={handleChange}
      />
      {value && <button onClick={handleClearClick}>X</button>}
    </>
  );
};

export default FileInput;
