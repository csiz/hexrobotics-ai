import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import handImg1 from './media/robot-hand-pics/hand_pointing_cool.jpg';
import handImg2 from './media/robot-hand-pics/cad_model_of_robot_hand.png';
import handImg3 from './media/robot-hand-pics/hexrobotics_handling_screenshot.png';
import motorImg from './media/motor-driver-pics/hex-mini-motor-driver-circuit-shot.jpg';

const handImages = [handImg1, handImg2, handImg3];

const projects = [
  {
    id: 'hex-dextrous-hand',
    navLabel: 'Hex Dextrous Hand',
    title: 'Hex Dextrous Hand',
    subtitle: '21-DOF Sensor Rich Robotic Hand',
    images: handImages,
    imageAlt: 'Hex Robotics dextrous robot hand',
    description:
      'A highly capable 21-degree-of-freedom robotic hand with rich sensor feedback. ' +
      'Designed for dextrous manipulation tasks, the hand mirrors human finger kinematics including ' +
      'opposable thumb and pinkie. A patented flexible circuit folds like an ' +
      'origami around the fingers placing magnetic rotation sensors and capacitive pressure sensors at ' +
      'every joint and fingertip, providing rich proprioceptive feedback for advanced control algorithms. ' +
      'All 3D files are open sourced and our custom motor drivers can be ordered individually for easy repairs.',
    link: 'https://github.com/csiz/hextech-mecha-hand/tree/master',
    linkLabel: 'View on GitHub',
    youtubeLink: 'https://www.youtube.com/shorts/kJ4OLfqDy5U',
  },
  {
    id: 'hex-motor-mini-drive',
    navLabel: 'Hex Motor Mini Drive',
    title: 'Hex Motor Mini Drive',
    subtitle: 'Compact Brushless Motor Controller',
    images: [motorImg],
    imageAlt: 'Hex mini motor driver PCB',
    description:
      'A small-footprint, open source, electronic circuit designed to drive brushless DC motors (3 wire)  ' +
      'and servos (4 wire) with high efficiency and precise torque control. The board connects via USB-C ' +
      'for power and communication and implements a field oriented motor controller running at 28kHz for ' +
      'smooth operation. Also includes 2 I2C ports for magnetic rotation sensor modules.',
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
      className="project-section__image"
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}

function ProjectSection({ id, title, subtitle, images, imageAlt, description, link, linkLabel, youtubeLink, reverse }) {
  return (
    <section id={id} className={`project-section${reverse ? ' project-section--reverse' : ''}`}>
      <div className="project-section__media">
        <SlideshowImage images={images} alt={imageAlt} />
      </div>
      <div className="project-section__content">
        <p className="project-section__subtitle">{subtitle}</p>
        <h2 className="project-section__title">{title}</h2>
        <p className="project-section__description">{description}</p>
        <div className="project-section__links">
          <a href={link} className="project-section__link" target="_blank" rel="noopener noreferrer">
            {linkLabel} &rarr;
          </a>
          {youtubeLink && (
            <a href={youtubeLink} className="project-section__link project-section__link--youtube" target="_blank" rel="noopener noreferrer">
              Watch Demo &rarr;
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-section__inner">
        <a
          href="https://www.linkedin.com/in/calin-mocanu-40571922/"
          target="_blank"
          rel="noopener noreferrer"
          className="about-section__avatar-link"
          aria-label="Calin Mocanu on LinkedIn"
        >
          <div className="about-section__avatar">CM</div>
        </a>
        <div className="about-section__body">
          <h2 className="about-section__name">Calin Mocanu</h2>
          <p className="about-section__bio">
            Builder of open-source robotics hardware. Interested in dextrous manipulation,
            motor control, and making capable robots accessible to everyone.
          </p>
          <div className="about-section__links">
            <a
              href="https://www.linkedin.com/in/calin-mocanu-40571922/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-section__link"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/csiz"
              target="_blank"
              rel="noopener noreferrer"
              className="about-section__link"
            >
              GitHub
            </a>
            <span className="about-section__email">
              calin (dot) mocanu (at) gmail
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="page">
      <header className="site-header">
        <div className="site-header__inner">
          <div className="site-header__brand">
            <span className="site-header__logo">HEX</span>
            <div className="site-header__text">
              <h1 className="site-header__title">Hex Robotics</h1>
              <p className="site-header__tagline">Open-source robotics hardware &amp; firmware</p>
            </div>
          </div>
          <nav className="site-nav">
            {projects.map((p) => (
              <a key={p.id} href={`#${p.id}`} className="site-nav__link">{p.navLabel}</a>
            ))}
            <a href="#about" className="site-nav__link site-nav__link--accent">About Us</a>
          </nav>
        </div>
      </header>

      <main className="main">
        {projects.map((p, i) => (
          <ProjectSection key={p.id} {...p} reverse={i % 2 !== 0} />
        ))}
        <AboutSection />
      </main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Hex Robotics &mdash; open-source forever.</p>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);