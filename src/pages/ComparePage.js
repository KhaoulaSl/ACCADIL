import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Superposition from '../components/Superposition';
import SideBySide from '../components/SideBySide';
import Tools from '../components/Tools';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/Tools.css';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import './ComparePage.css';

const ComparePage = () => {
    const location = useLocation();
    const [csvData, setCsvData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [view, setView] = useState('superposition'); // par défaut la superposition
    const [transformedPath1, setTransformedPath1] = useState('');

    useEffect(() => {
        if (location.state && location.state.csvData) {
            setCsvData(location.state.csvData);
        }
    }, [location.state]);

    useEffect(() => {
        if (csvData.length > 0) {
            const currentData = csvData[currentIndex];
            const path1 = `${process.env.PUBLIC_URL}/uploads/DS08_R_1205/TEMP/CROP/${currentData.name1}`;

            // Utiliser OpenCV pour la transformation
            transformWithOpenCV(path1, currentData.matrix, (transformedSrc) => {
                setTransformedPath1(transformedSrc);
            });
        }
    }, [csvData, currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % csvData.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + csvData.length) % csvData.length);
    };

    const transformWithOpenCV = (imageSrc, matrix, callback) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const src = window.cv.imread(img); // Lire l'image avec OpenCV
            const matrix3x3 = convert2x3To3x3(matrix); // Convertir la matrice 2x3 en 3x3

            // Appliquer la transformation warpPerspective
            const dsize = new window.cv.Size(img.width, img.height);
            const dst = new window.cv.Mat();
            const M = window.cv.matFromArray(3, 3, window.cv.CV_64F, matrix3x3.flat());

            window.cv.warpPerspective(src, dst, M, dsize, window.cv.INTER_LINEAR, window.cv.BORDER_CONSTANT, new window.cv.Scalar(255, 255, 255, 255));

            // Convertir l'image OpenCV en base64 pour l'affichage
            const resultCanvas = document.createElement('canvas');
            window.cv.imshow(resultCanvas, dst);
            const transformedSrc = resultCanvas.toDataURL();

            // Libérer la mémoire
            src.delete();
            dst.delete();
            M.delete();

            callback(transformedSrc);
        };

        img.onerror = (err) => {
            console.error('Erreur lors du chargement de l\'image :', err);
        };
    };

    const convert2x3To3x3 = (matrix2x3) => {
        return [
            [matrix2x3[0][0], matrix2x3[0][1], matrix2x3[0][2]],
            [matrix2x3[1][0], matrix2x3[1][1], matrix2x3[1][2]],
            [0, 0, 1]
        ];
    };

    if (csvData.length === 0) {
        return <div>Chargement des données...</div>;
    }

    const { name2 } = csvData[currentIndex];
    const path2 = `${process.env.PUBLIC_URL}/uploads/DS08_R_1205/TEMP/CROP/${name2}`;

    return (
        <div className={`container container-fluid p-5 text-center ${view}`}>
            <h1>Comparer les monnaies</h1>
            <h6>{csvData[currentIndex].name1} {name2}</h6>

            <div className="container-fluid p-3 d-flex justify-content-center align-items-center image-container">
                <button className="container-fluid p-2 btn btn-secondary col-2" onClick={handlePrevious} disabled={currentIndex === 0}><ArrowLeft></ArrowLeft></button>
                {view === 'superposition' && (
                    <Superposition className="container-fluid col-6" path1={transformedPath1} path2={path2} />
                )}
                {view === 'sideBySide' && (
                    <SideBySide className="container-fluid p-5 col-6" path1={transformedPath1} path2={path2} />
                )}
                <button className="container-fluid p-2 btn btn-secondary col-2" onClick={handleNext} disabled={currentIndex === csvData.length - 1}><ArrowRight></ArrowRight></button>
            </div>
            <div className="container-fluid row justify-content-center button-container">
                <button
                    className={`btn btn-primary col-2 ${view === 'superposition' ? 'active' : ''}`}
                    onClick={() => setView('superposition')}
                >
                    Superposition
                </button>
                <button
                    className={`btn btn-primary col-2 ${view === 'sideBySide' ? 'active' : ''}`}
                    onClick={() => setView('sideBySide')}
                >
                    Côte à Côte
                </button>
            </div>
            <Tools />
        </div>
    );
};

export default ComparePage;
