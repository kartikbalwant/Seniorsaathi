const languageScreen = document.querySelector('#languageScreen');
const languageButtons = document.querySelectorAll('[data-language]');
const changeLanguage = document.querySelector('#changeLanguage');

const translations = {
  en: {
    nav: ['How it works', 'Senior care', 'Pension help', 'Volunteer'],
    eyebrow: 'PILOT CONCEPT · GHAZIPUR, UTTAR PRADESH',
    title: 'Growing older should never mean|being alone.',
    lead: 'A friendly voice, a trusted local helper, and clearer guidance for pensions and schemes — designed around older people, not around technology.',
    explore: 'Explore senior care',
    pension: 'Get pension guidance',
    small: 'Designed for simple use, with Hindi-first support planned and Bhojpuri support as a next step.',
    language: '🌐 Language'
  },
  hi: {
    nav: ['यह कैसे काम करता है', 'वरिष्ठ देखभाल', 'पेंशन सहायता', 'स्वयंसेवक'],
    eyebrow: 'प्रस्तावित पायलट · गाज़ीपुर, उत्तर प्रदेश',
    title: 'बुज़ुर्गों को कभी भी|अकेला महसूस नहीं होना चाहिए।',
    lead: 'अपनी भाषा में बातचीत, भरोसेमंद स्थानीय मदद और पेंशन व सरकारी योजनाओं की सरल जानकारी — बुज़ुर्गों की ज़रूरतों को ध्यान में रखकर।',
    explore: 'देखभाल की सुविधाएँ',
    pension: 'पेंशन सहायता पाएँ',
    small: 'वेबसाइट को सरल और आसानी से इस्तेमाल करने योग्य बनाया गया है।',
    language: '🌐 भाषा बदलें'
  },
  bho: {
    nav: ['ई काम कइसे चलेला', 'बुजुर्गन के देखभाल', 'पेंशन मदद', 'स्वयंसेवक'],
    eyebrow: 'प्रस्तावित पायलट · गाजीपुर, उत्तर प्रदेश',
    title: 'बुढ़ापा में केहू के|अकेले ना रहे के चाहीं।',
    lead: 'अपन भाषा में बात, भरोसेमंद स्थानीय मदद, आ पेंशन अउर सरकारी योजना के आसान जानकारी — बुजुर्गन के जरूरत के हिसाब से।',
    explore: 'देखभाल देखीं',
    pension: 'पेंशन के जानकारी',
    small: 'वेबसाइट के आसान आ सरल रखल गइल बा।',
    language: '🌐 भाषा बदलीं'
  }
};

// Safely find an element before updating it.
function setText(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = value;
  }
}

function setLanguage(lang) {
  const t = translations[lang] || translations.en;

  document.documentElement.lang =
    lang === 'hi' ? 'hi' : lang === 'bho' ? 'bho' : 'en';

  // Navigation links
  const links = document.querySelectorAll('#mainNav a');

  t.nav.forEach((value, index) => {
    if (links[index]) {
      links[index].textContent = value;
    }
  });

  // Hero eyebrow
  const eyebrow = document.querySelector('.hero .eyebrow');

  if (eyebrow) {
    const dot = eyebrow.querySelector('.live-dot');

    eyebrow.textContent = t.eyebrow;

    if (dot) {
      eyebrow.prepend(dot);
      eyebrow.insertBefore(document.createTextNode(' '), dot.nextSibling);
    }
  }

  // Hero heading
  const title = document.querySelector('.hero h1');

  if (title) {
    const parts = t.title.split('|');
    title.replaceChildren(document.createTextNode(parts[0] + ' '));

    const emphasis = document.createElement('em');
    emphasis.textContent = parts[1] || '';
    title.appendChild(emphasis);
  }

  // Hero description
  setText('.hero-lead', t.lead);

  // Primary button: update text without assuming its first child exists.
  const primaryButton = document.querySelector(
    '.hero-actions .btn-primary'
  );

  if (primaryButton) {
    const textNode = [...primaryButton.childNodes].find(
      node =>
        node.nodeType === Node.TEXT_NODE &&
        node.textContent.trim()
    );

    if (textNode) {
      textNode.textContent = t.explore + ' ';
    } else {
      primaryButton.textContent = t.explore;
    }
  }

  // Secondary button
  setText('.hero-actions .btn-secondary', t.pension);

  // Small note and language button
  setText('.small-note', t.small);
  setText('#changeLanguage', t.language);

  // Hide language screen and show the homepage.
  if (languageScreen) {
    languageScreen.hidden = true;
  }

  document.body.classList.remove('language-pending');
}

// Language selection buttons
languageButtons.forEach(button => {
  button.addEventListener('click', () => {
    setLanguage(button.dataset.language);
  });
});

// Change language button
if (changeLanguage) {
  changeLanguage.addEventListener('click', () => {
    if (languageScreen) {
      languageScreen.hidden = false;
      document.body.classList.add('language-pending');
    }
  });
}

// Mobile navigation
const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');
const fontToggle = document.querySelector('#fontToggle');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Font size toggle
if (fontToggle) {
  fontToggle.addEventListener('click', () => {
    const enabled = document.body.classList.toggle('large-text');

    fontToggle.setAttribute('aria-pressed', String(enabled));
    fontToggle.textContent = enabled ? 'A− Text' : 'A+ Text';
  });
}

// Mood check-in buttons
document.querySelectorAll('.mood').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.mood').forEach(item => {
      item.classList.remove('selected');
    });

    button.classList.add('selected');

    setText(
      '#checkinFeedback',
      `${button.dataset.mood} (Demo only — no alert was sent.)`
    );
  });
});

// Medicine reminder demo
const medicineButton = document.querySelector('#medicineButton');

if (medicineButton) {
  medicineButton.addEventListener('click', event => {
    const button = event.currentTarget;
    const done = button.dataset.done !== 'true';

    button.dataset.done = String(done);
    button.textContent = done ? 'Marked done ✓' : 'Mark done';

    setText(
      '#medicineFeedback',
      done
        ? 'Reminder marked as done in this demo only.'
        : 'Demo reminder reset.'
    );
  });
}

// Guidance checklists
const guides = {
  pension: {
    title: 'Pension guidance checklist',
    items: [
      'Identify the pension or scheme you want to ask about.',
      'Keep relevant identity, bank, and application details ready; share copies only with a trusted, authorized helper.',
      'Check payment status through the official channel or local authorized service point.',
      'If payment is delayed, ask the relevant office about the grievance process.'
    ]
  },
  documents: {
    title: 'Documents and reminders checklist',
    items: [
      'Ask the relevant office which documents are actually required.',
      'Check whether a life certificate or bank-linking step applies to your case.',
      'Keep a note of application or reference numbers in a safe place.',
      'Never share an OTP, PIN, or banking password with a volunteer or caller.'
    ]
  },
  helper: {
    title: 'Prepare a helper request',
    items: [
      'Write down the kind of help needed (information, form guidance, or an office visit).',
      'Choose a trusted person or an authorized Common Service Centre (CSC).',
      'Agree on the visit time and verify the helper’s identity.',
      'Do not hand over cash, OTPs, PINs, or original documents without a verified official need.'
    ]
  }
};

document.querySelectorAll('[data-guide]').forEach(button => {
  button.addEventListener('click', () => {
    const guide = guides[button.dataset.guide];
    const output = document.querySelector('#guideOutput');

    if (!guide || !output) return;

    output.replaceChildren();

    const heading = document.createElement('strong');
    heading.textContent = guide.title;

    const list = document.createElement('ul');

    guide.items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });

    output.append(heading, list);
  });
});

// Volunteer form demo
const volunteerForm = document.querySelector('#volunteer-form');

if (volunteerForm) {
  volunteerForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.querySelector('#volName')?.value.trim() || '';
    const village = document.querySelector('#volVillage')?.value.trim() || '';
    const language = document.querySelector('#volLanguage')?.value || '';

    setText(
      '#volFeedback',
      `Preview: ${name} · ${village} · ${language}.`
    );
  });
}
