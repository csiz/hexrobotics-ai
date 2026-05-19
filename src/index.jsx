import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import handImg1 from './media/robot-hand-pics/hand_pointing_cool.jpg';
import handImg2 from './media/robot-hand-pics/cad_model_of_robot_hand.png';
import handImg3 from './media/robot-hand-pics/hexrobotics_handling_screenshot.png';
import motorImg from './media/motor-driver-pics/hex-mini-motor-driver-circuit-shot.jpg';

const handImages = [handImg1, handImg2, handImg3];

const projects = [
  {
    title: 'Dextrous Robot Hand',
    subtitle: '21-DOF Tendon-Driven Manipulator',
    images: handImages,
    imageAlt: 'Hex Robotics dextrous robot hand',
    description:
      'A highly capable 21-degree-of-freedom robotic hand driven by tendons and servo actuators. ' +
      'Designed for dextrous manipulation tasks, the hand closely mirrors human finger kinematics — ' +
      'enabling precise grasping, gesturing, and tool use. Built with custom 3-D printed linkages ' +
      'and an open-source firmware stack.',
    link: 'https://github.com/csiz/hextech-mecha-hand/tree/master',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'Mini Motor Driver',
    subtitle: 'Compact Brushless Motor Controller',
    images: [motorImg],
    imageAlt: 'Hex mini motor driver PCB',
    description:
      'A small-footprint electronic circuit designed to drive brushless DC motors with high efficiency ' +
      'and precise torque control. The board integrates gate drivers, current sensing, and an onboard ' +
      'microcontroller to deliver a self-contained FOC solution that slots neatly into tight robotic ' +
      'assemblies.',
    link: 'https://github.com/csiz/hex-single-motor-mini-drive',
    linkLabel: 'View on GitHub',
  },
];

function SlideshowImage({ images, alt }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % images.length);
        setVisible(true);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <img
      src={images[index]}
      alt={alt}
      className="project-card__image"
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}

function ProjectCard({ title, subtitle, images, imageAlt, description, link, linkLabel }) {
  return (
    <article className="project-card">
      <div className="project-card__image-wrap">
        <SlideshowImage images={images} alt={imageAlt} />
      </div>
      <div className="project-card__body">
        <h2 className="project-card__title">{title}</h2>
        <p className="project-card__subtitle">{subtitle}</p>
        <p className="project-card__description">{description}</p>
        <a href={link} className="project-card__link" target="_blank" rel="noopener noreferrer">
          {linkLabel} &rarr;
        </a>
      </div>
    </article>
  );
}

function App() {
  return (
    <div className="page">
      <header className="site-header">
        <div className="site-header__inner">
          <span className="site-header__logo">HEX</span>
          <div className="site-header__text">
            <h1 className="site-header__title">Hex Robotics</h1>
            <p className="site-header__tagline">Open-source robotics hardware &amp; firmware</p>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="projects-intro">
          <h2 className="projects-intro__heading">Our Projects</h2>
          <p className="projects-intro__body">
            We build open robotics hardware — from nimble motor controllers to fully articulated
            hands. Everything is designed to be reproducible, hackable, and well-documented.
          </p>
        </section>

        <section className="projects-grid">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Hex Robotics &mdash; open-source forever.</p>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);