import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { useContext, useEffect } from 'react';
import { AuthContext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Create from './Pages/Create';
import PContext from './store/PostContext';
import ViewPost from './Pages/ViewPost'


function App() {
  const { user,setUser } = useContext(AuthContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
        setUser(user)
      } else {
        console.log("user is logged out");
      }
    })
  }, [])

  return (
    <div className="App">
      <PContext>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<ViewPost />} />
        </Routes>
      </PContext>
    </div>
  );
}

export default App;
