import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

const Create = () => {

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [percent, setPercent] = useState('')
  const [image, setImage] = useState(null)

  const { user } = useContext(AuthContext)
  const navigate = useNavigate('')

  const date = new Date()

  const handdleSubmit = () => {
    if (name.trim() === '' || category.trim() === '' || price.trim() === '' || image == null) {
      return alert('Please fill all data');
    }

    try {
      const storageRef = ref(storage, `images/${image.name}`)
      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setPercent(percent);
        },
        (error) => {
          console.error('Error during upload:', error);
          alert('Error uploading image. Please try again.'); // Show error to user
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log('Download URL:', url);

            const docRef = addDoc(collection(db, "products"), {
              name,
              category,
              price,
              url,
              Userid: user.uid,
              createdAt: date.toDateString()
            });
            navigate('/')
          });
        }
      );
    } catch {

    }
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="fname"
            name="Name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="fname"
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            id="fname"
            name="Price" />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px"
            src={image ? URL.createObjectURL(image) : ''}></img>
          <br />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <button onClick={handdleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
