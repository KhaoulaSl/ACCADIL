import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'react-bootstrap-icons';
import Papa from 'papaparse';

function parseMatrix(matrixString) {
    // Si la matrice est vide
    if (matrixString === '0') {
        return [[0, 0, 0], [0, 0, 0]];
    }

    try {
        const cleanedString = matrixString.replace(/\[\s*/g, '[').replace(/\s*\]/g, ']').replace(/\s+/g, ' ');
        const rows = cleanedString.split('] [').map(row => {
            const trimmedRow = row.replace(/^\[\s*|\s*\]$/g, '');
            const values = trimmedRow.match(/-?\d+(\.\d+)?/g).map(value => parseFloat(value));
            return values;
        });
        return rows;
    } catch (error) {
        console.error('Erreur de parsing de la matrice :', error);
        return [[0, 0, 0], [0, 0, 0]]; 
    }
}

function Dashboard() {
    const navigate = useNavigate();

    const handleUpload = (event) => {
        const file = event.target.files[0];
        Papa.parse(file, {
            header: true,
            transform: (value, header) => {
                if (header === 'H') {
                    return parseMatrix(value);
                }
                return value;
            },
            complete: (results) => {
                const csvData = results.data.map(row => ({
                    name1: row['name1'],
                    path1: row['path1'],
                    name2: row['name2'],
                    path2: row['name2'],
                    matrix: row['H']
                }));
                navigate('/compare', { state: { csvData } });
            }
        });
    };

    return (
        <div>
            <h1>Tableau de bord</h1>
            <p>Bienvenue, vous êtes connecté.</p>
            <input
                type="file"
                id="fileUpload"
                accept=".csv"
                style={{ display: 'none' }}
                onChange={handleUpload}
            />
            <button
                className="upload-button"
                onClick={() => document.getElementById('fileUpload').click()}
            >
                <Plus className="lg" />
            </button>
        </div>
    );
}

export default Dashboard;
