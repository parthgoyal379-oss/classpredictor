import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

// ─────────────────────────────────────────────────────────────
// DEPENDENCY GRAPH COMPONENT
// ─────────────────────────────────────────────────────────────

const SUBJ_COLOR = {
  physics:   "#3B82F6",
  chemistry: "#8B5CF6",
  maths:     "#F59E0B",
  biology:   "#10B981",
  foundation:"#6B7280",
};

export default function DependencyGraph({ results, ratings, goal, stream }) {
  const svgRef    = useRef(null);
  const wrapRef   = useRef(null);
  const [selected, setSelected]   = useState(null);
  const [tooltip,  setTooltip]    = useState(null);
  const [dims,     setDims]       = useState({ w: 800, h: 560 });

  // Build nodes + links from results
  const { nodes, links } = (() => {
    if (!results || !results.res) return { nodes: [], links: [] };

    const nodeMap = {};

    // Advanced chapter nodes
    results.res.forEach(ch => {
      nodeMap[ch.id] = {
        id:      ch.id,
        name:    ch.name,
        subj:    ch.subj,
        cls:     ch.cls,
        risk:    ch.risk,
        score:   ch.score,
        studyH:  ch.studyH,
        type:    "advanced",
        wt:      ch.wt[goal] || "M",
      };
    });

    // Foundation nodes (only those referenced as prereqs)
    const fndSeen = new Set();
    results.res.forEach(ch => {
      ch.prereqs.forEach(({ id }) => {
        if (!nodeMap[id] && !fndSeen.has(id)) {
          fndSeen.add(id);
          // Find name from FOUNDATION data
          let name = id.replace(/_/g, " ");
          nodeMap[id] = {
            id,
            name,
            subj:   "foundation",
            cls:    9,
            risk:   "FOUNDATION",
            type:   "foundation",
            rating: ratings[id] || 0,
          };
        }
      });
    });

    const nodes = Object.values(nodeMap);
    const links = [];
    results.res.forEach(ch => {
      ch.prereqs.forEach(({ id, w }) => {
        if (nodeMap[id]) {
          links.push({ source: id, target: ch.id, w });
        }
      });
    });

    return { nodes, links };
  })();

  // Responsive sizing
  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      setDims({ w: Math.max(width, 320), h: Math.max(width * 0.65, 400) });
    });
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  // D3 force simulation
  useEffect(() => {
    if (!nodes.length || !svgRef.current) return;

    const { w, h } = dims;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Defs — arrow markers + glow filter
    const defs = svg.append("defs");

    ["HIGH","MEDIUM","LOW","FOUNDATION"].forEach(r => {
      const col = r === "HIGH" ? "#EF4444" : r === "MEDIUM" ? "#F59E0B" : r === "LOW" ? "#10B981" : "#4B5563";
      defs.append("marker")
        .attr("id",           "arrow-" + r)
        .attr("viewBox",      "0 -4 8 8")
        .attr("refX",         18)
        .attr("refY",         0)
        .attr("markerWidth",  6)
        .attr("markerHeight", 6)
        .attr("orient",       "auto")
        .append("path")
        .attr("d",    "M0,-4L8,0L0,4")
        .attr("fill", col)
        .attr("opacity", 0.7);
    });

    const glow = defs.append("filter").attr("id","glow").attr("x","-30%").attr("y","-30%").attr("width","160%").attr("height","160%");
    glow.append("feGaussianBlur").attr("stdDeviation","3").attr("result","blur");
    const merge = glow.append("feMerge");
    merge.append("feMergeNode").attr("in","blur");
    merge.append("feMergeNode").attr("in","SourceGraphic");

    // Background
    svg.append("rect").attr("width", w).attr("height", h).attr("fill","transparent");

    // Simulation
    const sim = d3.forceSimulation(nodes)
      .force("link",    d3.forceLink(links).id(d => d.id).distance(d => 120 + (1 - d.w) * 60).strength(0.6))
      .force("charge",  d3.forceManyBody().strength(-350))
      .force("center",  d3.forceCenter(w / 2, h / 2))
      .force("collide", d3.forceCollide(48))
      .force("x",       d3.forceX(d => d.type === "foundation" ? w * 0.25 : w * 0.7).strength(0.15))
      .force("y",       d3.forceY(h / 2).strength(0.05));

    // Links
    const linkG = svg.append("g");
    const linkEl = linkG.selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", d => {
        const tgt = nodes.find(n => n.id === (d.target.id || d.target));
        return tgt ? (tgt.risk === "HIGH" ? "#EF444455" : tgt.risk === "MEDIUM" ? "#F59E0B55" : "#10B98155") : "#ffffff18";
      })
      .attr("stroke-width", d => 1 + d.w * 2.5)
      .attr("marker-end",   d => {
        const tgt = nodes.find(n => n.id === (d.target.id || d.target));
        return "url(#arrow-" + (tgt ? tgt.risk : "FOUNDATION") + ")";
      });

    // Node groups
    const nodeG = svg.append("g");
    const nodeEl = nodeG.selectAll("g")
      .data(nodes)
      .join("g")
      .attr("cursor","pointer")
      .call(d3.drag()
        .on("start", (event, d) => { if (!event.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag",  (event, d) => { d.fx = event.x; d.fy = event.y; })
        .on("end",   (event, d) => { if (!event.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
      )
      .on("click", (event, d) => {
        event.stopPropagation();
        setSelected(prev => prev === d.id ? null : d.id);
      })
      .on("mouseenter", (event, d) => {
        setTooltip({ id: d.id, x: event.offsetX, y: event.offsetY });
      })
      .on("mouseleave", () => setTooltip(null));

    // Node circle
    nodeEl.append("circle")
      .attr("r", d => d.type === "foundation" ? 20 : 26)
      .attr("fill", d => {
        if (d.type === "foundation") return "#0D1929";
        const col = d.risk === "HIGH" ? "#EF4444" : d.risk === "MEDIUM" ? "#F59E0B" : "#10B981";
        return col + "22";
      })
      .attr("stroke", d => {
        if (d.type === "foundation") {
          const r = d.rating || 0;
          return r >= 4 ? "#EF4444" : r >= 3 ? "#F59E0B" : "#4B5563";
        }
        return d.risk === "HIGH" ? "#EF4444" : d.risk === "MEDIUM" ? "#F59E0B" : "#10B981";
      })
      .attr("stroke-width", d => d.type === "foundation" ? 1.5 : 2)
      .attr("filter", d => d.risk === "HIGH" ? "url(#glow)" : null);

    // Subject color dot
    nodeEl.filter(d => d.type === "advanced")
      .append("circle")
      .attr("r",    5)
      .attr("cy",  -18)
      .attr("fill", d => SUBJ_COLOR[d.subj] || "#6B7280");

    // Node label
    nodeEl.append("text")
      .attr("text-anchor", "middle")
      .attr("dy",           "0.35em")
      .attr("font-size",   d => d.type === "foundation" ? "7px" : "8px")
      .attr("font-weight",  "700")
      .attr("fill",         d => d.type === "foundation" ? "#9CA3AF" : "#E2E8F0")
      .attr("font-family",  "Plus Jakarta Sans, sans-serif")
      .text(d => {
        const words = d.name.split(" ");
        return words.length > 3 ? words.slice(0,2).join(" ") + "…" : d.name;
      });

    // Risk badge text
    nodeEl.filter(d => d.type === "advanced")
      .append("text")
      .attr("text-anchor","middle")
      .attr("dy","2.2em")
      .attr("font-size","6px")
      .attr("font-family","Space Mono, monospace")
      .attr("fill", d => d.risk === "HIGH" ? "#EF4444" : d.risk === "MEDIUM" ? "#F59E0B" : "#10B981")
      .text(d => d.risk);

    // Tick
    sim.on("tick", () => {
      linkEl
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      nodeEl.attr("transform", d => {
        d.x = Math.max(30, Math.min(w - 30, d.x));
        d.y = Math.max(30, Math.min(h - 30, d.y));
        return "translate(" + d.x + "," + d.y + ")";
      });
    });

    // Click background to deselect
    svg.on("click", () => setSelected(null));

    return () => sim.stop();
  }, [nodes, links, dims]);

  // Highlight selected node
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("circle:first-child")
      .attr("stroke-width", d => {
        if (!selected) return d.type === "foundation" ? 1.5 : 2;
        const isSelected    = d.id === selected;
        const isConnected   = links.some(l =>
          (l.source.id || l.source) === selected && (l.target.id || l.target) === d.id ||
          (l.source.id || l.source) === d.id    && (l.target.id || l.target) === selected
        );
        return isSelected ? 4 : isConnected ? 3 : 1;
      })
      .attr("opacity", d => {
        if (!selected) return 1;
        const isSelected  = d.id === selected;
        const isConnected = links.some(l =>
          (l.source.id || l.source) === selected && (l.target.id || l.target) === d.id ||
          (l.source.id || l.source) === d.id    && (l.target.id || l.target) === selected
        );
        return isSelected || isConnected ? 1 : 0.25;
      });

    svg.selectAll("line")
      .attr("opacity", d => {
        if (!selected) return 0.6;
        return (d.source.id || d.source) === selected || (d.target.id || d.target) === selected ? 1 : 0.08;
      });
  }, [selected, links]);

  const selNode = selected ? nodes.find(n => n.id === selected) : null;

  return (
    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1rem", alignItems: "center" }}>
        <span style={{ color: "#374151", fontSize: "0.72rem", fontFamily: "Space Mono, monospace" }}>RISK:</span>
        {[["HIGH","#EF4444"],["MEDIUM","#F59E0B"],["LOW","#10B981"]].map(([r,c]) => (
          <span key={r} style={{ display:"flex", alignItems:"center", gap:"0.3rem", fontSize:"0.72rem", color:c }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:c, display:"inline-block" }} />{r}
          </span>
        ))}
        <span style={{ color:"#374151", fontSize:"0.72rem", marginLeft:"0.5rem", fontFamily:"Space Mono, monospace" }}>SUBJECT:</span>
        {Object.entries(SUBJ_COLOR).filter(([k]) => k !== "foundation").map(([s,c]) => (
          <span key={s} style={{ display:"flex", alignItems:"center", gap:"0.3rem", fontSize:"0.72rem", color:c }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:c, display:"inline-block" }} />
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </span>
        ))}
      </div>

      <p style={{ color:"#374151", fontSize:"0.75rem", marginBottom:"1rem" }}>
        🔵 Left = Class 9-10 foundation chapters &nbsp;|&nbsp; 🔴🟡🟢 Right = Class 11-12 chapters &nbsp;|&nbsp; Click any node to highlight connections. Drag to rearrange.
      </p>

      {/* Graph */}
      <div ref={wrapRef} style={{ width:"100%", position:"relative", background:"#060E1A", borderRadius:16, border:"1px solid rgba(255,255,255,0.06)", overflow:"hidden" }}>
        <svg ref={svgRef} width={dims.w} height={dims.h} style={{ display:"block" }} />

        {/* Tooltip */}
        {tooltip && (() => {
          const n = nodes.find(nd => nd.id === tooltip.id);
          if (!n) return null;
          return (
            <div style={{
              position:"absolute", left: Math.min(tooltip.x + 12, dims.w - 180), top: Math.max(tooltip.y - 40, 8),
              background:"#0D1929", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8,
              padding:"0.5rem 0.75rem", pointerEvents:"none", zIndex:10, maxWidth:180,
            }}>
              <p style={{ color:"#E2E8F0", fontWeight:700, fontSize:"0.78rem", marginBottom:"2px" }}>{n.name}</p>
              {n.type === "foundation"
                ? <p style={{ color:"#6B7280", fontSize:"0.68rem" }}>Class {n.cls} Foundation · Rating: {n.rating || "—"}/5</p>
                : <p style={{ color: n.risk==="HIGH"?"#EF4444":n.risk==="MEDIUM"?"#F59E0B":"#10B981", fontSize:"0.68rem" }}>{n.risk} RISK · {n.studyH} hrs · Class {n.cls}</p>
              }
            </div>
          );
        })()}
      </div>

      {/* Selected node detail panel */}
      {selNode && (
        <div style={{ marginTop:"1rem", background:"#0D1929", border:"1px solid " + (selNode.risk==="HIGH"?"rgba(239,68,68,0.3)":selNode.risk==="MEDIUM"?"rgba(245,158,11,0.3)":"rgba(16,185,129,0.3)"), borderRadius:12, padding:"1rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.6rem" }}>
            <div>
              <h3 style={{ color:"#FFFFFF", fontWeight:800, fontSize:"1rem", fontFamily:"Outfit, sans-serif" }}>{selNode.name}</h3>
              <p style={{ color:"#374151", fontSize:"0.72rem", marginTop:"2px" }}>
                {selNode.type === "foundation" ? "Class " + selNode.cls + " Foundation Chapter" : "Class " + selNode.cls + " · " + (selNode.subj.charAt(0).toUpperCase() + selNode.subj.slice(1))}
              </p>
            </div>
            {selNode.type === "advanced" && (
              <span style={{ padding:"3px 10px", borderRadius:999, background: selNode.risk==="HIGH"?"rgba(239,68,68,0.15)":selNode.risk==="MEDIUM"?"rgba(245,158,11,0.15)":"rgba(16,185,129,0.15)", color: selNode.risk==="HIGH"?"#EF4444":selNode.risk==="MEDIUM"?"#F59E0B":"#10B981", fontSize:"0.7rem", fontWeight:700, fontFamily:"Space Mono, monospace" }}>
                {selNode.risk} RISK
              </span>
            )}
          </div>
          {selNode.type === "advanced" && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"0.4rem" }}>
              {[
                { l:"Study Hours", v:selNode.studyH+"hrs", c:"#3B82F6" },
                { l:"Risk",        v:selNode.risk,         c: selNode.risk==="HIGH"?"#EF4444":selNode.risk==="MEDIUM"?"#F59E0B":"#10B981" },
                { l:goal+" Wt.",  v:selNode.wt,           c:"#8B5CF6" },
              ].map(s => (
                <div key={s.l} style={{ background:"rgba(255,255,255,0.03)", borderRadius:7, padding:"0.45rem", textAlign:"center" }}>
                  <div style={{ color:s.c, fontWeight:700, fontSize:"0.8rem", fontFamily:"Space Mono, monospace" }}>{s.v}</div>
                  <div style={{ color:"#374151", fontSize:"0.62rem", marginTop:"2px" }}>{s.l}</div>
                </div>
              ))}
            </div>
          )}
          {selNode.type === "foundation" && selNode.rating >= 4 && (
            <p style={{ color:"#FCA5A5", fontSize:"0.78rem", marginTop:"0.5rem" }}>
              ⚠️ You rated this {selNode.rating}/5 — this weak foundation is affecting connected Class 11-12 chapters.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
