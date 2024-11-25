import Sidebar from '@/components/layouts/sidebar'
import Header from '@/components/layouts/header'
import { url } from 'inspector'

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
        <main
          className='h-full grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-6 bg-center'
          // style={{
          //   background:
          //     'linear-gradient(135deg, rgba(188, 221, 228, 0.7), rgba(208, 230, 226, 0.7), rgba(238, 238, 245, 0.7))',
          //   backgroundRepeat: 'repeat',
          // }}
        >
          {children}
        </main>
        {/* <footer className="mt-auto border-t bg-muted/40 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Acme Inc. All rights reserved.</p>
        </footer> */}
      </div>
    </div>
  )
}
