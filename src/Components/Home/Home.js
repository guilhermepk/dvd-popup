import './Home.css';
import { useEffect, useRef, useState } from 'react';

const Home = () => {
    const [left, setLeft] = useState(1);
    const [top, setTop] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [contentWidth, setContentWidth] = useState(null);
    const [contentHeight, setContentHeight] = useState();
    const [xDirection, setXDirection] = useState('right');
    const [yDirection, setYDirection] = useState('down');
    const [theme, setTheme] = useState(null);
    const [themeNumber, setThemeNumber] = useState(1);
    const [changeTheme, setChangeTheme] = useState(false);
    const [speed, setSpeed] = useState(0.005);
    const contentRef = useRef(null);

    const speedUp = () => {
        setSpeed(prev => prev*2);
    }

    useEffect(() => {
        if(!theme){
            setThemeNumber(1);
        }
    }, [theme]);

    useEffect(() => {
        if(changeTheme){
            speedUp();
            switch(themeNumber){
                case 3:
                    setThemeNumber(1);
                    break;
                default:
                    setThemeNumber(prev => prev+1);
            }
            setChangeTheme(false);
        }
    }, [changeTheme]);

    useEffect(() => {
        const defaultTheme = {
            "left": `${left}px`,
            "top": `${top}px`
        }
        switch(themeNumber){
            case 1:
                setTheme({ ...defaultTheme, color: 'lightblue', background: 'blue' });
                break;
            case 2:
                setTheme({ ...defaultTheme, color: 'lightred', background: 'red' });
                break;
            case 3:
                setTheme({ ...defaultTheme, color: 'lightgreen', background: 'green' });
                break;
        }
    }, [themeNumber]);

    useEffect(() => {
        if(contentRef && contentRef.current){
            setContentWidth(contentRef.current.clientWidth);
            setContentHeight(contentRef.current.clientHeight);
        }
    }, [contentRef]);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, [window.innerWidth]);

    useEffect(() => {
        setWindowHeight(window.innerHeight);
    }, [window.innerHeight]);

    useEffect(() => {
        if(xDirection === 'right'){
            if(left+contentWidth < windowWidth){
                setLeft(prev => prev+speed);
            }else{
                setXDirection('left');
                setChangeTheme(true);
            }
        }else if(xDirection === 'left'){
            if(left > 0){
                setLeft(prev => prev-speed);
            }else{
                setXDirection('right');
                setChangeTheme(true);
            }
        }
        
    }, [left, xDirection]);

    useEffect(() => {
        setTheme((prev) => ({ ...prev, top, left }));
    }, [left, top]);    

    useEffect(() => {
        if(yDirection === 'down'){
            if(top+contentHeight < windowHeight){
                setTop(prev => prev+speed);
            }else{
                setYDirection('up');
                setChangeTheme(true);
            }
        }else if(yDirection === 'up'){
            if(top > 0){
                setTop(prev => prev-speed);
            }else{
                setYDirection('down');
                setChangeTheme(true);
            }
        }
        
    }, [top, yDirection]);

    return (
        <div className='main-content'>
            <h1
                ref={contentRef}
                style={theme}
                className='content'
            >
                DVD
            </h1>
        </div>
    );
}

export default Home;