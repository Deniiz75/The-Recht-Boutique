import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, Check, ChevronDown, Menu, Scale, ShieldCheck, X } from 'lucide-react'
import './styles.css'

const services = [
  ['Ondernemingsrecht', 'Van oprichting en aandeelhoudersafspraken tot groei, overname en herstructurering.', 'Voor ondernemers'],
  ['Contractenrecht', 'Heldere overeenkomsten die uw afspraken vastleggen en uw belangen beschermen.', 'Zakelijk & particulier'],
  ['Privaatrecht', 'Strategisch advies bij aansprakelijkheid, vastgoed en andere complexe geschillen.', 'Voor particulieren'],
  ['Geschillen & procedures', 'Doelgerichte begeleiding bij mediation, onderhandeling en procesvoering.', 'Voor iedere client'],
]

const benefits = [
  ['01', 'Directe lijnen', 'U heeft een vast aanspreekpunt en spreekt altijd met uw jurist.'],
  ['02', 'Praktisch inzicht', 'Juridisch scherp met oog voor de commerciële werkelijkheid.'],
  ['03', 'Transparante tarieven', 'Vooraf duidelijkheid over aanpak, kosten en planning.'],
  ['04', 'Persoonlijke aandacht', 'Een boutique-aanpak met ruimte voor uw verhaal en belang.'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return <>
    <header className="site-header">
      <a className="brand" href="#top" onClick={closeMenu}>The Recht <strong>Boutique</strong></a>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu openen" aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'nav open' : 'nav'}>
        <a href="#over" onClick={closeMenu}>Over ons</a><a href="#diensten" onClick={closeMenu}>Diensten</a><a href="#werkwijze" onClick={closeMenu}>Werkwijze</a><a href="#reviews" onClick={closeMenu}>Reviews</a>
        <a className="nav-cta" href="#contact" onClick={closeMenu}>Gratis kennismaking <ArrowRight size={15}/></a>
      </nav>
    </header>
    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span/>Specialist ondernemingsrecht & privaatrecht</p>
          <h1>Juridische helderheid voor de keuzes die ertoe doen.</h1>
          <p className="lead">Persoonlijk juridisch advies voor ondernemers en particulieren. Strategisch waar nodig, begrijpelijk in elke stap.</p>
          <div className="actions"><a className="button" href="#contact">Plan een gesprek <ArrowRight size={17}/></a><a className="text-link" href="#diensten">Bekijk expertise <ArrowRight size={16}/></a></div>
          <dl className="stats"><div><dt>15+</dt><dd>jaar ervaring</dd></div><div><dt>500+</dt><dd>cliënten geholpen</dd></div><div><dt>98%</dt><dd>beveelt ons aan</dd></div></dl>
        </div>
        <div className="hero-visual"><div className="arch"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1100&q=85" alt="Portret van een juridisch adviseur"/></div><div className="seal"><Scale size={23}/><span>Uw belang<br/>voorop</span></div></div>
      </section>
      <section className="trustbar"><div><ShieldCheck size={20}/> Geregistreerd juridisch adviseur</div><div><Check size={20}/> Transparant over kosten</div><div><Check size={20}/> Eerste gesprek vrijblijvend</div><div><Check size={20}/> Persoonlijke begeleiding</div></section>
      <section className="about section" id="over"><div className="portrait"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85" alt="Juridisch adviseur in kantooromgeving"/></div><div className="about-copy"><p className="eyebrow">Over The Recht Boutique</p><h2>Een betrokken partner in uw juridische vraagstuk.</h2><p>Wij combineren inhoudelijke expertise met oprechte aandacht voor de mens en onderneming achter een zaak. Dat geeft ruimte voor advies dat niet alleen juridisch klopt, maar ook echt werkt.</p><p>Van de eerste vraag tot de afronding: u weet waar u aan toe bent en houdt de regie.</p><ul><li><Check/> Heldere taal, zonder juridisch omwegen</li><li><Check/> Strategisch en resultaatgericht advies</li><li><Check/> Ruimte voor een persoonlijke aanpak</li></ul></div></section>
      <section className="services section" id="diensten"><div className="section-heading"><p className="eyebrow">Onze expertise</p><h2>Gespecialiseerd in wat u nodig heeft.</h2><p>Voor belangrijke beslissingen, heldere afspraken en een oplossing wanneer het ingewikkeld wordt.</p></div><div className="service-grid">{services.map(([title, text, label], i) => <article className="service" key={title}><span className="service-no">0{i + 1}</span><h3>{title}</h3><p>{text}</p><span className="service-label">{label}</span><ArrowRight className="service-arrow" size={20}/></article>)}</div></section>
      <section className="quote"><div><p className="quote-mark">“</p><blockquote>Goed juridisch advies maakt complexe keuzes overzichtelijk en geeft vertrouwen om verder te gaan.</blockquote><cite>The Recht Boutique</cite></div></section>
      <section className="benefits section"><div className="section-heading"><p className="eyebrow">Waarom The Recht Boutique</p><h2>Persoonlijk in contact. Scherp in advies.</h2></div><div className="benefit-list">{benefits.map(([no,title,text]) => <article key={no}><span>{no}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
      <section className="process section" id="werkwijze"><div className="section-heading"><p className="eyebrow">Werkwijze</p><h2>Van vraag naar een heldere oplossing.</h2><p>Een overzichtelijk traject waarin u steeds weet wat de volgende stap is.</p></div><ol>{['Kennismaken', 'Analyse', 'Strategie', 'Uitvoering'].map((item, i) => <li key={item}><span>0{i+1}</span><h3>{item}</h3><p>{['We luisteren naar uw situatie en verhelderen uw vraag.', 'We brengen uw positie, kansen en risico’s in kaart.', 'Samen kiezen we een aanpak die past bij uw doel.', 'We voeren uit en houden u actief op de hoogte.'][i]}</p></li>)}</ol></section>
      <section className="reviews section" id="reviews"><div className="section-heading"><p className="eyebrow">Ervaringen</p><h2>Vertrouwd door cliënten die verder willen.</h2></div><div className="review-grid">{[['M.V.','Directeur, tech-onderneming','Een bijzonder heldere en doortastende begeleiding bij onze nieuwe bedrijfsstructuur.'],['S.B.','Eigenaar, retailbedrijf','Prettig contact, snelle reacties en goed advies dat direct toepasbaar was.'],['P.K.','Particulier','Ik voelde me serieus genomen en wist steeds precies wat mijn opties waren.']].map(([initials, role, review]) => <figure key={initials}><span className="stars">★★★★★</span><blockquote>“{review}”</blockquote><figcaption><b>{initials}</b><div><strong>Cliënt</strong><small>{role}</small></div></figcaption></figure>)}</div></section>
      <section className="contact" id="contact"><div className="contact-inner"><div className="contact-copy"><p className="eyebrow">Contact</p><h2>Laten we kennismaken.</h2><p>Vertel kort waar u tegenaan loopt. Wij nemen binnen een werkdag contact met u op.</p><address><a href="tel:+31201234567">+31 (0)20 123 4567</a><a href="mailto:info@therechtboutique.nl">info@therechtboutique.nl</a><span>Herengracht 100, Amsterdam</span></address></div><form onSubmit={(event) => {event.preventDefault(); setSent(true)}}>{sent ? <div className="success"><Check size={23}/><h3>Dank u wel.</h3><p>Uw bericht is ontvangen. We nemen spoedig contact op.</p></div> : <><label>Naam<input required name="name" autoComplete="name" placeholder="Uw naam"/></label><label>E-mailadres<input required type="email" name="email" autoComplete="email" placeholder="naam@bedrijf.nl"/></label><label>Onderwerp<select name="subject" defaultValue=""><option value="" disabled>Kies een onderwerp</option><option>Ondernemingsrecht</option><option>Contractenrecht</option><option>Privaatrecht</option><option>Geschil of procedure</option></select><ChevronDown size={16}/></label><label>Uw bericht<textarea required name="message" placeholder="Waar kunnen we u mee helpen?" rows="4"/></label><button className="button" type="submit">Verstuur bericht <ArrowRight size={17}/></button></>}</form></div></section>
    </main>
    <footer><a className="brand" href="#top">The Recht <strong>Boutique</strong></a><p>Juridisch advies met aandacht voor uw belang.</p><span>© 2026 The Recht Boutique</span></footer>
  </>
}
export default App

createRoot(document.getElementById('root')).render(<App />)
