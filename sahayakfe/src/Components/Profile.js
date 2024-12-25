// import React, { useEffect, useState, useContext } from 'react';
// import { ThemeContext } from '../App'; // Import ThemeContext
// import { Button, Container, Row, Col, Card, Alert, ButtonGroup } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom'; // import useNavigate for routing
// import axios from 'axios'; // import axios for making API calls
// import Cookies from 'js-cookie'; // import Cookies to manage cookies
// import { FaUserCircle } from 'react-icons/fa'; // import the user icon
// import { QRCodeSVG } from 'qrcode.react'; // import the QR code component
// import './Profile.css'; // import styles

// const Profile = () => {
//   const navigate = useNavigate();
//   const { theme, handleThemeChange } = useContext(ThemeContext); // Use the context

//   // State to store user data
//   const [user, setUser] = useState({ username: '', email: '' });
//   const [loading, setLoading] = useState(true); // To handle loading state
//   const [error, setError] = useState(null); // To handle any errors
//   const [showQRCode, setShowQRCode] = useState(false); // State to control QR code visibility
//   const [upiURI, setUpiURI] = useState('upi://pay?pa=merchant@upi&pn=Merchant+Name&mc=1234&tid=12345&txn=67890&amt=10.00&cu=INR'); // Example UPI link

//   // Fetch user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/user/info', { withCredentials: true });
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setError('Failed to fetch user data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/user/logout', {}, { withCredentials: true });
//       Cookies.remove('isLoggedIn');
//       Cookies.remove('token');
//       navigate('/login');
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     const confirmation = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
//     if (confirmation) {
//       try {
//         const response = await axios.delete('http://localhost:5000/api/user/delete', { withCredentials: true });
//         if (response.status === 200) {
//           alert('Your account has been deleted successfully.');
//           handleLogout();
//         }
//       } catch (error) {
//         console.error('Error deleting account:', error);
//         alert('An error occurred while deleting your account. Please try again.');
//       }
//     }
//   };

//   const handleUpgradeClick = () => {
//     setShowQRCode((prevState) => !prevState);
//   };

//   return (
//     <Container className="mt-4 text-light">
//       <h1 className="text-center mb-4">Your Profile</h1>

//       {loading ? (
//         <Alert variant="info">Loading...</Alert>
//       ) : error ? (
//         <Alert variant="danger">{error}</Alert>
//       ) : (
//         <Card className="mb-4 bg-dark text-light">
//           <Card.Body>
//             <Row className="align-items-center">
//               <Col md={4} className="text-center">
//                 <div className="profile-avatar">
//                   {user.username.charAt(0).toUpperCase() || <FaUserCircle size={50} />}
//                 </div>
//               </Col>
//               <Col md={8}>
//                 <h3>{user.username}</h3>
//                 <p>{user.email}</p>
//               </Col>
//             </Row>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Buttons arranged neatly using ButtonGroup */}
//       <div className="text-center">
//         <ButtonGroup className="mb-4">
//           <Button variant="primary" onClick={() => navigate('/settings')}>Settings</Button>
//           <Button variant="secondary" onClick={handleLogout}>Logout</Button>
//           <Button variant="success" onClick={handleUpgradeClick}>Upgrade</Button>
//           <Button variant="warning" onClick={() => handleThemeChange(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</Button>
//           <Button variant="danger" onClick={handleDeleteAccount}>Delete Account</Button>
//         </ButtonGroup>
//       </div>

//       {/* Display QR Code if the state is true */}
//       {showQRCode && (
//         <div className="text-center mt-4">
//           <QRCodeSVG value={upiURI} size={256} />
//           <h5 className="mt-2">Scan to Pay</h5>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default Profile;
