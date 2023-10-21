import React, { useState } from "react";
import "../styles/ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";

const ReviewForm = () => {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });

  // 이미지 파일을 전달해주기 위해 인풋과 분리!
  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="ReviewForm">
      <FileInput name="title" value={values.imgFile} onChange={handleChange} />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <RatingInput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      <button type="submit" onSubmit={handleSubmit}>
        제출하기
      </button>
    </form>
  );
};

export default ReviewForm;
