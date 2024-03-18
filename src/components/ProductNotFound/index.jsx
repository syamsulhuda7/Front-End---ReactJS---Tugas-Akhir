/* eslint-disable react/prop-types */
function ProductNotFound({ inputValue }) {

  return (
    <div style={{width:'100%', height:'80vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <h1>Sorry, product {inputValue} not found!!!</h1>
    </div>
  );
}

export default ProductNotFound;
