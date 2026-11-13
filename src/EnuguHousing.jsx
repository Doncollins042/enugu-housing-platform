import React, { useState, useRef, useEffect } from "react";
import { useApp } from "./main";

const I = ({ n, s = 20, st }) => {
  const p = { width:s, height:s, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"1.8", strokeLinecap:"round", strokeLinejoin:"round", style:st };
  const ic = {
    home:<svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    user:<svg {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    lock:<svg {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    mail:<svg {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    phone:<svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    map:<svg {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    file:<svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    dollar:<svg {...p}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    building:<svg {...p}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V12h6v10"/><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01"/></svg>,
    grid:<svg {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    search:<svg {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    check:<svg {...p} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    shield:<svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    arrow:<svg {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    arrowLeft:<svg {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
    chevron:<svg {...p}><polyline points="9 18 15 12 9 6"/></svg>,
    settings:<svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    bell:<svg {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    logout:<svg {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    briefcase:<svg {...p}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    trending:<svg {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    clock:<svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    star:<svg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    help:<svg {...p}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    eye:<svg {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    transfer:<svg {...p}><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
    layers:<svg {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    menu:<svg {...p} strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    upload:<svg {...p}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
    creditcard:<svg {...p}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    hash:<svg {...p}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>,
    alertcircle:<svg {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    checkcircle:<svg {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    x:<svg {...p} strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    calendar:<svg {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    download:<svg {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    tag:<svg {...p}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    stamp:<svg {...p}><path d="M5 21h14"/><path d="M12 17V12a3 3 0 0 0-3-3H8l4-6 4 6h-1a3 3 0 0 0-3 3v5z"/></svg>,
    printer:<svg {...p}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
    qr:<svg {...p}><rect x="2" y="2" width="6" height="6"/><rect x="16" y="2" width="6" height="6"/><rect x="2" y="16" width="6" height="6"/><path d="M16 16h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2zm-2-2h2v2h-2z"/></svg>,
    link:<svg {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    activity:<svg {...p}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    database:<svg {...p}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
    users:<svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    send:<svg {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    folder:<svg {...p}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
    bar:<svg {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    clipboard:<svg {...p}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>,
    megaphone:<svg {...p}><path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
    fingerprint:<svg {...p}><path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"/><path d="M5 19.5C5.5 18 6 15 6 12c0-3.3 2.7-6 6-6s6 2.7 6 6c0 1-.2 2-.5 3"/><path d="M12 12a3 3 0 0 0-3 3c0 2 .5 4 1 5.5"/><circle cx="12" cy="12" r="1"/></svg>,
    split:<svg {...p}><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/><path d="m15 9 6-6"/></svg>,
    merge:<svg {...p}><path d="m8 6 4 4 4-4"/><path d="M12 10v10"/><path d="M4 4h16"/></svg>,
    message:<svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    list:<svg {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    globe:<svg {...p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    key:<svg {...p}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
    plus:<svg {...p} strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    award:<svg {...p}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
    crown:<svg {...p}><path d="M2 20h20l-2-8-4 4-4-8-4 8-4-4z"/><rect x="2" y="20" width="20" height="2" rx="1"/></svg>,
  };
  return ic[n] || null;
};

const CoatOfArms = ({ size=48 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#166534"/><stop offset="100%" stopColor="#16a34a"/></linearGradient>
      <linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#166534"/><stop offset="50%" stopColor="#22c55e"/><stop offset="100%" stopColor="#15803d"/></linearGradient>
    </defs>
    <rect x="10" y="10" width="80" height="80" rx="18" fill="url(#sg)"/>
    <path d="M50 30 L55 40 L65 40 L57 47 L60 57 L50 51 L40 57 L43 47 L35 40 L45 40 Z" fill="url(#gg)"/>
    <circle cx="50" cy="44" r="10" fill="none" stroke="url(#gg)" strokeWidth="1.2" opacity=".5"/>
    <text x="50" y="73" textAnchor="middle" fill="url(#gg)" fontSize="6.5" fontWeight="700" fontFamily="serif" letterSpacing="1">PSD</text>
  </svg>
);

// ── IMAGES: Figma-sourced Unsplash + gradient fallback for sandboxed environments ──
const IM={
  // ★ Hero Slider — Lords Ville 3D Renders
  h1:"/lords/gate-front.jpg",
  h2:"/lords/aerial-blue2.jpg",
  h3:"/lords/gate-wide.jpg",
  h4:"/lords/park.jpg",
  h5:"/lords/duplex.jpg",
  h6:"/lords/community.jpg",
  h7:"/lords/duplex-zone.jpg",
  h8:"/lords/aerial1.jpg",
  // Login/auth
  hero:"/lords/gate-close.jpg",
  bg1:"/lords/estate.jpg",
  bg3:"/lords/street.jpg",
  // Estate cards
  e1:"/lords/home1.jpg",
  e2:"/lords/home2.jpg",
  e3:"/lords/villa3.jpg",
  e4:"/lords/red-roof.jpg",
  // Development/project
  d1:"/lords/amenity1.jpg",
  d2:"/lords/court.jpg",
  d3:"/lords/duplex-zone.jpg",
  // Page hero backgrounds
  p1:"/lords/kids.jpg",
  p2:"/lords/playground1.jpg",
  p3:"/lords/playground2.jpg",
  p4:"/lords/dark-street.jpg",
  aerial:"/lords/aerial1.jpg",
  // Housing cards
  hc1:"/lords/semi-front.jpg",
  hc2:"/lords/brick-home.jpg",
  hc3:"/lords/villa4.jpg",
  hc4:"/lords/brick-entry.jpg",
  hc5:"/lords/semi-dark.jpg",
  hc6:"/lords/scene52.jpg",
  // Bedroom/floor plan renders (Lords Ville 3D)
  bd1:"/lords/1bed.jpg",
  bd2:"/lords/2bed.jpg",
  bd3:"/lords/1bed2.jpg",
  bd4:"/lords/2bed2.jpg",
  // Video reel images (continuous scroll showcase)
  vr1:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=350&fit=crop&q=80",
  vr2:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&h=350&fit=crop&q=80",
  vr3:"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&h=350&fit=crop&q=80",
  vr4:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=350&fit=crop&q=80",
  vr5:"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=350&fit=crop&q=80",
  vr6:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=350&fit=crop&q=80",
  vr7:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&h=350&fit=crop&q=80",
  vr8:"https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=500&h=350&fit=crop&q=80",
  vr9:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=350&fit=crop&q=80",
  vr10:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=350&fit=crop&q=80",
  vr11:"https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=500&h=350&fit=crop&q=80",
  vr12:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=350&fit=crop&q=80",
};
const G="linear-gradient(135deg,#0a1f0d 0%,#166534 50%,#4ade80 100%)";
const IMG_GRADS={
  h1:G,h2:G,h3:G,h4:G,h5:G,h6:G,h7:G,h8:G,
  hero:G,bg1:G,bg3:G,
  e1:G,e2:G,e3:G,e4:G,
  d1:G,d2:G,d3:G,
  p1:G,p2:G,p3:G,p4:G,aerial:G,
  hc1:G,hc2:G,hc3:G,hc4:G,hc5:G,hc6:G,
  bd1:G,bd2:G,bd3:G,bd4:G,
  vr1:G,vr2:G,vr3:G,vr4:G,vr5:G,vr6:G,vr7:G,vr8:G,vr9:G,vr10:G,vr11:G,vr12:G,
};
// Smart image component: shows real photo if loadable, premium gradient if blocked
const Img=({src,alt="",className="",style={},k})=>{
  const [failed,setFailed]=React.useState(false);
  const grad=k&&IMG_GRADS[k]?IMG_GRADS[k]:IMG_GRADS.hero;
  return failed?<div className={className} style={{...style,background:grad,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{textAlign:"center",color:"rgba(255,255,255,.35)"}}><I n="building" s={40}/><div style={{fontSize:11,marginTop:6,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>{alt||"Project Sales"}</div></div></div>
    :<img src={src} alt={alt} className={className} style={style} onError={()=>setFailed(true)} loading="lazy"/>;
};

const fmt=n=>"₦"+Number(n).toLocaleString();

// ─── DATA ───
const ESTATES=[
  {id:1,name:"Centenary City Estate",loc:"Centenary City, Enugu",img:IM.e1,desc:"Premier gated estate with full infrastructure — roads, drainage, electricity, water. 24/7 security with CCTV.",total:120,avail:42,sold:78,
    plots:[
      {id:"CC-001",type:"residential",size:"500",price:"15000000",status:"available",block:"A",lga:"Enugu East",parent:"Centenary City Layout - Phase 3",fileNo:"MOH/CC/2024/001",oldFile:"LR-EN/2019/4521",created:"2024-03-15",regNo:"REG/EN/2024/0042",owner:null,instrument:null,pending:null,desc:"Corner plot with dual road access. Premium location near estate gate. Flat terrain, well-drained.",prevOwner:null,docs:[],surveyNo:"SVP/EN/CC/001/2024",topo:"Flat terrain",soil:"Laterite",access:"Dual road access",utilities:"Estate water & electricity"},
      {id:"CC-002",type:"residential",size:"600",price:"18000000",status:"available",block:"A",lga:"Enugu East",parent:"Centenary City Layout - Phase 3",fileNo:"MOH/CC/2024/002",oldFile:"LR-EN/2019/4522",created:"2024-03-15",regNo:"REG/EN/2024/0043",owner:null,instrument:null,pending:null,desc:"Spacious plot backing the green belt. Ideal for family compound.",prevOwner:null,docs:[],surveyNo:"SVP/EN/CC/002/2024",topo:"Flat terrain",soil:"Sandy laterite",access:"Single road access",utilities:"Estate water & electricity"},
      {id:"CC-003",type:"commercial",size:"900",price:"32000000",status:"available",block:"B",lga:"Enugu East",parent:"Centenary City Layout - Phase 3",fileNo:"MOH/CC/2024/003",oldFile:"LR-EN/2019/4523",created:"2024-03-15",regNo:"REG/EN/2024/0044",owner:null,instrument:null,pending:null,desc:"Prime commercial plot on main boulevard. High visibility, heavy foot traffic zone.",prevOwner:"Enugu State Govt (Original allottee revoked 2022)",docs:[],surveyNo:"SVP/EN/CC/003/2024",topo:"Flat terrain",soil:"Laterite",access:"Triple road access",utilities:"Commercial power, 3-phase"},
      {id:"CC-004",type:"residential",size:"500",price:"15000000",status:"sold",block:"A",lga:"Enugu East",parent:"Centenary City Layout - Phase 3",fileNo:"MOH/CC/2024/004",oldFile:"LR-EN/2019/4524",created:"2024-03-15",regNo:"REG/EN/2024/0045",owner:"Chief Emeka Nwosu",instrument:"Deed of Assignment - DA/EN/2025/0089",pending:"Ground Rent 2026 — N25,000",desc:"Residential plot in Block A. Fully fenced with perimeter wall.",prevOwner:"Government of Enugu State",docs:["Allocation Paper","Deed of Assignment","Survey Plan","Building Plan Approval"],surveyNo:"SVP/EN/CC/004/2024",topo:"Flat",soil:"Laterite",access:"Dual access",utilities:"Connected"},
      {id:"CC-005",type:"commercial",size:"1200",price:"45000000",status:"sold",block:"B",lga:"Enugu East",parent:"Centenary City Layout - Phase 3",fileNo:"MOH/CC/2024/005",oldFile:"LR-EN/2019/4525",created:"2024-03-15",regNo:"REG/EN/2024/0046",owner:"Okafor Holdings Ltd",instrument:"C of O — CO/EN/2025/0023",pending:null,desc:"Large commercial plot along main access road.",prevOwner:"Government of Enugu State",docs:["Certificate of Occupancy","Survey Plan","Allocation Paper","Tax Clearance"],surveyNo:"SVP/EN/CC/005/2024",topo:"Flat",soil:"Laterite",access:"Boulevard frontage",utilities:"Commercial power, water"},
      {id:"CC-006",type:"residential",size:"500",price:"15000000",status:"available",block:"C",lga:"Enugu East",parent:"Centenary City Layout - Phase 3",fileNo:"MOH/CC/2024/006",oldFile:"LR-EN/2019/4526",created:"2024-03-15",regNo:"REG/EN/2024/0047",owner:null,instrument:null,pending:null,desc:"Quiet cul-de-sac location. Ideal for private residence.",prevOwner:null,docs:[],surveyNo:"SVP/EN/CC/006/2024",topo:"Gentle slope",soil:"Laterite",access:"Cul-de-sac",utilities:"Estate supply"},
      {id:"CC-007",type:"mixed",size:"800",price:"28000000",status:"available",block:"B",lga:"Enugu East",parent:"Centenary City Layout - Phase 3",fileNo:"MOH/CC/2024/007",oldFile:"LR-EN/2019/4527",created:"2024-03-15",regNo:"REG/EN/2024/0048",owner:null,instrument:null,pending:null,desc:"Mixed-use plot near commercial hub. Approved for residential or light commercial.",prevOwner:null,docs:[],surveyNo:"SVP/EN/CC/007/2024",topo:"Flat",soil:"Sandy laterite",access:"Dual access",utilities:"Commercial power available"},
      {id:"CC-008",type:"residential",size:"500",price:"15000000",status:"sold",block:"C",lga:"Enugu East",parent:"Centenary City Layout - Phase 3",fileNo:"MOH/CC/2024/008",oldFile:"LR-EN/2019/4528",created:"2024-03-15",regNo:"REG/EN/2024/0049",owner:"Dr. Ada Eze",instrument:"Allocation Paper — ALC/EN/2024/0156",pending:"Infrastructure Levy — N375,000",desc:"Residential plot in quiet Block C area.",prevOwner:"Government of Enugu State",docs:["Allocation Paper","Survey Plan"],surveyNo:"SVP/EN/CC/008/2024",topo:"Flat",soil:"Laterite",access:"Single access",utilities:"Connected"},
    ]},
  {id:2,name:"Nike Lake Estate",loc:"Nike Lake Road, Enugu",img:IM.e2,desc:"Luxury waterfront estate overlooking Nike Lake. Serene with lush landscapes, underground utilities, smart home readiness.",total:80,avail:28,sold:52,
    plots:[
      {id:"NL-001",type:"residential",size:"800",price:"22000000",status:"available",block:"A",lga:"Enugu East",parent:"Nike Lake Layout Extension",fileNo:"MOH/NL/2024/001",oldFile:"LR-EN/2020/3201",created:"2024-06-01",regNo:"REG/EN/2024/0101",owner:null,instrument:null,pending:null,desc:"Lakefront plot with panoramic water views. Premium waterfront.",prevOwner:null,docs:[],surveyNo:"SVP/EN/NL/001/2024",topo:"Gentle slope to lake",soil:"Sandy laterite",access:"Private estate road",utilities:"Underground utilities"},
      {id:"NL-002",type:"residential",size:"1000",price:"28000000",status:"available",block:"A",lga:"Enugu East",parent:"Nike Lake Layout Extension",fileNo:"MOH/NL/2024/002",oldFile:"LR-EN/2020/3202",created:"2024-06-01",regNo:"REG/EN/2024/0102",owner:null,instrument:null,pending:null,desc:"Premium corner plot, double frontage. Suitable for luxury villa.",prevOwner:null,docs:[],surveyNo:"SVP/EN/NL/002/2024",topo:"Flat",soil:"Sandy laterite",access:"Double frontage",utilities:"Underground utilities"},
      {id:"NL-003",type:"commercial",size:"1500",price:"55000000",status:"sold",block:"B",lga:"Enugu East",parent:"Nike Lake Layout Extension",fileNo:"MOH/NL/2024/003",oldFile:"LR-EN/2020/3203",created:"2024-06-01",regNo:"REG/EN/2024/0103",owner:"Lake View Hotels Ltd",instrument:"C of O — CO/EN/2025/0034",pending:null,desc:"Hotel-zoned commercial plot overlooking lake.",prevOwner:"Government of Enugu State",docs:["Certificate of Occupancy","Survey Plan","Environmental Impact Assessment","Building Plan Approval"],surveyNo:"SVP/EN/NL/003/2024",topo:"Flat",soil:"Sandy",access:"Main boulevard",utilities:"Commercial grade"},
      {id:"NL-004",type:"residential",size:"800",price:"22000000",status:"available",block:"C",lga:"Enugu East",parent:"Nike Lake Layout Extension",fileNo:"MOH/NL/2024/004",oldFile:"LR-EN/2020/3204",created:"2024-06-01",regNo:"REG/EN/2024/0104",owner:null,instrument:null,pending:null,desc:"Garden-facing plot in serene residential zone.",prevOwner:null,docs:[],surveyNo:"SVP/EN/NL/004/2024",topo:"Flat",soil:"Laterite",access:"Estate road",utilities:"Estate supply"},
    ]},
  {id:3,name:"Emene Industrial Park",loc:"Emene, Enugu",img:IM.e3,desc:"Dedicated industrial & commercial zone with heavy-duty road access, railway proximity, industrial-grade power.",total:60,avail:35,sold:25,
    plots:[
      {id:"EI-001",type:"commercial",size:"2000",price:"18000000",status:"available",block:"A",lga:"Enugu East",parent:"Emene Industrial Layout",fileNo:"MOH/EI/2024/001",oldFile:"LR-EN/2021/5501",created:"2024-01-10",regNo:"REG/EN/2024/0201",owner:null,instrument:null,pending:null,desc:"Warehouse-ready plot with rail siding access. Flat, compacted ground.",prevOwner:null,docs:[],surveyNo:"SVP/EN/EI/001/2024",topo:"Flat, compacted",soil:"Gravel base",access:"Rail siding + road",utilities:"Industrial 3-phase power"},
      {id:"EI-002",type:"commercial",size:"5000",price:"45000000",status:"available",block:"A",lga:"Enugu East",parent:"Emene Industrial Layout",fileNo:"MOH/EI/2024/002",oldFile:"LR-EN/2021/5502",created:"2024-01-10",regNo:"REG/EN/2024/0202",owner:null,instrument:null,pending:null,desc:"Large manufacturing plot. Heavy vehicle access, flat terrain.",prevOwner:"Enugu Development Authority (surrendered 2023)",docs:[],surveyNo:"SVP/EN/EI/002/2024",topo:"Flat",soil:"Compacted laterite",access:"Heavy vehicle road",utilities:"Industrial power + borehole"},
      {id:"EI-003",type:"commercial",size:"3000",price:"28000000",status:"sold",block:"B",lga:"Enugu East",parent:"Emene Industrial Layout",fileNo:"MOH/EI/2024/003",oldFile:"LR-EN/2021/5503",created:"2024-01-10",regNo:"REG/EN/2024/0203",owner:"Coal City Manufacturing Ltd",instrument:"C of O — CO/EN/2024/0078",pending:null,desc:"Industrial plot with active factory building.",prevOwner:"Government of Enugu State",docs:["Certificate of Occupancy","Survey Plan","Environmental Impact Assessment","Factory Registration"],surveyNo:"SVP/EN/EI/003/2024",topo:"Flat",soil:"Laterite",access:"Industrial road",utilities:"Connected"},
    ]},
  {id:4,name:"Milliken Hill Estate",loc:"Milliken Hill, Enugu",img:IM.e4,desc:"Ultra-premium hillside estate with panoramic escarpment views. Exclusive low-density, villa-sized plots, private roads.",total:40,avail:18,sold:22,
    plots:[
      {id:"MH-001",type:"residential",size:"1200",price:"35000000",status:"available",block:"A",lga:"Enugu South",parent:"Milliken Hill Premium Layout",fileNo:"MOH/MH/2025/001",oldFile:"LR-EN/2022/7801",created:"2025-01-05",regNo:"REG/EN/2025/0001",owner:null,instrument:null,pending:null,desc:"Hilltop plot with 360-degree panoramic views of the Enugu escarpment.",prevOwner:null,docs:[],surveyNo:"SVP/EN/MH/001/2025",topo:"Hilltop, elevated",soil:"Rocky laterite",access:"Private tarred road",utilities:"Independent transformer"},
      {id:"MH-002",type:"residential",size:"1500",price:"42000000",status:"available",block:"A",lga:"Enugu South",parent:"Milliken Hill Premium Layout",fileNo:"MOH/MH/2025/002",oldFile:"LR-EN/2022/7802",created:"2025-01-05",regNo:"REG/EN/2025/0002",owner:null,instrument:null,pending:null,desc:"Premium villa-sized plot with ample garden space. South-facing.",prevOwner:null,docs:[],surveyNo:"SVP/EN/MH/002/2025",topo:"Gentle slope",soil:"Laterite",access:"Private road",utilities:"Independent transformer"},
      {id:"MH-003",type:"residential",size:"1200",price:"35000000",status:"sold",block:"B",lga:"Enugu South",parent:"Milliken Hill Premium Layout",fileNo:"MOH/MH/2025/003",oldFile:"LR-EN/2022/7803",created:"2025-01-05",regNo:"REG/EN/2025/0003",owner:"Senator Paul Igwe",instrument:"Allocation Paper — ALC/EN/2025/0012",pending:"Premium Fee Balance — N12,000,000",desc:"Premium residential plot in exclusive Block B.",prevOwner:"Government of Enugu State",docs:["Allocation Paper","Survey Plan"],surveyNo:"SVP/EN/MH/003/2025",topo:"Elevated",soil:"Rocky laterite",access:"Private road",utilities:"Pending connection"},
    ]},
  {id:5,name:"Legacy Estates",loc:"Agbani Road, Nkanu West, Enugu",img:IM.e1,desc:"Flagship development by Legacy Homes — premium residential plots with modern infrastructure, gated entry, and estate management. Ideal for generational investment.",total:150,avail:95,sold:55,
    plots:[
      {id:"LE-001",type:"residential",size:"500",price:"8500000",status:"available",block:"A",lga:"Nkanu West",parent:"Legacy Estates Phase 1",fileNo:"MOH/LE/2025/001",oldFile:"LR-EN/2023/8001",created:"2025-01-20",regNo:"REG/EN/2025/0101",owner:null,instrument:null,pending:null,desc:"Prime residential plot in Block A near estate gate. Fully serviced with tarred road frontage.",prevOwner:null,docs:[],surveyNo:"SVP/EN/LE/001/2025",topo:"Flat terrain",soil:"Laterite",access:"Estate tarred road",utilities:"Estate water & electricity"},
      {id:"LE-002",type:"residential",size:"500",price:"8500000",status:"available",block:"A",lga:"Nkanu West",parent:"Legacy Estates Phase 1",fileNo:"MOH/LE/2025/002",oldFile:"LR-EN/2023/8002",created:"2025-01-20",regNo:"REG/EN/2025/0102",owner:null,instrument:null,pending:null,desc:"Interior residential plot with green belt view.",prevOwner:null,docs:[],surveyNo:"SVP/EN/LE/002/2025",topo:"Flat",soil:"Laterite",access:"Internal road",utilities:"Connected"},
      {id:"LE-003",type:"corner",size:"650",price:"12000000",status:"sold",block:"B",lga:"Nkanu West",parent:"Legacy Estates Phase 1",fileNo:"MOH/LE/2025/003",oldFile:"LR-EN/2023/8003",created:"2025-01-20",regNo:"REG/EN/2025/0103",owner:"Barr. Ikechukwu Agu",instrument:"Deed of Assignment — DA/EN/2025/0112",pending:null,desc:"Premium corner plot with dual frontage.",prevOwner:"Government of Enugu State",docs:["Allocation Paper","Deed of Assignment","Survey Plan"],surveyNo:"SVP/EN/LE/003/2025",topo:"Flat",soil:"Sandy laterite",access:"Dual road access",utilities:"Connected"},
    ]},
  {id:6,name:"Satellite Estate",loc:"Ishinome, Akpuoga Nike, Enugu East",img:IM.e2,shape:"organic",mapFile:"/satellite-map.html",surveyPlan:"/survey-satellite-estate.jpg",desc:"Major satellite estate per Plan MJ/EN 93/2016 at Ishinome, Akpuoga Nike. Enugu East LGA. Scale 1:1000, Origin Minna Datum Zone 32. Hundreds of residential plots in irregular boundary.",total:400,avail:265,sold:135,
    plots:[
      {id:"SE-001",type:"residential",size:"460",price:"5500000",status:"available",block:"A",lga:"Udi",parent:"Satellite Town Layout",fileNo:"MOH/SE/2025/001",oldFile:"LR-EN/2023/8101",created:"2025-02-01",regNo:"REG/EN/2025/0201",owner:null,instrument:null,pending:null,desc:"Affordable residential plot near main gate. Flat terrain.",prevOwner:null,docs:[],surveyNo:"SVP/EN/SE/001/2025",topo:"Flat",soil:"Laterite",access:"Estate road",utilities:"Estate supply"},
      {id:"SE-002",type:"residential",size:"460",price:"5500000",status:"available",block:"B",lga:"Udi",parent:"Satellite Town Layout",fileNo:"MOH/SE/2025/002",oldFile:"LR-EN/2023/8102",created:"2025-02-01",regNo:"REG/EN/2025/0202",owner:null,instrument:null,pending:null,desc:"Central location within estate. Close to proposed market.",prevOwner:null,docs:[],surveyNo:"SVP/EN/SE/002/2025",topo:"Flat",soil:"Sandy laterite",access:"Internal road",utilities:"Connected"},
      {id:"SE-003",type:"commercial",size:"800",price:"9000000",status:"available",block:"C",lga:"Udi",parent:"Satellite Town Layout",fileNo:"MOH/SE/2025/003",oldFile:"LR-EN/2023/8103",created:"2025-02-01",regNo:"REG/EN/2025/0203",owner:null,instrument:null,pending:null,desc:"Commercial plot along the main boulevard.",prevOwner:null,docs:[],surveyNo:"SVP/EN/SE/003/2025",topo:"Flat",soil:"Laterite",access:"Boulevard frontage",utilities:"Commercial power"},
    ]},
  {id:7,name:"IGP Ogbonnaya Onovo Police Housing Estate",loc:"New Artisan, Enugu South",img:IM.e3,desc:"Government-backed police housing estate offering secure, well-planned residential plots with perimeter fencing, CCTV, and dedicated security post.",total:80,avail:45,sold:35,
    plots:[
      {id:"PH-001",type:"residential",size:"500",price:"7000000",status:"available",block:"A",lga:"Enugu South",parent:"Police Housing Layout",fileNo:"MOH/PH/2025/001",oldFile:"LR-EN/2023/8201",created:"2025-01-15",regNo:"REG/EN/2025/0301",owner:null,instrument:null,pending:null,desc:"Residential plot within secured police housing zone.",prevOwner:null,docs:[],surveyNo:"SVP/EN/PH/001/2025",topo:"Flat",soil:"Laterite",access:"Estate road",utilities:"Connected"},
      {id:"PH-002",type:"residential",size:"500",price:"7000000",status:"sold",block:"A",lga:"Enugu South",parent:"Police Housing Layout",fileNo:"MOH/PH/2025/002",oldFile:"LR-EN/2023/8202",created:"2025-01-15",regNo:"REG/EN/2025/0302",owner:"DSP Amaka Obi",instrument:"Allocation Paper — ALC/EN/2025/0055",pending:null,desc:"Interior plot with proximity to recreation area.",prevOwner:"Government of Enugu State",docs:["Allocation Paper","Survey Plan"],surveyNo:"SVP/EN/PH/002/2025",topo:"Flat",soil:"Laterite",access:"Internal road",utilities:"Connected"},
      {id:"PH-003",type:"residential",size:"600",price:"8500000",status:"available",block:"B",lga:"Enugu South",parent:"Police Housing Layout",fileNo:"MOH/PH/2025/003",oldFile:"LR-EN/2023/8203",created:"2025-01-15",regNo:"REG/EN/2025/0303",owner:null,instrument:null,pending:null,desc:"Spacious corner plot near estate gate.",prevOwner:null,docs:[],surveyNo:"SVP/EN/PH/003/2025",topo:"Gentle slope",soil:"Laterite",access:"Dual access",utilities:"Estate supply"},
    ]},
  {id:8,name:"Rehoboth Estate",loc:"Amorji Nike, Enugu East",img:IM.e4,desc:"Serene residential estate in Amorji Nike offering affordable plots in a rapidly developing corridor with excellent road network.",total:90,avail:58,sold:32,
    plots:[
      {id:"RE-001",type:"residential",size:"480",price:"4500000",status:"available",block:"A",lga:"Enugu East",parent:"Rehoboth Layout",fileNo:"MOH/RE/2025/001",oldFile:"LR-EN/2023/8301",created:"2025-02-10",regNo:"REG/EN/2025/0401",owner:null,instrument:null,pending:null,desc:"Affordable plot in growing Nike axis.",prevOwner:null,docs:[],surveyNo:"SVP/EN/RE/001/2025",topo:"Flat",soil:"Sandy laterite",access:"Estate road",utilities:"Estate supply"},
      {id:"RE-002",type:"residential",size:"480",price:"4500000",status:"available",block:"A",lga:"Enugu East",parent:"Rehoboth Layout",fileNo:"MOH/RE/2025/002",oldFile:"LR-EN/2023/8302",created:"2025-02-10",regNo:"REG/EN/2025/0402",owner:null,instrument:null,pending:null,desc:"Central plot backing the green area.",prevOwner:null,docs:[],surveyNo:"SVP/EN/RE/002/2025",topo:"Flat",soil:"Laterite",access:"Internal road",utilities:"Connected"},
      {id:"RE-003",type:"corner",size:"550",price:"6000000",status:"sold",block:"B",lga:"Enugu East",parent:"Rehoboth Layout",fileNo:"MOH/RE/2025/003",oldFile:"LR-EN/2023/8303",created:"2025-02-10",regNo:"REG/EN/2025/0403",owner:"Mr. Obinna Nwankwo",instrument:"DA/EN/2025/0145",pending:"Ground Rent 2026 — ₦15,000",desc:"Premium corner piece in Block B.",prevOwner:"Government of Enugu State",docs:["Allocation Paper","Deed of Assignment","Survey Plan"],surveyNo:"SVP/EN/RE/003/2025",topo:"Flat",soil:"Sandy laterite",access:"Dual access",utilities:"Connected"},
    ]},
  {id:9,name:"Airport Garden Estate",loc:"Orie Emene, Near Akanu Ibiam Airport, Enugu",img:IM.e1,desc:"Premium estate near Akanu Ibiam International Airport. Strategic location for both residential and commercial investment with airport proximity advantage.",total:110,avail:72,sold:38,
    plots:[
      {id:"AG-001",type:"residential",size:"500",price:"6500000",status:"available",block:"A",lga:"Enugu East",parent:"Airport Garden Layout",fileNo:"MOH/AG/2025/001",oldFile:"LR-EN/2023/8401",created:"2025-01-25",regNo:"REG/EN/2025/0501",owner:null,instrument:null,pending:null,desc:"Residential plot near airport corridor. High appreciation zone.",prevOwner:null,docs:[],surveyNo:"SVP/EN/AG/001/2025",topo:"Flat",soil:"Sandy laterite",access:"Airport road",utilities:"Connected"},
      {id:"AG-002",type:"commercial",size:"900",price:"14000000",status:"available",block:"B",lga:"Enugu East",parent:"Airport Garden Layout",fileNo:"MOH/AG/2025/002",oldFile:"LR-EN/2023/8402",created:"2025-01-25",regNo:"REG/EN/2025/0502",owner:null,instrument:null,pending:null,desc:"Commercial plot on main boulevard. Hotel and hospitality zone.",prevOwner:null,docs:[],surveyNo:"SVP/EN/AG/002/2025",topo:"Flat",soil:"Laterite",access:"Boulevard frontage",utilities:"Commercial power"},
      {id:"AG-003",type:"residential",size:"500",price:"6500000",status:"sold",block:"A",lga:"Enugu East",parent:"Airport Garden Layout",fileNo:"MOH/AG/2025/003",oldFile:"LR-EN/2023/8403",created:"2025-01-25",regNo:"REG/EN/2025/0503",owner:"Chief Mrs. Ada Okonkwo",instrument:"C of O — CO/EN/2025/0056",pending:null,desc:"Residential plot in Block A with perimeter fencing.",prevOwner:"Government of Enugu State",docs:["Certificate of Occupancy","Survey Plan"],surveyNo:"SVP/EN/AG/003/2025",topo:"Flat",soil:"Sandy",access:"Estate road",utilities:"Connected"},
    ]},
  {id:10,name:"Kings Court Estate",loc:"Centenary City Road, Enugu East",img:IM.e2,desc:"Royal-themed gated community with premium infrastructure — interlocked roads, underground drainage, recreational facilities, and 24/7 power backup.",total:75,avail:42,sold:33,
    plots:[
      {id:"KC-001",type:"residential",size:"500",price:"10000000",status:"available",block:"A",lga:"Enugu East",parent:"Kings Court Layout",fileNo:"MOH/KC/2025/001",oldFile:"LR-EN/2024/9001",created:"2025-03-01",regNo:"REG/EN/2025/0601",owner:null,instrument:null,pending:null,desc:"Premium plot in exclusive Kings Court. Near clubhouse.",prevOwner:null,docs:[],surveyNo:"SVP/EN/KC/001/2025",topo:"Flat",soil:"Laterite",access:"Interlocked road",utilities:"24/7 power backup"},
      {id:"KC-002",type:"corner",size:"650",price:"14500000",status:"available",block:"A",lga:"Enugu East",parent:"Kings Court Layout",fileNo:"MOH/KC/2025/002",oldFile:"LR-EN/2024/9002",created:"2025-03-01",regNo:"REG/EN/2025/0602",owner:null,instrument:null,pending:null,desc:"Corner piece with garden view. Triple frontage.",prevOwner:null,docs:[],surveyNo:"SVP/EN/KC/002/2025",topo:"Flat",soil:"Sandy laterite",access:"Triple access",utilities:"Full estate utilities"},
      {id:"KC-003",type:"residential",size:"500",price:"10000000",status:"sold",block:"B",lga:"Enugu East",parent:"Kings Court Layout",fileNo:"MOH/KC/2025/003",oldFile:"LR-EN/2024/9003",created:"2025-03-01",regNo:"REG/EN/2025/0603",owner:"Engr. Chukwuma Eze",instrument:"DA/EN/2025/0167",pending:null,desc:"Interior plot in quiet residential zone.",prevOwner:"Government of Enugu State",docs:["Deed of Assignment","Survey Plan","Allocation Paper"],surveyNo:"SVP/EN/KC/003/2025",topo:"Flat",soil:"Laterite",access:"Estate road",utilities:"Connected"},
    ]},
  {id:11,name:"Divine Garden Estate",loc:"Abakpa Nike, Enugu East",img:IM.e3,desc:"Faith-inspired residential community in Abakpa Nike with landscaped gardens, children's playground, worship centre, and community hall.",total:85,avail:52,sold:33,
    plots:[
      {id:"DG-001",type:"residential",size:"450",price:"4000000",status:"available",block:"A",lga:"Enugu East",parent:"Divine Garden Layout",fileNo:"MOH/DG/2025/001",oldFile:"LR-EN/2024/9101",created:"2025-02-15",regNo:"REG/EN/2025/0701",owner:null,instrument:null,pending:null,desc:"Affordable residential plot near worship centre.",prevOwner:null,docs:[],surveyNo:"SVP/EN/DG/001/2025",topo:"Flat",soil:"Sandy laterite",access:"Estate road",utilities:"Estate supply"},
      {id:"DG-002",type:"residential",size:"450",price:"4000000",status:"available",block:"B",lga:"Enugu East",parent:"Divine Garden Layout",fileNo:"MOH/DG/2025/002",oldFile:"LR-EN/2024/9102",created:"2025-02-15",regNo:"REG/EN/2025/0702",owner:null,instrument:null,pending:null,desc:"Plot backing children's playground area.",prevOwner:null,docs:[],surveyNo:"SVP/EN/DG/002/2025",topo:"Flat",soil:"Laterite",access:"Internal road",utilities:"Connected"},
      {id:"DG-003",type:"commercial",size:"700",price:"7500000",status:"available",block:"C",lga:"Enugu East",parent:"Divine Garden Layout",fileNo:"MOH/DG/2025/003",oldFile:"LR-EN/2024/9103",created:"2025-02-15",regNo:"REG/EN/2025/0703",owner:null,instrument:null,pending:null,desc:"Commercial plot along estate main road.",prevOwner:null,docs:[],surveyNo:"SVP/EN/DG/003/2025",topo:"Flat",soil:"Laterite",access:"Main road frontage",utilities:"Commercial power"},
    ]},
  {id:12,name:"Communication Estate",loc:"Independence Layout, Nkwubor Nike, Enugu East",img:IM.e4,shape:"communication",mapFile:"/communication-map.html",desc:"Compact 23-plot residential estate at Independence Layout. 1-23 residential land-use plots with gate house, building setback compliance, and road serial numbering.",total:23,avail:14,sold:9,
    plots:[
      {id:"CM-001",type:"residential",size:"500",price:"5000000",status:"available",block:"A",lga:"Enugu East",parent:"Communication Layout",fileNo:"MOH/CM/2025/001",oldFile:"LR-EN/2024/9201",created:"2025-03-05",regNo:"REG/EN/2025/0801",owner:null,instrument:null,pending:null,desc:"Residential plot with excellent network coverage.",prevOwner:null,docs:[],surveyNo:"SVP/EN/CM/001/2025",topo:"Flat",soil:"Laterite",access:"Estate road",utilities:"Fibre optic ready"},
      {id:"CM-002",type:"residential",size:"500",price:"5000000",status:"available",block:"A",lga:"Enugu East",parent:"Communication Layout",fileNo:"MOH/CM/2025/002",oldFile:"LR-EN/2024/9202",created:"2025-03-05",regNo:"REG/EN/2025/0802",owner:null,instrument:null,pending:null,desc:"Interior plot in serene residential area.",prevOwner:null,docs:[],surveyNo:"SVP/EN/CM/002/2025",topo:"Flat",soil:"Sandy laterite",access:"Internal road",utilities:"Connected"},
      {id:"CM-003",type:"corner",size:"600",price:"7000000",status:"sold",block:"B",lga:"Enugu East",parent:"Communication Layout",fileNo:"MOH/CM/2025/003",oldFile:"LR-EN/2024/9203",created:"2025-03-05",regNo:"REG/EN/2025/0803",owner:"Dr. Ngozi Ike",instrument:"ALC/EN/2025/0078",pending:null,desc:"Corner plot with dual access road.",prevOwner:"Government of Enugu State",docs:["Allocation Paper","Survey Plan"],surveyNo:"SVP/EN/CM/003/2025",topo:"Flat",soil:"Laterite",access:"Dual access",utilities:"Connected"},
    ]},
  {id:13,name:"Rectors Garden Estate",loc:"Independence Layout, Nsukka Road, Enugu",img:IM.e1,shape:"rectors",mapFile:"/rectors-garden-map.html",surveyPlan:"/survey-rectors-garden.pdf",desc:"Exclusive 19-plot estate at Independence Layout per official survey plan. All residential plots with bearings and dimensions verified by TPL. Charles C. Ngene.",total:19,avail:12,sold:7,
    plots:[
      {id:"RG2-001",type:"residential",size:"500",price:"3500000",status:"available",block:"A",lga:"Nsukka",parent:"Rectors Garden Layout",fileNo:"MOH/RG/2025/001",oldFile:"LR-EN/2024/9301",created:"2025-02-20",regNo:"REG/EN/2025/0901",owner:null,instrument:null,pending:null,desc:"Residential plot near UNN campus. Ideal for rental investment.",prevOwner:null,docs:[],surveyNo:"SVP/EN/RG/001/2025",topo:"Gentle slope",soil:"Laterite",access:"Nsukka road",utilities:"Municipal supply"},
      {id:"RG2-002",type:"commercial",size:"800",price:"6000000",status:"available",block:"B",lga:"Nsukka",parent:"Rectors Garden Layout",fileNo:"MOH/RG/2025/002",oldFile:"LR-EN/2024/9302",created:"2025-02-20",regNo:"REG/EN/2025/0902",owner:null,instrument:null,pending:null,desc:"Commercial plot suitable for student hostel or plaza.",prevOwner:null,docs:[],surveyNo:"SVP/EN/RG/002/2025",topo:"Flat",soil:"Sandy laterite",access:"Main road",utilities:"Commercial power"},
      {id:"RG2-003",type:"residential",size:"500",price:"3500000",status:"sold",block:"A",lga:"Nsukka",parent:"Rectors Garden Layout",fileNo:"MOH/RG/2025/003",oldFile:"LR-EN/2024/9303",created:"2025-02-20",regNo:"REG/EN/2025/0903",owner:"Prof. Emmanuel Okeke",instrument:"ALC/EN/2025/0091",pending:null,desc:"Faculty-area residential plot.",prevOwner:"Government of Enugu State",docs:["Allocation Paper","Survey Plan"],surveyNo:"SVP/EN/RG/003/2025",topo:"Gentle slope",soil:"Laterite",access:"Internal road",utilities:"Connected"},
    ]},
  {id:14,name:"Valley View Estate",loc:"9th Mile Corner, Udi LGA, Enugu",img:IM.e2,desc:"Scenic estate at 9th Mile Corner with panoramic valley views. Strategic location on the Enugu-Onitsha expressway corridor.",total:95,avail:62,sold:33,
    plots:[
      {id:"VV-001",type:"residential",size:"500",price:"4500000",status:"available",block:"A",lga:"Udi",parent:"Valley View Layout",fileNo:"MOH/VV/2025/001",oldFile:"LR-EN/2024/9401",created:"2025-03-10",regNo:"REG/EN/2025/1001",owner:null,instrument:null,pending:null,desc:"Residential plot with valley panoramic view.",prevOwner:null,docs:[],surveyNo:"SVP/EN/VV/001/2025",topo:"Gentle slope",soil:"Laterite",access:"Expressway access",utilities:"Estate supply"},
      {id:"VV-002",type:"residential",size:"500",price:"4500000",status:"available",block:"B",lga:"Udi",parent:"Valley View Layout",fileNo:"MOH/VV/2025/002",oldFile:"LR-EN/2024/9402",created:"2025-03-10",regNo:"REG/EN/2025/1002",owner:null,instrument:null,pending:null,desc:"Serene residential plot in Block B.",prevOwner:null,docs:[],surveyNo:"SVP/EN/VV/002/2025",topo:"Flat",soil:"Sandy laterite",access:"Internal road",utilities:"Connected"},
      {id:"VV-003",type:"commercial",size:"1000",price:"10000000",status:"available",block:"C",lga:"Udi",parent:"Valley View Layout",fileNo:"MOH/VV/2025/003",oldFile:"LR-EN/2024/9403",created:"2025-03-10",regNo:"REG/EN/2025/1003",owner:null,instrument:null,pending:null,desc:"Expressway-facing commercial plot. High traffic zone.",prevOwner:null,docs:[],surveyNo:"SVP/EN/VV/003/2025",topo:"Flat",soil:"Compacted laterite",access:"Expressway frontage",utilities:"Commercial power"},
    ]},
  {id:15,name:"Cordial Estate",loc:"Ngwo, Udi LGA, Enugu",img:IM.e3,desc:"Peaceful hillside community in Ngwo with cool climate, natural vegetation, and breathtaking views of the Miliken Hill range.",total:55,avail:35,sold:20,
    plots:[
      {id:"CD-001",type:"residential",size:"500",price:"5000000",status:"available",block:"A",lga:"Udi",parent:"Cordial Layout",fileNo:"MOH/CD/2025/001",oldFile:"LR-EN/2024/9501",created:"2025-03-12",regNo:"REG/EN/2025/1101",owner:null,instrument:null,pending:null,desc:"Hillside residential plot with cool microclimate.",prevOwner:null,docs:[],surveyNo:"SVP/EN/CD/001/2025",topo:"Gentle slope",soil:"Rocky laterite",access:"Private road",utilities:"Borehole + solar"},
      {id:"CD-002",type:"residential",size:"500",price:"5000000",status:"available",block:"A",lga:"Udi",parent:"Cordial Layout",fileNo:"MOH/CD/2025/002",oldFile:"LR-EN/2024/9502",created:"2025-03-12",regNo:"REG/EN/2025/1102",owner:null,instrument:null,pending:null,desc:"Elevated plot with mountain views.",prevOwner:null,docs:[],surveyNo:"SVP/EN/CD/002/2025",topo:"Elevated",soil:"Laterite",access:"Estate road",utilities:"Estate supply"},
      {id:"CD-003",type:"residential",size:"600",price:"6500000",status:"sold",block:"B",lga:"Udi",parent:"Cordial Layout",fileNo:"MOH/CD/2025/003",oldFile:"LR-EN/2024/9503",created:"2025-03-12",regNo:"REG/EN/2025/1103",owner:"Arc. Uche Nnamdi",instrument:"DA/EN/2025/0190",pending:null,desc:"Premium plot in exclusive Block B.",prevOwner:"Government of Enugu State",docs:["Deed of Assignment","Survey Plan"],surveyNo:"SVP/EN/CD/003/2025",topo:"Gentle slope",soil:"Rocky laterite",access:"Private road",utilities:"Connected"},
    ]},
  {id:16,name:"Ikenga Estate",loc:"Agbani, Nkanu West LGA, Enugu",img:IM.e4,desc:"Warrior-themed estate in Agbani offering strength in investment. Well-planned residential community with perimeter wall and manned security gate.",total:100,avail:65,sold:35,
    plots:[
      {id:"IK-001",type:"residential",size:"500",price:"4000000",status:"available",block:"A",lga:"Nkanu West",parent:"Ikenga Layout",fileNo:"MOH/IK/2025/001",oldFile:"LR-EN/2024/9601",created:"2025-03-15",regNo:"REG/EN/2025/1201",owner:null,instrument:null,pending:null,desc:"Affordable residential plot in Agbani growth corridor.",prevOwner:null,docs:[],surveyNo:"SVP/EN/IK/001/2025",topo:"Flat",soil:"Laterite",access:"Estate road",utilities:"Estate supply"},
      {id:"IK-002",type:"residential",size:"500",price:"4000000",status:"available",block:"B",lga:"Nkanu West",parent:"Ikenga Layout",fileNo:"MOH/IK/2025/002",oldFile:"LR-EN/2024/9602",created:"2025-03-15",regNo:"REG/EN/2025/1202",owner:null,instrument:null,pending:null,desc:"Interior plot near community centre.",prevOwner:null,docs:[],surveyNo:"SVP/EN/IK/002/2025",topo:"Flat",soil:"Sandy laterite",access:"Internal road",utilities:"Connected"},
      {id:"IK-003",type:"commercial",size:"800",price:"7500000",status:"available",block:"C",lga:"Nkanu West",parent:"Ikenga Layout",fileNo:"MOH/IK/2025/003",oldFile:"LR-EN/2024/9603",created:"2025-03-15",regNo:"REG/EN/2025/1203",owner:null,instrument:null,pending:null,desc:"Commercial plot on estate main road.",prevOwner:null,docs:[],surveyNo:"SVP/EN/IK/003/2025",topo:"Flat",soil:"Laterite",access:"Main road frontage",utilities:"Commercial power"},
    ]},
  {id:17,name:"Innovation Phase Estate",loc:"Nike Lake Road Extension, Enugu East",img:IM.e1,desc:"Tech-forward estate designed for the modern homeowner. Smart home ready, fibre optic pre-wired, solar street lights, and EV charging stations planned.",total:80,avail:55,sold:25,
    plots:[
      {id:"IP-001",type:"residential",size:"500",price:"9000000",status:"available",block:"A",lga:"Enugu East",parent:"Innovation Phase Layout",fileNo:"MOH/IP/2025/001",oldFile:"LR-EN/2024/9701",created:"2025-03-20",regNo:"REG/EN/2025/1301",owner:null,instrument:null,pending:null,desc:"Smart home ready plot with fibre optic connection.",prevOwner:null,docs:[],surveyNo:"SVP/EN/IP/001/2025",topo:"Flat",soil:"Sandy laterite",access:"Smart road",utilities:"Solar + grid power"},
      {id:"IP-002",type:"residential",size:"500",price:"9000000",status:"available",block:"A",lga:"Enugu East",parent:"Innovation Phase Layout",fileNo:"MOH/IP/2025/002",oldFile:"LR-EN/2024/9702",created:"2025-03-20",regNo:"REG/EN/2025/1302",owner:null,instrument:null,pending:null,desc:"Tech-enabled residential plot near innovation hub.",prevOwner:null,docs:[],surveyNo:"SVP/EN/IP/002/2025",topo:"Flat",soil:"Laterite",access:"Estate road",utilities:"Full smart utilities"},
      {id:"IP-003",type:"corner",size:"650",price:"12500000",status:"sold",block:"B",lga:"Enugu East",parent:"Innovation Phase Layout",fileNo:"MOH/IP/2025/003",oldFile:"LR-EN/2024/9703",created:"2025-03-20",regNo:"REG/EN/2025/1303",owner:"Tech Solutions Ltd",instrument:"C of O — CO/EN/2025/0089",pending:null,desc:"Premium corner plot with EV charging point.",prevOwner:"Government of Enugu State",docs:["Certificate of Occupancy","Survey Plan"],surveyNo:"SVP/EN/IP/003/2025",topo:"Flat",soil:"Sandy",access:"Dual access",utilities:"Connected"},
    ]},
  {id:18,name:"Camp David Estate",loc:"Amagunze, Nkanu East LGA, Enugu",img:IM.e2,desc:"Exclusive gated community in Amagunze with military-grade security. Perimeter wall, CCTV, armed response unit, and biometric gate access.",total:60,avail:38,sold:22,
    plots:[
      {id:"CDE-001",type:"residential",size:"600",price:"6000000",status:"available",block:"A",lga:"Nkanu East",parent:"Camp David Layout",fileNo:"MOH/CDE/2025/001",oldFile:"LR-EN/2024/9801",created:"2025-03-25",regNo:"REG/EN/2025/1401",owner:null,instrument:null,pending:null,desc:"Secured residential plot with biometric gate access.",prevOwner:null,docs:[],surveyNo:"SVP/EN/CDE/001/2025",topo:"Flat",soil:"Laterite",access:"Estate road",utilities:"Independent power"},
      {id:"CDE-002",type:"residential",size:"600",price:"6000000",status:"available",block:"B",lga:"Nkanu East",parent:"Camp David Layout",fileNo:"MOH/CDE/2025/002",oldFile:"LR-EN/2024/9802",created:"2025-03-25",regNo:"REG/EN/2025/1402",owner:null,instrument:null,pending:null,desc:"Interior plot in peaceful Block B.",prevOwner:null,docs:[],surveyNo:"SVP/EN/CDE/002/2025",topo:"Flat",soil:"Sandy laterite",access:"Internal road",utilities:"Estate supply"},
      {id:"CDE-003",type:"corner",size:"750",price:"8500000",status:"sold",block:"A",lga:"Nkanu East",parent:"Camp David Layout",fileNo:"MOH/CDE/2025/003",oldFile:"LR-EN/2024/9803",created:"2025-03-25",regNo:"REG/EN/2025/1403",owner:"Gen. (Rtd) Okechukwu Nwoye",instrument:"ALC/EN/2025/0112",pending:null,desc:"VIP corner plot near estate clubhouse.",prevOwner:"Government of Enugu State",docs:["Allocation Paper","Survey Plan"],surveyNo:"SVP/EN/CDE/003/2025",topo:"Flat",soil:"Laterite",access:"Dual access",utilities:"Connected"},
    ]},
  {id:19,name:"Hill View Estate",loc:"Asata Mine Road, Enugu South",img:IM.e3,shape:"grid",mapFile:"/hill-view-map.html",desc:"Premium 304-plot estate at Asata Mine Road per Survey Plan MJ/EN 93/2016. Features residential, commercial (C/1), utility (UT/1) and open space (OS/1-OS/2) plots with full road network.",total:304,avail:185,sold:119,
    plots:[
      {id:"HV-001",type:"residential",size:"600",price:"8000000",status:"available",block:"A",lga:"Enugu South",parent:"Hill View Layout",fileNo:"MOH/HV/2025/001",oldFile:"LR-EN/2024/9901",created:"2025-04-01",regNo:"REG/EN/2025/1501",owner:null,instrument:null,pending:null,desc:"Hilltop plot with panoramic escarpment views.",prevOwner:null,docs:[],surveyNo:"SVP/EN/HV/001/2025",topo:"Elevated",soil:"Rocky laterite",access:"Private road",utilities:"Independent transformer"},
      {id:"HV-002",type:"residential",size:"600",price:"8000000",status:"available",block:"A",lga:"Enugu South",parent:"Hill View Layout",fileNo:"MOH/HV/2025/002",oldFile:"LR-EN/2024/9902",created:"2025-04-01",regNo:"REG/EN/2025/1502",owner:null,instrument:null,pending:null,desc:"Elevated plot with city skyline views.",prevOwner:null,docs:[],surveyNo:"SVP/EN/HV/002/2025",topo:"Gentle slope",soil:"Laterite",access:"Estate road",utilities:"Connected"},
      {id:"HV-003",type:"residential",size:"800",price:"12000000",status:"sold",block:"B",lga:"Enugu South",parent:"Hill View Layout",fileNo:"MOH/HV/2025/003",oldFile:"LR-EN/2024/9903",created:"2025-04-01",regNo:"REG/EN/2025/1503",owner:"Chief Obi Nwosu",instrument:"DA/EN/2025/0210",pending:null,desc:"Premium villa-sized plot in exclusive Block B.",prevOwner:"Government of Enugu State",docs:["Deed of Assignment","Survey Plan","Allocation Paper"],surveyNo:"SVP/EN/HV/003/2025",topo:"Elevated",soil:"Rocky laterite",access:"Private road",utilities:"Connected"},
    ]},
  {id:20,name:"Top Hill Estate",loc:"Golf Course Road, GRA, Enugu",img:IM.e4,desc:"Ultra-premium estate in GRA near the golf course. Exclusive neighbourhood with mature trees, diplomatic enclave proximity, and premium road infrastructure.",total:35,avail:18,sold:17,
    plots:[
      {id:"TH-001",type:"residential",size:"1000",price:"25000000",status:"available",block:"A",lga:"Enugu North",parent:"Top Hill Premium Layout",fileNo:"MOH/TH/2025/001",oldFile:"LR-EN/2024/1001",created:"2025-04-05",regNo:"REG/EN/2025/1601",owner:null,instrument:null,pending:null,desc:"Ultra-premium plot near golf course. Diplomatic zone.",prevOwner:null,docs:[],surveyNo:"SVP/EN/TH/001/2025",topo:"Elevated",soil:"Laterite",access:"Tarred boulevard",utilities:"Underground utilities"},
      {id:"TH-002",type:"residential",size:"1200",price:"32000000",status:"available",block:"A",lga:"Enugu North",parent:"Top Hill Premium Layout",fileNo:"MOH/TH/2025/002",oldFile:"LR-EN/2024/1002",created:"2025-04-05",regNo:"REG/EN/2025/1602",owner:null,instrument:null,pending:null,desc:"Villa-sized plot with mature tree canopy.",prevOwner:null,docs:[],surveyNo:"SVP/EN/TH/002/2025",topo:"Gentle slope",soil:"Sandy laterite",access:"Private road",utilities:"Full underground"},
      {id:"TH-003",type:"residential",size:"1000",price:"25000000",status:"sold",block:"B",lga:"Enugu North",parent:"Top Hill Premium Layout",fileNo:"MOH/TH/2025/003",oldFile:"LR-EN/2024/1003",created:"2025-04-05",regNo:"REG/EN/2025/1603",owner:"Ambassador James Eze",instrument:"C of O — CO/EN/2025/0098",pending:null,desc:"Premium plot in exclusive Block B.",prevOwner:"Government of Enugu State",docs:["Certificate of Occupancy","Survey Plan","Allocation Paper"],surveyNo:"SVP/EN/TH/003/2025",topo:"Elevated",soil:"Laterite",access:"Private road",utilities:"Connected"},
    ]},
  {id:21,name:"New Town Estate",loc:"Oji River LGA, Enugu State",img:IM.e1,shape:"new-town",mapFile:"/new-town-map.html",desc:"247-plot estate near Nigeria Prisons Oji River. 1-247 residential plots, C/1 commercial, P/1 public use, OS/1 open space. Designed by Omoh Associates Ltd.",total:247,avail:165,sold:82,
    plots:[
      {id:"NT-001",type:"residential",size:"480",price:"3500000",status:"available",block:"A",lga:"Enugu South",parent:"New Town Layout",fileNo:"MOH/NT/2025/001",oldFile:"LR-EN/2024/1101",created:"2025-04-10",regNo:"REG/EN/2025/1701",owner:null,instrument:null,pending:null,desc:"Affordable residential plot in emerging Obeagu corridor.",prevOwner:null,docs:[],surveyNo:"SVP/EN/NT/001/2025",topo:"Flat",soil:"Laterite",access:"New government road",utilities:"Municipal supply"},
      {id:"NT-002",type:"residential",size:"480",price:"3500000",status:"available",block:"B",lga:"Enugu South",parent:"New Town Layout",fileNo:"MOH/NT/2025/002",oldFile:"LR-EN/2024/1102",created:"2025-04-10",regNo:"REG/EN/2025/1702",owner:null,instrument:null,pending:null,desc:"Central plot near proposed shopping centre.",prevOwner:null,docs:[],surveyNo:"SVP/EN/NT/002/2025",topo:"Flat",soil:"Sandy laterite",access:"Internal road",utilities:"Connected"},
      {id:"NT-003",type:"commercial",size:"900",price:"8000000",status:"available",block:"C",lga:"Enugu South",parent:"New Town Layout",fileNo:"MOH/NT/2025/003",oldFile:"LR-EN/2024/1103",created:"2025-04-10",regNo:"REG/EN/2025/1703",owner:null,instrument:null,pending:null,desc:"Commercial plot on main road. Retail zone.",prevOwner:null,docs:[],surveyNo:"SVP/EN/NT/003/2025",topo:"Flat",soil:"Laterite",access:"Main road frontage",utilities:"Commercial power"},
    ]},
  {id:22,name:"New Era Eastern City Garden",loc:"Umulumgbe, Udi LGA, Enugu",img:IM.e2,shape:"new-era",mapFile:"/new-era-map.html",desc:"Massive 900+ plot smart estate at Amabor and Amuwenu Village. 845 residential, IN/42-IN/61 industrial, C/1-C/7 commercial, OS/1-OS/7 open spaces, UT/1-UT/2 utility, PS/1 petrol station.",total:920,avail:620,sold:300,
    plots:[
      {id:"NE-001",type:"residential",size:"500",price:"5500000",status:"available",block:"A",lga:"Enugu East",parent:"New Era Eastern Layout",fileNo:"MOH/NE/2025/001",oldFile:"LR-EN/2024/1201",created:"2025-04-15",regNo:"REG/EN/2025/1801",owner:null,instrument:null,pending:null,desc:"Residential plot in expansive Eastern City development.",prevOwner:null,docs:[],surveyNo:"SVP/EN/NE/001/2025",topo:"Flat",soil:"Sandy laterite",access:"Expressway access",utilities:"Estate supply"},
      {id:"NE-002",type:"commercial",size:"1000",price:"12000000",status:"available",block:"B",lga:"Enugu East",parent:"New Era Eastern Layout",fileNo:"MOH/NE/2025/002",oldFile:"LR-EN/2024/1202",created:"2025-04-15",regNo:"REG/EN/2025/1802",owner:null,instrument:null,pending:null,desc:"Commercial plot on expressway frontage.",prevOwner:null,docs:[],surveyNo:"SVP/EN/NE/002/2025",topo:"Flat",soil:"Laterite",access:"Expressway frontage",utilities:"Commercial power"},
      {id:"NE-003",type:"mixed",size:"700",price:"7500000",status:"sold",block:"C",lga:"Enugu East",parent:"New Era Eastern Layout",fileNo:"MOH/NE/2025/003",oldFile:"LR-EN/2024/1203",created:"2025-04-15",regNo:"REG/EN/2025/1803",owner:"Eastern Realty Ltd",instrument:"DA/EN/2025/0225",pending:null,desc:"Mixed-use plot in recreational zone.",prevOwner:"Government of Enugu State",docs:["Deed of Assignment","Survey Plan"],surveyNo:"SVP/EN/NE/003/2025",topo:"Flat",soil:"Sandy",access:"Estate road",utilities:"Connected"},
    ]},
  {id:23,name:"God's Light Estate",loc:"Ugwuaji, Enugu South",img:IM.e3,desc:"Faith-centered community in Ugwuaji with emphasis on peaceful living. Dedicated worship grounds, community garden, and children's educational centre.",total:75,avail:50,sold:25,
    plots:[
      {id:"GL-001",type:"residential",size:"450",price:"3000000",status:"available",block:"A",lga:"Enugu South",parent:"God's Light Layout",fileNo:"MOH/GL/2025/001",oldFile:"LR-EN/2024/1301",created:"2025-04-20",regNo:"REG/EN/2025/1901",owner:null,instrument:null,pending:null,desc:"Affordable plot in faith community.",prevOwner:null,docs:[],surveyNo:"SVP/EN/GL/001/2025",topo:"Flat",soil:"Laterite",access:"Estate road",utilities:"Estate supply"},
      {id:"GL-002",type:"residential",size:"450",price:"3000000",status:"available",block:"B",lga:"Enugu South",parent:"God's Light Layout",fileNo:"MOH/GL/2025/002",oldFile:"LR-EN/2024/1302",created:"2025-04-20",regNo:"REG/EN/2025/1902",owner:null,instrument:null,pending:null,desc:"Plot near community garden and worship centre.",prevOwner:null,docs:[],surveyNo:"SVP/EN/GL/002/2025",topo:"Flat",soil:"Sandy laterite",access:"Internal road",utilities:"Connected"},
      {id:"GL-003",type:"corner",size:"550",price:"4500000",status:"sold",block:"A",lga:"Enugu South",parent:"God's Light Layout",fileNo:"MOH/GL/2025/003",oldFile:"LR-EN/2024/1303",created:"2025-04-20",regNo:"REG/EN/2025/1903",owner:"Pastor David Onah",instrument:"ALC/EN/2025/0134",pending:null,desc:"Corner plot near estate entrance.",prevOwner:"Government of Enugu State",docs:["Allocation Paper","Survey Plan"],surveyNo:"SVP/EN/GL/003/2025",topo:"Flat",soil:"Laterite",access:"Dual access",utilities:"Connected"},
    ]},
  {id:24,name:"Unity Estate",loc:"Mile 2, Oji River, Enugu State",img:IM.e4,shape:"unity",mapFile:"/unity-map.html",surveyPlan:"/survey-unity-estate.pdf",desc:"Enugu's largest estate — 2,810 plots at Oji River. Features CR/1-CR/58 commercial/residential, C/1-C/15 commercial, OS/1-OS/9 open spaces, P/1-P/16 public, UT/1-UT/7 utility, CS/1-CS/2 corner shops, gate houses.",total:2810,avail:1850,sold:960,
    plots:[
      {id:"UE-001",type:"residential",size:"500",price:"3500000",status:"available",block:"A",lga:"Awgu",parent:"Unity Layout",fileNo:"MOH/UE/2025/001",oldFile:"LR-EN/2024/1401",created:"2025-05-01",regNo:"REG/EN/2025/2001",owner:null,instrument:null,pending:null,desc:"Community residential plot with shared facilities.",prevOwner:null,docs:[],surveyNo:"SVP/EN/UE/001/2025",topo:"Flat",soil:"Laterite",access:"Estate road",utilities:"Borehole + solar"},
      {id:"UE-002",type:"residential",size:"500",price:"3500000",status:"available",block:"B",lga:"Awgu",parent:"Unity Layout",fileNo:"MOH/UE/2025/002",oldFile:"LR-EN/2024/1402",created:"2025-05-01",regNo:"REG/EN/2025/2002",owner:null,instrument:null,pending:null,desc:"Interior plot near community hall.",prevOwner:null,docs:[],surveyNo:"SVP/EN/UE/002/2025",topo:"Flat",soil:"Sandy laterite",access:"Internal road",utilities:"Connected"},
      {id:"UE-003",type:"commercial",size:"700",price:"6000000",status:"available",block:"C",lga:"Awgu",parent:"Unity Layout",fileNo:"MOH/UE/2025/003",oldFile:"LR-EN/2024/1403",created:"2025-05-01",regNo:"REG/EN/2025/2003",owner:null,instrument:null,pending:null,desc:"Commercial plot near estate main gate.",prevOwner:null,docs:[],surveyNo:"SVP/EN/UE/003/2025",topo:"Flat",soil:"Laterite",access:"Main road frontage",utilities:"Commercial power"},
    ]},
  {id:25,name:"Tomorrow Is Here Estate",loc:"Akpuoga Nike, Enugu East",img:IM.e1,shape:"tomorrow",mapFile:"/tomorrow-map.html",desc:"81-plot mass housing estate (part of Satellite Estate) at Akpuoga Nike per official survey. Features RD1-RD2 road network with refuse dump allocation.",total:81,avail:52,sold:29,
    plots:[
      {id:"TIH-001",type:"residential",size:"500",price:"7500000",status:"available",block:"A",lga:"Enugu North",parent:"Tomorrow Is Here Layout",fileNo:"MOH/TIH/2025/001",oldFile:"LR-EN/2024/1501",created:"2025-05-05",regNo:"REG/EN/2025/2101",owner:null,instrument:null,pending:null,desc:"Eco-friendly residential plot with rainwater harvesting.",prevOwner:null,docs:[],surveyNo:"SVP/EN/TIH/001/2025",topo:"Gentle slope",soil:"Laterite",access:"Solar-lit road",utilities:"Solar + grid"},
      {id:"TIH-002",type:"residential",size:"500",price:"7500000",status:"available",block:"B",lga:"Enugu North",parent:"Tomorrow Is Here Layout",fileNo:"MOH/TIH/2025/002",oldFile:"LR-EN/2024/1502",created:"2025-05-05",regNo:"REG/EN/2025/2102",owner:null,instrument:null,pending:null,desc:"Green building standard plot in Block B.",prevOwner:null,docs:[],surveyNo:"SVP/EN/TIH/002/2025",topo:"Flat",soil:"Sandy laterite",access:"Estate road",utilities:"Full green utilities"},
      {id:"TIH-003",type:"corner",size:"650",price:"10000000",status:"sold",block:"A",lga:"Enugu North",parent:"Tomorrow Is Here Layout",fileNo:"MOH/TIH/2025/003",oldFile:"LR-EN/2024/1503",created:"2025-05-05",regNo:"REG/EN/2025/2103",owner:"GreenTech Homes Ltd",instrument:"C of O — CO/EN/2025/0112",pending:null,desc:"Premium corner plot with full smart infrastructure.",prevOwner:"Government of Enugu State",docs:["Certificate of Occupancy","Survey Plan"],surveyNo:"SVP/EN/TIH/003/2025",topo:"Gentle slope",soil:"Laterite",access:"Dual access",utilities:"Connected"},
    ]},
  {id:26,name:"Mass Housing Estate",loc:"Onuogba Nike, Enugu East",img:IM.e2,shape:"mass-housing",mapFile:"/mass-housing-map.html",surveyPlan:"/survey-mass-housing.pdf",desc:"Government mass housing at Onuogba Nike — 360 plots (R/1-R/323 + extras). Features C/1-C/2 commercial, OS/1-OS/2 open space, UT/1 utility, P/1 public. Designed by Ohamsnkem Associates.",total:360,avail:240,sold:120,
    plots:[
      {id:"MHE-001",type:"residential",size:"400",price:"2000000",status:"available",block:"A",lga:"Enugu East",parent:"Mass Housing Layout",fileNo:"MOH/MHE/2025/001",oldFile:"LR-EN/2024/1601",created:"2025-05-10",regNo:"REG/EN/2025/2201",owner:null,instrument:null,pending:null,desc:"Government-subsidised affordable housing plot.",prevOwner:null,docs:[],surveyNo:"SVP/EN/MHE/001/2025",topo:"Flat",soil:"Laterite",access:"Government road",utilities:"Municipal supply"},
      {id:"MHE-002",type:"residential",size:"400",price:"2000000",status:"available",block:"B",lga:"Enugu East",parent:"Mass Housing Layout",fileNo:"MOH/MHE/2025/002",oldFile:"LR-EN/2024/1602",created:"2025-05-10",regNo:"REG/EN/2025/2202",owner:null,instrument:null,pending:null,desc:"Affordable plot for civil servants.",prevOwner:null,docs:[],surveyNo:"SVP/EN/MHE/002/2025",topo:"Flat",soil:"Sandy laterite",access:"Internal road",utilities:"Connected"},
      {id:"MHE-003",type:"residential",size:"400",price:"2000000",status:"sold",block:"C",lga:"Enugu East",parent:"Mass Housing Layout",fileNo:"MOH/MHE/2025/003",oldFile:"LR-EN/2024/1603",created:"2025-05-10",regNo:"REG/EN/2025/2203",owner:"Mr. Peter Eze",instrument:"ALC/EN/2025/0156",pending:null,desc:"Allocated affordable housing plot.",prevOwner:"Government of Enugu State",docs:["Allocation Paper"],surveyNo:"SVP/EN/MHE/003/2025",topo:"Flat",soil:"Laterite",access:"Government road",utilities:"Connected"},
    ]},
  {id:27,name:"Innovation Estate",loc:"Emene Industrial Corridor, Enugu East",img:IM.e3,desc:"Tech-industrial estate in Emene for innovation-driven businesses. Warehouse-ready plots, startup incubator zone, and co-working space infrastructure.",total:90,avail:62,sold:28,
    plots:[
      {id:"IE-001",type:"commercial",size:"1000",price:"12000000",status:"available",block:"A",lga:"Enugu East",parent:"Innovation Estate Layout",fileNo:"MOH/IE/2025/001",oldFile:"LR-EN/2024/1701",created:"2025-05-15",regNo:"REG/EN/2025/2301",owner:null,instrument:null,pending:null,desc:"Tech-commercial plot with high-speed internet backbone.",prevOwner:null,docs:[],surveyNo:"SVP/EN/IE/001/2025",topo:"Flat",soil:"Compacted laterite",access:"Industrial road",utilities:"3-phase power + fibre"},
      {id:"IE-002",type:"commercial",size:"2000",price:"22000000",status:"available",block:"B",lga:"Enugu East",parent:"Innovation Estate Layout",fileNo:"MOH/IE/2025/002",oldFile:"LR-EN/2024/1702",created:"2025-05-15",regNo:"REG/EN/2025/2302",owner:null,instrument:null,pending:null,desc:"Large warehouse-ready plot for manufacturing.",prevOwner:null,docs:[],surveyNo:"SVP/EN/IE/002/2025",topo:"Flat",soil:"Gravel base",access:"Heavy vehicle road",utilities:"Industrial power"},
      {id:"IE-003",type:"mixed",size:"500",price:"8000000",status:"sold",block:"C",lga:"Enugu East",parent:"Innovation Estate Layout",fileNo:"MOH/IE/2025/003",oldFile:"LR-EN/2024/1703",created:"2025-05-15",regNo:"REG/EN/2025/2303",owner:"StartUp Hub Nigeria Ltd",instrument:"DA/EN/2025/0245",pending:null,desc:"Co-working space zone plot.",prevOwner:"Government of Enugu State",docs:["Deed of Assignment","Survey Plan"],surveyNo:"SVP/EN/IE/003/2025",topo:"Flat",soil:"Laterite",access:"Estate road",utilities:"Connected"},
    ]},
  {id:28,name:"Pitakwa Garden Estate",loc:"Nike Road, Enugu East",img:IM.e4,desc:"Garden-themed estate along Nike Road with lush landscaping, botanical gardens, ornamental trees, and nature walking trails throughout the development.",total:85,avail:56,sold:29,
    plots:[
      {id:"PG-001",type:"residential",size:"500",price:"5500000",status:"available",block:"A",lga:"Enugu East",parent:"Pitakwa Garden Layout",fileNo:"MOH/PG/2025/001",oldFile:"LR-EN/2024/1801",created:"2025-05-20",regNo:"REG/EN/2025/2401",owner:null,instrument:null,pending:null,desc:"Garden-view residential plot with nature trail access.",prevOwner:null,docs:[],surveyNo:"SVP/EN/PG/001/2025",topo:"Flat",soil:"Sandy laterite",access:"Landscaped road",utilities:"Estate supply"},
      {id:"PG-002",type:"residential",size:"500",price:"5500000",status:"available",block:"B",lga:"Enugu East",parent:"Pitakwa Garden Layout",fileNo:"MOH/PG/2025/002",oldFile:"LR-EN/2024/1802",created:"2025-05-20",regNo:"REG/EN/2025/2402",owner:null,instrument:null,pending:null,desc:"Plot adjacent to botanical garden section.",prevOwner:null,docs:[],surveyNo:"SVP/EN/PG/002/2025",topo:"Flat",soil:"Rich topsoil",access:"Internal road",utilities:"Connected"},
      {id:"PG-003",type:"corner",size:"650",price:"7500000",status:"sold",block:"A",lga:"Enugu East",parent:"Pitakwa Garden Layout",fileNo:"MOH/PG/2025/003",oldFile:"LR-EN/2024/1803",created:"2025-05-20",regNo:"REG/EN/2025/2403",owner:"Chief Mrs. Ngozi Okafor",instrument:"DA/EN/2025/0258",pending:null,desc:"Premium corner plot near estate entrance fountain.",prevOwner:"Government of Enugu State",docs:["Deed of Assignment","Survey Plan","Allocation Paper"],surveyNo:"SVP/EN/PG/003/2025",topo:"Flat",soil:"Sandy laterite",access:"Dual access",utilities:"Connected"},
    ]},
];

const PROPS=[
  {id:1,t:"Independence Layout Plot",loc:"Independence Layout, Enugu",ar:"600 m²",v:"₦25M",mv:"₦28.5M",g:"+8.2%",st:"vf",img:IM.p1,plotNo:"EN/42/2024",type:"Residential",year:"2020",zone:"Zone A",desc:"Prime residential plot.",details:{topo:"Flat",soil:"Laterite",access:"Dual access",water:"Municipal",elec:"33kV",fence:"Perimeter fence",survey:"Registered"}},
  {id:2,t:"New Haven Estate Land",loc:"New Haven, Enugu",ar:"900 m²",v:"₦32M",mv:"₦38.2M",g:"+15.1%",st:"vf",img:IM.p2,plotNo:"EN/15/2024",type:"Commercial",year:"2019",zone:"Zone A",desc:"Corner piece commercial.",details:{topo:"Gentle slope",soil:"Sandy laterite",access:"Triple access",water:"Municipal",elec:"33kV",fence:"Block fence",survey:"Registered"}},
  {id:3,t:"Trans-Ekulu Residential",loc:"Trans-Ekulu, Enugu",ar:"500 m²",v:"₦18M",mv:"₦20.4M",g:"+6.8%",st:"vf",img:IM.p3,plotNo:"EN/78/2023",type:"Residential",year:"2021",zone:"Zone B",desc:"Serene plot near Nike Lake.",details:{topo:"Flat",soil:"Laterite",access:"Single",water:"Borehole",elec:"11kV",fence:"Pillars",survey:"Registered"}},
  {id:4,t:"GRA Commercial",loc:"GRA, Enugu",ar:"800 m²",v:"₦7.5M",mv:"Pending",g:"Pending",st:"pd",img:IM.p4,plotNo:"EN/91/2024",type:"Mixed Use",year:"2024",zone:"Zone A",desc:"Newly allocated GRA.",details:{topo:"Flat",soil:"Sandy",access:"Dual",water:"Municipal",elec:"33kV",fence:"None",survey:"Pending"}},
];

// ─── NEW FEATURE DATA ───
const OWNERSHIP_HISTORY={
  "CC-004":[
    {date:"2024-03-15",event:"Layout Created",actor:"Project Management",instrument:"Layout Plan Approval",ref:"LP/EN/2024/003"},
    {date:"2024-06-20",event:"Allocation to Chief Emeka Nwosu",actor:"Hon. Commissioner",instrument:"Allocation Paper — ALC/EN/2024/0045",ref:"ALC/EN/2024/0045"},
    {date:"2024-09-10",event:"Survey Plan Registered",actor:"Surveyor General's Office",instrument:"Survey Plan — SVP/EN/CC/004/2024",ref:"SVP/EN/CC/004"},
    {date:"2025-01-15",event:"Deed of Assignment Executed",actor:"Chief Emeka Nwosu",instrument:"DA/EN/2025/0089",ref:"DA/EN/2025/0089"},
    {date:"2025-03-01",event:"Building Plan Approved",actor:"Town Planning Authority",instrument:"BPA/EN/2025/0034",ref:"BPA/EN/2025/0034"},
  ],
  "CC-005":[
    {date:"2024-03-15",event:"Layout Created",actor:"Project Management",instrument:"Layout Plan Approval",ref:"LP/EN/2024/003"},
    {date:"2024-05-01",event:"Allocation to Okafor Holdings Ltd",actor:"Hon. Commissioner",instrument:"Allocation Paper",ref:"ALC/EN/2024/0046"},
    {date:"2025-02-12",event:"Certificate of Occupancy Issued",actor:"Governor's Office",instrument:"CO/EN/2025/0023",ref:"CO/EN/2025/0023"},
  ],
};

const APPLICATIONS=[
  {id:"APP-2026-001",type:"Plot Verification",plot:"EN/42/2024",estate:"Independence Layout",date:"2026-01-15",status:"completed",steps:[{s:"Submitted",d:"2026-01-15",done:true},{s:"Documents Review",d:"2026-01-18",done:true},{s:"Field Inspection",d:"2026-01-22",done:true},{s:"Report Generated",d:"2026-01-25",done:true}]},
  {id:"APP-2026-002",type:"Ownership Transfer",plot:"CC-004",estate:"Centenary City",date:"2026-01-28",status:"in-review",steps:[{s:"Submitted",d:"2026-01-28",done:true},{s:"Seller Consent",d:"2026-01-30",done:true},{s:"Management Review",d:null,done:false},{s:"Transfer Complete",d:null,done:false}]},
  {id:"APP-2026-003",type:"Land Subdivision",plot:"NL-002",estate:"Nike Lake Estate",date:"2026-02-01",status:"submitted",steps:[{s:"Submitted",d:"2026-02-01",done:true},{s:"Survey Review",d:null,done:false},{s:"Re-Numbering",d:null,done:false},{s:"Approval",d:null,done:false}]},
  {id:"APP-2026-004",type:"Building Plan",plot:"MH-001",estate:"Milliken Hill",date:"2026-02-05",status:"in-review",steps:[{s:"Submitted",d:"2026-02-05",done:true},{s:"Technical Check",d:"2026-02-06",done:true},{s:"Committee Review",d:null,done:false},{s:"Approval",d:null,done:false}]},
];

const APPOINTMENTS=[
  {id:"APT-001",date:"2026-02-10",time:"10:00 AM",officer:"Mrs. Ngozi Obi",dept:"Land Registry",purpose:"Document Collection",status:"confirmed"},
  {id:"APT-002",date:"2026-02-14",time:"2:00 PM",officer:"Mr. Chidi Eze",dept:"Survey Division",purpose:"Survey Plan Review",status:"pending"},
];

const CHAT_MSGS=[
  {id:1,from:"system",msg:"Welcome to Project Sales & Developments Support. How can we help you today?",time:"9:00 AM"},
  {id:2,from:"user",msg:"I need help with my plot verification application APP-2026-001",time:"9:01 AM"},
  {id:3,from:"officer",name:"Mrs. Obi",msg:"Good morning! I can see your application. It has been completed successfully. Your verification certificate is ready for collection.",time:"9:03 AM"},
  {id:4,from:"user",msg:"Great! When can I come pick it up?",time:"9:04 AM"},
  {id:5,from:"officer",name:"Mrs. Obi",msg:"You can visit the Land Registry office on Monday-Friday, 9 AM - 4 PM. Please bring a valid ID. I'll book an appointment for you if you'd like.",time:"9:06 AM"},
];

const DOC_VAULT=[
  {id:1,name:"Allocation Paper — EN/42/2024",type:"Allocation Paper",date:"2020-03-15",plot:"EN/42/2024",size:"2.4 MB",ext:"pdf"},
  {id:2,name:"Survey Plan — Independence Layout",type:"Survey Plan",date:"2020-04-22",plot:"EN/42/2024",size:"5.1 MB",ext:"pdf"},
  {id:3,name:"Land Search Report — CC-001",type:"Search Report",date:"2026-02-07",plot:"CC-001",size:"1.8 MB",ext:"pdf"},
  {id:4,name:"Deed of Assignment — EN/15/2024",type:"Deed",date:"2019-11-10",plot:"EN/15/2024",size:"3.2 MB",ext:"pdf"},
  {id:5,name:"Building Plan — MH-001",type:"Building Plan",date:"2025-12-01",plot:"MH-001",size:"8.7 MB",ext:"pdf"},
  {id:6,name:"Payment Receipt — Premium Fee",type:"Receipt",date:"2026-01-20",plot:"EN/42/2024",size:"0.8 MB",ext:"pdf"},
  {id:7,name:"Ground Rent Receipt 2025",type:"Receipt",date:"2025-06-15",plot:"EN/42/2024",size:"0.6 MB",ext:"pdf"},
];

const RECEIPTS=[
  {id:"RCP-2026-001",type:"Search Fee",plot:"CC-001",amount:30000,date:"2026-02-07",status:"paid",ref:"LSR-2026-4521"},
  {id:"RCP-2026-002",type:"Premium Fee",plot:"EN/42/2024",amount:15000000,date:"2026-01-20",status:"paid",ref:"PMF-2026-0042"},
  {id:"RCP-2025-003",type:"Ground Rent",plot:"EN/42/2024",amount:25000,date:"2025-06-15",status:"paid",ref:"GRN-2025-0089"},
  {id:"RCP-2025-004",type:"Infrastructure Levy",plot:"EN/42/2024",amount:375000,date:"2025-03-10",status:"paid",ref:"INF-2025-0023"},
  {id:"RCP-2026-005",type:"Plot Verification",plot:"EN/42/2024",amount:300000,date:"2026-01-15",status:"paid",ref:"PVF-2026-0011"},
];

const AUDIT_LOG=[
  {id:1,time:"2026-02-07 14:32",action:"Land Search",user:"James Okafor",officer:"System",plot:"CC-001",detail:"Search fee paid. Report generated."},
  {id:2,time:"2026-02-07 11:15",action:"Interest Declared",user:"James Okafor",officer:"System",plot:"CC-001",detail:"Purchase interest registered."},
  {id:3,time:"2026-02-06 09:20",action:"Application Submitted",user:"James Okafor",officer:"System",plot:"MH-001",detail:"Building plan application submitted."},
  {id:4,time:"2026-02-05 16:45",action:"Payment Processed",user:"James Okafor",officer:"Auto-Pay",plot:"EN/42/2024",detail:"Ground rent payment of N25,000 confirmed."},
  {id:5,time:"2026-02-04 10:00",action:"Ownership Transfer Init",user:"Chief Emeka Nwosu",officer:"Mrs. Obi",plot:"CC-004",detail:"Transfer initiated to new buyer."},
  {id:6,time:"2026-02-03 14:22",action:"Subdivision Request",user:"James Okafor",officer:"System",plot:"NL-002",detail:"Land subdivision request for 2 portions."},
  {id:7,time:"2026-02-01 08:30",action:"Login",user:"James Okafor",officer:"System",plot:"—",detail:"User signed in via NIN."},
];

const NEWS=[
  {id:1,title:"New Estate Launch: Milliken Hill Phase 2",date:"2026-02-05",cat:"Announcement",summary:"Project Sales & Developments announces the opening of Milliken Hill Phase 2 with 30 new premium residential plots.",img:IM.e4},
  {id:2,title:"Ground Rent Payment Deadline Extended",date:"2026-02-01",cat:"Notice",summary:"The deadline for 2025 ground rent payments has been extended to March 31, 2026. Penalties waived for payments before deadline.",img:IM.d1},
  {id:3,title:"Digital Blockchain Registry Goes Live",date:"2026-01-20",cat:"Technology",summary:"All new land titles are now recorded on an immutable blockchain ledger for tamper-proof verification.",img:IM.d2},
  {id:4,title:"Governor Commissions Nike Lake Infrastructure",date:"2026-01-10",cat:"Projects",summary:"His Excellency commissioned the N2.5B road and drainage infrastructure at Nike Lake Estate.",img:IM.d3},
  {id:5,title:"Updated Building Regulation Guidelines",date:"2025-12-15",cat:"Regulation",summary:"New setback requirements and height restrictions now apply to all residential zones effective January 2026.",img:IM.aerial},
];

const CSS=`
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap");

:root{--g9:#111827;--g8:#166534;--g7:#16a34a;--g6:#22c55e;--g1:#dcfce7;--g0:#f0fdf4;--d6:#15803d;--d5:#16a34a;--d4:#22c55e;--d3:#4ade80;--d1:#dcfce7;--s9:#0f172a;--s8:#1e293b;--s7:#334155;--s6:#475569;--s5:#64748b;--s4:#94a3b8;--s3:#d1d5db;--s2:#e5e7eb;--s1:#f3f4f6;--s0:#f9fafb;--w:#fff;--r5:#ef4444;--r1:#fee2e2;--b5:#3b82f6;--b1:#dbeafe;--o5:#f97316;--o1:#ffedd5}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'DM Sans',sans-serif;background:var(--s0);color:var(--s8);-webkit-font-smoothing:antialiased;overflow-x:hidden}
/* Premium background float images */
@keyframes floatUp{0%{opacity:0;transform:translateY(30px) scale(.97)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(22,163,74,.06)}50%{box-shadow:0 0 40px rgba(22,163,74,.12)}}
@keyframes softPulse{0%,100%{opacity:.12}50%{opacity:.18}}
@keyframes heroFadeUp{0%{opacity:0;transform:translateY(40px)}100%{opacity:1;transform:translateY(0)}}
@keyframes heroScale{0%{opacity:0;transform:scale(.95)}100%{opacity:1;transform:scale(1)}}
@keyframes revealUp{0%{opacity:0;transform:translateY(30px)}100%{opacity:1;transform:translateY(0)}}
.db{position:relative;overflow:hidden}
.page-bg{position:fixed;top:0;left:260px;right:0;bottom:0;pointer-events:none;z-index:0;overflow:hidden}
.page-bg img,.page-bg>div{width:100%;height:100%;object-fit:cover;filter:saturate(.5) brightness(1.1);opacity:.08}
.page-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(249,250,251,.7) 0%,rgba(249,250,251,.5) 40%,rgba(249,250,251,.6) 70%,rgba(249,250,251,.8) 100%);pointer-events:none}
.mc{position:relative;z-index:1}
.mc::before{content:'';position:fixed;top:50%;left:50%;width:700px;height:700px;background:radial-gradient(ellipse,rgba(22,163,74,.02),transparent 70%);transform:translate(-50%,-50%);pointer-events:none;z-index:0}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(22,163,74,.35);border-radius:3px}::-webkit-scrollbar-track{background:rgba(0,0,0,.02)}
@keyframes fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(22,163,74,.25)}50%{box-shadow:0 0 0 10px rgba(22,163,74,0)}}
@keyframes bounceHover{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
.ai{animation:fu .5s ease-out forwards;opacity:0}.a1{animation-delay:.1s}.a2{animation-delay:.2s}.a3{animation-delay:.3s}.a4{animation-delay:.4s}
/* Auth */
/* ═══ AUTH PAGES — Premium Real Estate Showcase ═══ */
/* ═══ AUTH PAGES — PREMIUM REAL ESTATE SHOWCASE ═══ */
.auth-wrap{display:flex;min-height:100vh;background:#050d08}
.auth-left{position:relative;flex:1.3;overflow:hidden;min-height:100vh}
.auth-slides{position:absolute;inset:0}.auth-slide{position:absolute;inset:0;opacity:0;transition:opacity 1.2s ease}.auth-slide.active{opacity:1}
.auth-slide img,.auth-slide>div{width:100%;height:100%;object-fit:cover;animation:authKen 20s ease-in-out infinite alternate}
@keyframes authKen{0%{transform:scale(1)}100%{transform:scale(1.08)}}
.auth-left-ov{position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,8,3,.45) 0%,rgba(5,15,8,.3) 25%,rgba(2,8,3,.4) 55%,rgba(2,8,3,.94) 100%);z-index:1}
.auth-left-content{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;justify-content:space-between;padding:36px 40px}
.auth-logo{display:flex;align-items:center;gap:10px}
.auth-logo-icon{width:42px;height:42px;border-radius:11px;background:linear-gradient(135deg,#16a34a,#15803d);display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 4px 16px rgba(22,163,74,.3)}
.auth-logo-title{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:#fff}
.auth-logo-sub{font-size:9px;color:rgba(255,255,255,.45);letter-spacing:2.5px;text-transform:uppercase;font-weight:600}
.auth-main{flex:1;display:flex;flex-direction:column;justify-content:flex-end}
.auth-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:999px;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.25);margin-bottom:14px;width:fit-content}
.auth-badge svg{color:#fbbf24}.auth-badge span{color:#fbbf24;font-size:8px;letter-spacing:2.5px;font-weight:800;text-transform:uppercase}
.auth-headline{font-family:'Playfair Display',serif;font-size:36px;font-weight:800;color:#fff;line-height:1.08;margin-bottom:10px;letter-spacing:-.3px}
.auth-headline em{font-style:normal;background:linear-gradient(135deg,#4ade80,#22c55e);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.auth-desc{color:rgba(255,255,255,.6);font-size:12.5px;line-height:1.65;margin-bottom:22px;max-width:440px}
.auth-features{display:flex;gap:16px;margin-bottom:22px;flex-wrap:wrap}
.auth-feat{display:flex;align-items:center;gap:10px;padding:10px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;backdrop-filter:blur(8px);transition:all .3s;cursor:default}
.auth-feat:hover{background:rgba(255,255,255,.08);border-color:rgba(74,222,128,.2)}
.auth-feat-ic{width:34px;height:34px;border-radius:9px;background:rgba(74,222,128,.1);border:1px solid rgba(74,222,128,.15);display:flex;align-items:center;justify-content:center;color:#4ade80;flex-shrink:0}
.auth-feat strong{display:block;font-size:12px;font-weight:700;color:#fff}
.auth-feat span{font-size:10px;color:rgba(255,255,255,.4);line-height:1.2}
.auth-plans{margin-bottom:20px}
.auth-plans-title{font-size:10px;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:2px;font-weight:700;margin-bottom:10px}
.auth-plans-grid{display:flex;gap:8px}
.auth-plan-card{position:relative;width:110px;height:80px;border-radius:12px;overflow:hidden;border:1.5px solid rgba(255,255,255,.08);flex-shrink:0;cursor:pointer;transition:all .35s}
.auth-plan-card:hover{border-color:rgba(74,222,128,.35);transform:translateY(-3px) scale(1.03);box-shadow:0 12px 30px rgba(0,0,0,.3)}
.auth-plan-card img,.auth-plan-card>div:first-child{width:100%;height:100%;object-fit:cover}
.auth-plan-label{position:absolute;bottom:0;left:0;right:0;padding:4px 8px;background:linear-gradient(transparent,rgba(0,0,0,.8));font-size:8px;color:#fff;font-weight:700;letter-spacing:.5px;text-transform:uppercase;display:flex;align-items:center;gap:4px}
.auth-plan-label svg{width:10px;height:10px;color:#4ade80}
.auth-video-pill{display:inline-flex;align-items:center;gap:8px;padding:8px 18px;background:rgba(22,163,74,.12);border:1px solid rgba(22,163,74,.25);border-radius:999px;color:#4ade80;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .3s;margin-left:12px}
.auth-video-pill:hover{background:rgba(22,163,74,.2)}
.auth-video-pill .play-dot{width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#16a34a,#22c55e);display:flex;align-items:center;justify-content:center;color:#fff}
.auth-right{flex:1;display:flex;align-items:center;justify-content:center;padding:40px;position:relative;z-index:2;background:linear-gradient(135deg,#fafaf9 0%,#f5f5f0 100%)}
.auth-right::before{content:'';position:absolute;top:0;left:0;bottom:0;width:1px;background:linear-gradient(180deg,transparent,rgba(22,163,74,.15) 50%,transparent)}
.auth-form-card{width:100%;max-width:400px;background:#fff;border-radius:20px;padding:36px 32px;box-shadow:0 20px 60px rgba(0,0,0,.06),0 0 0 1px rgba(0,0,0,.03);position:relative;overflow:hidden}
.auth-form-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#16a34a,#4ade80,#16a34a)}
.auth-form-card::after{content:'';position:absolute;top:-40%;right:-40%;width:80%;height:80%;background:radial-gradient(ellipse,rgba(22,163,74,.02),transparent 60%);pointer-events:none}
@media(max-width:900px){.auth-wrap{flex-direction:column}.auth-left{min-height:420px;flex:none}.auth-left-content{padding:24px 28px}.auth-headline{font-size:26px}.auth-features{gap:8px}.auth-feat{padding:8px 12px}.auth-plans-grid{overflow-x:auto}.auth-right{padding:24px}.auth-form-card{padding:28px 22px;max-width:100%}}
@media(max-width:480px){.auth-left{min-height:360px}.auth-headline{font-size:22px}.auth-desc{font-size:11px;margin-bottom:14px}.auth-features{display:none}.auth-plans{display:none}.auth-logo{gap:8px}.auth-logo-icon{width:36px;height:36px}.auth-logo-title{font-size:14px}}
.ach{text-align:center;margin-bottom:28px}.ach h2{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--g8);margin-bottom:5px}.ach p{color:var(--s5);font-size:13px}
/* Form */
.fg{margin-bottom:16px}.fl{display:block;font-size:12px;font-weight:600;color:var(--s7);margin-bottom:6px;letter-spacing:.3px;text-transform:uppercase}
.fw{position:relative}.fw svg{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--s4);pointer-events:none}
.fi{width:100%;padding:12px 13px 12px 42px;border:1.5px solid var(--s2);border-radius:11px;font-size:14px;font-family:'DM Sans',sans-serif;color:var(--s8);background:var(--s1);transition:all .25s;outline:none}
.fi:focus{border-color:var(--g6);background:var(--w);box-shadow:0 0 0 4px rgba(13,110,93,.1)}.fi::placeholder{color:var(--s4)}.fip{padding-left:13px}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.bp{width:100%;padding:14px;background:linear-gradient(135deg,#16a34a,#15803d);color:var(--w);border:none;border-radius:12px;font-size:14.5px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .3s;letter-spacing:.3px;box-shadow:0 4px 16px rgba(22,163,74,.2)}
.bp:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(22,163,74,.3)}
.bg{background:linear-gradient(135deg,#166534,#16a34a);color:var(--w);box-shadow:0 4px 16px rgba(22,101,52,.2)}.bg:hover{box-shadow:0 10px 30px rgba(22,101,52,.3)}
.bpo{background:transparent;border:1.5px solid var(--s2);color:var(--s7)}.bpo:hover{border-color:var(--g6);color:var(--g7);transform:none;box-shadow:none}
.bsm{padding:9px 18px;border-radius:9px;font-size:13px;width:auto;display:inline-flex;align-items:center;gap:6px}
.asw{text-align:center;margin-top:20px;font-size:13px;color:var(--s5)}.asw button{color:var(--g7);font-weight:600;background:none;border:none;cursor:pointer;font-family:inherit;font-size:inherit;text-decoration:underline}
.adv{display:flex;align-items:center;gap:14px;margin:18px 0;color:var(--s4);font-size:11px;text-transform:uppercase;letter-spacing:1px}.adv::before,.adv::after{content:'';flex:1;height:1px;background:var(--s2)}
/* Layout */
.db{display:flex;min-height:100vh;background:var(--s0)}
.sb{width:260px;background:var(--w);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;transition:transform .3s ease;border-right:1px solid var(--s2)}.sb::before{content:'';position:absolute;top:0;left:0;bottom:0;width:3px;background:linear-gradient(180deg,#16a34a,#22c55e,#16a34a)}
.sbh{padding:22px 20px;border-bottom:1px solid var(--s2);display:flex;align-items:center;gap:12px;position:relative}.sbh::after{content:'';position:absolute;bottom:-1px;left:20px;right:20px;height:1px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.1),transparent)}
.sbht h3{font-family:'Playfair Display',serif;font-size:14px;font-weight:700;color:var(--g9)}.sbht p{font-size:9px;color:var(--g7);letter-spacing:2px;text-transform:uppercase;margin-top:2px}
.sbn{flex:1;padding:14px 10px;overflow-y:auto}.sbs{margin-bottom:18px}
.sbsl{font-size:9.5px;font-weight:700;color:var(--s4);letter-spacing:2.5px;text-transform:uppercase;padding:0 12px;margin-bottom:6px}
.ni{display:flex;align-items:center;gap:11px;padding:10px 13px;border-radius:9px;color:var(--s6);font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;border:none;background:none;width:100%;text-align:left;font-family:inherit}
.ni:hover{color:var(--g8);background:var(--g0)}.ni.act{color:var(--g8);background:linear-gradient(135deg,rgba(22,163,74,.08),rgba(34,197,94,.06));border:1px solid rgba(0,0,0,.1);box-shadow:0 2px 8px rgba(22,163,74,.08)}.ni.act .nc{color:var(--g7)}.nc{flex-shrink:0}
.sbf{padding:14px;border-top:1px solid var(--s2)}
.sbu{display:flex;align-items:center;gap:9px;padding:9px;border-radius:9px;cursor:pointer;transition:background .2s}.sbu:hover{background:var(--s1)}
.sba{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#16a34a,#15803d);display:flex;align-items:center;justify-content:center;color:var(--w);font-weight:700;font-size:13px;box-shadow:0 2px 8px rgba(22,163,74,.2)}
.mc{flex:1;margin-left:260px;min-height:100vh}
.tb{height:66px;background:rgba(255,255,255,.85);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid rgba(0,0,0,.06);display:flex;align-items:center;justify-content:space-between;padding:0 30px;position:sticky;top:0;z-index:50}
.tbl{display:flex;align-items:center;gap:14px}.tbl h2{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--g8)}
.tbr{display:flex;align-items:center;gap:10px}
.tbi{width:38px;height:38px;border-radius:9px;border:1px solid var(--s2);display:flex;align-items:center;justify-content:center;color:var(--s6);cursor:pointer;transition:all .2s;background:transparent;font-family:inherit}.tbi:hover{background:var(--s1)}
.hb{display:none;background:none;border:none;color:var(--s7);cursor:pointer;padding:3px}
@media(max-width:768px){.sb{transform:translateX(-100%)}.sb.open{transform:translateX(0)}.mc{margin-left:0!important}.hb{display:block}.sg{grid-template-columns:repeat(2,1fr)}.svg{grid-template-columns:repeat(2,1fr)}.pg{grid-template-columns:1fr}.pdsg{grid-template-columns:repeat(2,1fr)}.pdg{grid-template-columns:1fr}.fr{grid-template-columns:1fr}.plg{grid-template-columns:repeat(2,1fr)}.trust-bar{grid-template-columns:repeat(2,1fr)}.float-menu{right:16px;bottom:80px}.page-bg{left:0}}
.pc{padding:24px 28px;animation:fi .35s ease;position:relative;z-index:1;max-width:1120px;margin:0 auto}
/* Cards */
.sg{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.sc{background:rgba(255,255,255,.88);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:14px;padding:20px;border:1px solid rgba(255,255,255,.7);transition:all .3s;position:relative;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.03)}
.sc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--g6),var(--g7));opacity:0;transition:opacity .3s}.sc::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(22,163,74,.03) 50%,transparent 60%);background-size:200% 100%;pointer-events:none;opacity:0;transition:opacity .3s}.sc:hover{transform:translateY(-6px);box-shadow:0 14px 40px rgba(0,0,0,.06);border-color:rgba(22,163,74,.2)}.sc:hover::before{opacity:1}.sc:hover::after{opacity:1;animation:shimmer 2s ease infinite}
.sch{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.sci{width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center}
.sci.gn{background:var(--g1);color:var(--g7)}.sci.gd{background:var(--d1);color:var(--d6)}.sci.bl{background:var(--b1);color:var(--b5)}
.scl{font-size:12px;color:var(--s5);font-weight:500}.scv{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--g9);margin-bottom:3px}
.scc{font-size:11.5px;font-weight:600;display:flex;align-items:center;gap:4px;color:var(--g6)}
.xc{background:rgba(255,255,255,.9);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:14px;border:1px solid rgba(255,255,255,.6);overflow:hidden;margin-bottom:20px;position:relative;box-shadow:0 2px 16px rgba(0,0,0,.04)}.xc::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#166534,#16a34a,#22c55e);opacity:.5;pointer-events:none}
.xh{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid var(--s1)}.xh h3{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:var(--g8)}.xb{padding:22px}
.xbtn{padding:7px 14px;border-radius:8px;font-size:12px;font-weight:600;border:1px solid var(--s2);background:var(--w);color:var(--s6);cursor:pointer;transition:all .2s;font-family:inherit}.xbtn:hover{background:var(--s1)}.xbtn.gd{background:linear-gradient(135deg,#16a34a,#15803d);color:var(--w);border:none;box-shadow:0 2px 8px rgba(0,0,0,.1)}
/* Service grid */
.svg{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.svc{padding:22px;border-radius:14px;border:1px solid rgba(255,255,255,.6);background:rgba(255,255,255,.88);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);cursor:pointer;transition:all .3s;position:relative;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.03)}
.svc::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--g6),var(--g7));transform:scaleX(0);transition:transform .3s}.svc::before{content:'';position:absolute;top:0;right:0;width:80px;height:80px;background:radial-gradient(circle,rgba(22,163,74,.03),transparent 70%);pointer-events:none}.svc:hover{transform:translateY(-8px);box-shadow:0 16px 40px rgba(0,0,0,.06);border-color:rgba(22,163,74,.2)}.svc:hover::after{transform:scaleX(1)}
.svci{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;background:linear-gradient(135deg,rgba(22,163,74,.08),rgba(34,197,94,.06));color:var(--g7);border:1px solid rgba(22,163,74,.1)}
.svc h4{font-size:14px;font-weight:600;color:var(--s8);margin-bottom:5px}.svc p{font-size:12px;color:var(--s5);line-height:1.6}
/* Portfolio */
.pg{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.prc{border-radius:16px;border:1px solid rgba(255,255,255,.6);background:rgba(255,255,255,.9);backdrop-filter:blur(10px);overflow:hidden;transition:all .35s;cursor:pointer;position:relative;box-shadow:0 2px 12px rgba(0,0,0,.03)}.prc:hover{transform:translateY(-10px);box-shadow:0 20px 50px rgba(0,0,0,.08);border-color:rgba(22,163,74,.2)}
.pri{height:180px;position:relative;overflow:hidden}.pri img{width:100%;height:100%;object-fit:cover;transition:transform .4s}.prc:hover .pri img{transform:scale(1.1)}
.pril{position:absolute;top:10px;right:10px;padding:4px 10px;border-radius:7px;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;backdrop-filter:blur(8px)}
.pril.vf{background:linear-gradient(135deg,#16a34a,#15803d);color:var(--w)}.pril.pd{background:rgba(255,255,255,.2);color:var(--w)}
.prb{padding:16px}.prb h4{font-size:14px;font-weight:600;color:var(--s8);margin-bottom:3px}
.prb .loc{font-size:12px;color:var(--s5);display:flex;align-items:center;gap:4px;margin-bottom:12px}
.prs{display:flex;justify-content:space-between;padding-top:12px;border-top:1px solid var(--s1)}.prsi{text-align:center}.prsi .v{font-size:13px;font-weight:700;color:var(--g7)}.prsi .l{font-size:10px;color:var(--s4);text-transform:uppercase;letter-spacing:.5px;margin-top:2px}
/* Property detail */
.pdb{display:inline-flex;align-items:center;gap:7px;padding:7px 14px;border-radius:9px;border:1px solid var(--s2);background:var(--w);color:var(--s6);cursor:pointer;font-size:12.5px;font-weight:600;margin-bottom:18px;font-family:inherit;transition:all .2s}.pdb:hover{background:var(--s1)}
.pdh{height:280px;border-radius:14px;overflow:hidden;position:relative;margin-bottom:22px}.pdh img{width:100%;height:100%;object-fit:cover}
.pdo{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.75) 0%,rgba(0,0,0,.2) 40%,transparent 65%);display:flex;align-items:flex-end;padding:28px 30px}
.pdo h1{font-family:'Playfair Display',serif;font-size:24px;color:var(--w);font-weight:700}.pdo p{color:rgba(255,255,255,.7);font-size:13px;margin-top:3px;display:flex;align-items:center;gap:5px}
.pdsg{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px}
.pds{background:var(--w);border-radius:13px;padding:18px;border:1px solid var(--s2);text-align:center}.pds .val{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--g8)}.pds .lbl{font-size:10.5px;color:var(--s5);text-transform:uppercase;letter-spacing:.5px;margin-top:3px}
.pdg{display:grid;grid-template-columns:2fr 1fr;gap:18px}
.pdr{display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--s1)}.pdr:last-child{border:none}.pdr .k{font-size:13px;color:var(--s5)}.pdr .v{font-size:13px;font-weight:600;color:var(--s8)}
.pdm{padding:28px;background:linear-gradient(135deg,#166534 0%,#15803d 100%);border-radius:18px;text-align:center;border:1px solid rgba(22,163,74,.2);position:relative;overflow:hidden}.pdm::before{content:'';position:absolute;top:-50%;right:-30%;width:80%;height:200%;background:radial-gradient(ellipse,rgba(255,255,255,.08),transparent 60%);pointer-events:none}
.pdm .lbl{color:rgba(255,255,255,.6);font-size:10.5px;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:7px}.pdm .val{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:var(--w)}.pdm .sub{color:rgba(255,255,255,.5);font-size:11px;margin-top:5px}
.pdm .adm{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:6px;color:var(--w);font-size:10px;font-weight:600;margin-top:10px}
/* Estates/Sales */
.ec{border-radius:16px;border:1px solid rgba(255,255,255,.6);background:rgba(255,255,255,.9);backdrop-filter:blur(10px);overflow:hidden;transition:all .35s;cursor:pointer;position:relative;box-shadow:0 2px 12px rgba(0,0,0,.03)}.ec::after{content:'';position:absolute;inset:0;border-radius:16px;box-shadow:inset 0 -2px 0 rgba(22,163,74,.12);pointer-events:none;opacity:0;transition:opacity .3s}.ec:hover{transform:translateY(-10px);box-shadow:0 20px 50px rgba(0,0,0,.08);border-color:rgba(22,163,74,.2)}.ec:hover::after{opacity:1}
.ei{height:220px;overflow:hidden;position:relative}.ei::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.6) 0%,rgba(0,0,0,.1) 40%,transparent 70%);pointer-events:none}.ei img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}.ec:hover .ei img{transform:scale(1.1)}
.eb{padding:18px}.eb h4{font-size:16px;font-weight:600;color:var(--s8);margin-bottom:4px}.eb .loc{font-size:12px;color:var(--s5);display:flex;align-items:center;gap:4px;margin-bottom:12px}
.eb p{font-size:12.5px;color:var(--s6);line-height:1.6;margin-bottom:14px}
.ebs{display:flex;gap:12px}.ebt{padding:6px 14px;border-radius:8px;font-size:12px;font-weight:600;text-align:center}
.ebt.av{background:var(--g1);color:var(--g7)}.ebt.sd{background:var(--d1);color:var(--d6)}.ebt.tt{background:var(--s1);color:var(--s6)}
/* Plot grid */
.plg{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px}
.plt{padding:14px;border-radius:10px;border:1.5px solid var(--s2);text-align:center;cursor:pointer;transition:all .25s;position:relative}
.plt:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.06)}
.plt.av{border-color:var(--g6);background:var(--g0)}.plt.av:hover{background:var(--g1)}
.plt.sd{border-color:var(--s3);background:var(--s1);opacity:.7;cursor:default}.plt.sd:hover{transform:none;box-shadow:none}
.plt.cm{border-color:var(--b5);background:var(--b1)}.plt.mx{border-color:var(--o5);background:var(--o1)}
.plt .pid{font-size:12px;font-weight:700;color:var(--s8);margin-bottom:4px}.plt .pty{font-size:10px;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px}
.plt .psz{font-size:11px;color:var(--s5)}.plt .ppr{font-size:12px;font-weight:700;margin-top:5px}
.plt.av .pty{color:var(--g7)}.plt.sd .pty{color:var(--s5)}.plt.cm .pty{color:var(--b5)}.plt.mx .pty{color:var(--o5)}
.plt.av .ppr{color:var(--g7)}.plt.sd .ppr{color:var(--s5)}.plt.cm .ppr{color:var(--b5)}.plt.mx .ppr{color:var(--o5)}
/* Search fee modal */
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;animation:fi .2s ease}
.modal{background:rgba(255,255,255,.95);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);border-radius:22px;width:100%;max-width:540px;max-height:90vh;overflow-y:auto;box-shadow:0 30px 80px rgba(0,0,0,.15),0 0 0 1px rgba(255,255,255,.5);animation:fu .3s ease}
.modal-h{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid rgba(22,163,74,.1)}
.modal-h h3{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:var(--g8)}.modal-h button{background:none;border:none;color:var(--s5);cursor:pointer;padding:4px}
.modal-b{padding:24px}
/* Plot info section */
.sec-hd{font-family:'Playfair Display',serif;font-size:14px;font-weight:700;color:var(--g8);padding:10px 0 8px;margin-top:12px;border-bottom:2px solid var(--g6);display:flex;align-items:center;gap:8px}
.sec-hd:first-of-type{margin-top:0}
.infr{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--s1);font-size:13px}.infr:last-child{border:none}.infr .ik{color:var(--s5)}.infr .iv{font-weight:600;color:var(--s8);text-align:right;max-width:60%}
/* Fee breakdown */
.fer{display:flex;justify-content:space-between;padding:11px 0;border-bottom:1px solid var(--s1)}.fer:last-child{border:none}
.fer .fl2{font-size:13px;color:var(--s7)}.fer .fa{font-size:13px;font-weight:600;color:var(--s8)}
.fer.tot{border-top:2px solid var(--s2);border-bottom:none;margin-top:6px;padding-top:14px}
.fer.tot .fl2{font-weight:700;color:var(--g8);font-size:14px}.fer.tot .fa{font-weight:700;color:var(--g7);font-size:17px;font-family:'Playfair Display',serif}
/* Tables */
.dt{width:100%;border-collapse:collapse}.dt th{text-align:left;padding:10px 14px;font-size:11px;font-weight:700;color:var(--s5);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--s2);background:var(--s1)}
.dt td{padding:12px 14px;font-size:13px;color:var(--s7);border-bottom:1px solid var(--s1)}.dt tr:hover td{background:rgba(13,110,93,.04)}
.stb{display:inline-flex;padding:3px 9px;border-radius:18px;font-size:10.5px;font-weight:600}.stb.cp{background:var(--g1);color:var(--g7)}.stb.pn{background:var(--d1);color:var(--d6)}.stb.pr{background:var(--b1);color:var(--b5)}
/* FAQ */
.fqi{border:1px solid var(--s2);border-radius:12px;margin-bottom:10px;overflow:hidden;transition:all .2s}.fqi:hover{border-color:rgba(22,163,74,.2)}
.fqq{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;cursor:pointer;background:var(--w);font-size:13.5px;font-weight:600;color:var(--s8);border:none;width:100%;text-align:left;font-family:inherit}.fqq:hover{background:var(--s1)}
.fqa{padding:0 18px 14px;font-size:13px;color:var(--s6);line-height:1.7}
/* Upload/Misc */
.kgu{border:2px dashed var(--s3);border-radius:13px;padding:32px;text-align:center;cursor:pointer;transition:all .3s;background:var(--s1)}.kgu:hover{border-color:var(--g6);background:var(--g0)}.kgu p{font-size:12.5px;color:var(--s5)}.kgu span{color:var(--g7);font-weight:600}
.efta{width:100%;padding:12px;border:1.5px solid var(--s2);border-radius:11px;font-size:13.5px;font-family:'DM Sans',sans-serif;color:var(--s8);resize:vertical;min-height:110px;outline:none;transition:all .25s;background:var(--s1)}.efta:focus{border-color:var(--g6);background:var(--w);box-shadow:0 0 0 3px rgba(26,122,58,.1)}
.tabr{display:flex;gap:4px;padding:4px;background:var(--s1);border-radius:9px;margin-bottom:18px;flex-wrap:wrap}
.tabb{padding:8px 16px;border-radius:7px;font-size:12.5px;font-weight:500;color:var(--s5);cursor:pointer;transition:all .2s;border:none;background:transparent;font-family:inherit}.tabb.act{background:linear-gradient(135deg,#166534,var(--g7));color:var(--w);font-weight:600;box-shadow:0 4px 16px rgba(22,101,52,.15);border:none}
.nd{position:absolute;top:5px;right:5px;width:7px;height:7px;background:var(--r5);border-radius:50%;border:2px solid var(--w)}
.tst{position:fixed;bottom:24px;right:24px;padding:16px 24px;background:linear-gradient(135deg,#166534,#16a34a);color:var(--w);border-radius:14px;font-size:13.5px;font-weight:500;box-shadow:0 16px 48px rgba(22,101,52,.25),0 0 0 1px rgba(255,255,255,.08);animation:fu .3s ease;z-index:1000;display:flex;align-items:center;gap:10px;backdrop-filter:blur(10px)}.tst .ga{color:var(--g1);font-size:16px}
/* Stepper */
.stepper{display:flex;align-items:center;gap:0;margin-bottom:28px;padding:0 16px}
.step{display:flex;flex-direction:column;align-items:center;flex:1;position:relative;z-index:2}
.step-n{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;border:2px solid var(--s3);background:var(--w);color:var(--s4);transition:all .3s;margin-bottom:7px}
.step.act .step-n{border-color:transparent;background:linear-gradient(135deg,#166534,#16a34a);color:var(--w);box-shadow:0 4px 12px rgba(22,101,52,.2)}.step.dn .step-n{border-color:#22c55e;background:rgba(22,163,74,.08);color:#16a34a}
.step-l{font-size:10px;font-weight:600;color:var(--s4);text-transform:uppercase;letter-spacing:.5px;text-align:center;max-width:90px}.step.act .step-l,.step.dn .step-l{color:var(--g7)}
.step-ln{flex:1;height:2px;background:var(--s2);margin:0 -8px;margin-top:-26px;z-index:1}.step-ln.dn{background:var(--g6)}
/* Upload cards */
.upc{border:1.5px solid var(--s2);border-radius:13px;padding:18px;background:var(--w);transition:all .25s;margin-bottom:12px;cursor:pointer}.upc:hover{border-color:rgba(22,163,74,.2);box-shadow:0 6px 20px rgba(0,0,0,.04)}
.upc.up{border-color:var(--g6);background:var(--g0)}
.upc-t{display:flex;align-items:center;justify-content:space-between}.upc-l{display:flex;align-items:center;gap:12px}
.upc-i{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.upc-i.gn{background:var(--g1);color:var(--g7)}.upc-i.gd{background:var(--d1);color:var(--d6)}.upc-i.bl{background:var(--b1);color:var(--b5)}.upc-i.or{background:var(--o1);color:var(--o5)}
.upc h4{font-size:13px;font-weight:600;color:var(--s8)}.upc p{font-size:11.5px;color:var(--s5);margin-top:1px}
.us{font-size:10.5px;font-weight:600;padding:3px 9px;border-radius:6px}.us.pend{background:var(--d1);color:var(--d6)}.us.done{background:var(--g1);color:var(--g7)}
/* Profile */
.phc{background:linear-gradient(135deg,#166534,#15803d);border-radius:18px;padding:32px;margin-bottom:22px;display:flex;align-items:center;gap:24px;position:relative;overflow:hidden}
.phc::before{content:'';position:absolute;top:-50%;right:-10%;width:50%;height:200%;background:radial-gradient(ellipse,rgba(255,255,255,.08),transparent 70%)}.phc::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent)}
.pav{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#22c55e,#16a34a);display:flex;align-items:center;justify-content:center;color:var(--w);font-family:'Playfair Display',serif;font-size:24px;font-weight:700;flex-shrink:0;border:3px solid rgba(255,255,255,.25);box-shadow:0 4px 16px rgba(22,163,74,.3)}
.pin h2{color:var(--w);font-family:'Playfair Display',serif;font-size:20px;margin-bottom:3px}.pin p{color:rgba(255,255,255,.55);font-size:12.5px}
.vbd{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:6px;color:var(--w);font-size:10px;font-weight:600;margin-top:7px}
.sts{margin-bottom:24px}.sts h4{font-size:14px;font-weight:600;color:var(--s8);margin-bottom:14px;padding-bottom:9px;border-bottom:1px solid var(--s2)}
.sti{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--s1)}.sti:last-child{border:none}
.stl h5{font-size:13.5px;font-weight:500;color:var(--s7)}.stl p{font-size:11.5px;color:var(--s4);margin-top:1px}
.tg{width:42px;height:23px;border-radius:12px;background:var(--s3);position:relative;cursor:pointer;transition:background .3s;border:none}.tg.on{background:var(--g6)}
.tg::after{content:'';position:absolute;top:2px;left:2px;width:19px;height:19px;border-radius:50%;background:var(--w);transition:transform .3s;box-shadow:0 1px 3px rgba(0,0,0,.15)}.tg.on::after{transform:translateX(19px)}
/* Projects — Flagship Showcase */
.pj-wrap{position:relative}
.pj-hero2{position:relative;border-radius:20px;overflow:hidden;margin-bottom:28px;min-height:380px;background:#050d08}
.pj-hero2 img{width:100%;height:380px;object-fit:cover;opacity:.3;filter:brightness(.9)}
.pj-hero2-ov{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:36px 40px;background:linear-gradient(180deg,rgba(5,13,8,.1) 0%,rgba(5,13,8,.5) 30%,rgba(5,13,8,.92) 70%,rgba(5,13,8,.98) 100%)}
.pj-badge{display:inline-flex;align-items:center;gap:7px;padding:6px 16px;border-radius:20px;font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase;width:fit-content;margin-bottom:16px;border:1.5px solid rgba(245,158,11,.4)}
.pj-badge.gold{background:linear-gradient(135deg,rgba(245,158,11,.2),rgba(217,119,6,.15));color:#fbbf24;box-shadow:0 4px 20px rgba(245,158,11,.2)}
.pj-badge.green{background:rgba(34,197,94,.12);color:#4ade80;border-color:rgba(34,197,94,.3)}
.pj-badge.blue{background:rgba(59,130,246,.12);color:#93c5fd;border-color:rgba(59,130,246,.3)}
.pj-hero2 h1{font-family:'Playfair Display',serif;font-size:36px;color:#fff;font-weight:800;line-height:1.1;margin-bottom:8px;letter-spacing:-.5px}
.pj-hero2 .pj-sub{color:rgba(255,255,255,.6);font-size:14.5px;line-height:1.65;max-width:620px;margin-bottom:20px}
.pj-kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;border-radius:14px;overflow:hidden;background:rgba(255,255,255,.06)}
.pj-kpi-item{padding:16px 18px;text-align:center;background:rgba(255,255,255,.03);backdrop-filter:blur(12px)}
.pj-kpi-item strong{display:block;font-family:'Playfair Display',serif;font-size:26px;font-weight:800;background:linear-gradient(135deg,#4ade80,#22c55e);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.pj-kpi-item span{font-size:9px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-top:2px;display:block}
.pj-nav{display:flex;gap:0;background:#fff;border-radius:14px;border:1.5px solid var(--s2);overflow:hidden;margin-bottom:24px;position:relative}
.pj-nav::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--s1)}
.pj-nav-btn{flex:1;padding:14px 12px;font-size:12px;font-weight:700;color:var(--s5);background:transparent;border:none;cursor:pointer;transition:all .25s;position:relative;display:flex;align-items:center;justify-content:center;gap:6px}
.pj-nav-btn:hover{color:var(--s8);background:var(--s1)}
.pj-nav-btn.act{color:var(--g8);background:var(--g0)}
.pj-nav-btn.act::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:2.5px;background:linear-gradient(90deg,var(--g6),var(--g4));border-radius:2px 2px 0 0;z-index:1}
.pj-nav-count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;border-radius:9px;font-size:9px;font-weight:800;padding:0 5px}
.pj-nav-btn.act .pj-nav-count{background:var(--g6);color:#fff}
.pj-nav-btn:not(.act) .pj-nav-count{background:var(--s2);color:var(--s5)}
.pj-est-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px}
.pj-est{border-radius:16px;overflow:hidden;border:1.5px solid var(--s2);background:#fff;transition:all .35s cubic-bezier(.4,0,.2,1);cursor:pointer;position:relative}
.pj-est:hover{border-color:var(--g4);box-shadow:0 20px 50px rgba(22,101,52,.1);transform:translateY(-6px)}
.pj-est-img{height:180px;overflow:hidden;position:relative}
.pj-est-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s cubic-bezier(.4,0,.2,1)}.pj-est:hover .pj-est-img img{transform:scale(1.1)}
.pj-est-img-ov{position:absolute;inset:0;background:linear-gradient(transparent 40%,rgba(0,0,0,.6));display:flex;align-items:flex-end;padding:14px 16px}
.pj-est-img-ov h3{font-family:'Playfair Display',serif;color:#fff;font-size:17px;font-weight:700;text-shadow:0 2px 8px rgba(0,0,0,.4)}
.pj-est-tags{position:absolute;top:12px;left:12px;display:flex;gap:5px;flex-wrap:wrap}
.pj-est-tag{padding:3px 9px;border-radius:6px;font-size:9px;font-weight:700;letter-spacing:.5px;backdrop-filter:blur(10px)}
.pj-est-tag.land{background:rgba(22,163,74,.85);color:#fff}
.pj-est-tag.house{background:rgba(59,130,246,.85);color:#fff}
.pj-est-tag.dev{background:rgba(217,119,6,.85);color:#fff}
.pj-est-tag.soon{background:rgba(124,58,237,.85);color:#fff}
.pj-est-bd{padding:16px 18px}
.pj-est-loc{display:flex;align-items:center;gap:4px;font-size:11.5px;color:var(--s5);margin-bottom:8px;font-weight:600}
.pj-est-desc{font-size:12.5px;color:var(--s5);line-height:1.6;margin-bottom:14px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.pj-est-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.pj-est-stat{text-align:center;padding:8px 4px;border-radius:8px;background:var(--s1)}
.pj-est-stat strong{display:block;font-size:16px;font-weight:800;color:var(--g8)}
.pj-est-stat span{font-size:8.5px;color:var(--s4);text-transform:uppercase;letter-spacing:.5px;font-weight:700}
.pj-est-cta{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:10px;border:none;background:linear-gradient(135deg,var(--g7),var(--g8));color:#fff;border-radius:10px;font-size:12px;font-weight:700;cursor:pointer;margin-top:12px;transition:all .2s;letter-spacing:.3px}.pj-est-cta:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(22,101,52,.3)}
.pj-prj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:20px}
.pj-prj{border-radius:16px;overflow:hidden;border:1.5px solid var(--s2);background:#fff;transition:all .35s}
.pj-prj:hover{border-color:var(--g4);box-shadow:0 16px 40px rgba(0,0,0,.06);transform:translateY(-4px)}
.pj-prj-img{height:190px;overflow:hidden;position:relative}.pj-prj-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.pj-prj:hover .pj-prj-img img{transform:scale(1.08)}
.pj-prj-tags{position:absolute;top:12px;left:12px;display:flex;gap:5px}
.pj-prj-bd{padding:18px 20px}
.pj-prj-bd h4{font-size:15px;font-weight:700;color:var(--s9);margin-bottom:6px}
.pj-prj-bd>p{font-size:12.5px;color:var(--s5);line-height:1.65;margin-bottom:12px}
.pj-pbar{height:6px;border-radius:3px;background:var(--s1);overflow:hidden;margin-bottom:6px}
.pj-pfill{height:100%;border-radius:3px;transition:width .6s cubic-bezier(.4,0,.2,1)}
.pj-miles2{display:flex;gap:6px;margin-top:12px;flex-wrap:wrap}
.pj-ml{display:flex;align-items:center;gap:4px;font-size:10px;padding:4px 9px;border-radius:5px;font-weight:600}
.pj-ml.dn{background:var(--g1);color:var(--g7)}.pj-ml.pn{background:var(--s1);color:var(--s4)}
.pj-prj-meta{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap}
.pj-prj-mi{display:flex;align-items:center;gap:4px;font-size:10.5px;color:var(--s5);font-weight:600;background:var(--s1);padding:4px 10px;border-radius:6px}
.pj-hous-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}
.pj-hous{border-radius:16px;overflow:hidden;border:1.5px solid var(--s2);background:#fff;transition:all .35s}
.pj-hous:hover{border-color:rgba(59,130,246,.4);box-shadow:0 16px 40px rgba(59,130,246,.08);transform:translateY(-5px)}
.pj-hous-img{height:200px;overflow:hidden;position:relative}.pj-hous-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.pj-hous:hover .pj-hous-img img{transform:scale(1.06)}
.pj-hous-bd{padding:18px 20px}
.pj-hous-bd h4{font-size:15px;font-weight:700;color:var(--s9);margin-bottom:3px}
.pj-hous-type{font-size:10.5px;color:rgba(59,130,246,.8);font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.pj-hous-bd p{font-size:12.5px;color:var(--s5);line-height:1.6;margin-bottom:14px}
.pj-hous-specs{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:14px}
.pj-hous-spec{text-align:center;padding:8px;border-radius:8px;background:rgba(59,130,246,.06);border:1px solid rgba(59,130,246,.12)}
.pj-hous-spec strong{display:block;font-size:14px;font-weight:800;color:#2563eb}
.pj-hous-spec span{font-size:8px;color:var(--s4);text-transform:uppercase;letter-spacing:.5px;font-weight:700}
.pj-hous-price{font-family:'Playfair Display',serif;font-size:22px;font-weight:800;color:var(--g8)}
.pj-soon-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}
.pj-soon{border-radius:16px;overflow:hidden;border:1.5px dashed rgba(124,58,237,.3);background:linear-gradient(135deg,rgba(124,58,237,.03),rgba(99,102,241,.02));transition:all .35s;position:relative}
.pj-soon:hover{border-color:rgba(124,58,237,.5);box-shadow:0 16px 40px rgba(124,58,237,.08);transform:translateY(-4px)}
.pj-soon-img{height:180px;overflow:hidden;position:relative;background:linear-gradient(135deg,#1e1b4b,#312e81)}.pj-soon-img img{width:100%;height:100%;object-fit:cover;opacity:.5;transition:transform .5s}.pj-soon:hover .pj-soon-img img{opacity:.65;transform:scale(1.06)}
.pj-soon-label{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:8px 20px;border-radius:20px;background:rgba(124,58,237,.8);color:#fff;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;backdrop-filter:blur(8px);white-space:nowrap}
.pj-soon-bd{padding:18px 20px}
.pj-soon-bd h4{font-size:15px;font-weight:700;color:var(--s8);margin-bottom:5px}
.pj-soon-bd p{font-size:12.5px;color:var(--s5);line-height:1.6;margin-bottom:12px}
.pj-invest{margin-top:28px;background:linear-gradient(135deg,#050d08,#0a1f0d,#132b16);border-radius:18px;padding:32px 36px;color:#fff;position:relative;overflow:hidden}
.pj-invest::before{content:'';position:absolute;top:-80px;right:-80px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(34,197,94,.1),transparent 70%)}
.pj-invest::after{content:'';position:absolute;bottom:-60px;left:-60px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(34,197,94,.06),transparent 70%)}
.pj-invest-inner{position:relative;z-index:1}
.pj-invest-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:20px}
.pj-invest-item{text-align:center}
.pj-invest-item strong{display:block;font-family:'Playfair Display',serif;font-size:30px;font-weight:800;background:linear-gradient(135deg,#4ade80,#86efac);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.pj-invest-item em{font-style:normal;display:block;font-size:10.5px;font-weight:700;color:rgba(255,255,255,.65);margin-top:3px}
.pj-invest-item span{font-size:9.5px;color:rgba(255,255,255,.35);margin-top:2px;display:block}
.pj-empty{text-align:center;padding:60px 20px;color:var(--s4)}
.pj-empty svg{opacity:.3;margin-bottom:10px}
@media(max-width:768px){.pj-hero2 h1{font-size:26px}.pj-kpi{grid-template-columns:repeat(2,1fr)}.pj-hero2-ov{padding:24px 20px}.pj-est-grid,.pj-prj-grid,.pj-hous-grid,.pj-soon-grid{grid-template-columns:1fr}.pj-nav{flex-wrap:wrap}.pj-nav-btn{min-width:50%}.pj-invest-grid{grid-template-columns:repeat(2,1fr);gap:16px}.pj-hero2{min-height:320px}.pj-hero2 img{height:320px}}
/* Receipt print */
.rct{background:var(--w);border:2px solid var(--g8);border-radius:0;padding:36px 32px;position:relative}
.rct-hd{text-align:center;margin-bottom:24px;padding-bottom:20px;border-bottom:3px double var(--g8)}
.rct-hd h2{font-family:'Playfair Display',serif;font-size:20px;color:var(--g8);margin-top:10px}.rct-hd p{font-size:12px;color:var(--s6);margin-top:3px}
.rct-ref{text-align:center;font-size:13px;color:var(--s5);margin-bottom:20px}
.rct-ref strong{color:var(--g8);font-size:15px}
.rct-sec{margin-bottom:18px}.rct-sec h4{font-family:'Playfair Display',serif;font-size:13px;color:var(--g8);padding:6px 10px;background:var(--g1);border-left:3px solid var(--g6);margin-bottom:10px}
.rct-row{display:flex;justify-content:space-between;padding:6px 10px;font-size:12.5px}.rct-row:nth-child(odd){background:var(--s1)}.rct-row .rl{color:var(--s6)}.rct-row .rv{font-weight:600;color:var(--s8)}
.rct-stamp{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:28px;padding-top:20px;border-top:2px solid var(--s2)}
.stamp-box{width:100px;height:100px;border:3px solid var(--g6);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--g6);transform:rotate(-15deg)}
.stamp-box .st1{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px}.stamp-box .st2{font-size:11px;font-weight:800;font-family:'Playfair Display',serif}.stamp-box .st3{font-size:7px;text-transform:uppercase;letter-spacing:.5px}
.sig-box{text-align:center}.sig-box .sig{font-family:'Playfair Display',serif;font-size:20px;font-style:italic;color:var(--g7);margin-bottom:4px}.sig-box .sig-l{font-size:10px;color:var(--s5)}
.rct-wm{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-family:'Playfair Display',serif;font-size:60px;color:rgba(22,163,74,.05);pointer-events:none;white-space:nowrap}
/* Search status indicators */
.plt .ss{font-size:8px;margin-top:4px;padding:2px 6px;border-radius:4px;display:inline-block;font-weight:700;letter-spacing:.3px}
.plt .ss.ap{background:var(--g1);color:var(--g7)}.plt .ss.pn2{background:var(--d1);color:var(--d6)}.plt .ss.un{background:var(--s1);color:var(--s4)}
/* Enhanced modal */
.modal-lg{max-width:680px}
.modal-section{margin-bottom:20px;border:1px solid var(--s2);border-radius:12px;overflow:hidden}
.modal-section-hd{display:flex;align-items:center;gap:8px;padding:12px 16px;background:linear-gradient(135deg,var(--g8),#15803d);color:var(--w);font-size:12.5px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
.modal-section-hd svg{color:rgba(255,255,255,.7)}
.modal-section-bd{padding:0}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:0}
.info-cell{padding:11px 16px;border-bottom:1px solid var(--s1);border-right:1px solid var(--s1)}.info-cell:nth-child(even){border-right:none}
.info-cell .ik2{font-size:10px;color:var(--s4);text-transform:uppercase;letter-spacing:.5px;font-weight:600;margin-bottom:3px}.info-cell .iv2{font-size:13px;font-weight:600;color:var(--s8)}
.info-full{grid-column:1/-1;border-right:none}
.doc-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:14px 16px}
.doc-item{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;font-size:12px;font-weight:500}
.doc-item.has{background:var(--g0);color:var(--g7);border:1px solid rgba(26,122,58,.15)}.doc-item.no{background:var(--s1);color:var(--s4);border:1px solid var(--s2)}
/* Survey mini-plan */
.survey-mini{background:var(--s1);border-radius:10px;padding:16px;margin:14px 16px;text-align:center;border:1.5px dashed var(--s3)}
.survey-mini h5{font-size:11px;color:var(--s5);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.survey-mini .plot-viz{width:100%;max-width:180px;aspect-ratio:4/3;margin:0 auto;border:2px solid var(--g6);border-radius:4px;display:flex;align-items:center;justify-content:center;background:var(--g0);position:relative}
.survey-mini .plot-viz .dim{position:absolute;font-size:9px;font-weight:700;color:var(--g7)}
.survey-mini .plot-viz .dim.top{top:-16px;left:50%;transform:translateX(-50%)}.survey-mini .plot-viz .dim.side{right:-40px;top:50%;transform:translateY(-50%) rotate(90deg)}
.survey-mini .svn{font-size:11px;color:var(--g7);font-weight:600;margin-top:10px}
/* Approval badge */
.appr-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:linear-gradient(135deg,var(--g7),var(--g8));color:var(--w);border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
/* Pending animation */
@keyframes spin{to{transform:rotate(360deg)}}
.spinner{width:48px;height:48px;border:3px solid var(--s2);border-top:3px solid var(--d4);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 16px}
/* Outline button */
.bpo{background:transparent;border:1.5px solid var(--g6);color:var(--g7)}.bpo:hover{background:var(--g0)}
/* QR Code */
.qr-box{width:100px;height:100px;background:var(--w);border:2px solid var(--s2);border-radius:8px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.qr-box .qr-inner{display:grid;grid-template-columns:repeat(7,1fr);gap:1px;width:70px;height:70px}
.qr-box .qr-cell{border-radius:1px}
/* Timeline tracker */
.timeline{position:relative;padding-left:28px}.timeline::before{content:'';position:absolute;left:10px;top:0;bottom:0;width:2px;background:var(--s2)}
.tl-item{position:relative;padding-bottom:24px}.tl-item:last-child{padding-bottom:0}
.tl-dot{position:absolute;left:-22px;top:2px;width:16px;height:16px;border-radius:50%;border:2px solid var(--s3);background:var(--w);z-index:1}
.tl-dot.done{background:var(--g6);border-color:var(--g6)}.tl-dot.active{border-color:var(--g6);background:var(--g0);box-shadow:0 0 0 4px rgba(22,163,74,.12)}
.tl-content{padding-left:8px}
.tl-content h5{font-size:13px;font-weight:600;color:var(--s8);margin-bottom:2px}
.tl-content p{font-size:11.5px;color:var(--s5)}.tl-content .tl-date{font-size:10.5px;color:var(--s4);margin-top:2px}
/* Chat */
.chat-box{display:flex;flex-direction:column;height:400px;background:var(--s0);border-radius:10px;overflow:hidden;border:1px solid var(--s2)}
.chat-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}
.chat-msg{max-width:80%;padding:10px 14px;border-radius:12px;font-size:13px;line-height:1.5}
.chat-msg.usr{align-self:flex-end;background:var(--g7);color:var(--w);border-bottom-right-radius:4px}
.chat-msg.ofc{align-self:flex-start;background:var(--w);color:var(--s8);border:1px solid var(--s2);border-bottom-left-radius:4px}
.chat-msg.sys{align-self:center;background:var(--d1);color:var(--d6);font-size:12px;border-radius:8px;text-align:center}
.chat-msg .cm-name{font-size:10px;font-weight:700;color:var(--g7);margin-bottom:3px}.chat-msg .cm-time{font-size:9.5px;opacity:.6;margin-top:3px}
.chat-input{display:flex;gap:8px;padding:12px;background:var(--w);border-top:1px solid var(--s2)}
.chat-input input{flex:1;padding:10px 14px;border:1.5px solid var(--s2);border-radius:10px;font-size:13px;font-family:inherit;outline:none}.chat-input input:focus{border-color:var(--g6)}
.chat-input button{padding:10px 18px;border:none;background:linear-gradient(135deg,var(--g7),var(--g8));color:var(--w);border-radius:10px;cursor:pointer;font-family:inherit;font-weight:600;font-size:13px}
/* Document vault */
.dv-card{display:flex;align-items:center;gap:14px;padding:14px 18px;border-bottom:1px solid var(--s1);transition:background .15s;cursor:pointer}.dv-card:hover{background:var(--s0)}
.dv-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.dv-icon.pdf{background:linear-gradient(135deg,#fee2e2,#fecaca);color:#dc2626}.dv-icon.doc{background:linear-gradient(135deg,var(--b1),#bfdbfe);color:var(--b5)}
.dv-info{flex:1;min-width:0}.dv-info h5{font-size:13px;font-weight:600;color:var(--s8);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dv-info p{font-size:11px;color:var(--s4);margin-top:2px}.dv-actions{display:flex;gap:6px}
/* Admin chart bars */
.admin-bar{height:100%;min-height:4px;border-radius:3px;transition:height .5s ease}
/* Audit log */
.al-row{display:flex;gap:14px;padding:12px 18px;border-bottom:1px solid var(--s1);font-size:12.5px;align-items:center}.al-row:hover{background:var(--s0)}
/* News card */
.news-card{display:flex;gap:18px;padding:18px;border-bottom:1px solid var(--s1);transition:background .15s;cursor:pointer}.news-card:hover{background:var(--s0)}
.news-img{width:120px;height:80px;border-radius:10px;overflow:hidden;flex-shrink:0}.news-img img{width:100%;height:100%;object-fit:cover}
.news-body h4{font-size:14px;font-weight:600;color:var(--s8);margin-bottom:4px;line-height:1.4}.news-body p{font-size:12px;color:var(--s5);line-height:1.6}
.news-meta{display:flex;align-items:center;gap:10px;margin-top:8px;font-size:11px;color:var(--s4)}
.news-cat{padding:3px 8px;border-radius:5px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.news-cat.ann{background:var(--g1);color:var(--g7)}.news-cat.not{background:var(--d1);color:var(--d6)}.news-cat.tec{background:var(--b1);color:var(--b5)}.news-cat.prj{background:var(--o1);color:var(--o5)}.news-cat.reg{background:var(--r1);color:var(--r5)}
/* Satellite map overlay */
.trust-bar{background:linear-gradient(135deg,#166534,#15803d);border-radius:14px;padding:26px;margin-bottom:24px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px;position:relative;overflow:hidden}.trust-bar::before{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.05) 50%,transparent 60%);background-size:250% 100%;animation:shimmer 6s ease infinite;pointer-events:none}.trust-item{text-align:center;position:relative;z-index:1}.trust-val{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--w);margin-bottom:3px}.trust-lbl{font-size:11px;color:rgba(255,255,255,.65)}
@keyframes scrollBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}

.sat-map{background:linear-gradient(135deg,#0f2419,#166534);position:relative;border-radius:14px;overflow:hidden;background:#0f2419;min-height:300px;box-shadow:inset 0 0 60px rgba(0,0,0,.3)}
.sat-map .sat-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(10,31,18,.3),rgba(13,51,24,.15));pointer-events:none;z-index:1}
.sat-map .sat-grid{position:relative;z-index:2;display:grid;gap:4px;padding:16px}
.sat-map .sat-plot{border:1.5px solid rgba(26,122,58,.6);background:rgba(26,122,58,.15);border-radius:4px;padding:8px;text-align:center;cursor:pointer;transition:all .2s;backdrop-filter:blur(2px)}
.sat-map .sat-plot:hover{background:rgba(26,122,58,.35);border-color:var(--d4);transform:scale(1.03)}
.sat-map .sat-plot.sold-p{border-color:rgba(239,68,68,.4);background:rgba(239,68,68,.1)}
.sat-map .sat-plot .sp-id{font-size:11px;font-weight:700;color:var(--w)}.sat-map .sat-plot .sp-sz{font-size:9px;color:rgba(255,255,255,.6)}
/* Ownership chain */
.chain{position:relative;padding-left:24px}.chain::before{content:'';position:absolute;left:8px;top:8px;bottom:8px;width:2px;background:linear-gradient(180deg,var(--g6),var(--d4))}
.chain-node{position:relative;padding:12px 0 20px 16px}.chain-node::before{content:'';position:absolute;left:-20px;top:14px;width:12px;height:12px;border-radius:50%;background:var(--g6);border:2px solid var(--w);box-shadow:0 0 0 2px var(--g6);z-index:1}
.chain-node:last-child{padding-bottom:0}
.chain-node .cn-date{font-size:10px;color:var(--d6);font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.chain-node .cn-event{font-size:13px;font-weight:600;color:var(--s8);margin-top:3px}
.chain-node .cn-actor{font-size:11.5px;color:var(--s5);margin-top:2px}
.chain-node .cn-ref{font-size:10px;color:var(--s4);font-family:monospace;margin-top:4px;padding:3px 8px;background:var(--s1);border-radius:4px;display:inline-block}
/* ═══ ROYAL ESTATES DESIGN SYSTEM ═══ */
/* ── Hero Section — Full viewport height, matching Royal Estates exactly ── */
.hero-section{position:relative;height:420px;border-radius:20px;overflow:hidden;margin-bottom:24px;box-shadow:0 16px 50px rgba(0,0,0,.12)}
.hero-section img,.hero-section>div:first-child{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero-slide-wrap{position:absolute;inset:0}
.hero-slide{position:absolute;inset:0;opacity:0;transition:opacity .6s cubic-bezier(.4,0,.2,1);overflow:hidden;will-change:opacity}
.hero-slide.active{opacity:1}
.hero-slide img{width:100%;height:100%;object-fit:cover;animation:kenburns 18s ease-in-out infinite alternate;will-change:transform}
@keyframes kenburns{0%{transform:scale(1) translate(0,0)}100%{transform:scale(1.08) translate(-1%,-.6%)}}
.hero-slide:nth-child(2) img{animation-delay:-3s;animation-direction:alternate-reverse}
.hero-slide:nth-child(3) img{animation-delay:-6s}
.hero-slide:nth-child(4) img{animation-delay:-9s;animation-direction:alternate-reverse}
.hero-slide:nth-child(5) img{animation-delay:-2s}
.hero-slide:nth-child(6) img{animation-delay:-7s;animation-direction:alternate-reverse}
.hero-slide:nth-child(7) img{animation-delay:-4s}
.hero-slide:nth-child(8) img{animation-delay:-8s;animation-direction:alternate-reverse}
.hero-gloss{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(105deg,transparent 38%,rgba(255,255,255,.04) 43%,rgba(255,255,255,.09) 50%,rgba(255,255,255,.04) 57%,transparent 62%);background-size:200% 100%;animation:glossSweep 5s ease-in-out infinite}
@keyframes glossSweep{0%,100%{background-position:200% 0}50%{background-position:-200% 0}}
.hero-shimmer{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(74,222,128,.5),transparent);z-index:3;animation:shimmerMove 3s ease-in-out infinite}
@keyframes shimmerMove{0%,100%{opacity:.3}50%{opacity:1}}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(165deg,rgba(3,10,5,.92) 0%,rgba(5,13,8,.45) 35%,rgba(10,31,13,.6) 65%,rgba(3,10,5,.94) 100%);display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:36px 40px;z-index:2}
.hero-overlay h1{font-family:'Playfair Display',serif;font-size:42px;font-weight:800;color:#fff;margin-bottom:6px;letter-spacing:-.5px;line-height:1.05;text-shadow:0 2px 30px rgba(0,0,0,.3)}
.hero-overlay h1 em{font-style:normal;background:linear-gradient(135deg,#4ade80,#22c55e,#86efac);-webkit-background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 18px rgba(74,222,128,.15))}
.hero-overlay p{color:rgba(255,255,255,.7);font-size:14px;max-width:480px;line-height:1.65;margin-bottom:18px}
.hero-overlay .hero-sub{color:var(--d4);font-size:13px;max-width:500px;margin-bottom:22px;line-height:1.6}
.hero-dots{display:flex;gap:8px;margin-top:16px}
.hero-dot{width:32px;height:4px;border-radius:2px;background:rgba(255,255,255,.2);cursor:pointer;transition:all .3s}
.hero-dot.active{background:#4ade80;width:48px;box-shadow:0 0 12px rgba(74,222,128,.5)}
.pill-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 18px;border-radius:999px;background:linear-gradient(135deg,rgba(245,158,11,.15),rgba(217,119,6,.1));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(245,158,11,.3);margin-bottom:20px}
.pill-badge svg{color:#fbbf24}.pill-badge span{color:#fbbf24;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;font-weight:700}
.btn-gold{padding:12px 28px;background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;border:none;border-radius:11px;font-size:13px;font-weight:700;cursor:pointer;transition:all .35s;letter-spacing:.3px;box-shadow:0 6px 24px rgba(22,163,74,.3);display:inline-flex;align-items:center;gap:8px}
.btn-gold:hover{transform:translateY(-2px);box-shadow:0 10px 36px rgba(22,163,74,.4)}
.btn-gold-outline{padding:12px 28px;background:rgba(255,255,255,.06);color:#fff;border:1.5px solid rgba(255,255,255,.25);border-radius:11px;font-size:13px;font-weight:700;cursor:pointer;transition:all .35s;display:inline-flex;align-items:center;gap:8px;backdrop-filter:blur(8px)}
.btn-gold-outline:hover{border-color:#4ade80;color:#4ade80;transform:translateY(-2px);background:rgba(255,255,255,.1)}
/* ═══ VIDEO REEL — Infinite Scroll Showcase ═══ */
.video-reel{position:relative;overflow:hidden;padding:32px 0;margin-bottom:24px;border-radius:16px}
.video-reel-title{text-align:center;margin-bottom:28px;padding:0 24px}
.video-reel-title h2{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--g8);margin-bottom:4px}
.video-reel-title p{color:var(--s5);font-size:13px}
.video-reel-title .reel-line{width:60px;height:3px;background:linear-gradient(90deg,#16a34a,#4ade80);border-radius:2px;margin:12px auto 0}
.reel-track{display:flex;gap:16px;animation:reelScroll 45s linear infinite;width:max-content;padding:4px 0}
.reel-track:hover{animation-play-state:paused}
@keyframes reelScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.reel-card{position:relative;width:300px;height:200px;border-radius:14px;overflow:hidden;flex-shrink:0;box-shadow:0 6px 24px rgba(0,0,0,.08);cursor:pointer;transition:transform .4s,box-shadow .4s}
.reel-card:hover{transform:scale(1.04) translateY(-4px);box-shadow:0 16px 50px rgba(0,0,0,.16)}
.reel-card img{width:100%;height:100%;object-fit:cover;transition:transform .6s}
.reel-card:hover img{transform:scale(1.08)}
.reel-card-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.75) 100%);opacity:0;transition:opacity .4s;display:flex;align-items:flex-end;padding:14px 16px}
.reel-card:hover .reel-card-overlay{opacity:1}
.reel-card-overlay span{color:#fff;font-size:12.5px;font-weight:600;letter-spacing:.3px}
.reel-gloss{position:absolute;inset:0;background:linear-gradient(135deg,transparent 40%,rgba(255,255,255,.1) 50%,transparent 60%);pointer-events:none}
.reel-fade-l,.reel-fade-r{position:absolute;top:0;bottom:0;width:80px;z-index:2;pointer-events:none}
.reel-fade-l{left:0;background:linear-gradient(90deg,var(--s0) 0%,transparent 100%)}
.reel-fade-r{right:0;background:linear-gradient(-90deg,var(--s0) 0%,transparent 100%)}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap}
.scroll-ind{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);z-index:3;animation:scrollBounce 2s ease-in-out infinite}
.scroll-mouse{width:24px;height:40px;border:2px solid rgba(255,255,255,.3);border-radius:12px;display:flex;align-items:flex-start;justify-content:center;padding:6px}
.scroll-dot{width:5px;height:10px;background:rgba(255,255,255,.5);border-radius:3px}
/* ═══ PROJECTS & DEVELOPMENTS — SPOTLIGHT BANNER ═══ */
.psd-spotlight{position:relative;border-radius:20px;overflow:hidden;margin-bottom:24px;cursor:pointer;box-shadow:0 16px 50px rgba(0,0,0,.14);transition:all .4s cubic-bezier(.4,0,.2,1)}
.psd-spotlight:hover{transform:translateY(-3px);box-shadow:0 24px 70px rgba(0,0,0,.2)}
.psd-spot-bg{position:absolute;inset:0}.psd-spot-bg img,.psd-spot-bg>div{width:100%;height:100%;object-fit:cover;transition:transform 6s ease}
.psd-spotlight:hover .psd-spot-bg img,.psd-spotlight:hover .psd-spot-bg>div{transform:scale(1.04)}
.psd-spot-overlay{position:absolute;inset:0;background:linear-gradient(110deg,rgba(2,8,3,.94) 0%,rgba(5,20,10,.85) 40%,rgba(10,31,13,.55) 70%,rgba(2,8,3,.35) 100%);z-index:1}
.psd-spot-glow{position:absolute;top:-40%;right:-15%;width:60%;height:180%;background:radial-gradient(ellipse,rgba(74,222,128,.05) 0%,transparent 60%);z-index:1;pointer-events:none}
.psd-spot-content{position:relative;z-index:2;display:flex;align-items:center;gap:36px;padding:36px 40px}
.psd-spot-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:999px;background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.3);margin-bottom:12px}
.psd-spot-badge svg{color:#fbbf24}.psd-spot-badge span{color:#fbbf24;font-size:9px;letter-spacing:2.5px;font-weight:800}
.psd-spot-left{flex:1;min-width:0;cursor:pointer}
.psd-spot-left h2{font-family:'Playfair Display',serif;font-size:34px;font-weight:800;color:#fff;line-height:1.1;margin-bottom:10px;letter-spacing:-.3px}
.psd-spot-left h2 em{font-style:normal;background:linear-gradient(135deg,#4ade80,#22c55e);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.psd-spot-left p{color:rgba(255,255,255,.65);font-size:13px;line-height:1.65;margin-bottom:20px;max-width:400px}
.psd-spot-stats{display:inline-flex;gap:0;align-items:center;margin-bottom:22px;padding:12px 18px;background:rgba(255,255,255,.05);border-radius:12px;border:1px solid rgba(255,255,255,.08)}
.psd-spot-stat{text-align:center;padding:0 16px}
.psd-spot-num{display:block;font-family:'Playfair Display',serif;font-size:20px;font-weight:800;color:#fff}
.psd-spot-label{font-size:9px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:1.5px;font-weight:600;margin-top:1px}
.psd-spot-divider{width:1px;height:32px;background:rgba(255,255,255,.1);flex-shrink:0}
.psd-spot-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;border:none;border-radius:11px;font-size:13px;font-weight:700;cursor:pointer;transition:all .3s;box-shadow:0 6px 24px rgba(22,163,74,.3)}
.psd-spot-btn:hover{transform:translateY(-2px);box-shadow:0 10px 36px rgba(22,163,74,.4)}
.psd-spot-right{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:10px;width:280px;height:220px;flex-shrink:0}
.psd-spot-card{position:relative;border-radius:14px;overflow:hidden;border:1.5px solid rgba(255,255,255,.1);transition:all .3s}
.psd-spot-card:hover{border-color:rgba(74,222,128,.3);transform:scale(1.03)}
.psd-spot-card img,.psd-spot-card>div:first-child{width:100%;height:100%;object-fit:cover}
.psd-spot-card-tag{position:absolute;bottom:8px;left:8px;padding:3px 10px;background:rgba(0,0,0,.55);backdrop-filter:blur(6px);border-radius:6px;color:#fff;font-size:9px;font-weight:700;letter-spacing:.8px;text-transform:uppercase}
.psd-spot-c1{grid-row:1/3}
.psd-spot-c2{grid-column:2;grid-row:1}
.psd-spot-c3{grid-column:2;grid-row:2}
@media(max-width:900px){.psd-spot-content{flex-direction:column;padding:28px 24px}.psd-spot-right{width:100%;height:160px;grid-template-columns:repeat(3,1fr);grid-template-rows:1fr}.psd-spot-c1{grid-row:1}.psd-spot-left h2{font-size:28px}}
/* ═══ VIDEO & IMAGE SHOWCASE ═══ */
.vid-showcase{display:grid;grid-template-columns:1.6fr 1fr;gap:12px;margin-bottom:24px;border-radius:18px;overflow:hidden;background:#111;min-height:320px}
.vid-show-main{position:relative;overflow:hidden;min-height:320px}
.vid-slide{position:absolute;inset:0;opacity:0;transition:opacity .6s ease;z-index:0}
.vid-slide.active{opacity:1;z-index:1}
.vid-slide video,.vid-slide img,.vid-slide>div{width:100%;height:100%;object-fit:cover}
.vid-slide.active img{animation:vidKen 2s ease forwards}
@keyframes vidKen{0%{transform:scale(1)}100%{transform:scale(1.08)}}
.vid-show-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.55) 100%);pointer-events:none;z-index:2}
.vid-show-badge{position:absolute;top:16px;left:16px;display:flex;align-items:center;gap:8px;padding:6px 14px;background:rgba(0,0,0,.5);backdrop-filter:blur(8px);border-radius:999px;z-index:3}
.vid-show-live{width:8px;height:8px;border-radius:50%;background:#ef4444;box-shadow:0 0 8px #ef4444;animation:livePulse 1.5s ease infinite}
@keyframes livePulse{0%,100%{opacity:1}50%{opacity:.4}}
.vid-show-badge span{font-size:10px;color:#fff;font-weight:700;letter-spacing:1px;text-transform:uppercase}
.vid-show-title{position:absolute;bottom:20px;left:20px;z-index:3}
.vid-show-title h3{font-family:'Playfair Display',serif;font-size:22px;font-weight:800;color:#fff;margin-bottom:2px}
.vid-show-title p{font-size:11px;color:rgba(255,255,255,.6)}
.vid-show-dots{position:absolute;bottom:20px;right:20px;display:flex;gap:5px;z-index:3}
.vid-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.3);transition:all .3s}
.vid-dot.active{background:#4ade80;width:18px;border-radius:3px;box-shadow:0 0 8px rgba(74,222,128,.4)}
.vid-show-thumbs{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(3,1fr);gap:6px;padding:6px}
.vid-show-thumb{position:relative;border-radius:12px;overflow:hidden;cursor:pointer;transition:all .3s}
.vid-show-thumb:hover{transform:scale(1.03);box-shadow:0 8px 24px rgba(0,0,0,.3)}
.vid-show-thumb img,.vid-show-thumb>div:first-child{width:100%;height:100%;object-fit:cover}
.vid-thumb-label{position:absolute;bottom:0;left:0;right:0;padding:6px 10px;background:linear-gradient(transparent,rgba(0,0,0,.75));font-size:9px;color:#fff;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
@media(max-width:900px){.vid-showcase{grid-template-columns:1fr;min-height:auto}.vid-show-main{min-height:240px}.vid-show-thumbs{grid-template-columns:repeat(3,1fr);grid-template-rows:1fr 1fr;height:180px}}
.hero-cta-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px}
.dash-bottom-grid{display:grid;grid-template-columns:2fr 1fr;gap:18px}
.hero-cta-card{background:#fff;border-radius:14px;padding:20px 16px;border:1.5px solid var(--s2);cursor:pointer;transition:all .3s;text-align:center}
.hero-cta-card:hover{border-color:var(--g4);box-shadow:0 12px 30px rgba(22,101,52,.08);transform:translateY(-4px)}
.hero-cta-card .cta-ic{width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px}
.hero-cta-card h5{font-size:12.5px;font-weight:700;color:var(--s8);margin-bottom:2px}
.hero-cta-card span{font-size:10.5px;color:var(--s4)}
/* ── Module Cards — Three Pillars exactly like Royal Estates screenshot ── */
.mod-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-bottom:28px}
.mod-card{border-radius:20px;overflow:hidden;cursor:pointer;transition:all .4s ease;position:relative}
.mod-card:hover{transform:translateY(-10px)}
.mod-card-img{position:relative;height:340px;border-radius:20px;overflow:hidden}
.mod-card-img img,.mod-card-img>div:first-child{width:100%;height:100%;object-fit:cover;transition:transform .7s ease}
.mod-card:hover .mod-card-img img,.mod-card:hover .mod-card-img>div:first-child{transform:scale(1.1)}
.mod-card-grad{position:absolute;inset:0;opacity:1;transition:opacity .4s;z-index:1}
.mod-card:hover .mod-card-grad{opacity:.85}
.mod-card-icon{position:absolute;top:20px;left:20px;width:52px;height:52px;background:rgba(255,255,255,.18);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:14px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.35);z-index:2;transition:all .3s}
.mod-card:hover .mod-card-icon{background:rgba(255,255,255,.28);transform:scale(1.05)}
.mod-card-icon svg{color:var(--w)}
.mod-card-bottom{position:absolute;bottom:0;left:0;right:0;padding:26px 28px;background:linear-gradient(transparent 0%,rgba(0,0,0,.75) 100%);z-index:2}
.mod-card-bottom h3{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:var(--w);margin-bottom:4px}
.mod-card-bottom span{color:var(--d4);font-size:12px;font-weight:500;letter-spacing:.3px}
/* ── Floating Contact — Crown icon with notification badge ── */
.float-btn{position:fixed;bottom:28px;right:28px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#166534,#16a34a);color:var(--w);border:none;cursor:pointer;z-index:150;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 32px rgba(22,101,52,.35);transition:all .3s}
.float-btn:hover{transform:scale(1.08);box-shadow:0 12px 40px rgba(22,101,52,.45)}
.float-btn .notif{position:absolute;top:-2px;right:-2px;width:20px;height:20px;background:#ef4444;border-radius:50%;border:2.5px solid var(--w);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--w)}
.float-menu{position:fixed;bottom:100px;right:28px;background:rgba(255,255,255,.98);backdrop-filter:blur(20px);border-radius:18px;padding:8px;width:240px;box-shadow:0 20px 60px rgba(0,0,0,.12),0 0 0 1px rgba(22,163,74,.1);z-index:150;animation:fu .25s ease}
.float-item{display:flex;align-items:center;gap:11px;padding:12px 16px;border-radius:12px;cursor:pointer;transition:all .2s;border:none;background:none;width:100%;font-family:inherit;font-size:13.5px;color:var(--s7);font-weight:500}
.float-item:hover{background:var(--s1);color:var(--g8)}
.float-item .fi-icon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
/* ── Page Background Image — Applied to ALL pages ── */
/* Glass icon */
.glass-icon{width:46px;height:46px;background:rgba(255,255,255,.15);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:13px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.3)}
/* ── Page Hero — Royal Estates "The Atelier" style ── */
.ph-wrap{margin-bottom:28px}
.ph-content{position:relative;height:240px;border-radius:20px;overflow:hidden;display:flex}
.ph-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(1.05)}
.ph-overlay{position:absolute;inset:0;background:linear-gradient(to right,rgba(22,101,52,.92) 0%,rgba(22,101,52,.82) 50%,rgba(22,101,52,.5) 75%,rgba(22,101,52,.2) 100%);z-index:1}
.ph-text{position:relative;z-index:2;flex:1;display:flex;flex-direction:column;justify-content:center;padding:36px 44px;max-width:65%}
.ph-text h1{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:var(--w);margin-bottom:8px;letter-spacing:-.3px}
.ph-sub{font-size:15px;font-weight:600;color:rgba(255,255,255,.9);margin-bottom:8px}
.ph-desc{font-size:13.5px;color:rgba(255,255,255,.6);line-height:1.65;max-width:500px}
.ph-img-panel{position:relative;z-index:1;width:35%;overflow:hidden}
.ph-side-img{width:100%;height:100%;object-fit:cover;opacity:.4;mask-image:linear-gradient(to left,rgba(0,0,0,.6),transparent);-webkit-mask-image:linear-gradient(to left,rgba(0,0,0,.6),transparent)}
/* Enhanced sidebar header */
/* Responsive */
@media(max-width:1100px){.mod-grid{grid-template-columns:repeat(2,1fr)}.sg{grid-template-columns:repeat(2,1fr)}.svg{grid-template-columns:repeat(2,1fr)}.pg{grid-template-columns:repeat(2,1fr)}.pdsg{grid-template-columns:repeat(2,1fr)}.pdg{grid-template-columns:1fr}.dash-bottom-grid{grid-template-columns:1fr}}
@media(max-width:768px){
.mod-grid{grid-template-columns:1fr}.hero-section{height:340px}.hero-overlay h1{font-size:26px}.hero-overlay{padding:24px 20px}.hero-cta-strip{grid-template-columns:repeat(2,1fr)}.dash-bottom-grid{grid-template-columns:1fr}.hero-btns{flex-direction:column;width:100%}.btn-gold,.btn-gold-outline{width:100%;justify-content:center}.trust-bar{grid-template-columns:repeat(2,1fr);padding:24px}.sb{transform:translateX(-100%);width:270px}.sb.op{transform:translateX(0)}.sbo{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99}
.reel-card{width:240px;height:160px}.video-reel{padding:28px 0}.video-reel-title h2{font-size:22px}
.mc{margin-left:0}.hb{display:block}.sg{grid-template-columns:1fr}.svg{grid-template-columns:1fr}.pg{grid-template-columns:1fr}
.fr{grid-template-columns:1fr}.pc{padding:16px 14px;max-width:100%}.tb{padding:0 14px}
.pjc{flex-direction:column}.pji{width:100%;height:150px}
.phc{flex-direction:column;text-align:center}.pdh{height:180px}.pdsg{grid-template-columns:1fr 1fr}
.stepper{flex-wrap:wrap;gap:6px;padding:0}.step-ln{display:none}.plg{grid-template-columns:repeat(auto-fill,minmax(110px,1fr))}
.info-grid{grid-template-columns:1fr}.info-cell{border-right:none!important}.doc-grid{grid-template-columns:1fr}
.modal-lg{max-width:95vw}.modal{max-width:95vw}
.news-card{flex-direction:column;gap:12px}.news-img{width:100%;height:140px}
.sat-grid{grid-template-columns:repeat(2,1fr)!important}
.ph-content{height:auto;min-height:180px;flex-direction:column}.ph-text{max-width:100%;padding:24px 20px}.ph-text h1{font-size:24px}.ph-img-panel{display:none}
.al-row,.al-row[style]{min-width:0!important;grid-template-columns:1fr!important;gap:4px!important}.al-row span{display:block}
.chat-box{height:340px}.dv-card{flex-wrap:wrap}
}
@media print{.sb,.tb,.pdb,.tst,.hb{display:none!important}.mc{margin-left:0!important}.pc{padding:0!important}.rct{border:3px solid var(--g8)!important}}
`;

export default function EnuguHousing(){
  // ── BACKEND INTEGRATION ──
  const app = useApp();
  const isLive = app && !app.DEMO_MODE;
  const _savedPg = React.useMemo(() => { try { return localStorage.getItem('enugu_page') } catch(e) { return null } }, []);
  const [pg,setPg]=useState(_savedPg || "login");
  const [so,setSo]=useState(false);
  const [toast,setToast]=useState(null);
  const [user,setUser]=useState({fn:"",ln:"",em:"",ph:""});

  // Restore auth state on mount only (not on every profile change)
  const authInit=useRef(false);
  React.useEffect(()=>{
    if(authInit.current)return;
    if(app?.loading)return; // wait for loading to finish
    authInit.current=true;
    if(app?.profile){
      setUser({fn:app.profile.first_name||"",ln:app.profile.last_name||"",em:app.profile.email||"",ph:app.profile.phone||""});
      if(pg==="login"){setPg("dashboard");try{localStorage.setItem('enugu_page','dashboard')}catch(e){}}
    } else if(pg!=="login"&&pg!=="register"){
      setPg("login");try{localStorage.setItem('enugu_page','login')}catch(e){}
    }
  },[app?.profile,app?.loading]);
  const [fqo,setFqo]=useState(null);
  const [ptab,setPtab]=useState("projects");
  const projTabRef=useRef("estates");
  const [stab,setStab]=useState("all");
  const [tgs,setTgs]=useState({email:true,sms:false,push:true,twoFa:true,biometric:true});
  const [pvTab,setPvTab]=useState("verify");
  const [pvStep,setPvStep]=useState(0);
  const [uploads,setUploads]=useState({});
  const [selProp,setSelProp]=useState(null);
  // Sales/Estates state
  const [selEstate,setSelEstate]=useState(null);
  const [selPlot,setSelPlot]=useState(null);
  const [searchStatus,setSearchStatus]=useState(()=>{try{const s=localStorage.getItem('enugu_ss');return s?JSON.parse(s):{}}catch(e){return{}}}); // {plotId: "pending"|"approved"}
  const [showModal,setShowModal]=useState(null); // "search"|"pending"|"info"|"interest-confirm"|"cart-pay"
  const [plotFilter,setPlotFilter]=useState("all");
  const [floatOpen,setFloatOpen]=useState(false);
  const [cart,setCart]=useState(()=>{try{const c=localStorage.getItem('enugu_cart');return c?JSON.parse(c):[]}catch(e){return[]}}); // [{plot, estate, status:"pending"|"approved"|"paid", ref, date}]
  const [payMethod,setPayMethod]=useState("card");
  const [cartPayingId,setCartPayingId]=useState(null);
  const receiptRef=useRef(null);
  // New feature state
  const [chatMsgs,setChatMsgs]=useState(CHAT_MSGS);
  const [chatInput,setChatInput]=useState("");
  const [chatOpen,setChatOpen]=useState(false);
  const [aptDate,setAptDate]=useState("");
  const [aptTime,setAptTime]=useState("10:00 AM");
  const [aptDept,setAptDept]=useState("Land Registry");
  const [aptPurpose,setAptPurpose]=useState("");
  const [myApts,setMyApts]=useState(APPOINTMENTS);
  const [tfStep,setTfStep]=useState(0); // ownership transfer step
  const [subType,setSubType]=useState("subdivide"); // subdivide|merge
  const [adminTab,setAdminTab]=useState("overview");
  const [adminRole,setAdminRole]=useState("Super Admin");
  const [newsId,setNewsId]=useState(null);
  const [vaultFilter,setVaultFilter]=useState("all");
  const [receiptFilter,setReceiptFilter]=useState("all");
  const [appFilter,setAppFilter]=useState("all");

  // Persist searchStatus and cart to localStorage
  React.useEffect(()=>{try{localStorage.setItem('enugu_ss',JSON.stringify(searchStatus))}catch(e){}},[searchStatus]);
  React.useEffect(()=>{try{localStorage.setItem('enugu_cart',JSON.stringify(cart))}catch(e){}},[cart]);

  const show=m=>{
    const el=document.getElementById('psd-toast');
    if(!el)return;
    el.innerHTML='<span class="ga">✓</span>'+m;
    el.style.display='flex';el.style.opacity='1';
    clearTimeout(window._psdToastT);
    window._psdToastT=setTimeout(()=>{el.style.opacity='0';setTimeout(()=>{el.style.display='none'},400)},4000);
  };
  const nav=p=>{setPg(p);try{localStorage.setItem('enugu_page',p)}catch(e){};setSo(false);if(p!=='lands'&&p!=='projects'){setSelEstate(null);setSelPlot(null);setShowModal(null)};setNewsId(null);setTfStep(0)};

  // ── DEMO HANDLERS (no backend) ──
  const handleLogin = () => {
    const email = document.getElementById('login-email')?.value;
    const password = document.getElementById('login-pass')?.value;
    if (!email || !password) { show("Please enter email and password"); return; }
    setUser({fn:"James",ln:"Okafor",em:email,ph:"+234 801 234 5678"});
    nav("dashboard"); show("Welcome back!");
  };
  const handleRegister = () => {
    const fn = document.getElementById('reg-fn')?.value;
    const ln = document.getElementById('reg-ln')?.value;
    const email = document.getElementById('reg-email')?.value;
    const phone = document.getElementById('reg-phone')?.value;
    const password = document.getElementById('reg-pass')?.value;
    if (!fn || !ln || !email || !password) { show("Please fill all required fields"); return; }
    setUser({fn,ln,em:email,ph:phone||""});
    nav("dashboard"); show("Account created successfully!");
  };
  const handlePayment = async (plotId, amount, type = 'plot_purchase', desc = '') => {
    if (isLive) {
      try {
        const result = await app.makePayment({ plotId, amount, type, description: desc });
        return result;
      } catch(e) { return null; }
    } else { show(`Payment of ₦${Number(amount).toLocaleString()} processed! Ref: PAY-${Date.now().toString(36).toUpperCase()}`); return { status: 'completed' }; }
  };
  const handleAddToCart = async (plotId) => {
    if (isLive) { await app.addToCart(plotId); } 
    else { show("Interest registered!"); }
  };
  const handleSendChat = async (msg) => {
    if (isLive) { await app.sendChat(msg); }
  };
  const handleSubmitEnquiry = async (data) => {
    if (isLive) { await app.submitEnquiry(data); }
    else show("Enquiry submitted successfully!");
  };
  const handleUploadKYC = async (file, type) => {
    if (isLive) { return await app.uploadKYC(file, type); }
    else { show("Document uploaded!"); return "demo-url"; }
  };
  const hr=new Date().getHours();
  const togU=k=>setUploads({...uploads,[k]:!uploads[k]});

  const BANK={name:"Project Sales & Developments",bank:"Zenith Bank Plc",acctNo:"1012345678",sort:"057"};
  const PAY_METHODS=[
    {id:"card",name:"Debit / Credit Card",desc:"Visa, Mastercard, Verve",icon:"dollar"},
    {id:"transfer",name:"Bank Transfer",desc:"Transfer to project account",icon:"building"},
    {id:"ussd",name:"USSD",desc:"*737#, *919#, *901# and more",icon:"phone"},
    {id:"crypto",name:"Cryptocurrency",desc:"BTC, ETH, USDT",icon:"layers"},
  ];

  const paySearch=(plot)=>{
    setSearchStatus(prev=>({...prev,[String(plot.id)]:"pending"}));
    setShowModal("pending");
    show("Processing payment...");
    // Simulate auto-detect payment confirmation
    setTimeout(()=>{
      setSearchStatus(prev=>({...prev,[String(plot.id)]:"approved"}));
      setShowModal("info");
      show("Payment confirmed automatically! Search report unlocked.");
    },3500);
  };
  const handlePlotClick=(plot)=>{
    setSelPlot(plot);
    const st=searchStatus[String(plot.id)];
    if(plot.status==="sold"){show("This plot has already been allocated");return}
    if(st==="approved"){setShowModal("info")}
    else if(st==="pending"){setShowModal("pending")}
    else{setShowModal("search")}
  };
  const plotSt=(id)=>searchStatus[String(id)]||"unpaid";
  const declareInterest=(plot,estate)=>{
    const ref="INT-"+new Date().getFullYear()+"-"+String(Math.abs(String(plot.id).split("").reduce((a,c)=>a+c.charCodeAt(0),0)*13)%9000+1000);
    const existing=cart.find(c=>c.plot.id===plot.id);
    if(existing){
      show("You have already declared interest for this plot");
      setShowModal("interest-confirm");
      return;
    }
    setCart(prev=>[...prev,{plot,estate:estate?.name||"",status:"pending",ref,date:new Date().toISOString(),price:plot.price}]);
    setShowModal("interest-confirm");
    show("Interest registered! Ref: "+ref);
    // Simulate admin approval after 8 seconds
    setTimeout(()=>{
      setCart(prev=>prev.map(c=>c.ref===ref?{...c,status:"approved"}:c));
      show("Admin approved plot "+plot.id+"! Proceed to payment in Cart.");
    },8000);
  };
  const approveCartItem=(ref)=>{
    setCart(cart.map(c=>c.ref===ref?{...c,status:"approved"}:c));
    show("Admin approved! You can now proceed to payment.");
  };
  const cartCount=cart.length;
  const cartApproved=cart.filter(c=>c.status==="approved");
  const cartPending=cart.filter(c=>c.status==="pending");

  // Listen for 3D map iframe postMessage (plot clicks from satellite map)
  React.useEffect(()=>{
    const handler=(e)=>{
      if(e.data&&e.data.type==='plotSearchFee'&&e.data.plot){
        const mapPlot=e.data.plot;
        // Find matching real plot from current estate
        if(selEstate){
          const match=selEstate.plots.find(p=>String(p.id)===String(mapPlot.id));
          if(match){handlePlotClick(match);return}
        }
        // Fallback: create a virtual plot object from map data
        const pid=String(mapPlot.id);
        const vPlot={id:pid,size:mapPlot.size||'500',price:mapPlot.price||10000000,status:mapPlot.status||'available',type:mapPlot.type||'residential',block:mapPlot.block||'A',desc:mapPlot.desc||'',lga:selEstate?.loc?.split(',')[0]||'Enugu',fileNo:'MOH/'+pid+'/2025',oldFile:'LR-EN/2024/'+pid,created:'2025-01-01',regNo:'REG/EN/2025/'+pid,parent:selEstate?.name||'Estate Layout',topo:'Flat',soil:'Laterite',access:'Estate road',utilities:'Estate supply',owner:null,instrument:null,pending:null,prevOwner:null,docs:[],surveyNo:'SVP/EN/'+pid+'/2025'};
        setSelPlot(vPlot);
        if(vPlot.status==='sold'){show("This plot has already been allocated")}
        else{setShowModal("search")}
      }
    };
    window.addEventListener('message',handler);
    return ()=>window.removeEventListener('message',handler);
  },[selEstate,searchStatus]);
  const printReceipt=()=>{
    const w=window.open('','','width=800,height=1000');
    w.document.write('<html><head><title>Land Search Receipt</title>');
    w.document.write('<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet">');
    w.document.write('<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:"DM Sans",sans-serif;padding:40px;color:#1e293b}');
    w.document.write('.rct{border:3px solid #166534;padding:40px 36px;position:relative}');
    w.document.write('.rct-hd{text-align:center;margin-bottom:28px;padding-bottom:22px;border-bottom:3px double #166534}.rct-hd h2{font-family:"Playfair Display",serif;font-size:22px;color:#166534;margin-top:12px}.rct-hd p{font-size:13px;color:#475569;margin-top:4px}');
    w.document.write('.rct-ref{text-align:center;font-size:14px;color:#64748b;margin-bottom:24px}.rct-ref strong{color:#0d3318;font-size:16px}');
    w.document.write('.rct-sec{margin-bottom:20px}.rct-sec h4{font-family:"Playfair Display",serif;font-size:14px;color:#166534;padding:8px 12px;background:#dcfce7;border-left:4px solid #16a34a;margin-bottom:12px}');
    w.document.write('.rct-row{display:flex;justify-content:space-between;padding:7px 12px;font-size:13px}.rct-row:nth-child(odd){background:#f1f5f9}.rct-row .rl{color:#475569}.rct-row .rv{font-weight:600;color:#1e293b}');
    w.document.write('.rct-stamp{display:flex;align-items:center;justify-content:center;gap:40px;margin-top:32px;padding-top:24px;border-top:2px solid #e2e8f0}');
    w.document.write('.stamp-box{width:110px;height:110px;border:3px solid #16a34a;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#16a34a;transform:rotate(-15deg)}');
    w.document.write('.stamp-box .st1{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px}.stamp-box .st2{font-size:12px;font-weight:800;font-family:"Playfair Display",serif}.stamp-box .st3{font-size:7px;text-transform:uppercase}');
    w.document.write('.sig-box{text-align:center}.sig-box .sig{font-family:"Playfair Display",serif;font-size:22px;font-style:italic;color:#145a2c;margin-bottom:6px}.sig-box .sig-l{font-size:11px;color:#64748b}');
    w.document.write('.rct-wm{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-family:"Playfair Display",serif;font-size:70px;color:rgba(26,122,58,.06);pointer-events:none;white-space:nowrap}');
    w.document.write('</style></head><body>');
    w.document.write(receiptRef.current.innerHTML);
    w.document.write('</body></html>');
    w.document.close();
    w.focus();
    setTimeout(()=>{w.print();w.close()},500);
  };

  // ── AUTH ──
  const authSlides=[IM.h1,IM.h3,IM.h5,IM.h6,IM.e1,IM.d1,IM.hc1,IM.h4];
  const authSlideRef=useRef(0);
  const authContRef=useRef(null);
  useEffect(()=>{
    const t=setInterval(()=>{
      authSlideRef.current=(authSlideRef.current+1)%authSlides.length;
      const c=authContRef.current;if(!c)return;
      c.querySelectorAll('.auth-slide').forEach((el,i)=>el.classList.toggle('active',i===authSlideRef.current));
    },4000);
    return()=>clearInterval(t);
  },[]);

  const AuthShowcase=()=>(
    <div className="auth-left" ref={authContRef}>
      <div className="auth-slides">
        {authSlides.map((im,i)=>(<div key={i} className={`auth-slide${i===0?" active":""}`}><Img src={im} alt=""/></div>))}
      </div>
      <div className="auth-left-ov"/>
      <div className="auth-left-content">
        <div className="auth-logo"><div className="auth-logo-icon"><I n="award" s={20}/></div><div><div className="auth-logo-title">The Lords Ville</div><div className="auth-logo-sub">Tomorrow Is Here</div></div></div>

        <div className="auth-main">
          <div className="auth-badge"><I n="star" s={11}/><span>★ Flagship Development</span></div>
          <h1 className="auth-headline">Premium Estates &<br/><em>World-Class Developments</em></h1>
          <p className="auth-desc">Discover Nigeria's most visionary residential masterpiece — luxury villas, gated communities, recreational facilities, and modern infrastructure spanning thousands of hectares in Enugu State.</p>

          <div className="auth-features">
            <div className="auth-feat"><div className="auth-feat-ic"><I n="building" s={16}/></div><div><strong>28 Estates</strong><span>Premium surveyed plots</span></div></div>
            <div className="auth-feat"><div className="auth-feat-ic"><I n="home" s={16}/></div><div><strong>Luxury Villas</strong><span>1–5 bedroom designs</span></div></div>
            <div className="auth-feat"><div className="auth-feat-ic"><I n="layers" s={16}/></div><div><strong>Building Plans</strong><span>Architectural renders</span></div></div>
          </div>

          <div className="auth-plans">
            <div className="auth-plans-title">Building Plans & Designs</div>
            <div style={{display:"flex",alignItems:"center"}}>
              <div className="auth-plans-grid">
                <div className="auth-plan-card"><Img src={IM.bd1} k="bd1" alt=""/><div className="auth-plan-label"><I n="layers" s={10}/>1-Bed Floor Plan</div></div>
                <div className="auth-plan-card"><Img src={IM.bd2} k="bd2" alt=""/><div className="auth-plan-label"><I n="layers" s={10}/>2-Bed Floor Plan</div></div>
                <div className="auth-plan-card"><Img src={IM.bd3} k="bd3" alt=""/><div className="auth-plan-label"><I n="home" s={10}/>1-Bed Villa</div></div>
                <div className="auth-plan-card"><Img src={IM.bd4} k="bd4" alt=""/><div className="auth-plan-label"><I n="home" s={10}/>2-Bed Villa</div></div>
              </div>
              <div className="auth-video-pill"><div className="play-dot"><I n="play" s={10}/></div>Watch Tour</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LoginPage=()=>(
    <div className="auth-wrap">
      {AuthShowcase()}
      <div className="auth-right">
        <div className="auth-form-card">
          <div className="ach"><div style={{display:"flex",justifyContent:"center",marginBottom:14}}><CoatOfArms size={38}/></div><h2>Welcome Back</h2><p>Sign in to your investment account</p></div>
          <div className="fg"><label className="fl">Email Address</label><div className="fw"><I n="mail" s={16}/><input id="login-email" className="fi" type="email" placeholder="you@example.com" onKeyDown={e=>e.key==="Enter"&&handleLogin()}/></div></div>
          <div className="fg"><label className="fl">Password</label><div className="fw"><I n="lock" s={16}/><input id="login-pass" className="fi" type="password" placeholder="Enter password" onKeyDown={e=>e.key==="Enter"&&handleLogin()}/></div></div>
          <button className="bp bg" onClick={handleLogin} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><I n="arrow-right" s={16}/> Sign In</button>
          <div className="asw">Don't have an account? <button onClick={()=>nav("register")}>Create Account</button></div>
        </div>
      </div>
    </div>
  );

  const RegisterPage=()=>(
    <div className="auth-wrap">
      {AuthShowcase()}
      <div className="auth-right">
        <div className="auth-form-card">
          <div className="ach"><div style={{display:"flex",justifyContent:"center",marginBottom:14}}><CoatOfArms size={38}/></div><h2>Create Account</h2><p>Join thousands of investors in premium real estate</p></div>
          <div className="fr"><div className="fg"><label className="fl">First Name *</label><div className="fw"><I n="user" s={16}/><input id="reg-fn" className="fi" placeholder="First name"/></div></div><div className="fg"><label className="fl">Last Name *</label><div className="fw"><I n="user" s={16}/><input id="reg-ln" className="fi" placeholder="Last name"/></div></div></div>
          <div className="fg"><label className="fl">Email Address *</label><div className="fw"><I n="mail" s={16}/><input id="reg-email" className="fi" type="email" placeholder="you@example.com"/></div></div>
          <div className="fg"><label className="fl">Phone Number</label><div className="fw"><I n="phone" s={16}/><input id="reg-phone" className="fi" placeholder="+234..."/></div></div>
          <div className="fg"><label className="fl">Password *</label><div className="fw"><I n="lock" s={16}/><input id="reg-pass" className="fi" type="password" placeholder="Create a strong password" onKeyDown={e=>e.key==="Enter"&&handleRegister()}/></div></div>
          <button className="bp bg" onClick={handleRegister} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><I n="arrow-right" s={16}/> Create Account</button>
          <div className="asw">Already have an account? <button onClick={()=>nav("login")}>Sign In</button></div>
        </div>
      </div>
    </div>
  );

  // ── SIDEBAR ──
  const Sidebar=()=>(
    <>{so&&<div className="sbo" onClick={()=>setSo(false)}/>}
    <aside className={`sb ${so?"op":""}`}>
      <div className="sbh"><div style={{width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,#166534,#16a34a)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I n="award" s={22} st={{color:"#fff"}}/></div><div className="sbht"><h3>The Lords Ville</h3><p>Tomorrow Is Here</p></div></div>
      <nav className="sbn">
        {[{s:"Main",items:[{id:"dashboard",ic:"home",lb:"Dashboard"},{id:"projects",ic:"building",lb:"Projects & Developments"},{id:"plot-verification",ic:"search",lb:"Plot Verification"},{id:"my-cart",ic:"briefcase",lb:"My Cart"},{id:"portfolio",ic:"layers",lb:"Property Portfolio"}]},
          {s:"Land Services",items:[{id:"ownership-transfer",ic:"transfer",lb:"Ownership Transfer"},{id:"subdivision",ic:"split",lb:"Subdivision & Merger"},{id:"app-tracker",ic:"activity",lb:"Application Tracker"},{id:"doc-vault",ic:"folder",lb:"Document Vault"}]},
          {s:"Finance",items:[{id:"payments",ic:"dollar",lb:"Payments"},{id:"ground-rent",ic:"home",lb:"Ground Rent"},{id:"receipt-history",ic:"clipboard",lb:"Receipt History"}]},
          {s:"Support",items:[{id:"appointments",ic:"calendar",lb:"Book Appointment"},{id:"live-chat",ic:"message",lb:"Live Support"},{id:"news",ic:"megaphone",lb:"News & Announcements"},{id:"enquiry",ic:"mail",lb:"Submit Enquiry"},{id:"faq",ic:"help",lb:"Help Centre"}]},
          {s:"Account",items:[{id:"profile",ic:"user",lb:"Profile & KYC"},{id:"settings",ic:"settings",lb:"Settings"}]}
        ].map(sec=>(<div key={sec.s} className="sbs"><div className="sbsl">{sec.s}</div>{sec.items.map(it=>(<button key={it.id} className={`ni ${pg===it.id?"act":""}`} onClick={()=>nav(it.id)}><span className="nc"><I n={it.ic} s={17}/></span>{it.lb}{it.id==="my-cart"&&cartCount>0&&<span style={{marginLeft:"auto",background:"var(--d4)",color:"var(--g9)",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:10,minWidth:18,textAlign:"center"}}>{cartCount}</span>}</button>))}</div>))}
      </nav>
      <div className="sbf"><div className="sbu" onClick={()=>nav("profile")}><div className="sba">{user.fn?.[0]||"U"}{user.ln?.[0]||""}</div><div><div style={{color:"var(--s8)",fontSize:12.5,fontWeight:600}}>{user.fn} {user.ln}</div><div style={{color:"var(--s5)",fontSize:10.5}}>{user.em||"user@enugu.gov.ng"}</div></div></div></div>
    </aside></>
  );
  const TopBar=({title})=>(
    <div className="tb"><div className="tbl"><button className="hb" onClick={()=>setSo(!so)}><I n="menu" s={21}/></button><h2>{title}</h2></div>
      <div className="tbr"><button className="tbi" style={{position:"relative"}}><I n="bell" s={17}/><span className="nd"/></button><button className="tbi" onClick={()=>{if(app?.logout)app.logout();setUser({fn:"",ln:"",em:"",ph:""});setSearchStatus({});setCart([]);try{localStorage.removeItem('enugu_page');localStorage.removeItem('enugu_ss');localStorage.removeItem('enugu_cart')}catch(e){};nav("login");show("Signed out")}}><I n="logout" s={17}/></button></div>
    </div>
  );

  // ── PAGE HERO — Royal Estates "The Atelier" style header for every inner page ──
  const PageHero=({badge,title,sub,desc,img,imgK})=>(
    <div className="ph-wrap ai">
      <div className="ph-content">
        <div className="ph-overlay"/>
        <Img src={img||IM.hero} k={imgK||"hero"} className="ph-bg" alt=""/>
        <div className="ph-text">
          {badge&&<div className="pill-badge"><I n="link" s={14}/><span>{badge}</span></div>}
          <h1>{title}</h1>
          {sub&&<p className="ph-sub">{sub}</p>}
          {desc&&<p className="ph-desc">{desc}</p>}
        </div>
        <div className="ph-img-panel"><Img src={img||IM.e1} k={imgK||"e1"} alt="" className="ph-side-img"/></div>
      </div>
    </div>
  );

  // ── DASHBOARD ──
  // ── DASHBOARD — CINEMATIC LANDING ──
  const heroIdxRef=useRef(0);
  const heroContRef=useRef(null);
  const heroImgs=[IM.h1,IM.h2,IM.h3,IM.h4,IM.h5,IM.h6,IM.h7,IM.h8];
  const updateHeroSlide=(idx)=>{
    heroIdxRef.current=idx;
    const cont=heroContRef.current;if(!cont)return;
    cont.querySelectorAll('.hero-slide').forEach((el,i)=>{el.classList.toggle('active',i===idx)});
    cont.querySelectorAll('.hero-dot').forEach((el,i)=>{el.classList.toggle('active',i===idx)});
  };
  useEffect(()=>{const t=setInterval(()=>updateHeroSlide((heroIdxRef.current+1)%heroImgs.length),3000);return()=>clearInterval(t)},[]);
  // Video showcase cycling
  const vidShowRef=useRef(null);
  const vidIdxRef=useRef(0);
  const vidCount=8;
  const vidLabels=[
    {h:"The Lords Ville Estate",p:"Live walkthrough tour"},
    {h:"Estate Grand Gate",p:"Premium gated entry"},
    {h:"Villa Front View",p:"Luxury residence design"},
    {h:"Interior Luxury",p:"World-class finishing"},
    {h:"Recreation Center",p:"Resort-style amenities"},
    {h:"Aerial Overview",p:"Bird's eye perspective"},
    {h:"Home Architecture",p:"Modern living spaces"},
    {h:"Sports & Leisure",p:"Active lifestyle facilities"}
  ];
  useEffect(()=>{const t=setInterval(()=>{
    vidIdxRef.current=(vidIdxRef.current+1)%vidCount;
    const c=vidShowRef.current;if(!c)return;
    c.querySelectorAll('.vid-slide').forEach((el,i)=>el.classList.toggle('active',i===vidIdxRef.current));
    c.querySelectorAll('.vid-dot').forEach((el,i)=>el.classList.toggle('active',i===vidIdxRef.current));
    const lb=vidLabels[vidIdxRef.current];
    const th=c.querySelector('.vid-show-title h3');const tp=c.querySelector('.vid-show-title p');
    if(th)th.textContent=lb.h;if(tp)tp.textContent=lb.p;
    const badge=c.querySelector('.vid-show-badge span');
    if(badge)badge.textContent=vidIdxRef.current===0?"Live Walkthrough":"Estate Showcase";
  },1800);return()=>clearInterval(t)},[]);
  const Dashboard=()=>(<div className="pc">

      {/* ═══ 1. CINEMATIC HERO SLIDER ═══ */}
      <div className="hero-section ai" ref={heroContRef}>
        <div className="hero-slide-wrap">
          {heroImgs.map((im,i)=>(<div key={i} className={`hero-slide${i===0?" active":""}`}><Img src={im} alt="Project"/></div>))}
        </div>
        <div className="hero-gloss"/>
        <div className="hero-shimmer"/>
        <div className="hero-overlay">
          <div className="pill-badge"><I n="star" s={14}/><span>★ Flagship Development</span></div>
          <h1>The Lords Ville<br/><em>Estate Development</em></h1>
          <p>A visionary residential masterpiece — luxury villas, world-class recreational facilities, and modern infrastructure across thousands of hectares.</p>
          <div className="hero-btns">
            <button className="btn-gold" onClick={()=>nav("projects")}><I n="building" s={16}/>Explore Projects</button>
            <button className="btn-gold-outline" onClick={()=>nav("plot-verification")}><I n="search" s={16}/>Verify a Plot</button>
          </div>
          <div className="hero-dots">{heroImgs.map((_,i)=>(<div key={i} className={`hero-dot${i===0?" active":""}`} onClick={()=>updateHeroSlide(i)}/>))}</div>
        </div>
      </div>

      {/* ═══ 2. PROJECTS & DEVELOPMENTS — SPOTLIGHT MEGA-BANNER ═══ */}
      <div className="psd-spotlight ai a1">
        <div className="psd-spot-bg"><Img src={IM.h3} k="h3" alt=""/></div>
        <div className="psd-spot-overlay"/>
        <div className="psd-spot-glow"/>
        <div className="psd-spot-content">
          <div className="psd-spot-left" onClick={()=>{projTabRef.current="estates";nav("projects")}}>
            <div className="psd-spot-badge"><I n="star" s={12}/><span>MAIN PROGRAMME</span></div>
            <h2>Projects &<br/><em>Developments</em></h2>
            <p>Browse our complete portfolio — premium land estates, luxury housing, infrastructure projects, and coming-soon developments all in one place.</p>
            <button className="psd-spot-btn"><I n="arrow-right" s={18}/>View All Projects</button>
          </div>
          <div className="psd-spot-right">
            <div className="psd-spot-card psd-spot-c1" onClick={()=>{projTabRef.current="estates";nav("projects")}}><Img src={IM.e1} k="e1" alt=""/><div className="psd-spot-card-tag">Estates</div></div>
            <div className="psd-spot-card psd-spot-c2" onClick={()=>{projTabRef.current="housing";nav("projects")}}><Img src={IM.hc1} k="hc1" alt=""/><div className="psd-spot-card-tag">Housing</div></div>
            <div className="psd-spot-card psd-spot-c3" onClick={()=>{projTabRef.current="development";nav("projects")}}><Img src={IM.d1} k="d1" alt=""/><div className="psd-spot-card-tag">Infrastructure</div></div>
          </div>
        </div>
      </div>

      {/* ═══ 3. QUICK ACTION CARDS ═══ */}
      <div className="hero-cta-strip">
        {[{ic:"search",t:"Plot Verification",d:"Verify ownership",p:"plot-verification",bg:"rgba(217,119,6,.1)",c:"#d97706"},{ic:"home",t:"Housing & Villas",d:"Luxury developments",p:"projects",bg:"rgba(59,130,246,.1)",c:"#2563eb"},{ic:"briefcase",t:"My Investments",d:"Portfolio & cart",p:"portfolio",bg:"rgba(124,58,237,.1)",c:"#7c3aed"},{ic:"layers",t:"Property Portfolio",d:"Asset management",p:"portfolio",bg:"rgba(13,110,93,.1)",c:"#0d6e5d"}].map((c,i)=>(
          <div key={i} className={`hero-cta-card ai a${i+1}`} onClick={()=>nav(c.p)}>
            <div className="cta-ic" style={{background:c.bg,color:c.c}}><I n={c.ic} s={20}/></div>
            <h5>{c.t}</h5><span>{c.d}</span>
          </div>
        ))}
      </div>

      {/* ═══ 5. VIDEO & IMAGE SHOWCASE — Fast Cycle ═══ */}
      <div className="vid-showcase ai a2">
        <div className="vid-show-main" ref={vidShowRef}>
          <div className="vid-slide active"><video src="/lords/showcase.mp4" autoPlay muted loop playsInline/></div>
          <div className="vid-slide"><img src={IM.h1} alt="Estate Gate"/></div>
          <div className="vid-slide"><img src={IM.hc1} alt="Villa Front"/></div>
          <div className="vid-slide"><img src={IM.h3} alt="Interior"/></div>
          <div className="vid-slide"><img src={IM.h4} alt="Recreation"/></div>
          <div className="vid-slide"><img src={IM.h6} alt="Aerial View"/></div>
          <div className="vid-slide"><img src={IM.e1} alt="Home Design"/></div>
          <div className="vid-slide"><img src={IM.d2} alt="Sports Court"/></div>
          <div className="vid-show-overlay"/>
          <div className="vid-show-badge"><div className="vid-show-live"/><span>Live Walkthrough</span></div>
          <div className="vid-show-title"><h3>The Lords Ville Estate</h3><p>Live walkthrough tour</p></div>
          <div className="vid-show-dots">{[0,1,2,3,4,5,6,7].map(i=>(<div key={i} className={`vid-dot${i===0?" active":""}`}/>))}</div>
        </div>
        <div className="vid-show-thumbs">
          {[{img:IM.h1,l:"Estate Gate"},{img:IM.hc1,l:"Villa Front"},{img:IM.h4,l:"Recreation"},{img:IM.h6,l:"Aerial View"},{img:IM.e1,l:"Home Design"},{img:IM.d2,l:"Sports Court"}].map((t,i)=>(
            <div key={i} className="vid-show-thumb" onClick={()=>nav("projects")}><Img src={t.img} k={`vt${i}`} alt={t.l}/><div className="vid-thumb-label">{t.l}</div></div>
          ))}
        </div>
      </div>

      {/* ═══ 7. SERVICES + ACTIVITY ═══ */}
      <div className="dash-bottom-grid">
        <div className="xc ai a3"><div className="xh"><h3>Quick Services</h3></div><div className="xb"><div className="svg">
          {[{ic:"building",t:"Projects & Estates",d:"Browse developments",p:"projects"},{ic:"search",t:"Plot Verification",d:"Verify ownership",p:"plot-verification"},{ic:"dollar",t:"Make Payment",d:"Fees & levies",p:"payments"},{ic:"home",t:"Ground Rent",d:"Annual charges",p:"ground-rent"},{ic:"briefcase",t:"My Cart",d:"Pending purchases",p:"my-cart"},{ic:"star",t:"Coming Soon",d:"Future projects",p:"projects"}].map((s,i)=>(
            <div key={i} className="svc" onClick={()=>nav(s.p)}><div className="svci"><I n={s.ic} s={20}/></div><h4>{s.t}</h4><p>{s.d}</p></div>))}</div></div></div>
        <div className="xc ai a4"><div className="xh"><h3>Recent Activity</h3></div><div className="xb" style={{padding:"6px 18px"}}>
          {[{a:"New estate listing: Centenary City Phase 3",t:"2h ago",ic:"building"},{a:"Search fee paid for CC-003",t:"5h ago",ic:"search"},{a:"Premium fee payment — ₦5M",t:"1 day ago",ic:"dollar"},{a:"Housing pre-order confirmed",t:"3 days ago",ic:"home"},{a:"Allocation paper issued",t:"1 week ago",ic:"file"}].map((a,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 0",borderBottom:i<4?"1px solid var(--s1)":"none"}}><div style={{width:32,height:32,borderRadius:8,background:"var(--g1)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--g7)",flexShrink:0}}><I n={a.ic} s={14}/></div><div><div style={{fontSize:12.5,fontWeight:500,color:"var(--s7)"}}>{a.a}</div><div style={{fontSize:10.5,color:"var(--s4)",marginTop:1}}>{a.t}</div></div></div>))}</div></div>
      </div>
    </div>
  );


  // ── SHARED MODALS ──
    const PendingModal=()=>{
      if(!selPlot)return null;
      const approved=plotSt(selPlot.id)==="approved";
      return(
        <div className="modal-bg" onClick={()=>setShowModal(null)}>
          <div className="modal" style={{maxWidth:420}} onClick={e=>e.stopPropagation()}>
            <div className="modal-h"><h3>Search Fee — {selPlot.id}</h3><button onClick={()=>setShowModal(null)}><I n="x" s={20}/></button></div>
            <div className="modal-b" style={{textAlign:"center",padding:"36px 24px"}}>
              {approved?<>
                <div style={{width:60,height:60,borderRadius:"50%",background:"var(--g1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",color:"var(--g7)"}}><I n="check" s={28}/></div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"var(--g8)",marginBottom:6}}>Search Approved</h3>
                <p style={{fontSize:13,color:"var(--s5)",marginBottom:20}}>Your search fee has been verified. You now have full access to this plot's information.</p>
                <button className="bp" onClick={()=>setShowModal("info")}>View Full Plot Details</button>
              </>:<>
                <div className="spinner"/>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"var(--g8)",marginBottom:6}}>Processing Payment</h3>
                <p style={{fontSize:13,color:"var(--s5)",marginBottom:8}}>Your search fee payment of <strong>₦30,000</strong> has been received for plot <strong>{selPlot.id}</strong>.</p>
                <p style={{fontSize:12,color:"var(--s4)",marginBottom:20}}>We are verifying your payment. This usually takes a few moments. Please wait...</p>
                <div style={{background:"var(--d1)",borderRadius:10,padding:14,display:"flex",alignItems:"center",gap:10,textAlign:"left"}}>
                  <I n="clock" s={18}/>
                  <div><div style={{fontSize:12,fontWeight:600,color:"var(--d6)"}}>Awaiting Approval</div><div style={{fontSize:11,color:"var(--s5)"}}>You will be notified once approved</div></div>
                </div>
              </>}
            </div>
          </div>
        </div>
      );
    };

    // ── PLOT INFO MODAL (only accessible after approval) ──
    const PlotInfoModal=()=>{
      if(!selPlot)return null;
      const p=selPlot;const est=selEstate;
      const allDocs=["Certificate of Occupancy","Allocation Paper","Survey Plan","Deed of Assignment","Building Plan Approval","Tax Clearance","Environmental Impact Assessment","Development Levy Receipt"];
      const plotW=Math.round(Math.sqrt(Number(p.size)*4/3));const plotH=Math.round(Number(p.size)/plotW);
      return(
        <div className="modal-bg" onClick={()=>setShowModal(null)}>
          <div className="modal modal-lg" onClick={e=>e.stopPropagation()}>
            <div className="modal-h">
              <div style={{display:"flex",alignItems:"center",gap:10}}><div className="appr-badge"><I n="shield" s={13}/> Approved</div><h3 style={{margin:0}}>Plot {p.id}</h3></div>
              <button onClick={()=>setShowModal(null)}><I n="x" s={20}/></button>
            </div>
            <div className="modal-b" ref={receiptRef}>
              <div className="rct">
                <div className="rct-wm">PSD</div>
                <div className="rct-hd"><CoatOfArms size={50}/><h2>Project Sales & Developments</h2><p>Official Land Search Report</p></div>
                <div className="rct-ref">Receipt No: <strong>LSR-{new Date().getFullYear()}-{String(Math.abs(String(p.id).split("").reduce((a,c)=>a+c.charCodeAt(0),0)*17)%9000+1000)}</strong><br/>Date: {new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</div>

                {/* FILE INFO */}
                <div className="modal-section">
                  <div className="modal-section-hd"><I n="file" s={15}/> File Information</div>
                  <div className="modal-section-bd"><div className="info-grid">
                    <div className="info-cell"><div className="ik2">File Number</div><div className="iv2">{p.fileNo}</div></div>
                    <div className="info-cell"><div className="ik2">Old File Number</div><div className="iv2">{p.oldFile}</div></div>
                    <div className="info-cell info-full"><div className="ik2">Date Created</div><div className="iv2">{new Date(p.created).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</div></div>
                  </div></div>
                </div>

                {/* LAND IDENTIFICATION */}
                <div className="modal-section">
                  <div className="modal-section-hd"><I n="map" s={15}/> Land Identification</div>
                  <div className="modal-section-bd"><div className="info-grid">
                    <div className="info-cell"><div className="ik2">Plot Number</div><div className="iv2">{p.id}</div></div>
                    <div className="info-cell"><div className="ik2">Block</div><div className="iv2">Block {p.block}</div></div>
                    <div className="info-cell"><div className="ik2">Estate</div><div className="iv2">{est?.name||"—"}</div></div>
                    <div className="info-cell"><div className="ik2">LGA</div><div className="iv2">{p.lga}</div></div>
                    <div className="info-cell"><div className="ik2">Plot Type</div><div className="iv2" style={{color:p.type==="commercial"?"var(--b5)":p.type==="mixed"?"var(--o5)":"var(--g7)",textTransform:"capitalize"}}>{p.type}</div></div>
                    <div className="info-cell"><div className="ik2">Plot Size</div><div className="iv2">{Number(p.size).toLocaleString()} m²</div></div>
                    <div className="info-cell info-full"><div className="ik2">Parent Property</div><div className="iv2">{p.parent||"None"}</div></div>
                    <div className="info-cell info-full"><div className="ik2">Property Description</div><div className="iv2" style={{fontWeight:500,lineHeight:1.5}}>{p.desc}</div></div>
                  </div></div>
                  {/* Survey plan visualization */}
                  <div className="survey-mini">
                    <h5>Survey Plan Extract</h5>
                    <div className="plot-viz">
                      <div className="dim top">{plotW}m</div>
                      <div className="dim side">{plotH}m</div>
                      <div style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,color:"var(--g7)"}}>{p.id}</div><div style={{fontSize:9,color:"var(--s5)"}}>{p.size} m²</div></div>
                    </div>
                    <div className="svn">Survey No: {p.surveyNo}</div>
                  </div>
                </div>

                {/* LAND CHARACTERISTICS */}
                <div className="modal-section">
                  <div className="modal-section-hd"><I n="layers" s={15}/> Land Characteristics</div>
                  <div className="modal-section-bd"><div className="info-grid">
                    <div className="info-cell"><div className="ik2">Topography</div><div className="iv2">{p.topo||"Flat"}</div></div>
                    <div className="info-cell"><div className="ik2">Soil Type</div><div className="iv2">{p.soil||"Laterite"}</div></div>
                    <div className="info-cell"><div className="ik2">Access</div><div className="iv2">{p.access||"Road access"}</div></div>
                    <div className="info-cell"><div className="ik2">Utilities</div><div className="iv2">{p.utilities||"Available"}</div></div>
                  </div></div>
                </div>

                {/* OWNERSHIP */}
                <div className="modal-section">
                  <div className="modal-section-hd"><I n="user" s={15}/> Current Land Ownership</div>
                  <div className="modal-section-bd"><div className="info-grid">
                    <div className="info-cell info-full"><div className="ik2">Current Owner</div><div className="iv2" style={{color:p.owner?"var(--s8)":"var(--g6)"}}>{p.owner||"Government of Enugu State (Unallocated)"}</div></div>
                    <div className="info-cell info-full"><div className="ik2">Current Land Instrument / Building</div><div className="iv2">{p.instrument||"None — Available for allocation"}</div></div>
                    <div className="info-cell"><div className="ik2">Registration Number</div><div className="iv2">{p.regNo}</div></div>
                    <div className="info-cell"><div className="ik2">Previous Owner</div><div className="iv2">{p.prevOwner||"None (First allocation)"}</div></div>
                  </div></div>
                </div>

                {/* DOCUMENTS ON LAND */}
                <div className="modal-section">
                  <div className="modal-section-hd"><I n="file" s={15}/> Documents on this Land</div>
                  <div className="modal-section-bd"><div className="doc-grid">
                    {allDocs.map((d,i)=>(<div key={i} className={`doc-item ${(p.docs||[]).includes(d)?"has":"no"}`}>{(p.docs||[]).includes(d)?<I n="check" s={13}/>:<I n="x" s={13}/>}{d}</div>))}
                  </div></div>
                </div>

                {/* FINANCIAL */}
                <div className="modal-section">
                  <div className="modal-section-hd"><I n="dollar" s={15}/> Financial Information</div>
                  <div className="modal-section-bd"><div className="info-grid">
                    <div className="info-cell"><div className="ik2">Land Price</div><div className="iv2" style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:"var(--g7)"}}>N{Number(p.price).toLocaleString()}</div></div>
                    <div className="info-cell"><div className="ik2">Search Fee Paid</div><div className="iv2" style={{color:"var(--g6)"}}>₦30,000 — Verified</div></div>
                    <div className="info-cell info-full"><div className="ik2">Pending Fees on this Land</div><div className="iv2" style={{color:p.pending?"var(--r5)":"var(--g6)"}}>{p.pending||"None — Land is clear"}</div></div>
                  </div></div>
                </div>

                {/* LEGAL FEES BREAKDOWN */}
                {p.status==="available" && <div className="modal-section">
                  <div className="modal-section-hd"><I n="tag" s={15}/> Legal Fees Breakdown (Estimated)</div>
                  <div className="modal-section-bd">
                    {[["Premium Fee (Land Cost)","N"+Number(p.price).toLocaleString()],["Survey Plan Fee","N350,000"],["Deed of Assignment Processing","N500,000"],["Infrastructure Development Levy","N375,000"],["Ground Rent (Annual)","N25,000"],["Development Levy","N200,000"]].map(([k,v],i)=>(<div key={i} className="rct-row"><span className="rl">{k}</span><span className="rv">{v}</span></div>))}
                    <div style={{display:"flex",justifyContent:"space-between",padding:"14px 16px",background:"linear-gradient(135deg,var(--g0),var(--d1))",fontWeight:700,borderTop:"2px solid var(--g6)"}}><span style={{color:"var(--g8)",fontSize:15}}>Total Estimated Cost</span><span style={{color:"var(--g7)",fontSize:18,fontFamily:"'Playfair Display',serif"}}>N{(Number(p.price)+1450000).toLocaleString()}</span></div>
                  </div>
                </div>}

                {/* STAMP, SIGNATURE & QR VERIFICATION */}
                <div className="rct-stamp" style={{flexWrap:"wrap",gap:20}}>
                  <div className="stamp-box"><span className="st1">Project Sales</span><span className="st2">&</span><span className="st3">Developments</span><span className="st1" style={{marginTop:2}}>Approved</span></div>
                  <div className="sig-box"><div className="sig">Hon. P. C. Nwankwo</div><div className="sig-l">Permanent Secretary</div><div className="sig-l">Project Sales & Developments</div><div className="sig-l" style={{marginTop:6,fontWeight:600,color:"var(--g7)"}}>Date: {new Date().toLocaleDateString('en-GB')}</div></div>
                  <div style={{textAlign:"center"}}><QR data={p.fileNo||p.id} size={72}/><div style={{fontSize:9,color:"var(--s4)",marginTop:4}}>Scan to verify</div></div>
                </div>
                <div style={{marginTop:14,padding:10,background:"var(--g0)",borderRadius:8,display:"flex",alignItems:"center",gap:10,fontSize:11}}>
                  <I n="database" s={14}/><span style={{color:"var(--g7)",fontWeight:600}}>Blockchain Verified</span><span style={{color:"var(--s4)"}}>•</span><span style={{fontFamily:"monospace",fontSize:10,color:"var(--s5)"}}>BC-{p.fileNo||p.id}-{Date.now().toString(36).slice(-6).toUpperCase()}</span><span style={{color:"var(--s4)"}}>•</span><span style={{color:"var(--s5)"}}>Tamper-proof record</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{display:"flex",gap:10,marginTop:20,flexWrap:"wrap"}}>
                <button className="bp bsm" onClick={printReceipt}><I n="printer" s={15}/> Print / Save as PDF</button>
                <button className="bp bsm bg" onClick={printReceipt}><I n="download" s={15}/> Download Receipt</button>
                {p.status==="available"&&(()=>{
                  const ci=cart.find(c=>c.plot.id===p.id);
                  if(ci&&ci.status==="approved") return <button className="bp bsm" style={{marginLeft:"auto",background:"var(--g6)",color:"var(--w)",border:"none"}} onClick={()=>{setShowModal(null);nav("my-cart")}}><I n="check" s={14}/> Approved — Go to Cart</button>;
                  if(ci) return <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:7,fontSize:12,color:"var(--d6)",fontWeight:600,background:"var(--d1)",padding:"8px 14px",borderRadius:8}}><I n="clock" s={14}/> Interest Pending Review</div>;
                  return <button className="bp bsm" style={{marginLeft:"auto",background:"var(--d4)",color:"var(--g9)",border:"none"}} onClick={()=>declareInterest(p,est)}><I n="arrow" s={14}/> Express Interest to Purchase</button>;
                })()}
              </div>
            </div>
          </div>
        </div>
      );
    };

    // ── SEARCH FEE MODAL ──
    const SearchFeeModal=()=>{
      if(!selPlot)return null;
      const p=selPlot;
      return(
        <div className="modal-bg" onClick={()=>setShowModal(null)}>
          <div className="modal" style={{maxWidth:500}} onClick={e=>e.stopPropagation()}>
            <div className="modal-h"><h3>Land Search Fee Required</h3><button onClick={()=>setShowModal(null)}><I n="x" s={20}/></button></div>
            <div className="modal-b">
              <div style={{textAlign:"center",marginBottom:22}}>
                <div style={{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,var(--d1),var(--g0))",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",color:"var(--d6)",border:"2px solid var(--d3)"}}><I n="search" s={28}/></div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:19,color:"var(--g8)",marginBottom:5}}>Plot {p.id}</h3>
                <p style={{fontSize:13,color:"var(--s5)",lineHeight:1.6}}>A statutory search fee is required to access official plot information including ownership records, survey plans, documents on file, and legal fees.</p>
              </div>

              <div style={{background:"var(--s1)",borderRadius:12,padding:16,marginBottom:16,border:"1px solid var(--s2)"}}>
                <div style={{fontSize:10,fontWeight:700,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Plot Summary</div>
                {[["Plot ID",p.id],["Estate",selEstate?.name||"\u2014"],["Type",p.type.charAt(0).toUpperCase()+p.type.slice(1)],["Size",p.size+" m\u00B2"],["Block","Block "+p.block],["Status",p.status==="sold"?"Allocated":"Available"]].map(([k,v],i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i<5?"1px solid var(--s2)":"none",fontSize:13}}><span style={{color:"var(--s5)"}}>{k}</span><span style={{fontWeight:600,color:v==="Allocated"?"var(--r5)":v==="Available"?"var(--g6)":"var(--s8)"}}>{v}</span></div>))}
              </div>

              <div style={{background:"linear-gradient(135deg,var(--g0),var(--d1))",borderRadius:12,padding:16,marginBottom:16,border:"1px solid rgba(13,110,93,.12)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><div style={{fontSize:10,fontWeight:700,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1}}>Search Fee</div><div style={{fontSize:11,color:"var(--s5)",marginTop:2}}>One-time statutory fee</div></div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,color:"var(--g7)"}}>₦30,000</div>
                </div>
              </div>

              {/* Payment Method */}
              <div style={{marginBottom:16}}>
                <label className="fl" style={{marginBottom:10,display:"block"}}>Select Payment Method</label>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {PAY_METHODS.map(pm=>(
                    <div key={pm.id} onClick={()=>setPayMethod(pm.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:10,border:payMethod===pm.id?"2px solid var(--g6)":"1.5px solid var(--s2)",background:payMethod===pm.id?"var(--g0)":"var(--w)",cursor:"pointer",transition:"all .2s"}}>
                      <div style={{width:10,height:10,borderRadius:"50%",border:payMethod===pm.id?"3px solid var(--g6)":"2px solid var(--s3)",background:payMethod===pm.id?"var(--g6)":"transparent",flexShrink:0}}/>
                      <div style={{width:36,height:36,borderRadius:8,background:payMethod===pm.id?"var(--g1)":"var(--s1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:payMethod===pm.id?"var(--g7)":"var(--s5)"}}><I n={pm.icon} s={17}/></div>
                      <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:"var(--s8)"}}>{pm.name}</div><div style={{fontSize:11,color:"var(--s4)"}}>{pm.desc}</div></div>
                      {payMethod===pm.id&&<I n="check" s={16}/>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank Transfer Details */}
              {payMethod==="transfer"&&<div style={{background:"var(--s1)",borderRadius:10,padding:16,marginBottom:16,border:"1px solid var(--s2)"}}>
                <div style={{fontSize:10,fontWeight:700,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Bank Transfer Details</div>
                {[["Bank",BANK.bank],["Account Name",BANK.name],["Account Number",BANK.acctNo],["Amount","₦30,000"],["Reference",p.id+"-SEARCH"]].map(([k,v],i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<4?"1px solid var(--s2)":"none",fontSize:13}}><span style={{color:"var(--s5)"}}>{k}</span><span style={{fontWeight:600,color:"var(--s8)",fontFamily:k==="Account Number"?"monospace":"inherit"}}>{v}</span></div>))}
                <div style={{marginTop:10,padding:10,borderRadius:8,background:"var(--d1)",fontSize:11,color:"var(--d6)",display:"flex",alignItems:"center",gap:7}}><I n="clock" s={14}/> Our system will automatically detect your transfer and confirm payment.</div>
              </div>}

              <button className="bp bg" onClick={()=>paySearch(p)} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%"}}>
                <I n="shield" s={16}/> {payMethod==="transfer"?"I Have Made Transfer \u2014 Verify Payment":"Pay ₦30,000 via "+PAY_METHODS.find(g=>g.id===payMethod)?.name}
              </button>

              <div style={{textAlign:"center",marginTop:12,fontSize:11,color:"var(--s4)",lineHeight:1.6,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                <I n="shield" s={12}/> Payments are verified automatically. Your receipt unlocks instantly upon confirmation.
              </div>
            </div>
          </div>
        </div>
      );
    };

  // ── LAND SALES ──
  const LandSales=()=>{
    const heroLS=<PageHero badge="Estate Acquisition" title="Browse Estates" sub="Premium Estate Marketplace" desc="Browse premium estates across our developments. View survey maps, verify plots, and register your purchase interest directly." img={IM.e1} imgK="e1"/>;


    // ESTATE DETAIL VIEW (plot grid)
    if(selEstate){
      const e=selEstate;
      const filtered=plotFilter==="all"?e.plots:e.plots.filter(p=>plotFilter==="available"?p.status==="available":plotFilter==="sold"?p.status==="sold":p.type===plotFilter);
      return(
        <div className="pc">
          <button className="pdb" onClick={()=>setSelEstate(null)}><I n="arrowLeft" s={15}/> Back to Estates</button>
          <div style={{height:240,borderRadius:14,overflow:"hidden",position:"relative",marginBottom:22}}>
            <Img src={e.img} alt={e.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 30%,rgba(0,0,0,.7))",display:"flex",alignItems:"flex-end",padding:"24px 28px"}}>
              <div><h1 style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:"var(--w)",fontWeight:700}}>{e.name}</h1><p style={{color:"rgba(255,255,255,.7)",fontSize:13,marginTop:3,display:"flex",alignItems:"center",gap:5}}><I n="map" s={13}/> {e.loc}</p></div>
            </div>
          </div>
          <div className="sg" style={{gridTemplateColumns:"repeat(3,1fr)"}}>{[{l:"Total Plots",v:e.total,cl:"bl"},{l:"Available",v:e.avail,cl:"gn"},{l:"Allocated",v:e.sold,cl:"gd"}].map((s,i)=>(
            <div key={i} className="sc"><div className="sch"><div className={`sci ${s.cl}`}><I n="layers" s={18}/></div><span className="scl">{s.l}</span></div><div className="scv">{s.v}</div></div>
          ))}</div>
          <p style={{fontSize:13.5,color:"var(--s6)",lineHeight:1.7,marginBottom:18}}>{e.desc}</p>
          <div className="xc"><div className="xh" style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}><div><h3>Official Estate Survey Plan</h3><div style={{fontSize:11,color:"var(--s4)"}}>Scroll to zoom • Drag to pan • Tap any plot to view details</div></div>{e.surveyPlan&&<a href={e.surveyPlan} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:8,background:"linear-gradient(135deg,var(--d1),var(--g0))",border:"1.5px solid var(--d3)",color:"var(--d6)",fontSize:11,fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}><I n="download" s={14}/>Download Official Survey Plan</a>}</div>
            <div style={{padding:"12px 22px 6px"}}>
              <div className="tabr">{["all","available","sold","commercial","mixed"].map(f=>(<button key={f} className={`tabb ${plotFilter===f?"act":""}`} onClick={()=>setPlotFilter(f)}>{f==="all"?"All Plots":f==="sold"?"Allocated":f.charAt(0).toUpperCase()+f.slice(1)}</button>))}</div>
              <div style={{display:"flex",gap:14,marginBottom:14,flexWrap:"wrap"}}>{[{c:"#16A34A",l:"Available"},{c:"#DC2626",l:"Allocated"},{c:"#EAB308",l:"Reserved"},{c:"#2563EB",l:"Commercial"}].map((lg,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"var(--s6)"}}><div style={{width:12,height:12,borderRadius:3,background:lg.c}}/>{lg.l}</div>))}</div>
            </div>
            <div className="xb" style={{paddingTop:0}}>
              {/* Interactive Estate Map */}
              <div style={{position:"relative",width:"100%",height:620,borderRadius:16,overflow:"hidden",background:"#111815",border:"1.5px solid rgba(255,255,255,.08)"}}>
                <iframe
                  src={e.mapFile||"/lordsville-map.html"}
                  style={{width:"100%",height:"100%",border:"none",borderRadius:16}}
                  title={`Interactive Map — ${e.name}`}
                  allow="accelerometer"
                />
              </div>
              {/* Plot Cards Below Map */}
              <div style={{marginTop:16,display:"grid",gridTemplateColumns:`repeat(auto-fill,minmax(140px,1fr))`,gap:10}}>
                {filtered.map((p,i)=>{
                    const sold=p.status==="sold";const cmr=p.type==="commercial";const mx=p.type==="mixed";
                    const bg=sold?"rgba(239,68,68,.08)":cmr?"rgba(59,130,246,.08)":mx?"rgba(249,115,22,.08)":"rgba(22,163,74,.08)";
                    const bd=sold?"rgba(239,68,68,.25)":cmr?"rgba(59,130,246,.3)":mx?"rgba(249,115,22,.25)":"rgba(22,163,74,.3)";
                    const st=plotSt(p.id);
                    return(
                      <div key={i} onClick={()=>handlePlotClick(p)} style={{background:bg,border:`1px solid ${bd}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",transition:"all .2s"}}>
                        <div style={{fontSize:13,fontWeight:700,color:"var(--d9)"}}>{p.id}</div>
                        <div style={{fontSize:11,color:"var(--s6)",marginTop:2}}>{p.size} m² • Block {p.block}</div>
                        <div style={{fontSize:12,marginTop:4,color:sold?"rgba(239,68,68,.9)":"var(--p)",fontWeight:700}}>{sold?"SOLD":"₦"+Number(p.price/1e6).toFixed(0)+"M"}</div>
                        {st==="approved"&&<div style={{fontSize:8,background:"rgba(22,163,74,.6)",color:"var(--w)",padding:"1px 5px",borderRadius:3,marginTop:3,display:"inline-block",fontWeight:600}}>SEARCHED</div>}
                      </div>
                    );
                })}
              </div>
              {filtered.length===0 && <div style={{textAlign:"center",padding:40,color:"var(--s4)"}}>No plots match this filter</div>}
            </div>
          </div>

        </div>
      );
    }

    // ESTATES LIST
    return(
      <div className="pc">
        {heroLS}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:18}}>
          {ESTATES.map((e,i)=>(
            <div key={i} className={`ec ai a${i+1}`} onClick={()=>{setSelEstate(e);setPlotFilter("all")}}>
              <div className="ei"><Img src={e.img} alt={e.name}/></div>
              <div className="eb"><h4>{e.name}</h4><div className="loc"><I n="map" s={12}/> {e.loc}</div><p>{e.desc.slice(0,100)}...</p>
                <div className="ebs"><span className="ebt av">{e.avail} Available</span><span className="ebt sd">{e.sold} Allocated</span><span className="ebt tt">{e.total} Total</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── PORTFOLIO ──
  const Portfolio=()=>{
    const heroP=<PageHero badge="Asset Management" title="Property Portfolio" sub="Investment Tracking & Valuation" desc="Monitor your real estate investments, track market valuations, verify land titles, and manage your entire property portfolio in one place." img={IM.e2} imgK="e2"/>;

    if(selProp){const p=selProp;return(
      <div className="pc">
        <button className="pdb" onClick={()=>setSelProp(null)}><I n="arrowLeft" s={15}/> Back</button>
        <div className="pdh ai"><Img src={p.img} alt={p.t}/><div className="pdo"><div><h1>{p.t}</h1><p><I n="map" s={13}/> {p.loc}</p></div></div></div>
        <div className="pdsg">{[{v:p.ar,l:"Size"},{v:p.type,l:"Type"},{v:p.plotNo,l:"Plot No."},{v:p.year,l:"Year"}].map((s,i)=>(<div key={i} className={`pds ai a${i+1}`}><div className="val">{s.v}</div><div className="lbl">{s.l}</div></div>))}</div>
        <div className="pdg">
          <div>
            <div className="xc ai a3"><div className="xh"><h3>Details</h3><span className={`stb ${p.st==="vf"?"cp":"pn"}`}>{p.st==="vf"?"Verified":"Pending"}</span></div><div className="xb">
              <p style={{fontSize:13.5,color:"var(--s6)",lineHeight:1.7,marginBottom:18}}>{p.desc}</p>
              {[["Plot No.",p.plotNo],["Location",p.loc],["Type",p.type],["Zone",p.zone]].map(([k,v],i)=>(<div key={i} className="pdr"><span className="k">{k}</span><span className="v">{v}</span></div>))}
            </div></div>
            <div className="xc ai a4"><div className="xh"><h3>Land Characteristics</h3></div><div className="xb">
              {Object.entries(p.details).map(([k,v],i)=>(<div key={i} className="pdr"><span className="k" style={{textTransform:"capitalize"}}>{k}</span><span className="v">{v}</span></div>))}
            </div></div>
          </div>
          <div>
            <div className="pdm ai a2"><div className="lbl">Admin Market Value</div><div className="val">{p.mv}</div><div className="sub">Updated Feb 2026</div><div className="adm"><I n="shield" s={11}/> PSD Verified</div></div>
            <div className="xc ai a3" style={{marginTop:18}}><div className="xh"><h3>Purchase Value</h3></div><div className="xb" style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"var(--g8)"}}>{p.v}</div>
              {p.g!=="Pending"&&<div style={{marginTop:10,color:"var(--g6)",fontWeight:600,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><I n="trending" s={15}/>{p.g}</div>}
            </div></div>
          </div>
        </div>
      </div>
    )}
    return(
      <div className="pc">
        {heroP}
        <div className="pg">{PROPS.map((p,i)=>(
          <div key={i} className={`prc ai a${i+1}`} onClick={()=>setSelProp(p)}><div className="pri"><Img src={p.img} alt={p.t}/><span className={`pril ${p.st}`}>{p.st==="vf"?"verified":"pending"}</span></div>
            <div className="prb"><h4>{p.t}</h4><div className="loc"><I n="map" s={12}/> {p.loc}</div><div className="prs"><div className="prsi"><div className="v">{p.ar}</div><div className="l">Area</div></div><div className="prsi"><div className="v">{p.v}</div><div className="l">Value</div></div><div className="prsi"><div className="v" style={{color:p.g.startsWith("+")?"var(--g6)":"var(--s4)"}}>{p.g}</div><div className="l">Growth</div></div></div></div>
          </div>))}</div>
      </div>
    );
  };

  // ── PLOT VERIFICATION ──
  const PlotVerify=()=>{
    const heroPV=<PageHero badge="Verification" title="Plot Verification" sub="Land Title Authentication System" desc="Verify ownership, check encumbrances, and validate land titles through our secure blockchain-backed verification portal." img={IM.d3} imgK="d3"/>;

    const steps=["Plot Details","Upload Documents","Verification Fee","Review & Submit"];
    const docs=[
      {key:"alloc",icon:"file",color:"gn",title:"Allocation Paper",req:true},
      {key:"premium",icon:"dollar",color:"gd",title:"Premium Fee Receipt",req:true},
      {key:"infra",icon:"building",color:"bl",title:"Infrastructure Levy Receipt",req:true},
      {key:"svchrg",icon:"creditcard",color:"or",title:"Service Charge Receipt",req:true},
      {key:"bplan",icon:"layers",color:"bl",title:"Building Plan",req:true},
      {key:"survlift",icon:"search",color:"gn",title:"Survey Lifting Plan",req:true},
      {key:"survplan",icon:"shield",color:"gd",title:"Survey Plan",req:true},
      {key:"deed",icon:"file",color:"or",title:"Deed of Assignment",req:false},
      {key:"devlevy",icon:"dollar",color:"bl",title:"Dev Levy Receipt",req:false},
    ];
    return(
      <div className="pc">
        {heroPV}
        <div className="tabr">{[{k:"verify",l:"New Verification"},{k:"alloc",l:"Allocation Papers"},{k:"building",l:"Building Plans"},{k:"statutory",l:"Statutory Fees"},{k:"history",l:"History"}].map(t=>(<button key={t.k} className={`tabb ${pvTab===t.k?"act":""}`} onClick={()=>setPvTab(t.k)}>{t.l}</button>))}</div>

        {pvTab==="verify"&&<>
          <div className="stepper">{steps.map((s,i)=>(<React.Fragment key={i}><div className={`step ${pvStep===i?"act":pvStep>i?"dn":""}`}><div className="step-n">{pvStep>i?<I n="check" s={15}/>:i+1}</div><div className="step-l">{s}</div></div>{i<3&&<div className={`step-ln ${pvStep>i?"dn":""}`}/>}</React.Fragment>))}</div>
          {pvStep===0&&<div className="xc ai"><div className="xh"><h3>Plot Information</h3></div><div className="xb">
            <div className="fr"><div className="fg"><label className="fl">Plot Number *</label><div className="fw"><I n="hash" s={16}/><input className="fi" placeholder="EN/42/2024"/></div></div><div className="fg"><label className="fl">Location *</label><div className="fw"><I n="map" s={16}/><input className="fi" placeholder="Independence Layout"/></div></div></div>
            <div className="fr"><div className="fg"><label className="fl">Size (m²)</label><div className="fw"><I n="layers" s={16}/><input className="fi" placeholder="600"/></div></div><div className="fg"><label className="fl">Type</label><select className="fi fip"><option>Residential</option><option>Commercial</option><option>Mixed Use</option></select></div></div>
            <div style={{display:"flex",justifyContent:"flex-end",marginTop:6}}><button className="bp bsm" onClick={()=>setPvStep(1)}>Continue <I n="arrow" s={14}/></button></div>
          </div></div>}
          {pvStep===1&&<div className="xc ai"><div className="xh"><h3>Upload Documents</h3></div><div className="xb">
            {docs.map((d,i)=>(<div key={i} className={`upc ${uploads[d.key]?"up":""}`} onClick={()=>togU(d.key)}><div className="upc-t"><div className="upc-l"><div className={`upc-i ${d.color}`}><I n={d.icon} s={19}/></div><div><h4>{d.title} {d.req&&<span style={{color:"var(--r5)"}}>*</span>}</h4></div></div>{uploads[d.key]?<span className="us done">✓ Uploaded</span>:<span className="us pend">Upload</span>}</div></div>))}
            <div style={{display:"flex",justifyContent:"space-between",marginTop:16}}><button className="bp bpo bsm" onClick={()=>setPvStep(0)}>Back</button><button className="bp bsm" onClick={()=>setPvStep(2)}>Continue <I n="arrow" s={14}/></button></div>
          </div></div>}
          {pvStep===2&&<div className="xc ai"><div className="xh"><h3>Verification Fee</h3></div><div className="xb">
            <p style={{fontSize:13.5,color:"var(--s6)",marginBottom:16}}>Official verification processing fee. This is the official verification processing fee.</p>
            <div style={{background:"var(--s1)",borderRadius:12,padding:20,marginBottom:18}}>
              <div className="fer"><span className="fl2">Verification Processing Fee</span><span className="fa">₦50,000</span></div>
              <div className="fer tot"><span className="fl2">Total</span><span className="fa">₦50,000</span></div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}><button className="bp bpo bsm" onClick={()=>setPvStep(1)}>Back</button><button className="bp bg bsm" onClick={()=>setPvStep(3)}>Pay ₦50,000</button></div>
          </div></div>}
          {pvStep===3&&<div className="xc ai"><div className="xh"><h3>Review & Submit</h3></div><div className="xb">
            <div style={{padding:18,background:"var(--g0)",borderRadius:12,border:"1px solid var(--g1)",marginBottom:16}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>{[["Plot","EN/42/2024"],["Location","Independence Layout"],["Docs",`${Object.values(uploads).filter(Boolean).length}/${docs.length}`],["Fee","₦50,000"]].map(([l,v],i)=>(<div key={i}><div style={{fontSize:10.5,color:"var(--s5)",textTransform:"uppercase",letterSpacing:.5,marginBottom:3}}>{l}</div><div style={{fontSize:13.5,fontWeight:600,color:"var(--s8)"}}>{v}</div></div>))}</div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}><button className="bp bpo bsm" onClick={()=>setPvStep(2)}>Back</button><button className="bp bsm" style={{animation:"pulse 2s infinite"}} onClick={()=>{setPvStep(0);setPvTab("history");show("Submitted! Ref: PV-2026-089")}}>Submit</button></div>
          </div></div>}
        </>}
        {pvTab==="alloc"&&<div className="xc ai"><div className="xh"><h3>Allocation Papers</h3><button className="xbtn gd" onClick={()=>show("Request initiated")}>New Request</button></div><div className="xb" style={{padding:0}}><table className="dt"><thead><tr><th>Ref</th><th>Plot</th><th>Date</th><th>Status</th></tr></thead><tbody>{[{r:"ALC-042",p:"EN/42/2024",d:"Dec 2025",s:"cp"},{r:"ALC-015",p:"EN/15/2024",d:"Nov 2025",s:"cp"},{r:"ALC-003",p:"EN/78/2023",d:"Feb 2026",s:"pr"}].map((r,i)=>(<tr key={i}><td style={{fontWeight:600}}>{r.r}</td><td>{r.p}</td><td>{r.d}</td><td><span className={`stb ${r.s}`}>{r.s==="cp"?"completed":"processing"}</span></td></tr>))}</tbody></table></div></div>}
        {pvTab==="building"&&<div className="xc ai"><div className="xh"><h3>Building Plans</h3><button className="xbtn gd" onClick={()=>show("Submit initiated")}>Submit New</button></div><div className="xb"><div className="kgu" style={{marginBottom:18}}><div style={{color:"var(--s4)",marginBottom:8}}><I n="upload" s={32}/></div><p><span>Upload</span> building plans (PDF, DWG)</p></div><table className="dt"><thead><tr><th>ID</th><th>Plot</th><th>Date</th><th>Status</th></tr></thead><tbody>{[{id:"BP-001",p:"EN/42/2024",d:"Feb 2026",s:"pr"},{id:"BP-042",p:"EN/15/2024",d:"Dec 2025",s:"cp"}].map((r,i)=>(<tr key={i}><td style={{fontWeight:600}}>{r.id}</td><td>{r.p}</td><td>{r.d}</td><td><span className={`stb ${r.s}`}>{r.s==="cp"?"approved":"processing"}</span></td></tr>))}</tbody></table></div></div>}
        {pvTab==="statutory"&&<div className="svg ai">{[{t:"Survey Plans",p:"From ₦350,000"},{t:"Deed of Assignment",p:"From ₦500,000"},{t:"Development Levy",p:"Varies"}].map((s,i)=>(<div key={i} className="svc"><div className="svci"><I n="shield" s={20}/></div><h4>{s.t}</h4><div style={{marginTop:10,fontWeight:700,color:"var(--d6)"}}>{s.p}</div><button className="xbtn gd" style={{marginTop:10,width:"100%"}} onClick={()=>show("Request submitted")}>Request</button></div>))}</div>}
        {pvTab==="history"&&<div className="xc ai"><div className="xh"><h3>History</h3></div><div className="xb" style={{padding:0}}><table className="dt"><thead><tr><th>Ref</th><th>Plot</th><th>Date</th><th>Fee</th><th>Status</th></tr></thead><tbody>{[{r:"PV-089",p:"EN/42/2024",d:"Feb 7, 2026",f:"₦50,000",s:"pr"},{r:"PV-065",p:"EN/15/2024",d:"Jan 20, 2026",f:"₦50,000",s:"cp"},{r:"PV-312",p:"EN/78/2023",d:"Dec 5, 2025",f:"₦50,000",s:"cp"}].map((r,i)=>(<tr key={i}><td style={{fontWeight:600}}>{r.r}</td><td>{r.p}</td><td>{r.d}</td><td style={{fontWeight:600,color:"var(--g7)"}}>{r.f}</td><td><span className={`stb ${r.s}`}>{r.s==="cp"?"verified":"processing"}</span></td></tr>))}</tbody></table></div></div>}
      </div>
    );
  };

  // ── PROJECTS & DEVELOPMENT — FLAGSHIP SHOWCASE ──
  const Projects=()=>{
    const [pjTab,setPjTab]=useState(projTabRef.current||"estates");

    // ── HOUSING DATA ──
    const HOUSING=[
      {id:1,name:"New Haven Luxury Apartments",type:"Apartment Complex",beds:3,baths:3,sqm:180,price:"₦85M",img:IM.hc1,desc:"Spacious 2-bedroom detached bungalow with modern finishes, private driveway, landscaped garden, and dedicated parking. Stone-accent facade with premium roofing.",features:["Private Garden","Parking Bay","Modern Kitchen","Stone Facade"],status:"Selling",units:200,available:145},
      {id:2,name:"Coal City Smart Homes",type:"Detached Villa",beds:5,baths:4,sqm:320,price:"₦120M",img:IM.h1,desc:"Compact yet elegant 1-bedroom starter home — perfect for young professionals and first-time buyers. Open-plan living, modern bathroom, and private entrance with parking.",features:["Open Plan","Modern Bath","Private Entry","Compact Design"],status:"Selling",units:150,available:112},
      {id:3,name:"Milliken Hill Premium Villas",type:"Luxury Villa",beds:6,baths:5,sqm:450,price:"₦250M",img:IM.hc4,desc:"Contemporary semi-detached duplex units sharing a central garden divider. Dual entrance, private parking per unit, landscaped communal green with flowering plants and topiary.",features:["Shared Garden","Dual Entrance","Private Parking","Topiary Landscape"],status:"Selling",units:80,available:58},
      {id:4,name:"GRA Executive Townhouses",type:"Townhouse",beds:4,baths:3,sqm:220,price:"₦65M",img:IM.h3,desc:"Premium brick-accent 2-bedroom bungalow with enhanced finishes. Natural stone cladding, wider plot, double parking, and upgraded bathroom fittings throughout.",features:["Stone Cladding","Double Parking","Premium Finish","Wider Plot"],status:"Selling",units:60,available:42},
      {id:5,name:"Independence Layout Terraces",type:"Terrace Duplex",beds:4,baths:3,sqm:200,price:"₦55M",img:IM.hc5,desc:"Tree-lined boulevard-facing homes with premium street visibility. Interlocking driveway, manicured hedges, and proximity to the grand estate gate.",features:["Boulevard Facing","Interlocking Drive","Hedge Garden","Gate Proximity"],status:"Selling",units:100,available:71},
      {id:6,name:"Nike Lake Waterfront Residences",type:"Waterfront Apartment",beds:3,baths:2,sqm:160,price:"₦72M",img:IM.h5,desc:"Lush garden-facing homes surrounded by tropical landscaping — palm trees, ornamental shrubs, and play areas for children. The lifestyle wing of The Lords Ville.",features:["Garden Facing","Kids Play Zone","Palm Landscape","Family Area"],status:"Pre-Order",units:80,available:80},
    ];

    // ── DEVELOPMENT PROJECTS ──
    const DEVPROJECTS=[
      {id:1,t:"Enugu Ring Road Expansion",cat:"infra",d:"4-lane dual carriageway expansion with modern drainage, LED street lighting, 6 new flyovers spanning 22km. Transforming urban mobility across the Coal City.",pg:68,budget:"₦18.7B",contractor:"Craneburg Construction",period:"2024–2027",img:IM.h6,miles:[{t:"Survey",dn:true},{t:"Earthworks",dn:true},{t:"Road Base",dn:true},{t:"Asphalt",dn:false},{t:"Flyovers",dn:false}]},
      {id:2,t:"Independence Layout Drainage",cat:"infra",d:"Comprehensive flood management and stormwater drainage system across 12 major streets. Includes retention ponds and eco-friendly bioswale channels.",pg:82,budget:"₦3.8B",contractor:"Reynolds Construction",period:"2025–2026",img:IM.hc2,miles:[{t:"Survey",dn:true},{t:"Excavation",dn:true},{t:"Culverts",dn:true},{t:"Channels",dn:true},{t:"Landscaping",dn:false}]},
      {id:3,t:"Trans-Ekulu Road Network",cat:"infra",d:"15km road rehabilitation with premium asphalt overlay, concrete kerbing, pedestrian walkways and cycling lanes connecting major residential zones.",pg:55,budget:"₦5.2B",contractor:"CCECC Nigeria",period:"2025–2026",img:IM.bd1,miles:[{t:"Demolition",dn:true},{t:"Drainage",dn:true},{t:"Sub-base",dn:false},{t:"Surfacing",dn:false},{t:"Markings",dn:false}]},
      {id:4,t:"Enugu Airport Cargo Terminal",cat:"commercial",d:"Modern air cargo terminal with cold storage, customs processing zone, bonded warehouse, and automated freight handling. 50,000 tonne annual capacity.",pg:15,budget:"₦22B",contractor:"Zhongshan Fucheng",period:"2025–2028",img:IM.e3,miles:[{t:"Ground Breaking",dn:true},{t:"Foundation",dn:false},{t:"Structure",dn:false},{t:"Systems",dn:false},{t:"Operations",dn:false}]},
      {id:5,t:"Enugu Smart City Hub",cat:"tech",d:"Fibre-optic backbone connectivity, renewable energy micro-grid, smart traffic management, and citywide IoT infrastructure powering next-generation urban living.",pg:10,budget:"₦45B",contractor:"Huawei / State PPP",period:"2026–2030",img:IM.aerial,miles:[{t:"Master Plan",dn:true},{t:"Procurement",dn:false},{t:"Phase 1",dn:false},{t:"Phase 2",dn:false},{t:"Rollout",dn:false}]},
    ];

    // ── COMING SOON ──
    const COMING=[
      {id:1,t:"Enugu Eco-City District",d:"100-hectare self-sustaining eco-district with vertical farms, renewable energy campus, tech incubator hub, and zero-carbon residential quarter. Enugu's answer to Eko Atlantic.",timeline:"2027 Q3",img:IM.e3,investment:"₦120B"},
      {id:2,t:"Nike Lake Resort & Marina",d:"Lakeside 5-star hospitality complex: 200-room hotel, 40-slip marina, water sports centre, international conference centre, and signature restaurants.",timeline:"2027 Q1",img:IM.hc3,investment:"₦35B"},
      {id:3,t:"Coal City International School",d:"World-class K-12 international school with Olympic sports facilities, performing arts centre, STEM labs, and boarding houses on a 20-hectare campus.",timeline:"2027 Q4",img:IM.p1,investment:"₦18B"},
      {id:4,t:"Heritage Cultural Centre",d:"Multi-purpose cultural centre celebrating Igbo heritage: museum, amphitheatre, craft village, digital art gallery, and 1,500-seat events hall.",timeline:"2028 Q1",img:IM.h2,investment:"₦8.5B"},
    ];

    const barColors={infra:"linear-gradient(90deg,#2563eb,#60a5fa)",commercial:"linear-gradient(90deg,#d97706,#fbbf24)",tech:"linear-gradient(90deg,#7c3aed,#a78bfa)"};
    const tagCls={infra:"land",commercial:"dev",tech:"soon"};
    const totalBudget=DEVPROJECTS.reduce((a,p)=>{const n=parseFloat(p.budget.replace(/[₦B,]/g,""));return a+n},0);
    const totalInvest=totalBudget+COMING.reduce((a,p)=>{const n=parseFloat(p.investment.replace(/[₦B,]/g,""));return a+n},0);

    // ── ESTATE DETAIL VIEW ──
    if(selEstate){
      const e=selEstate;
      const flt=plotFilter==="all"?e.plots:e.plots.filter(p=>plotFilter==="available"?p.status==="available":plotFilter==="sold"?p.status==="sold":p.type===plotFilter);
      return(
        <div className="pc">
          <button className="pdb" onClick={()=>setSelEstate(null)}><I n="arrowLeft" s={15}/> Back to Projects & Development</button>
          <div style={{height:260,borderRadius:18,overflow:"hidden",position:"relative",marginBottom:24}}>
            <Img src={e.img} alt={e.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 20%,rgba(5,13,8,.85))",display:"flex",alignItems:"flex-end",padding:"28px 32px"}}>
              <div>
                <div className="pj-badge gold">★ Government Estate</div>
                <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:"#fff",fontWeight:800,marginBottom:4}}>{e.name}</h1>
                <p style={{color:"rgba(255,255,255,.6)",fontSize:13,display:"flex",alignItems:"center",gap:5}}><I n="map" s={13}/> {e.loc}</p>
              </div>
            </div>
          </div>
          <div className="sg" style={{gridTemplateColumns:"repeat(3,1fr)"}}>{[{l:"Total Plots",v:e.total,cl:"bl"},{l:"Available",v:e.avail,cl:"gn"},{l:"Allocated",v:e.sold,cl:"gd"}].map((s,i)=>(
            <div key={i} className="sc"><div className="sch"><div className={`sci ${s.cl}`}><I n="layers" s={18}/></div><span className="scl">{s.l}</span></div><div className="scv">{s.v}</div></div>
          ))}</div>
          <p style={{fontSize:13.5,color:"var(--s6)",lineHeight:1.7,marginBottom:18}}>{e.desc}</p>
          <div className="xc"><div className="xh" style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}><div><h3>Official Estate Survey Plan</h3><div style={{fontSize:11,color:"var(--s4)"}}>Scroll to zoom • Drag to pan • Tap any plot to view details</div></div>{e.surveyPlan&&<a href={e.surveyPlan} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:8,background:"linear-gradient(135deg,var(--d1),var(--g0))",border:"1.5px solid var(--d3)",color:"var(--d6)",fontSize:11,fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}><I n="download" s={14}/>Download Survey Plan</a>}</div>
            <div style={{padding:"12px 22px 6px"}}>
              <div className="tabr">{["all","available","sold","commercial","mixed"].map(f=>(<button key={f} className={`tabb ${plotFilter===f?"act":""}`} onClick={()=>setPlotFilter(f)}>{f==="all"?"All Plots":f==="available"?"Available":f==="sold"?"Allocated":f.charAt(0).toUpperCase()+f.slice(1)}</button>))}</div>
              <div style={{display:"flex",gap:14,marginBottom:14,flexWrap:"wrap"}}>{[{c:"#16A34A",l:"Available"},{c:"#DC2626",l:"Allocated"},{c:"#EAB308",l:"Reserved"},{c:"#2563EB",l:"Commercial"}].map((lg,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"var(--s6)"}}><div style={{width:12,height:12,borderRadius:3,background:lg.c}}/>{lg.l}</div>))}</div>
            </div>
            <div className="xb" style={{paddingTop:0}}>
              <div style={{position:"relative",width:"100%",height:620,borderRadius:16,overflow:"hidden",background:"#111815",border:"1.5px solid rgba(255,255,255,.08)"}}>
                <iframe src={e.mapFile||"/lordsville-map.html"} style={{width:"100%",height:"100%",border:"none",borderRadius:16}} title={`Interactive Map — ${e.name}`} allow="accelerometer"/>
              </div>
              <div style={{marginTop:16,display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10}}>
                {flt.map((p,i)=>{
                  const sold=p.status==="sold";const cmr=p.type==="commercial";const mx=p.type==="mixed";
                  const bg=sold?"rgba(239,68,68,.08)":cmr?"rgba(59,130,246,.08)":mx?"rgba(249,115,22,.08)":"rgba(22,163,74,.08)";
                  const bd=sold?"rgba(239,68,68,.25)":cmr?"rgba(59,130,246,.3)":mx?"rgba(249,115,22,.25)":"rgba(22,163,74,.3)";
                  const st=plotSt(p.id);
                  return(<div key={i} onClick={()=>handlePlotClick(p)} style={{background:bg,border:`1px solid ${bd}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",transition:"all .2s"}}>
                    <div style={{fontSize:13,fontWeight:700,color:"var(--d9)"}}>{p.id}</div>
                    <div style={{fontSize:11,color:"var(--s6)",marginTop:2}}>{p.size} m² • Block {p.block}</div>
                    <div style={{fontSize:12,marginTop:4,color:sold?"rgba(239,68,68,.9)":"var(--p)",fontWeight:700}}>{sold?"ALLOCATED":"₦"+Number(p.price/1e6).toFixed(0)+"M"}</div>
                    {st==="approved"&&<div style={{fontSize:8,background:"rgba(22,163,74,.6)",color:"var(--w)",padding:"1px 5px",borderRadius:3,marginTop:3,display:"inline-block",fontWeight:600}}>SEARCHED</div>}
                  </div>);
                })}
              </div>
              {flt.length===0&&<div style={{textAlign:"center",padding:40,color:"var(--s4)"}}>No plots match the selected filter</div>}
            </div>
          </div>
        </div>
      );
    }

    return(<div className="pc pj-wrap">
      {/* ═══════ CINEMATIC HERO ═══════ */}
      <div className="pj-hero2 ai a1">
        <Img src={IM.e3} alt="Projects & Development"/>
        <div className="pj-hero2-ov">
          <div className="pj-badge gold">★ Flagship Programme</div>
          <h1>Projects & Development</h1>
          <p className="pj-sub">Transforming Enugu State through world-class infrastructure, luxury housing, and visionary developments. Thousands of hectares of premium land, architectural masterpieces, and infrastructure projects shaping the future of the Coal City.</p>
        </div>
      </div>

      {/* ═══════ SECTION NAVIGATION ═══════ */}
      <div className="pj-nav">
        {[
          {id:"estates",label:"Browse Estates",icon:"tag",count:ESTATES.length},
          {id:"housing",label:"Housing & Structures",icon:"home",count:HOUSING.length},
          {id:"development",label:"Development Projects",icon:"building",count:DEVPROJECTS.length},
          {id:"coming",label:"Coming Soon",icon:"star",count:COMING.length},
        ].map(t=>(
          <button key={t.id} className={`pj-nav-btn${pjTab===t.id?" act":""}`} onClick={()=>setPjTab(t.id)}>
            <I n={t.icon} s={15}/>{t.label}<span className="pj-nav-count">{t.count}</span>
          </button>
        ))}
      </div>

      {/* ═══════ TAB: ESTATES FOR SALE ═══════ */}
      {pjTab==="estates"&&<>
        <div style={{display:"flex",gap:10,marginBottom:20,background:"linear-gradient(135deg,var(--g0),#fff)",borderRadius:14,padding:16,border:"1.5px solid var(--d2)",alignItems:"center",flexWrap:"wrap"}}>
          {[{l:"Registered Estates",v:ESTATES.length,c:"var(--g8)"},{l:"Plots Available",v:ESTATES.reduce((a,e)=>a+e.avail,0),c:"var(--g7)"},{l:"Total Inventory",v:ESTATES.reduce((a,e)=>a+e.total,0),c:"var(--g6)"}].map((s,i)=>(<div key={i} style={{flex:1,textAlign:"center",minWidth:100,padding:"10px 0",borderRight:i<2?"1.5px solid var(--d2)":"none"}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:800,color:s.c}}>{s.v.toLocaleString()}</div><div style={{fontSize:9.5,color:"var(--s5)",marginTop:3,textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>{s.l}</div></div>))}
        </div>
        <div className="pj-est-grid">
          {ESTATES.map((e,i)=>(
            <div key={i} className={`pj-est ai a${(i%6)+1}`} onClick={()=>{setSelEstate(e);setPlotFilter("all")}}>
              <div className="pj-est-img">
                <Img src={e.img} alt={e.name}/>
                <div className="pj-est-tags">
                  <span className="pj-est-tag land">{e.avail} Available</span>
                  {e.shape&&<span className="pj-est-tag house">Survey Plan</span>}
                </div>
                <div className="pj-est-img-ov"><h3>{e.name}</h3></div>
              </div>
              <div className="pj-est-bd">
                <div className="pj-est-loc"><I n="map" s={12}/>{e.loc}</div>
                <div className="pj-est-desc">{e.desc}</div>
                <div className="pj-est-stats">
                  <div className="pj-est-stat"><strong>{e.total}</strong><span>Total</span></div>
                  <div className="pj-est-stat" style={{background:"var(--g0)"}}><strong style={{color:"var(--g7)"}}>{e.avail}</strong><span>Available</span></div>
                  <div className="pj-est-stat"><strong style={{color:"var(--s6)"}}>{e.sold}</strong><span>Allocated</span></div>
                </div>
                <button className="pj-est-cta"><I n="eye" s={14}/>View Survey Plan & Plots</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:20,background:"var(--d1)",borderRadius:14,padding:18,display:"flex",alignItems:"center",gap:14,border:"1.5px solid var(--d2)"}}>
          <div style={{width:36,height:36,borderRadius:10,background:"var(--d2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I n="shield" s={18}/></div>
          <div style={{fontSize:12.5,color:"var(--d6)",lineHeight:1.65}}><strong>How to Purchase:</strong> Select any estate to view its official survey plan and available plots. Pay the statutory ₦30,000 search fee to access the official land search report, then express your interest to begin the allocation workflow.</div>
        </div>
      </>}

      {/* ═══════ TAB: HOUSING & STRUCTURES ═══════ */}
      {pjTab==="housing"&&<>
        <div style={{marginBottom:20,background:"linear-gradient(135deg,rgba(59,130,246,.06),rgba(99,102,241,.03))",borderRadius:14,padding:18,border:"1.5px solid rgba(59,130,246,.15)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><I n="home" s={18}/><span style={{fontSize:14,fontWeight:800,color:"var(--s8)"}}>Architectural Developments</span></div>
          <p style={{fontSize:12.5,color:"var(--s5)",lineHeight:1.6,margin:0}}>Explore The Lords Ville — a world-class residential estate featuring 1 & 2 bedroom homes with modern architecture, landscaped gardens, and premium finishes. Every home is designed for comfort, legacy, and lifestyle.</p>
        </div>
        <div className="pj-hous-grid">
          {HOUSING.map((h,i)=>(
            <div key={h.id} className={`pj-hous ai a${(i%4)+1}`}>
              <div className="pj-hous-img">
                <Img src={h.img} alt={h.name}/>
                <div style={{position:"absolute",top:12,left:12,display:"flex",gap:5}}>
                  <span className="pj-est-tag house">{h.type}</span>
                  <span className="pj-est-tag" style={{background:h.status==="Pre-Order"?"rgba(245,158,11,.85)":"rgba(22,163,74,.85)",color:"#fff"}}>{h.status}</span>
                </div>
              </div>
              <div className="pj-hous-bd">
                <h4>{h.name}</h4>
                <div className="pj-hous-type">{h.type} • {h.units} Units</div>
                <p>{h.desc.slice(0,140)}...</p>
                <div className="pj-hous-specs">
                  <div className="pj-hous-spec"><strong>{h.beds}</strong><span>Bedrooms</span></div>
                  <div className="pj-hous-spec"><strong>{h.baths}</strong><span>Bathrooms</span></div>
                  <div className="pj-hous-spec"><strong>{h.sqm}</strong><span>SQM</span></div>
                </div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>{h.features.map((f,fi)=>(<span key={fi} style={{fontSize:9.5,padding:"3px 8px",borderRadius:5,background:"var(--s1)",color:"var(--s5)",fontWeight:600}}>{f}</span>))}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><div style={{fontSize:9,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>Starting From</div><div className="pj-hous-price">{h.price}</div></div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:20,fontWeight:800,color:h.available>0?"var(--g7)":"var(--s4)"}}>{h.available}</div><div style={{fontSize:9,color:"var(--s4)",textTransform:"uppercase",letterSpacing:.5,fontWeight:700}}>Units Left</div></div>
                </div>
                <button className="pj-est-cta" style={{background:h.status==="Pre-Order"?"linear-gradient(135deg,#d97706,#b45309)":"linear-gradient(135deg,var(--g7),var(--g8))"}} onClick={()=>show(h.status==="Pre-Order"?"Pre-order request submitted! Our team will contact you.":"Interest registered successfully! Check your email for next steps.")}><I n={h.status==="Pre-Order"?"bell":"check"} s={14}/>{h.status==="Pre-Order"?"Pre-Order Now":"Express Interest"}</button>
              </div>
            </div>
          ))}
        </div>
      </>}

      {/* ═══════ TAB: DEVELOPMENT PROJECTS ═══════ */}
      {pjTab==="development"&&<>
        <div style={{marginBottom:20,background:"linear-gradient(135deg,rgba(217,119,6,.06),rgba(245,158,11,.03))",borderRadius:14,padding:18,border:"1.5px solid rgba(217,119,6,.15)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><I n="building" s={18}/><span style={{fontSize:14,fontWeight:800,color:"var(--s8)"}}>Government Infrastructure & Development</span></div>
          <p style={{fontSize:12.5,color:"var(--s5)",lineHeight:1.6,margin:0}}>Track the progress of major government projects transforming Enugu State. From road networks to smart city initiatives, these investments are creating the foundation for prosperity.</p>
        </div>
        <div className="pj-prj-grid">
          {DEVPROJECTS.map((pj,i)=>{
            const doneCount=pj.miles.filter(m=>m.dn).length;
            return(
              <div key={pj.id} className={`pj-prj ai a${(i%4)+1}`}>
                <div className="pj-prj-img">
                  <Img src={pj.img} alt={pj.t}/>
                  <div className="pj-prj-tags">
                    <span className={`pj-est-tag ${tagCls[pj.cat]||"dev"}`}>{pj.cat==="infra"?"Infrastructure":pj.cat==="commercial"?"Commercial":"Technology"}</span>
                    <span className="pj-est-tag" style={{background:"rgba(0,0,0,.6)",color:"#fff"}}>{pj.pg}%</span>
                  </div>
                </div>
                <div className="pj-prj-bd">
                  <h4>{pj.t}</h4>
                  <p>{pj.d}</p>
                  <div className="pj-pbar"><div className="pj-pfill" style={{width:`${pj.pg}%`,background:barColors[pj.cat]||barColors.infra}}/></div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,fontWeight:700}}>
                    <span style={{color:pj.pg>=70?"var(--g7)":"var(--s5)"}}>{pj.pg}% Complete</span>
                    <span style={{color:"var(--s4)"}}>{doneCount}/{pj.miles.length} milestones</span>
                  </div>
                  <div className="pj-miles2">{pj.miles.map((m,mi)=>(<span key={mi} className={`pj-ml ${m.dn?"dn":"pn"}`}>{m.dn?<I n="check" s={9}/>:<I n="clock" s={9}/>}{m.t}</span>))}</div>
                  <div className="pj-prj-meta">
                    <span className="pj-prj-mi"><I n="dollar" s={11}/><strong style={{color:"var(--g8)"}}>{pj.budget}</strong></span>
                    <span className="pj-prj-mi"><I n="building" s={11}/>{pj.contractor}</span>
                    <span className="pj-prj-mi"><I n="calendar" s={11}/>{pj.period}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>}

      {/* ═══════ TAB: COMING SOON ═══════ */}
      {pjTab==="coming"&&<>
        <div style={{marginBottom:20,background:"linear-gradient(135deg,rgba(124,58,237,.06),rgba(99,102,241,.03))",borderRadius:14,padding:18,border:"1.5px solid rgba(124,58,237,.15)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><I n="star" s={18}/><span style={{fontSize:14,fontWeight:800,color:"var(--s8)"}}>The Vision Ahead</span></div>
          <p style={{fontSize:12.5,color:"var(--s5)",lineHeight:1.6,margin:0}}>Get an exclusive preview of transformative projects in the pipeline. These visionary developments will redefine living, working, and investing in Enugu State. Register early to secure priority access.</p>
        </div>
        <div className="pj-soon-grid">
          {COMING.map((c,i)=>(
            <div key={c.id} className={`pj-soon ai a${(i%4)+1}`}>
              <div className="pj-soon-img">
                <Img src={c.img} alt={c.t}/>
                <div className="pj-soon-label">Coming {c.timeline}</div>
              </div>
              <div className="pj-soon-bd">
                <h4>{c.t}</h4>
                <p>{c.d}</p>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div><div style={{fontSize:9,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>Projected Investment</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,color:"#7c3aed"}}>{c.investment}</div></div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:9,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>Launch</div><div style={{fontSize:14,fontWeight:800,color:"var(--s7)"}}>{c.timeline}</div></div>
                </div>
                <button className="pj-est-cta" style={{background:"linear-gradient(135deg,#7c3aed,#6d28d9)"}} onClick={()=>show("You've been added to the priority waitlist! We'll notify you when this project launches.")}><I n="bell" s={14}/>Join Priority Waitlist</button>
              </div>
            </div>
          ))}
        </div>
      </>}
    </div>);
  };

  // ── PAYMENTS ──
  const Payments=()=>(<div className="pc"><PageHero badge="Finance" title="Payments" sub="Transaction Processing Centre" desc="Process statutory fees, premium payments, and service charges. All transactions are verified automatically with instant receipt generation." img={IM.e3} imgK="e3"/>
    <div className="sg" style={{gridTemplateColumns:"repeat(3,1fr)"}}>{[{l:"Total Paid",v:"₦14.2M",ic:"check",cl:"gn"},{l:"Pending",v:"₦3.8M",ic:"clock",cl:"gd"},{l:"Next Due",v:"Mar 15",ic:"bell",cl:"bl"}].map((s,i)=>(<div key={i} className={`sc ai a${i+1}`}><div className="sch"><div className={`sci ${s.cl}`}><I n={s.ic} s={18}/></div><span className="scl">{s.l}</span></div><div className="scv">{s.v}</div></div>))}</div>
    <div className="xc ai a3"><div className="xh"><h3>Make a Payment</h3></div><div className="xb">
      <div className="fr"><div className="fg"><label className="fl">Type</label><select className="fi fip"><option>Premium Fee</option><option>Infrastructure Levy</option><option>Development Levy</option></select></div><div className="fg"><label className="fl">Plot</label><div className="fw"><I n="map" s={16}/><input className="fi" placeholder="EN/42/2024"/></div></div></div>
      <div className="fg"><label className="fl">Amount (₦)</label><div className="fw"><I n="dollar" s={16}/><input className="fi" placeholder="Amount"/></div></div>
      <button className="bp" style={{maxWidth:280}} onClick={()=>show("Payment processed successfully")}>Pay Now</button>
    </div></div>
  </div>);

  // ── GROUND RENT ──
  const GroundRent=()=>(<div className="pc"><PageHero badge="Annual Charges" title="Ground Rent" sub="Annual Land Charge Management" desc="View and pay annual ground rent charges for your registered properties. Track payment history and maintain good standing." img={IM.e4} imgK="e4"/>
    <div className="xc ai a2"><div className="xh"><h3>Pay Ground Rent</h3></div><div className="xb">
      <div className="fr"><div className="fg"><label className="fl">Plot *</label><div className="fw"><I n="map" s={16}/><input className="fi" placeholder="EN/42/2024"/></div></div><div className="fg"><label className="fl">Year</label><select className="fi fip"><option>2026</option><option>2025</option></select></div></div>
      <div style={{background:"var(--s1)",borderRadius:12,padding:18,marginBottom:16}}><div className="fer tot"><span className="fl2">Amount</span><span className="fa">₦25,000</span></div></div>
      <button className="bp" style={{maxWidth:260}} onClick={()=>show("Ground rent payment submitted successfully")}>Pay ₦25,000</button>
    </div></div>
  </div>);

  // ── SERVICES ──
  const Services=()=>(<div className="pc"><PageHero badge="Services" title="Our Services" sub="Application Processing Hub" desc="Submit applications for building plans, C of O, survey plans, and other statutory documents required for your development." img={IM.d2} imgK="d2"/>
    <div className="tabr">{["all","land","ownership","fees"].map(t=>(<button key={t} className={`tabb ${stab===t?"act":""}`} onClick={()=>setStab(t)}>{t==="all"?"All":t.charAt(0).toUpperCase()+t.slice(1)}</button>))}</div>
    <div className="svg">{[{ic:"search",t:"Plot Verification",p:"plot-verification",c:"land"},{ic:"building",t:"Projects & Estates",p:"projects",c:"land"},{ic:"dollar",t:"Premium Fee",p:"payments",c:"fees"},{ic:"building",t:"Infrastructure Levy",p:"payments",c:"fees"},{ic:"home",t:"Ground Rent",p:"ground-rent",c:"fees"},{ic:"transfer",t:"Ownership Transfer",p:"services",c:"ownership"},{ic:"eye",t:"Title Search",p:"services",c:"ownership"},{ic:"file",t:"Certificate of Occupancy",p:"services",c:"land"}].filter(s=>stab==="all"||s.c===stab).map((s,i)=>(
      <div key={i} className={`svc ai a${(i%3)+1}`} onClick={()=>nav(s.p)}><div className="svci"><I n={s.ic} s={20}/></div><h4>{s.t}</h4><div style={{marginTop:10,color:"var(--g7)",fontSize:12.5,fontWeight:600,display:"flex",alignItems:"center",gap:4}}>Access <I n="arrow" s={13}/></div></div>))}</div>
  </div>);

  // ── ENQUIRY, FAQ, PROFILE, SETTINGS ──
  const Enquiry=()=>(<div className="pc"><PageHero badge="Support" title="Submit Enquiry" sub="Direct Communication Channel" desc="Reach our team directly with questions about land allocation, development regulations, or document processing." img={IM.d3} imgK="d3"/><div className="xc ai"><div className="xh"><h3>Submit Enquiry</h3></div><div className="xb">
    <div className="fr"><div className="fg"><label className="fl">Subject</label><select className="fi fip"><option>General</option><option>Plot Verification</option><option>Payment</option><option>Land Purchase</option></select></div><div className="fg"><label className="fl">Priority</label><select className="fi fip"><option>Normal</option><option>High</option><option>Urgent</option></select></div></div>
    <div className="fg"><label className="fl">Message</label><textarea className="efta" placeholder="Please describe your enquiry in detail..."></textarea></div>
    <button className="bp" style={{maxWidth:260}} onClick={()=>show("Enquiry submitted successfully. Reference: ENQ-089")}>Submit</button>
  </div></div></div>);

  const FAQ=()=>(<div className="pc"><PageHero badge="Information" title="Frequently Asked Questions" sub="Knowledge Base" desc="Find answers to common questions about land registration, plot verification, payment processes, and ministry services." img={IM.e1} imgK="e1"/><div className="xc ai"><div className="xh"><h3>Frequently Asked Questions</h3></div><div className="xb">
    {[{q:"How does the plot verification process work?",a:"Enter your plot details, upload the required documents (allocation paper, premium receipt, levy receipt, service charge receipt, building plan, survey lifting plan, and survey plan), pay the statutory verification fee of ₦50,000, and submit your application. Processing typically takes 5–7 working days."},
      {q:"How do I purchase land through the platform?",a:"Navigate to Projects & Development, select an estate, and choose any available plot. Pay the statutory ₦30,000 search fee to access the official land search report, which includes ownership records, legal fees, and a downloadable receipt. You may then express your interest to begin the purchase process."},
      {q:"What does the search fee cover?",a:"The statutory search fee of ₦30,000 per plot grants you access to the official land search report. This includes file information, ownership records, applicable legal fees, and a digitally signed receipt with the official stamp and QR verification code."},
      {q:"What are the standard fees and charges?",a:"Plot Verification: ₦50,000. Annual Ground Rent: ₦25,000 per year. Land Search Fee: ₦30,000 per plot. Premium, infrastructure, and development levies vary by estate and plot classification."},
      {q:"What is the timeline for building plan approval?",a:"Building plan approval typically takes 2–4 weeks from submission. You can monitor the status of your application in real time via the Application Tracker or through Plot Verification under the Building Plans section."}
    ].map((item,i)=>(<div key={i} className="fqi"><button className="fqq" onClick={()=>setFqo(fqo===i?null:i)}>{item.q}<span style={{transform:fqo===i?"rotate(90deg)":"none",transition:"transform .2s"}}><I n="chevron" s={15}/></span></button>{fqo===i&&<div className="fqa">{item.a}</div>}</div>))}
  </div></div></div>);

  const Profile=()=>(<div className="pc"><PageHero badge="Account" title="My Profile" sub="Personal Information & KYC" desc="Manage your account details, complete your KYC verification, and update your personal information." img={IM.p1} imgK="p1"/>
    <div className="phc ai"><div className="pav">{user.fn?.[0]}{user.ln?.[0]}</div><div className="pin"><h2>{user.fn} {user.ln}</h2><p>{user.em||"user@enugu.gov.ng"}</p><div className="vbd"><I n="shield" s={11}/> KYC Verified</div></div></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
      <div className="xc ai a2"><div className="xh"><h3>Personal Info</h3></div><div className="xb">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>{[{l:"First Name",v:user.fn},{l:"Last Name",v:user.ln},{l:"Email",v:user.em||"james@enugu.gov.ng"},{l:"Phone",v:user.ph||"+234 801 234 5678"}].map((f,i)=>(<div key={i} className="fg"><label className="fl">{f.l}</label><input className="fi fip" defaultValue={f.v}/></div>))}</div>
        <button className="bp" style={{marginTop:14,maxWidth:180}} onClick={()=>show("Changes saved successfully")}>Save</button>
      </div></div>
      <div className="xc ai a3"><div className="xh"><h3>KYC</h3></div><div className="xb">
        {[{l:"NIN",ok:true},{l:"Address Proof",ok:true},{l:"Passport Photo",ok:true},{l:"Tax Clearance",ok:false}].map((d,i)=>(<div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:i<3?"1px solid var(--s1)":"none"}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:30,height:30,borderRadius:7,background:d.ok?"var(--g1)":"var(--d1)",display:"flex",alignItems:"center",justifyContent:"center",color:d.ok?"var(--g7)":"var(--d6)"}}><I n={d.ok?"check":"clock"} s={14}/></div><span style={{fontSize:13,fontWeight:500}}>{d.l}</span></div><span className={`stb ${d.ok?"cp":"pn"}`}>{d.ok?"Verified":"Pending"}</span></div>))}
      </div></div>
    </div>
  </div>);

  const Settings=()=>{const tgl=k=>setTgs({...tgs,[k]:!tgs[k]});return(<div className="pc"><PageHero badge="Preferences" title="Settings" sub="Account Configuration" desc="Manage notifications, security, authentication preferences, and account settings." img={IM.p2} imgK="p2"/>
    <div className="xc ai"><div className="xh"><h3>Notifications</h3></div><div className="xb">
      {[{k:"email",t:"Email Notifications",d:"Approval letters, payment confirmations"},{k:"sms",t:"SMS Alerts",d:"OTP codes, appointment reminders"},{k:"push",t:"Push Notifications",d:"Real-time application updates"}].map(s=>(<div key={s.k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",borderBottom:s.k!=="push"?"1px solid var(--s1)":"none"}}><div><div style={{fontSize:13,fontWeight:600,color:"var(--s8)"}}>{s.t}</div><div style={{fontSize:11.5,color:"var(--s5)",marginTop:2}}>{s.d}</div></div><button className={`tg ${tgs[s.k]?"on":""}`} onClick={()=>tgl(s.k)}/></div>))}
    </div></div>

    <div className="xc ai a1"><div className="xh"><h3>Security & Authentication</h3></div><div className="xb">
      {/* 2FA */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",borderBottom:"1px solid var(--s1)"}}>
        <div style={{display:"flex",gap:12,alignItems:"center"}}><div style={{width:40,height:40,borderRadius:10,background:tgs.twoFa?"var(--g1)":"var(--s1)",display:"flex",alignItems:"center",justifyContent:"center",color:tgs.twoFa?"var(--g7)":"var(--s4)"}}><I n="shield" s={18}/></div><div><div style={{fontSize:13,fontWeight:600,color:"var(--s8)"}}>Two-Factor Authentication (2FA)</div><div style={{fontSize:11.5,color:"var(--s5)",marginTop:2}}>Receive OTP via {tgs.twoFa?"email & SMS":"(disabled)"}</div></div></div>
        <button className={`tg ${tgs.twoFa?"on":""}`} onClick={()=>{tgl("twoFa");show(tgs.twoFa?"2FA disabled":"2FA enabled — OTP will be sent to your email and phone")}}/>
      </div>
      {tgs.twoFa&&<div style={{background:"var(--g0)",borderRadius:10,padding:14,margin:"10px 0 14px",fontSize:12,color:"var(--g7)",display:"flex",gap:10,alignItems:"flex-start"}}><I n="check" s={15}/><div><strong>2FA Active:</strong> An OTP code will be sent to <strong>{user.em||"your email"}</strong> and <strong>{user.ph||"+234..."}</strong> each time you sign in or authorize a high-value transaction.</div></div>}

      {/* Biometric */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",borderBottom:"1px solid var(--s1)"}}>
        <div style={{display:"flex",gap:12,alignItems:"center"}}><div style={{width:40,height:40,borderRadius:10,background:tgs.biometric?"var(--d1)":"var(--s1)",display:"flex",alignItems:"center",justifyContent:"center",color:tgs.biometric?"var(--d6)":"var(--s4)"}}><I n="fingerprint" s={18}/></div><div><div style={{fontSize:13,fontWeight:600,color:"var(--s8)"}}>Biometric Verification</div><div style={{fontSize:11.5,color:"var(--s5)",marginTop:2}}>Required for transactions above ₦20M</div></div></div>
        <button className={`tg ${tgs.biometric?"on":""}`} onClick={()=>{tgl("biometric");show(tgs.biometric?"Biometric disabled":"Biometric verification enabled for high-value transactions")}}/>
      </div>
      {tgs.biometric&&<div style={{background:"var(--d1)",borderRadius:10,padding:14,margin:"10px 0 14px",fontSize:12,color:"var(--d6)",display:"flex",gap:10,alignItems:"flex-start"}}><I n="fingerprint" s={15}/><div><strong>Biometric Active:</strong> Ownership transfers and purchases above ₦20,000,000 will require fingerprint or facial recognition verification before processing.</div></div>}

      {/* Blockchain */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",borderBottom:"1px solid var(--s1)"}}>
        <div style={{display:"flex",gap:12,alignItems:"center"}}><div style={{width:40,height:40,borderRadius:10,background:"var(--b1)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--b5)"}}><I n="database" s={18}/></div><div><div style={{fontSize:13,fontWeight:600,color:"var(--s8)"}}>Blockchain Land Title Registry</div><div style={{fontSize:11.5,color:"var(--s5)",marginTop:2}}>Tamper-proof, immutable land title records</div></div></div>
        <div style={{padding:"4px 10px",borderRadius:6,background:"var(--g1)",color:"var(--g7)",fontSize:11,fontWeight:700}}>Active</div>
      </div>
      <div style={{background:"var(--s1)",borderRadius:10,padding:14,marginTop:10,marginBottom:14}}>
        <div style={{display:"flex",gap:14,alignItems:"center"}}>
          <QR data="BC-ENUGU-USER" size={56}/>
          <div><div style={{fontSize:12,fontWeight:600,color:"var(--s8)"}}>Your Blockchain ID</div><div style={{fontSize:12,fontFamily:"monospace",color:"var(--g7)",marginTop:3}}>BC-EN-{user.fn?.slice(0,2).toUpperCase()||"US"}-{String(Date.now()).slice(-6)}</div><div style={{fontSize:11,color:"var(--s5)",marginTop:3}}>All your land titles are permanently recorded on our distributed ledger.</div></div>
        </div>
      </div>

      {/* Change Password */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0"}}>
        <div style={{display:"flex",gap:12,alignItems:"center"}}><div style={{width:40,height:40,borderRadius:10,background:"var(--s1)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--s4)"}}><I n="key" s={18}/></div><div><div style={{fontSize:13,fontWeight:600,color:"var(--s8)"}}>Change Password</div><div style={{fontSize:11.5,color:"var(--s5)",marginTop:2}}>Last updated 30 days ago</div></div></div>
        <button className="xbtn" onClick={()=>show("Password reset link sent to "+user.em)}>Change</button>
      </div>
    </div></div>
  </div>)};

  // ── MY CART ──
  const MyCart=()=>{
    const heroCart=<PageHero badge="Purchases" title="My Cart" sub="Pending Acquisitions" desc="Review and complete your pending land purchases. Track payment status and finalise your plot acquisitions." img={IM.e3} imgK="e3"/>;
    // Simulate admin approval for demo: auto-approve pending items after 5s (only once per batch)
    const approvedOnce=React.useRef(false);
    React.useEffect(()=>{
      const pending=cart.filter(c=>c.status==="pending");
      if(pending.length>0 && !approvedOnce.current){
        approvedOnce.current=true;
        const t=setTimeout(()=>{
          setCart(prev=>prev.map(c=>c.status==="pending"?{...c,status:"approved"}:c));
          show("Admin has approved your purchase interest! You may now proceed to payment.");
          setTimeout(()=>{approvedOnce.current=false},1000); // allow future batches
        },5000);
        return ()=>clearTimeout(t);
      }
    },[cart]);

    const handleCartPay=(ci)=>{
      setCartPayingId(ci.ref);
      show("Processing payment via "+PAY_METHODS.find(g=>g.id===payMethod)?.name+"...");
      setTimeout(()=>{
        setCart(prev=>prev.map(c=>c.ref===ci.ref?{...c,status:"paid"}:c));
        setCartPayingId(null);
        show("Payment successful! Allocation processing has begun for "+ci.plot.id);
      },3000);
    };

    return(
      <div className="pc">{heroCart}
        <div style={{display:"flex",gap:12,marginBottom:18}}>
          {[{l:"Total Items",v:cart.length,cl:"gd"},{l:"Approved",v:cartApproved.length,cl:"gn"},{l:"Pending",v:cartPending.length,cl:"bl"}].map((s,i)=>(<div key={i} className={`sc ai a${i+1}`} style={{flex:1}}><div className="sch"><div className={`sci ${s.cl}`}><I n="briefcase" s={16}/></div><span className="scl">{s.l}</span></div><div className="scv">{s.v}</div></div>))}
        </div>

        {cart.length===0?(
          <div className="xc" style={{textAlign:"center",padding:"60px 24px"}}>
            <div style={{width:70,height:70,borderRadius:"50%",background:"var(--s1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",color:"var(--s4)"}}><I n="briefcase" s={30}/></div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"var(--s6)",marginBottom:6}}>Your Cart is Empty</h3>
            <p style={{fontSize:13,color:"var(--s4)",marginBottom:20}}>Browse available estates and express interest in plots to add them here.</p>
            <button className="bp bg" onClick={()=>nav("projects")}><I n="building" s={14}/> Explore Projects & Estates</button>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:18}}>
            {/* Pending Items */}
            {cartPending.length>0&&<div className="xc">
              <div className="xh"><h3 style={{display:"flex",alignItems:"center",gap:8}}><span style={{width:8,height:8,borderRadius:"50%",background:"var(--d4)"}}/>Pending Review ({cartPending.length})</h3></div>
              <div className="xb" style={{padding:0}}>
                {cartPending.map((ci,i)=>(
                  <div key={i} style={{display:"flex",gap:16,padding:"18px 22px",borderBottom:i<cartPending.length-1?"1px solid var(--s1)":"none",alignItems:"center",flexWrap:"wrap"}}>
                    <div style={{width:56,height:56,borderRadius:10,background:"var(--d1)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--d6)",flexShrink:0}}><I n="clock" s={24}/></div>
                    <div style={{flex:1,minWidth:200}}>
                      <div style={{fontSize:15,fontWeight:700,color:"var(--s8)",fontFamily:"'Playfair Display',serif"}}>{ci.plot.id} — {ci.estate?.name||"Estate"}</div>
                      <div style={{fontSize:12,color:"var(--s5)",marginTop:3}}>{ci.plot.type.charAt(0).toUpperCase()+ci.plot.type.slice(1)} \u2022 {ci.plot.size} m\u00B2 \u2022 Block {ci.plot.block}</div>
                      <div style={{fontSize:11,color:"var(--s4)",marginTop:2}}>Ref: {ci.ref} \u2022 {new Date(ci.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"var(--g7)"}}>N{Number(ci.plot.price).toLocaleString()}</div>
                      <div style={{marginTop:6,display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:6,background:"var(--d1)",color:"var(--d6)",fontSize:11,fontWeight:600}}><I n="clock" s={12}/> Awaiting Approval</div>
                    </div>
                  </div>
                ))}
                <div style={{padding:"14px 22px",background:"var(--s1)",fontSize:12,color:"var(--s5)",display:"flex",alignItems:"center",gap:8}}><I n="mail" s={14}/> An approval letter will be sent to <strong>{user.em||"your email"}</strong> within 24 hours. Items auto-approve in this demo after 5 seconds.</div>
              </div>
            </div>}

            {/* Approved Items — Ready for Payment */}
            {cartApproved.length>0&&<div className="xc" style={{border:"1.5px solid var(--g6)"}}>
              <div className="xh" style={{background:"var(--g0)"}}><h3 style={{display:"flex",alignItems:"center",gap:8,color:"var(--g7)"}}><span style={{width:8,height:8,borderRadius:"50%",background:"var(--g6)"}}/>Approved — Ready for Payment ({cartApproved.length})</h3></div>
              <div className="xb" style={{padding:0}}>
                {cartApproved.map((ci,i)=>{
                  const total=Number(ci.plot.price)+1450000;
                  const isPaying=cartPayingId===ci.ref;
                  return(
                    <div key={i} style={{borderBottom:i<cartApproved.length-1?"1px solid var(--s1)":"none"}}>
                      <div style={{display:"flex",gap:16,padding:"18px 22px",alignItems:"center",flexWrap:"wrap"}}>
                        <div style={{width:56,height:56,borderRadius:10,background:"var(--g1)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--g7)",flexShrink:0}}><I n="check" s={24}/></div>
                        <div style={{flex:1,minWidth:200}}>
                          <div style={{fontSize:15,fontWeight:700,color:"var(--s8)",fontFamily:"'Playfair Display',serif"}}>{ci.plot.id} — {ci.estate?.name||"Estate"}</div>
                          <div style={{fontSize:12,color:"var(--s5)",marginTop:3}}>{ci.plot.type.charAt(0).toUpperCase()+ci.plot.type.slice(1)} \u2022 {ci.plot.size} m\u00B2 \u2022 Block {ci.plot.block}</div>
                          <div style={{fontSize:11,color:"var(--g6)",fontWeight:600,marginTop:2}}>Ref: {ci.ref} \u2022 Approved</div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"var(--g7)"}}>N{total.toLocaleString()}</div>
                          <div style={{fontSize:10,color:"var(--s4)"}}>Total incl. fees</div>
                        </div>
                      </div>

                      {/* Payment Section */}
                      <div style={{padding:"0 22px 18px"}}>
                        {/* Fee Breakdown */}
                        <div style={{background:"var(--s1)",borderRadius:10,padding:16,marginBottom:14,border:"1px solid var(--s2)"}}>
                          <div style={{fontSize:10,fontWeight:700,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Payment Breakdown</div>
                          {[["Premium Fee (Land Cost)","N"+Number(ci.plot.price).toLocaleString()],["Survey Plan Fee","N350,000"],["Deed of Assignment","N500,000"],["Infrastructure Levy","N375,000"],["Ground Rent (1 Year)","N25,000"],["Development Levy","N200,000"]].map(([k,v],idx)=>(<div key={idx} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",fontSize:12.5,borderBottom:idx<5?"1px solid var(--s2)":"none"}}><span style={{color:"var(--s5)"}}>{k}</span><span style={{fontWeight:600,color:"var(--s7)"}}>{v}</span></div>))}
                          <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0 0",fontSize:14,fontWeight:700,borderTop:"2px solid var(--g6)",marginTop:8}}><span style={{color:"var(--g8)"}}>Total Payable</span><span style={{color:"var(--g7)",fontFamily:"'Playfair Display',serif",fontSize:18}}>N{total.toLocaleString()}</span></div>
                        </div>

                        {/* Payment Method Selection */}
                        <div style={{marginBottom:14}}>
                          <div style={{fontSize:10,fontWeight:700,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Select Payment Method</div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                            {PAY_METHODS.map(pm=>(
                              <div key={pm.id} onClick={()=>setPayMethod(pm.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:8,border:payMethod===pm.id?"2px solid var(--g6)":"1.5px solid var(--s2)",background:payMethod===pm.id?"var(--g0)":"var(--w)",cursor:"pointer",transition:"all .15s"}}>
                                <div style={{width:8,height:8,borderRadius:"50%",border:payMethod===pm.id?"3px solid var(--g6)":"2px solid var(--s3)",background:payMethod===pm.id?"var(--g6)":"transparent",flexShrink:0}}/>
                                <div style={{width:28,height:28,borderRadius:6,background:payMethod===pm.id?"var(--g1)":"var(--s1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:payMethod===pm.id?"var(--g7)":"var(--s5)"}}><I n={pm.icon} s={14}/></div>
                                <div><div style={{fontSize:12,fontWeight:600,color:"var(--s8)"}}>{pm.name}</div><div style={{fontSize:10,color:"var(--s4)"}}>{pm.desc}</div></div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bank Transfer Details */}
                        {payMethod==="transfer"&&<div style={{background:"var(--s1)",borderRadius:10,padding:14,marginBottom:14,border:"1px solid var(--s2)"}}>
                          <div style={{fontSize:10,fontWeight:700,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Transfer Details</div>
                          {[["Bank",BANK.bank],["Account Name",BANK.name],["Account Number",BANK.acctNo],["Sort Code",BANK.sort],["Amount","N"+total.toLocaleString()],["Reference",ci.ref]].map(([k,v],idx)=>(<div key={idx} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:idx<5?"1px solid var(--s2)":"none",fontSize:12.5}}><span style={{color:"var(--s5)"}}>{k}</span><span style={{fontWeight:600,color:"var(--s8)",fontFamily:k==="Account Number"||k==="Sort Code"?"monospace":"inherit"}}>{v}</span></div>))}
                          <div style={{marginTop:10,padding:10,borderRadius:8,background:"var(--d1)",fontSize:11,color:"var(--d6)",display:"flex",alignItems:"center",gap:7}}><I n="shield" s={13}/> Auto-detect: Our system monitors incoming transfers and confirms automatically.</div>
                        </div>}

                        {/* Payment Instructions */}
                        <div style={{background:"var(--d1)",borderRadius:8,padding:12,marginBottom:14,fontSize:11.5,color:"var(--d6)",lineHeight:1.6}}>
                          <strong>Instructions:</strong> {payMethod==="transfer"?"Transfer the exact amount using the reference above. Payment is auto-confirmed within minutes.":payMethod==="ussd"?"Dial the USSD code for your bank, select payment, and enter the reference. Auto-confirmed.":payMethod==="crypto"?"Send the equivalent amount to the wallet address provided. Confirmation may take up to 15 minutes.":"Enter your card details on the secure payment page. Payment is confirmed instantly."}
                        </div>

                        <button className="bp bg" disabled={isPaying} onClick={()=>handleCartPay(ci)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,opacity:isPaying?.7:1}}>
                          {isPaying?<><div className="spinner" style={{width:18,height:18,margin:0,borderWidth:2}}/> Processing Payment...</>:<><I n="shield" s={16}/> {payMethod==="transfer"?"Confirm Transfer \u2014 Verify Payment":"Pay N"+total.toLocaleString()+" via "+PAY_METHODS.find(g=>g.id===payMethod)?.name}</>}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>}

            {/* Paid/Completed Items */}
            {cart.filter(c=>c.status==="paid").length>0&&<div className="xc">
              <div className="xh"><h3 style={{display:"flex",alignItems:"center",gap:8,color:"var(--g7)"}}><I n="check" s={18}/> Payment Completed</h3></div>
              <div className="xb" style={{padding:0}}>
                {cart.filter(c=>c.status==="paid").map((ci,i)=>(
                  <div key={i} style={{display:"flex",gap:16,padding:"18px 22px",alignItems:"center",flexWrap:"wrap",borderBottom:"1px solid var(--s1)"}}>
                    <div style={{width:56,height:56,borderRadius:10,background:"linear-gradient(135deg,var(--g1),var(--d1))",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--g7)",flexShrink:0}}><I n="check" s={24}/></div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,fontWeight:700,color:"var(--s8)",fontFamily:"'Playfair Display',serif"}}>{ci.plot.id} — {ci.estate?.name}</div>
                      <div style={{fontSize:12,color:"var(--g6)",fontWeight:600,marginTop:3}}>Payment Confirmed \u2022 Allocation Processing</div>
                      <div style={{fontSize:11,color:"var(--s4)",marginTop:2}}>Ref: {ci.ref}</div>
                    </div>
                    <div style={{display:"inline-flex",alignItems:"center",gap:5,padding:"6px 14px",borderRadius:20,background:"var(--g1)",color:"var(--g7)",fontSize:11,fontWeight:700}}><I n="check" s={13}/> Paid</div>
                  </div>
                ))}
              </div>
            </div>}
          </div>
        )}
      </div>
    );
  };

  // ── ROUTER ──

  // ── QR CODE GENERATOR ──
  const QR=({data="",size=80})=>{
    const s=data||"MOH-EN";const h=s.split("").reduce((a,c)=>((a<<5)-a)+c.charCodeAt(0),0);
    const cells=[];for(let i=0;i<49;i++){const r=Math.floor(i/7),c=i%7;const corner=(r<3&&c<3)||(r<3&&c>3)||(r>3&&c<3);const v=corner||((h>>>i)&1);cells.push(v);}
    const cs=size/7;
    return(<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{cells.map((v,i)=>{const r=Math.floor(i/7),c=i%7;return v?<rect key={i} x={c*cs} y={r*cs} width={cs-.5} height={cs-.5} fill="var(--g8)" rx={1}/>:null;})}<rect x={size*.3} y={size*.3} width={size*.4} height={size*.4} fill="var(--w)" rx={2}/><text x={size/2} y={size/2+3} textAnchor="middle" fontSize={size*.09} fill="var(--g8)" fontWeight="700" fontFamily="monospace">MOH</text></svg>);
  };

  // ── OWNERSHIP TRANSFER ──
  const OwnershipTransfer=()=>{
    const heroOT=<PageHero badge="Transfer" title="Ownership Transfer" sub="Property Conveyancing Portal" desc="Process ownership transfers, subdivision, and merger applications through our secure digital portal." img={IM.p2} imgK="p2"/>;
    const steps=["Initiate Transfer","Buyer Details","Document Upload","Management Review","Transfer Complete"];
    return(<div className="pc">{heroOT}

      {/* Transfer Stepper */}
      <div className="xc ai a1"><div className="xh"><h3>Transfer Workflow</h3><span style={{fontSize:11,color:"var(--s4)"}}>Step {tfStep+1} of {steps.length}</span></div>
        <div className="xb">
          <div style={{display:"flex",gap:4,marginBottom:24}}>
            {steps.map((st,i)=>(<div key={i} style={{flex:1,textAlign:"center"}}><div style={{height:4,borderRadius:2,background:i<=tfStep?"linear-gradient(90deg,var(--g6),var(--d4))":"var(--s2)",marginBottom:8,transition:"all .3s"}}/><div style={{fontSize:10,fontWeight:i<=tfStep?700:500,color:i<=tfStep?"var(--g7)":"var(--s4)"}}>{st}</div></div>))}
          </div>

          {tfStep===0&&<div>
            <div className="fr"><div className="fg"><label className="fl">Seller Name *</label><div className="fw"><I n="user" s={16}/><input className="fi" placeholder="Full legal name"/></div></div><div className="fg"><label className="fl">Plot ID *</label><div className="fw"><I n="map" s={16}/><input className="fi" placeholder="e.g. CC-004"/></div></div></div>
            <div className="fr"><div className="fg"><label className="fl">Current Title Instrument</label><div className="fw"><I n="file" s={16}/><input className="fi" placeholder="e.g. DA/EN/2025/0089"/></div></div><div className="fg"><label className="fl">Reason for Transfer</label><select className="fi fip"><option>Sale / Purchase</option><option>Gift / Donation</option><option>Inheritance</option><option>Court Order</option></select></div></div>
            <div style={{background:"var(--d1)",borderRadius:10,padding:14,marginTop:8,fontSize:12,color:"var(--d6)",display:"flex",gap:10,alignItems:"flex-start"}}><I n="shield" s={16}/><div><strong>Blockchain Verification:</strong> This transfer will be recorded on the immutable blockchain ledger. Once completed, the provenance trail is tamper-proof and permanently verifiable.</div></div>
          </div>}

          {tfStep===1&&<div>
            <div className="fr"><div className="fg"><label className="fl">Buyer Full Name *</label><div className="fw"><I n="user" s={16}/><input className="fi" placeholder="Full legal name"/></div></div><div className="fg"><label className="fl">Buyer NIN *</label><div className="fw"><I n="shield" s={16}/><input className="fi" placeholder="NIN Number"/></div></div></div>
            <div className="fr"><div className="fg"><label className="fl">Buyer Email</label><div className="fw"><I n="mail" s={16}/><input className="fi" placeholder="buyer@email.com"/></div></div><div className="fg"><label className="fl">Buyer Phone</label><div className="fw"><I n="phone" s={16}/><input className="fi" placeholder="+234..."/></div></div></div>
            <div style={{background:"var(--g0)",borderRadius:10,padding:14,marginTop:8,fontSize:12,color:"var(--g7)",display:"flex",gap:10,alignItems:"flex-start"}}><I n="fingerprint" s={16}/><div><strong>Biometric Verification:</strong> High-value transfers above ₦20M require biometric verification. The buyer will receive an OTP and biometric prompt before final approval.</div></div>
          </div>}

          {tfStep===2&&<div>
            {["Deed of Assignment","Consent to Transfer (Governor's)","Tax Clearance Certificate","Valuation Report","Passport Photos (Seller & Buyer)"].map((d,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:i<4?"1px solid var(--s1)":"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:36,height:36,borderRadius:8,background:uploads["tf_"+i]?"var(--g1)":"var(--s1)",display:"flex",alignItems:"center",justifyContent:"center",color:uploads["tf_"+i]?"var(--g7)":"var(--s4)"}}><I n={uploads["tf_"+i]?"check":"upload"} s={16}/></div><span style={{fontSize:13,fontWeight:500}}>{d}</span></div>
                <button className="xbtn" onClick={()=>togU("tf_"+i)}>{uploads["tf_"+i]?"Uploaded":"Upload"}</button>
              </div>))}
          </div>}

          {tfStep===3&&<div style={{textAlign:"center",padding:"20px 0"}}>
            <div className="spinner"/><h4 style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:"var(--g8)",marginBottom:6}}>Under Review</h4>
            <p style={{fontSize:13,color:"var(--s5)",lineHeight:1.7,maxWidth:400,margin:"0 auto"}}>The Hon. Commissioner's office is reviewing your transfer application. Both parties will be notified once approved. Expected: 3-5 business days.</p>
            <div style={{marginTop:16,display:"inline-flex",gap:8,fontSize:12,color:"var(--d6)",background:"var(--d1)",padding:"8px 14px",borderRadius:8}}><I n="clock" s={14}/> Application submitted {new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div>
          </div>}

          {tfStep===4&&<div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{width:70,height:70,borderRadius:"50%",background:"var(--g1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",border:"2px solid var(--g6)"}}><I n="check" s={32}/></div>
            <h4 style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"var(--g7)",marginBottom:6}}>Transfer Complete</h4>
            <p style={{fontSize:13,color:"var(--s5)",marginBottom:16}}>Ownership has been successfully transferred and recorded on the blockchain registry.</p>
            <div style={{display:"inline-flex",gap:10,alignItems:"center"}}><QR data="TF-2026-0089" size={60}/><div style={{textAlign:"left"}}><div style={{fontSize:10,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1}}>Blockchain Ref</div><div style={{fontSize:14,fontWeight:700,color:"var(--g8)",fontFamily:"monospace"}}>BC-TF-2026-0089</div><div style={{fontSize:10,color:"var(--g6)",fontWeight:600}}>Verified on chain</div></div></div>
          </div>}

          <div style={{display:"flex",gap:10,marginTop:20}}>
            {tfStep>0&&<button className="bp bpo bsm" onClick={()=>setTfStep(Math.max(0,tfStep-1))}><I n="arrowLeft" s={14}/> Back</button>}
            <button className="bp bsm" style={{marginLeft:"auto"}} onClick={()=>{setTfStep(Math.min(4,tfStep+1));if(tfStep===2)show("Documents submitted successfully — under review")}}>{tfStep===4?"Done":tfStep===3?"Check Status":"Continue"} <I n="arrow" s={14}/></button>
          </div>
        </div>
      </div>

      {/* Historical Ownership Chain */}
      <div className="xc ai a2"><div className="xh"><h3>Ownership Chain — CC-004</h3><div className="appr-badge"><I n="database" s={12}/> Blockchain Verified</div></div>
        <div className="xb">
          <div className="chain">
            {OWNERSHIP_HISTORY["CC-004"]?.map((h,i)=>(
              <div key={i} className="chain-node"><div className="cn-date">{new Date(h.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div><div className="cn-event">{h.event}</div><div className="cn-actor"><I n="user" s={11} st={{display:"inline",verticalAlign:"-2px"}}/> {h.actor}</div><div className="cn-ref">{h.ref}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>);
  };

  // ── SUBDIVISION & MERGER ──
    const Subdivision=()=>(<div className="pc"><PageHero badge="Land Services" title="Subdivision & Merger" sub="Plot Reconfiguration" desc="Submit applications for plot subdivision or merger through our digital processing portal." img={IM.p4} imgK="p4"/>

    <div style={{display:"flex",gap:10,marginBottom:18}}>
      {["subdivide","merge"].map(t=>(<button key={t} className={`bp bsm ${subType===t?"":"bpo"}`} onClick={()=>setSubType(t)}><I n={t==="subdivide"?"split":"merge"} s={15}/> {t==="subdivide"?"Subdivide Plot":"Merge Plots"}</button>))}
    </div>

    <div className="xc ai a1"><div className="xh"><h3>{subType==="subdivide"?"Subdivision Request":"Merger Request"}</h3></div><div className="xb">
      {subType==="subdivide"?<>
        <div className="fr"><div className="fg"><label className="fl">Parent Plot ID *</label><div className="fw"><I n="map" s={16}/><input className="fi" placeholder="e.g. NL-002"/></div></div><div className="fg"><label className="fl">Number of Portions</label><select className="fi fip"><option>2 Portions</option><option>3 Portions</option><option>4 Portions</option></select></div></div>
        <div className="fg"><label className="fl">Reason for Subdivision</label><select className="fi fip"><option>Sale of Portion</option><option>Family Partition</option><option>Development Phasing</option><option>Court Order</option></select></div>

        {/* Survey Plan Re-drawing Preview */}
        <div style={{background:"var(--s1)",borderRadius:12,padding:20,marginTop:14,marginBottom:14}}>
          <div style={{fontSize:10,fontWeight:700,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Proposed Survey Re-Drawing</div>
          <div style={{display:"flex",gap:12,justifyContent:"center",alignItems:"center"}}>
            <div style={{width:140,height:100,border:"2px solid var(--g6)",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--g0)"}}><span style={{fontSize:12,fontWeight:700,color:"var(--g7)"}}>NL-002<br/><span style={{fontSize:10,fontWeight:400}}>1000 m²</span></span></div>
            <I n="arrow" s={20}/>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              <div style={{width:140,height:46,border:"2px dashed var(--d4)",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--d1)"}}><span style={{fontSize:11,fontWeight:700,color:"var(--d6)"}}>NL-002A — 500 m²</span></div>
              <div style={{width:140,height:46,border:"2px dashed var(--d4)",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--d1)"}}><span style={{fontSize:11,fontWeight:700,color:"var(--d6)"}}>NL-002B — 500 m²</span></div>
            </div>
          </div>
        </div>
      </>:<>
        <div className="fr"><div className="fg"><label className="fl">Plot 1 *</label><div className="fw"><I n="map" s={16}/><input className="fi" placeholder="e.g. CC-001"/></div></div><div className="fg"><label className="fl">Plot 2 *</label><div className="fw"><I n="map" s={16}/><input className="fi" placeholder="e.g. CC-002"/></div></div></div>
        <div className="fg"><label className="fl">Reason for Merger</label><select className="fi fip"><option>Combined Development</option><option>Same Owner Consolidation</option><option>Court Order</option></select></div>
        <div style={{background:"var(--s1)",borderRadius:12,padding:20,marginTop:14,marginBottom:14}}>
          <div style={{fontSize:10,fontWeight:700,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Proposed Merger Preview</div>
          <div style={{display:"flex",gap:12,justifyContent:"center",alignItems:"center"}}>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              <div style={{width:100,height:46,border:"2px solid var(--s3)",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--w)"}}><span style={{fontSize:10,fontWeight:700,color:"var(--s6)"}}>CC-001 — 500 m²</span></div>
              <div style={{width:100,height:46,border:"2px solid var(--s3)",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--w)"}}><span style={{fontSize:10,fontWeight:700,color:"var(--s6)"}}>CC-002 — 600 m²</span></div>
            </div>
            <I n="arrow" s={20}/>
            <div style={{width:140,height:100,border:"2px dashed var(--g6)",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--g0)"}}><span style={{fontSize:12,fontWeight:700,color:"var(--g7)"}}>CC-001M<br/><span style={{fontSize:10,fontWeight:400}}>1100 m²</span></span></div>
          </div>
        </div>
      </>}

      {["Current Survey Plan","Consent Letters","Tax Clearance"].map((d,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:i<2?"1px solid var(--s1)":"none"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:32,height:32,borderRadius:7,background:uploads["sub_"+i]?"var(--g1)":"var(--s1)",display:"flex",alignItems:"center",justifyContent:"center",color:uploads["sub_"+i]?"var(--g7)":"var(--s4)"}}><I n={uploads["sub_"+i]?"check":"upload"} s={14}/></div><span style={{fontSize:13}}>{d}</span></div>
          <button className="xbtn" onClick={()=>togU("sub_"+i)}>{uploads["sub_"+i]?"Done":"Upload"}</button>
        </div>))}

      <div style={{display:"flex",gap:10,marginTop:16}}><button className="bp" style={{maxWidth:260}} onClick={()=>show(subType==="subdivide"?"Subdivision request submitted! Ref: SUB-2026-003":"Merger request submitted! Ref: MRG-2026-001")}><I n={subType==="subdivide"?"split":"merge"} s={15}/> Submit {subType==="subdivide"?"Subdivision":"Merger"} Request</button></div>
    </div></div>
  </div>);

  // ── APPLICATION TRACKER ──
  const AppTracker=()=>{
    const heroAT=<PageHero badge="Tracking" title="Application Tracker" sub="Status Monitoring" desc="Track the real-time status of all your submitted applications, from verification requests to building plan approvals." img={IM.d2} imgK="d2"/>;
    const filtered=appFilter==="all"?APPLICATIONS:APPLICATIONS.filter(a=>a.status===appFilter);
    return(<div className="pc">{heroAT}

      <div style={{display:"flex",gap:8,marginBottom:18}}>
        {[["all","All"],["submitted","Submitted"],["in-review","In Review"],["completed","Completed"]].map(([k,l])=>(<button key={k} className={`bp bsm ${appFilter===k?"":"bpo"}`} onClick={()=>setAppFilter(k)}>{l}</button>))}
      </div>

      {filtered.map((app,i)=>(
        <div key={i} className={`xc ai a${(i%3)+1}`}>
          <div className="xh"><h3>{app.type} — {app.plot}</h3><div style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:700,background:app.status==="completed"?"var(--g1)":app.status==="in-review"?"var(--d1)":"var(--b1)",color:app.status==="completed"?"var(--g7)":app.status==="in-review"?"var(--d6)":"var(--b5)"}}>{app.status==="completed"?"Completed":app.status==="in-review"?"In Review":"Submitted"}</div></div>
          <div className="xb">
            <div style={{display:"flex",gap:16,marginBottom:16,fontSize:12,color:"var(--s5)"}}>
              <span><strong>Ref:</strong> {app.id}</span><span><strong>Estate:</strong> {app.estate}</span><span><strong>Date:</strong> {new Date(app.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
            </div>
            {/* Timeline */}
            <div className="timeline">
              {app.steps.map((st,j)=>{
                const isActive=st.done&&!app.steps[j+1]?.done;
                return(<div key={j} className="tl-item"><div className={`tl-dot ${st.done?"done":""} ${isActive?"active":""}`}/><div className="tl-content"><h5>{st.s}</h5>{st.d&&<div className="tl-date">{new Date(st.d).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div>}{!st.done&&!isActive&&<p>Pending</p>}{isActive&&<p style={{color:"var(--d6)",fontWeight:600}}>Currently processing...</p>}</div></div>);
              })}
            </div>
          </div>
        </div>
      ))}
    </div>);
  };

  // ── APPOINTMENTS ──
  const AppointmentPage=()=>(<div className="pc"><PageHero badge="Schedule" title="Book Appointment" sub="Consultation Booking" desc="Schedule a consultation with our team for land matters, document verification, or project approvals." img={IM.p3} imgK="p3"/>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
      <div className="xc ai a1"><div className="xh"><h3>Book Appointment</h3></div><div className="xb">
        <div className="fr"><div className="fg"><label className="fl">Date *</label><div className="fw"><I n="calendar" s={16}/><input className="fi" type="date" value={aptDate} onChange={e=>setAptDate(e.target.value)}/></div></div><div className="fg"><label className="fl">Time Slot</label><select className="fi fip" value={aptTime} onChange={e=>setAptTime(e.target.value)}><option>9:00 AM</option><option>10:00 AM</option><option>11:00 AM</option><option>1:00 PM</option><option>2:00 PM</option><option>3:00 PM</option></select></div></div>
        <div className="fg"><label className="fl">Department</label><select className="fi fip" value={aptDept} onChange={e=>setAptDept(e.target.value)}><option>Land Registry</option><option>Survey Division</option><option>Town Planning</option><option>Accounts / Revenue</option><option>Legal Division</option><option>Hon. Commissioner's Office</option></select></div>
        <div className="fg"><label className="fl">Purpose</label><div className="fw"><I n="file" s={16}/><input className="fi" placeholder="e.g. Document collection, Survey review" value={aptPurpose} onChange={e=>setAptPurpose(e.target.value)}/></div></div>
        <button className="bp" style={{maxWidth:260}} onClick={()=>{if(!aptDate||!aptPurpose)return show("Please complete all required fields before booking");setMyApts([...myApts,{id:"APT-"+String(Math.random()).slice(2,5),date:aptDate,time:aptTime,officer:"TBA",dept:aptDept,purpose:aptPurpose,status:"pending"}]);setAptDate("");setAptPurpose("");show("Appointment booked successfully. You will receive a confirmation.")}}><I n="calendar" s={15}/> Book Appointment</button>
      </div></div>

      <div className="xc ai a2"><div className="xh"><h3>My Appointments</h3></div><div className="xb" style={{padding:0}}>
        {myApts.length===0?<div style={{padding:40,textAlign:"center",color:"var(--s4)"}}>No appointments scheduled</div>:myApts.map((apt,i)=>(
          <div key={i} style={{display:"flex",gap:14,padding:"16px 22px",borderBottom:i<myApts.length-1?"1px solid var(--s1)":"none",alignItems:"center"}}>
            <div style={{width:50,textAlign:"center",flexShrink:0}}><div style={{fontSize:20,fontWeight:700,color:"var(--g7)",fontFamily:"'Playfair Display',serif"}}>{new Date(apt.date+"T00:00:00").getDate()}</div><div style={{fontSize:10,color:"var(--s4)",textTransform:"uppercase"}}>{new Date(apt.date+"T00:00:00").toLocaleDateString("en-GB",{month:"short"})}</div></div>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:"var(--s8)"}}>{apt.purpose}</div><div style={{fontSize:11.5,color:"var(--s5)",marginTop:2}}>{apt.dept} \u2022 {apt.time} \u2022 {apt.officer}</div></div>
            <div style={{padding:"4px 10px",borderRadius:6,fontSize:10,fontWeight:700,background:apt.status==="confirmed"?"var(--g1)":"var(--d1)",color:apt.status==="confirmed"?"var(--g7)":"var(--d6)"}}>{apt.status==="confirmed"?"Confirmed":"Pending"}</div>
          </div>))}
      </div></div>
    </div>
  </div>);

  // ── LIVE CHAT ──
  const LiveChat=()=>{
    const heroLC=<PageHero badge="Support" title="Live Chat" sub="Real-Time Assistance" desc="Connect with our support team for immediate assistance with your land queries and applications." img={IM.d2} imgK="d2"/>;
    const sendMsg=()=>{if(!chatInput.trim())return;setChatMsgs([...chatMsgs,{id:Date.now(),from:"user",msg:chatInput,time:new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})}]);setChatInput("");setTimeout(()=>{setChatMsgs(prev=>[...prev,{id:Date.now()+1,from:"officer",name:"Mrs. Obi",msg:"Thank you for your message. I'm reviewing your request and will respond shortly. Please allow a few moments.",time:new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})}])},2000)};
    return(<div className="pc">{heroLC}
      <div className="xc ai a1" style={{overflow:"hidden"}}>
        <div className="xh"><h3>Support Chat</h3><span style={{fontSize:11,color:"var(--s4)"}}>Session ID: CS-{Date.now().toString(36).toUpperCase()}</span></div>
        <div className="chat-box">
          <div className="chat-msgs">
            {chatMsgs.map(m=>(<div key={m.id} className={`chat-msg ${m.from==="user"?"usr":m.from==="officer"?"ofc":"sys"}`}>{m.from==="officer"&&<div className="cm-name"><I n="user" s={10} st={{display:"inline",verticalAlign:"-1px"}}/> {m.name}</div>}{m.msg}<div className="cm-time">{m.time}</div></div>))}
          </div>
          <div className="chat-input"><input placeholder="Type your message..." value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()}/><button onClick={sendMsg}><I n="send" s={15}/></button></div>
        </div>
      </div>
    </div>);
  };

  // ── DOCUMENT VAULT ──
  const DocVault=()=>{
    const heroDV=<PageHero badge="Documents" title="Document Vault" sub="Secure Document Repository" desc="Access your verified documents, certificates of occupancy, survey plans, and all official land documentation." img={IM.p1} imgK="p1"/>;
    const types=[...new Set(DOC_VAULT.map(d=>d.type))];
    const filtered=vaultFilter==="all"?DOC_VAULT:DOC_VAULT.filter(d=>d.type===vaultFilter);
    return(<div className="pc">{heroDV}

      <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap"}}>
        <button className={`bp bsm ${vaultFilter==="all"?"":"bpo"}`} onClick={()=>setVaultFilter("all")}>All</button>
        {types.map(t=>(<button key={t} className={`bp bsm ${vaultFilter===t?"":"bpo"}`} onClick={()=>setVaultFilter(t)}>{t}</button>))}
      </div>

      <div className="xc ai a1"><div className="xh"><h3>{filtered.length} Documents</h3><button className="xbtn gd"><I n="upload" s={13}/> Upload New</button></div>
        <div style={{padding:0}}>
          {filtered.map((doc,i)=>(
            <div key={i} className="dv-card">
              <div className={`dv-icon ${doc.ext==="pdf"?"pdf":"doc"}`}><I n="file" s={20}/></div>
              <div className="dv-info"><h5>{doc.name}</h5><p>{doc.type} \u2022 {doc.plot} \u2022 {doc.size} \u2022 {new Date(doc.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</p></div>
              <div className="dv-actions">
                <button className="xbtn" onClick={()=>show("Downloading "+doc.name)}><I n="download" s={13}/></button>
                <button className="xbtn" onClick={()=>show("Document shared via email successfully")}><I n="send" s={13}/></button>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
  };

  // ── RECEIPT HISTORY ──
  const ReceiptHistory=()=>{
    const heroRH=<PageHero badge="Finance" title="Receipt History" sub="Transaction Records" desc="View and download payment receipts for all your completed transactions." img={IM.e4} imgK="e4"/>;
    const types=[...new Set(RECEIPTS.map(r=>r.type))];
    const filtered=receiptFilter==="all"?RECEIPTS:RECEIPTS.filter(r=>r.type===receiptFilter);
    return(<div className="pc">{heroRH}

      <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap"}}>
        <button className={`bp bsm ${receiptFilter==="all"?"":"bpo"}`} onClick={()=>setReceiptFilter("all")}>All</button>
        {types.map(t=>(<button key={t} className={`bp bsm ${receiptFilter===t?"":"bpo"}`} onClick={()=>setReceiptFilter(t)}>{t}</button>))}
      </div>

      <div className="xc ai a1"><div className="xb" style={{padding:0}}>
        {filtered.map((r,i)=>(
          <div key={i} style={{display:"flex",gap:14,padding:"16px 22px",borderBottom:i<filtered.length-1?"1px solid var(--s1)":"none",alignItems:"center",flexWrap:"wrap"}}>
            <div style={{width:44,height:44,borderRadius:10,background:"var(--g1)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--g7)",flexShrink:0}}><I n="check" s={18}/></div>
            <div style={{flex:1,minWidth:180}}>
              <div style={{fontSize:13.5,fontWeight:600,color:"var(--s8)"}}>{r.type}</div>
              <div style={{fontSize:11.5,color:"var(--s5)",marginTop:2}}>Plot {r.plot} \u2022 Ref: {r.ref}</div>
              <div style={{fontSize:10.5,color:"var(--s4)",marginTop:1}}>{new Date(r.date).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"var(--g7)"}}>₦{Number(r.amount).toLocaleString()}</div>
              <div style={{display:"flex",gap:6,marginTop:6,justifyContent:"flex-end"}}>
                <button className="xbtn" onClick={()=>show("Downloading receipt "+r.ref)}><I n="download" s={12}/> PDF</button>
                <button className="xbtn" onClick={()=>show("QR verification link copied to clipboard")}><I n="qr" s={12}/> Verify</button>
              </div>
            </div>
            <div style={{flexShrink:0}}><QR data={r.ref} size={48}/></div>
          </div>))}
      </div></div>
    </div>);
  };

  // ── ADMIN DASHBOARD ──
  const AdminDash=()=>{
    const heroAD=<PageHero badge="Administration" title="Admin Dashboard" sub="System Management Console" desc="Manage estates, review applications, approve transfers, and monitor platform activity." img={IM.aerial} imgK="aerial"/>;
    const roles=["Super Admin","Surveyor","Accounts","Legal","Viewer"];
    const revData=[{m:"Sep",v:32},{m:"Oct",v:45},{m:"Nov",v:38},{m:"Dec",v:52},{m:"Jan",v:61},{m:"Feb",v:48}];
    const maxRev=Math.max(...revData.map(r=>r.v));
    return(<div className="pc">{heroAD}
      <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:10,marginBottom:18}}>
        <select style={{background:"var(--w)",border:"1px solid var(--s2)",color:"var(--s7)",padding:"8px 14px",borderRadius:10,fontSize:12,fontFamily:"inherit"}} value={adminRole} onChange={e=>setAdminRole(e.target.value)}>{roles.map(r=>(<option key={r} value={r}>{r}</option>))}</select>
        <div style={{padding:"6px 14px",borderRadius:8,background:"linear-gradient(135deg,rgba(22,163,74,.12),rgba(22,163,74,.06))",color:"var(--g8)",fontSize:11,fontWeight:700,border:"1px solid rgba(22,163,74,.2)"}}><I n="key" s={12} st={{display:"inline",verticalAlign:"-2px"}}/> {adminRole}</div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:8,marginBottom:18}}>
        {[["overview","Overview"],["reports","Reports"],["bulk","Bulk Allocation"],["signatures","Digital Signatures"]].map(([k,l])=>(<button key={k} className={`bp bsm ${adminTab===k?"":"bpo"}`} onClick={()=>setAdminTab(k)}>{l}</button>))}
      </div>

      {adminTab==="overview"&&<>
        <div className="sg">{[{ic:"dollar",lb:"Revenue (MTD)",v:"₦238M",cl:"gn"},{ic:"file",lb:"Applications",v:"147",cl:"gd"},{ic:"check",lb:"Approved",v:"89",cl:"gn"},{ic:"clock",lb:"Pending",v:"58",cl:"bl"}].map((s,i)=>(
          <div key={i} className={`sc ai a${i+1}`}><div className="sch"><div className={`sci ${s.cl}`}><I n={s.ic} s={19}/></div><span className="scl">{s.lb}</span></div><div className="scv">{s.v}</div></div>))}</div>

        {/* Revenue Chart */}
        <div className="xc ai a2"><div className="xh"><h3>Monthly Revenue (₦ Millions)</h3></div><div className="xb">
          <div style={{display:"flex",alignItems:"flex-end",gap:14,height:160}}>
            {revData.map((r,i)=>(<div key={i} style={{flex:1,textAlign:"center"}}>
              <div style={{fontSize:11,fontWeight:700,color:"var(--g7)",marginBottom:4}}>₦{r.v}M</div>
              <div style={{height:120,display:"flex",alignItems:"flex-end"}}><div className="admin-bar" style={{width:"100%",height:`${(r.v/maxRev)*100}%`,background:`linear-gradient(180deg,var(--g6),var(--d4))`}}/></div>
              <div style={{fontSize:10,color:"var(--s4)",marginTop:6}}>{r.m}</div>
            </div>))}
          </div>
        </div></div>

        {/* Role-based Users */}
        <div className="xc ai a3"><div className="xh"><h3>Staff & Role Access</h3></div><div className="xb" style={{padding:0}}>
          {[{name:"Mrs. Ngozi Obi",role:"Super Admin",dept:"Land Registry",status:"Active",last:"2 min ago"},
            {name:"Mr. Chidi Eze",role:"Surveyor",dept:"Survey Division",status:"Active",last:"15 min ago"},
            {name:"Mrs. Ada Nnamdi",role:"Accounts",dept:"Revenue Unit",status:"Active",last:"1 hr ago"},
            {name:"Barr. Kalu Okeke",role:"Legal",dept:"Legal Division",status:"Offline",last:"Yesterday"},
            {name:"Mr. Emeka Igwe",role:"Viewer",dept:"Records",status:"Active",last:"30 min ago"},
          ].map((u,i)=>(
            <div key={i} style={{display:"flex",gap:12,padding:"14px 22px",borderBottom:i<4?"1px solid var(--s1)":"none",alignItems:"center"}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,var(--g7),var(--g8))",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--w)",fontSize:12,fontWeight:700}}>{u.name.split(" ").map(w=>w[0]).join("")}</div>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{u.name}</div><div style={{fontSize:11,color:"var(--s5)"}}>{u.dept}</div></div>
              <div style={{padding:"3px 8px",borderRadius:5,fontSize:10,fontWeight:700,background:u.role==="Super Admin"?"var(--g1)":u.role==="Surveyor"?"var(--b1)":u.role==="Accounts"?"var(--d1)":u.role==="Legal"?"var(--o1)":"var(--s1)",color:u.role==="Super Admin"?"var(--g7)":u.role==="Surveyor"?"var(--b5)":u.role==="Accounts"?"var(--d6)":u.role==="Legal"?"var(--o5)":"var(--s5)"}}>{u.role}</div>
              <div style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:u.status==="Active"?"var(--g6)":"var(--s4)"}}><span style={{width:6,height:6,borderRadius:"50%",background:u.status==="Active"?"#22c55e":"var(--s3)"}}/>{u.last}</div>
            </div>))}
        </div></div>
      </>}

      {adminTab==="reports"&&<div className="xc ai a1"><div className="xh"><h3>Report Generation</h3><button className="xbtn gd" onClick={()=>show("Report generated and downloaded")}><I n="download" s={13}/> Export All</button></div><div className="xb">
        {[{t:"Monthly Revenue Report",d:"February 2026",ic:"dollar"},{t:"Plot Allocation Summary",d:"Q1 2026",ic:"map"},{t:"Dispute Resolution Stats",d:"2025 Annual",ic:"shield"},{t:"Ground Rent Collection",d:"January 2026",ic:"home"},{t:"Ownership Transfer Log",d:"2026 YTD",ic:"transfer"},{t:"Application Processing Times",d:"February 2026",ic:"clock"}].map((r,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:i<5?"1px solid var(--s1)":"none"}}>
            <div style={{width:40,height:40,borderRadius:9,background:"var(--g1)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--g7)"}}><I n={r.ic} s={18}/></div>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{r.t}</div><div style={{fontSize:11,color:"var(--s4)"}}>{r.d}</div></div>
            <button className="xbtn" onClick={()=>show("Generating: "+r.t)}><I n="download" s={13}/> PDF</button>
            <button className="xbtn" onClick={()=>show("Generating: "+r.t)}><I n="bar" s={13}/> Excel</button>
          </div>))}
      </div></div>}

      {adminTab==="bulk"&&<div className="xc ai a1"><div className="xh"><h3>Bulk Allocation Processing</h3></div><div className="xb">
        <div className="fg"><label className="fl">Select Estate</label><select className="fi fip">{ESTATES.map(e=>(<option key={e.id}>{e.name}</option>))}</select></div>
        <div className="fr"><div className="fg"><label className="fl">Block</label><select className="fi fip"><option>All Blocks</option><option>Block A</option><option>Block B</option><option>Block C</option></select></div><div className="fg"><label className="fl">Plot Status</label><select className="fi fip"><option>Available Only</option><option>All Plots</option></select></div></div>
        <div className="fg"><label className="fl">Bulk Action</label><select className="fi fip"><option>Allocate to Applicants Queue</option><option>Mark as Reserved</option><option>Update Price (Batch)</option><option>Generate Allocation Papers</option></select></div>
        <div style={{background:"var(--d1)",borderRadius:10,padding:14,marginTop:8,marginBottom:14,fontSize:12,color:"var(--d6)",display:"flex",gap:10,alignItems:"flex-start"}}><I n="alertcircle" s={16}/><div><strong>Warning:</strong> Bulk allocation will process all matching plots simultaneously. This action requires Super Admin authorisation and every change will be recorded in the audit trail.</div></div>
        <button className="bp" style={{maxWidth:300}} onClick={()=>show("Bulk allocation initiated for Centenary City Estate. 12 plots queued for processing.")}><I n="check" s={15}/> Execute Bulk Action</button>
      </div></div>}

      {adminTab==="signatures"&&<div className="xc ai a1"><div className="xh"><h3>Digital Signature & Stamp System</h3></div><div className="xb">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
          <div style={{background:"var(--s1)",borderRadius:12,padding:20,textAlign:"center"}}>
            <div style={{marginBottom:12,fontSize:10,fontWeight:700,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1}}>Official Stamp</div>
            <div className="stamp-box" style={{margin:"0 auto"}}><span className="st1">Project Sales</span><span className="st2">&</span><span className="st3">Developments</span></div>
            <div style={{marginTop:12,fontSize:11,color:"var(--s5)"}}>Automatically applied to all official documents</div>
          </div>
          <div style={{background:"var(--s1)",borderRadius:12,padding:20,textAlign:"center"}}>
            <div style={{marginBottom:12,fontSize:10,fontWeight:700,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1}}>Permanent Secretary Signature</div>
            <div className="sig-box"><div className="sig">Dr. C. N. Ozoemena</div><div className="sig-l">Permanent Secretary</div></div>
            <div style={{marginTop:14}}><QR data="SIG-PS-ENUGU" size={60}/></div>
            <div style={{marginTop:6,fontSize:11,color:"var(--s5)"}}>Digitally signed and independently verifiable</div>
          </div>
        </div>
        <div style={{marginTop:18,background:"var(--g0)",borderRadius:10,padding:14,fontSize:12,color:"var(--g7)",display:"flex",gap:10,alignItems:"flex-start"}}><I n="shield" s={16}/><div><strong>Blockchain-backed:</strong> All signatures are cryptographically hashed and recorded on the blockchain. Any document bearing these signatures can be verified by scanning the QR code or entering the reference number at verify.enugu.gov.ng</div></div>
      </div></div>}
    </div>);
  };

  // ── AUDIT TRAIL ──
    const AuditTrail=()=>(<div className="pc"><PageHero badge="Security" title="Audit Trail" sub="Compliance & Activity Log" desc="Complete activity log of all transactions, verifications, and administrative actions on the platform." img={IM.d3} imgK="d3"/>
    <div className="xc ai a1"><div className="xh"><h3>{AUDIT_LOG.length} Actions Logged</h3><button className="xbtn gd" onClick={()=>show("Audit log exported successfully")}><I n="download" s={13}/> Export</button></div>
      <div style={{padding:0,overflowX:"auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"140px 160px 140px 100px 80px 1fr",padding:"10px 18px",background:"var(--s1)",fontSize:10.5,fontWeight:700,color:"var(--s4)",textTransform:"uppercase",letterSpacing:.5,gap:10,minWidth:700}}>
          <span>Timestamp</span><span>Action</span><span>User</span><span>Officer</span><span>Plot</span><span>Details</span>
        </div>
        {AUDIT_LOG.map((log,i)=>(
          <div key={i} className="al-row" style={{display:"grid",gridTemplateColumns:"140px 160px 140px 100px 80px 1fr",gap:10,minWidth:700}}>
            <span style={{fontSize:11.5,color:"var(--s4)",fontFamily:"monospace"}}>{log.time}</span>
            <span style={{fontWeight:600,color:"var(--s8)"}}>{log.action}</span>
            <span style={{color:"var(--s6)"}}>{log.user}</span>
            <span style={{color:"var(--s5)"}}>{log.officer}</span>
            <span style={{fontFamily:"monospace",color:"var(--g7)",fontWeight:600}}>{log.plot}</span>
            <span style={{color:"var(--s5)"}}>{log.detail}</span>
          </div>
        ))}
      </div>
    </div>
  </div>);

  // ── NEWS & UPDATES ──
  const NewsPage=()=>(<div className="pc"><PageHero badge="Updates" title="News & Announcements" sub="Latest Updates" desc="Stay informed about policy updates, new estate developments, and important announcements from our development team." img={IM.aerial} imgK="aerial"/>

    {newsId!==null?(() => {
      const n=NEWS.find(x=>x.id===newsId);if(!n)return null;
      const catCl=n.cat==="Announcement"?"ann":n.cat==="Notice"?"not":n.cat==="Technology"?"tec":n.cat==="Projects"?"prj":"reg";
      return(<div className="xc ai a1">
        <button className="pdb" onClick={()=>setNewsId(null)}><I n="arrowLeft" s={14}/> Back to News</button>
        <div style={{height:220,borderRadius:12,overflow:"hidden",margin:"0 22px",position:"relative"}}><Img src={n.img} alt={n.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/><div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 40%,rgba(0,0,0,.6))"}}/></div>
        <div className="xb">
          <span className={`news-cat ${catCl}`}>{n.cat}</span>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"var(--g8)",margin:"12px 0 6px"}}>{n.title}</h2>
          <div style={{fontSize:12,color:"var(--s4)",marginBottom:16}}><I n="calendar" s={12} st={{display:"inline",verticalAlign:"-2px"}}/> {new Date(n.date).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</div>
          <p style={{fontSize:14,color:"var(--s6)",lineHeight:1.8}}>{n.summary}</p>
          <p style={{fontSize:14,color:"var(--s6)",lineHeight:1.8,marginTop:12}}>Project Sales & Developments continues to advance its digital transformation agenda. Investors and clients are encouraged to utilize the platform for all land and property services. For enquiries, please use the Live Chat feature or book an appointment via the Appointments portal.</p>
          <div style={{marginTop:18,display:"flex",gap:10}}><button className="xbtn" onClick={()=>show("Article shared successfully")}><I n="send" s={13}/> Share</button><button className="xbtn" onClick={()=>show("Article saved to your device")}><I n="download" s={13}/> Save</button></div>
        </div>
      </div>);
    })():(
      <div className="xc ai a1"><div className="xb" style={{padding:0}}>
        {NEWS.map((n,i)=>{
          const catCl=n.cat==="Announcement"?"ann":n.cat==="Notice"?"not":n.cat==="Technology"?"tec":n.cat==="Projects"?"prj":"reg";
          return(<div key={i} className="news-card" onClick={()=>setNewsId(n.id)}>
            <div className="news-img"><Img src={n.img} alt={n.title}/></div>
            <div className="news-body"><span className={`news-cat ${catCl}`}>{n.cat}</span><h4 style={{marginTop:6}}>{n.title}</h4><p>{n.summary}</p>
              <div className="news-meta"><I n="calendar" s={11}/> {new Date(n.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div>
            </div>
          </div>);
        })}
      </div></div>
    )}
  </div>);

  const titles={dashboard:"Dashboard","plot-verification":"Plot Verification","land-sales":"Estates","my-cart":"My Cart",portfolio:"Property Portfolio",projects:"Projects & Developments","ownership-transfer":"Ownership Transfer",subdivision:"Subdivision & Merger","app-tracker":"Application Tracker",appointments:"Book Appointment","live-chat":"Live Support","doc-vault":"Document Vault",payments:"Payments","ground-rent":"Ground Rent","receipt-history":"Receipt History",admin:"Admin Dashboard","audit-trail":"Audit Trail",news:"News & Announcements",services:"All Services",enquiry:"Submit Enquiry",faq:"Help Centre",profile:"Profile & KYC",settings:"Settings"};
  const pages={dashboard:Dashboard,"plot-verification":PlotVerify,"land-sales":LandSales,"my-cart":MyCart,portfolio:Portfolio,projects:Projects,"ownership-transfer":OwnershipTransfer,subdivision:Subdivision,"app-tracker":AppTracker,appointments:AppointmentPage,"live-chat":LiveChat,"doc-vault":DocVault,payments:Payments,"ground-rent":GroundRent,"receipt-history":ReceiptHistory,admin:AdminDash,"audit-trail":AuditTrail,news:NewsPage,services:Services,enquiry:Enquiry,faq:FAQ,profile:Profile,settings:Settings};

  if(pg==="login") return (<><style>{CSS}</style>{LoginPage()}<div id="psd-toast" className="tst" style={{display:'none',opacity:0,transition:'opacity .4s'}}></div></>);
  if(pg==="register") return (<><style>{CSS}</style>{RegisterPage()}<div id="psd-toast" className="tst" style={{display:'none',opacity:0,transition:'opacity .4s'}}></div></>);
  const Page=pages[pg]||Dashboard;
  return (<><style>{CSS}</style><div className="db"><Sidebar/><div className="mc"><div className="page-bg"><Img src={IM.bg1} k="bg1" alt=""/></div><TopBar title={titles[pg]||"Dashboard"}/><Page/></div></div><div id="psd-toast" className="tst" style={{display:'none',opacity:0,transition:'opacity .4s'}}></div>
    {/* Floating Contact Button — Royal Estates */}
    <button className="float-btn" onClick={()=>setFloatOpen(!floatOpen)}><I n={floatOpen?"x":"crown"} s={24}/><span className="notif">1</span></button>
    {floatOpen&&<div className="float-menu">{[
      {ic:"message",t:"Live Support",cl:"var(--g1)",cc:"var(--g7)",p:"live-chat"},
      {ic:"mail",t:"Submit Enquiry",cl:"var(--d1)",cc:"var(--d6)",p:"enquiry"},
      {ic:"phone",t:"Call Us",cl:"var(--b1)",cc:"var(--b5)",p:null},
      {ic:"calendar",t:"Book Appointment",cl:"var(--g1)",cc:"var(--g7)",p:"appointments"},
    ].map((f,i)=>(<button key={i} className="float-item" onClick={()=>{setFloatOpen(false);if(f.p)nav(f.p);else show("Dialling +234 42 256 7890...")}}><div className="fi-icon" style={{background:f.cl,color:f.cc}}><I n={f.ic} s={16}/></div>{f.t}</button>))}</div>}{showModal==="search"&&<SearchFeeModal/>}{showModal==="pending"&&<PendingModal/>}{showModal==="info"&&<PlotInfoModal/>}{showModal==="interest-confirm"&&selPlot&&(<div className="modal-bg" onClick={()=>setShowModal(null)}><div className="modal" style={{maxWidth:480}} onClick={e=>e.stopPropagation()}><div className="modal-h"><h3>Purchase Interest Registered</h3><button onClick={()=>setShowModal(null)}><I n="x" s={20}/></button></div><div className="modal-b" style={{textAlign:"center",padding:"32px 24px"}}><div style={{width:70,height:70,borderRadius:"50%",background:"linear-gradient(135deg,var(--g1),var(--d1))",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",border:"2px solid var(--g6)"}}><I n="checkcircle" s={34}/></div><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:"var(--g8)",marginBottom:8}}>Interest Successfully Registered</h3><p style={{fontSize:13.5,color:"var(--s6)",lineHeight:1.7,marginBottom:20}}>Your intent to purchase <strong>Plot {selPlot.id}</strong> at <strong>{selEstate?.name}</strong> has been formally recorded.</p><div style={{background:"var(--s1)",borderRadius:12,padding:18,textAlign:"left",marginBottom:18,border:"1px solid var(--s2)"}}><div style={{fontSize:10,fontWeight:700,color:"var(--s4)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Next Steps</div>{[{n:"1",t:"Application Review",d:"Our team will review your application within 24 working hours"},{n:"2",t:"Approval Notification",d:"An official approval letter will be sent to your registered email"},{n:"3",t:"Cart Updated",d:"The approved plot will appear in your Cart for payment"},{n:"4",t:"Complete Purchase",d:"Finalise payment to secure your allocation"},].map((s,i)=>(<div key={i} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:i<3?"1px solid var(--s2)":"none"}}><div style={{width:28,height:28,borderRadius:"50%",background:"var(--g1)",color:"var(--g7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>{s.n}</div><div><div style={{fontSize:13,fontWeight:600,color:"var(--s8)"}}>{s.t}</div><div style={{fontSize:12,color:"var(--s5)",marginTop:1}}>{s.d}</div></div></div>))}</div><div style={{background:"linear-gradient(135deg,var(--g0),var(--d1))",borderRadius:12,padding:16,marginBottom:18,border:"1px solid rgba(13,110,93,.12)",textAlign:"left"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><I n="mail" s={16}/><span style={{fontSize:13,fontWeight:600,color:"var(--g8)"}}>Email Confirmation</span></div><p style={{fontSize:12,color:"var(--s6)",lineHeight:1.6}}>You will receive an approval letter at <strong>{user.em||"your registered email"}</strong> within 24 hours. Please check your inbox and spam folder.</p></div><div style={{display:"flex",gap:10}}><button className="bp" style={{flex:1}} onClick={()=>{setShowModal(null);nav("my-cart")}}>Go to Cart</button><button className="bp bpo" style={{flex:1}} onClick={()=>setShowModal(null)}>Continue Browsing</button></div></div></div></div>)}</>);
}
