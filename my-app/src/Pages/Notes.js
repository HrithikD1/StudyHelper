import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firestore, storage } from '../firebase';

function Notes() {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Fetch existing files from Firestore
        const fetchFiles = async () => {
            const filesCollection = await firestore.collection('files').get();
            setFiles(filesCollection.docs.map(doc => doc.data()));
        };

        fetchFiles();
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files?.item(0));
    };

    const handleFileUpload = async () => {
        if (!file) return;

        // Upload file to Firebase Storage
        const storageRef = storage.ref(`files/${file.name}`);
        await storageRef.put(file);
        const fileURL = await storageRef.getDownloadURL();

        // Save file metadata to Firestore
        const fileRef = firestore.collection('files').doc();
        await fileRef.set({
            name: file.name,
            url: fileURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        // Update the local state with the new file
        setFiles([...files, { name: file.name, url: fileURL }]);
        setFile(null); // Clear the file input
    };

    return (
        <>
            <nav className="sidebar">
                <ul className="sidebar-nav">
                    <li><Link to="/Techniques">Study Techniques</Link></li>
                    <li><Link to="/ai">AI Study Assistant</Link></li>
                </ul>
            </nav>
            <header>
                Notes
            </header>
            <main>
                <section>
                    <h2>Recent</h2>
                    {/* Display recent files */}
                    {files.slice(0, 5).map((file, index) => (
                        <button key={index} onClick={() => window.open(file.url, '_blank')}>{file.name}</button>
                    ))}
                </section>
                <section>
                    <h2>All Files</h2>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleFileUpload}>Upload File</button>
                    {/* Display all files */}
                    {files.map((file, index) => (
                        <button key={index} onClick={() => window.open(file.url, '_blank')}>{file.name}</button>
                    ))}
                </section>
            </main>
        </>
    );
}

export default Notes;
