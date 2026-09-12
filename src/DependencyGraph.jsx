import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

const SUBJ_COLOR = {
  physics: "#3B82F6",
  chemistry: "#A855F7",
  maths: "#F59E0B",
  biology: "#10B981",
  foundation: "#71717A",
};

export default function DependencyGraph({ results, ratings, goal }) {
  const svgRef = useRef(null);
  const wrapRef = useRef(null);
  const zoomBehaviorRef = useRef(null);
  const gRef = useRef(null);

  const [selected, setSelected] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [activeSubject, setActiveSubject] = useState("all");
  const [dims, setDims] = useState({ w: 840, h: 580 });

  // Build nodes + links
  const { nodes, links } = (() => {
    if (!results || !results.res) return { nodes: [], links: [] };

    const nodeMap = {};

    results.res.forEach(ch => {
      if (activeSubject !== "all" && ch.subj !== activeSubject) return;

      nodeMap[ch.id] = {
        id: ch.id,
        name: ch.name,
        subj: ch.subj,
        cls: ch.cls,
        risk: ch.risk,
        score: ch.score,
        studyH: ch.studyH,
        type: "advanced",
        wt: ch.wt[goal] || "M",
      };
    });

    // Add required foundation nodes
    const fndSeen = new Set();
    results.res.forEach(ch => {
      if (activeSubject !== "all" && ch.subj !== activeSubject) return;

      ch.prereqs.forEach(({ id }) => {
        if (!nodeMap[id] && !fndSeen.has(id)) {
          fndSeen.add(id);
          const formattedName = id.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
          nodeMap[id] = {
            id,
            name: formattedName,
            subj: "foundation",
            cls: 9,
            risk: "FOUNDATION",
            type: "foundation",
            rating: ratings[id] || 0,
          };
        }
      });
    });

    const nodes = Object.values(nodeMap);
    const links = [];

    results.res.forEach(ch => {
      if (nodeMap[ch.id]) {
        ch.prereqs.forEach(({ id, w }) => {
          if (nodeMap[id]) {
            links.push({ source: id, target: ch.id, w });
          }
        });
      }
    });

    return { nodes, links };
  })();

  // Responsive sizing
  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      setDims({ w: Math.max(width, 340), h: Math.max(width * 0.62, 460) });
    });
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  // D3 Force Simulation & Rendering
  useEffect(() => {
    if (!nodes.length || !svgRef.current) return;

    const { w, h } = dims;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Defs: markers & glow filters
    const defs = svg.append("defs");

    // Arrow markers
    ["HIGH", "MEDIUM", "LOW", "FOUNDATION"].forEach(r => {
      const col = r === "HIGH" ? "#EF4444" : r === "MEDIUM" ? "#F59E0B" : r === "LOW" ? "#10B981" : "#71717A";
      defs.append("marker")
        .attr("id", "arrow-" + r)
        .attr("viewBox", "0 -4 8 8")
        .attr("refX", 20)
        .attr("refY", 0)
        .attr("markerWidth", 5)
        .attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-4L8,0L0,4")
        .attr("fill", col)
        .attr("opacity", 0.6);
    });

    // Glow filter
    const glow = defs.append("filter").attr("id", "glow").attr("x", "-40%").attr("y", "-40%").attr("width", "180%").attr("height", "180%");
    glow.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "blur");
    const merge = glow.append("feMerge");
    merge.append("feMergeNode").attr("in", "blur");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    // Dot grid pattern
    const pattern = defs.append("pattern")
      .attr("id", "graph-grid")
      .attr("width", 24)
      .attr("height", 24)
      .attr("patternUnits", "userSpaceOnUse");
    pattern.append("circle")
      .attr("cx", 1.5)
      .attr("cy", 1.5)
      .attr("r", 1)
      .attr("fill", "rgba(255, 255, 255, 0.08)");

    svg.append("rect")
      .attr("width", w)
      .attr("height", h)
      .attr("fill", "url(#graph-grid)");

    // Root zoom container
    const g = svg.append("g");
    gRef.current = g;

    const zoom = d3.zoom()
      .scaleExtent([0.5, 2.5])
      .on("zoom", event => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
    zoomBehaviorRef.current = zoom;

    // Force simulation
    const sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(d => 110 + (1 - d.w) * 50).strength(0.5))
      .force("charge", d3.forceManyBody().strength(-320))
      .force("center", d3.forceCenter(w / 2, h / 2))
      .force("collide", d3.forceCollide(44))
      .force("x", d3.forceX(d => d.type === "foundation" ? w * 0.22 : w * 0.75).strength(0.18))
      .force("y", d3.forceY(h / 2).strength(0.06));

    // Links
    const linkG = g.append("g").attr("class", "links");
    const linkEl = linkG.selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", d => {
        const tgt = nodes.find(n => n.id === (d.target.id || d.target));
        return tgt ? (tgt.risk === "HIGH" ? "#EF444455" : tgt.risk === "MEDIUM" ? "#F59E0B55" : "#10B98155") : "rgba(255,255,255,0.1)";
      })
      .attr("stroke-width", d => 1 + d.w * 2)
      .attr("stroke-dasharray", d => d.w < 0.25 ? "3,3" : "none")
      .attr("marker-end", d => {
        const tgt = nodes.find(n => n.id === (d.target.id || d.target));
        return `url(#arrow-${tgt ? tgt.risk : "FOUNDATION"})`;
      });

    // Nodes
    const nodeG = g.append("g").attr("class", "nodes");
    const nodeEl = nodeG.selectAll("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "pointer")
      .call(d3.drag()
        .on("start", (event, d) => {
          if (!event.active) sim.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) sim.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      )
      .on("click", (event, d) => {
        event.stopPropagation();
        setSelected(prev => (prev === d.id ? null : d.id));
      })
      .on("mouseenter", (event, d) => {
        const [mx, my] = d3.pointer(event, wrapRef.current);
        setTooltip({ id: d.id, x: mx, y: my });
      })
      .on("mouseleave", () => setTooltip(null));

    // Outer circle
    nodeEl.append("circle")
      .attr("r", d => d.type === "foundation" ? 19 : 24)
      .attr("fill", d => {
        if (d.type === "foundation") return "#0D0D0D";
        const col = d.risk === "HIGH" ? "#EF4444" : d.risk === "MEDIUM" ? "#F59E0B" : "#10B981";
        return col + "1F";
      })
      .attr("stroke", d => {
        if (d.type === "foundation") {
          const r = d.rating || 0;
          return r >= 4 ? "#EF4444" : r >= 3 ? "#F59E0B" : "rgba(255,255,255,0.25)";
        }
        return d.risk === "HIGH" ? "#EF4444" : d.risk === "MEDIUM" ? "#F59E0B" : "#10B981";
      })
      .attr("stroke-width", d => d.type === "foundation" ? 1.5 : 2)
      .attr("filter", d => d.risk === "HIGH" ? "url(#glow)" : null);

    // Subject indicator pip
    nodeEl.filter(d => d.type === "advanced")
      .append("circle")
      .attr("r", 4)
      .attr("cy", -16)
      .attr("fill", d => SUBJ_COLOR[d.subj] || "#71717A");

    // Node label
    nodeEl.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.32em")
      .attr("font-size", d => d.type === "foundation" ? "7.5px" : "8px")
      .attr("font-weight", "600")
      .attr("fill", d => d.type === "foundation" ? "#A1A1AA" : "#EDEDED")
      .attr("font-family", "Geist, sans-serif")
      .text(d => {
        const words = d.name.split(" ");
        return words.length > 2 ? words.slice(0, 2).join(" ") + "…" : d.name;
      });

    // Risk badge in Geist Mono
    nodeEl.filter(d => d.type === "advanced")
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "2.1em")
      .attr("font-size", "6px")
      .attr("font-weight", "700")
      .attr("font-family", "Geist Mono, monospace")
      .attr("fill", d => d.risk === "HIGH" ? "#EF4444" : d.risk === "MEDIUM" ? "#F59E0B" : "#10B981")
      .text(d => d.risk);

    // Simulation tick
    sim.on("tick", () => {
      linkEl
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      nodeEl.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    svg.on("click", () => setSelected(null));

    return () => sim.stop();
  }, [nodes, links, dims, activeSubject]);

  // Highlight selection
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    svg.selectAll(".nodes g")
      .attr("opacity", d => {
        if (!selected) return 1;
        const isSelected = d.id === selected;
        const isConnected = links.some(l =>
          ((l.source.id || l.source) === selected && (l.target.id || l.target) === d.id) ||
          ((l.source.id || l.source) === d.id && (l.target.id || l.target) === selected)
        );
        return isSelected || isConnected ? 1 : 0.2;
      });

    svg.selectAll(".links line")
      .attr("opacity", d => {
        if (!selected) return 0.6;
        const isConnected = (d.source.id || d.source) === selected || (d.target.id || d.target) === selected;
        return isConnected ? 1 : 0.06;
      })
      .attr("stroke-width", d => {
        if (!selected) return 1 + d.w * 2;
        const isConnected = (d.source.id || d.source) === selected || (d.target.id || d.target) === selected;
        return isConnected ? 2.5 + d.w * 2 : 1;
      });
  }, [selected, links]);

  // Zoom handlers
  const handleZoomIn = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current).transition().duration(250).call(zoomBehaviorRef.current.scaleBy, 1.3);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current).transition().duration(250).call(zoomBehaviorRef.current.scaleBy, 0.75);
    }
  };

  const handleResetZoom = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
    }
  };

  const selNode = selected ? nodes.find(n => n.id === selected) : null;

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* HUD Control Bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.75rem",
      }}>
        {/* Subject Filter Pills */}
        <div style={{
          display: "flex",
          gap: "0.35rem",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid var(--border)",
          padding: "3px",
          borderRadius: 8,
          overflowX: "auto",
        }}>
          {["all", "physics", "chemistry", "maths", "biology"].map(subj => {
            const isActive = activeSubject === subj;
            return (
              <button
                key={subj}
                onClick={() => setActiveSubject(subj)}
                className="btn-ghost"
                style={{
                  padding: "0.3rem 0.65rem",
                  fontSize: "0.75rem",
                  fontWeight: isActive ? 600 : 400,
                  borderRadius: 6,
                  background: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
                  color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                  border: isActive ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid transparent",
                  textTransform: "capitalize",
                }}
              >
                {subj}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.72rem" }}>
          {[
            { label: "High Risk", col: "var(--accent-red)" },
            { label: "Medium", col: "var(--accent-amber)" },
            { label: "Low Risk", col: "var(--accent-emerald)" },
            { label: "Foundation", col: "#71717A" },
          ].map(r => (
            <span key={r.label} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "var(--text-secondary)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: r.col }} />
              {r.label}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive D3 Graph Canvas */}
      <div
        ref={wrapRef}
        style={{
          width: "100%",
          position: "relative",
          background: "#000000",
          borderRadius: 12,
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        <svg ref={svgRef} width={dims.w} height={dims.h} style={{ display: "block" }} />

        {/* Floating Controls HUD */}
        <div style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.35rem",
          zIndex: 10,
        }}>
          <button
            onClick={handleZoomIn}
            className="btn-secondary"
            style={{ padding: "0.45rem", borderRadius: 6 }}
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={handleZoomOut}
            className="btn-secondary"
            style={{ padding: "0.45rem", borderRadius: 6 }}
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={handleResetZoom}
            className="btn-secondary"
            style={{ padding: "0.45rem", borderRadius: 6 }}
            title="Reset Zoom"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Guidance watermark */}
        <div style={{
          position: "absolute",
          bottom: "0.85rem",
          left: "1rem",
          fontSize: "0.7rem",
          color: "var(--text-tertiary)",
          pointerEvents: "none",
        }}>
          Scroll to zoom · Drag nodes to reposition · Click node to isolate prerequisite connections
        </div>

        {/* Tooltip */}
        {tooltip && (() => {
          const n = nodes.find(nd => nd.id === tooltip.id);
          if (!n) return null;

          return (
            <div style={{
              position: "absolute",
              left: Math.min(tooltip.x + 12, dims.w - 200),
              top: Math.max(tooltip.y - 45, 10),
              background: "rgba(18, 18, 18, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 8,
              padding: "0.55rem 0.8rem",
              pointerEvents: "none",
              zIndex: 20,
              maxWidth: 200,
              boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
            }}>
              <p style={{ color: "#EDEDED", fontWeight: 600, fontSize: "0.82rem", marginBottom: "2px" }}>
                {n.name}
              </p>
              {n.type === "foundation" ? (
                <p style={{ color: "var(--text-secondary)", fontSize: "0.72rem" }}>
                  Class {n.cls} Foundation · Rating: {n.rating || "—"}/5
                </p>
              ) : (
                <p style={{
                  color: n.risk === "HIGH" ? "var(--accent-red)" : n.risk === "MEDIUM" ? "var(--accent-amber)" : "var(--accent-emerald)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                }}>
                  {n.risk} RISK · {n.studyH} hrs · Class {n.cls}
                </p>
              )}
            </div>
          );
        })()}
      </div>

      {/* Selected Node Details Drawer */}
      {selNode && (
        <div className="vercel-card animate-fade-in" style={{ padding: "1.25rem" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.75rem",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF" }}>
                  {selNode.name}
                </h3>
                <span className="font-mono" style={{
                  fontSize: "0.68rem",
                  color: "var(--text-tertiary)",
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "1px 6px",
                  borderRadius: 4,
                }}>
                  Class {selNode.cls}
                </span>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                {selNode.type === "foundation"
                  ? "Foundational prerequisite from Class 9/10 syllabus"
                  : `${selNode.subj.charAt(0).toUpperCase() + selNode.subj.slice(1)} advanced module`}
              </p>
            </div>

            {selNode.type === "advanced" && (
              <span className="font-mono" style={{
                padding: "2px 8px",
                borderRadius: 4,
                fontSize: "0.72rem",
                fontWeight: 700,
                color: selNode.risk === "HIGH" ? "var(--accent-red)" : selNode.risk === "MEDIUM" ? "var(--accent-amber)" : "var(--accent-emerald)",
                background: selNode.risk === "HIGH" ? "rgba(239,68,68,0.15)" : selNode.risk === "MEDIUM" ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.15)",
                border: "1px solid " + (selNode.risk === "HIGH" ? "rgba(239,68,68,0.3)" : selNode.risk === "MEDIUM" ? "rgba(245,158,11,0.3)" : "rgba(16,185,129,0.3)"),
              }}>
                {selNode.risk} RISK
              </span>
            )}
          </div>

          {selNode.type === "advanced" && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.5rem",
            }}>
              {[
                { l: "Study Load", v: `${selNode.studyH} Hours`, c: "#FFFFFF" },
                { l: "Calculated Risk", v: selNode.risk, c: selNode.risk === "HIGH" ? "var(--accent-red)" : selNode.risk === "MEDIUM" ? "var(--accent-amber)" : "var(--accent-emerald)" },
                { l: `${goal} Weightage`, v: selNode.wt, c: "var(--accent-purple)" },
              ].map(item => (
                <div key={item.l} style={{
                  padding: "0.55rem",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  textAlign: "center",
                }}>
                  <div className="font-mono" style={{ fontSize: "0.82rem", fontWeight: 700, color: item.c }}>
                    {item.v}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-tertiary)", marginTop: "2px" }}>
                    {item.l}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selNode.type === "foundation" && selNode.rating >= 4 && (
            <p style={{
              fontSize: "0.8rem",
              color: "#FCA5A5",
              marginTop: "0.5rem",
              background: "rgba(239, 68, 68, 0.05)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              padding: "0.5rem 0.75rem",
              borderRadius: 6,
            }}>
              ⚠️ You rated your comfort in this chapter as {selNode.rating}/5. This gap creates direct friction for all connected Class 11–12 topics.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
