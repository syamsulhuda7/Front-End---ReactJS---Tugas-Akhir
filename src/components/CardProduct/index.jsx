import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardProduct() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src='' />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>hs
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default CardProduct;