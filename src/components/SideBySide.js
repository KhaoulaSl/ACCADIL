import React, { useRef, useEffect, useState } from 'react';
import './SideBySide.css'

const SideBySide = ({ path1, path2 }) => {
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const cursor1Ref = useRef(null);
  const cursor2Ref = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event, imageRef, cursorRef, otherCursorRef, otherImageRef) => {
    if (!imageRef.current || !cursorRef.current || !otherCursorRef.current || !otherImageRef.current) {
      return;
    }

    const rect = imageRef.current.getBoundingClientRect();
    const otherRect = otherImageRef.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    cursorRef.current.style.left = `${offsetX}px`;
    cursorRef.current.style.top = `${offsetY}px`;

    const otherOffsetX = (offsetX / rect.width) * otherRect.width;
    const otherOffsetY = (offsetY / rect.height) * otherRect.height;

    otherCursorRef.current.style.left = `${otherOffsetX}px`;
    otherCursorRef.current.style.top = `${otherOffsetY}px`;
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const image1 = image1Ref.current;
    const image2 = image2Ref.current;

    const onImage1MouseMove = (event) => handleMouseMove(event, image1Ref, cursor1Ref, cursor2Ref, image2Ref);
    const onImage2MouseMove = (event) => handleMouseMove(event, image2Ref, cursor2Ref, cursor1Ref, image1Ref);

    if (image1) {
      image1.addEventListener('mousemove', onImage1MouseMove);
      image1.addEventListener('mouseenter', handleMouseEnter);
      image1.addEventListener('mouseleave', handleMouseLeave);
    }

    if (image2) {
      image2.addEventListener('mousemove', onImage2MouseMove);
      image2.addEventListener('mouseenter', handleMouseEnter);
      image2.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (image1) {
        image1.removeEventListener('mousemove', onImage1MouseMove);
        image1.removeEventListener('mouseenter', handleMouseEnter);
        image1.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (image2) {
        image2.removeEventListener('mousemove', onImage2MouseMove);
        image2.removeEventListener('mouseenter', handleMouseEnter);
        image2.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ position: 'relative', marginRight: '10px' }}>
        <img ref={image1Ref} src={path1} alt="Image 1" style={{ width: 'auto', height: 'auto' }} />
        {isHovering && (
          <div ref={cursor1Ref} className="custom-cursor" />
        )}
      </div>
      <div style={{ position: 'relative' }}>
        <img ref={image2Ref} src={path2} alt="Image 2" style={{ width: 'auto', height: 'auto' }} />
        {isHovering && (
          <div ref={cursor2Ref} className="custom-cursor" />
        )}
      </div>
    </div>
  );
};

export default SideBySide;
