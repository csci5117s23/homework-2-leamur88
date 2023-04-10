import '@/styles/globals.css'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const publicPages = ["/"];





export default function App({ Component, pageProps }) {
	const pathname  = useRouter().pathname;

	const isPublicPage = publicPages.includes(pathname);
	return (
		<ClerkProvider {...pageProps}>
			{isPublicPage ? (
			<Component {...pageProps} />
			) : (
			<>
				<SignedIn>
				<Component {...pageProps} />
				</SignedIn>
				<SignedOut>
				<SignIn />
				</SignedOut>

			</>
			)}
		</ClerkProvider>
	  );
	
}
