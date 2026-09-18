import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Globe, Heart, Menu, Share, Star, X } from 'lucide-react';
import './styles.css';

const photos = [
  { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90', alt: 'Sunlit living room with a curved sofa' },
  { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90', alt: 'Warm open plan lounge and kitchen' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90', alt: 'Bedroom with crisp linen and ocean light' },
  { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90', alt: 'Minimal bathroom with stone finishes' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90', alt: 'White villa surrounded by greenery' },
  { src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=90', alt: 'Quiet bedroom with a linen headboard' },
  { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=90', alt: 'Textured sitting area' },
  { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90', alt: 'Softly lit dining area' },
];

function App() {
  const [view, setView] = useState('listing');
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightboxReturn, setLightboxReturn] = useState('listing');
  const lastFocused = useRef(null);

  const openTour = (index = 0) => { lastFocused.current = document.activeElement; setActivePhoto(index); setView('tour'); };
  const openLightbox = (index) => { lastFocused.current = document.activeElement; setLightboxReturn(view); setActivePhoto(index); setView('lightbox'); };
  const closeOverlay = () => { setView(view === 'lightbox' ? lightboxReturn : 'listing'); requestAnimationFrame(() => lastFocused.current?.focus()); };

  useEffect(() => {
    if (view === 'listing') return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeOverlay();
      if (view === 'lightbox' && event.key === 'ArrowRight') setActivePhoto((photo) => (photo + 1) % photos.length);
      if (view === 'lightbox' && event.key === 'ArrowLeft') setActivePhoto((photo) => (photo - 1 + photos.length) % photos.length);
    };
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.classList.remove('modal-open'); window.removeEventListener('keydown', onKeyDown); };
  }, [view]);

  return (
    <>
      <Header />
      {view === 'listing' && <Listing onOpenTour={openTour} onOpenLightbox={openLightbox} />}
      {view === 'tour' && <PhotoTour onClose={closeOverlay} onOpenLightbox={openLightbox} />}
      {view === 'lightbox' && <Lightbox index={activePhoto} onClose={closeOverlay} onNext={() => setActivePhoto((activePhoto + 1) % photos.length)} onPrev={() => setActivePhoto((activePhoto - 1 + photos.length) % photos.length)} />}
    </>
  );
}

function Header() {
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsFloating(window.scrollY > 560);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  return <div className="site-header-shell"><header className={`site-header${isFloating ? ' is-floating' : ''}`}><a className="brand" href="#top" aria-label="airbnb home"><span className="brand-mark">⌂</span><span>airbnb</span></a><div className="search-pill"><strong>Anywhere</strong><i /><strong>Any week</strong><i /><span>Add guests</span><button aria-label="Search"><span>⌕</span></button></div><nav><a href="#host">Airbnb your home</a><button className="icon-button" aria-label="Choose language"><Globe size={17} /></button><button className="profile-button" aria-label="Open account menu"><Menu size={18} /><span className="avatar">S</span></button></nav></header></div>;
}

function Listing({ onOpenTour, onOpenLightbox }) {
  return <main id="top" className="listing-page"><div className="breadcrumbs">Homes <span>/</span> Europe <span>/</span> Portugal <span>/</span> Lisbon</div><div className="title-row"><div><h1>Casa do Sol, a quiet home above the sea</h1><div className="subline"><span><Star size={15} fill="currentColor" /> 4.96</span><span> · </span><a href="#reviews">127 reviews</a><span> · </span><span>Lisbon, Portugal</span></div></div><div className="title-actions"><button onClick={() => navigator.clipboard?.writeText(location.href)}><Share size={16} /> Share</button><button><Heart size={17} /> Save</button></div></div><div className="hero-grid" aria-label="Property photos"><button className="hero-main" onClick={() => onOpenLightbox(0)}><img src={photos[0].src} alt={photos[0].alt} /></button><button onClick={() => onOpenLightbox(1)}><img src={photos[1].src} alt={photos[1].alt} /></button><button onClick={() => onOpenLightbox(2)}><img src={photos[2].src} alt={photos[2].alt} /></button><button onClick={() => onOpenLightbox(3)}><img src={photos[3].src} alt={photos[3].alt} /></button><button className="last-photo" onClick={() => onOpenTour(4)}><img src={photos[4].src} alt={photos[4].alt} /><span><span className="grid-icon">⊞</span> Show all photos</span></button></div><div className="content-grid"><section className="details"><div className="property-intro"><div><h2>Entire villa hosted by Sofia</h2><p>6 guests · 3 bedrooms · 4 beds · 2 baths</p></div><div className="host-avatar">S</div></div><div className="feature-list"><Feature icon="⌁" title="Designed for staying awhile" text="This home has a kitchen and laundry space for longer stays." /><Feature icon="⌂" title="A peaceful place to stay" text="This home is in a quiet neighborhood away from the crowds." /><Feature icon="✦" title="Great for remote work" text="Fast wifi and a dedicated workspace make it easy to settle in." /></div><div className="description"><p>Wake up to the Atlantic in this sun-washed hillside villa. Casa do Sol pairs original stonework with calm, contemporary interiors and a garden made for long lunches.</p><button>Show more <ArrowRight size={14} /></button></div><div className="divider" /><h2 className="sleep-title">Where you'll sleep</h2><div className="sleep-cards"><div><div className="bed-icon">⌁</div><strong>Bedroom 1</strong><span>1 queen bed</span></div><div><div className="bed-icon">⌁</div><strong>Bedroom 2</strong><span>1 queen bed</span></div><div><div className="bed-icon">⌁</div><strong>Bedroom 3</strong><span>2 single beds</span></div></div></section><BookingCard /></div></main>;
}
function Feature({ icon, title, text }) { return <div className="feature"><b>{icon}</b><div><strong>{title}</strong><span>{text}</span></div></div>; }
function BookingCard() { return <aside className="booking-card"><div className="price"><strong>$284</strong> night</div><div className="rating-small"><Star size={13} fill="currentColor" /> 4.96 · <u>127 reviews</u></div><div className="date-fields"><button><small>CHECK-IN</small><strong>Jun 14, 2025</strong></button><button><small>CHECKOUT</small><strong>Jun 19, 2025</strong></button></div><button className="guests-field"><small>GUESTS</small><strong>2 guests</strong><ChevronDown size={15} /></button><button className="reserve">Reserve</button><p className="no-charge">You won't be charged yet</p><div className="cost-line"><span>$284 x 5 nights</span><span>$1,420</span></div><div className="cost-line"><span>Airbnb service fee</span><span>$170</span></div><div className="cost-total"><strong>Total before taxes</strong><strong>$1,590</strong></div></aside>; }

function PhotoTour({ onClose, onOpenLightbox }) { return <div className="tour-overlay"><div className="tour-top"><button onClick={onClose} className="back-button"><ArrowLeft size={17} /> Back to listing</button><span>Photo tour</span><button className="close-button" onClick={onClose} aria-label="Close photo tour"><X size={20} /></button></div><div className="tour-grid">{photos.map((photo, index) => <button key={photo.src} onClick={() => onOpenLightbox(index)}><img src={photo.src} alt={photo.alt} /><span>{index + 1}</span></button>)}</div></div>; }
function Lightbox({ index, onClose, onNext, onPrev }) { return <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Photo ${index + 1} of ${photos.length}`}><div className="lightbox-bar"><button className="close-button" onClick={onClose} aria-label="Close photo"><X size={22} /></button><span>{index + 1} / {photos.length}</span><button className="lightbox-share" aria-label="Share photo"><Share size={18} /></button></div><button className="gallery-arrow previous" onClick={onPrev} aria-label="Previous photo"><ChevronLeft size={30} /></button><img className="lightbox-image" src={photos[index].src} alt={photos[index].alt} /><button className="gallery-arrow next" onClick={onNext} aria-label="Next photo"><ChevronRight size={30} /></button><p className="lightbox-caption">{photos[index].alt}</p></div>; }

const root = globalThis.__stayGalleryRoot ?? createRoot(document.getElementById('root'));
globalThis.__stayGalleryRoot = root;
root.render(<App />);
