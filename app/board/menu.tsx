import { SidebarItemProps } from "@/types/SidebarItemProps";
import { GitBranch, Home, Keyboard, NotepadText, Trophy, Users2 } from "lucide-react";

export const boardMenu: SidebarItemProps[] = [
    {
        label: "Accueil",
        to: "/board/home",
        icon: <Home />
    },
    {
        label: "Règlement",
        to: "/board/outline",
        icon: <NotepadText />
    },
    {
        label: "Délégations",
        to: "/board/delegation",
        icon: <Users2 />
    },
    {
        label: "Tirages",
        to: "/board/draw",
        icon: <GitBranch />
    },
    {
        label: "Tableaux",
        to: "/board/match",
        icon: <Keyboard />
    },
    {
        label: "Résultats",
        to: "/board/results",
        icon: <Trophy />
    }
]