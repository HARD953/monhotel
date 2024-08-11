"use client"

import {NextUIProvider} from '@nextui-org/react'
import { PrimeReactProvider } from 'primereact/api';
import { SessionProvider } from "next-auth/react"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense, lazy, useEffect, useState } from 'react';
import { AuthContextProvider } from '@/services/context/AuthContext';

import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";  
import { ChambreFilterProvider } from '@/services/context/ChambreFilterContext';



const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)


export default function Providers({children}){
  const [queryClient] = useState(() => new QueryClient())
    const [showDevtools, setShowDevtools] = useState(false)

    useEffect(() => {
      // @ts-ignore
      window.toggleDevtools = () => setShowDevtools((old) => !old)
    }, [])
    return(

        <QueryClientProvider client={queryClient}>
            <PrimeReactProvider>
                <NextUIProvider>
                    <SessionProvider>
                      <AuthContextProvider>
                        <ChambreFilterProvider>
                          {children}
                        </ChambreFilterProvider>
                      </AuthContextProvider>
                    </SessionProvider>
                </NextUIProvider>
            </PrimeReactProvider>
            <ReactQueryDevtools initialIsOpen={true} />
            {showDevtools && (
                <Suspense fallback={null}>
                <ReactQueryDevtoolsProduction />
                </Suspense>
            )}
        </QueryClientProvider>
    )
}