import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { LuArrowBigLeftDash } from "react-icons/lu";

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const FormCard = styled.form`
    min-height: 600px;
    max-height: fit-content;
    width: 550px;
    background-color: gold;
    padding: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0px 0px 5px;
`
const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
    padding: 10px 0px 10px 0px;
`
const DivLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Label = styled.label`
    font-size: 15px;
`
const Input = styled.input`
    height: 30px;
    width: 400px;
    overflow: auto;
    scrollbar-width: none;
`
const Select = styled.select`
    height: 30px;
    width: 400px;
    overflow: auto;
    scrollbar-width: none;
`
const TextArea = styled.textarea`
    height: 100px;
    width: 400px;
    overflow: auto;
    scrollbar-width: none;
`
const CategoryLink = styled(Link)`
    text-align: center;
    margin-top: 15px;
    color: blue;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
const PlusButton = styled.button`
    position: absolute;
    margin: 21px 0px 0px 190px;
    height: 25px;
    width: 25px;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 0px 2.5px 0px;
    border-radius: 50%;
    border: 3px dashed black;
    background-color: transparent;
    color: black;
    cursor: pointer;
    transition: all .15s ease-in-out;
    &:hover{
        color: white;
        border: 3px dashed white;
    }
`
const DivPicture = styled.div`
    background-color: white;
    border: 1px solid black;
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 15px;
    justify-content: center;
    width: 400px;
`
const Submit = styled.button`
    padding: 10px 20px;
    font-size: 15px;
    font-weight: bold;
    background-color: #f0e082;
    border: 2px groove black;
    cursor: pointer;
    transition: all .15s ease-in-out;
    &:hover{
        background-color: #6f5e00;
        color: white;
    }
`
const DivBack = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 20px;
    left: 20px;
    cursor: pointer;
    transition: all .15s ease-in-out;
    &:hover{
        color: gold;
    }
`
const ErrorMsg = styled.span`
    color: red;
    font-size: 14px;
    margin-top: 47px;
    position: absolute;
`;

const AddProduct = () => {
    const [category, setCategory] = useState([])
    const [tag, setTag] = useState([])
    const [selectedTags, setSelectedTags] = useState([1]);
    const [tagsValue, setTagsValue] = useState([])
    const [reponseData, setReponseData] = useState([])
    const [error, setError] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: null,
      });

    const navigate = useNavigate()
    const token = useSelector(state => state.account.account.token)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryResponse, tagResponse] = await Promise.all([
                    axios.get('http://localhost:3000/api/categories'),
                    axios.get('http://localhost:3000/api/tags')
                ]);
                setCategory(categoryResponse.data);
                setTag(tagResponse.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const addProduct = async () => {
        const formDataToSend = new FormData(); // Membuat objek FormData
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('stock', formData.stock);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('image', formData.image);
        tagsValue.forEach((item, index) => {
            formDataToSend.append(`tags[${index}]`, item);
        });
        try {
            const response = await axios.post('http://localhost:3000/api/products', 
            formDataToSend, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data' 
                }
              })
              setReponseData(response.data)
              console.log(response.data);
              if (response.data.error == 1) {
                setError(true)
              } else {
                alert('Produk berhasil ditambahkan 😉')
              }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddTag = (e) => {
        e.preventDefault()
        const newTag = tag.length;
        setSelectedTags([...selectedTags, newTag]);
    };
    const handleMinTag = (e) => {
        e.preventDefault()
        if (selectedTags.length > 0) {
            const newSelectedTags = [...selectedTags];
            newSelectedTags.pop(); // Menghapus elemen terakhir dari daftar tag yang dipilih
            setSelectedTags(newSelectedTags); // Update state dengan daftar tag yang telah diperbarui
        }
    };

    
    const handleSubmit = (e) => {
        e.preventDefault()
        addProduct()
    }

    const handleTagsChange = (e) => {
        const { name, value } = e.target;
        const newTagsValue = [...tagsValue];
        // Update nilai tags sesuai dengan nama yang diberikan
        newTagsValue[parseInt(name)] = value;
        // Setel state tagsValue dengan nilai baru
        setTagsValue(newTagsValue);
        }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]; // Mengambil file gambar yang dipilih
        setFormData({ ...formData, image: selectedImage }); // Menyimpan file gambar ke dalam state formData
    };    

    const handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    return (
        <Container>
            <FormCard onSubmit={handleSubmit}>
                <Title>ADD YOUR PRODUCT HERE</Title>
                <DivLabel>
                    <Label>Nama Produk :</Label>
                    <Input type="text" name="name" onChange={handleChange}></Input>
                    {error && reponseData.fields.name && <ErrorMsg>*{reponseData.fields.name.message}</ErrorMsg>}
                </DivLabel>
                <DivLabel>
                    <Label>Deskripsi Produk :</Label>
                    <TextArea type="text" name="description" onChange={handleChange}></TextArea>
                    {error && reponseData.fields.description && <ErrorMsg style={{marginTop:'118px'}}>*{reponseData.fields.description.message}</ErrorMsg>}
                </DivLabel>
                <div style={{display:'flex',width:'400px', justifyContent:'space-around'}}>
                    <DivLabel>
                        <Label>Harga Produk :</Label>
                        <Input name="price" onChange={handleChange} style={{width:'150px'}} type="number"></Input>
                        {error && reponseData.fields.price && <ErrorMsg>*{reponseData.fields.price.message}</ErrorMsg>}
                    </DivLabel>
                    <DivLabel>
                        <Label>Stok Produk :</Label>
                        <Input name="stock" onChange={handleChange} style={{width:'150px'}} type="number"></Input>
                        {error && reponseData.fields.stock && <ErrorMsg>*{reponseData.fields.stock.message}</ErrorMsg>}
                    </DivLabel>
                </div>
                <div style={{display:'flex',width:'400px',justifyContent:'space-around'}}>
                    <DivLabel>
                        <Label>Kategori Produk :</Label>
                        <Select name="category" onChange={handleChange} style={{width:'150px'}} type="text" required>
                            <option >Pilih salah satu . . .</option>
                            {category.map(item => (
                                    <option key={item._id} value={item.name} >{item.name?.toUpperCase()}</option>
                            ))}
                        </Select>
                        {error && reponseData.fields.category && <ErrorMsg style={{marginTop:'63px'}}>*Kategori harus diisi</ErrorMsg>}
                        <div style={{color:'grey',position:'absolute',margin:'46px'}}>*or edit category
                        <CategoryLink to="/addcategory"> here</CategoryLink>
                        </div>
                        
                    </DivLabel>
                    <DivLabel>
                    <Label>Tag Produk :</Label>
                    {selectedTags.map((tagIndex, index) => (
                        <div key={index}>
                            <Select name={index} onChange={handleTagsChange} style={{ width:'150px'}} type="text" required>
                            <option >Pilih atau tambah tags (+)</option>
                                {tag.map(item => (
                                    <option title="PILIH" key={item._id} value={item.name}>{item.name?.toUpperCase()}</option>
                                ))}
                            </Select>
                        </div>
                    ))}
                    <PlusButton onClick={handleAddTag}>+</PlusButton>
                    <PlusButton style={{margin:'21px 0px 0px 250px'}} onClick={handleMinTag}>-</PlusButton>
                    <div style={{ color: 'grey' }}>*or edit tag
                        <CategoryLink to="/addtag"> here</CategoryLink>
                    </div>
                </DivLabel>
                </div>
                <DivPicture>
                    <Label>Gambar Produk : </Label>
                    <Input name="image" onChange={handleImageChange} style={{width:'auto',alignContent:'center'}} type="file" required></Input>
                </DivPicture>
                <Submit type="submit">Submit</Submit>
            </FormCard>
            <DivBack onClick={()=>navigate('/product')}>
                 <LuArrowBigLeftDash size={50}/>
                 <h1>Back to Product</h1>
            </DivBack>
        </Container>
    )
}

export default AddProduct