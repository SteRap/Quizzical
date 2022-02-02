import React from "react";

function Category(props) {
  const styles = {
    cursor: "not-allowed",
    backgroundColor: "#eee",
    opacity: "50%",
    borderColor: "rgba(148, 146, 146)",
    color: "rgba(148, 146, 146)",
  };

  const styleLabel = {
    color: "rgba(148, 146, 146)",
    opacity: "50%",
    cursor: "not-allowed",
  };

  return (
    <div className="category-container">
      <label
        className="mr2 i f6"
        htmlFor="category"
        style={props.newGame ? styleLabel : null}
      >
        Which category you wanna play?
      </label>

      <select
        id="category"
        className="questions-categories"
        value={props.category}
        onChange={props.changeCategory}
        disabled={props.newGame ? true : false}
        style={props.newGame ? styles : null}
      >
        <option value="9">General Knowledge</option>
        <option value="">--choose a category--</option>
        <option value="27">Animals</option>
        <option value="25">Art</option>
        <option value="10">Books</option>
        <option value="32">Cartoon and Animations</option>
        <option value="26">Celebrities</option>
        <option value="29">Comics</option>
        <option value="11">Film</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="31">Japanese Anime and Manga</option>
        <option value="20">Mythology</option>
        <option value="12">Music</option>
        <option value="13">Musical and Theaters</option>
        <option value="24">Politics</option>
        <option value="17">Science and Nature</option>
        <option value="18">Science: Computers</option>
        <option value="30">Science: Gadgets</option>
        <option value="19">Science: Mathematics</option>
        <option value="21">Sports</option>
        <option value="14">Television</option>
        <option value="28">Vehicles</option>
        <option value="15">Video Games</option>
      </select>
    </div>
  );
}

export default Category;
