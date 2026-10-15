import { Link } from 'react-router-dom'

function PortfolioHome() {
  return (
    <div className="portfolio">
      <header className="header">
        <a href="#" className="logo">Juhong.</a>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#engineering">Engineering</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-status"><span className="status-dot" /><span>Portfolio</span></div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-top">
            <p className="eyebrow">JAVA / SPRING BACKEND DEVELOPER</p>
            <p className="hero-location">SOUTH KOREA</p>
          </div>
          <div className="hero-main">
            <h1>안녕하세요.<br />서주홍입니다.</h1>
            <div className="hero-bottom">
              <p className="hero-description">기업 시스템 운영 경험과 제품 개발 경험을 바탕으로<br />백엔드 개발 역량을 확장하고 있습니다.</p>
              <div className="hero-actions">
                <a href="#projects" className="primary-button">View Projects</a>
                <a href="#contact" className="secondary-button">Contact</a>
              </div>
            </div>
          </div>
          <div className="hero-meta">
            <div className="hero-meta-item"><span>Focus</span><strong>Backend Development</strong></div>
            <div className="hero-meta-item"><span>Main Stack</span><strong>Java · Spring</strong></div>
            <div className="hero-meta-item"><span>Featured Project</span><strong>Sroyio</strong></div>
          </div>
        </section>

        <section id="about" className="section">
          <p className="section-number">01</p>
          <div className="section-heading"><h2>About</h2><p>개발자로서의 소개와 현재 집중하고 있는 분야를 보여주는 영역입니다.</p></div>
          <div className="about-grid">
            <div className="about-main"><p className="placeholder-label">INTRODUCTION</p><h3>소개 문구가<br />들어갈 자리입니다.</h3><p className="muted-text">최종 포트폴리오 단계에서 실제 내용으로 교체합니다.</p></div>
            <div className="about-info">
              <div className="info-row"><span>Position</span><strong>Backend Developer</strong></div>
              <div className="info-row"><span>Focus</span><strong>Java / Spring</strong></div>
              <div className="info-row"><span>Location</span><strong>South Korea</strong></div>
              <div className="info-row"><span>Status</span><strong>Portfolio Preparing</strong></div>
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <p className="section-number">02</p>
          <div className="section-heading"><h2>Experience</h2><p>실제 업무와 기술 경험을 문제 해결 중심으로 소개하는 영역입니다.</p></div>
          <div className="experience-list">
            <article className="experience-item">
              <div className="experience-period">2024 — Present</div>
              <div className="experience-content"><p className="placeholder-label">CURRENT EXPERIENCE</p><h3>Enterprise System Engineer</h3><p className="experience-role">Groupware · Java · Oracle · Tomcat</p><p className="muted-text">실제 경력 상세 내용은 최종 단계에서 정리합니다.</p></div>
            </article>
          </div>
        </section>

        <section id="projects" className="section">
          <p className="section-number">03</p>
          <div className="section-heading"><h2>Projects</h2><p>대표 프로젝트의 전체 구조와 기술적 특징을 탐색할 수 있습니다.</p></div>
          <article className="featured-project">
            <div className="featured-project-header"><div><p className="placeholder-label">FEATURED PROJECT</p><h3>Sroyio</h3></div><span className="project-badge">In Progress</span></div>
            <div className="featured-project-body">
              <div className="project-preview"><div className="project-preview-inner"><span>PROJECT</span><strong>Sroyio<br />Enterprise Collaboration Platform</strong><p>여러 업무 도메인을 하나의 플랫폼으로 통합하는 기업용 협업 서비스</p></div></div>
              <div className="project-overview">
                <div><span className="mini-label">PROJECT STRUCTURE</span><p>Sroyio의 전체 도메인과 각 도메인의 기능, 설계 및 Engineering Case를 별도 Project Hub에서 탐색할 수 있도록 구성합니다.</p></div>
                <div className="project-summary-numbers"><div><strong>13</strong><span>Domains</span></div><div><strong>+</strong><span>Features</span></div><div><strong>1</strong><span>Platform</span></div></div>
                <Link to="/sroyio" className="project-enter-button">Explore Sroyio <span>→</span></Link>
              </div>
            </div>
          </article>
        </section>

        <section id="engineering" className="section">
          <p className="section-number">04</p>
          <div className="section-heading"><h2>Engineering</h2><p>대표적인 설계, 문제 해결, 성능 및 안정성 경험을 정리합니다.</p></div>
          <div className="home-engineering-grid">
            <div><span>01</span><h3>Architecture</h3><p>System Design & Domain Structure</p></div>
            <div><span>02</span><h3>Problem Solving</h3><p>Troubleshooting & Decisions</p></div>
            <div><span>03</span><h3>Performance</h3><p>Measurement & Optimization</p></div>
            <div><span>04</span><h3>Reliability</h3><p>Security & Consistency</p></div>
          </div>
        </section>

        <section id="skills" className="section">
          <p className="section-number">05</p>
          <div className="section-heading"><h2>Skills</h2><p>실제 업무와 프로젝트에서 사용하는 기술 영역입니다.</p></div>
          <div className="skills-grid">
            <div className="skill-group"><span>Backend</span><h3>Java / Spring</h3></div>
            <div className="skill-group"><span>Database</span><h3>PostgreSQL / Oracle</h3></div>
            <div className="skill-group"><span>Infrastructure</span><h3>Linux / Docker / Tomcat</h3></div>
            <div className="skill-group"><span>Development</span><h3>Git / GitHub</h3></div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <p className="section-number">06</p><p className="placeholder-label">CONTACT</p><h2>함께 이야기하고<br />싶다면 연락해주세요.</h2><p className="muted-text">최종 단계에서 Email 및 GitHub 링크를 추가합니다.</p>
        </section>
      </main>

      <footer className="footer"><span>© 2026 Juhong Seo</span><span>Backend Developer Portfolio</span></footer>
    </div>
  )
}

export default PortfolioHome
