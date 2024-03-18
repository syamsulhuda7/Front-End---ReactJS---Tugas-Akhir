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

function FilterProduct() {
  return (
<Container>
      <h1>Filter by</h1>
      <div>
        <h2 style={{ paddingTop: "30px" }}>Category</h2>
        <DivLabel>
          <Checkbox type="checkbox" name="food" id="food" />
          <Label htmlFor="food">Food</Label>
        </DivLabel>
        <DivLabel>
          <Checkbox type="checkbox" name="drink" id="drink" />
          <Label htmlFor="drink">Drink</Label>
        </DivLabel>
      </div>
      <div>
        <h2 style={{ paddingTop: "30px" }}>Tag</h2>
        <DivLabel>
          <Checkbox type="checkbox" name="cold" id="cold" />
          <Label htmlFor="cold">Cold</Label>
        </DivLabel>
        <DivLabel>
          <Checkbox type="checkbox" name="fresh" id="fresh" />
          <Label htmlFor="fresh">Fresh</Label>
        </DivLabel>
        <DivLabel>
          <Checkbox type="checkbox" name="fruit" id="fruit" />
          <Label htmlFor="fruit">Fruit</Label>
        </DivLabel>
        <DivLabel>
          <Checkbox type="checkbox" name="heavy" id="heavy" />
          <Label htmlFor="heavy">Heavy</Label>
        </DivLabel>
        <DivLabel>
          <Checkbox type="checkbox" name="hot" id="hot" />
          <Label htmlFor="hot">Hot</Label>
        </DivLabel>
        <DivLabel>
          <Checkbox type="checkbox" name="mix" id="mix" />
          <Label htmlFor="mix">Mix</Label>
        </DivLabel>
        <DivLabel>
          <Checkbox type="checkbox" name="savory" id="savory" />
          <Label htmlFor="savory">Savory</Label>
        </DivLabel>
        <DivLabel>
          <Checkbox type="checkbox" name="single" id="single" />
          <Label htmlFor="single">Single</Label>
        </DivLabel>
        <DivLabel>
          <Checkbox type="checkbox" name="snack" id="snack" />
          <Label htmlFor="snack">Snack</Label>
        </DivLabel>
        <DivLabel>
          <Checkbox type="checkbox" name="sweet" id="sweet" />
          <Label htmlFor="sweet">Sweet</Label>
        </DivLabel>
        <DivLabel>
          <Checkbox type="checkbox" name="vegetable" id="vegetable" />
          <Label htmlFor="vegetable">Vegetable</Label>
        </DivLabel>
      </div>
    </Container>
  );
}

export default FilterProduct;
