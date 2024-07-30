import React from 'react';
import './Tools.css';
import { ZoomIn, CursorFill, Pen, Eraser, Rulers, BoxArrowInUp } from 'react-bootstrap-icons';

const Tools = () => {
    return (
        <div className="outil-bar">
            <button className="outil-button"><ZoomIn className="lg" /></button>
            <button className="outil-button"><CursorFill className="lg" /></button>
            <button className="outil-button"><Pen className="lg" /></button>
            <button className="outil-button"><Eraser className="lg" /></button>
            <button className="outil-button"><Rulers className="lg" /></button>
            <button className="outil-button"><BoxArrowInUp className="lg" /></button>
        </div>
    );
};

export default Tools;