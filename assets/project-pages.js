(function(){
  "use strict";
  const main=document.querySelector("main.article");
  if(!main)return;
  const existing=main.querySelector("ol.toc");
  if(existing){
    const nav=document.createElement("nav");nav.className="project-toc";nav.setAttribute("aria-label","Sommaire de la fiche");
    const details=document.createElement("details");details.open=true;
    const summary=document.createElement("summary");summary.textContent="Sommaire de la fiche";
    existing.parentNode.insertBefore(nav,existing);nav.append(summary,existing);
  }else{
    const headings=[...main.querySelectorAll("h2[id]")];
    if(headings.length>3){
      const nav=document.createElement("nav");nav.className="project-toc";nav.setAttribute("aria-label","Sommaire de la fiche");
      const details=document.createElement("details");details.open=true;
      const summary=document.createElement("summary");summary.textContent="Sommaire de la fiche";
      const list=document.createElement("ol");
      headings.forEach(h=>{const li=document.createElement("li"),a=document.createElement("a");a.href="#"+h.id;a.textContent=h.textContent.trim();li.append(a);list.append(li)});
      details.append(summary,list);nav.append(details);
      const first=main.querySelector("h1");if(first)first.after(nav);
    }
  }
  main.querySelectorAll("iframe[src*='drive.google.com']").forEach(frame=>{
    const url=frame.getAttribute("src")||"",match=url.match(/\/file\/d\/([^/]+)/);
    const link=match?"https://drive.google.com/file/d/"+match[1]+"/view":url;
    const card=document.createElement("div");card.className="project-video-link";
    const title=frame.getAttribute("title")||"Ouvrir la démonstration vidéo";
    const a=document.createElement("a");a.href=link;a.target="_blank";a.rel="noopener noreferrer";a.textContent=title+" — ouvrir sur Google Drive";
    const small=document.createElement("small");small.textContent="La vidéo ne se charge pas automatiquement dans cette page. Son ouverture est volontaire.";
    card.append(a,small);frame.replaceWith(card);
  });
  main.querySelectorAll("pre").forEach(pre=>{
    if(pre.closest("details"))return;
    const details=document.createElement("details");details.className="project-code";
    const summary=document.createElement("summary");summary.textContent="Afficher la configuration / commande";
    const button=document.createElement("button");button.type="button";button.className="project-copy";button.textContent="Copier";
    button.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(pre.innerText);button.textContent="Copié";}catch(e){button.textContent="Copie indisponible";}});
    const parent=pre.parentNode;parent.insertBefore(details,pre);details.append(summary,button,pre);
  });
  main.querySelectorAll("img").forEach((img,i)=>{if(i>0&&!img.hasAttribute("loading"))img.loading="lazy";});
  main.querySelectorAll("img").forEach(img=>{
    if(img.closest("a")||img.closest("figure")||img.dataset.lightbox==="off")return;
    img.tabIndex=0;img.setAttribute("role","button");img.setAttribute("aria-label","Agrandir l’image : "+(img.alt||"illustration"));
    const open=()=>{const overlay=document.createElement("div");overlay.className="project-lightbox";overlay.setAttribute("role","dialog");overlay.setAttribute("aria-modal","true");overlay.setAttribute("aria-label",img.alt||"Image agrandie");const big=document.createElement("img");big.src=img.currentSrc||img.src;big.alt=img.alt;const close=document.createElement("button");close.type="button";close.textContent="Fermer";close.addEventListener("click",()=>overlay.remove());overlay.addEventListener("click",e=>{if(e.target===overlay)overlay.remove()});overlay.append(big,close);document.body.append(overlay);close.focus();const esc=e=>{if(e.key==="Escape"){overlay.remove();document.removeEventListener("keydown",esc)}};document.addEventListener("keydown",esc)};
    img.addEventListener("click",open);img.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}});
  });
})();