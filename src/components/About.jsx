// About.jsx
import React from 'react';
import './About.css';

function About() {
  const putriImage = '/src/assets/dkrnkwkymyts02.JPG';
  const galihImage = '/src/assets/dkrnkwkymyts02.JPG';
  const rifkyImage = '/src/assets/dkrnkwkymyts02.JPG';
  const danielImage = '/src/assets/dkrnkwkymyts02.JPG';

  return (
    <div className="about-container">
      <h1>Kelompok 29</h1>
      <div className="image-grid">
        {/* Menambahkan elemen untuk setiap anggota tim */}
        <div className="image-item">
          <img src={putriImage} alt="Putri Almaas Auliasari" />
          <p>Putri Almaas Auliasari</p>
        </div>
        <div className="image-item">
          <img src={galihImage} alt="Galih Bayu Prakoso" />
          <p>Galih Bayu Prakoso</p>
        </div>
        <div className="image-item">
          <img src={rifkyImage} alt="Rifky Hernanda" />
          <p>Rifky Hernanda</p>
        </div>
        <div className="image-item">
          <img src={danielImage} alt="Daniel Alvaro Sormin" />
          <p>Daniel Alvaro Sormin</p>
        </div>
      </div>
    </div>
  );
}

export default About;
