import { useState, useEffect, useRef, useCallback } from "react";
import ErrorAlert from './ErrorAlert';
import { useAuth } from "../auth/useAuth";


const C = {
  bg:      "#a7993b66",
  primary: "#7b0325",
  primL:   "#f9e8ed",
  white:   "#ffffff",
  text:    "#222",
  muted:   "#666",
  border:  "#ccc",
  danger:  "#c0392b",
  dangerL: "#fdecea",
  okL:     "#d4edda",
  okT:     "#155724",
  inputBg: "#fafafa",
};
const font = "sans-serif";

const s = {
  page:      { minHeight:"100vh", backgroundColor:C.bg, fontFamily:font, margin:"-8px", padding:"24px 16px 64px" },
  wrap:      { maxWidth:1160, margin:"0 auto" },
  topBar:    { display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 20, marginBottom: 25, borderBottom: `2px solid ${C.primary}`, flexWrap: "wrap", gap: 12 },  
  title:     { fontSize:38, fontWeight:"bold", color:C.primary, textShadow:"1px 1px 2px rgba(0,0,0,.12)", margin:0 },
  logoutBtn: { padding:"9px 20px", fontSize:15, fontWeight:600, cursor:"pointer", backgroundColor:"transparent", color:C.primary, border:`2px solid ${C.primary}`, borderRadius:4 },
  layout:    { display:"grid", gridTemplateColumns:"380px 1fr", gap:22, alignItems:"start" },
  card:      { backgroundColor:C.white, borderRadius:8, padding:26, boxShadow:"0 4px 18px rgba(0,0,0,.13)", marginBottom:20 },
  cardTitle: { fontSize:20, fontWeight:"bold", color:C.text, margin:"0 0 16px" },
  form:      { display:"flex", flexDirection:"column", gap:12 },
  label:     { fontSize:12, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:".04em", marginBottom:3 },
  fieldWrap: { display:"flex", flexDirection:"column" },
  input:     { padding:"11px 12px", fontSize:15, borderRadius:4, border:`1px solid ${C.border}`, outline:"none", color:C.text, fontFamily:font, backgroundColor:C.inputBg },
  inputErr:  { borderColor:C.danger },
  row2:      { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 },
  errTxt:    { fontSize:12, color:C.danger, marginTop:3 },
  
  btn:       { padding:"12px", fontSize:16, fontWeight:600, cursor:"pointer", backgroundColor:C.primary, color:C.white, border:"none", borderRadius:4 },
  btnSm:     { padding:"7px 14px", fontSize:13, fontWeight:600, cursor:"pointer", backgroundColor:C.primary, color:C.white, border:"none", borderRadius:4 },
  btnGhost:  { padding:"7px 14px", fontSize:13, fontWeight:600, cursor:"pointer", backgroundColor:"#eee", color:C.text, border:"none", borderRadius:4 },
  btnDanger: { padding:"7px 14px", fontSize:13, fontWeight:600, cursor:"pointer", backgroundColor:C.dangerL, color:C.danger, border:"none", borderRadius:4 },
  iconBtn:   { background: "none", border: "none", fontSize: 35, cursor: "pointer",color:C.primary, padding: "0 8px",display: "flex",alignItems: "center",justifyContent: "center"},

  alertOk:  { backgroundColor:C.okL, color:C.okT, border:"1px solid #c3e6cb", borderRadius:4, padding:"9px 14px", fontSize:14, marginBottom:12 },
  alertErr: { backgroundColor:"#f8d7da", color:"#721c24", border:"1px solid #f5c6cb", borderRadius:4, padding:"9px 14px", fontSize:14, marginBottom:12 },
  
  searchBox:   { position:"relative" },
  searchInput: { width:"100%", boxSizing:"border-box", padding:"10px 12px", fontSize:14, borderRadius:4, border:`1px solid ${C.border}`, outline:"none", fontFamily:font, backgroundColor:C.inputBg },
  dropdown:    { position:"absolute", top:"100%", left:0, right:0, backgroundColor:C.white, border:`1px solid ${C.border}`, borderRadius:4, boxShadow:"0 4px 12px rgba(0,0,0,.15)", zIndex:200, maxHeight:200, overflowY:"auto" },
  dropItem:    { padding:"9px 12px", fontSize:14, cursor:"pointer", borderBottom:`1px solid #f0f0f0`, color:C.text },

  destList:    { display:"flex", flexDirection:"column", gap:6, marginTop:8 },
  destChip:    { display:"flex", alignItems:"center", justifyContent:"space-between", backgroundColor:C.primL, borderRadius:6, padding:"7px 10px" },
  destChipNum: { backgroundColor:C.primary, color:C.white, borderRadius:"50%", width:20, height:20, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, marginRight:8, flexShrink:0 },
  destChipName:{ fontSize:14, fontWeight:600, color:C.primary, flex:1 },
  destChipSub: { fontSize:12, color:C.muted, marginLeft:6 },
  removeBtn:   { background:"none", border:"none", cursor:"pointer", color:C.primary, fontSize:16, lineHeight:1, padding:"0 2px" },
  
  tripList:    { display:"flex", flexDirection:"column", gap:14 },
  tripCard:    { backgroundColor:C.white, borderRadius:8, padding:18, boxShadow:"0 2px 10px rgba(0,0,0,.11)", borderLeft:`4px solid ${C.primary}`, cursor:"pointer", transition:"box-shadow .15s" },
  tripCardActive: { boxShadow:`0 0 0 2px ${C.primary}, 0 4px 18px rgba(0,0,0,.18)` },
  tripName:    { fontSize:17, fontWeight:"bold", color:C.primary, margin:0 },
  tripMeta:    { fontSize:13, color:C.muted, marginTop:4 },
  routeStops:  { display:"flex", flexWrap:"wrap", gap:6, marginTop:10 },
  stopBadge:   { display:"inline-flex", alignItems:"center", gap:5, backgroundColor:C.primL, color:C.primary, borderRadius:20, padding:"3px 10px", fontSize:13, fontWeight:600 },
  stopNum:     { backgroundColor:C.primary, color:C.white, borderRadius:"50%", width:17, height:17, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700 },
  routeLabel:  { display:"inline-block", backgroundColor:C.primary, color:C.white, borderRadius:20, padding:"3px 12px", fontSize:12, fontWeight:700, marginTop:8 },
  cardActions: { display:"flex", gap:8, marginTop:12 },
  
  mapWrap:     { backgroundColor:C.white, borderRadius:8, boxShadow:"0 4px 18px rgba(0,0,0,.13)", overflow:"hidden", position:"sticky", top:16 },
  mapHeader:   { padding:"14px 20px", borderBottom:"1px solid #eee", display:"flex", alignItems:"center", justifyContent:"space-between" },
  mapTitle:    { fontSize:16, fontWeight:"bold", color:C.text, margin:0 },
  mapHint:     { fontSize:13, color:C.muted },
  mapEl:       { width:"100%", height:500 },
  
  empty:     { textAlign:"center", padding:"36px 20px", color:C.muted },
  emptyIcon: { fontSize:44, marginBottom:10 },
 
  overlay:      { position:"fixed", inset:0, backgroundColor:"rgba(0,0,0,.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:16 },
  modal:        { backgroundColor:C.white, borderRadius:8, padding:28, width:"100%", maxWidth:380, boxShadow:"0 8px 32px rgba(0,0,0,.25)" },
  modalTitle:   { fontSize:20, fontWeight:"bold", color:C.text, margin:"0 0 8px" },
  modalBody:    { fontSize:15, color:C.muted, margin:"0 0 20px" },
  modalActions: { display:"flex", gap:10 },
};

const BASE = "http://localhost:8087";   
const tk   = () => localStorage.getItem("token") || "";
const hdr  = () => ({ "Content-Type":"application/json", Authorization:`Bearer ${tk()}` });
const api  = async (method, path, body) => {
  const res = await fetch(BASE + path, {
    method,
    headers: hdr(),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
};

const fmtDate = d => d ? new Date(d).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" }) : "—";

function loadLeaflet() {
  return new Promise(resolve => {
    if (window.L) return resolve(window.L);
    if (!document.getElementById("lf-css")) {
      const l = document.createElement("link");
      l.id = "lf-css"; l.rel = "stylesheet";
      l.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(l);
    }
    const sc = document.createElement("script");
    sc.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    sc.onload = () => resolve(window.L);
    document.head.appendChild(sc);
  });
}


function RouteMap({ trip }) {
  const divRef   = useRef(null);
  const mapRef   = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    let dead = false;
    const timer = setTimeout(() => {
      loadLeaflet().then(L => {
        if (dead || mapRef.current) return;
        const map = L.map(divRef.current, { zoomControl: true }).setView([48, 15], 4);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© <a href='https://openstreetmap.org'>OpenStreetMap</a>",
        }).addTo(map);
        layerRef.current = L.featureGroup().addTo(map);
        mapRef.current = map;
        mapRef.current._isReady = true;
      });
    }, 500);

    return () => { dead = true; clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const renderTrip = () => {
      if (!mapRef.current || !layerRef.current || !window.L) return;

      const L = window.L;
      const layer = layerRef.current;
      layer.clearLayers();

      setTimeout(() => mapRef.current?.invalidateSize(), 100);

      if (!trip || !trip.tripDestinations?.length) return;

      const stops = [...trip.tripDestinations]
        .sort((a, b) => a.dayIndex - b.dayIndex)
        .filter(td =>
          td?.destination != null &&
          typeof td.destination.latitude === "number" &&
          typeof td.destination.longitude === "number" &&
          isFinite(td.destination.latitude) &&
          isFinite(td.destination.longitude)
        );

      if (!stops.length) return;

      const coords = stops.map(td => [td.destination.latitude, td.destination.longitude]);

      if (coords.length > 1) {
        try {
          L.polyline(coords, { color: C.primary, weight: 3, opacity: .8, dashArray: "7 6" }).addTo(layer);
        } catch(_) {}
      }

      stops.forEach(td => {
        const { latitude, longitude } = td.destination;
        const icon = L.divIcon({
          className: "",
          html: `<div style="background:${C.primary};color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;font-family:sans-serif;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.4);">${td.dayIndex}</div>`,
          iconSize: [28, 28], iconAnchor: [14, 14],
        });
        try {
          L.marker([latitude, longitude], { icon })
            .addTo(layer)
            .bindPopup(`<b>${td.dayIndex}. ${td.destination.name}</b><br><small>${td.destination.city}, ${td.destination.country}</small>`);
        } catch(_) {}
      });

      try {
        const bounds = layer.getBounds();
        if (bounds.isValid()) mapRef.current.fitBounds(bounds.pad(0.3));
      } catch(_) {}
    };

    if (mapRef.current?._isReady) {
      renderTrip();
    } else {
      const interval = setInterval(() => {
        if (mapRef.current?._isReady) {
          clearInterval(interval);
          renderTrip();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [trip]);

  return (
    <div style={s.mapWrap}>
      <div style={s.mapHeader}>
        <p style={s.mapTitle}>
          {trip ? `Route: ${trip.name}` : "🗺 Select a trip to see its route"}
        </p>
      </div>
      <div ref={divRef} style={s.mapEl} />
    </div>
  );
}

function CreateTripModal({ allDestinations, onCreated, onClose }) {
  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={{ ...s.modal, maxWidth: 450 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ ...s.modalTitle, margin: 0 }}>Create New Trip</p>
          <button style={s.removeBtn} onClick={onClose} title="Close" style={{ ...s.removeBtn, fontSize: 24 }}>×</button>
        </div>
        
        <TripForm 
          allDestinations={allDestinations} 
          onCreated={(trip) => {
            onCreated(trip);
            onClose(); 
          }} 
        />
      </div>
    </div>
  );
}

function DestinationPicker({ allDestinations, selected, onChange }) {
  const [query,  setQuery]  = useState("");
  const [open,   setOpen]   = useState(false);
  const wrapRef             = useRef(null);

  const results = query.trim().length < 1 ? [] :
    allDestinations.filter(d =>
      !selected.find(s => s.id === d.id) &&
      (`${d.city} ${d.country} ${d.name}`).toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

  const pick = dest => {
    onChange([...selected, dest]);
    setQuery("");
    setOpen(false);
  };

  const remove = id => onChange(selected.filter(d => d.id !== id));

  return (
    <div>
      <div style={s.searchBox} ref={wrapRef}>
        <input
          style={s.searchInput}
          placeholder="Search city or country…"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
        {open && results.length > 0 && (
          <div style={s.dropdown}>
            {results.map(d => (
              <div
                key={d.id}
                style={s.dropItem}
                onMouseDown={() => pick(d)}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primL}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = ""}
              >
                <span style={{ fontWeight:600 }}>{d.name}</span>
                <span style={{ color:C.muted, fontSize:13 }}>, {d.city}, {d.country}</span>
                {d.rating && <span style={{ color:"#f39c12", marginLeft:8, fontSize:12 }}>★ {d.rating}</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {selected.length > 0 && (
        <div style={s.destList}>
          {selected.map((d, i) => (
            <div key={d.id} style={s.destChip}>
              <div style={{ display:"flex", alignItems:"center", flex:1 }}>
                <span style={s.destChipNum}>{i + 1}</span>
                <span style={s.destChipName}>{d.name}</span>
                <span style={s.destChipSub}>{d.city}</span>
              </div>
              <button style={s.removeBtn} onClick={() => remove(d.id)} title="Remove">×</button>
            </div>
          ))}
          
        </div>
      )}
    </div>
  );
}

function TripForm({ allDestinations, onCreated }) {
  const [name,   setName]   = useState("");
  const [start,  setStart]  = useState("");
  const [end,    setEnd]    = useState("");
  const [dests,  setDests]  = useState([]);   
  const [errs,   setErrs]   = useState({});
  const [msg,    setMsg]    = useState(null);
  const [busy,   setBusy]   = useState(false);

  const validate = () => {
    const e = {};
    if (!name.trim())          e.name  = "Trip name is required.";
    if (!start)                e.start = "Start date is required.";
    if (!end)                  e.end   = "End date is required.";
    if (start && end && start > end) e.end = "End date must be after start date.";
    if (dests.length === 0)    e.dests = "Add at least one destination.";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrs(e);
    setBusy(true); setMsg(null);
    try {
      const trip = await api("POST", "/api/trips", {
        name,
        startDate:      start,
        endDate:        end,
        destinationIds: dests.map(d => d.id)
      });
      setMsg({ ok:true, text:"Trip created! Route optimised ✓" });
      setName(""); setStart(""); setEnd(""); setDests([]); setErrs({});
      setTimeout(() => { setMsg(null); onCreated(trip); }, 1200);
    } catch(err) {
      setMsg({ ok:false, text: err.message });
    } finally { setBusy(false); }
  };

  const field = (label, val, set, type="text", errKey) => (
    <div style={s.fieldWrap}>
      <span style={s.label}>{label}</span>
      <input
        type={type} value={val}
        onChange={e => { set(e.target.value); setErrs(v => ({...v, [errKey]:undefined})); }}
        style={{ ...s.input, ...(errs[errKey] ? s.inputErr : {}) }}
      />
      {errs[errKey] && <span style={s.errTxt}>{errs[errKey]}</span>}
    </div>
  );

  return (
    <>
      {msg && <div style={msg.ok ? s.alertOk : s.alertErr}>{msg.text}</div>}
      <div style={s.form}>
        {field("Trip Name", name, setName, "text", "name")}
        <div style={s.row2}>
          {field("Start Date", start, setStart, "date", "start")}
          {field("End Date",   end,   setEnd,   "date", "end")}
        </div>

        <div style={s.fieldWrap}>
          <span style={s.label}>Destinations</span>
          <DestinationPicker
            allDestinations={allDestinations}
            selected={dests}
            onChange={d => { setDests(d); setErrs(v => ({...v, dests:undefined})); }}
          />
          {errs.dests && <span style={s.errTxt}>{errs.dests}</span>}
        </div>

        <button
          style={{ ...s.btn, marginTop:4, opacity:busy ? .7 : 1 }}
          onClick={submit}
          disabled={busy}
        >
          {busy ? "Creating…" : "Create Trip"}
        </button>
      </div>
    </>
  );
}


function TripCard({ trip, isActive, onSelect, onDelete, onEdit, onToggleFavorite }) {
  const stops = trip.tripDestinations
    ? [...trip.tripDestinations].sort((a,b) => a.dayIndex - b.dayIndex)
    : [];

  return (
    <div
      style={{ ...s.tripCard, position: "relative", ...(isActive ? s.tripCardActive : {}) }}
      onClick={onSelect}
    >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        
        <div>
          <p style={s.tripName}>{trip.name}</p>
          <p style={s.tripMeta}>
            📅 {fmtDate(trip.startDate)} → {fmtDate(trip.endDate)}
            {trip.createdDate && <span style={{ marginLeft:12 }}>Created {fmtDate(trip.createdDate)}</span>}
          </p>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
          <button
            style={{ ...s.btnGhost, color: C.primary, border: `1px solid ${C.primary}` }}
            onClick={e => { e.stopPropagation(); onEdit(trip); }}
            title="Edit trip"
          >✏️ Edit</button>

          <button
            style={s.btnDanger}
            onClick={e => { e.stopPropagation(); onDelete(trip); }}
            title="Delete trip"
          >🗑 Delete</button>
        </div>
      </div>

      {stops.length > 0 && (
        <div style={{ paddingRight: 32 }}>
          <div style={s.routeStops}>
            {stops.map(td => (
              <span key={td.dayIndex} style={s.stopBadge}>
                <span style={s.stopNum}>{td.dayIndex}</span>
                {td.destination.name} ({td.destination.city})
              </span>
            ))}
          </div>
          {stops.length > 1 && (
            <span style={s.routeLabel}> Optimal route · {stops.length} cities</span>
          )}
        </div>
      )}

      <button
        style={{ 
          position: "absolute",
          bottom: 14, 
          right: 14, 
          background: "none", 
          border: "none", 
          cursor: "pointer", 
          fontSize: 26, 
          color: C.primary, 
          padding: 0, 
          lineHeight: 1
        }}
        onClick={e => { e.stopPropagation(); onToggleFavorite(trip); }}
        title={trip.isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {trip.isFavorite ? "★" : "☆"}
      </button>
    </div>
  );
}

function EditTripModal({ trip, allDestinations, onSave, onClose }) {
  const [name, setName] = useState(trip.name);
  const [start, setStart] = useState(trip.startDate ? trip.startDate.split('T')[0] : "");
  const [end, setEnd] = useState(trip.endDate ? trip.endDate.split('T')[0] : "");
  
  const initialDests = trip.tripDestinations 
    ? trip.tripDestinations.map(td => td.destination) 
    : [];
  const [dests, setDests] = useState(initialDests);
  const [busy, setBusy] = useState(false);
  
  // Добавяме локален стейт за грешки вътре в модала
  const [localError, setLocalError] = useState(null);

  const submit = async () => {
    setBusy(true);
    setLocalError(null);
    try {
      const updatedTrip = await api("PUT", `/api/trips/${trip.id}`, {
        name,
        startDate: start,
        endDate: end,
        destinationIds: dests.map(d => d.id),
      });
      onSave(updatedTrip);
    } catch(err) {
      // Заменяме alert-а с красивия ни ErrorAlert статус
      if (err.message === "Failed to fetch" || err.name === "TypeError") {
        setLocalError(503);
      } else if (err.message.includes("401")) {
        setLocalError(401);
      } else {
        setLocalError(500);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={{ ...s.modal, maxWidth: 450 }} onClick={e => e.stopPropagation()}>
        <p style={s.modalTitle}>Edit Trip</p>
        
        {/* Ако има локална грешка, я рендерираме тук */}
        {localError && (
          <ErrorAlert 
            statusCode={localError} 
            onClose={() => setLocalError(null)} 
          />
        )}

        <div style={s.form}>
          <div style={s.fieldWrap}>
            <span style={s.label}>Trip Name</span>
            <input style={s.input} value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div style={s.row2}>
            <div style={s.fieldWrap}>
              <span style={s.label}>Start Date</span>
              <input type="date" style={s.input} value={start} onChange={e => setStart(e.target.value)} />
            </div>
            <div style={s.fieldWrap}>
              <span style={s.label}>End Date</span>
              <input type="date" style={s.input} value={end} onChange={e => setEnd(e.target.value)} />
            </div>
          </div>
          <div style={s.fieldWrap}>
            <span style={s.label}>Destinations</span>
            <DestinationPicker
              allDestinations={allDestinations}
              selected={dests}
              onChange={setDests}
            />
          </div>
          <div style={{ ...s.modalActions, marginTop: 16 }}>
            <button style={{ ...s.btnGhost, flex: 1 }} onClick={onClose}>Cancel</button>
            <button style={{ ...s.btn, flex: 1 }} onClick={submit} disabled={busy}>
              {busy ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ tripName, onConfirm, onClose }) {
  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>
        <p style={s.modalTitle}>Delete Trip?</p>
        <p style={s.modalBody}>
          "<b>{tripName}</b>" will be permanently deleted.
        </p>
        <div style={s.modalActions}>
          <button style={{ ...s.btnGhost, flex:1, padding:11, fontSize:15 }} onClick={onClose}>Cancel</button>
          <button
            style={{ flex:1, padding:11, fontSize:15, fontWeight:700, cursor:"pointer", backgroundColor:C.danger, color:C.white, border:"none", borderRadius:4 }}
            onClick={onConfirm}
          >Delete</button>
        </div>
      </div>
    </div>
  );
}



export default function HomePage() {
  const [allDestinations, setAllDestinations] = useState([]);
  const [trips,           setTrips]           = useState([]);
  const [activeTripId,    setActiveTripId]    = useState(null);
  const [deleteTarget,    setDeleteTarget]    = useState(null);
  const [editTarget,      setEditTarget]      = useState(null); 
  const [showCreateTrip,  setShowCreateTrip]  = useState(false);  
  const [loading,         setLoading]         = useState(true);
  const [loadErr,         setLoadErr]         = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const { logout, getUserId } = useAuth();


  const [viewMode, setViewMode] = useState(() => {
    return window.location.hash.replace("#", "") || "all";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const currentMode = window.location.hash.replace("#", "") || "all";
      setViewMode(currentMode);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (mode) => {
    window.location.hash = mode === "all" ? "" : mode;
  };

  const handleUpdate = (updatedTrip) => {
    setTrips(ts => ts.map(t => {
      if (t.id === updatedTrip.id) {
        return { 
          ...updatedTrip, 
          isFavorite: t.isFavorite 
        };
      }
      return t;
    }));
  
    if (activeTripId === updatedTrip.id) setActiveTripId(updatedTrip.id);
    setEditTarget(null);
  };

  useEffect(() => {
    (async () => {
      try {
        const userId = getUserId();

        const requests = [
          api("GET", "/api/destinations"),
          api("GET", "/api/trips"),
          userId ? api("GET", `/api/users/${userId}/favourites`) : Promise.resolve([]),
        ];
        const [dests, tripsData, favTrips] = await Promise.all(requests);

        const favIds = new Set((Array.isArray(favTrips) ? favTrips : []).map(t => t.id));
        const tripsWithFav = (Array.isArray(tripsData) ? tripsData : []).map(t => ({
          ...t,
          isFavorite: favIds.has(t.id),
        }));

        setAllDestinations(Array.isArray(dests) ? dests : []);
        setTrips(tripsWithFav);
        if (tripsWithFav?.length) setActiveTripId(tripsWithFav[0].id);
      } catch(e) {
        setLoadErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCreated = useCallback(trip => {
    setTrips(ts => [trip, ...ts]);
    setActiveTripId(trip.id);
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api("DELETE", `/api/trips/${deleteTarget.id}`);
      setTrips(ts => ts.filter(t => t.id !== deleteTarget.id));
      if (activeTripId === deleteTarget.id) setActiveTripId(null);
    } catch(e) {
      setErrorStatus(null); 
      if (e.message === "Failed to fetch" || e.name === "TypeError") {
        setErrorStatus(503);
      } else if (e.message.includes("401")) {
        setErrorStatus(401);
      } else {
        setErrorStatus(500);
      }
    }
    setDeleteTarget(null);
  };

  const handleSelectTrip = async (tripId) => {
    setActiveTripId(tripId);
    try {
      const fullTrip = await api("GET", `/api/trips/${tripId}`);
      setTrips(ts => ts.map(t => t.id === tripId ? fullTrip : t));
    } catch(e) {
      console.error("Failed to load trip details", e);
    }
  };

  const handleToggleFavorite = async (trip) => {
    const newStatus = !trip.isFavorite;
    setTrips(ts => ts.map(t => t.id === trip.id ? { ...t, isFavorite: newStatus } : t));

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authorization token found.");

      const payload = JSON.parse(window.atob(
        token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
      ));
      const userId = payload.userId || payload.id || payload.sub;
      if (!userId) throw new Error("User ID is not present in the token payload.");

      if (newStatus) {
        await api("POST", `/api/users/${userId}/favourites/${trip.id}`);
      } else {
        await api("DELETE", `/api/users/${userId}/favourites/${trip.id}`);
      }
    } catch (err) {
      setTrips(ts => ts.map(t => t.id === trip.id ? { ...t, isFavorite: !newStatus } : t));
      setErrorStatus(null);
      if (err.message === "Failed to fetch" || err.name === "TypeError") {
        setErrorStatus(503);
      } else if (err.message.includes("401")) {
        setErrorStatus(401);
      } else {
        setErrorStatus(500);
      }
    }
  };
  

  const displayedTrips = viewMode === "favorites"
    ? trips.filter(t => t.isFavorite)
    : trips.filter(t => !t.isFavorite).slice(0, 5);

    const activeTrip = displayedTrips.find(t => t.id === activeTripId) ?? null;
  return (
    <div style={s.page}>
      <div style={s.wrap}>

        <div style={s.topBar}>
          <h1 
            style={{ ...s.title, cursor: "pointer" }} 
            onClick={() => navigateTo("all")}
            title="Go to Recent Searches"
          >
            ✈ Trip Planner
          </h1>
          
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <button 
            style={{ ...s.iconBtn, opacity: 1 }} 
            onClick={() => navigateTo(viewMode === "favorites" ? "all" : "favorites")}
            title={viewMode === "favorites" ? "" : "Favourites"} 
          >
            {viewMode === "favorites" ? "★" : "☆"}
          </button>
          
            
            <span style={{ color: C.border }}>|</span>

            <button style={s.logoutBtn} onClick={logout}
            >Log Out</button>
          </div>
        </div>

        {loadErr && <div style={{ ...s.alertErr, marginBottom:20 }}>{loadErr}</div>}

        {errorStatus && (
          <ErrorAlert 
            statusCode={errorStatus} 
            onClose={() => setErrorStatus(null)} 
          />
        )}

        <div style={s.layout}>
        <div>
        <div style={s.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: displayedTrips.length ? 14 : 0 }}>
                
                <h2 style={{ ...s.cardTitle, margin: 0 }}>
                  {viewMode === "favorites" ? "Favourite Trips" : "Recent searches"}
                  
                  {displayedTrips.length > 0 && (
                    <span style={{ fontSize:14, fontWeight:400, color:C.muted, marginLeft:10 }}>
                      {displayedTrips.length} trip{displayedTrips.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </h2>
                
                {viewMode === "all" && (
                  <button 
                    style={s.btnSm} 
                    onClick={() => setShowCreateTrip(true)}
                    disabled={loading}
                  >
                    + Add Trip
                  </button>
                )}
              </div>

              {loading && <div style={s.empty}>Loading trips…</div>}

              {!loading && displayedTrips.length === 0 && (
                <div style={s.empty}>
                  <div style={s.emptyIcon}>
                    {viewMode === "favorites" ? "★" : "🗺"}
                  </div>
                  <div>
                    {viewMode === "favorites" 
                      ? "You don't have any favorite trips yet."
                      : "No recent searches yet — create your first adventure!"}
                  </div>
                </div>
              )}

              {!loading && displayedTrips.length > 0 && (
                <div style={s.tripList}>
                  {displayedTrips.map(trip => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      isActive={trip.id === activeTripId}
                      onSelect={() => handleSelectTrip(trip.id)}
                      onDelete={setDeleteTarget}
                      onEdit={setEditTarget} 
                      onToggleFavorite={handleToggleFavorite} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <RouteMap trip={activeTrip} />
        </div>
        
      </div>

      {showCreateTrip && (
        <CreateTripModal
          allDestinations={allDestinations}
          onCreated={handleCreated}
          onClose={() => setShowCreateTrip(false)}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          tripName={deleteTarget.name}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
      
      {editTarget && (
        <EditTripModal
          trip={editTarget}
          allDestinations={allDestinations}
          onSave={handleUpdate}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
}