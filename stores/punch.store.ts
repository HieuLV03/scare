
"use client";

import { create } from "zustand";

type PunchState = {
    punchTrigger: number;
    isPunchHeld: boolean;

    triggerPunch: () => void;
    setPunchHeld: (held: boolean) => void;
};

export const usePunchStore = create<PunchState>((set) => ({
    punchTrigger: 0,
    isPunchHeld: false,

    triggerPunch: () =>
        set((state) => ({
            punchTrigger: state.punchTrigger + 1,
        })),

    setPunchHeld: (held) =>
        set({
            isPunchHeld: held,
        }),
}));
