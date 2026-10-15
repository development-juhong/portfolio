import { Link } from 'react-router-dom'
import { sroyioDomains } from '../data/sroyioDomains'

function SroyioHub() {
  const categories = ['Communication', 'Collaboration', 'Content', 'Platform', 'Intelligence']

  return (
    <div className="sroyio-page">
      <header className="project-header">
        <Link to="/" className="project-brand">Juhong.</Link>
        <div className="project-breadcrumb"><Link to="/">Portfolio</Link><span>/</span><strong>Sroyio</strong></div>
        <div className="project-header-label">Project</div>
      </header>

      <main>
        <section className="sroyio-hero">
          <div className="sroyio-hero-label">FEATURED PROJECT</div>
          <h1>Sroyio</h1>
          <p className="sroyio-subtitle">Enterprise Collaboration Platform</p>
          <p className="sroyio-introduction">프로젝트의 목적과 배경을 설명하는 영역입니다. 실제 내용은 Sroyio 개선 작업 완료 후 정리합니다.</p>
          <div className="sroyio-project-meta">
            <div><span>Period</span><strong>Coming Soon</strong></div>
            <div><span>Role</span><strong>Backend / Architecture</strong></div>
            <div><span>Domains</span><strong>{sroyioDomains.length}</strong></div>
            <div><span>Status</span><strong>In Progress</strong></div>
          </div>
        </section>

        <section className="sroyio-section">
          <div className="sroyio-section-heading"><span>01</span><div><h2>Product Overview</h2><p>전체 시스템 구조와 핵심 기술을 소개하는 영역입니다.</p></div></div>
          <div className="project-placeholder-large"><span>ARCHITECTURE</span><strong>System Architecture</strong><p>최종 단계에서 실제 Sroyio 아키텍처 다이어그램을 배치합니다.</p></div>
        </section>

        <section className="sroyio-section">
          <div className="sroyio-section-heading"><span>02</span><div><h2>Explore Domains</h2><p>Sroyio를 구성하는 모든 업무 도메인을 탐색할 수 있습니다.</p></div></div>
          <div className="domain-category-list">
            {categories.map((category) => {
              const domains = sroyioDomains.filter((domain) => domain.category === category)
              return (
                <div className="domain-category" key={category}>
                  <div className="domain-category-title"><span>{category}</span><small>{domains.length}</small></div>
                  <div className="domain-grid">
                    {domains.map((domain) => (
                      <Link to={`/sroyio/${domain.id}`} className="domain-card" key={domain.id}>
                        <div className="domain-card-top"><span>{domain.number}</span><span>↗</span></div>
                        <div><h3>{domain.name}</h3><p>{domain.description}</p></div>
                        <div className="domain-card-footer"><span>{domain.features.length} Features</span><span>{domain.category}</span></div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="sroyio-section">
          <div className="sroyio-section-heading"><span>03</span><div><h2>Engineering</h2><p>도메인을 넘어 프로젝트 전체에서 발생한 기술 문제와 설계 판단을 정리합니다.</p></div></div>
          <div className="engineering-hub-grid">
            {['Architecture', 'Concurrency', 'Security', 'Performance', 'Reliability', 'Integration'].map((item, index) => (
              <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item}</h3><p>Coming Soon</p></div>
            ))}
          </div>
        </section>

        <section className="sroyio-section">
          <div className="sroyio-section-heading"><span>04</span><div><h2>Repository</h2><p>소스 코드와 상세 기술 문서로 연결되는 영역입니다.</p></div></div>
          <div className="repository-placeholder"><span>GitHub Repository</span><strong>Coming Soon</strong></div>
        </section>
      </main>

      <footer className="project-footer"><Link to="/">← Portfolio Home</Link><span>Sroyio Project</span></footer>
    </div>
  )
}

export default SroyioHub
