import React, { useState } from 'react';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';

const Carroussel = ({ cards, offset, showArrows, width, height, margin }) => {
    const [goToSlide, setGoToSlide] = useState(null);

    const table = cards.map((element, index) => {
        return { ...element, onClick: () => setGoToSlide(index) };
    });

    return (
        <div style={{ width, height, margin }}>
            <Carousel
                slides={table}
                goToSlide={goToSlide}
                offsetRadius={offset}
                showNavigation={showArrows}
                animationConfig={config.gentle}
            />
        </div>
    );
};

export default Carroussel;
