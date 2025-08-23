import { Home, LogOut, MessageCircleMore, Text } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRoomStore } from "@/store/RoomStore"
import { useRouter } from "next/navigation";

// Menu items.

export function AppSidebar() {
      const router = useRouter();
    const {handleLogout,toggleChat,toggleSum} = useRoomStore();
    const items = [
        {
            title: "Document",
            onClick:()=> router.push("/dashboard"), 
            icon: Home,
        },
        {
            title: "Chat",
            onClick:()=>toggleChat(),
            icon: MessageCircleMore,
        },
        {
            title: "Summarizer/Grammar-check",
            onClick:()=>toggleSum(),
            icon: Text,
        },
        {
            title: "Logout",
            onClick: ()=>handleLogout(router),
            icon: LogOut,
        },
    ]
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <div onClick={item.onClick}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}