import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import WorkoutProvider from "../context/WorkoutProvider.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <WorkoutProvider>
          <Navbar />
         
           <ToastContainer />
          {children}
          <Footer/>
        </WorkoutProvider>
      </body>
       
    </html>
  );
}