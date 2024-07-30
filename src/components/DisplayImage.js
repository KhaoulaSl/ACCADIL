import React, { useEffect, useRef, useState } from 'react';

// Fonction utilitaire pour transformer une matrice 2x3 en 3x3
const convert2x3To3x3 = (matrix2x3) => {
    return [
        [matrix2x3[0][0], matrix2x3[0][1], matrix2x3[0][2]],
        [matrix2x3[1][0], matrix2x3[1][1], matrix2x3[1][2]],
        [0, 0, 1]
    ];
};

const DisplayImage = ({ imagePath, matrix }) => {
    const [opencvLoaded, setOpencvLoaded] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const checkOpenCVReady = setInterval(() => {
            if (window.cv && window.cv.imread) {
                clearInterval(checkOpenCVReady);
                setOpencvLoaded(true);
            }
        }, 100);
        return () => clearInterval(checkOpenCVReady);
    }, []);

    useEffect(() => {
        if (opencvLoaded) {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = imagePath;

            img.onload = () => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;

                // Remplir le canvas avec une couleur blanche
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Lire l'image avec OpenCV
                const src = window.cv.imread(img);

                // Convertir la matrice 2x3 en 3x3
                const matrix3x3 = convert2x3To3x3(matrix);

                // Appliquer la transformation warpPerspective
                const dsize = new window.cv.Size(img.width, img.height);
                const dst = new window.cv.Mat();
                const M = window.cv.matFromArray(3, 3, window.cv.CV_64F, matrix3x3.flat());

                window.cv.warpPerspective(src, dst, M, dsize, window.cv.INTER_LINEAR, window.cv.BORDER_CONSTANT, new window.cv.Scalar(255, 255, 255, 255));

                // Afficher l'image transformée sur le canvas
                window.cv.imshow(canvas, dst);

                // Libérer la mémoire
                src.delete();
                dst.delete();
                M.delete();
            };

            img.onerror = (err) => {
                console.error('Erreur lors du chargement de l\'image :', err);
            };
        }
    }, [opencvLoaded, imagePath, matrix]);

    return (
        <div>
            {opencvLoaded ? (
                <canvas ref={canvasRef}></canvas>
            ) : (
                <p>Chargement d'OpenCV...</p>
            )}
        </div>
    );
};

export default DisplayImage;
