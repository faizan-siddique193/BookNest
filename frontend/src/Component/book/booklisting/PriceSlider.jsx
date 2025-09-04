// src/components/BookListing/PriceSlider.jsx
import React, { useState, useEffect, useRef } from 'react';

const PriceSlider = ({ value, onChange }) => {
  const [minValue, maxValue] = value;
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const containerRef = useRef(null);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxValue - 1);
    onChange([newMin, maxValue]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minValue + 1);
    onChange([minValue, newMax]);
  };

  const calculatePosition = (value) => {
    return ((value - 0) / (100 - 0)) * 100;
  };

  const handleMouseDown = (type) => (e) => {
    if (type === 'min') setIsDraggingMin(true);
    if (type === 'max') setIsDraggingMax(true);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const position = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    const newValue = Math.min(Math.max(Math.round(position), 0), 100);
    
    if (isDraggingMin) {
      const clampedValue = Math.min(newValue, maxValue - 1);
      onChange([clampedValue, maxValue]);
    }
    
    if (isDraggingMax) {
      const clampedValue = Math.max(newValue, minValue + 1);
      onChange([minValue, clampedValue]);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingMin, isDraggingMax, minValue, maxValue]);

  return (
    <div className="mb-8">
      <h3 className="font-medium text-primary mb-3">Price Range</h3>
      
      <div className="flex justify-between mb-2">
        <div className="text-sm text-muted">
          <span className="font-medium text-primary">${minValue}</span> - 
          <span className="font-medium text-primary"> ${maxValue}</span>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="relative h-8 w-full cursor-pointer"
        onMouseDown={(e) => {
          const containerRect = containerRef.current.getBoundingClientRect();
          const position = ((e.clientX - containerRect.left) / containerRect.width) * 100;
          
          if (Math.abs(position - minValue) < Math.abs(position - maxValue)) {
            handleMouseDown('min')(e);
          } else {
            handleMouseDown('max')(e);
          }
        }}
      >
        {/* Background track */}
        <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 rounded-full transform -translate-y-1/2"></div>
        
        {/* Active track */}
        <div 
          className="absolute top-1/2 h-1.5 bg-accent rounded-full transform -translate-y-1/2"
          style={{
            left: `${calculatePosition(minValue)}%`,
            right: `${100 - calculatePosition(maxValue)}%`
          }}
        ></div>
        
        {/* Min thumb */}
        <div 
          className="absolute top-1/2 w-5 h-5 bg-white border-2 border-accent rounded-full shadow transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
          style={{ left: `${calculatePosition(minValue)}%` }}
          onMouseDown={handleMouseDown('min')}
        >
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-primary text-white px-1.5 py-0.5 rounded whitespace-nowrap">
            ${minValue}
          </div>
        </div>
        
        {/* Max thumb */}
        <div 
          className="absolute top-1/2 w-5 h-5 bg-white border-2 border-accent rounded-full shadow transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
          style={{ left: `${calculatePosition(maxValue)}%` }}
          onMouseDown={handleMouseDown('max')}
        >
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-primary text-white px-1.5 py-0.5 rounded whitespace-nowrap">
            ${maxValue}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between text-sm text-muted mt-2">
        <span>$0</span>
        <span>$100</span>
      </div>
    </div>
  );
};

export default PriceSlider;