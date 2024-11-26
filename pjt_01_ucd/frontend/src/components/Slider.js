import React, { useState, useEffect } from 'react';
import './style/Slider.css'; // 필요한 스타일을 별도의 CSS 파일에 정의합니다.
import image0 from './assets/img/main-01-image.png';
import image1 from './assets/img/main-02-image.png';
import image2 from './assets/img/main-03-image.png';

const Slider = () => {
    const height = 350;
    const images = [
        image0,
        image1,
        image2
    ];
    const [current, setCurrent] = useState(0);

    const moveTo = (index) => {
        setCurrent(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prevCurrent) => (prevCurrent + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="slider w3-card w3-round" style={{ height }}>
            <div className="images" style={{ position: 'relative', height, left: `-${current * 100}%`, transition: 'left 2s' }} >
                {images.map((src, index) => (
                    <img key={index} className="image" src={src} style={{ height }} />
                ))}
                <div className="image" style={{ height }}>
                    <h1>이미지가 아닌 것</h1>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
            <div className="buttons">
                {images.map((_, index) => (
                    <button key={index} onClick={() => moveTo(index)}> {index + 1} </button>
                ))}
            </div>
        </div>
    );
};

export default Slider;
