import { Link, Navigate, useParams } from 'react-router-dom'
import ScreenGallery from '../components/ScreenGallery'
import { sroyioDomains } from '../data/sroyioDomains'
import { placeholderScreens } from '../data/sroyioScreens'

function SroyioDomain() {
  const { domainId } = useParams()
  const domainIndex = sroyioDomains.findIndex((item) => item.id === domainId)
  const domain = sroyioDomains[domainIndex]

  if (!domain) return <Navigate to="/sroyio" replace />

  const previousDomain = domainIndex > 0 ? sroyioDomains[domainIndex - 1] : undefined
  const nextDomain = domainIndex < sroyioDomains.length - 1 ? sroyioDomains[domainIndex + 1] : undefined

  return (
    <div className="domain-detail-layout">
      <aside className="domain-sidebar">
        <div>
          <Link to="/" className="domain-sidebar-logo">Juhong.</Link>
          <Link to="/sroyio" className="back-to-project">← Sroyio</Link>
        </div>
        <nav className="domain-sidebar-nav">
          <a href="#overview">Overview</a><a href="#features">Features</a><a href="#screens">Screens</a><a href="#architecture">Architecture</a><a href="#data-model">Data Model</a><a href="#engineering">Engineering</a>
        </nav>
        <div className="domain-sidebar-bottom">{domain.number} / {String(sroyioDomains.length).padStart(2, '0')}</div>
      </aside>

      <main className="domain-content">
        <section id="overview" className="domain-hero">
          <div className="domain-eyebrow"><span>{domain.category}</span><span>{domain.number}</span></div>
          <h1>{domain.name}</h1>
          <p className="domain-description">{domain.description}</p>
          <div className="domain-overview-grid">
            <div><span>Domain</span><strong>{domain.name}</strong></div>
            <div><span>Category</span><strong>{domain.category}</strong></div>
            <div><span>Features</span><strong>{domain.features.length}</strong></div>
            <div><span>Status</span><strong>Preparing</strong></div>
          </div>
        </section>

        <section id="features" className="domain-section">
          <div className="domain-section-title"><span>01</span><div><h2>Features</h2><p>해당 도메인에 포함된 모든 기능을 소개하는 영역입니다.</p></div></div>
          <div className="feature-grid">
            {domain.features.map((feature, index) => (
              <article className="feature-card" key={feature}><span>{String(index + 1).padStart(2, '0')}</span><h3>{feature}</h3><p>상세 설명은 최종 단계에서 작성합니다.</p></article>
            ))}
          </div>
        </section>

        <section id="screens" className="domain-section">
          <div className="domain-section-title"><span>02</span><div><h2>Screens</h2><p>실제 Sroyio 화면을 기능별로 탐색할 수 있는 영역입니다.</p></div></div>
          <ScreenGallery domainName={domain.name} screens={placeholderScreens} />
        </section>

        <section id="architecture" className="domain-section">
          <div className="domain-section-title"><span>03</span><div><h2>Architecture</h2><p>해당 도메인의 내부 구조와 데이터 흐름을 설명합니다.</p></div></div>
          <div className="technical-placeholder"><span>DOMAIN ARCHITECTURE</span><strong>Architecture Diagram</strong><p>실제 구조는 최종 단계에서 추가합니다.</p></div>
        </section>

        <section id="data-model" className="domain-section">
          <div className="domain-section-title"><span>04</span><div><h2>Data Model</h2><p>핵심 Entity와 관계를 보여주는 영역입니다.</p></div></div>
          <div className="technical-placeholder light"><span>DATA MODEL</span><strong>ERD / Entity Relationship</strong><p>실제 Entity 구조는 최종 단계에서 추가합니다.</p></div>
        </section>

        <section id="engineering" className="domain-section">
          <div className="domain-section-title"><span>05</span><div><h2>Engineering</h2><p>이 도메인에서 다룬 주요 기술적 문제와 해결 과정을 소개합니다.</p></div></div>
          <div className="domain-engineering-grid">
            <div><span>CASE 01</span><h3>Problem</h3><p>Coming Soon</p></div>
            <div><span>CASE 02</span><h3>Decision</h3><p>Coming Soon</p></div>
            <div><span>CASE 03</span><h3>Verification</h3><p>Coming Soon</p></div>
          </div>
        </section>

        <nav className="domain-bottom-navigation" aria-label="Domain navigation">
          <div>
            {previousDomain ? <Link to={`/sroyio/${previousDomain.id}`}>← <span>Previous</span><strong>{previousDomain.name}</strong></Link> : <span />}
          </div>
          <Link to="/sroyio" className="all-domains-link">All Domains</Link>
          <div className="next-domain-link">
            {nextDomain ? <Link to={`/sroyio/${nextDomain.id}`}><span>Next</span><strong>{nextDomain.name}</strong> →</Link> : <span />}
          </div>
        </nav>
      </main>
    </div>
  )
}

export default SroyioDomain
