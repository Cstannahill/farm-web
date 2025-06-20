import "../index.css";
import type { ReactNode } from "react";
import { AppSidebar } from "../components/app-sidebar";
import CopyPageButton from "../components/CopyPageButton";
import { ModeToggle } from "../components/mode-toggle";
import { useLocation } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function RootLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter(Boolean)
    .map((p) => p.replace(/-/g, " "));

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">FARM Docs</BreadcrumbLink>
                </BreadcrumbItem>
                {pathSegments.map((segment, index) => (
                  <div key={index} className="flex items-center">
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      {index === pathSegments.length - 1 ? (
                        <BreadcrumbPage className="capitalize">
                          {segment}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={`/${pathSegments
                            .slice(0, index + 1)
                            .join("/")}`}
                          className="capitalize"
                        >
                          {segment}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <ModeToggle />
            <CopyPageButton />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <main className="mx-auto max-w-4xl w-full">
            <div className="prose prose-slate dark:prose-invert max-w-none lg:prose-lg">
              {children}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
