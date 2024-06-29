import './Post.css';
import React, { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { PostContext } from '../../store/PostContext';

function Posts() {

  const [products, setProducts] = useState([])
  const { setViewProducts } = useContext(PostContext)
  const navigate = useNavigate('')

  const fetchPost = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'))
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setProducts(newData, () => {
        console.log('Updated Products:', products);
      })
      console.log('New data:', newData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => (
            <div className="card" onClick={() => {
              setViewProducts(product);
              navigate('/view');
            }}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}


        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="https://financialexpresswpcontent.s3.amazonaws.com/uploads/2021/09/Yamaha-R15-V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>Fri May 03 2024</span>
            </div>
          </div>

          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="https://financialexpresswpcontent.s3.amazonaws.com/uploads/2021/09/Yamaha-R15-V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>Fri May 03 2024</span>
            </div>
          </div>

          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="https://financialexpresswpcontent.s3.amazonaws.com/uploads/2021/09/Yamaha-R15-V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>Fri May 03 2024</span>
            </div>
          </div>

          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="https://financialexpresswpcontent.s3.amazonaws.com/uploads/2021/09/Yamaha-R15-V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>Fri May 03 2024</span>
            </div>
          </div>

          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="https://financialexpresswpcontent.s3.amazonaws.com/uploads/2021/09/Yamaha-R15-V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>Fri May 03 2024</span>
            </div>
          </div>

          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="https://financialexpresswpcontent.s3.amazonaws.com/uploads/2021/09/Yamaha-R15-V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>Fri May 03 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
