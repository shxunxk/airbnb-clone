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

let tourAssetIndex = 0;
const tourAsset = () => photos[tourAssetIndex++ % photos.length].src;
const tourRooms = [
  { name: 'Living room 1', meta: 'Sofa · Air conditioning · Ceiling fan · TV', images: ['a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg', 'a45feaa2-b607-4092-83ac-5fd4b2894959.jpeg', 'f1da1c3d-0d10-481e-9b63-c71f9073f30b.jpeg'] },
  { name: 'Living room 2', meta: 'Ceiling fan · Hot tub', images: ['090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg', '9be71047-fc52-438a-9270-75cb470f6752.jpeg', 'f6de1663-4e9c-4414-b63b-29a154a92ee1.jpeg', '2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg', '34529829-a971-44d3-ac2f-90ea3678a34d.jpeg', '153aa732-4935-48b8-a6fe-b469b6af5efc.jpeg', '3c6e6809-1bb1-47a6-8e24-aff593e1c28f.jpeg'] },
  { name: 'Full kitchen', meta: 'Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery', images: ['56c44812-52c0-4481-90d8-101ec1f34c7a.jpeg', 'ddc853d7-e658-405c-bedc-8f31106c447e.jpeg'] },
  { name: 'Bedroom', meta: 'Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi', images: ['67c61c6f-6260-4809-9510-0360e58a345d.jpeg', '1c827136-4a85-4fe0-8e69-3fd8ea19bb17.jpeg', '0622ab42-b851-4d55-9d9f-df3143bc5909.jpeg', 'a74e3c0b-3188-4442-9146-1cd4d6ea45df.jpeg', '48a8ffbc-fbf7-4f84-bc29-ee400da3f08b.jpeg', '3cf31697-f3f3-4c60-82c4-029acb119ae4.jpeg'] },
  { name: 'Full bathroom', meta: 'Hairdryer · Hot water · Shampoo · Shower gel', images: ['97c78f8a-5090-4663-aebc-ba4e13b47092.jpeg'] },
  { name: 'Gym', meta: 'Air conditioning · Gym · Exercise equipment · Ceiling fan', images: ['9aa8e65f-94ac-4ba0-9a10-9ec91e536d22.jpeg', '246bd88d-4dd6-4117-a401-02a36ebfcf16.jpeg', '4fede77d-7a71-446f-89e3-263af937f3fa.jpeg', '79f59adb-5a5f-4d6c-8109-1f01f4ca0d03.jpeg', 'f19d8c0a-1d88-42a4-9218-686d4f0db7e4.jpeg'] },
  { name: 'Exterior', meta: '', images: ['23ea6621-6f74-4baa-acea-2fd03e312b41.jpeg', '5adfdf3e-d497-4efc-ab8c-fc559dab311e.jpeg', '608748cd-6ee7-4a71-88a2-ba79d3ddba5a.jpeg', '5b856fde-a393-41bf-b373-c9d02e64221f.jpeg', 'c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d.jpeg', '42befad7-fb29-473d-91db-b03e7a544d1d.jpeg'] },
  { name: 'Pool', meta: 'Pool', images: ['fc02f48f-a937-42c5-895d-f9cc3113d6ca.jpeg', '929545d3-e241-46c0-8a70-c24531ce7b54.jpeg', '8eb65a8b-e795-4870-b141-6f63b1be24ae.jpeg'] },
  { name: 'Additional photos', meta: '', images: ['70325367-cbae-4993-b560-18cd3f6edd53.jpeg', 'cc7a56bd-242c-498a-9aef-0cffac619e54.jpeg', '30ad93b2-293f-494d-b645-626303c6cb93.jpeg', '9642a60d-e9de-4e1a-89c2-9ebd230f4a74.jpeg', 'b6599f26-d65c-4df0-baf2-ef18c82a86a3.jpeg', 'dc01fd46-b119-48d3-a43b-f6c093e26eca.jpeg', 'fe37b80e-da8a-4225-b27b-dfbb5d763c01.jpeg', '3c90338e-86b4-423f-aae1-279e0ccc3a18.jpeg', '862d936c-0f34-4e50-af87-b519e2781d19.jpeg', '79addceb-8c2d-419b-80ff-e29af426a94c.jpeg'] },
].map((room) => ({ ...room, images: room.images.map((filename) => ({ src: tourAsset(filename), alt: room.name })) }));
const tourPhotos = tourRooms.flatMap((room) => room.images);

function App() {
  const [view, setView] = useState('listing');
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightboxPhotos, setLightboxPhotos] = useState(photos);
  const [lightboxReturn, setLightboxReturn] = useState('listing');
  const lastFocused = useRef(null);

  const openTour = (index = 0) => { lastFocused.current = document.activeElement; setActivePhoto(index); setView('tour'); };
  const openLightbox = (index, gallery = photos) => { lastFocused.current = document.activeElement; setLightboxPhotos(gallery); setLightboxReturn(view); setActivePhoto(index); setView('lightbox'); };
  const closeOverlay = () => { setView(view === 'lightbox' ? lightboxReturn : 'listing'); requestAnimationFrame(() => lastFocused.current?.focus()); };

  useEffect(() => {
    if (view === 'listing') return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeOverlay();
      if (view === 'lightbox' && event.key === 'ArrowRight') setActivePhoto((photo) => (photo + 1) % lightboxPhotos.length);
      if (view === 'lightbox' && event.key === 'ArrowLeft') setActivePhoto((photo) => (photo - 1 + lightboxPhotos.length) % lightboxPhotos.length);
    };
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.classList.remove('modal-open'); window.removeEventListener('keydown', onKeyDown); };
  }, [view]);

  return (
    <>
      <Header />
      {view === 'listing' && <><ListingSectionBar /><Listing onOpenTour={openTour} onOpenLightbox={openLightbox} /></>}
      {view === 'tour' && <PhotoTour onClose={closeOverlay} onOpenLightbox={(index) => openLightbox(index, tourPhotos)} />}
      {view === 'lightbox' && <Lightbox photos={lightboxPhotos} index={activePhoto} onClose={closeOverlay} onNext={() => setActivePhoto((activePhoto + 1) % lightboxPhotos.length)} onPrev={() => setActivePhoto((activePhoto - 1 + lightboxPhotos.length) % lightboxPhotos.length)} />}
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

  return <div className="site-header-shell"><header className={`site-header${isFloating ? ' is-hidden' : ''}`}><a className="brand" href="#top" aria-label="airbnb home"><span className="brand-mark">⌂</span><span>airbnb</span></a><div className="search-pill"><strong>Anywhere</strong><i /><strong>Any week</strong><i /><span>Add guests</span><button aria-label="Search"><span>⌕</span></button></div><nav><a href="#host">Airbnb your home</a><button className="icon-button" aria-label="Choose language"><Globe size={17} /></button><button className="profile-button" aria-label="Open account menu"><Menu size={18} /><span className="avatar">S</span></button></nav></header></div>;
}

function ListingSectionBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateBar = () => setIsVisible(window.scrollY > 560);
    updateBar();
    window.addEventListener('scroll', updateBar, { passive: true });
    return () => window.removeEventListener('scroll', updateBar);
  }, []);

  return <div className={`listing-section-bar${isVisible ? ' is-visible' : ''}`} aria-hidden={!isVisible}><div className="section-bar-inner"><nav aria-label="Listing sections"><a href="#photos">Photos</a><a href="#amenities">Amenities</a><a href="#reviews">Reviews</a><a href="#location">Location</a></nav><div className="section-bar-booking"><div><strong>₹28,499</strong> <span>for 5 nights</span><small><Star size={12} fill="currentColor" /> 4.95 · <u>19 reviews</u></small></div><button>Reserve</button></div></div></div>;
}

function Listing({ onOpenTour, onOpenLightbox }) {
  return <main id="top" className="listing-page"><div className="breadcrumbs">Homes <span>/</span> Europe <span>/</span> Portugal <span>/</span> Lisbon</div><div className="title-row"><div><h1>Casa do Sol, a quiet home above the sea</h1><div className="subline"><span><Star size={15} fill="currentColor" /> 4.96</span><span> · </span><a href="#reviews">127 reviews</a><span> · </span><span>Lisbon, Portugal</span></div></div><div className="title-actions"><button onClick={() => navigator.clipboard?.writeText(location.href)}><Share size={16} /> Share</button><button><Heart size={17} /> Save</button></div></div><div id="photos" className="hero-grid" aria-label="Property photos"><button className="hero-main" onClick={() => onOpenLightbox(0)}><img src={photos[0].src} alt={photos[0].alt} /></button><button onClick={() => onOpenLightbox(1)}><img src={photos[1].src} alt={photos[1].alt} /></button><button onClick={() => onOpenLightbox(2)}><img src={photos[2].src} alt={photos[2].alt} /></button><button onClick={() => onOpenLightbox(3)}><img src={photos[3].src} alt={photos[3].alt} /></button><button className="last-photo" onClick={() => onOpenTour(4)}><img src={photos[4].src} alt={photos[4].alt} /><span><span className="grid-icon">⊞</span> Show all photos</span></button></div><div className="content-grid"><section className="details"><div id="amenities" className="property-intro"><div><h2>Entire villa hosted by Sofia</h2><p>6 guests · 3 bedrooms · 4 beds · 2 baths</p></div><div className="host-avatar">S</div></div><div className="feature-list"><Feature icon="⌁" title="Designed for staying awhile" text="This home has a kitchen and laundry space for longer stays." /><Feature icon="⌂" title="A peaceful place to stay" text="This home is in a quiet neighborhood away from the crowds." /><Feature icon="✦" title="Great for remote work" text="Fast wifi and a dedicated workspace make it easy to settle in." /></div><div id="reviews" className="description"><p>Wake up to the Atlantic in this sun-washed hillside villa. Casa do Sol pairs original stonework with calm, contemporary interiors and a garden made for long lunches.</p><button>Show more <ArrowRight size={14} /></button></div><div className="divider" /><h2 id="location" className="sleep-title">Where you'll sleep</h2><div className="sleep-cards"><div><img src={photos[2].src} alt="Bedroom with crisp linen and ocean light" /><strong>Bedroom 1</strong><span>1 queen bed</span></div><div><img src={photos[5].src} alt="Quiet bedroom with a linen headboard" /><strong>Bedroom 2</strong><span>1 queen bed</span></div><div><img src={photos[7].src} alt="Softly lit dining area" /><strong>Bedroom 3</strong><span>2 single beds</span></div></div></section><BookingCard /></div></main>;
}
function Feature({ icon, title, text }) { return <div className="feature"><b>{icon}</b><div><strong>{title}</strong><span>{text}</span></div></div>; }
function BookingCard() { return <aside className="booking-card"><div className="price"><strong>$284</strong> night</div><div className="rating-small"><Star size={13} fill="currentColor" /> 4.96 · <u>127 reviews</u></div><div className="date-fields"><button><small>CHECK-IN</small><strong>Jun 14, 2025</strong></button><button><small>CHECKOUT</small><strong>Jun 19, 2025</strong></button></div><button className="guests-field"><small>GUESTS</small><strong>2 guests</strong><ChevronDown size={15} /></button><button className="reserve">Reserve</button><p className="no-charge">You won't be charged yet</p><div className="cost-line"><span>$284 x 5 nights</span><span>$1,420</span></div><div className="cost-line"><span>Airbnb service fee</span><span>$170</span></div><div className="cost-total"><strong>Total before taxes</strong><strong>$1,590</strong></div></aside>; }

function PhotoTour({ onClose, onOpenLightbox }) {
  let photoIndex = 0;
  return <div className="tour-overlay" role="dialog" aria-modal="true" aria-label="Photo tour"><header className="tour-top"><button onClick={onClose} className="tour-icon-button" aria-label="Back to listing"><ArrowLeft size={22} /></button><h1>Photo tour</h1><div className="tour-actions"><button className="tour-icon-button" aria-label="Share photo tour"><Share size={19} /></button><button className="tour-icon-button" aria-label="Save photo tour"><Heart size={19} /></button></div></header><div className="tour-content"><nav className="tour-category-nav" aria-label="Photo categories">{tourRooms.map((room, index) => <a href={`#tour-room-${index}`} key={room.name}><img src={room.images[0].src} alt="" /><span>{room.name}</span></a>)}</nav><div className="tour-rooms">{tourRooms.map((room, roomIndex) => { const startIndex = photoIndex; photoIndex += room.images.length; return <section className="tour-room" id={`tour-room-${roomIndex}`} key={room.name}><div className="room-heading"><h2>{room.name}</h2>{room.meta && <p>{room.meta}</p>}</div><div className={`room-photo-grid count-${room.images.length}`}>{room.images.map((photo, index) => <button key={`${room.name}-${index}`} onClick={() => onOpenLightbox(startIndex + index)} aria-label={`${room.name} photo ${index + 1}`}><img src={photo.src} alt={photo.alt} /></button>)}</div></section>; })}</div></div></div>;
}
function Lightbox({ photos: gallery, index, onClose, onNext, onPrev }) { return <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Photo ${index + 1} of ${gallery.length}`}><div className="lightbox-bar"><button className="close-button" onClick={onClose} aria-label="Close photo"><X size={22} /></button><span>{index + 1} / {gallery.length}</span><button className="lightbox-share" aria-label="Share photo"><Share size={18} /></button></div><button className="gallery-arrow previous" onClick={onPrev} aria-label="Previous photo"><ChevronLeft size={30} /></button><img className="lightbox-image" src={gallery[index].src} alt={gallery[index].alt} /><button className="gallery-arrow next" onClick={onNext} aria-label="Next photo"><ChevronRight size={30} /></button><p className="lightbox-caption">{gallery[index].alt}</p></div>; }

const root = globalThis.__stayGalleryRoot ?? createRoot(document.getElementById('root'));
globalThis.__stayGalleryRoot = root;
root.render(<App />);
