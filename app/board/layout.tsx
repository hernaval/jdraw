import Sidebar from '@/components/layouts/sidebar'
import Header from '@/components/layouts/header'

export default function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      {/* deskop sidebar */}
      <Sidebar />

      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-28'>
        {/* mobile drawer navigation */}
        <Header />
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
          {children}
        </main>
        {/* <footer className="mt-auto border-t bg-muted/40 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Acme Inc. All rights reserved.</p>
        </footer> */}
      </div>
    </div>
  )
}
