/* PROXI SERVICES — interactions */
const PRESTATIONS = [
  { id:"menage", nom:"Ménage à domicile", cat:"menage", catTxt:"Ménage", prix:"15 000 FCFA",
    duree:"À domicile", img:"images/menage.jpg",
    desc:"Ménage complet, vitres, repassage — ponctuel ou régulier." },
  { id:"bricolage", nom:"Bricolage & réparations", cat:"bricolage", catTxt:"Bricolage", prix:"12 000 FCFA",
    duree:"Dépannage", img:"images/bricolage.jpg",
    desc:"Plomberie, électricité, climatisation, petites réparations." },
  { id:"jardinage", nom:"Jardinage", cat:"jardinage", catTxt:"Jardinage", prix:"10 000 FCFA",
    duree:"Entretien", img:"images/jardinage.jpg",
    desc:"Tonte, taille, entretien — jardins et espaces verts." },
  { id:"gardiennage", nom:"Gardiennage", cat:"securite", catTxt:"Sécurité", prix:"25 000 FCFA",
    duree:"Jour & nuit", img:"images/hero-services.jpg",
    desc:"Gardiens formés, jour et nuit, pour villas et bureaux." },
  { id:"demenagement", nom:"Déménagement", cat:"demenagement", catTxt:"Déménagement", prix:"50 000 FCFA",
    duree:"Clé en main", img:"images/bricolage.jpg",
    desc:"Emballage, transport, installation — Libreville et environs." },
  { id:"conciergerie", nom:"Conciergerie", cat:"conciergerie", catTxt:"Conciergerie", prix:"20 000 FCFA",
    duree:"Sur mesure", img:"images/menage.jpg",
    desc:"Courses, démarches, intendance — votre assistant au quotidien." },
];

function cartePresta(p){
  return `<article class="carte-presta reveal">
    <a href="reservation.html?prestation=${p.id}"><div class="carte-img">
      <img src="${p.img}" alt="${p.nom}" loading="lazy">
      <span class="badge">${p.catTxt}</span>
      <span class="prix-tag">${p.prix}</span>
    </div></a>
    <div class="carte-corps">
      <h3><a href="reservation.html?prestation=${p.id}">${p.nom}</a></h3>
      <p class="carte-duree">${p.duree}</p>
      <p class="desc">${p.desc}</p>
      <a class="carte-lien" href="reservation.html?prestation=${p.id}">Réserver →</a>
    </div>
  </article>`;
}

function initCatalogue(){
  const grille = document.getElementById("grille-presta");
  if(!grille) return;
  const boutons = document.querySelectorAll(".filtre-btn");
  function afficher(cat){
    const res = PRESTATIONS.filter(p => !cat || p.cat === cat);
    grille.innerHTML = res.length ? res.map(cartePresta).join("")
      : `<p class="vide">Aucune prestation dans cette catégorie pour le moment.</p>`;
    observerReveals();
  }
  boutons.forEach(b => b.addEventListener("click", () => {
    boutons.forEach(x => x.classList.remove("actif"));
    b.classList.add("actif");
    afficher(b.dataset.cat || "");
  }));
  afficher("");
}

function initReservation(){
  const form = document.getElementById("form-resa");
  if(!form) return;
  const sel = document.getElementById("r-prestation");
  PRESTATIONS.forEach(p => {
    const o = document.createElement("option");
    o.value = p.id; o.textContent = `${p.nom} — ${p.prix}`;
    sel.appendChild(o);
  });
  const pre = new URLSearchParams(location.search).get("prestation");
  if(pre && PRESTATIONS.some(p => p.id === pre)) sel.value = pre;
  // Date min = demain
  const date = document.getElementById("r-date");
  const dem = new Date(); dem.setDate(dem.getDate()+1);
  date.min = dem.toISOString().split("T")[0];
}

function initMenu(){
  const burger = document.getElementById("burger"), nav = document.getElementById("nav");
  if(!burger) return;
  burger.addEventListener("click", () => {
    nav.classList.toggle("ouvert"); burger.classList.toggle("ouvert");
  });
}
function initHeader(){
  const h = document.getElementById("header");
  const onScroll = () => h.classList.toggle("header--scrolled", scrollY > 40);
  addEventListener("scroll", onScroll); onScroll();
}
let observer;
function observerReveals(){
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
}
function initReveals(){
  observer = new IntersectionObserver(es => es.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add("visible"); observer.unobserve(e.target); }
  }), {threshold:.12});
  observerReveals();
}
function initFormulaires(){
  document.querySelectorAll("form[data-demo]").forEach(f => {
    f.addEventListener("submit", e => {
      e.preventDefault();
      f.querySelector(".form-ok").style.display = "block";
      f.querySelectorAll("input[type=text],input[type=tel],input[type=email],textarea").forEach(i => i.value = "");
      f.scrollIntoView({behavior:"smooth", block:"center"});
    });
  });
}
function initDivers(){
  const y = document.getElementById("annee"); if(y) y.textContent = new Date().getFullYear();
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a => {
    if(a.getAttribute("href") === page) a.classList.add("actif");
  });
}
document.addEventListener("DOMContentLoaded", () => {
  initMenu(); initHeader(); initReveals(); initCatalogue(); initReservation(); initFormulaires(); initDivers();
});
