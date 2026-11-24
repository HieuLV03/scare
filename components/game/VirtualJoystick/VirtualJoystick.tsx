
"use client";

import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { useRunStore } from "@/stores/run.store";
import { useMovementStore } from "@/stores/movement.store";

import "./VirtualJoystick.css";

type JoystickPosition = {
    x: number;
    y: number;
};

const MAX_DISTANCE = 45;

export default function VirtualJoystick() {
    const [position, setPosition] = useState<JoystickPosition>({
        x: 0,
        y: 0,
    });

    const active = useRef(false);
    const pointerId = useRef<number | null>(null);

    const setRunning = useRunStore(
        (state) => state.setRunning
    );

    const setMovement = useMovementStore(
        (state) => state.setMovement
    );

    const resetMovement = useMovementStore(
        (state) => state.resetMovement
    );

    function updateJoystick(
        clientX: number,
        clientY: number,
        element: HTMLDivElement
    ) {
        const rect = element.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = clientX - centerX;
        const dy = clientY - centerY;

        // Kéo vượt cạnh trên joystick thì chạy.
        const shouldRun = clientY < rect.top;
        setRunning(shouldRun);

        const distance = Math.hypot(dx, dy);
        const scale =
            distance > MAX_DISTANCE
                ? MAX_DISTANCE / distance
                : 1;

        const x = dx * scale;
        const y = dy * scale;

        setPosition({ x, y });

        setMovement(
            x / MAX_DISTANCE,
            y / MAX_DISTANCE
        );
    }

    function start(event: PointerEvent<HTMLDivElement>) {
        if (active.current) return;

        active.current = true;
        pointerId.current = event.pointerId;

        event.currentTarget.setPointerCapture(event.pointerId);

        updateJoystick(
            event.clientX,
            event.clientY,
            event.currentTarget
        );
    }

    function move(event: PointerEvent<HTMLDivElement>) {
        if (
            !active.current ||
            pointerId.current !== event.pointerId
        ) {
            return;
        }

        updateJoystick(
            event.clientX,
            event.clientY,
            event.currentTarget
        );
    }

 function end(event: PointerEvent<HTMLDivElement>) {
    if (
        !active.current ||
        pointerId.current !== event.pointerId
    ) {
        return;
    }

    active.current = false;
    pointerId.current = null;

    // Ghi nhớ trạng thái chạy trước khi thả joystick.
    const wasRunning = useRunStore.getState().running;

    setPosition({ x: 0, y: 0 });

    // Nếu đang chạy thì giữ trạng thái chạy.
    if (wasRunning) {
        setMovement(0, 0);
    } else {
        resetMovement();
        setRunning(false);
    }

    if (
        event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
        event.currentTarget.releasePointerCapture(event.pointerId);
    }
}

    return (
        <div
            className="virtual-joystick"
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={end}
            onPointerCancel={end}
        >
            <div
                className="virtual-joystick-knob"
                style={{
                    transform: `translate(
                        calc(-50% + ${position.x}px),
                        calc(-50% + ${position.y}px)
                    )`,
                }}
            />
        </div>
    );
}
