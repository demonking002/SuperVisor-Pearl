"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import Watermelon from "./Watermelon";
import { randomBetween } from "@/lib/utils";

interface WatermelonFieldProps {
  count?: number;
  className?: string;
  onPop?: (x: number, y: number) => void;
}

interface MelonEntity {
  body: Matter.Body;
  el: HTMLDivElement | null;
  size: number;
  spin: number;
}

export default function WatermelonField({
  count = 12,
  className = "",
  onPop,
}: WatermelonFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | undefined>(undefined);
  const entitiesRef = useRef<MelonEntity[]>([]);
  const rafRef = useRef<number | undefined>(undefined);
  const boundsRef = useRef<Matter.Body[]>([]);
  const [ready, setReady] = useState(false);
  const [popCount, setPopCount] = useState(0);

  const setupBounds = useCallback((width: number, height: number) => {
    if (!engineRef.current) return;
    const world = engineRef.current.world;
    Matter.World.remove(world, boundsRef.current);
    const thickness = 60;
    const ground = Matter.Bodies.rectangle(
      width / 2,
      height + thickness / 2 - 4,
      width * 2,
      thickness,
      { isStatic: true, label: "ground" }
    );
    const left = Matter.Bodies.rectangle(
      -thickness / 2,
      height / 2,
      thickness,
      height * 2,
      { isStatic: true }
    );
    const right = Matter.Bodies.rectangle(
      width + thickness / 2,
      height / 2,
      thickness,
      height * 2,
      { isStatic: true }
    );
    const ceiling = Matter.Bodies.rectangle(
      width / 2,
      -thickness / 2 - 200,
      width * 2,
      thickness,
      { isStatic: true }
    );
    boundsRef.current = [ground, left, right, ceiling];
    Matter.World.add(world, boundsRef.current);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0.55 } });
    engineRef.current = engine;

    const rect = container.getBoundingClientRect();
    setupBounds(rect.width, rect.height);

    const entities: MelonEntity[] = [];
    for (let i = 0; i < count; i++) {
      const size = randomBetween(38, 74);
      const x = randomBetween(size, rect.width - size);
      const y = randomBetween(-400, -20 - i * 40);
      const body = Matter.Bodies.circle(x, y, size / 2, {
        restitution: 0.55,
        friction: 0.15,
        frictionAir: 0.012,
        density: 0.0016,
      });
      Matter.Body.setAngularVelocity(body, randomBetween(-0.05, 0.05));
      Matter.World.add(engine.world, body);
      entities.push({ body, el: null, size, spin: randomBetween(-1, 1) });
    }
    entitiesRef.current = entities;
    setReady(true);

    let lastTime = performance.now();
    function loop(time: number) {
      const delta = Math.min(time - lastTime, 32);
      lastTime = time;
      Matter.Engine.update(engine, delta);

      for (const entity of entitiesRef.current) {
        if (!entity.el) continue;
        const { x, y } = entity.body.position;
        const angle = entity.body.angle;
        entity.el.style.transform = `translate3d(${x - entity.size / 2}px, ${
          y - entity.size / 2
        }px, 0) rotate(${angle}rad)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    function handleResize() {
      if (!container) return;
      const r = container.getBoundingClientRect();
      setupBounds(r.width, r.height);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  function handlePop(index: number, e: React.MouseEvent) {
    const entity = entitiesRef.current[index];
    if (!entity) return;
    const force = 0.06 * entity.body.mass;
    const rollDirection = Math.random() > 0.5 ? 1 : -1;
    Matter.Body.applyForce(entity.body, entity.body.position, {
      x: rollDirection * force * randomBetween(2.5, 4),
      y: -force * randomBetween(1.5, 3),
    });
    Matter.Body.setAngularVelocity(
      entity.body,
      rollDirection * randomBetween(0.2, 0.4)
    );

    // nudge nearby melons for a satisfying chain reaction
    for (const other of entitiesRef.current) {
      if (other === entity) continue;
      const dx = other.body.position.x - entity.body.position.x;
      const dy = other.body.position.y - entity.body.position.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 120 && dist > 0) {
        const strength = (0.012 * entity.body.mass) / dist;
        Matter.Body.applyForce(other.body, other.body.position, {
          x: dx * strength,
          y: dy * strength - 0.01,
        });
      }
    }

    setPopCount((c) => c + 1);
    onPop?.(e.clientX, e.clientY);
  }

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
      aria-label="Floating watermelon patch, click a watermelon to pop it"
    >
      {ready &&
        entitiesRef.current.map((entity, i) => (
          <div
            key={i}
            ref={(node) => {
              entitiesRef.current[i].el = node;
            }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: entity.size,
              height: entity.size,
              willChange: "transform",
            }}
          >
            <button
              type="button"
              onClick={(e) => handlePop(i, e)}
              aria-label="Pop watermelon"
              className="focus-ring block h-full w-full cursor-pointer transition-transform hover:scale-110 active:scale-90"
            >
              <Watermelon size={entity.size} className="drop-shadow-lg" />
            </button>
          </div>
        ))}
      <span className="sr-only" role="status">
        {popCount} watermelons popped
      </span>
    </div>
  );
}
