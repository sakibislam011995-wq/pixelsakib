import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Camera, Users, Calendar, Sparkles } from 'lucide-react';

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  subtext: string;
  icon: React.ReactNode;
}

export default function StudioStats({ isNight = true }: { isNight?: boolean }) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for the counters to apply D3 count-up transitions
  const countRef1 = useRef<HTMLSpanElement>(null);
  const countRef2 = useRef<HTMLSpanElement>(null);
  const countRef3 = useRef<HTMLSpanElement>(null);

  // Refs for D3 micro SVG visualizations
  const sparklineRef = useRef<SVGSVGElement>(null);
  const radialGaugeRef = useRef<SVGSVGElement>(null);
  const chartRef = useRef<SVGSVGElement>(null);

  // Monitor visibility to trigger countup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // 1. D3 Count-Up Animations
  useEffect(() => {
    if (!inView) return;

    const runCountUp = (
      element: HTMLSpanElement | null,
      target: number,
      suffix: string,
      duration: number
    ) => {
      if (!element) return;

      d3.select(element)
        .transition()
        .duration(duration)
        .ease(d3.easeCubicOut)
        .tween('text', function () {
          const interpolator = d3.interpolateNumber(0, target);
          return function (t) {
            const formatted = Math.floor(interpolator(t)).toLocaleString();
            d3.select(element).text(`${formatted}${suffix}`);
          };
        });
    };

    // Trigger all count ups
    runCountUp(countRef1.current, 18450, '+', 2200);
    runCountUp(countRef2.current, 998, '%', 1800);
    runCountUp(countRef3.current, 8, ' Years', 2000);
  }, [inView]);

  // 2. D3 Micro SVG Graphs Rendering
  useEffect(() => {
    if (!inView) return;

    const isDarkMode = isNight;
    const trackFill = isDarkMode ? '#1a1a1a' : '#eae2d5';
    const trackStroke = isDarkMode ? '#262626' : '#dfd7ca';
    const chartFillInactive = isDarkMode ? '#262626' : '#eae2d5';
    const barFillRest = isDarkMode ? '#403629' : '#dfd7ca';

    // --- VIS 1: SPARKLINE FOR RETOUCH GROWTH ---
    const drawSparkline = () => {
      const svg = d3.select(sparklineRef.current);
      svg.selectAll('*').remove();

      const width = 140;
      const height = 45;
      const padding = { top: 5, bottom: 5, left: 5, right: 5 };

      // Monthly Retouch Volumes over past 6 months (Mock data)
      const data = [1200, 1550, 1420, 1950, 2200, 2800];

      const xScale = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([padding.left, width - padding.right]);

      const yScale = d3
        .scaleLinear()
        .domain([0, (d3.max(data) || 3000) * 1.1])
        .range([height - padding.bottom, padding.top]);

      // Define line generator
      const line = d3
        .line<number>()
        .x((_, i) => xScale(i))
        .y((d) => yScale(d))
        .curve(d3.curveMonotoneX);

      // Define area generator for soft glow background filled shape
      const area = d3
        .area<number>()
        .x((_, i) => xScale(i))
        .y0(height - padding.bottom)
        .y1((d) => yScale(d))
        .curve(d3.curveMonotoneX);

      // Gradient definition for glowing area
      const defs = svg.append('defs');
      const grad = defs
        .append('linearGradient')
        .attr('id', 'sparkline-grad')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');
      grad.append('stop').attr('offset', '0%').attr('stop-color', 'var(--brand-accent)').attr('stop-opacity', 0.25);
      grad.append('stop').attr('offset', '100%').attr('stop-color', 'var(--brand-accent)').attr('stop-opacity', 0.0);

      // Draw area
      svg
        .append('path')
        .datum(data)
        .attr('d', area)
        .attr('fill', 'url(#sparkline-grad)');

      // Draw line path with drawing transition
      const path = svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'var(--brand-accent)')
        .attr('stroke-width', 2)
        .attr('d', line);

      const totalLength = path.node()?.getTotalLength() || 0;
      path
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);

      // Draw dynamic pulse dot at final data point
      const finalX = xScale(data.length - 1);
      const finalY = yScale(data[data.length - 1]);

      svg
        .append('circle')
        .attr('cx', finalX)
        .attr('cy', finalY)
        .attr('r', 4)
        .attr('fill', 'var(--brand-accent)')
        .attr('opacity', 0)
        .transition()
        .delay(1300)
        .duration(300)
        .attr('opacity', 1);

      svg
        .append('circle')
        .attr('cx', finalX)
        .attr('cy', finalY)
        .attr('r', 9)
        .attr('fill', 'none')
        .attr('stroke', 'var(--brand-accent)')
        .attr('stroke-width', 1)
        .attr('opacity', 0)
        .transition()
        .delay(1400)
        .duration(800)
        .attr('transform', `matrix(1 0 0 1 0 0)`)
        .attr('opacity', 0.5)
        .transition()
        .attr('r', 16)
        .attr('opacity', 0)
        .style('mix-blend-mode', 'screen');
    };

    // --- VIS 2: RADIAL ARC GAUGE FOR HAPPY CLIENTS ---
    const drawRadialGauge = () => {
      const svg = d3.select(radialGaugeRef.current);
      svg.selectAll('*').remove();

      const width = 80;
      const height = 80;
      const radius = Math.min(width, height) / 2;
      const borderThickness = 6;

      const g = svg
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      // Draw background ring track
      const arcBg = d3
        .arc()
        .innerRadius(radius - borderThickness)
        .outerRadius(radius)
        .startAngle(0)
        .endAngle(2 * Math.PI);

      g.append('path')
        .attr('d', arcBg as any)
        .attr('fill', trackFill)
        .attr('stroke', trackStroke)
        .attr('stroke-width', 0.5);

      // Gauge arc foreground representing 99.8% (0.998 of full circle)
      const arcFg = d3
        .arc()
        .innerRadius(radius - borderThickness)
        .outerRadius(radius)
        .startAngle(0)
        .cornerRadius(3);

      const foregroundPath = g
        .append('path')
        .datum({ endAngle: 0 }) // start transition baseline
        .attr('fill', 'var(--brand-accent)')
        .attr('d', arcFg as any);

      // Perform beautiful polar angle transition on arc
      foregroundPath
        .transition()
        .duration(1600)
        .ease(d3.easeCubicOut)
        .attrTween('d', function (d: any) {
          const interpolate = d3.interpolate(d.endAngle, 2 * Math.PI * 0.998);
          return function (t) {
            d.endAngle = interpolate(t);
            return arcFg(d as any) || '';
          };
        });

      // Simple rating star in middle
      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.33em')
        .attr('fill', 'var(--brand-accent)')
        .attr('font-size', '16px')
        .attr('class', 'font-sans font-bold')
        .text('★');
    };

    // --- VIS 3: HISTOGRAM TIMELINE FOR SERVICE YEARS ---
    const drawChart = () => {
      const svg = d3.select(chartRef.current);
      svg.selectAll('*').remove();

      const width = 140;
      const height = 45;
      const barPadding = 0.25;

      // Retouch project capacities annually (2019 - 2026 indexes)
      const data = [120, 240, 480, 850, 1100, 1450, 1900, 2400];

      const xScale = d3
        .scaleBand()
        .domain(data.map((_, i) => i.toString()))
        .range([5, width - 5])
        .padding(barPadding);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data) || 2500])
        .range([height - 5, 5]);

      const bars = svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (_, i) => xScale(i.toString()) || 0)
        .attr('width', xScale.bandwidth())
        .attr('y', height - 5) // Initial position for clean height rise transition
        .attr('height', 0)
        .attr('fill', chartFillInactive)
        .attr('rx', 1.5)
        .attr('stroke', 'var(--brand-accent)')
        .attr('stroke-width', 0.5)
        .attr('stroke-opacity', 0.3);

      bars
        .transition()
        .delay((_, i) => i * 80)
        .duration(1200)
        .ease(d3.easeBackOut)
        .attr('y', (d) => yScale(d))
        .attr('height', (d) => height - 5 - yScale(d))
        .attr('fill', (_, i) => {
          // Gradient brightness shift on final years
          return i === data.length - 1 ? 'var(--brand-accent)' : barFillRest;
        })
        .attr('stroke-opacity', 0.8);
    };

    drawSparkline();
    drawRadialGauge();
    drawChart();
  }, [inView, isNight]);

  return (
    <section
      id="studio-stats"
      ref={containerRef}
      className="py-14 bg-neutral-900/40 border-t border-b border-neutral-900/90 relative overflow-hidden"
    >
      {/* Dynamic Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[150px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* STAT 1: IMAGES RETOUCHED */}
          <div className="bg-neutral-950/60 p-6 rounded-2xl border border-neutral-850 hover:border-brand-gold/15 transition-all duration-300 flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-neutral-500 font-mono text-[9px] uppercase tracking-widest">
                <Camera className="w-3.5 h-3.5 text-brand-gold" />
                <span>Global Production</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  ref={countRef1}
                  className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight"
                >
                  0
                </span>
              </div>
              <p className="text-xs font-semibold text-neutral-300 font-sans tracking-wide">
                High-End Images Retouched
              </p>
              <p className="text-[10px] text-neutral-500 font-sans max-w-[180px]">
                Pixel-perfect manual curves & detailed dodge & burn sweeps.
              </p>
            </div>

            {/* D3 Sparkline container */}
            <div className="flex flex-col items-end justify-center self-center opacity-85 hover:opacity-100 transition-opacity">
              <svg ref={sparklineRef} width="140" height="45" className="overflow-visible" />
              <span className="text-[9px] text-neutral-500 font-mono mt-1 text-right uppercase tracking-[0.05em]">
                Monthly Vol (D3.js)
              </span>
            </div>
          </div>

          {/* STAT 2: CLIENT SATISFACTION */}
          <div className="bg-neutral-950/60 p-6 rounded-2xl border border-neutral-850 hover:border-brand-gold/15 transition-all duration-300 flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-neutral-500 font-mono text-[9px] uppercase tracking-widest">
                <Users className="w-3.5 h-3.5 text-brand-gold" />
                <span>Audited Satisfaction</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  ref={countRef2}
                  className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight"
                >
                  0%
                </span>
              </div>
              <p className="text-xs font-semibold text-neutral-300 font-sans tracking-wide">
                Satisfied Photographers
              </p>
              <p className="text-[10px] text-neutral-500 font-sans max-w-[180px]">
                Global advertising standards and complete NDA compliance.
              </p>
            </div>

            {/* D3 Radial Gauge container */}
            <div className="flex flex-col items-center justify-center self-center">
              <svg ref={radialGaugeRef} width="80" height="80" className="overflow-visible" />
              <span className="text-[9px] text-neutral-500 font-mono mt-1 uppercase tracking-[0.05em]">
                Pristine Rate
              </span>
            </div>
          </div>

          {/* STAT 3: YEARS IN BUSINESS */}
          <div className="bg-neutral-950/60 p-6 rounded-2xl border border-neutral-850 hover:border-brand-gold/15 transition-all duration-300 flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-neutral-500 font-mono text-[9px] uppercase tracking-widest">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                <span>Established tenure</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  ref={countRef3}
                  className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight"
                >
                  0 Years
                </span>
              </div>
              <p className="text-xs font-semibold text-neutral-300 font-sans tracking-wide">
                Post-Production Command
              </p>
              <p className="text-[10px] text-neutral-500 font-sans max-w-[180px]">
                Supporting editorial luxury since our bootstrap launch.
              </p>
            </div>

            {/* D3 Histogram/Timeline container */}
            <div className="flex flex-col items-end justify-center self-center opacity-85 hover:opacity-100 transition-opacity">
              <svg ref={chartRef} width="140" height="45" className="overflow-visible" />
              <span className="text-[9px] text-neutral-500 font-mono mt-1 text-right uppercase tracking-[0.05em]">
                Scale Index (D3)
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
