import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../store/PostContext';
import './View.css';
import React, { useContext, useEffect, useState } from 'react';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

function View() {

  const [user, setUserDetails] = useState('')
  const { viewProducts } = useContext(PostContext)

  const navigate = useNavigate('')

  const fetchData = async () => {
    if (!viewProducts || !viewProducts.Userid)
      return

    try {
      const userQuery = query(collection(db, "Users"), where('id', '==', viewProducts.Userid))
      const querySnapshot = await getDocs(userQuery)

      if (querySnapshot.empty) {
        console.log('No matching documents');
        return
      }

      querySnapshot.forEach(doc => {
        setUserDetails(doc.data())
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [viewProducts])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        {viewProducts && (
          <img
            src={viewProducts.url}
            alt="product image"
          />
        )}
      </div>
      <div className="rightSection">
        <div className="productDetails">
          {viewProducts && (
            <>
              <p>&#x20B9; {viewProducts.price} </p>
              <span>{viewProducts.name}</span>
              <p>{viewProducts.category}</p>
              <span>{viewProducts.createdAt}</span>
            </>
          )}
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {user && (
            <>
              <p>{user.userName}</p>
              <p>{user.PhoneNumber}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
  
}
export default View;
