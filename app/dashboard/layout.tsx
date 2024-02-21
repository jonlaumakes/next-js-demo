import SideNav from '@/app/ui/dashboard/sidenav';

const Layout = ({ children }: { children: React.ReactNode }) => {
    // the child can be another page or anohter layout
    // on navigation only the page components update while the layout won't re-render (partial rendering)

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}

export default Layout;