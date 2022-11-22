// Imports
import './style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logoImg from './images/logo.png';
import profileImg from './images/profile.png';
import beefImg from './images/beef.png';

const logo = document.getElementById('logo');
const profile = document.getElementById('profile');
const beefArr = document.getElementsByClassName('beef');

logo.src = logoImg;
profile.src = profileImg;
for (let i = 0; i < beefArr.length; i += 1) {
  const element = beefArr[i];
  element.src = beefImg;
}