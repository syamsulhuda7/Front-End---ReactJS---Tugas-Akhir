/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
// import axios from "axios";
// import { useEffect, useState } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
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

function FilterProduct({ onSend, onGenerator }) {
  const [submit, setSubmit] = useState(0);
  const [categoryValues, setCategoryValues] = useState([]);
  const [tagValues, setTagValues] = useState([]);
  const [category, setCategory] = useState([]);
  const [tag, setTag] = useState([]);
  // const [filter, setFilter] = useState([])

  const handleCategoryChecked = (event) => {
    const { name, checked } = event.target;
    // Menggabungkan nilai terbaru dengan prevState menggunakan spread operator
    const updatedCategoryValue = { ...categoryValues, [name]: checked };
    setCategoryValues(updatedCategoryValue);

    // Mendapatkan array dari name yang bernilai true
    const trueNames = Object.keys(updatedCategoryValue).filter(
      (key) => updatedCategoryValue[key]
    );
    setCategory(trueNames);
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
    setTag(trueNames);
  };

  // category.map(x => console.log(x))

  const fetchData = async () => {
    try {
      const categoryParams = category
        .map((category) => `category=${category}`)
        .join("&");
      const tagParams = tag.map((tag) => `tags[]=${tag}`).join("&");
      const url = `http://localhost:3000/api/products?limit=100&${categoryParams}&${tagParams}`;
      const response = await axios.get(url);
      onSend(response.data.data);
    } catch (err) {
      console.log("Eror fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [submit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit((page) => page + 1);
    onGenerator(true)
  };

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
        <button type="submit">Kirim</button>
      </form>
    </Container>
  );
}

export default FilterProduct;
