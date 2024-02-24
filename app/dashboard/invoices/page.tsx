import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { ReactElement, Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  }
}): Promise<ReactElement> => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  // !!!! ======== Difference from Client Side React ========!!!!
  
  // state is lifted to the server using URL search params
  // Search and Paginator are client side components and use 'global' URL search params to drive navigation
  // Table is a server component (it needs to make requests to data).
  // Table uses 'searchParams' as a server component.  Changes will be made from client setting of 'useSearchParams'.  See 'createPageURL'
  
  // !!!! ======== Difference from Client Side React ========!!!!

    return (
        <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
          </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search invoices..."/>
          <CreateInvoice/>
        </div>
        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>
          <Table query={query} currentPage={currentPage}/>
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages}/>
          {/* paginator gets the current page itself from the URLSearchParams */}
        </div>
      </div>
    );
}

export default Page;