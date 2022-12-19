import { useState } from 'react';
import { darkStyle, lightStyle } from '../hsl-map-style';
import { setMapStyle, useStateValue } from '../state';
import { setDarkTheme, setLightTheme } from '../utils/theme';
import './Header.css';
import { BsLightbulb, BsLightbulbOff } from 'react-icons/bs';

const Header = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [, dispatch] = useStateValue();

  const onClick = () => {
    if(theme === 'dark'){
      dispatch(setMapStyle(lightStyle));
      setLightTheme();
      setTheme('light');
    } 
    if(theme === 'light'){
      dispatch(setMapStyle(darkStyle));
      setDarkTheme();
      setTheme('dark');
    } 
  };

  return (
    <header className="App-header">
      <h1>
        Disruption info 
        {theme === 'light' && 
          <BsLightbulb className="Light" onClick={onClick}/>
        }
        {theme === 'dark' && 
          <BsLightbulbOff className="Light" onClick={onClick}/>
        }
      </h1>
    </header>
  );
};

export default Header;