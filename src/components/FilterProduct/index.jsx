/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: gold;
  width: 300px;
  padding: 20px 30px;
`;
const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;
const Label = styled.label`
  font-size: 18px;
  padding: 0px 5px;
  cursor: pointer;
`;
const DivLabel = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 15px;
`;
const Button = styled.button`
  padding: 7px 15px;
  margin: 10px;
  font-size: 15px;
  font-weight: bold;
  width: 100%;
  background-color: #fff1a2;
  border: transparent;
  cursor: pointer;
  transition: all .1s ease-in-out;
  &:hover {
    background-color: #b19700;
    color: white;
  }
`

function FilterProduct({ sendSubmit, sendCategory, sendTag }) {
  const [categoryValues, setCategoryValues] = useState([]);
  const [tagValues, setTagValues] = useState([]);

  const handleCategoryChecked = (event) => {
    const { name, checked } = event.target;
    // Menggabungkan nilai terbaru dengan prevState menggunakan spread operator
    const updatedCategoryValue = { ...categoryValues, [name]: checked };
    setCategoryValues(updatedCategoryValue);
    console.log(categoryValues)

    // Mendapatkan array dari name yang bernilai true
    const trueNames = Object.keys(updatedCategoryValue).filter(
      (key) => updatedCategoryValue[key]
    );
    sendCategory(trueNames)
  };

  const handleTagChecked = (event) => {
    const { name, checked } = event.target;
    // Menggabungkan nilai terbaru dengan prevState menggunakan spread operator
    const updatedTagValue = { ...tagValues, [name]: checked };
    setTagValues(updatedTagValue);

    // Mendapatkan array dari name yang bernilai true
    const trueNames = Object.keys(updatedTagValue).filter(
      (key) => updatedTagValue[key]
    );
    sendTag(trueNames)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendSubmit((page) => page + 1)
  };

  const handleClick = (e) => {
    e.preventDefault();
    setCategoryValues({});
    setTagValues({});
    sendCategory([]);
    sendTag([]);
    // Reset semua nilai checkbox menjadi tidak tercentang
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }

  return (
    <Container>
      <h1>Filter by</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h2 style={{ paddingTop: "30px" }}>Category</h2>
          <DivLabel>
            <Checkbox
              onChange={handleCategoryChecked}
              type="checkbox"
              name="food"
              id="food"
            />
            <Label htmlFor="food">Food</Label>
          </DivLabel>
          <DivLabel>
            <Checkbox
              onChange={handleCategoryChecked}
              type="checkbox"
              name="drink"
              id="drink"
            />
            <Label htmlFor="drink">Drink</Label>
          </DivLabel>
        </div>
        <div>
          <h2 style={{ paddingTop: "30px" }}>Tag</h2>
          <DivLabel>
            <Checkbox
              onChange={handleTagChecked}
              type="checkbox"
              name="cold"
              id="cold"
            />
            <Label htmlFor="cold">Cold</Label>
          </DivLabel>
          <DivLabel>
            <Checkbox
              onChange={handleTagChecked}
              type="checkbox"
              name="fresh"
              id="fresh"
            />
            <Label htmlFor="fresh">Fresh</Label>
          </DivLabel>
          <DivLabel>
            <Checkbox
              onChange={handleTagChecked}
              type="checkbox"
              name="fruit"
              id="fruit"
            />
            <Label htmlFor="fruit">Fruit</Label>
          </DivLabel>
          <DivLabel>
            <Checkbox
              onChange={handleTagChecked}
              type="checkbox"
              name="heavy"
              id="heavy"
            />
            <Label htmlFor="heavy">Heavy</Label>
          </DivLabel>
          <DivLabel>
            <Checkbox
              onChange={handleTagChecked}
              type="checkbox"
              name="hot"
              id="hot"
            />
            <Label htmlFor="hot">Hot</Label>
          </DivLabel>
          <DivLabel>
            <Checkbox
              onChange={handleTagChecked}
              type="checkbox"
              name="mix"
              id="mix"
            />
            <Label htmlFor="mix">Mix</Label>
          </DivLabel>
          <DivLabel>
            <Checkbox
              onChange={handleTagChecked}
              type="checkbox"
              name="savory"
              id="savory"
            />
            <Label htmlFor="savory">Savory</Label>
          </DivLabel>
          <DivLabel>
            <Checkbox
              onChange={handleTagChecked}
              type="checkbox"
              name="single"
              id="single"
            />
            <Label htmlFor="single">Single</Label>
          </DivLabel>
          <DivLabel>
            <Checkbox
              onChange={handleTagChecked}
              type="checkbox"
              name="snack"
              id="snack"
            />
            <Label htmlFor="snack">Snack</Label>
          </DivLabel>
          <DivLabel>
            <Checkbox
              onChange={handleTagChecked}
              type="checkbox"
              name="sweet"
              id="sweet"
            />
            <Label htmlFor="sweet">Sweet</Label>
          </DivLabel>
          <DivLabel>
            <Checkbox
              onChange={handleTagChecked}
              type="checkbox"
              name="vegetable"
              id="vegetable"
            />
            <Label htmlFor="vegetable">Vegetable</Label>
          </DivLabel>
        </div>
        <Button type="submit">Filter</Button>
        <Button onClick={handleClick}>Reset</Button>
      </form>
    </Container>
  );
}

export default FilterProduct;
