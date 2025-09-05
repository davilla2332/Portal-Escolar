(function(){
  const cfg = window.siteConfig;
  if(cfg?.escuela?.colores){
    const c = cfg.escuela.colores;
    document.documentElement.style.setProperty('--brand', c.primario);
    document.documentElement.style.setProperty('--brand2', c.secundario);
    document.documentElement.style.setProperty('--bg', c.fondo);
    document.documentElement.style.setProperty('--text', c.texto);
    if(c.card)  document.documentElement.style.setProperty('--card', c.card);
    if(c.muted) document.documentElement.style.setProperty('--muted', c.muted);
  }
  const nombre = cfg?.escuela?.nombre || "Institución Educativa";
  const lema = cfg?.escuela?.lema || "";
  document.querySelectorAll('[data-bind="nombre"]').forEach(e=>e.textContent = nombre);
  document.querySelectorAll('[data-bind="lema"]').forEach(e=>e.textContent = lema);

  const menuBtn = document.getElementById('menuBtn');
  const nav = document.querySelector('nav');
  menuBtn.addEventListener('click', ()=> nav.classList.toggle('open'));
  document.querySelectorAll('.nav-link').forEach(a=>a.addEventListener('click', ()=> nav.classList.remove('open')));

  document.querySelectorAll('.accordion .accordion-item .acc-head').forEach(head => {
    head.addEventListener('click', ()=> head.parentElement.classList.toggle('open'));
  });

  const noticias = [
    { titulo: "Semana de Lectura", fecha: "2025-09-02", desc: "Círculos de lectura para 1° a 6°.", categoria:"Académico" },
    { titulo: "Feria de Matemática", fecha: "2025-09-10", desc: "Juegos y retos numéricos por grados.", categoria:"Eventos" },
    { titulo: "Taller para Padres", fecha: "2025-09-15", desc: "Acompañamiento de tareas en casa.", categoria:"Familia" }
  ];
  const eventos = [
    { titulo: "Acto Cívico", fecha: "2025-09-10", lugar: "Patio Central" },
    { titulo: "Reunión de Padres", fecha: "2025-09-14", lugar: "Auditorio" },
    { titulo: "Simulacro de Evacuación", fecha: "2025-09-22", lugar: "Todo el plantel" }
  ];

  const noticiasWrap = document.getElementById('noticiasWrap');
  noticiasWrap.innerHTML = noticias.map(n => `
    <article class="card">
      <div class="meta">${n.categoria} • ${new Date(n.fecha).toLocaleDateString()}</div>
      <h4>${n.titulo}</h4>
      <p>${n.desc}</p>
    </article>`).join("");

  const eventosWrap = document.getElementById('eventosWrap');
  eventosWrap.innerHTML = eventos.map(ev => `
    <div class="card">
      <strong>${ev.titulo}</strong>
      <div class="meta">${new Date(ev.fecha).toLocaleDateString()} • ${ev.lugar}</div>
    </div>`).join("");

  const formDoc = document.getElementById('formDocentes');
  const formPad = document.getElementById('formPadres');
  const msgDoc = document.getElementById('msgDoc');
  const msgPad = document.getElementById('msgPad');

  const checkCred = (tipo, user, pass) => {
    const demo = cfg.portal[tipo + "Demo"];
    return user === demo.usuario && pass === demo.clave;
  };
  formDoc.addEventListener('submit', (e)=>{
    e.preventDefault();
    const u = e.target.usuario.value.trim();
    const p = e.target.clave.value.trim();
    if(checkCred("docentes", u, p)){
      msgDoc.textContent = "Acceso concedido (demo).";
      msgDoc.className = "alert success";
    }else{
      msgDoc.textContent = "Credenciales inválidas (prueba: docente / 1234).";
      msgDoc.className = "alert";
    }
  });
  formPad.addEventListener('submit', (e)=>{
    e.preventDefault();
    const u = e.target.usuario.value.trim();
    const p = e.target.clave.value.trim();
    if(checkCred("padres", u, p)){
      msgPad.textContent = "Acceso concedido (demo).";
      msgPad.className = "alert success";
    }else{
      msgPad.textContent = "Credenciales inválidas (prueba: padre / 1234).";
      msgPad.className = "alert";
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Bind dynamic hero data
  if(cfg?.escuela?.anioFundacion) document.getElementById('anioFund').textContent = cfg.escuela.anioFundacion;
  if(cfg?.escuela?.ubicacion) document.getElementById('ubiTxt').textContent = cfg.escuela.ubicacion;
  if(cfg?.escuela?.niveles) document.getElementById('nivelesTxt').textContent = cfg.escuela.niveles;
  if(cfg?.escuela?.modelo) document.getElementById('modeloTxt').textContent = cfg.escuela.modelo;
})();