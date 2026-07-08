import './App.css';
import Home from './component/Home';
import About from './component/About';
import Contact from './component/Contact'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import { AuthProvider } from './context/AuthContext';
import Cart from './component/Cart';
import AddCamera from './component/AddCamera';
import Cameras from './component/Cameras';
import Booking from './component/Booking';
import Payment from './component/Payment';
import Confirm from './component/Confirm';
import ViewItem from './component/ViewItem';
import BookingList from './component/Booking';

function App() {
  return (
    <Router>
      <Layout>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-camera" element={<AddCamera />} />
          <Route path="/cameras" element={<Cameras />} />
          <Route path="/booking" element={<Booking />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/confirm' element={<Confirm />} />
          <Route path='/camera/:id' element={<ViewItem/>} />
          <Route path="/my-bookings" element={<BookingList />} />


        </Routes>

      </Layout>
    </Router>
  );
}

export default App;


