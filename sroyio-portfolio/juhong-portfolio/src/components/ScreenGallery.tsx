import { useEffect, useMemo, useState } from 'react'
import type { SroyioScreen } from '../data/sroyioScreens'

interface ScreenGalleryProps {
  domainName: string
  screens: SroyioScreen[]
}

function ScreenGallery({ domainName, screens }: ScreenGalleryProps) {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(screens.map((screen) => screen.category)))],
    [screens],
  )

  const [category, setCategory] = useState('All')
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const filteredScreens = useMemo(
    () => (category === 'All' ? screens : screens.filter((screen) => screen.category === category)),
    [category, screens],
  )

  useEffect(() => {
    setIndex(0)
  }, [category])

  const current = filteredScreens[index] ?? filteredScreens[0]

  if (!current) return null

  const previous = () => {
    setIndex((value) => (value - 1 + filteredScreens.length) % filteredScreens.length)
  }

  const next = () => {
    setIndex((value) => (value + 1) % filteredScreens.length)
  }

  return (
    <div className="screen-gallery">
      <div className="screen-filter" aria-label="Screen categories">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? 'active' : ''}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="screen-viewer">
        <button
          className="screen-viewer-image"
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`${current.title} 크게 보기`}
        >
          {current.image ? (
            <img src={current.image} alt={`${domainName} - ${current.title}`} />
          ) : (
            <>
              <span>SCREEN PREVIEW</span>
              <strong>{current.title}</strong>
              <small>최종 단계에서 실제 Sroyio 화면으로 교체합니다.</small>
            </>
          )}
        </button>

        <div className="screen-viewer-controls">
          <button type="button" onClick={previous} aria-label="이전 화면">←</button>
          <span>{String(index + 1).padStart(2, '0')} / {String(filteredScreens.length).padStart(2, '0')}</span>
          <button type="button" onClick={next} aria-label="다음 화면">→</button>
        </div>
      </div>

      <div className="screen-thumbnails">
        {filteredScreens.map((screen, screenIndex) => (
          <button
            key={screen.id}
            type="button"
            className={screenIndex === index ? 'active' : ''}
            onClick={() => setIndex(screenIndex)}
            title={screen.title}
          >
            <span>{String(screenIndex + 1).padStart(2, '0')}</span>
            <small>{screen.title}</small>
          </button>
        ))}
      </div>

      <div className="screen-description">
        <span>{current.category.toUpperCase()}</span>
        <h3>{current.title}</h3>
        <p>{current.description}</p>
      </div>

      {lightboxOpen && (
        <div className="screen-lightbox" role="dialog" aria-modal="true">
          <button className="lightbox-close" type="button" onClick={() => setLightboxOpen(false)} aria-label="닫기">×</button>
          <button className="lightbox-arrow left" type="button" onClick={previous} aria-label="이전 화면">←</button>

          <div className="lightbox-content">
            {current.image ? (
              <img src={current.image} alt={`${domainName} - ${current.title}`} />
            ) : (
              <div className="lightbox-placeholder">
                <span>{domainName}</span>
                <strong>{current.title}</strong>
                <p>실제 이미지 Lightbox 영역</p>
              </div>
            )}
          </div>

          <button className="lightbox-arrow right" type="button" onClick={next} aria-label="다음 화면">→</button>
        </div>
      )}
    </div>
  )
}

export default ScreenGallery
