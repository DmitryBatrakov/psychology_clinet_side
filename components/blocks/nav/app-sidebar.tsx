'use client';
import {
  BadgeCheck,
  BadgeQuestionMark,
  Bell,
  BookMarked,
  BookUser,
  Cable,
  CalendarRange,
  ChartArea,
  ChevronRight,
  ChevronsUpDown,
  ClipboardClock,
  CreditCard,
  FolderClock,
  FolderKanban,
  HandPlatter,
  HatGlasses,
  Inbox,
  LogOut,
  LucideProps,
  PanelsTopLeft,
  Play,
  Settings,
  Slack,
  Sparkles,
  Wrench,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

interface SidebarGroupProps {
  label: string;
  menu: Array<MenuPops>;
}

interface MenuItemProps {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}

interface MenuPops extends MenuItemProps {
  messages?: number;
  submenu?: Array<MenuItemProps>;
}

export const sidebar_groups: SidebarGroupProps[] = [
  {
    label: 'פלטפורמה',
    menu: [
      {
        title: 'לוח בקרה',
        url: '/dashboard',
        icon: PanelsTopLeft,
      },
      {
        title: 'לוח שנה',
        url: '/calendar',
        icon: CalendarRange,
      },
      {
        title: 'פעילות',
        url: '/activity',
        icon: ClipboardClock,
      },
      {
        title: 'סטטיסטיקה',
        url: '/statistics',
        icon: ChartArea,
      },
      {
        title: 'תיבת דואר',
        url: '/inbox',
        icon: Inbox,
        messages: 12,
      },
      {
        title: 'לקוחות',
        url: '/clients',
        icon: BookUser,
      },
      {
        title: 'תיעוד',
        url: '/docs',
        icon: BookMarked,
        submenu: [
          { title: 'מבוא', url: '/introduction', icon: Cable },
          { title: 'תחילת עבודה', url: '/getting-started', icon: Play },
          { title: 'שאלות נפוצות', url: '/faq', icon: BadgeQuestionMark },
          { title: 'יומן שינויים', url: '/changelog', icon: FolderClock },
          { title: 'מדיניות פרטיות', url: '/privacy-policy', icon: HatGlasses },
        ],
      },
      {
        title: 'הגדרות',
        url: '/settings',
        icon: Settings,
        submenu: [
          { title: 'כללי', url: '/general', icon: Wrench },
          { title: 'חשבון', url: '/account', icon: BadgeCheck },
          { title: 'חיוב', url: '/billing', icon: CreditCard },
          { title: 'התראות', url: '/notifications', icon: Bell },
        ],
      },
    ],
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" side='right' > 
      <SidebarHeader className="flex flex-row items-center gap-3 overflow-hidden">
        <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-sky-400 text-white">
          <Slack />
        </div>
        <AnimatePresence>
          {open ? (
            <motion.div key="logo-open" exit={{ opacity: 0 }} className="font-semibold text-nowrap">
              My workspace
            </motion.div>
          ) : null}
        </AnimatePresence>
      </SidebarHeader>
      <SidebarSeparator className="m-0" />
      <SidebarContent className="custom-scrollbar">
        {sidebar_groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.menu.map((item) => (
                  <Collapsible className="group/collapsible" key={item.title}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          {item.submenu?.length ? (
                            <div className="cursor-pointer">
                              <item.icon />
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=closed]/collapsible:rotate-0 group-data-[state=open]/collapsible:rotate-90" />
                            </div>
                          ) : (
                            <Link href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {item.messages && (
                        <SidebarMenuBadge className="aspect-square rounded-full bg-red-400 p-0 text-white!">
                          {item.messages}
                        </SidebarMenuBadge>
                      )}
                      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all">
                        {item.submenu?.length && (
                          <SidebarMenuSub>
                            {item.submenu.map((subitem) => (
                              <SidebarMenuSubItem key={subitem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link
                                    href={item.url + subitem.url}
                                    className="**:text-muted-foreground"
                                  >
                                    <subitem.icon />
                                    <span>{subitem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <SidebarMenuButton className="h-auto transition-all data-[state=open]:bg-white data-[state=open]:shadow-md">
                  <Avatar className="rounded-lg">
                    <AvatarImage src={'https://ui.shadcn.com/avatars/shadcn.jpg'} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Item className="p-0">
                    <ItemContent className="gap-0">
                      <ItemTitle>Jhon Cruse</ItemTitle>
                      <ItemDescription className="text-xs">exemple@mail.com</ItemDescription>
                    </ItemContent>
                  </Item>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="end"
                className="w-(--radix-popper-anchor-width)"
              >
                <Item className="gap-2 px-1 py-1.5">
                  <ItemMedia>
                    <Avatar className="rounded-lg">
                      <AvatarImage src={'https://ui.shadcn.com/avatars/shadcn.jpg'} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent className="gap-0">
                    <ItemTitle>Jhon Cruse</ItemTitle>
                    <ItemDescription className="text-xs">exemple@mail.com</ItemDescription>
                  </ItemContent>
                </Item>

                <DropdownMenuSeparator />

                <Link href="/upgrade">
                  <DropdownMenuItem className="cursor-pointer text-amber-500! hover:bg-amber-100!">
                    <Sparkles className="text-amber-500" />
                    <span>שדרג לפרו</span>
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <DropdownMenuGroup className="*:cursor-pointer">
                  <Link href="/settings/account">
                    <DropdownMenuItem>
                      <BadgeCheck />
                      <span>חשבון</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings/billing">
                    <DropdownMenuItem>
                      <CreditCard />
                      <span>חיוב</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings/notifications">
                    <DropdownMenuItem>
                      <Bell />
                      <span>התראות</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem variant="destructive" className="cursor-pointer">
                  <LogOut />
                  <span>התנתק</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
