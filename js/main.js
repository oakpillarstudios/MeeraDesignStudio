/**
 * MEERA DESIGN STUDIO — ARCHITECTURE & INTERIOR DESIGN
 * Lightweight, Clean Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Transparent to Frosted Header on Scroll
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('mobile-open');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('mobile-open');
      });
    });
  }

  // 2. Active Navigation on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 3. Consultation Inquiry Form Handler
  const inquiryForm = document.getElementById('inquiryForm');
  const projectTypeSelect = document.getElementById('projectType');
  const formSuccessCard = document.getElementById('formSuccessCard');
  const successNameDisplay = document.getElementById('successNameDisplay');
  const successWhatsAppBtn = document.getElementById('successWhatsAppBtn');
  const btnResetForm = document.getElementById('btnResetForm');

  // Form Submission
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('clientName');
      const phoneInput = document.getElementById('clientPhone');
      const emailInput = document.getElementById('clientEmail');
      const locationInput = document.getElementById('projectLocation');
      const briefInput = document.getElementById('projectBrief');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const type = projectTypeSelect ? projectTypeSelect.value : '';
      const location = locationInput ? locationInput.value.trim() : '';
      const brief = briefInput ? briefInput.value.trim() : '';

      if (!name || !phone || !brief) {
        if (!name && nameInput) nameInput.focus();
        else if (!phone && phoneInput) phoneInput.focus();
        else if (!brief && briefInput) briefInput.focus();
        return;
      }

      const message = `Hello Meera Design Studio,\n\nI would like to discuss a project consultation:\n• Full Name: ${name}\n• Phone Number: ${phone}\n${email ? `• Email: ${email}\n` : ''}${type ? `• Project Type: ${type}\n` : ''}• Project Location: ${location || 'Pune / Maharashtra'}\n• Project Details:\n${brief}`;
      const waUrl = `https://wa.me/917498987520?text=${encodeURIComponent(message)}`;

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank');

      // Display In-Card Success Confirmation State
      if (formSuccessCard) {
        if (successNameDisplay) successNameDisplay.textContent = name;
        if (successWhatsAppBtn) successWhatsAppBtn.href = waUrl;
        inquiryForm.style.display = 'none';
        formSuccessCard.removeAttribute('hidden');
      }
    });

    // Reset Form button
    if (btnResetForm) {
      btnResetForm.addEventListener('click', () => {
        inquiryForm.reset();
        if (formSuccessCard) {
          formSuccessCard.setAttribute('hidden', '');
          inquiryForm.style.display = 'flex';
        }
      });
    }
  }

  // 4. Project Category Tabs Filter
  const filterItems = document.querySelectorAll('.projects-filter-list .filter-item');
  const stackCards = document.querySelectorAll('.stack-project-card');

  if (filterItems.length) {
    filterItems.forEach(item => {
      item.addEventListener('click', () => {
        filterItems.forEach(f => {
          f.classList.remove('active');
          f.setAttribute('aria-selected', 'false');
        });
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');

        const filter = item.getAttribute('data-filter');
        stackCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || filter === 'residential' || category === filter) {
            card.style.opacity = '1';
          } else {
            card.style.opacity = '0.5';
          }
        });
      });
    });
  }

  // 5. Animated Metric Counters on Scroll
  const metricCounters = document.querySelectorAll('.metric-stat-number[data-target]');
  if (metricCounters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const duration = 1400;
          const startTime = performance.now();

          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(easeOut * target);
            el.textContent = `${current}+`;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = `${target}+`;
            }
          };

          requestAnimationFrame(updateCount);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    metricCounters.forEach(counter => counterObserver.observe(counter));
  }

  // 6. Subtle Scroll Reveal for About the Studio Trust Cards
  const revealCards = document.querySelectorAll('.reveal-card');
  if (revealCards.length && 'IntersectionObserver' in window) {
    const cardRevealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealCards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 80}ms`;
      cardRevealObserver.observe(card);
    });
  } else {
    revealCards.forEach(card => card.classList.add('is-visible'));
  }

  // 7. Approach Step Tracker (Dark Ambient Showcase)
  const stepCols = document.querySelectorAll('.about-step-col, .about-step-card');
  const stepCounter = document.getElementById('aboutStepCounter');
  const stepPrev = document.getElementById('aboutStepPrev');
  const stepNext = document.getElementById('aboutStepNext');
  let currentStepIdx = 0;

  const setApproachStep = (idx) => {
    if (!stepCols.length) return;
    currentStepIdx = (idx + stepCols.length) % stepCols.length;

    stepCols.forEach((col, i) => {
      col.classList.toggle('active', i === currentStepIdx);
    });

    if (stepCounter) {
      stepCounter.textContent = `0${currentStepIdx + 1} / 0${stepCols.length}`;
    }
  };

  stepCols.forEach((col, index) => {
    col.addEventListener('click', () => {
      setApproachStep(index);
    });
  });

  if (stepPrev) {
    stepPrev.addEventListener('click', () => {
      setApproachStep(currentStepIdx - 1);
    });
  }

  if (stepNext) {
    stepNext.addEventListener('click', () => {
      setApproachStep(currentStepIdx + 1);
    });
  }

  // 8. Our Work — Reference Bento Redesign & Category Stepper
  const owStepItems = document.querySelectorAll('.ow-step-item');
  const owHeading   = document.getElementById('owHeading');
  const owAccent    = document.getElementById('owAccent');
  const owSuffix    = document.getElementById('owSuffix');
  const owSubheading = document.getElementById('owSubheading');
  const owBento     = document.getElementById('owBento');
  const owCards     = document.querySelectorAll('.ow-card');
  const swModal     = document.getElementById('swModal');
  const swModalClose = document.getElementById('swModalClose');

  const owData = {
    architecture: {
      accent: 'Architectural',
      suffix: 'Projects',
      subtitle: 'Thoughtfully designed spaces that balance functionality, aesthetics and long-lasting value.',
      cards: [
        {
          num: '01',
          title: 'Sudha Classic',
          tag: 'ARCHITECTURE',
          img: 'assets/home/our-work/sudha-classic.jpg',
          loc: 'Pune, Maharashtra',
          desc: 'Architectural project building Sudha Classic in Pune. Designed with articulated classical balconies, vertical louvers, landscaped perimeter, and elegant proportions.'
        },
        {
          num: '02',
          title: 'ShreeRam Cubicles',
          tag: 'COMMERCIAL',
          img: 'assets/home/our-work/shreeram-cubicles.jpg',
          loc: 'Pune, Maharashtra',
          desc: 'Commercial retail complex ShreeRam Cubicles in Pune, featuring prominent two-level retail shopfronts, glazed pedestrian balconies, and modern architectural form.'
        },
        {
          num: '03',
          title: 'The Villa',
          tag: 'PRIVATE PROJECT',
          img: 'assets/home/our-work/the-villa.jpg',
          loc: 'Pune, Maharashtra',
          desc: 'Bespoke private architectural residence featuring clean geometric volumes, cantilevered roof canopy, vertical wood louvers, and covered car portico.'
        },
        {
          num: '04',
          title: 'Contemporary Residence',
          tag: 'PRIVATE PROJECT',
          img: 'assets/home/our-work/contemporary-residence.jpg',
          loc: 'Pune, Maharashtra',
          desc: 'Modern two-storey private architectural residence featuring crisp white geometry, vibrant ochre accents, rooftop garden pergola, and integrated planters.'
        }
      ]
    },
    government: {
      accent: 'Government',
      suffix: 'Projects',
      subtitle: 'Civic infrastructure, institutional campuses and public amenities planned for durability, seismic safety and civic utility.',
      cards: [
        {
          num: '01',
          title: 'ITI Wagholi',
          tag: 'GOVERNMENT · CIVIC',
          img: 'assets/home/our-work/iti-wagholi/iti-wagholi-01.jpg',
          images: 'assets/home/our-work/iti-wagholi/iti-wagholi-01.jpg,assets/home/our-work/iti-wagholi/iti-wagholi-02.jpg,assets/home/our-work/iti-wagholi/iti-wagholi-03.jpg,assets/home/our-work/iti-wagholi/iti-wagholi-04.jpg',
          loc: 'Wagholi, Pune',
          desc: 'A 42,000 sq.ft state-commissioned vocational technical institute with monumental entrance portico, daylight workshop wings, and trade-specific artisans frieze.'
        },
        {
          num: '02',
          title: 'ITI Yerwada',
          tag: 'GOVERNMENT · CIVIC',
          img: 'assets/home/our-work/iti-yerwada/iti-yerwada-01.jpg',
          images: 'assets/home/our-work/iti-yerwada/iti-yerwada-01.jpg,assets/home/our-work/iti-yerwada/iti-yerwada-02.jpg',
          loc: 'Yerwada, Pune',
          desc: 'Government Industrial Training Institute (ITI) campus in Yerwada, Pune. Designed with contemporary modular classrooms, glazed entrance portico, trades frieze, and secure campus perimeter.'
        },
        {
          num: '03',
          title: 'Paud Police Station',
          tag: 'PUBLIC INFRASTRUCTURE',
          img: 'assets/home/our-work/paud-police-station/paud-police-station-01.jpg',
          images: 'assets/home/our-work/paud-police-station/paud-police-station-01.jpg,assets/home/our-work/paud-police-station/paud-police-station-02.jpg,assets/home/our-work/paud-police-station/paud-police-station-03.jpg,assets/home/our-work/paud-police-station/paud-police-station-04.jpg',
          loc: 'Paud, Pune',
          desc: 'Sub-divisional police headquarters in Paud, Pune. Engineered under stringent civic infrastructure standards, featuring a ceremonial entrance portico, traditional terracotta facade with intricate jali screening, arched window bays, and centralized security operations.'
        }
      ]
    },
    private: {
      accent: 'Private',
      suffix: 'Commissions',
      subtitle: 'Custom residences, luxury interiors and bespoke workplaces tailored to the individual rhythms and aspirations of our clients.',
      layout: 'tall-pair',
      cards: [
        {
          num: '01',
          title: 'Sudha Classic',
          tag: 'PRIVATE ARCHITECTURE',
          img: 'assets/home/our-work/sudha-classic.jpg',
          loc: 'Pune, Maharashtra',
          desc: 'Architectural residential building in Pune featuring articulated classical balconies, vertical louvers, landscaped perimeter, and refined proportions.'
        },
        {
          num: '02',
          title: 'The Jadhav Bungalow',
          tag: 'PRIVATE VILLA',
          img: 'assets/home/our-work/suhas-jadhav.jpg',
          loc: 'Bavdhan, Pune',
          desc: 'An expansive private bungalow designed around private leisure gardens, passive ventilation, and monolithic natural textures.'
        },
        {
          num: '03',
          title: 'Vishwadarshan Estate',
          tag: 'PRIVATE RESIDENTIAL',
          img: 'assets/home/our-work/vishwadarshan.jpg',
          loc: 'Kothrud, Pune',
          desc: 'Sprawling family estate with distinct semi-private guest wings, shaded verandahs, and bespoke stone masonry.'
        }
      ]
    },
    interior: {
      accent: 'Interior',
      suffix: 'Residential Projects',
      subtitle: 'Bespoke residential sanctuaries celebrating refined material palettes, custom cabinetry, and ambient architectural lighting.',
      cards: [
        {
          num: '01',
          title: 'The Sky Atrium Duplex',
          tag: 'INTERIOR RESIDENTIAL',
          img: 'assets/home/our-work/transformation-after.jpg',
          loc: 'Koregaon Park, Pune',
          desc: 'Turnkey luxury penthouse duplex interior showcasing acoustic plastering, bespoke fluted walnut millwork, and custom furnishings.'
        },
        {
          num: '02',
          title: 'Flat 602 Luxury Penthouse',
          tag: 'INTERIOR RESIDENTIAL',
          img: 'assets/home/our-work/flat-602-penthouse.png',
          loc: 'Model Colony, Pune',
          desc: 'Contemporary urban penthouse interior uniting soft cove lighting, Italian marble flooring, and customized modular joinery.'
        },
        {
          num: '03',
          title: 'Bespoke Dining Sanctuary',
          tag: 'INTERIOR RESIDENTIAL',
          img: 'assets/home/our-work/dining-room.jpg',
          loc: 'Boat Club Road, Pune',
          desc: 'An intimate culinary space defined by warm brass pendants, sculpted oak dining table, and textured acoustic wall treatments.'
        },
        {
          num: '04',
          title: 'Sage Master Suite',
          tag: 'INTERIOR RESIDENTIAL',
          img: 'assets/home/our-work/master-bedroom-suite.jpg',
          loc: 'Pune, Maharashtra',
          desc: 'Serene master bedroom sanctuary featuring custom arched sage green alcove wall panelling, upholstered bed suite, curated modern armchairs, and floor-to-ceiling garden vistas.'
        }
      ]
    },
    commercial: {
      accent: 'Commercial',
      suffix: 'Projects',
      subtitle: 'High-performance corporate headquarters, aesthetic wellness studios and retail spaces designed for productivity and brand distinction.',
      cards: [
        {
          num: '01',
          title: 'Nirmiti Executive HQ',
          tag: 'COMMERCIAL WORKPLACE',
          img: 'assets/home/our-work/nirmiti-boardroom.png',
          images: 'assets/home/our-work/nirmiti-boardroom.png,assets/home/our-work/nirmiti-workstation.jpg',
          loc: 'Viman Nagar, Pune',
          desc: 'Corporate executive boardroom suite with sound-absorbing linear timber ceilings, integrated AV, and ergonomic executive amenities.'
        },
        {
          num: '02',
          title: 'Nirmiti Workstation Studio',
          tag: 'COMMERCIAL WORKPLACE',
          img: 'assets/home/our-work/nirmiti-workstation.jpg',
          images: 'assets/home/our-work/nirmiti-workstation.jpg,assets/home/our-work/nirmiti-boardroom.png',
          loc: 'Viman Nagar, Pune',
          desc: 'Modern corporate open workstation office for Nirmiti Buildcon featuring ergonomic desks, warm oak overhead cabinetry with terracotta accent niches, and glass partitions.'
        },
        {
          num: '03',
          title: 'Skin Care Clinic Reception',
          tag: 'COMMERCIAL HEALTHCARE',
          img: 'assets/home/our-work/skincare-clinic-reception.jpg',
          images: 'assets/home/our-work/skincare-clinic-reception.jpg,assets/home/our-work/skincare-clinic-procedure.jpg',
          loc: 'Pune, Maharashtra',
          desc: 'Bespoke aesthetic clinic reception lounge featuring a curved blush pink reception counter with marble countertop and organic pebble-shaped backlit product display niche.'
        },
        {
          num: '04',
          title: 'Skin Care Procedure Suite',
          tag: 'COMMERCIAL HEALTHCARE',
          img: 'assets/home/our-work/skincare-clinic-procedure.jpg',
          images: 'assets/home/our-work/skincare-clinic-procedure.jpg,assets/home/our-work/skincare-clinic-reception.jpg',
          loc: 'Pune, Maharashtra',
          desc: 'Calming medical aesthetic treatment suite featuring custom line-art feature wall, frosted privacy glass partitions, illuminated arched display shelving, and treatment bed.'
        }
      ]
    }
  };

  const owScrollDriver = document.getElementById('owScrollDriver');
  const owProgressFill = document.getElementById('owProgressFill');
  const owProgressLabel = document.getElementById('owProgressLabel');
  const owRailFill = document.getElementById('owRailFill');
  const owRailBead = document.getElementById('owRailBead');
  const owHeaderInfo = document.querySelector('.ow-header-info');
  const owCategories = ['architecture', 'government', 'private', 'interior', 'commercial'];
  let currentOwIndex = 0;
  let isProgrammaticScroll = false;

  const updateRailIndicator = (idx) => {
    if (!owRailFill || !owRailBead || !owStepItems.length) return;
    const rail = document.querySelector('.ow-stepper-rail');
    if (!rail) return;

    const activeItem = owStepItems[idx];
    if (!activeItem) return;

    const node = activeItem.querySelector('.ow-step-node');
    if (!node) return;

    const railRect = rail.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    if (railRect.height <= 0) return;

    // Center of node relative to top of rail
    const nodeCenterY = (nodeRect.top + nodeRect.height / 2) - railRect.top;
    const clampedY = Math.max(0, Math.min(railRect.height, nodeCenterY));
    const percent = (clampedY / railRect.height) * 100;

    owRailFill.style.height = `${percent}%`;
    owRailBead.style.top = `${clampedY}px`;
  };

  const setCategoryByIndex = (idx, animate = true) => {
    if (idx < 0 || idx >= owCategories.length) return;
    const catKey = owCategories[idx];
    const data = owData[catKey];
    if (!data) return;

    currentOwIndex = idx;

    // Update stepper rail UI
    owStepItems.forEach((btn, bIdx) => {
      const isSel = (bIdx === idx);
      btn.classList.toggle('active', isSel);
      btn.setAttribute('aria-selected', isSel ? 'true' : 'false');
    });

    // Update rail fill line and floating bead position
    updateRailIndicator(idx);

    // Update progress indicator
    if (owProgressFill) {
      owProgressFill.style.width = `${((idx + 1) / owCategories.length) * 100}%`;
    }
    if (owProgressLabel) {
      owProgressLabel.textContent = `0${idx + 1} / 0${owCategories.length}`;
    }

    const applyData = () => {
      if (owAccent) owAccent.textContent = data.accent;
      if (owSuffix) owSuffix.textContent = data.suffix;
      if (owSubheading) owSubheading.textContent = data.subtitle;

      const subgrid = document.querySelector('.ow-subgrid');
      const bento = document.getElementById('owBento');

      if (data.layout === 'tall-pair') {
        if (bento) bento.classList.add('has-tall-pair');
        if (subgrid) subgrid.classList.remove('has-single-card');

        const cardMapping = [
          { cardEl: document.getElementById('owCard1'), cData: data.cards[0], idxNum: 1 },
          { cardEl: document.getElementById('owCard2'), cData: null, idxNum: 2 },
          { cardEl: document.getElementById('owCard3'), cData: data.cards[1], idxNum: 3 },
          { cardEl: document.getElementById('owCard4'), cData: data.cards[2], idxNum: 4 }
        ];

        cardMapping.forEach(({ cardEl, cData, idxNum }) => {
          if (!cardEl) return;
          if (cData) {
            cardEl.style.display = '';
            const imgEl = document.getElementById(`owCard${idxNum}Img`);
            const titleEl = document.getElementById(`owCard${idxNum}Title`);
            const tagEl = document.getElementById(`owCard${idxNum}Tag`);
            const numEl = document.getElementById(`owCard${idxNum}Num`);

            const hoverTag = document.getElementById(`owCard${idxNum}HoverTag`);
            const hoverTitle = document.getElementById(`owCard${idxNum}HoverTitle`);
            const hoverLoc = document.getElementById(`owCard${idxNum}HoverLoc`);
            const hoverDesc = document.getElementById(`owCard${idxNum}HoverDesc`);

            if (imgEl) {
              imgEl.src = cData.img;
              imgEl.alt = `${cData.title}, ${cData.loc}`;
            }
            if (titleEl) titleEl.textContent = cData.title;
            if (tagEl) tagEl.textContent = cData.tag;
            if (numEl) numEl.textContent = cData.num;

            if (hoverTag) hoverTag.textContent = cData.tag;
            if (hoverTitle) hoverTitle.textContent = cData.title;
            if (hoverLoc) hoverLoc.textContent = cData.loc;
            if (hoverDesc) hoverDesc.textContent = cData.desc;

            cardEl.dataset.title = cData.title;
            cardEl.dataset.category = cData.tag;
            cardEl.dataset.location = cData.loc;
            cardEl.dataset.desc = cData.desc;
            cardEl.dataset.images = cData.images || cData.img;
          } else {
            cardEl.style.display = 'none';
          }
        });
      } else {
        if (bento) bento.classList.remove('has-tall-pair');

        const allCardEls = [
          document.getElementById('owCard1'),
          document.getElementById('owCard2'),
          document.getElementById('owCard3'),
          document.getElementById('owCard4')
        ];

        allCardEls.forEach((cardEl, idx) => {
          if (!cardEl) return;
          if (idx < data.cards.length) {
            cardEl.style.display = '';
            const cData = data.cards[idx];
            const imgEl = document.getElementById(`owCard${idx + 1}Img`);
            const titleEl = document.getElementById(`owCard${idx + 1}Title`);
            const tagEl = document.getElementById(`owCard${idx + 1}Tag`);
            const numEl = document.getElementById(`owCard${idx + 1}Num`);

            const hoverTag = document.getElementById(`owCard${idx + 1}HoverTag`);
            const hoverTitle = document.getElementById(`owCard${idx + 1}HoverTitle`);
            const hoverLoc = document.getElementById(`owCard${idx + 1}HoverLoc`);
            const hoverDesc = document.getElementById(`owCard${idx + 1}HoverDesc`);

            if (imgEl) {
              imgEl.src = cData.img;
              imgEl.alt = `${cData.title}, ${cData.loc}`;
            }
            if (titleEl) titleEl.textContent = cData.title;
            if (tagEl) tagEl.textContent = cData.tag;
            if (numEl) numEl.textContent = cData.num;

            if (hoverTag) hoverTag.textContent = cData.tag;
            if (hoverTitle) hoverTitle.textContent = cData.title;
            if (hoverLoc) hoverLoc.textContent = cData.loc;
            if (hoverDesc) hoverDesc.textContent = cData.desc;

            cardEl.dataset.title = cData.title;
            cardEl.dataset.category = cData.tag;
            cardEl.dataset.location = cData.loc;
            cardEl.dataset.desc = cData.desc;
            cardEl.dataset.images = cData.images || cData.img;
          } else {
            cardEl.style.display = 'none';
          }
        });

        if (subgrid) {
          subgrid.classList.toggle('has-single-card', data.cards.length === 3);
        }
      }
    };

    if (animate && owBento) {
      owBento.classList.add('is-switching');
      if (owHeaderInfo) owHeaderInfo.classList.add('is-switching');

      setTimeout(() => {
        applyData();
        requestAnimationFrame(() => {
          owBento.classList.remove('is-switching');
          if (owHeaderInfo) owHeaderInfo.classList.remove('is-switching');
        });
      }, 120);
    } else {
      applyData();
    }
  };

  // Initial rail alignment
  setTimeout(() => {
    updateRailIndicator(0);
  }, 100);

  window.addEventListener('resize', () => {
    updateRailIndicator(currentOwIndex);
  }, { passive: true });

  // Click on stepper buttons
  owStepItems.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const tabKey = btn.dataset.tab;
      const keyIndex = owCategories.indexOf(tabKey);
      if (keyIndex === -1) return;

      // In desktop sticky mode, scroll smoothly to the corresponding driver slice
      if (owScrollDriver && window.innerWidth > 992) {
        const rect = owScrollDriver.getBoundingClientRect();
        const driverTop = window.scrollY + rect.top;
        const scrollRange = owScrollDriver.offsetHeight - window.innerHeight;
        if (scrollRange > 0) {
          const targetY = driverTop + (keyIndex / (owCategories.length - 1)) * scrollRange;
          isProgrammaticScroll = true;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
          setTimeout(() => { isProgrammaticScroll = false; }, 500);
        }
      }

      setCategoryByIndex(keyIndex, true);
    });
  });

  // Previous & Next navigation arrow buttons (Matching bottom control bar)
  const owBtnPrev = document.getElementById('owBtnPrev');
  const owBtnNext = document.getElementById('owBtnNext');

  if (owBtnPrev) {
    owBtnPrev.addEventListener('click', () => {
      const prevIdx = (currentOwIndex - 1 + owCategories.length) % owCategories.length;
      if (owScrollDriver && window.innerWidth > 992) {
        const rect = owScrollDriver.getBoundingClientRect();
        const driverTop = window.scrollY + rect.top;
        const scrollRange = owScrollDriver.offsetHeight - window.innerHeight;
        if (scrollRange > 0) {
          const targetY = driverTop + (prevIdx / (owCategories.length - 1)) * scrollRange;
          isProgrammaticScroll = true;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
          setTimeout(() => { isProgrammaticScroll = false; }, 500);
        }
      }
      setCategoryByIndex(prevIdx, true);
    });
  }

  if (owBtnNext) {
    owBtnNext.addEventListener('click', () => {
      const nextIdx = (currentOwIndex + 1) % owCategories.length;
      if (owScrollDriver && window.innerWidth > 992) {
        const rect = owScrollDriver.getBoundingClientRect();
        const driverTop = window.scrollY + rect.top;
        const scrollRange = owScrollDriver.offsetHeight - window.innerHeight;
        if (scrollRange > 0) {
          const targetY = driverTop + (nextIdx / (owCategories.length - 1)) * scrollRange;
          isProgrammaticScroll = true;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
          setTimeout(() => { isProgrammaticScroll = false; }, 500);
        }
      }
      setCategoryByIndex(nextIdx, true);
    });
  }

  // Scroll-driven category switching for #owScrollDriver
  let scrollTicking = false;
  const handleScrollDriver = () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        scrollTicking = false;
        if (!owScrollDriver || isProgrammaticScroll || window.innerWidth <= 992) return;

        const rect = owScrollDriver.getBoundingClientRect();
        const scrollRange = owScrollDriver.offsetHeight - window.innerHeight;
        if (scrollRange <= 0) return;

        // Relative scroll offset within driver
        const scrolled = -rect.top;
        if (scrolled <= 0) {
          if (currentOwIndex !== 0) setCategoryByIndex(0, true);
          return;
        }
        if (scrolled >= scrollRange) {
          if (currentOwIndex !== owCategories.length - 1) {
            setCategoryByIndex(owCategories.length - 1, true);
          }
          return;
        }

        const progress = Math.max(0, Math.min(1, scrolled / scrollRange));
        const targetIdx = Math.min(
          owCategories.length - 1,
          Math.floor(progress * owCategories.length)
        );

        if (targetIdx !== currentOwIndex) {
          setCategoryByIndex(targetIdx, true);
        }
      });
      scrollTicking = true;
    }
  };

  window.addEventListener('scroll', handleScrollDriver, { passive: true });

  // Interactive Wheel Assistance when pinned in desktop view
  let wheelCooldown = false;
  const owSectionEl = document.getElementById('work');
  if (owSectionEl && owScrollDriver) {
    owSectionEl.addEventListener('wheel', (e) => {
      if (window.innerWidth <= 992) return;
      const rect = owScrollDriver.getBoundingClientRect();
      const isStuck = rect.top <= 10 && rect.bottom >= window.innerHeight + 10;
      if (!isStuck) return;

      if (wheelCooldown) return;

      if (e.deltaY > 25 && currentOwIndex < owCategories.length - 1) {
        e.preventDefault();
        wheelCooldown = true;
        const nextIdx = currentOwIndex + 1;
        const scrollRange = owScrollDriver.offsetHeight - window.innerHeight;
        const targetY = window.scrollY + rect.top + (nextIdx / (owCategories.length - 1)) * scrollRange;
        isProgrammaticScroll = true;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        setCategoryByIndex(nextIdx, true);
        setTimeout(() => {
          isProgrammaticScroll = false;
          wheelCooldown = false;
        }, 450);
      } else if (e.deltaY < -25 && currentOwIndex > 0) {
        e.preventDefault();
        wheelCooldown = true;
        const prevIdx = currentOwIndex - 1;
        const scrollRange = owScrollDriver.offsetHeight - window.innerHeight;
        const targetY = window.scrollY + rect.top + (prevIdx / (owCategories.length - 1)) * scrollRange;
        isProgrammaticScroll = true;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        setCategoryByIndex(prevIdx, true);
        setTimeout(() => {
          isProgrammaticScroll = false;
          wheelCooldown = false;
        }, 450);
      }
    }, { passive: false });
  }

  // Mobile / Tablet touch swipe gesture support for #owBento
  let touchStartX = 0;
  let touchStartY = 0;
  if (owBento) {
    owBento.addEventListener('touchstart', (e) => {
      if (!e.changedTouches || !e.changedTouches.length) return;
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    owBento.addEventListener('touchend', (e) => {
      if (!e.changedTouches || !e.changedTouches.length) return;
      const diffX = e.changedTouches[0].clientX - touchStartX;
      const diffY = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          const nextIdx = (currentOwIndex + 1) % owCategories.length;
          setCategoryByIndex(nextIdx, true);
        } else {
          const prevIdx = (currentOwIndex - 1 + owCategories.length) % owCategories.length;
          setCategoryByIndex(prevIdx, true);
        }
      }
    }, { passive: true });
  }

  // Modal helpers
  const openModal = (card) => {
    if (!swModal) return;
    const img = card.querySelector('img');
    const modalImg = document.getElementById('swModalImg');
    const modalCat = document.getElementById('swModalCat');
    const modalTitle = document.getElementById('swModalTitle');
    const modalLoc = document.getElementById('swModalLoc');
    const modalDesc = document.getElementById('swModalDesc');
    const thumbsContainer = document.getElementById('swModalThumbs');

    const imagesAttr = card.dataset.images;
    const imagesList = imagesAttr ? imagesAttr.split(',').map(s => s.trim()).filter(Boolean) : [];

    if (modalImg) {
      modalImg.src = img ? img.src : (imagesList[0] || '');
      modalImg.alt = img ? img.alt : '';
    }

    if (thumbsContainer) {
      thumbsContainer.innerHTML = '';
      if (imagesList.length > 1) {
        imagesList.forEach((imSrc, idx) => {
          const thumbBtn = document.createElement('button');
          thumbBtn.className = `sw-modal-thumb-btn ${idx === 0 ? 'active' : ''}`;
          thumbBtn.setAttribute('type', 'button');
          thumbBtn.setAttribute('aria-label', `View image ${idx + 1}`);
          thumbBtn.innerHTML = `<img src="${imSrc}" alt="Thumbnail ${idx + 1}">`;
          thumbBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (modalImg) modalImg.src = imSrc;
            thumbsContainer.querySelectorAll('.sw-modal-thumb-btn').forEach(b => b.classList.remove('active'));
            thumbBtn.classList.add('active');
          });
          thumbsContainer.appendChild(thumbBtn);
        });
        thumbsContainer.style.display = 'flex';
      } else {
        thumbsContainer.style.display = 'none';
      }
    }

    if (modalCat) modalCat.textContent = (card.dataset.category || '').toUpperCase().replace(' ', ' · ');
    if (modalTitle) modalTitle.textContent = card.dataset.title || '';
    if (modalLoc) modalLoc.textContent = card.dataset.location || '';
    if (modalDesc) modalDesc.textContent = card.dataset.desc || '';
    swModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!swModal) return;
    swModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  // Open modal on card click (both Our Work and Selected Works cards)
  owCards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  const swCards = document.querySelectorAll('.sw-card');
  swCards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  // Selected Works — filter pills logic
  const swFilters = document.querySelectorAll('.sw-filter');
  const swGrid    = document.getElementById('swGrid');

  swFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      swFilters.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const f = btn.dataset.filter;

      if (f === 'all') {
        swGrid?.classList.remove('is-filtered');
      } else {
        swGrid?.classList.add('is-filtered');
      }

      swCards.forEach(card => {
        const cats = card.dataset.category || '';
        card.style.display = (f === 'all' || cats.includes(f)) ? '' : 'none';
      });
    });
  });

  // Close handlers
  if (swModalClose) swModalClose.addEventListener('click', (e) => { e.stopPropagation(); closeModal(); });
  if (swModal) {
    const backdrop = swModal.querySelector('.sw-modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeModal);
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // 9. Before & After Transformation Split Sliders (Commercial & Residential)
  const initBeforeAfterSlider = (cardId, inputId) => {
    const card = document.getElementById(cardId);
    const rangeInput = document.getElementById(inputId);
    if (!card || !rangeInput) return;

    let isDragging = false;

    const setPosition = (percent) => {
      const clamped = Math.max(0, Math.min(100, Math.round(percent * 10) / 10));
      card.style.setProperty('--split-pos', clamped + '%');
      rangeInput.value = clamped;
      rangeInput.setAttribute('aria-valuenow', clamped);
    };

    const updateFromPointer = (clientX) => {
      const rect = card.getBoundingClientRect();
      if (!rect.width) return;
      const x = clientX - rect.left;
      const percent = (x / rect.width) * 100;
      setPosition(percent);
    };

    // Range input (for keyboard navigation and native accessibility)
    rangeInput.addEventListener('input', (e) => {
      setPosition(parseFloat(e.target.value));
    });

    rangeInput.addEventListener('change', (e) => {
      setPosition(parseFloat(e.target.value));
    });

    // Pointer events on card frame (touch, mouse, stylus)
    card.addEventListener('pointerdown', (e) => {
      isDragging = true;
      card.classList.add('is-dragging');
      try { card.setPointerCapture(e.pointerId); } catch (_) {}
      updateFromPointer(e.clientX);
    });

    const onPointerMove = (e) => {
      if (!isDragging) return;
      updateFromPointer(e.clientX);
    };

    card.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointermove', onPointerMove);

    const stopDrag = (e) => {
      if (isDragging) {
        isDragging = false;
        card.classList.remove('is-dragging');
        if (e && e.pointerId) {
          try { card.releasePointerCapture(e.pointerId); } catch (_) {}
        }
      }
    };

    card.addEventListener('pointerup', stopDrag);
    card.addEventListener('pointercancel', stopDrag);
    window.addEventListener('pointerup', stopDrag);
    window.addEventListener('pointercancel', stopDrag);

    // Initial position
    setPosition(50);
  };

  initBeforeAfterSlider('baCardComm', 'baInputComm');
  initBeforeAfterSlider('baCardRes', 'baInputRes');

  // 10. Client Testimonials — Interactive Carousel & Navigation
  const testiTrack = document.getElementById('testiTrack');
  const testiPrevBtn = document.getElementById('testiPrevBtn');
  const testiNextBtn = document.getElementById('testiNextBtn');
  const testiDots = document.querySelectorAll('.testi-dot');

  // A. Carousel Arrow Navigation
  if (testiTrack && testiPrevBtn && testiNextBtn) {
    const getScrollAmount = () => {
      const card = testiTrack.querySelector('.testi-modern-card');
      return card ? card.offsetWidth + 24 : 320;
    };

    testiPrevBtn.addEventListener('click', () => {
      testiTrack.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    testiNextBtn.addEventListener('click', () => {
      testiTrack.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });
  }

  // B. Pagination Dots
  if (testiDots.length && testiTrack) {
    testiDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        const cards = testiTrack.querySelectorAll('.testi-modern-card');
        if (cards[idx]) {
          cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        }
      });
    });

    testiTrack.addEventListener('scroll', () => {
      const card = testiTrack.querySelector('.testi-modern-card');
      if (!card) return;
      const scrollPos = testiTrack.scrollLeft;
      const cardWidth = card.offsetWidth + 24;
      const activeIndex = Math.min(testiDots.length - 1, Math.max(0, Math.round(scrollPos / cardWidth)));

      testiDots.forEach((dot, idx) => {
        if (idx === activeIndex) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    }, { passive: true });
  }

});
