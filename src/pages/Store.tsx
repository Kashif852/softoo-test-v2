import { Col, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import axios from "axios"
import { StoreItem } from "../components/StoreItem"
import storeItems from "../data/items.json"

export function Store() {
  const [products, setProducts] = useState<any[]>([])
  useEffect(()=>{
    axios.get("https://my-json-server.typicode.com/benirvingplt/products/products")
    .then(res=>{
      setProducts(res.data)
    })
    .catch(err => console.log("Error: "+err))
  },[])
  const filterHandler = (color: string)=>{
    const filteredProducts: any[] = []
     if(color=="All"){
      storeItems.forEach(({id,colour,name,price,img}: any) =>{
          filteredProducts.push({id: id,colour: colour,name: name,price: price,img: img})
      })
     }else{
      storeItems.forEach(({id,colour,name,price,img}: any) =>{
        if(colour === color){
          filteredProducts.push({id: id,colour: colour,name: name,price: price,img: img})
        }
      })
     }
    setProducts(filteredProducts)
  }
  return (
    <>
    <Row>
      <Col>Filter</Col>
      <Col>
      <select onChange={(e)=>filterHandler(e.target.value)}>
      <option>All</option>
        <option>Black</option>
        <option>Red</option>
        <option>Stone</option>
      </select>
      </Col>
    </Row>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map(({id,colour,name,price,img}: any) => (
          <Col key={id}>
            <StoreItem id={id} colour={colour} name={name} price={price} imgUrl={img} />
          </Col>
        ))}
      </Row>
    </>
  )
}
