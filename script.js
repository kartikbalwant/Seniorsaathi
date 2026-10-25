const languageScreen = document.querySelector('#languageScreen');
const languageButtons = document.querySelectorAll('[data-language]');
const changeLanguage = document.querySelector('#changeLanguage');
const translations = {
 en:{nav:['How it works','Senior care','Pension help','Volunteer'],eyebrow:'PILOT CONCEPT · GHAZIPUR, UTTAR PRADESH',title:'Growing older should never mean|being alone.',lead:'A friendly voice, a trusted local helper, and clearer guidance for pensions and schemes — designed around older people, not around technology.',explore:'Explore senior care',pension:'Get pension guidance',small:'Designed for simple use, with Hindi-first support planned and Bhojpuri support as a next step.',language:'🌐 Language'},
 hi:{nav:['यह कैसे काम करता है','वरिष्ठ देखभाल','पेंशन सहायता','स्वयंसेवक'],eyebrow:'प्रस्तावित पायलट · गाज़ीपुर, उत्तर प्रदेश',title:'बुज़ुर्गों को कभी भी|अकेला महसूस नहीं होना चाहिए।',lead:'अपनी भाषा में बातचीत, भरोसेमंद स्थानीय मदद और पेंशन व सरकारी योजनाओं की सरल जानकारी — बुज़ुर्गों की ज़रूरतों को ध्यान में रखकर।',explore:'देखभाल की सुविधाएँ',pension:'पेंशन सहायता पाएँ',small:'वेबसाइट को सरल और आसानी से इस्तेमाल करने योग्य बनाया गया है।',language:'🌐 भाषा बदलें'},
 bho:{nav:['ई काम कइसे चलेला','बुजुर्गन के देखभाल','पेंशन मदद','स्वयंसेवक'],eyebrow:'प्रस्तावित पायलट · गाजीपुर, उत्तर प्रदेश',title:'बुढ़ापा में केहू के|अकेले ना रहे के चाहीं।',lead:'अपन भाषा में बात, भरोसेमंद स्थानीय मदद, आ पेंशन अउर सरकारी योजना के आसान जानकारी — बुजुर्गन के जरूरत के हिसाब से।',explore:'देखभाल देखीं',pension:'पेंशन के जानकारी',small:'वेबसाइट के आसान आ सरल रखल गइल बा।',language:'🌐 भाषा बदलीं'}
};
function setLanguage(lang){
 const t=translations[lang]||translations.en;
 document.documentElement.lang=lang==='hi'?'hi':lang==='bho'?'bho':'en';
 const links=document.querySelectorAll('#mainNav a');t.nav.forEach((v,i)=>{if(links[i])links[i].textContent=v;});
 document.querySelector('.hero .eyebrow').innerHTML='<span class="live-dot"></span> '+t.eyebrow;
 const title=document.querySelector('.hero h1'),parts=t.title.split('|');title.replaceChildren(document.createTextNode(parts[0]+' '));const em=document.createElement('em');em.textContent=parts[1];title.appendChild(em);
 document.querySelector('.hero-lead').textContent=t.lead;
 document.querySelector('.hero-actions .btn-primary').childNodes[0].textContent=t.explore+' ';
 document.querySelector('.hero-actions .btn-secondary').textContent=t.pension;
 document.querySelector('.small-note').textContent=t.small;changeLanguage.textContent=t.language;
 languageScreen.hidden=true;document.body.classList.remove('language-pending');
}
languageButtons.forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.language)));
changeLanguage.addEventListener('click',()=>{languageScreen.hidden=false;document.body.classList.add('language-pending');});

const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');
const fontToggle = document.querySelector('#fontToggle');

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

fontToggle.addEventListener('click', () => {
  const enabled = document.body.classList.toggle('large-text');
  fontToggle.setAttribute('aria-pressed', String(enabled));
  fontToggle.textContent = enabled ? 'A− Text' : 'A+ Text';
});

document.querySelectorAll('.mood').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.mood').forEach(item => item.classList.remove('selected'));
    button.classList.add('selected');
    document.querySelector('#checkinFeedback').textContent = `${button.dataset.mood} (Demo only — no alert was sent.)`;
  });
});

document.querySelector('#medicineButton').addEventListener('click', event => {
  const button = event.currentTarget;
  const done = button.dataset.done !== 'true';
  button.dataset.done = String(done);
  button.textContent = done ? 'Marked done ✓' : 'Mark done';
  document.querySelector('#medicineFeedback').textContent = done ? 'Reminder marked as done in this demo only.' : 'Demo reminder reset.';
});

const guides = {
  pension: {
    title: 'Pension guidance checklist',
    items: ['Identify the pension or scheme you want to ask about.', 'Keep relevant identity, bank, and application details ready; share copies only with a trusted, authorized helper.', 'Check payment status through the official channel or local authorized service point.', 'If payment is delayed, ask the relevant office about the grievance process.']
  },
  documents: {
    title: 'Documents and reminders checklist',
    items: ['Ask the relevant office which documents are actually required.', 'Check whether a life certificate or bank-linking step applies to your case.', 'Keep a note of application or reference numbers in a safe place.', 'Never share an OTP, PIN, or banking password with a volunteer or caller.']
  },
  helper: {
    title: 'Prepare a helper request',
    items: ['Write down the kind of help needed (information, form guidance, or an office visit).', 'Choose a trusted person or an authorized Common Service Centre (CSC).', 'Agree on the visit time and verify the helper’s identity.', 'Do not hand over cash, OTPs, PINs, or original documents without a verified official need.']
  }
};

document.querySelectorAll('[data-guide]').forEach(button => {
  button.addEventListener('click', () => {
    const guide = guides[button.dataset.guide];
    const output = document.querySelector('#guideOutput');
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

document.querySelector('#volunteer-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#volName').value.trim();
  const village = document.querySelector('#volVillage').value.trim();
  const language = document.querySelector('#volLanguage').value;
  document.querySelector('#volFeedback').textContent = `preview: ${name} · ${village} · ${language}. `;
});
