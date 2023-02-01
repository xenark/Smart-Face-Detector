import React, { useState, useEffect } from 'react';
import './App.css';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/Navigation/Navigation';
import Rank from './Components/Rank/Rank';
import { FaceRecognitionImage } from './Components/FaceRecognitionImage/FaceRecognitionImage';
import { Signin } from './Components/Signin/Signin';
import { Register } from './Components/Register/Register';

function App() {


  const [linkAddress, setLinkAddress] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [currentImage, clearCurrentImage] = useState(false);
  const [face, setFace] = useState({});
  const [registereduser, setRegistereduser] = useState({
    id: null,
    name: null,
    email: null,
    entries: null,
    joined: null,
  });
  const [route, setRoute] = useState('signin');

  useEffect(() => {
    const getHostData = async () => {
      try {
        const fetchData = await fetch('http://localhost:4000/smartbrain.com/users');
        const toJson = await fetchData.json();
        console.log(toJson)
      } catch (error) {
        console.log(error)
      }
    }
    return getHostData;
  }, [])


  const onInputChange = (e) => {
    setLinkAddress(e.target.value);
  }

  const setBoxes = (data) => {
    const getImageLocations = data.outputs[0].data.regions[0].region_info.bounding_box;
    const getImage = document.getElementById('face');

    const height = Number(getImage.height);
    const width = Number(getImage.width);

    const fleft = getImageLocations.left_col * width;
    const ftop = getImageLocations.top_row * height;
    const fright = width - (getImageLocations.right_col * width);
    const fbottom = height - (getImageLocations.bottom_row * height);
    setFace({
      top: ftop,
      left: fleft,
      right: fright,
      bottom: fbottom,
    })

  }

  const switchRoute = (val) => {
    if (currentImage === true) { setFace({}) }
    clearCurrentImage(true);
    setRoute(val);
  }


  const onSubmit = () => {
    clearCurrentImage(false);
    setImageUrl(linkAddress);

    fetch('http://localhost:4000/smartbrain.com/users/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        link: linkAddress
      })
    }).then((response) => response.json())
      .then((result) => {
        setBoxes(result);
        if (result) {
          fetch('http://localhost:4000/smartbrain.com/users/images', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: registereduser.id
            })
          }).then(response => response.json()).then(data => userINFO(data)).catch(error => console.log(error));
        }
      }).catch(error => console.log(error))
  };

  const userINFO = (user) => {
    setRegistereduser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined,
    })
  }

  return (
    <div className="App">
      {/* <Particles params={particleoptions} id="particles-js" /> */}
      <Navigation currentRoute={route} dashboard={switchRoute} />
      <Logo />
      {route === 'home' ?
        <div>
          <Rank userEntries={registereduser.entries} userName={registereduser.name} />
          <ImageLinkForm submit={onSubmit} changes={onInputChange} />
          <FaceRecognitionImage face={face} link={imageUrl} clearImage={currentImage} />
        </div> : route === 'signin' ?
          <Signin loadUser={userINFO} dashboard={switchRoute} /> : <Register sendUserInfo={userINFO} dashboard={switchRoute} />}
    </div>
  );
}

export default App;
