import '@/assets/styles/global.css'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GlobalProvider } from '@/context/GlobalContext';
import 'photoswipe/dist/photoswipe.css'

export const metadata = {
    title: 'Vacances & Chill',
    keywords: 'location, propriété, vacances',
    description: 'Trouvez la propriété de vos rêves'
}

const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
        <GlobalProvider>
        <html>
            <body>
            <Navbar/>
                <main>{children}</main>
                <Footer/>
                <ToastContainer/>
            </body>
        </html>
        </GlobalProvider>
        </AuthProvider>
    );
}

export default MainLayout;
